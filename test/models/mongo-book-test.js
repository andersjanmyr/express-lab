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
        var original;

        before(function(done) {
            book.find(null, function(err, books) {
                original = books;
                done();
            });
        });

        it('adds the book', function(done) {
            var len = original.length;
            book.add({title: 'Hamlet', author: 'Shakespeare'}, function(err, id) {
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len + 1);
                    done();
                });
            });
        });
    });

    describe('#remove', function() {
        var original, abook;

        before(function(done) {
            book.find(null, function(err, books) {
                original = books;
                abook = books[0];
                done();
            });
        });

        it('removes the book by id', function(done) {
            var len = original.length
            book.remove(abook._id, function(err) {
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('removes the book by book', function(done) {
            var len = original.length
            book.remove(abook, function(err) {
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('calls back with error if book missing', function(done) {
            book.remove({_id: 'missing'}, function(err) {
                expect(err).to.equal('Book not found, id: missing');
                done();
            });
        });
    });

    describe('#update', function() {
        var original, abook;

        before(function(done) {
            book.find(null, function(err, books) {
                original = books;
                abook = books[0];
                done();
            });
        });
        it('calls back with error if book missing', function(done) {
            book.update({_id: 'missing'}, function(err) {
                expect(err).to.equal('Book not found, id: missing');
                done();
            });
        });
        it('updates the book', function(done) {
            var len = original.length
            book.update({_id: abook._id, title: 'Facebook rules!'}, function(err) {
                book.findById(abook._id, function(err, book) {
                    expect(book.title).to.equal('Facebook rules!');
                    done();
                });
            });
        });
    });

});



