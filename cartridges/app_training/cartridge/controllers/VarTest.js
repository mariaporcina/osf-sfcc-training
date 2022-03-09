'use strict';

var server = require('server');

server.get('VarTest', function(req, res, next) {
    res.render('practice/vartest');

    return next();
});

module.exports = server.exports()