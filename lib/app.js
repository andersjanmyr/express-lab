'use strict';

var express = require('express');
var statusRoute = require('./routes/status');

var app = express();

// Middleware and routes are added with use
app.use('/status', statusRoute);

app.get('/', function(req, res) {
    res.send('Up and running :). Check <a href="/status">status</a>');
});

module.exports = app;
