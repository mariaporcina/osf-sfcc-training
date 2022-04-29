'use strict';

var Swiper = require('swiper');

const mountCarousel = () => {
  const navigationSwiper = new Swiper.Swiper('.navigation-swiper', {
    // Optional parameters
    modules: [Swiper.Navigation],
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.navigation-swiper-next',
      prevEl: '.navigation-swiper-prev',
    },
  });

  const mainSwiper = new Swiper.Swiper('.main-swiper', {
    // Optional parameters
    modules: [Swiper.Navigation],
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,

    // Navigation arrows
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
      // when window width is >= 600px
      600: {
        slidesPerView: 3,
      }
    }
  });
}

module.exports = () => {
    mountCarousel()
}