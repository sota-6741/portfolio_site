// ハンバーガーメニューモジュール
function initHamburgerMenu() {
    const hamburgerTrigger = document.querySelector(".hamburger-trigger");
    const menu = document.querySelector(".menu");
    const mainContent = document.querySelector("main");
    const hamburgerSpans = hamburgerTrigger.querySelectorAll("span");
    const mainSections = document.querySelectorAll(
        ".main-visual, .about-me, .insert-photo, .works, .contact-contents"
    );

    if (!hamburgerTrigger || !menu || !mainContent) return;

    const mm = gsap.matchMedia();

    // デスクトップ用アニメーション (幅601px以上)
    mm.add("(min-width: 601px)", () => {
        const tl = gsap.timeline({ paused: true, reversed: true });

        tl.to(mainContent, {
            width: "55vw",
            duration: 0.5,
            ease: "power2.inOut",
        })
        .to(mainSections, { width: "100%", duration: 0.5, ease: "power2.inOut" }, "<")
        .to(menu, { x: "0%", visibility: "visible", duration: 0.5, ease: "power2.inOut" }, "<")
        // バツ印アニメーション (CSSベース)
        .to(hamburgerSpans[0], { top: "50%", transform: "translateY(-50%) rotate(45deg)", duration: 0.3, ease: "power2.inOut" }, "<")
        .to(hamburgerSpans[1], { opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<")
        .to(hamburgerSpans[2], { top: "50%", transform: "translateY(-50%) rotate(-45deg)", duration: 0.3, ease: "power2.inOut" }, "<");

        const clickHandler = () => tl.reversed() ? tl.play() : tl.reverse();
        hamburgerTrigger.addEventListener("click", clickHandler);

        // クリーンアップ関数
        return () => {
            hamburgerTrigger.removeEventListener("click", clickHandler);
            tl.kill();
        };
    });

    // モバイル用アニメーション (幅600px以下)
    mm.add("(max-width: 600px)", () => {
        gsap.set(menu, { width: "80vw" }); // モバイルではメニュー幅を80vwに

        const tl = gsap.timeline({ paused: true, reversed: true });

        tl.to(mainContent, {
            x: "-80vw", // 画面外へ移動
            scale: 0.9, // 少し縮小
            duration: 0.5,
            ease: "power2.inOut",
        })
        .to(menu, { x: "0%", visibility: "visible", duration: 0.5, ease: "power2.inOut" }, "<")
        // バツ印アニメーション (CSSベース)
        .to(hamburgerSpans[0], { top: "50%", transform: "translateY(-50%) rotate(45deg)", duration: 0.3, ease: "power2.inOut" }, "<")
        .to(hamburgerSpans[1], { opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<")
        .to(hamburgerSpans[2], { top: "50%", transform: "translateY(-50%) rotate(-45deg)", duration: 0.3, ease: "power2.inOut" }, "<");

        const clickHandler = () => tl.reversed() ? tl.play() : tl.reverse();
        hamburgerTrigger.addEventListener("click", clickHandler);

        // クリーンアップ関数
        return () => {
            hamburgerTrigger.removeEventListener("click", clickHandler);
            tl.kill();
            gsap.set(menu, { clearProps: "width" }); // GSAPで設定したwidthをクリア
        };
    });
}