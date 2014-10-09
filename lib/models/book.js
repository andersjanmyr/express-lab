'use strict';
var debug = require('debug')('express-lab:book');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// Example books
var books = [{
    id: 'geb',
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    id: 'bof',
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    id: 'zam',
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    id: 'fbr',
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

function clone(object) {
    var copy = {};
    for (var key in object)
        copy[key] = object[key];
    return copy;
}

function copy() {
    return books.map(function(book) {
        return clone(book);
    });
}

function Book() {
    this.books = copy();
    EventEmitter.call(this);
}
util.inherits(Book, EventEmitter);

Book.prototype.find = function find(filter, callback) {
    if (!filter)
        return process.nextTick(callback.bind(null, null, this.books));

    // Call the callback on next iteration with this=null, err=null, data=books
    var filtered = this.books.filter(function(book) {
        var regex = new RegExp(filter, 'i');
        return regex.test(book.author) || regex.test(book.title);
    });
    debug(filtered);
    process.nextTick(callback.bind(null, null, filtered));
};

Book.prototype.findById = function findById(id, callback) {
    var found = this.books.filter(function(book) {
        return book.id === id;
    });
    if (found.length)
        return process.nextTick(callback.bind(null, null, found[0]));
    else
        return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));
};

Book.prototype.createId = function createId(title) {
    var words = title.toLowerCase().split(/[ .]/).filter(function(word) {
        return ['a', 'of', 'the'].indexOf(word) === -1;
    });

    if (words.length > 2)
        return words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0);
    else if (words.length > 1)
        return words[0].slice(0, 2) + words[1].charAt(0);
    return words[0].slice(0, 3);
};

Book.prototype.add = function add(book, callback) {
    var self = this;
    var id = this.createId(book.title);
    this.findById(id, function(err, found) {
        if (found)
            return process.nextTick(callback.bind(null, 'Book already exists, id: ' + id));
        book.id = id;
        self.books.push(book);
        self.emit('added', book);
        return process.nextTick(callback.bind(null, null, id));
    });
};

Book.prototype.update = function update(book, callback) {
    var self = this;
    var id = book.id;
    this.findById(id, function(err, found) {
        if (!found)
            return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));

        found.title = book.title;
        found.author = book.author;
        self.emit('updated', found);
        return process.nextTick(callback.bind(null, null, found));
    });
};

Book.prototype.remove = function remove(bookOrId, callback) {
    var self = this;
    var id = bookOrId.id || bookOrId;
    this.findById(id, function(err, book) {
        if (!book)
            return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));
        var i = self.books.indexOf(book);
        self.books.splice(i, 1);
        self.emit('removed', book);
        return process.nextTick(callback.bind(null, null, book));
    });
};

Book.prototype.reset = function reset() {
    this.books = copy();
};

module.exports = Book;
