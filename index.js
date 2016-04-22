var jsonpatch = require('fast-json-patch'),
    http = require('http'),
    request = require('request');

var baseUrl = 'https://app.launchdarkly.com/api'

function patchFlag(apiKey, patch, key, cb) {
  var options = {
    url: baseUrl + '/features' + '/' + key,
    body: patch,
    headers: {
      'Authorization': 'api_key ' + apiKey,
      'Content-Type': 'application/json'
    }
  }

  request.patch(options, cb);
}

function fetchFlags(apiKey, cb) {
  var options = {
    url: baseUrl + '/features',
    headers: {
      'Authorization': 'api_key ' + apiKey,
      'Content-Type': 'application/json'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(null, JSON.parse(body).items);
    }
    else {
      cb(error);
    }
  }

  request(options, callback);
}

function props(flag) {
  return {
    "includeInSnippet": flag.includeInSnippet,
    "variations": flag.variations,
    "on": flag.on
  };
}

function syncEnvironment(fromKey, toKey) {
  fetchFlags(fromKey, function(err, fromFlags) {
    if (err) {
      console.log("Error fetching flags");
      process.exit(1);
    }

    fetchFlags(toKey, function(err, toFlags) {
      var toFlags = toFlags.reduce(function(accum, flag) {
        accum[flag.key] = flag;
        return accum;
      }, {});

      fromFlags.forEach(function(fromFlag) {
        var toFlag = toFlags[fromFlag.key];

        if (!toFlag) {
          console.log("Could not find flag " + fromFlag.key);
        } else {
          var diff = jsonpatch.compare(props(toFlag), props(fromFlag));

          if (diff.length > 0) {
            patchFlag(toKey, JSON.stringify(diff), fromFlag.key, function(error, response, body) {
              if (error) {
                console.log(error);
              } 
            })
          }
        }

      });
    });

  })  
}

syncEnvironment("API_KEY_TO_SYNC_FROM", "API_KEY_TO_SYNC_TO")


