'use strict';

const switchForm = () => {
    const figureList = $('.login-page figure');
    const cardsList = $('.card');

    figureList.each(function () {
        $(this).on('click', function(event) {
            const clickedElement = event.currentTarget;
            const activateClass = clickedElement.dataset.activatedForm;
            const activeForm = $(`.${activateClass}`);
            cardsList.removeClass('activeCard');
            activeForm.addClass('activeCard');
        });
    });
}

module.exports = {
    switchForm: switchForm()
}