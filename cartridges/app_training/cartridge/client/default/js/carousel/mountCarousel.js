'use strict';

var Swiper = require('swiper');

const mountCarousel = () => {
    console.log(Swiper)
    const mainSwiper = new Swiper.Swiper('.swiper', {
        modules: [Swiper.Navigation],
        direction: 'horizontal',
        loop: true,
        spaceBetween: 50,
        slidesPerView: 2,
        navigation: {
            nextEl: '.main-swiper-next',
            prevEl: '.main-swiper-prev',
        },
        breakpoints: {
            // when window width is >= 0px
            0: {
                slidesPerView: 1,
            },
            // when window width is >= 445px
            445: {
                slidesPerView: 2,
            },
        }
    });
}

module.exports = () => {
    mountCarousel();
}