'use strict';

var formValidation = require('../../../../../app_storefront_base/cartridge/client/default/js/components/formValidation');
var createErrorNotification = require('../../../../../app_storefront_base/cartridge/client/default/js/components/errorNotification');

function newsletter() {
    $('form.newsletterRegistration').submit(function(event) {
        var form = $(this);
        event.preventDefault();
        var url = form.attr('action');
        form.spinner().start();
        $('form.newsletterRegistration').trigger('newsletter:submit', event);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form.serialize(),
            success: function(data) {
                form.spinner().stop();
                if(!data.success){
                    formValidation(form, data);
                    $('form.newsletterRegistration').trigger('newsletter:error', data);
                } else {
                    $('form.newsletterRegistration').trigger('newsletter:success', data);
                    location.href = data.redirectUrl;
                }
            },
            error: function(data) {
                if(data.responseJSON.redirectUrl) {
                    window.location.href = data.responseJSON.redirectUrl;
                } else {
                    $('form.newsletterRegistration').trigger('newsletter:error', data);
                    form.spinner.stop();
                }
            }
        });
        return false;
    });
}

module.exports = {
    newsletter: newsletter
}