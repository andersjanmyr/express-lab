'use strict';
var debug = require('debug')('express-lab:mongo-book');

function MongoBook(db, seed) {
    this.db = db;
    this.books = db.collection('books');
    this.seed = seed;
}

MongoBook.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {author: { $regex: filter, $options: 'i'}},
            {title: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.books.find(query).toArray(function(err, books) {
        callback(err, books);
    });
};

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

