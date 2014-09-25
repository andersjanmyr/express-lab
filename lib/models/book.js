'use strict';
var debug = require('debug')('express-lab:book');

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

var copy = books.map(function(book) {
    return clone(book);
});


function find(filter, callback) {
    if (!filter)
        return process.nextTick(callback.bind(null, null, books));

    // Call the callback on next iteration with this=null, err=null, data=books
    var filtered = books.filter(function(book) {
        var regex = new RegExp(filter, 'i');
        return regex.test(book.author) || regex.test(book.title);
    });
    debug(filtered);
    process.nextTick(callback.bind(null, null, filtered));
}

function findById(id, callback) {
    var found = books.filter(function(book) {
        return book.id === id;
    });
    if (found.length)
        return process.nextTick(callback.bind(null, null, found[0]));
    else
        return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));
}

function createId(title) {
    var words = title.toLowerCase().split(/[ .]/).filter(function(word) {
        return ['a', 'of', 'the'].indexOf(word) === -1;
    });

    if (words.length > 2)
        return words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0);
    else if (words.length > 1)
        return words[0].slice(0, 2) + words[1].charAt(0);
    return words[0].slice(0, 3);
}

function add(book, callback) {
    var id = createId(book.title);
    findById(id, function(err, found) {
        if (found)
            return process.nextTick(callback.bind(null, 'Book already exists, id: ' + id));
        book.id = id;
        books.push(book);
        return process.nextTick(callback.bind(null, null, id));
    });
}

function update(book, callback) {
    var id = book.id;
    findById(id, function(err, found) {
        if (!found)
            return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));

        found.title = book.title;
        found.author = book.author;
        return process.nextTick(callback.bind(null, null, found));
    });
}

function remove(bookOrId, callback) {
    var id = bookOrId.id || bookOrId;
    findById(id, function(err, book) {
        if (!book)
            return process.nextTick(callback.bind(null, 'Book not found, id: ' + id));
        var i = books.indexOf(book);
        books.splice(i, 1);
        return process.nextTick(callback.bind(null, null, book));
    });
}

function reset() {
    books = copy;
}

module.exports = {
    find: find,
    findById: findById,
    add: add,
    update: update,
    remove: remove,
    reset: reset
};

