'use strict';

var formValidation = require('../components/formValidation');

const showNewsletterModal = () => {
    $(document).on("click", "button.newsletter-modal-button", function(event) {
        event.preventDefault();
        var form = $('form.newsletterRegistration');
        var button = $(this);
        $.ajax({
            url: button.attr('data-url'),
            method: 'post',
            dataType: 'json',
            data: form.serialize(),
            success: function(data) {
                $(".my-exercise-modal").modal("hide");
                $('body').spinner().start();
                location.href = data.redirectUrl;
            },
            error: function(error) {
                console.error(error);
            }
        });
    });

    $(document).on("click", "button.newsletter-modal-cancel-button", function() {
        $(".my-exercise-modal").modal("hide");
    });

    $('form.newsletterRegistration').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        $('body').spinner().start();
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                var $html = $(`
                    <div class="modal fade my-exercise-modal" id="myModal" role="dialog">
                        ${data}
                    </div>
                `);
                $html.on("hidden.bs.modal", e => {
                    $(e.target).remove();
                });

                $('body').spinner().stop();
                $html.modal();
            },
            error: function(error) {
                console.error(error);
            }
        });
        return false;
    });
}

module.exports = () => {
    showNewsletterModal();
}