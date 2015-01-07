'use strict';

var debug = require('debug')('express-lab:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');
var MongoBook = require('./models/mongo-book');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/express-lab-dev', {safe:true});

var book = new MongoBook(db);

var app = express();

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/status', statusRouter);
app.use('/books', booksRouter(book));
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
