'use strict';

var server = require('server');

server.get('MyAssets', function(req, res, next){

    // geting the assets folder and checking if it exists
    var assetsFolder = dw.content.ContentMgr.getFolder('student_guide_folder');
    if(!empty(assetsFolder)){

        // getting all online articles in folder
        var assetsMap = assetsFolder.getOnlineContent();

        // If there are content assets in the folder
        if(assetsMap.size() > 0){
            var assets = new dw.util.ArrayList();

            // Loop over the list of content assets and add their IDs to our ArrayList
            for(var i = 0; i < assetsMap.size(); i++){
                assets.add(assetsMap[i].getID());
            }

            // Render our template sending the list of Content Assets'IDs
            res.render('folder', { assets: assets });
        }
    }

    return next();
});

module.exports = server.exports();