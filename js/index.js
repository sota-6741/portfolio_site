import {initOpeningAnimation} from './OpeningAnimation.js';
import {initHamburgerMenu} from './modules/hamburger-menu.js';
import {initSwiper} from './modules/swiper.js';
import {initsectionTitleAnimation} from './modules/sectionTitleAnimation.js';

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  initOpeningAnimation(); // オープニングアニメーションを呼ぶ
  initsectionTitleAnimation();
  initHamburgerMenu();
  initSwiper();
});