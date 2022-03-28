'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');

function execute(args) {
    if(empty(args.brand)) {
        Logger.error("Please set the following parameter (brand)");
        return new Status(Status.ERROR, "ERROR");
    }

    var statusOK = true;

    try{
        var filePath = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + 'category' + File.SEPARATOR + 'xmlProducts.xml';
        var file = new File(filePath);
        var fileWriter = new FileWriter(file);
        var xsw = new XMLStreamWriter(fileWriter);

        var productSearch = new ProductSearchModel();
        productSearch.addRefinementValues('brand', args.brand);
        productSearch.search();

        var results = productSearch.getProductSearchHits();

        xsw.writeStartDocument();
        xsw.writeStartElement('catalog');
            xsw.writeAttribute('xmlns', 'http://www.demandware.com/xml/impex/catalog/2006-10-31');
            xsw.writeAttribute('catalog-id', 'storefront-catalog-m-en');
            while(results.hasNext()) {
                var product = results.next().getProduct();
                xsw.writeStartElement('category-assignment');
                    xsw.writeAttribute('category-id', 'my-category');
                    xsw.writeAttribute('product-id', product.ID);
                    xsw.writeStartElement('primary-flag');
                        xsw.writeCharacters('true');
                    xsw.writeEndElement();
                xsw.writeEndElement();
            }
        xsw.writeEndElement();
        xsw.writeEndDocument();
        xsw.close();

        Logger.info("Your script parameters are: {0}!", args.brand);
        statusOK = true;
    } catch(error) {
        statusOK = false;
        Logger.error(error.message);
    }

    if(statusOK) {
        return new Status(Status.OK, "OK");
    } else {
        return new Status(Status.ERROR, "ERROR");
    }
}

exports.execute = execute;