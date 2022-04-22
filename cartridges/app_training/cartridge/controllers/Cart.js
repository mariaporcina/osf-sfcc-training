'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var URLUtils = require('dw/web/URLUtils');

    var currentBasket = BasketMgr.getCurrentBasket();
    var shippingPrice = currentBasket.getShippingTotalPrice();

    res.render('cart/cart', {
        url: URLUtils.url('Cart-CouponModal').toString()
    })

    return next();
});

server.get('CouponModal', function(req, res, next) {
    res.render('components/cart/freeShippingModal');

    return next();
});

module.exports = server.exports();