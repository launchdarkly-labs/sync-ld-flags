#!/usr/bin/env node
'use strict';

var jsonpatch = require('fast-json-patch'),
  request = require('request'),
  baseUrl = 'https://app.launchdarkly.com/api',
  sourceEnvironment = process.argv[2];
  destinationEnvironment = process.argv[3];

if (!sourceEnvironment) {
  throw new Error('Missing source environment for sync');
}

if (!destinationEnvironment) {
  throw new Error('Missing destination environment for sync');
}

if (sourceEnvironment === destinationEnvironment) {
  throw new Error('Why are you syncing the same environment?!');
}

function patchFlag (apiKey, patch, key, cb) {
  var options = {
    url: baseUrl + '/features' + '/' + key,
    body: patch,
    headers: {
      'Authorization': 'api_key ' + apiKey,
      'Content-Type': 'application/json'
    }
  };

  request.patch(options, cb);
}

function fetchFlags (apiKey, cb) {
  var options = {
    url: baseUrl + '/features',
    headers: {
      'Authorization': 'api_key ' + apiKey,
      'Content-Type': 'application/json'
    }
  };

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      cb(null, JSON.parse(body).items);
    }
    else {
      cb(error);
    }
  }

  request(options, callback);
}

function props (flag) {
  return {
    'includeInSnippet': flag.includeInSnippet,
    'variations': flag.variations,
    'on': flag.on
  };
}

function syncEnvironment (fromKey, toKey) {
  fetchFlags(fromKey, function (err, fromFlags) {
    if (err) {
      throw new Error('Error fetching flags');
    }

    fetchFlags(toKey, function (err, flags) {
      if (err) {
        console.error(err);
      }

      var toFlags = flags.reduce(function (accum, flag) {
        accum[flag.key] = flag;
        return accum;
      }, {});

      fromFlags.forEach(function (fromFlag) {
        var toFlag = toFlags[fromFlag.key];

        if (!toFlag) {
          console.log('Could not find flag ' + fromFlag.key);
        } else {
          var diff = jsonpatch.compare(props(toFlag), props(fromFlag));

          if (diff.length > 0) {
            patchFlag(toKey, JSON.stringify(diff), fromFlag.key, function (err) {
              if (err) {
                throw new Error(err);
              }
            });
          }
        }

      });
    });

  });
}

syncEnvironment(sourceEnvironment, destinationEnvironment);
