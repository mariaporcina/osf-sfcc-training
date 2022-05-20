'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    res.render('filter/filterForm.isml', {
        actionUrl: URLUtils.url('Filter-ShowModal').toString()
    });
    return next();
});

server.get('ShowModal', function(req, res, next) {
    res.render('filter/components/resultModal.isml');

    return next();
});

module.exports = server.exports();