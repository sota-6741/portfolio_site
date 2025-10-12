// メインエントリーポイント - 全モジュールの初期化を管理
document.addEventListener('DOMContentLoaded', function() {
    console.log('アプリケーション初期化開始');
    // 各モジュールを初期化
    try {
        // Swiperモジュール
        if (typeof initSwiper === 'function') {
            initSwiper();
            console.log('Swiper初期化完了');
        }
        // ハンバーガーメニューモジュール
        if (typeof initHamburgerMenu === 'function') {
            initHamburgerMenu();
            console.log('ハンバーガーメニュー初期化完了');
        }
        console.log('全モジュール初期化完了');
    } catch (error) {
        console.error('初期化エラー:', error);
    }
});
