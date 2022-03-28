'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');

function execute(args) {
    if(empty(args.firstParam || args.secondParam || args.thirdParam)) {
        Logger.error("Please set the following parameters(firstParam, secondParam, thirdParam)");
        return new Status(Status.ERROR, "ERROR");
    }

    var statusOK = true;

    try{
        Logger.info("Your script parameters are: {0} {1} {2} !", args.firstParam, args.secondParam, args.thirdParam);
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