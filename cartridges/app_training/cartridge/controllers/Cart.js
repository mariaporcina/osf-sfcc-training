'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var viewData = res.getViewData();

    var currentBasket = BasketMgr.getCurrentBasket();
    viewData.basketTotal = currentBasket.totalGrossPrice;

    res.setViewData(viewData);

    res.render('cart/cart');

    return next();
});

module.exports = server.exports();