'use strict';

var debug = require('debug')('express-lab:server');
var http = require('http');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

var app = require('./lib/app');

// Make sure a proper exceptions is logged on exit
process.on('uncaughtException', function(err) {
    console.log("Uncaught exception", err, err.stack);
    process.exit(1);
});


// Utility function to show middleware and routes
// DEBUG=express-lab* npm start
function printRoutes() {
    var middleware = app._router.stack.map(function(route) {
        return route.route ?
            route.route.path :
            route.name + ': ' + route.regexp;
    });
    debug('Middleware');
    debug('\n' + middleware.join('\n') + '\n');
}

function start() {
    var port = process.env.PORT || 3000;

    printRoutes();
    server.listen(port, function() {
        console.log(process.env.NODE_ENV.toUpperCase() + ' server started');
        console.log('Port:', port);
        console.log('URL:', 'http://localhost:' + port);
    });
}


var server = http.createServer(app);
server.app = app;
server.start = start;

module.exports = server;

// Start the app if called directly
if(require.main === module)
    start();


