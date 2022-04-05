'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var myService = LocalServiceRegistry.createService('apptraining.http.gallery.get', {
        createRequest: function(svc, params){
            svc.setRequestMethod("GET");
        },
        parseResponse : function(svc, listOutput) {
            var stringOutput = listOutput.getText();
            var photosJSON = JSON.parse(stringOutput);
            var list = photosJSON.photos.photo;
            var parsedResponse = [];
            for(var i = 0; i < list.length; i++) {
                parsedResponse.push(list[i]);
            }

            return parsedResponse;
        }
    });

    var result = myService.call();

    if(result.status == 'OK') {
        var listPhotos = result.object.iterator();
    } else {
        var listPhotos = null;
    }

    res.render('flickr/gallery', {
        listPhotos: listPhotos
    });

    return next();
});

module.exports = server.exports();