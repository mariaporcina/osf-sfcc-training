'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var myService = LocalServiceRegistry.createService('app_training.ocapi.product.search.service', {
        createRequest: function(service, params) {
            service.setRequestMethod('GET');
        },
        parseResponse: function(service, response) {
            var stringOutput = response.getText();
            var productList = JSON.parse(stringOutput);
            return productList.hits;
        }
    });

    var serviceResult = myService.call();

    if(serviceResult.ok) {
        var productList = serviceResult.object;
    }

    res.render('productSearch/products', {
        productList: productList
    });

    return next();
});

module.exports = server.exports();