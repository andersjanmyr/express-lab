var expect = require('chai').expect;
var sinon = require('sinon');

describe('sanity', function() {
    it('verifies the test setup', function() {
        expect(2 + 40).to.equal(42);
    });

    it('verifies the test setup (async)', function(done) {
        setTimeout(function() {
            expect(40 + 2).to.equal(42);
            done();
        }, 200);
    });

});


