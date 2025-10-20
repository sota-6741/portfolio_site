import {$} from '../utils/utils.js';

// TODO: reverse()アニメーション時にmenuItemsのhoverを無効化する

export function initHamburgerMenu() {
    // テキストを分割してspanタグで囲む
    const menuItems = document.querySelectorAll('.menu-link, .menu-icon');
    menuItems.forEach(item => {
        // 画像を持つ場合
        const img = item.querySelector('img');
        if (img) {
            const wrapper = document.createElement('span');
            wrapper.classList.add('char');
            item.replaceChild(wrapper, img);
            wrapper.appendChild(img);
            return; // 画像の場合はテキスト分割をスキップ
        }

        if (item.textContent.trim().length > 0) {
            const text = item.textContent;
            item.innerHTML = ''; // 元のテキストをクリア
            for (let i = 0; i < text.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char');
                charSpan.textContent = text[i];
                item.appendChild(charSpan);
            }
        }
    });

    const trigger = $('#hamburger-menu');
    const menu = document.querySelector('.menu');

    /*------------------------------
    * menu表示タイムライン
    ------------------------------*/
    const menuTL = gsap.timeline({
        paused: true,
        reversed: true,
        onStart: () => trigger.classList.add('active'),
        onReverseComplete: () => trigger.classList.remove('active')
    });

    // menu表示アニメーション
    menuTL
        .set(menuItems, { pointerEvents: 'none' })
        .fromTo(menu,
        { // From
            opacity: 0,
            filter: 'blur(25px)'
        },
        { // To
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.inOut',
            visibility: 'visible'
        }
    );

    /*------------------------------
    * menu-item表示タアニメーション
    ------------------------------*/
    const itemTL = gsap.timeline();

    menuItems.forEach(item => {
        const chars = item.querySelectorAll('.char');
        const itemAnimation = gsap.timeline();
        itemAnimation.fromTo(
            chars,
            { filter: 'blur(8px)', opacity: 0 },
            {
                keyframes: [
                    { filter: 'blur(2px)', opacity: 1, duration: 0.33 },
                    { filter: 'blur(0px)', opacity: 1, duration: 0.17 },
                ],
                stagger: 0.1, // 各文字間の遅延
            }
        );
        itemTL.add(itemAnimation, 0); // すべてのリンクアニメーションを同時に開始
    });

    // menuTL後にitemTLを再生
    menuTL.add(itemTL, '>0.02')
        .set(menuItems, { pointerEvents: 'auto' });

    trigger.addEventListener('click', () => {
        menuTL.reversed() ? menuTL.play() : menuTL.reverse();
    });

    // メニューリンククリック時にメニューを閉じる
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (trigger.classList.contains('active')) {
                menuTL.reverse();
            }
        });
    });
}