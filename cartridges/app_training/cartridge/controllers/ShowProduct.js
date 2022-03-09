'use strict';

var server = require('server');

server.get('Product', function(req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');

    var myProductId = req.querystring.pid;
    var someProduct = ProductMgr.getProduct(myProductId);

    var viewData = res.getViewData();
    viewData.myProduct = someProduct;
    res.setViewData(viewData);

    res.render('practice/vartest'/*, { myProduct: someProduct } => also an valid option*/);

    return next();
});

server.get('RenderTemplate', function(req, res, next) {
    res.render('practice/rendertemplate');

    return next();
});

server.get('TestRemoteInclude', function(req, res, next) {
    res.render('practice/testremoteinclude');

    return next();
});

module.exports = server.exports();