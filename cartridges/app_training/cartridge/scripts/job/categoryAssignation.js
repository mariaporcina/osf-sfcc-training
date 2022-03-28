'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');

/**
 * @param {*} args parameters configures in the job step
 * @returns void
 */

// declaring function to be executed by the job
function execute(args) {

    // verifying if the argument was passed correctly
    if(empty(args.brand)) {
        Logger.error("Please set the following parameter (brand)");
        return new Status(Status.ERROR, "ERROR");
    }

    // setting the default status to true
    var statusOK = true;

    try{
        // mounting the path where the xml file will be created
        var filePath = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + 'category' + File.SEPARATOR + 'xmlProducts.xml';

        // instantiating a new File object, using the file path mounted above
        var file = new File(filePath);

        // instanciating a new FileWriter object, using the File object created above
        var fileWriter = new FileWriter(file);

        // instanciating a new XMLStreamWriter objetct, using the file writer object
        // this object will be used to create and write the XML file and its tags
        var xsw = new XMLStreamWriter(fileWriter);

        // instanciating a new ProductSearchModel object
        // this will be used to do the search, using the brand sent as a parameter
        var productSearch = new ProductSearchModel();

        // defining a brand refinement, so that we're able to run a search by a specific brand
        productSearch.addRefinementValues('brand', args.brand);
        productSearch.search();

        // retrieving the search result
        var results = productSearch.getProductSearchHits();

        // initializing the creation of the xml file
        xsw.writeStartDocument();

        // defining a catalog tag
        xsw.writeStartElement('catalog');

            // defining the attributes for the catalog tag
            xsw.writeAttribute('xmlns', 'http://www.demandware.com/xml/impex/catalog/2006-10-31');
            xsw.writeAttribute('catalog-id', 'storefront-catalog-m-en');
            while(results.hasNext()) {
                var product = results.next().getProduct();

                // defining a category assignment tag and its attributes for each product returned by the search
                // as long as there is products available
                xsw.writeStartElement('category-assignment');
                    xsw.writeAttribute('category-id', 'my-category');
                    xsw.writeAttribute('product-id', product.ID);
                    xsw.writeStartElement('primary-flag');
                        xsw.writeCharacters('true');

                    // signaling the end of the tag, this method will created the closure tag
                    xsw.writeEndElement();
                xsw.writeEndElement();
            }
        xsw.writeEndElement();

        // signaling the end of the document
        xsw.writeEndDocument();
        xsw.close();

        // using the Logger class to save info to the log file
        Logger.info("Your script parameters are: {0}!", args.brand);
        statusOK = true;
    } catch(error) {

        // changing the status in case of an error, and then logging the error message to the log file
        statusOK = false;
        Logger.error(error.message);
    }

    // verifying the final status and returning it
    if(statusOK) {
        return new Status(Status.OK, "OK");
    } else {
        return new Status(Status.ERROR, "ERROR");
    }
}

exports.execute = execute;