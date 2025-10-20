import {$} from '../utils.js';

export function initsectionTitleAnimation() {
    const sectionTitles = document.querySelectorAll('.js-text-animation');
    sectionTitles.forEach(tilte => {
        const text = tilte.textContent;
        tilte.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.textContent = text[i];
            tilte.appendChild(charSpan);
        }
    });

    sectionTitles.forEach(item => {
        const chars = item.querySelectorAll('.char');
        gsap.fromTo(
            chars,
            { filter: 'blur(8px)', opacity: 0 },
            {
                keyframes: [
                    { filter: 'blur(2px)', opacity: 1, duration: 0.33 },
                    { filter: 'blur(0px)', opacity: 1, duration: 0.17 },
                ],
                stagger: 0.1, // 各文字間の遅延
                scrollTrigger: {
                    trigger: item,
                    start: "top center",
                    markers: true,
                }
            }
        )
    })
}