'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function(req, res, next) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');

    var viewData = res.getViewData();

    var productId = viewData.product.id.toString();
    var product = ProductMgr.getProduct(productId);
    var category = product.primaryCategory;
    var categoryId = category.ID;

    // var sortingOptions = CatalogMgr.getSortingOptions(); <- also an valid option
    // var priceLowToHigh = sortingOptions[1];
    var sortingRule = CatalogMgr.getSortingRule('price-low-to-high'); // <- more practicle option

    var myProductSearch = new ProductSearchModel();
    myProductSearch.setSortingRule(sortingRule);
    myProductSearch.setCategoryID(categoryId);
    myProductSearch.search();

    viewData.searchResult = myProductSearch.getProductSearchHits();

    res.setViewData(viewData);

    res.render('product/productDetails');

    return next();
});

module.exports = server.exports();