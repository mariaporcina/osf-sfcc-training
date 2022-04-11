'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var CurrencyConverterService = require('../services/CurrencyConverterService');
    var BasketMgr = require('dw/order/BasketMgr');
    var viewData = res.getViewData();

    var currentBasket = BasketMgr.getCurrentBasket();
    var basketTotal = currentBasket.getTotalGrossPrice();

    var value = basketTotal.decimalValue;
    var currency = basketTotal.currencyCode;

    var result = {
        error: false,
        message: '',
        value: ''
    }

    var myServiceResult = CurrencyConverterService.getConvertedPrice.call({currencyCode: currency});

    if(myServiceResult.ok) {
        var convertedPrice = value * myServiceResult.object;
        convertedPrice = convertedPrice.toFixed(2);
    } else {
        var convertedPrice = null;
    }

    viewData.ronPrice = convertedPrice;
    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();