'use strict';

function corsMiddleware(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

module.exports = corsMiddleware;


