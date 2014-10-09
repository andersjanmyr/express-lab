'use strict';

var debug = require('debug')('express-lab:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');
var Book = require('./models/book');
var book = new Book();


var app = express();

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/status', statusRouter);
app.use('/books', booksRouter(book));
app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
    debug('setupWebsockets');
    // Listen to connection events
    io.on('connection', function(socket) {
        debug('Connection established');
    });
}

app.setupWebsockets = setupWebsockets;
module.exports = app;
