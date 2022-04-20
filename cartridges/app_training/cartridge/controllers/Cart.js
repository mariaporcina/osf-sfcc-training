'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function(req, res, next) {
    var Site = require('dw/system/Site');
    var BasketMgr = require('dw/order/BasketMgr');
    var HashMap = require('dw/util/HashMap');
    var Template = require('dw/util/Template');
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');

    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');

    var currentSite = Site.getCurrent();
    var fromEmail = currentSite.getCustomPreferenceValue('customerServiceEmail');

    var currentCustomer = req.currentCustomer;
    var customerEmail = currentCustomer.profile !== undefined ? currentCustomer.profile.email : undefined;

    var currentBasket = BasketMgr.getCurrentBasket();
    var basketItems = currentBasket.productLineItems;
    var lastAddedItem = basketItems[basketItems.length-1];
    var product = lastAddedItem.product;

    var productPrice = product.getPriceModel();

    var productAttributes = {
        productName: product.getName(),
        productURL: URLUtils.https('Product-Show', 'pid', product.ID).toString(),
        productImage: product.getImage('medium').absURL,
        productDescription: product.getShortDescription(),
        productQuantity: lastAddedItem.quantityValue,
        pricePerUnit: productPrice.pricePerUnit.decimalValue,
        priceCurrency: productPrice.pricePerUnit.currencyCode
    }

    var emailObject = {
        to: customerEmail,
        from: fromEmail,
        subject: Resource.msg('msg.mail.added.tocart.subject', 'cart', null)
    }

    emailHelpers.send(emailObject, 'cart/mailAddedProduct.isml', productAttributes);

    return next();
});

module.exports = server.exports();