'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var getDiscountPercentage = require('../scripts/product/promotion');
    var viewData = res.getViewData();

    var standardPrice = viewData.product.price.list.decimalPrice;
    var salePrice = viewData.product.price.sales.decimalPrice;
    viewData.percentageDiscount = getDiscountPercentage.getDiscountPercentage(standardPrice, salePrice);

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();