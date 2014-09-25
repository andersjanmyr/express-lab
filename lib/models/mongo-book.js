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

MongoBook.prototype.findById = function(id, callback) {
    this.books.findOne({_id: id}, function(err, book) {
        return callback(err, book);
    });
};


MongoBook.prototype.add = function(book, callback) {
    this.books.insert(book, function(err, addedBook) {
        debug(addedBook);
        callback(err, addedBook._id);
    });
};

MongoBook.prototype.update = function(book, callback) {
    var books = this.books;
    var id = book._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('Book not found, id: ' + id);
        books.update({_id: book._id}, book, function(err) {
            return callback(err, book);
        });
    });
};

MongoBook.prototype.remove = function(bookOrId, callback) {
    var books = this.books;
    var id = bookOrId._id || bookOrId;
    this.findById(id, function(err, book) {
        if (!book)
            return callback('Book not found, id: ' + id);
        books.remove({_id: id}, function(err) {
            return callback(err, book);
        });
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

