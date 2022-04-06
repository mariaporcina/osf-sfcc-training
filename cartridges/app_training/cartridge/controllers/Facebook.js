'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    res.render('facebook/login');

    return next();
});

module.exports = server.exports();