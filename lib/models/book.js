'use strict';

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


function find(filter, callback) {
    // Call the callback on next iteration with this=null, err=null, data=books
    var filtered = books.filter(function(book) {
        var regex = new RegExp(filter, 'i');
        return regex.test(book.author) || regex.test(book.title);
    });
    process.nextTick(callback.bind(null, null, filtered));
}

function findById(id) {
}

module.exports = {
    find: find,
    findById: findById,

}

