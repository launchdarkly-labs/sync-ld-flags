#!/usr/bin/env node
'use strict';

const DEFAULT_HOST = 'https://app.launchdarkly.com';

var jsonpatch = require('fast-json-patch'),
    request = require('request'),
    program = require('commander'),
    projectKey = '',
    sourceEnvironment = '',
    destinationEnvironment = '',
    apiToken = '';


function patchFlag(patch, key, cb) {
  var options = {
    url: baseUrl + '/flags/' + projectKey + '/' + key,
    body: patch,
    headers: {
      'Authorization': apiToken,
      'Content-Type': 'application/json'
    }
  };

  request.patch(options, cb);
}

var fetchFlags = function (cb) {
  var options = {
    url: baseUrl + '/flags/' + projectKey,
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

  request(options, callback);
}

var copyValues = function (flag, destinationEnvironment, sourceEnvironment) {
  var attributes = [
    'on',
    'archived',
    'targets',
    'rules',
    'prerequisites',
    'fallthrough'
  ];
  attributes.forEach(function (attr) {
    flag.environments[destinationEnvironment][attr] = flag.environments[sourceEnvironment][attr];
  });
}

var stripRuleIds = function (flag) {
  for (let env in flag.environments) {
    if (!flag.environments.hasOwnProperty(env)) continue;

    for (let rule of flag.environments[env].rules) {
      delete rule._id;
    }
  }
}

function syncFlag(flag) {
  // Remove rule ids because _id is read-only and cannot be written except when reordering rules
  stripRuleIds(flag);
  var fromFlag = flag.environments[sourceEnvironment],
      toFlag = flag.environments[destinationEnvironment],
      observer = jsonpatch.observe(flag);

  if (!fromFlag) {
    throw new Error('Missing source environment flag. Did you specify the right project?');
  }
  if (!toFlag) {
    throw new Error('Missing destination environment flag. Did you specify the right project?');
  }
  console.log('Syncing ' + flag.key)
  copyValues(flag, destinationEnvironment, sourceEnvironment);

  var diff = jsonpatch.generate(observer);

  if (diff.length > 0) {
    console.log('Modifying', flag.key, 'with', diff);

    patchFlag(JSON.stringify(diff), flag.key, function (error, response, body) {
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

function syncEnvironment(fromKey, toKey) {
  fetchFlags(function (err, flags) {
    if (err) {
      throw new Error('Error fetching flags');
    }
    flags.forEach(syncFlag)
  });
}

program
    .option('-p, --project-key <key>', 'Project key')
    .option('-s, --source-env <key>', 'Source environment')
    .option('-d, --destination-env <key>', 'Destination envrionment')
    .option('-t, --api-token <token>', 'Api token')
    .option('-H, --host <host>', 'Hostname override')
    .option('-D, --debug', 'Enables HTTP debugging')
    .parse(process.argv);

if (require.main === module) {
  var projectKey = program.projectKey,
      sourceEnvironment = program.sourceEnv,
      destinationEnvironment = program.destinationEnv,
      apiToken = program.apiToken,
      hostUrl = program.host || DEFAULT_HOST,
      baseUrl = hostUrl + '/api/v2';

  if (program.debug) {
    // see https://github.com/request/request#debugging
    require('request').debug = true
  }

  if (!projectKey) {
    console.error('Invalid usage: Please provide a value for --project-key');
    program.outputHelp();
    process.exit(1);
  }

  if (!sourceEnvironment) {
    console.error('Invalid usage: Please provide a value for --source-env');
    program.outputHelp();
    process.exit(1);
  }

  if (!destinationEnvironment) {
    console.error('Invalid usage: Please provide a value for --destination-env');
    program.outputHelp();
    process.exit(1);
  }

  if (sourceEnvironment === destinationEnvironment) {
    console.error('Invalid usage: Why are you syncing the same environment?!');
    program.outputHelp();
    process.exit(1);
  }

  if (!apiToken) {
    console.error('Invalid usage: Please provide a value for --api-token');
    program.outputHelp();
    process.exit(1);
  }

  syncEnvironment(sourceEnvironment, destinationEnvironment);
}
