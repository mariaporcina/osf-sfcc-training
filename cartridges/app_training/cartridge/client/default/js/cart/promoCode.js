'use strict';

const showPromoForm = () => {
    const showPromo = $('div.containerShowForm');
    const span = $('.showPromoFormButton');
    const form = $('div.promoCodeForm');

    $(span).on('click', function() {
        form.show();
        showPromo.hide();
    });
}

module.exports = {
    showPromoForm: showPromoForm()
}