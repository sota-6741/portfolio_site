export class LoadingText {
    constructor({ targetId = "typing", loadedSentence = null, loadingSentence = null } = {}) {
        this.typingEl = document.getElementById(targetId);
        if (!this.typingEl) return null;
        this.caret = this.typingEl.querySelector(".caret");

        // ローディング完了後に表示する文
        this.loadedSentence = loadedSentence || [
            { kana: "だれかの", kanji: "誰か" },
            { kana: "の", kanji: "の" },
            { kana: "やくに", kanji: "役に" },
            { kana: "たつために", kanji: "立つために" },
            { kana: "せいちょう", kanji: "成長" },
            { kana: "を", kanji: "を" },
            { kana: "つづけたい", kanji: "続けたい" },
            { kana: "。", kanji: "。" },
        ];

        // ローディング中に表示する文
        this.loadingSentence = loadingSentence || [
            { english: "Now loading..." },
        ];
    }

    sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    async typeKana(kana, el) {
        for (const ch of kana) {
            el.textContent += ch;
            await this.sleep(50 + Math.random() * 40);
        }
    }

    async typeEnglish(english, el) {
        for (const ch of english) {
            el.textContent += ch;
            await this.sleep(50 + Math.random() * 40);
        }
    }

    async convertToKanji(el, kanji) {
        if (!kanji) {
            await this.sleep(60);
            return;
        }
        el.classList.add("kana");
        await this.sleep(200);
        el.textContent = kanji;
        el.classList.remove("kana");
        el.classList.add("kanji");
        await this.sleep(120);
    }

    async typeLoadedSentence(seq) {
        if (this.caret) {
            this.caret.style.opacity = "1";
            this.caret.style.animation = ""; // CSSの点滅アニメ再適用
            if (!this.typingEl.contains(this.caret)) {
                this.typingEl.appendChild(this.caret);
            }
        }
        for (const word of seq) {
            const span = document.createElement("span");
            if (this.caret && this.typingEl.contains(this.caret)) {
                this.typingEl.insertBefore(span, this.caret);
            } else {
                this.typingEl.appendChild(span);
            }
            await this.typeKana(word.kana, span);
            await this.convertToKanji(span, word.kanji);
            await this.sleep(50);
        }
        this.caret.style.animation = "none";
        this.caret.style.opacity = "0";
    }

    async typeLoadingSentence(seq) {
        for (const word of seq) {
            const span = document.createElement("span");
            if (this.caret && this.typingEl.contains(this.caret)) {
                this.typingEl.insertBefore(span, this.caret);
            } else {
                this.typingEl.appendChild(span);
            }
            await this.typeEnglish(word.english, span);
        }
    }

    // すべてのテキストを右端から1文字ずつ消す関数
    async removeTextRightToLeft(speed = 150) {
        if (!this.typingEl) return;
        const spans = Array.from(this.typingEl.querySelectorAll("span"));
        spans.reverse();

        // キャレットを再表示（もし非表示なら）
        if (this.caret) {
            this.caret.style.opacity = "1";
            this.caret.style.animation = ""; // CSS側の点滅アニメを再適用
            if (!this.typingEl.contains(this.caret)) {
                this.typingEl.appendChild(this.caret);
            }
        }
        for (const span of spans) {
            let text = span.textContent;
            while (text.length > 0) {
                text = text.slice(0, -1);
                span.textContent = text;
                await this.sleep(speed);
            }
            span.remove();
        }
    }

    async loadingText() {
        await this.sleep(500);
        await this.typeLoadingSentence(this.loadingSentence);
        return this.typingEl;
    }

    async loadedText() {
        await this.sleep(500);
        await this.typeLoadedSentence(this.loadedSentence);
        return this.typingEl;
    }
}