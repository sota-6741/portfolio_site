document.addEventListener('DOMContentLoaded', function () {
    const mySwiper = new Swiper('.card .swiper', {
        slidesPerView: 1,
        spaceBetween: 33,
        grabCursor: true,
        navigation: {
            nextEl: '.card .swiper-button-next',
            prevEl: '.card .swiper-button-prev',
        },
        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 80,
            }
        },
    });
});
