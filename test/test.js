var assert = require('assert');
var rewire = require("rewire");
process.argv = ["index.js", "proj", "src", "dest", "apiToken"];
var sync = rewire("../index.js");

describe('copyValues', function() {
  var flag = {
    'environments': {
      'source': {
        'on': true,
        'archived': false,
        'targets': [1, 2, 3],
        'rules': ['a', 'b', 'c'],
        'prerequisites': 42,
        'fallthrough': 'foo',
      },
      'dest': {
        'on': false,
        'archived': true,
        'targets': [],
        'rules': [],
        'prerequisites': 33,
        'fallthrough': 'bar',
      }
    }
  }
  sync.__get__('copyValues')(flag, 'dest', 'source');
  it('should copy the `on` value', function() {
      assert.deepEqual(true, flag.environments.dest.on);
  });
  it('should copy the `archived` value', function() {
      assert.deepEqual(false, flag.environments.dest.archived);
  });
  it('should copy the `targets` value', function() {
      assert.deepEqual([1, 2, 3], flag.environments.dest.targets);
  });
  it('should copy the `rules` value', function() {
      assert.deepEqual(['a', 'b', 'c'], flag.environments.dest.rules);
  });
  it('should copy the `prerequisites` value', function() {
      assert.deepEqual(42, flag.environments.dest.prerequisites);
  });
  it('should copy the `fallthrough` value', function() {
      assert.deepEqual('foo', flag.environments.dest.fallthrough);
  });
});

// this will connect to a real LD instance and compare that two
// environments have been synced. So you need to run the sync
// manually, and then pass the following environment variables
// when running the test:
// * LD_BASEURL
// * LD_APITOKEN
// * LD_PRJKEY
// * LD_SRCENVKEY
// * LD_DESTENVKEY
describe('live test', function () {
  this.timeout(5000);
  var flags = {};
  before(function(done) {
    if (!process.env.LD_APITOKEN ||
        !process.env.LD_PRJKEY ||
        !process.env.LD_SRCENVKEY ||
        !process.env.LD_DESTENVKEY) {
      this.skip();
    } else {
      sync.__set__('projectKey', process.env.LD_PRJKEY);
      sync.__set__('sourceEnvironment', process.env.LD_SRCENVKEY);
      sync.__set__('destinationEnvironment', process.env.LD_DESTENVKEY);
      sync.__set__('apiToken', process.env.LD_APITOKEN);
      sync.__get__('fetchFlags')(function (err, fetchedFlags) {
        if (err) return done(err);
        flags = fetchedFlags;

        flags.forEach(function(flag) {
          describe('for the `' + flag.key + '` flag', function () {
            it('the `on` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].on, flag.environments[process.env.LD_DESTENVKEY].on);
            });
            it('the `archived` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].archived, flag.environments[process.env.LD_DESTENVKEY].archived);
            });
            it('the `targets` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].targets, flag.environments[process.env.LD_DESTENVKEY].targets);
            });
            it('the `rules` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].rules, flag.environments[process.env.LD_DESTENVKEY].rules);
            });
            it('the `prerequisites` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].prerequisites, flag.environments[process.env.LD_DESTENVKEY].prerequisites);
            });
            it('the `fallthrough` value should be copied', function() {
                assert.deepEqual(flag.environments[process.env.LD_SRCENVKEY].fallthrough, flag.environments[process.env.LD_DESTENVKEY].fallthrough);
            });
          });
        });
        done();
      })
    }
  });
  it('This is a required placeholder to allow before() to work', function () {
    // http://stackoverflow.com/a/35793665/4257
    console.log('Mocha should not require this hack IMHO');
  });
});