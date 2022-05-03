'use strict';

var server = require('server');

server.get('Products', function(req, res, next) {
    res.render('carousel/carouselProducts');
    return next();
});

module.exports = server.exports();