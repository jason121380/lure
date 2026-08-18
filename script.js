// ===== 共用工具 =====

// 取得固定在畫面頂端的元件總高度（公告欄 + 導航列），供錨點捲動補償使用
function getStickyOffset() {
    const announcement = document.querySelector('.announcement-bar');
    const navbar = document.querySelector('.navbar');
    const announcementHeight = announcement ? announcement.offsetHeight : 0;
    const navHeight = navbar ? navbar.offsetHeight : 0;
    return announcementHeight + navHeight;
}

// 平滑捲動到指定錨點
function scrollToAnchor(hash) {
    const target = document.querySelector(hash);
    if (!target) return false;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - getStickyOffset() - 20;
    window.scrollTo({
        top: Math.max(targetPosition, 0),
        behavior: 'smooth'
    });
    return true;
}

// ===== 手機版選單 =====
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!mobileMenuBtn || !navLinks) return;

    const body = document.body;

    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // 選單開關
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // 選單項目點擊：關閉選單並處理同頁錨點捲動
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();

            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                if (scrollToAnchor(href)) {
                    e.preventDefault();
                }
            }
        });
    });

    // 點擊選單外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });
});

// ===== 服務項目標籤頁切換 =====
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.service-card').forEach(card => {
        const tabButtons = card.querySelectorAll('.tab-btn');
        const tabContents = card.querySelectorAll('.tab-content');
        if (!tabButtons.length || !tabContents.length) return;

        // 預設顯示第一個標籤
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-tab');
                const targetContent = targetId ? card.querySelector(`#${CSS.escape(targetId)}`) : null;
                if (!targetContent) return;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                targetContent.classList.add('active');
            });
        });
    });
});

// ===== 成功案例輪播 =====
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.case-slider');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    if (!slider || !prevBtn || !nextBtn) return;

    const cards = slider.querySelectorAll('.case-card');
    if (!cards.length) return;

    let currentIndex = 0;

    // 依裝置寬度計算一次可見的卡片數量
    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function getMaxIndex() {
        return Math.max(cards.length - getVisibleCards(), 0);
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    function slideTo(index) {
        currentIndex = Math.min(Math.max(index, 0), getMaxIndex());

        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

        updateButtons();
    }

    prevBtn.addEventListener('click', () => slideTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => slideTo(currentIndex + 1));
    window.addEventListener('resize', () => slideTo(0));

    slideTo(0);
});

// ===== 數字捲動動畫 =====

// 數字動畫函數：保留原本文字中的非數字符號（例如 + 與 %）
function animateNumber(element, start, end, duration) {
    const steps = 50;
    const stepTime = Math.max(Math.floor(duration / steps), 1);
    const increment = Math.max(Math.ceil((end - start) / steps), 1);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = start;

    element.textContent = current + suffix;

    const timer = setInterval(function () {
        current = Math.min(current + increment, end);
        element.textContent = current + suffix;

        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// 元素進入視窗時觸發數字動畫
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll('.number').forEach(number => {
            if (number.dataset.animated) return;

            const endValue = parseInt(number.textContent, 10);
            if (Number.isNaN(endValue)) return;

            number.dataset.animated = 'true';
            animateNumber(number, 0, endValue, 2500);
        });

        observer.unobserve(entry.target);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    document.querySelectorAll('.case-card .case-stats').forEach(statSection => {
        observer.observe(statSection);
    });
});
