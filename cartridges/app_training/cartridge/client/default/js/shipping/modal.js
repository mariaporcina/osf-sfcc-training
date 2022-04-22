'use strict';

const showModal = () => {
    $(document).ready(function () {
        console.log('hello world');
        // var form = $(this);
        // var url = form.attr('action');
        // $('body').spinner().start();
        // $.ajax({
        //     url: url,
        //     method: 'GET',
        //     success: function(data) {
        //         var $html = $(`
        //             <div class="modal fade my-exercise-modal" id="myModal" role="dialog">
        //                 ${data}
        //             </div>
        //         `);
        //         $html.on("hidden.bs.modal", e => {
        //             $(e.target).remove();
        //         });

        //         $('body').spinner().stop();
        //         $html.modal();
        //     },
        //     error: function(error) {
        //         console.error(error);
        //     }
        // });
        // return false;
    });

}

module.exports = () => {
    showModal();
}