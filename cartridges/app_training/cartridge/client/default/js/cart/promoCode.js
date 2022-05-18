'use strict';

const showPromoForm = () => {
    const showPromo = $('div.containerShowForm');
    const span = $('span.showPromoFormButton');
    const form = $('div.promo-code-form');

    span.on('click', function() {
        form.show();
        showPromo.hide();
    });
}

module.exports = {
    showPromoForm: showPromoForm()
}