'use strict';

function getDiscountPercentage(standardPrice, salePrice) {
    var percentage = (Number(salePrice) * 100) / Number(standardPrice);
    var percentageDiscount = 100 - percentage;
    var formattedPercentage = Math.round(percentageDiscount).toFixed(0);

    return formattedPercentage;
}

module.exports = {
    getDiscountPercentage: getDiscountPercentage
};