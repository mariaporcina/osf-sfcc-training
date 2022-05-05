'use strict';

// var formValidation = require('./components/formValidation');
// var url;

// module.exports = {
// subscribeNewsletter: function () {
//     $('.subscription-button').click(function (e) {
//         var $form = $('form.newsletter-form');
//         $(document).on("click", ".mymodal-button", function(e) {
//             $(".my-exercise-modal").modal("hide");
//         });
//         e.preventDefault();
//         url = $form.attr('action');
//         $form.spinner().start();
//         $.ajax({
//             url: url,
//             type: 'post',
//             dataType: 'json',
//             data: $form.serialize(),
//             success: function (data) {
//                 $form.spinner().stop();
//                 if (!data.success) {
//                     formValidation($form, data);
//                 } else {
//                     location.href = data.redirectUrl;
//                 }
//             },
//             error: function (err) {
//                 if (err.responseJSON.redirectUrl) {
//                     window.location.href = err.responseJSON.redirectUrl;
//                 }
//                 $form.spinner().stop();
//             }
//         });
//         return false;
//     });
// }
// };

const modalShow = () => {

//     $(document).on("click", ".subscribe-newsletter", function(e) {
//        $(".subscribe-newsletter").modal("hide");
//    });

//    $('button.subscribe-newsletter').on('click', function(event){
//        event.preventDefault();

//        $.ajax({
//            url: $('form.newsletter-form').attr("action"),
//            method: "GET",
//            success: function(data) {
//                var $html = $(`
//                    <div class="modal fade my-exercise-modal" id="myModal" role="dialog">
//                        ${data}
//                    </div>
//                `);

//                $html.on("hidden.bs.modal", e => {
//                    $(e.target).remove();
//                });

//                $html.modal();
//            },
//            error: function (err) {
//                console.log(err);
//            }
//         });

//         return false;
//    });

    $("button.subscribe-newsletter").on("click", function(event) {
        event.preventDefault();

        var form = $('form.newsletter-form');
        var url = form.attr('action');

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

                $html.modal();
            },
            error: function(error) {
                console.error(error);
            }
        });

        return false;
    });
};

module.exports = () => {
   modalShow();
};