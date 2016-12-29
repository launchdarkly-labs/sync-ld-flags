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