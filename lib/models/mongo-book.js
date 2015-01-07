'use strict';
var debug = require('debug')('express-lab:mongo-book');

function MongoBook(db, seed) {
    this.db = db;
    this.books = db.collection('books');
    this.seed = seed;
}

MongoBook.prototype.reset = function(callback) {
    var books = this.books;
    var seed = this.seed;
    books.drop(function(err, data) {
        books.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = MongoBook;

