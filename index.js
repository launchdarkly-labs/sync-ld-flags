#!/usr/bin/env node
'use strict';

const DEFAULT_HOST = 'https://app.launchdarkly.com';

const jsonpatch = require('fast-json-patch');
const request = require('request');
const program = require('commander');


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
  const { baseUrl, projectKey, sourceEnvironment, destinationEnvironment, apiToken } = config;
  const requestOptions = {
    url: `${baseUrl}/flags/${projectKey}?summary=0&env=${sourceEnvironment}&env=${destinationEnvironment}`,
    headers: {
      'Authorization': apiToken,
      'Content-Type': 'application/json'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      cb(null, JSON.parse(body).items);
    } else {
      cb(error);
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
  const { omitSegments, sourceEnvironment, destinationEnvironment } = config;
  // Remove rule ids because _id is read-only and cannot be written except when reordering rules
  stripRuleAndClauseIds(flag);
  if (omitSegments) {
    // Remove segments because segments are not guaranteed to exist across environments
    stripSegments(flag);
  }
  const fromFlag = flag.environments[sourceEnvironment];
  const toFlag = flag.environments[destinationEnvironment];
  const observer = jsonpatch.observe(flag);

  if (!fromFlag) {
    throw new Error('Missing source environment flag. Did you specify the right project?');
  }
  if (!toFlag) {
    throw new Error('Missing destination environment flag. Did you specify the right project?');
  }
  console.log('Syncing ' + flag.key);
  copyValues(flag, config);

  const diff = jsonpatch.generate(observer);

  if (diff.length > 0) {
    console.log('Modifying', flag.key, 'with', diff);

    await patchFlag(JSON.stringify(diff), flag.key, config, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }
      if (response.statusCode >= 400) {
        console.log('PATCH failed (' + response.statusCode + ') for flag', flag.key, '-', body)
      }
    });
  } else {
    console.log('No changes in ' + flag.key)
  }
}

async function syncEnvironment(config = {}) {
  fetchFlags(config, async function (err, flags) {
    if (err) {
      throw new Error('Error fetching flags');
    }
    for (const flag of flags) {
      await syncFlag(flag, config);
    }
  });
}

program
    .option('-p, --project-key <key>', 'Project key')
    .option('-s, --source-env <key>', 'Source environment')
    .option('-d, --destination-env <key>', 'Destination environment')
    .option('-t, --api-token <token>', 'Api token')
    .option('-o, --omit-segments', 'Omit segments when syncing')
    .option('-H, --host <host>', 'Hostname override')
    .option('-D, --debug', 'Enables HTTP debugging')
    .parse(process.argv);

if (require.main === module) {
  const hostUrl = program.host || DEFAULT_HOST;
  const config = {
    projectKey: program.projectKey || '',
    sourceEnvironment: program.sourceEnv || '',
    destinationEnvironment: program.destinationEnv || '',
    apiToken: program.apiToken || '',
    baseUrl: hostUrl + '/api/v2',
    omitSegments: !!program.omitSegments,
  };

  if (program.debug) {
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

  syncEnvironment(config);
}
