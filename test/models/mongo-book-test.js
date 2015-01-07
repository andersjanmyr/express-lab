'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var mongoskin = require('mongoskin');

var MongoBook = require('../../lib/models/mongo-book');

var db = mongoskin.db('mongodb://@localhost:27017/express-lab-test', {safe:true});

// Example books
var seed = [{
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

var book = new MongoBook(db, seed);

describe('mongo-book', function() {

    before(function(done) {
        book.reset(done);
    });

    describe('#find', function() {
        it('finds the matching books', function(done) {
            book.find('the', function(err, books) {
                expect(books.length).to.equal(2);
                expect(books[0].title).to.match(/the/);
                done();
            });
        });
    });

    describe('#add', function() {
        it('adds the book', function(done) {
        });
    });

    describe('#remove', function() {
        it('removes the book by id', function(done) {
        });
        it('removes the book by book', function(done) {
        });
        it('calls back with error if book missing', function(done) {
        });
    });

    describe('#update', function() {
        it('calls back with error if book missing', function(done) {
        });
        it('updates the book', function(done) {
        });
    });

});



