'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();
    var shippingPrice = currentBasket.getShippingTotalPrice();

    return next();
});

module.exports = server.exports();