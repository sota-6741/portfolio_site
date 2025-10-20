/**
 * ポートフォリオサイト - メインエントリーポイント
 * モジュール分割版：各機能を独立したファイルに分離
 */

import {initHamburgerMenu} from './modules/hamburger-menu.js';
import {initSwiper} from './modules/swiper.js';
import {initsectionTitleAnimation} from './modules/sectionTitleAnimation.js';

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  initsectionTitleAnimation()
  initHamburgerMenu();
  initSwiper()
});
