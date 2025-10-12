// ハンバーガーメニューモジュール
function initHamburgerMenu() {
    const hamburgerTrigger = document.querySelector('.hamburger-trigger');

    if (hamburgerTrigger) {
        hamburgerTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    }
}