'use strict';

const showResults = () => {
    const form = $('form.filterForm');
    const okButton = $('button.filter-modal-button');
    const filterInput = $('input.filterInput');

    form.on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: form.attr('action'),
            method: "GET",
            success: function(data) {
                const modal = $(`
                    <div class="modal fade my-exercise-modal" id="myModal" role="dialog">
                        ${data}
                    </div>
                `);

                modal.on('hidden.bs.modal', event => {
                    $(event.target).remove();
                });

                const inputValue = filterInput.val();

                modal.on('shown.bs.modal', () => {
                    const span = $('span.keyWord');
                    span.text(inputValue);
                });

                modal.modal();
            },
            error: function(err) {
                console.error(err);
            }
        });
        return false;
    });

    $(document).on('click', okButton, event => {
        if($(event.target).prop('tagName') === "BUTTON"){
            $('#myModal').modal('hide');
        }
    });
}

module.exports = () => {
    showResults();
}