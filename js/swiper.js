// Swiperモジュール
function initSwiper() {
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

    // 画面幅に応じてボタンの表示/非表示を制御
    function toggleNavigationButtons() {
        const buttons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');
        if (window.innerWidth <= 600) {
            buttons.forEach(button => button.style.display = 'none');
        } else {
            buttons.forEach(button => button.style.display = 'grid');
        }
    }

    // 初期実行
    toggleNavigationButtons();

    // リサイズ時にも実行
    window.addEventListener('resize', toggleNavigationButtons);
}