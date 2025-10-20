/**
 * Swiper カルーセル機能
 * ポートフォリオ作品のスライドショー管理
 */

import { $, $$, warn } from '../utils/utils.js';

/**
 * Swiperの初期化
 * レスポンシブ対応とナビゲーションボタン制御を含む
 */
export function initSwiper() {
    // SwiperライブラリのXXXX存在確認
    if (typeof Swiper === 'undefined') {
        warn('Swiper が読み込まれていません');
        return;
    }

    // Swiper要素の存在確認
    const swiperElement = $('.card .swiper');
    if (!swiperElement) {
        warn('Swiper要素が見つかりません');
        return;
    }

    // Swiperインスタンスを作成
    const swiperInstance = new Swiper('.card .swiper', {
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
                spaceBetween: 80
            }
        },
    });

    // ナビゲーションボタンの表示制御
    setupNavigationControl();

    return swiperInstance;
}

/**
 * ナビゲーションボタンのレスポンシブ制御
 * 600px以下ではボタンを非表示にする
 */
function setupNavigationControl() {
    const toggleNavigation = () => {
        const buttons = $$('.swiper-button-prev, .swiper-button-next');
        const display = window.innerWidth <= 600 ? 'none' : 'grid';
        buttons.forEach(btn => btn.style.display = display);
    };

    // 初期設定とリサイズイベントの登録
    toggleNavigation();
    window.addEventListener('resize', toggleNavigation);
}