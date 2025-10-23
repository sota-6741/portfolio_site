import { LoadingText } from "./modules/LoadingText.js";
import { simulateInitialDrag } from "./SimulateInitialDrag.js";

export class InitOpeningAnimation {
    constructor() {
        this.opening = document.querySelector(".opening");
        this.mask = document.querySelector(".mask");
        this.typingContainer = document.querySelector(".typing-container");
        this.typingEl = document.getElementById("typing");

        this._started = false;
        this._ended = false;
        this._endPlayed = false;

        this.loader = new LoadingText();

        const startPromise = new Promise(resolve => {
            const start = async () => {
                if (this._started) return;
                this._started = true;

                // TODO: Now Loadingの表示初回のみ．
                try {
                    const alreadyVisited = sessionStorage.getItem("visited");

                    if (!alreadyVisited) {
                        await this.startLoadingAnimation();
                        sessionStorage.setItem("visited", "true");
                    }
                    resolve();
                } catch(err) {
                    console.error("startLoadingAnimation failed", err);
                    resolve();
                }
            };

            if (document.readyState === "interactive" || document.readyState === "complete") {
                start();
            } else {
                document.addEventListener("DOMContentLoaded", start, { once: true });
            }
        });

        // 全リソース読み込み完了後の処理
        window.addEventListener("load", async () => {
            if (this._ended) return;
            this._ended = true;

            try {
                await startPromise;
                await this.endLoadingAnimation();
                await simulateInitialDrag();
            } catch (err) {
                console.error("endLoadingAnimation / simulateInitialDrag failed:", err);
            }
        });
    }

    async startLoadingAnimation() {
        if (this.loader && typeof this.loader.loadingText === "function") {
            await this.loader.loadingText();
        }
    }

    async endLoadingAnimation() {
        if (this.endPlayed) return;
        this.endPlayed = true;

        await this.loader.removeTextRightToLeft();
        await this.loader.loadedText();

        const openingTL = gsap.timeline();

        // 初期スタイル設定
        openingTL.set(this.opening, { display: "block", opacity: 1 });
        openingTL.set(this.mask, { opacity: 1 });
        openingTL.set(this.typingEl, { opacity: 1, scale: 1 });

        await openingTL.to(this.typingContainer, {
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.inOut"
        }).to(this.mask, {
            duration: 3,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                this.opening.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
}