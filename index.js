#!/usr/bin/env node
'use strict';

const DEFAULT_HOST = 'https://app.launchdarkly.com';

const jsonpatch = require('fast-json-patch');
const request = require('request');
const program = require('commander');

// Use to calculate changing flags
let flagsWithChanges = 0;
let flagsWithoutChanges = 0;

function patchFlag(patch, key, config, cb) {
  const { baseUrl, projectKey, apiToken } = config;
  const requestOptions = {
    url: `${baseUrl}/flags/${projectKey}/${key}`,
    body: patch,
    headers: {
      'Authorization': apiToken,
      'Content-Type': 'application/json'
    }
  };

  return new Promise(function(resolve, reject) {
    request.patch(requestOptions, function(error, response, body) {
      cb(error, response, body)
      resolve(true)
    });
  });
}

const fetchFlags = function (config, cb) {
  const { baseUrl, projectKey, sourceEnvironment, destinationEnvironment, apiToken, tags, flag } = config;
  let isSingle = flag && !tags;
  let url = `${baseUrl}/flags/${projectKey}`;

  if (isSingle) {
    url += `/${flag}`
  } 

  url += `?summary=0&env=${sourceEnvironment}&env=${destinationEnvironment}`

  if (tags) {
    url += '&filter=tags:' + tags.join('+');
  }

  const requestOptions = {
    url,
    headers: {
      'Authorization': apiToken,
      'Content-Type': 'application/json'
    }
  };

  function callback(error, response, body) {
    if (error) {
      return cb(error);
    }
    
    if (response.statusCode === 200) {
      const parsed = JSON.parse(body);
      return cb(null, isSingle ? [parsed] : parsed.items);
    }
    
    try {
      const parsed = JSON.parse(body);
      return cb(parsed);
    } catch(err) {
      cb(err)
    }
  }

  request(requestOptions, callback);
};

const copyValues = function (flag, config) {
  const { destinationEnvironment, sourceEnvironment } = config;
  const attributes = [
    'on',
    'archived',
    'targets',
    'rules',
    'prerequisites',
    'fallthrough',
    'offVariation'
  ];
  attributes.forEach(function (attr) {
    flag.environments[destinationEnvironment][attr] = flag.environments[sourceEnvironment][attr];
  });
};

const stripRuleAndClauseIds = function (flag) {
  for (let env in flag.environments) {
    if (!flag.environments.hasOwnProperty(env)) continue;

    for (let rule of flag.environments[env].rules) {
      delete rule._id;

      for (let clause of rule.clauses) {
        delete clause._id;
      }
    }
  }
};

const stripSegments = function (flag) {
  for (let env in flag.environments) {
    if (!flag.environments.hasOwnProperty(env)) continue;

    for (let i = 0; i < flag.environments[env].rules.length; i++) {
      const rule = flag.environments[env].rules[i];

      // remove any clauses that reference segments
      for (let j = 0; j < rule.clauses.length; j++) {
        const clause = rule.clauses[j];
        if (clause.op === 'segmentMatch') {
          delete flag.environments[env].rules[i].clauses[j];
        }
      }
      // filter out any empty items in the clause array (clauses we deleted above)
      flag.environments[env].rules[i].clauses = flag.environments[env].rules[i].clauses.filter(c => !!c);

      // remove any rules that don't have any clauses (because we removed the only clause(s) above)
      if (!flag.environments[env].rules[i].clauses.length) {
        delete flag.environments[env].rules[i];
      }
    }
    // filter out any empty items in the rules array (rules we deleted above)
    flag.environments[env].rules = flag.environments[env].rules.filter(r => !!r);
  }
};

