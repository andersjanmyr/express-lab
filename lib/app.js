'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');
var book = require('./models/book');


var app = express();

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/status', statusRouter);
app.use('/books', booksRouter(book));
app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
}

app.setupWebsockets = setupWebsockets;
module.exports = app;
