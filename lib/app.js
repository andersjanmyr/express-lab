'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');


var app = express();

app.get('/', function(req, res) {
    res.send('Up and running :). Check <a href="/status">status</a>');
});

// Middleware and routes are added with use
app.use(bodyParser.json());

app.use('/status', statusRouter);
app.use('/books', booksRouter);

module.exports = app;
