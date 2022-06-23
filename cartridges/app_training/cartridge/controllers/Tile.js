'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var promotion = require('../scripts/product/promotion');
    var viewData = res.getViewData();

    var price = viewData.product.price;
    var salePrice = price.sales.decimalPrice;

    if(price.list !== null) {

        var standardPrice = price.list.decimalPrice;
        var discountPercentage = promotion.getDiscountPercentage(standardPrice, salePrice);

        viewData.percentageDiscount = discountPercentage;
    } else {
        viewData.percentageDiscount = 0;
    }

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();