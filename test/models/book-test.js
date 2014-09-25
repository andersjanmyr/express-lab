'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var book = require('../../lib/models/book');

describe('book', function() {
    describe('#find', function() {
        it('finds the matching books', function(done) {
            book.find('the', function(err, books) {
                expect(books.length).to.equal(2);
                expect(books[0].title).to.match(/the/);
                done();
            });
        });
    });
});



