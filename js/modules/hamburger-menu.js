import {$} from '../utils.js';

export function initHamburgerMenu() {
    // テキストを分割してspanタグで囲む
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        const text = link.textContent;
        link.innerHTML = ''; // 元のテキストをクリア
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.textContent = text[i];
            link.appendChild(charSpan);
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
    menuTL.fromTo(menu,
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
    * menu-link表示タアニメーション
    ------------------------------*/
    const linkTL = gsap.timeline();

    menuLinks.forEach(link => {
        const chars = link.querySelectorAll('.char');
        const linkAnimation = gsap.timeline();
        linkAnimation.fromTo(
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
        linkTL.add(linkAnimation, 0); // すべてのリンクアニメーションを同時に開始
    });

    // menuTL後にlinkTLを再生
    menuTL.add(linkTL, '>0.02');

    trigger.addEventListener('click', () => {
        menuTL.reversed() ? menuTL.play() : menuTL.reverse();
    });

    // メニューリンククリック時にメニューを閉じる
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (trigger.classList.contains('active')) {
                menuTL.reverse();
            }
        });
    });
}