'use strict';

var server = require('server');

server.extend(module.superModule);

server.get('Products', function(req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();

    res.render('cart/products', {
        productsList: currentBasket.productLineItems
    })

    return next();
});

module.exports = server.exports();