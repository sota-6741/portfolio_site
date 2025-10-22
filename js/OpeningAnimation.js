import {initLoadingTextAnimation} from "./modules/LoadingText.js";

export function initOpeningAnimation() {
    window.addEventListener("load", async () => {
        const opening = document.querySelector(".opening");
        const mask = document.querySelector(".mask");
        const typingContainer = document.querySelector(".typing-container");
        const typingEl = document.getElementById("typing"); // Get typing-content element

        const openingTL = gsap.timeline();

        openingTL.set(mask, {opacity: 1});
        gsap.set(typingEl, { opacity: 1, scale: 1 }); // Set initial state of typing-content to visible

        await initLoadingTextAnimation();

        await openingTL.to(typingContainer, {
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.inOut"
        });

        gsap.to(mask, {
            duration: 1.5,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
            opening.style.display = "none";
            document.body.style.overflow = "auto";
            }
        });
    })
}