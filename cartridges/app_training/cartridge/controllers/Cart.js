'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function(req, res, next) {
    var Site = require('dw/system/Site');
    var Mail = require('dw/net/Mail');
    var BasketMgr = require('dw/order/BasketMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');

    var currentSite = Site.getCurrent();
    var fromEmail = currentSite.getCustomPreferenceValue('customerServiceEmail');

    var currentCustomer = req.currentCustomer;
    var customerEmail = currentCustomer.profile !== undefined ? currentCustomer.profile.email : undefined;

    var currentBasket = BasketMgr.getCurrentBasket();
    var basketItems = currentBasket.productLineItems;
    var lastAddedItem = basketItems[basketItems.length-1];
    var product = ProductMgr.getProduct(lastAddedItem.productID);

    // var mail = new Mail();
    // mail.addTo(customerEmail);
    // mail.setFrom(fromEmail);
    // mail.setSubject('Confirmation of Your Order');
    // mail.setContent('Product added to your cart');
    // mail.send();

    var viewData = res.getViewData();

    return next();
});

module.exports = server.exports();