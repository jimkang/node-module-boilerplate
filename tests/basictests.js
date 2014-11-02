var assert = require('assert');
var thingFactory = require('../yet-another-module');

describe('The basic stuff', function basicSuite() {
  it('shoul do a thing', 
    function testThing(testDone) {
      testDone();
    }
  );
});
