import {$} from '../utils.js';

export function initHamburgerMenu() {

    const trigger = $('#hamburger-menu');
    const menu = document.querySelector('.menu');

    const menuTL = gsap.timeline({
        paused: true,
        reversed: true,
        onStart: () => trigger.classList.add('active'),
        onReverseComplete: () => trigger.classList.remove('active')
    });

    menuTL.fromTo(menu,
        { // From
            opacity: 0,
            filter: 'blur(15px)'
        },
        { // To
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.inOut',
            visibility: 'visible'
        }
    );

    trigger.addEventListener('click', () => {
        menuTL.reversed() ? menuTL.play() : menuTL.reverse();
    });
}
