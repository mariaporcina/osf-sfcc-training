'use strict';

var Swiper = require('swiper');

const mountCarousel = () => {
    // console.log(new Swiper.Swiper);
    // const Swiper = SwiperModule.Swiper;
    // const navigationSwiper = new Swiper.Swiper('.navigation-swiper', {
    //     // Optional parameters
    //     direction: 'horizontal',
    //     loop: true,
    //     centeredSlides: true,
    //     spaceBetween: 15,

    //     // If we need pagination
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },

    //     // Navigation arrows
    //     // navigation: {
    //     //     nextEl: '.swiper-button-next',
    //     //     prevEl: '.swiper-button-prev',
    //     // },
    // });

    const mainSwiper = new Swiper.Swiper('.main-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        spaceBetween: 15,
        slidesPerView: 3,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            // when window width is >= 320px
            0: {
              slidesPerView: 1,
            },
            // when window width is >= 480px
            320: {
              slidesPerView: 2,
            },
            // when window width is >= 640px
            600: {
              slidesPerView: 3,
            }
          }
    });
}

module.exports = () => {
    mountCarousel()
}