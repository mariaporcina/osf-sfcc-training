'use strict';

var server = require('server');

server.get('Products', function(req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();
    var productList = currentBasket.productLineItems;

    res.render('basket/productList', {
        productList: productList
    });
    return next();
});

module.exports = server.exports();