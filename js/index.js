/**
 * ポートフォリオサイト - メインエントリーポイント
 * モジュール分割版：各機能を独立したファイルに分離
 */

import {initHamburgerMenu} from './modules/hamburger-menu.js';
import {initSwiper} from './modules/swiper.js';

// 最小限の初期化: DOM が読み込まれたらハンバーガーメニューだけ初期化する
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initSwiper()
});
