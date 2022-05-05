
'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var viewData = res.getViewData();

    var result = searchHelper.search(req, res);

    var categoryId = result.productSearch.category.id;
    var category = CatalogMgr.getCategory(categoryId);

    var badgeConfiguration = {
        backgroundColor: category.custom.badgeBackgroundColor,
        textColor: category.custom.badgeTextColor,
        text: category.custom.badgeTextValue
    };

    viewData.badge = badgeConfiguration;
    res.setViewData(viewData);

    res.render('search/searchResults');

    return next();
});

module.exports = server.exports();