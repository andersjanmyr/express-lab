'use strict';

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');

var corsMiddleware = require('./cors-middleware');
var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');
var MongoBook = require('./models/mongo-book');



var db = mongoskin.db('mongodb://@localhost:27017/express-lab-test', {safe:true});
var book = new MongoBook(db);
var app = express();

app.get('/', function(req, res) {
    res.send('Up and running :). Check <a href="/status">status</a>');
});

// Middleware and routes are added with use
app.use(bodyParser.json());

app.use(corsMiddleware);
app.use('/status', statusRouter);
app.use('/books', booksRouter(book));

module.exports = app;
