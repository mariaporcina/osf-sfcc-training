'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    res.render('filter/filterForm.isml');
    return next();
});

module.exports = server.exports();