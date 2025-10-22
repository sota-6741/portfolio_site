export async function initLoadingTextAnimation() {
    const typingEl = document.getElementById("typing");
    if (!typingEl) return null;
    const caret = typingEl.querySelector(".caret");

    // 表示する文章データ（1行）改行処理は未定義
    const sentence = [
    { kana: "だれかの", kanji: "誰か" },
    { kana: "の", kanji: "の" },
    { kana: "やくに", kanji: "役に" },
    { kana: "たつために", kanji: "立つために"},
    { kana: "せいちょう", kanji: "成長"},
    { kana: "を", kanji: "を" },
    { kana: "つづけたい", kanji: "続けたい" },
    { kana: "。", kanji: "。" },
    ];



    const sleep = ms => new Promise(res => setTimeout(res, ms));

    async function typeKana(kana, el) {
    for (const ch of kana) {
        el.textContent += ch;
        // ランダムな遅延
        await sleep(50 + Math.random() * 40);
    }
    }

    async function convertToKanji(el, kanji) {
    if (!kanji) {
        // 軽い待ちで次に進む
        await sleep(60);
        return;
    }
    el.classList.add("kana");
    await sleep(200);
    el.textContent = kanji;
    el.classList.remove("kana");
    el.classList.add("kanji");
    await sleep(120);
    }

    async function typeSentence(seq) {
    for (const word of seq) {
        const span = document.createElement("span");
        // カーソルの直前に挿入（常にカーソルは末尾）
        typingEl.insertBefore(span, caret);
        await typeKana(word.kana, span);
        await convertToKanji(span, word.kanji);
        await sleep(50);
    }

    // 終了時にカーソルを消す
    caret.style.animation = "none";
    caret.style.opacity = "0";
    }

    await sleep(500);
    await typeSentence(sentence);
    return typingEl;
}