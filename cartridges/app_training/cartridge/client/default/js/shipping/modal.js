'use strict';

const showModal = () => {

    $(document).on('click', 'button.closeModal', function() {
        $(".freeShippingModal").modal("hide");
    });

    $(document).ready(function () {
        var modal = $('.freeShippingModal');
        var url = modal.attr('data-url');
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                console.log(data);
                var $html = $(`
                    <div class="modal fade my-exercise-modal" id="myModal" role="dialog">
                        ${data}
                    </div>
                `);

                $html.on("hidden.bs.modal", e => {
                    $(e.target).remove();
                });

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
    showModal();
}