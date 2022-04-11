var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

exports.getConvertedPrice = LocalServiceRegistry.createService('app_training.soap.currencyConverter', {
    initServiceClient: function() {
        this.webReference2 = webreferences2.infovalutar;
        this.serviceClient = this.webReference2.getService('Curs', 'CursSoap');

        return this.serviceClient;
    },
    createRequest: function(service, params){
        var request = new this.webReference2.GetLatestValue();
        request.moneda = params.currencyCode;

        return request;
    },
    execute: function(service, request) {
        return this.serviceClient.getLatestValue(request.moneda);
    },
    parseResponse: function(service, response) {
        return response;
    }
});