async function syncFlag(flag, config = {}) {
  const { omitSegments, dryRun, verbose } = config;
  // Remove rule ids because _id is read-only and cannot be written except when reordering rules
  stripRuleAndClauseIds(flag);
  if (omitSegments) {
    // Remove segments because segments are not guaranteed to exist across environments
    stripSegments(flag);
  }
  const observer = jsonpatch.observe(flag);

  if (verbose) console.log(`Checking ${flag.key}`);

  copyValues(flag, config);

  const diff = jsonpatch.generate(observer);

  if (diff.length > 0) {
    flagsWithChanges += 1;
    if (dryRun) {
      console.log(`Preview changes for ${flag.key}:\n`, diff);
      return;
    }
    console.log(`Modifying ${flag.key} with:\n`, diff);

    await patchFlag(JSON.stringify(diff), flag.key, config, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }
      if (response.statusCode >= 400) {
        console.error(`PATCH failed (${response.statusCode}) for flag ${flag.key}:\n`, body)
      }
    });
  } else {
    flagsWithoutChanges += 1;
    if (verbose) console.log(`No changes in ${flag.key}`)
  }
}

async function syncEnvironment(config = {}) {
  fetchFlags(config, async function (err, flags) {
    if (err) {
      const message = err.message || '';
      const matches = message.match(/^Unknown environment key: (?<envKey>.+)$/);
      if (matches.groups && matches.groups.envKey) {
        const envKey = matches.groups.envKey;
        console.error(`Invalid ${config.sourceEnv === envKey ? "source" : "destination"} environment "${envKey}". Did you specify the right project?`);
      } else {
        console.error('Error fetching flags\n', err);
      }

      process.exit(1)
    }

    for (const flag of flags) {
      await syncFlag(flag, config);
    }

    const modifiedMessage = config.dryRun ? 'To be modified' : 'Modified';

    console.log(`${modifiedMessage}: ${flagsWithChanges}, No changes required: ${flagsWithoutChanges}`)
  });
}

program
    .name('./sync-ld-flags')
    .description('Copy flag settings from one environment to another.')
    .option('-p, --project-key <key>', 'Project key')
    .option('-s, --source-env <key>', 'Source environment key')
    .option('-d, --destination-env <key>', 'Destination environment key')
    .option('-t, --api-token <token>', 'LaunchDarkly personal access token with write-level access.')
    .option('-f, --flag <flag>', 'Sync only the specified flag')
    .option('-T, --tag <tags...>', 'Sync flags with the given tag(s). Only flags with all tags will sync.')
    .option('-o, --omit-segments', 'Omit segments when syncing', false)
    .option('-H, --host <host>', 'Hostname override', DEFAULT_HOST)
    .option('-v, --verbose', 'Enable verbose logging', false)
    .option('-n', '--dry-run', 'Preview changes', false)
    .option('-D, --debug', 'Enable HTTP debugging', false)
    .parse(process.argv);

if (require.main === module) {
  const options = program.opts();
  const hostUrl = options.host;
  const config = {
    projectKey: options.projectKey,
    sourceEnvironment: options.sourceEnv,
    destinationEnvironment: options.destinationEnv,
    apiToken: options.apiToken,
    baseUrl: hostUrl + '/api/v2',
    omitSegments: options.omitSegments,
    flag: options.flag,
    tags: options.tag,
    dryRun: options.dryRun,
    verbose: options.verbose,
  };

  if (options.debug) {
    // see https://github.com/request/request#debugging
    require('request').debug = true
  }

  if (!config.projectKey) {
    console.error('Invalid usage: Please provide a value for --project-key');
    program.outputHelp();
    process.exit(1);
  }

  if (!config.sourceEnvironment) {
    console.error('Invalid usage: Please provide a value for --source-env');
    program.outputHelp();
    process.exit(1);
  }

  if (!config.destinationEnvironment) {
    console.error('Invalid usage: Please provide a value for --destination-env');
    program.outputHelp();
    process.exit(1);
  }

  if (config.sourceEnvironment === config.destinationEnvironment) {
    console.error('Invalid usage: Source and destination environments should be different');
    program.outputHelp();
    process.exit(1);
  }

  if (!config.apiToken) {
    console.error('Invalid usage: Please provide a value for --api-token');
    program.outputHelp();
    process.exit(1);
  }

  if (config.flag && config.tags) {
    console.error('Invalid usage: Only --flag OR --tag may be specified');
    program.outputHelp();
    process.exit(1);
  }

  syncEnvironment(config);
}
