import EventBus from "./utils/EventBus.js";
window.EventBus = EventBus;
import WebGL from "./modules/WebGL.js";
import Mouse from "./modules/Mouse.js";


if(!window.isDev) window.isDev = false;

const webglMng = new WebGL({
    $wrapper: document.body
});

function simulateInitialDrag() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 200; // 円運動の半径
    const duration = 2000; // 円運動の持続時間（ミリ秒）
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 2); // Progressは0から2

        const angle = progress * Math.PI * 2;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        Mouse.setCoords(x, y);

        if (progress < 2) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

simulateInitialDrag();
