/**
 * ハンバーガーメニュー機能
 * GSAPを使用したアニメーション付きナビゲーション
 */

import { $, $$, setVar, removeVar, warn, error } from '../utils.js';

/**
 * ハンバーガーボタンのCSSアニメーション定義を動的に追加
 */
function addHamburgerStyles() {
    const styles = `
        <style id="hamburger-animation-styles">
        .hamburger-trigger span {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-origin: center;
            will-change: transform, opacity;
        }

        .hamburger-trigger.active span:nth-of-type(1) {
            top: 50% !important;
            transform: translateY(-50%) rotate(45deg) scaleX(1) !important;
            width: 100% !important;
        }

        .hamburger-trigger.active span:nth-of-type(2) {
            opacity: 0 !important;
            transform: translateY(-50%) scale(1) !important;
        }

        .hamburger-trigger.active span:nth-of-type(3) {
            bottom: 50% !important;
            transform: translateY(50%) rotate(-45deg) scaleX(1) !important;
            width: 100% !important;
        }

        /* 初期状態（activeクラスがない時のデフォルトスタイル） */
        .hamburger-trigger:not(.active) span:nth-of-type(1) {
            transform: translateY(0) rotate(0deg) !important;
        }

        .hamburger-trigger:not(.active) span:nth-of-type(2) {
            opacity: 1 !important;
            transform: translateY(-50%) scale(1) !important;
        }

        .hamburger-trigger:not(.active) span:nth-of-type(3) {
            transform: translateY(0) rotate(0deg) !important;
        }
        </style>
    `;

    // 既に追加されていない場合のみ追加
    if (!document.getElementById('hamburger-animation-styles')) {
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

/**
 * ハンバーガーメニューの初期化
 * レスポンシブ対応のGSAPアニメーション設定
 */
export function initHamburgerMenu() {
    // CSSアニメーションスタイルを追加
    addHamburgerStyles();

    // DOM要素の取得
    const elements = {
        trigger: $('#hamburger-menu'),
        menu: $('.menu'),
        content: $('main'),
        wrapper: $('.main-content-wrapper'),
        spans: $$('#hamburger-menu span')
    };

    // 要素の存在確認
    if (!elements.trigger || !elements.menu || !elements.content || !elements.wrapper) {
        warn('ハンバーガーメニューの要素が見つかりません:', {
            trigger: !!elements.trigger,
            menu: !!elements.menu,
            content: !!elements.content,
            wrapper: !!elements.wrapper
        });
        return;
    }

    // GSAPライブラリの存在確認
    if (typeof gsap === 'undefined') {
        error('GSAP が読み込まれていません');
        return;
    }

    // 初期化時に全要素を初期状態にリセット
    resetToInitialState(elements);

    // ハンバーガーメニューのインスタンスを作成
    const hamburgerMenu = new HamburgerMenu(elements);
    
    return hamburgerMenu;
}

/**
 * ハンバーガーメニュークラス
 * アニメーション制御とイベント管理
 */
class HamburgerMenu {
    constructor(elements) {
        this.elements = elements;
        this.timeline = null;
        this.observer = null;
        this.isOpen = false;
        
        this.setupResponsiveAnimations();
        this.bindEvents();
    }

    /**
     * レスポンシブアニメーションのセットアップ
     */
    setupResponsiveAnimations() {
        const mm = gsap.matchMedia();

        // デスクトップ版（601px以上）
        mm.add("(min-width: 601px)", () => {
            this.setupDesktopAnimation();
            return () => this.cleanup();
        });

        // モバイル版（600px以下）
        mm.add("(max-width: 600px)", () => {
            this.setupMobileAnimation();
            return () => this.cleanup();
        });
    }

    /**
     * デスクトップ用アニメーション設定
     */
    setupDesktopAnimation() {
        const { content, wrapper, menu } = this.elements;

        // 幅監視の設定
        this.observer = new ResizeObserver(() => {
            setVar('container-width', `${wrapper.getBoundingClientRect().width}px`);
        });
        this.observer.observe(wrapper);
        setVar('container-width', `${wrapper.getBoundingClientRect().width}px`);

        // 初期状態を設定
        gsap.set(content, { clearProps: "all" });
        gsap.set(wrapper, { clearProps: "all" });
        gsap.set(menu, { x: "100%", visibility: "hidden" });

        // アニメーションタイムラインの作成
        this.timeline = gsap.timeline({
            paused: true,
            onReverseComplete: () => this.resetToInitialStateOnComplete()
        })
        .to(content, { 
            width: "55vw", 
            overflow: "hidden", 
            duration: 0.3, 
            ease: "power2.out" 
        })
        .to(menu, { 
            x: "0%", 
            visibility: "visible", 
            duration: 0.3, 
            ease: "power2.out" 
        }, "<");
    }

    /**
     * モバイル用アニメーション設定
     */
    setupMobileAnimation() {
        const { content, wrapper, menu } = this.elements;

        // 初期状態を設定
        gsap.set(content, { clearProps: "all" });
        gsap.set(wrapper, { clearProps: "all" });
        gsap.set(menu, { width: "80vw", x: "100%", visibility: "hidden" });

        // アニメーションタイムラインの作成
        this.timeline = gsap.timeline({
            paused: true,
            onStart: () => {
                setVar('viewport-scale', 0.2);
            },
            onReverseComplete: () => this.resetToInitialStateOnComplete()
        })
        .to(wrapper, {
            x: "-80vw",
            duration: 0.3,
            ease: "power2.out"
        })
        .to(content, { 
            overflow: "hidden", 
            duration: 0.3 
        }, "<")
        .to(menu, { 
            x: "0%", 
            visibility: "visible", 
            duration: 0.3 
        }, "<");
    }

    /**
     * メニューのトグル機能
     */
    toggle() {
        if (this.timeline) {
            if (this.isOpen) {
                // メニューを閉じる
                this.elements.trigger.classList.remove('active');
                this.timeline.reverse();
                this.isOpen = false;
            } else {
                // メニューを開く
                this.elements.trigger.classList.add('active');
                this.timeline.play();
                this.isOpen = true;
            }
        }
    }

    /**
     * アニメーション完了時の初期状態リセット
     */
    resetToInitialStateOnComplete() {
        const { content, wrapper, menu } = this.elements;

        // GSAPプロパティを完全にクリア
        gsap.set([content, wrapper, menu], { clearProps: "all" });
        gsap.set(menu, { x: "100%", visibility: "hidden" });

        // CSS変数をクリア
        removeVar('container-width');
        removeVar('viewport-scale');
    }

    /**
     * イベントの登録
     */
    bindEvents() {
        this.elements.trigger.addEventListener('click', () => this.toggle());
    }

    /**
     * クリーンアップ処理
     */
    cleanup() {
        // タイムラインの破棄
        if (this.timeline) {
            this.timeline.kill();
            this.timeline = null;
        }

        // オブザーバーの切断
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        // 完全な初期状態リセット
        resetToInitialState(this.elements);

        this.isOpen = false;
    }
}

/**
 * 要素を初期状態にリセットする共通関数
 */
function resetToInitialState(elements) {
    const { trigger, menu, content, wrapper } = elements;

    // GSAPプロパティを完全にクリア
    gsap.set([content, wrapper, menu], { clearProps: "all" });
    gsap.set(menu, { x: "100%", visibility: "hidden" });

    // CSS activeクラスをリセット
    trigger.classList.remove('active');

    // CSS変数をクリア
    removeVar('container-width');
    removeVar('viewport-scale');
}