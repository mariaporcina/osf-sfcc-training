'use strict';

var footerHelper = require('./../../../../scripts/helpers/footer/footerHelper');

const currentPage = (myParam) => {
    console.log(footerHelper.returnCurrentPage(myParam));
}

module.exports = () => {
    currentPage: currentPage
}