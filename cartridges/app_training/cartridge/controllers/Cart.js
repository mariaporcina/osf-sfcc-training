'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function(req, res, next) {
    var Site = require('dw/system/Site');
    var currentSite = Site.getCurrent();

    var CustomerCDPData = require('dw/customer/CustomerMgr');
    var teste = CustomerCDPData.getCustomerGroups();

    var currentCustomer = req.currentCustomer;

    var viewData = res.getViewData();


    return next();
});

module.exports = server.exports();