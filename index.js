#!/usr/bin/env node
'use strict';

const DEFAULT_HOST = 'https://app.launchdarkly.com';

const jsonpatch = require('fast-json-patch');
const fetch = require('node-fetch');
const program = require('commander');
const cliProgress = require('cli-progress');

function patchFlag(patch, key, config) {
  const { baseUrl, projectKey, apiToken } = config;
  const requestOptions = {
    method: 'PATCH',
    body: patch,
    headers: {
      Authorization: apiToken,
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${baseUrl}/flags/${projectKey}/${key}`, requestOptions);
}

const progress = new cliProgress.SingleBar(
  {
    format: 'progress {bar} {percentage}% | {value}/{total} | flag: {flag}',
  },
  cliProgress.Presets.shades_classic
);

const fetchFlags = function (config, cb) {
  const {
    baseUrl,
    projectKey,
    sourceEnvironment,
    destinationEnvironment,
    apiToken,
  } = config;
  const requestOptions = {
    headers: {
      Authorization: apiToken,
      'Content-Type': 'application/json',
    },
  };

  return fetch(
    `${baseUrl}/flags/${projectKey}?summary=0&env=${sourceEnvironment}&env=${destinationEnvironment}`,
    requestOptions
  );
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
    'offVariation',
  ];
  attributes.forEach(function (attr) {
    flag.environments[destinationEnvironment][attr] =
      flag.environments[sourceEnvironment][attr];
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
      flag.environments[env].rules[i].clauses = flag.environments[env].rules[
        i
      ].clauses.filter((c) => !!c);

      // remove any rules that don't have any clauses (because we removed the only clause(s) above)
      if (!flag.environments[env].rules[i].clauses.length) {
        delete flag.environments[env].rules[i];
      }
    }
    // filter out any empty items in the rules array (rules we deleted above)
    flag.environments[env].rules = flag.environments[env].rules.filter(
      (r) => !!r
    );
  }
};

const failedFlags = {};

function syncFlag(flag, config = {}) {
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
    throw new Error(
      'Missing source environment flag. Did you specify the right project?'
    );
  }
  if (!toFlag) {
    throw new Error(
      'Missing destination environment flag. Did you specify the right project?'
    );
  }
  // console.debug('Syncing ' + flag.key);
  copyValues(flag, config);

  const diff = jsonpatch.generate(observer);

  if (diff.length > 0) {
    // console.debug('Modifying', flag.key, 'with', diff);

    return patchFlag(JSON.stringify(diff), flag.key, config).then((res) => {
      if (res.status >= 400) {
        failedFlags[
          flag.key
        ] = `PATCH failed (${res.status}) for flag ${flag.key} - ${res.statusText}`;
      }
      return res.json();
    });
  } else {
    // console.debug('No changes in ' + flag.key);
  }
}

function syncEnvironment(config = {}) {
  fetchFlags(config)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Error fetching flags - ', res.status);
      }
      return res.json();
    })
    .then((res) => {
      progress.start(res.items.length, 0);
      return res.items;
    })
    .then(async (flags) => {
      for (let i = 0; i < flags.length; i++) {
        await syncFlag(flags[i], config);
        progress.increment();
        progress.update({ flag: flags[i].key });
      }
      progress.stop();
      if (Object.entries(failedFlags).length > 0)
        console.log(
          'Failed to sync the following flags:\n',
          JSON.stringify(failedFlags, null, 2)
        );
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
    // require('request').debug = true;
    console.log('debugging http requests not currently supported');
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
    console.error(
      'Invalid usage: Please provide a value for --destination-env'
    );
    program.outputHelp();
    process.exit(1);
  }

  if (config.sourceEnvironment === config.destinationEnvironment) {
    console.error(
      'Invalid usage: Source and destination environments should be different'
    );
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
