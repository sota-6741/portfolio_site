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

        this.loader = new LoadingText();

        const startPromise = new Promise(resolve => {
            const start = async () => {
                await this.startLoadingAnimation();
                resolve();
            };

            // DOM が既に interactive/complete の場合は即開始
            if (document.readyState === "interactive" || document.readyState === "complete") {
                start().catch(err => console.error("startLoadingAnimation failed:", err));
            } else {
                // DOMContentLoaded を使う（DOMContentLoaded は DOM 構築完了を表す）
                document.addEventListener("DOMContentLoaded", () => {
                    start().catch(err => console.error("startLoadingAnimation failed:", err));
                }, { once: true });
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
        if (this._started) return;
        this._started = true;
        if (this.loader && typeof this.loader.loadingText === "function") {
            // loadingText が Promise を返す想定
            await this.loader.loadingText();
        }
    }

    async endLoadingAnimation() {
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
            duration: 1,
            ease: "power2.inOut"
        }).to(this.mask, {
            duration: 1.5,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
            this.opening.style.display = "none";
            document.body.style.overflow = "auto";
            }
        });
    }
}