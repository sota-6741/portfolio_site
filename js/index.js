/**
 * ポートフォリオサイト - メインエントリーポイント
 * モジュール分割版：各機能を独立したファイルに分離
 */

import { $, $$, log, warn, error } from './utils.js';
import { initSwiper } from './modules/swiper.js';
import { initHamburgerMenu } from './modules/hamburger-menu.js';

/**
 * アプリケーションの初期化
 */
class PortfolioApp {
    constructor() {
        this.swiperInstance = null;
        this.hamburgerMenuInstance = null;
    }

    /**
     * 外部ライブラリの存在確認
     */
    checkLibraries() {
        const libraries = {
            Swiper: typeof Swiper !== 'undefined',
            gsap: typeof gsap !== 'undefined'
        };

        log('ライブラリチェック:', libraries);

        // 必要なライブラリが不足している場合の警告
        if (!libraries.Swiper) {
            warn('Swiper ライブラリが読み込まれていません');
        }
        if (!libraries.gsap) {
            warn('GSAP ライブラリが読み込まれていません');
        }

        return libraries;
    }

    /**
     * DOM要素の存在確認
     */
    checkElements() {
        const elements = {
            hamburgerTrigger: !!$('#hamburger-menu'),
            menu: !!$('.menu'),
            mainContent: !!$('main'),
            wrapper: !!$('.main-content-wrapper'),
            swiperElement: !!$('.card .swiper')
        };

        log('要素チェック:', elements);
        return elements;
    }

    /**
     * Swiperの初期化を実行
     */
    initializeSwiperModule() {
        try {
            log('Swiper初期化開始...');
            this.swiperInstance = initSwiper();

            if (this.swiperInstance) {
                log('Swiper初期化完了');
            }
        } catch (err) {
            error('Swiper初期化エラー:', err);
        }
    }

    /**
     * ハンバーガーメニューの初期化を実行
     */
    initializeHamburgerMenuModule() {
        try {
            log('ハンバーガーメニュー初期化開始...');
            this.hamburgerMenuInstance = initHamburgerMenu();

            if (this.hamburgerMenuInstance) {
                log('ハンバーガーメニュー初期化完了');
            }
        } catch (err) {
            error('ハンバーガーメニュー初期化エラー:', err);
        }
    }

    /**
     * アプリケーション全体の初期化
     */
    initialize() {
        log('DOM読み込み完了 - アプリケーション初期化開始');

        // 事前チェック
        this.checkLibraries();
        this.checkElements();

        // 各モジュールの初期化
        this.initializeSwiperModule();
        this.initializeHamburgerMenuModule();

        log('アプリケーション初期化完了');
    }

    /**
     * アプリケーションの破棄処理
     */
    destroy() {
        // 各インスタンスの破棄
        if (this.hamburgerMenuInstance && typeof this.hamburgerMenuInstance.cleanup === 'function') {
            this.hamburgerMenuInstance.cleanup();
        }

        if (this.swiperInstance && typeof this.swiperInstance.destroy === 'function') {
            this.swiperInstance.destroy();
        }

        log('アプリケーション破棄完了');
    }
}

// アプリケーションインスタンスをグローバルに保持（デバッグ用）
let portfolioApp = null;

// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        portfolioApp = new PortfolioApp();
        portfolioApp.initialize();
    } catch (err) {
        error('アプリケーション初期化で致命的なエラーが発生しました:', err);
        error('スタックトレース:', err.stack);
    }
});

// ページ離脱時のクリーンアップ
window.addEventListener('beforeunload', () => {
    if (portfolioApp && typeof portfolioApp.destroy === 'function') {
        portfolioApp.destroy();
    }
});

// デバッグ用にグローバルアクセスを提供
window.portfolioApp = portfolioApp;
