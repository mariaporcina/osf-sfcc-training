'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {

    return next();
});

module.exports = server.exports();