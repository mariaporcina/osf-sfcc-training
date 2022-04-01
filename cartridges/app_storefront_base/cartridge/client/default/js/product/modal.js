"use strict";

/**
 * Renders a modal window
 */
const modalShow = () => {

    $(document).on("click", ".mymodal-button", function(e) {
        $(".my-exercise-modal").modal("hide");
    });

	//Here we capture the click event associate with the css class mymodal-button
    $(document).on("click", ".mymodal-button", function(e) {
        //Here we will hide the modal
    });

	//Here we capture the click event associate with the css class mymodal-tutorial
    $('.mymodal-tutorial').click(function(){
        $('body').spinner().start();
        $.ajax({
            url: $(".mymodal-tutorial").attr("data-modal-url"), //URL to call our controller,
            method: "GET",
            success: function(data) {
				//Show our modal
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
            error: function (err) {
                //Show the error in the console using chrome tools
                console.log(err);
            }
        });
    })
};

module.exports = () => {
    modalShow();
};