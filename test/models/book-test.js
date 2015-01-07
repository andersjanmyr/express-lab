'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var Book = require('../../lib/models/book');
var book;

describe('book', function() {

    beforeEach(function() {
        book = new Book();
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
            var len = original.length
            book.add({title: 'Hamlet', author: 'Shakespeare'}, function(err, id) {
                expect(id).to.equal('ham');
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len + 1);
                    done();
                });
            });
        });

    });

    describe('#remove', function() {
        var original;

        before(function(done) {
            book.find(null, function(err, books) {
                original = books;
                done();
            });
        });

        it('removes the book by id', function(done) {
            var len = original.length
            book.remove('zam', function(err) {
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('removes the book by book', function(done) {
            var len = original.length
            book.remove({id: 'geb'}, function(err) {
                book.find(null, function(err, books) {
                    expect(books.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('calls back with error if book missing', function(done) {
            book.remove({id: 'missing'}, function(err) {
                expect(err).to.equal('Book not found, id: missing');
                done();
            });
        });
    });

    describe('#update', function() {
        var original;

        before(function(done) {
            book.find(null, function(err, books) {
                original = books;
                done();
            });
        });
        it('calls back with error if book missing', function(done) {
            book.update({id: 'missing'}, function(err) {
                expect(err).to.equal('Book not found, id: missing');
                done();
            });
        });
        it('updates the book', function(done) {
            var len = original.length
            book.update({id: 'fbr', title: 'Facebook rules!'}, function(err) {
                book.findById('fbr', function(err, book) {
                    expect(book.title).to.equal('Facebook rules!');
                    done();
                });
            });
        });
    });

    afterEach(function() {
        book.reset();
    });
});



