'use strict';

var express = require('express');
var statusRoute = require('./routes/status');

var app = express();

// Middleware and routes are added with use
app.use('/status', statusRoute);

module.exports = app;
