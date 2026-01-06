// 語言配置
const translations = {
    'zh': {
        'industries': '依產業',
        'hair': '美髮',
        'beauty': '美容&SPA',
        'medical': '醫美',
        'nail': '美甲美睫紋繡',
        'solutions': '讓美業經營更有效率',
        'services': '服務項目',
        'cases': '客戶案例',
        'pricing': '方案價格',
        'consultation': '免費諮詢',
        'hero-badge': '美業數位化專家，讓美業經營更有效率',
        'hero-title': 'Data-based AI Mar-tech Solutions',
        'hero-subtitle': '整合預約系統、行銷工具、數據分析，助您提升營業額',
        'try-now': '立即體驗',
        'watch-demo': '觀看示範',
        'active-businesses': '活躍商家',
        'satisfaction': '客戶滿意度',
        'growth': '平均業績成長',
        'tech': '科技方案',
        'marketing': '行銷服務',
        'consulting': '專業顧問',
        'video': '影音製作',
        'hair-cases': '美髮案例',
        'beauty-cases': '美容案例',
        'medical-cases': '醫美案例',
        'nail-cases': '美睫案例'
    },
    'en': {
        'industries': 'Industries',
        'hair': 'Hair Salon',
        'beauty': 'Beauty & SPA',
        'medical': 'Medical Beauty',
        'nail': 'Nail, Eyelash & PMU',
        'solutions': 'Business Efficiency',
        'services': 'Services',
        'cases': 'Case Studies',
        'pricing': 'Pricing',
        'consultation': 'Free Consultation',
        'hero-badge': 'Beauty Industry Digital Expert - Enhancing Business Efficiency',
        'hero-title': 'Data-based AI Mar-tech Solutions',
        'hero-subtitle': 'Integrate booking system, marketing tools and data analytics to boost your revenue',
        'try-now': 'Try Now',
        'watch-demo': 'Watch Demo',
        'active-businesses': 'Active Businesses',
        'satisfaction': 'Client Satisfaction',
        'growth': 'Average Growth',
        'tech': 'Tech Solutions',
        'marketing': 'Marketing Services',
        'consulting': 'Professional Consulting',
        'video': 'Video Production',
        'hair-cases': 'Hair Salon Cases',
        'beauty-cases': 'Beauty Salon Cases',
        'medical-cases': 'Medical Beauty Cases',
        'nail-cases': 'Eyelash Cases'
    }
};

// 更新 HTML 中的語言切換按鈕事件
document.querySelectorAll('.lang-switch .dropdown-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.target.getAttribute('href').split('=')[1];
        changeLang(lang);
    });
});

// 切換語言函數
function changeLang(lang) {
    // 更新語言切換按鈕文字
    document.querySelector('.lang-switch .dropdown-trigger span').textContent = 
        lang === 'zh' ? '中文' : 'English';

    // 更新所有需要翻譯的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新 active 狀態
    document.querySelectorAll('.lang-switch .dropdown-menu a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').includes(lang));
    });

    // 更新 HTML lang 屬性
    document.documentElement.lang = lang;
}

// 更新滑動功能
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.case-track');
    const cards = track.querySelectorAll('.case-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;
    const cardWidth = cards[0].offsetWidth + 32; // 卡片寬度 + gap

    // 滑鼠事件
    track.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);

    // 觸控事件
    track.addEventListener('touchstart', startDragging);
    window.addEventListener('touchmove', drag);
    window.addEventListener('touchend', stopDragging);

    // 按鈕事件
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    function startDragging(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        currentTranslate = -currentIndex * cardWidth;
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        const translate = currentTranslate + diff;

        track.style.transform = `translateX(${translate}px)`;
    }

    function stopDragging(e) {
        if (!isDragging) return;

        isDragging = false;
        track.style.cursor = 'grab';
        
        const currentX = e.type === 'mouseup' ? e.pageX : e.changedTouches[0].pageX;
        const diff = currentX - startX;

        // 判斷滑動方向和距離
        if (Math.abs(diff) > cardWidth * 0.2) {
            if (diff > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diff < 0 && currentIndex < cards.length - 1) {
                currentIndex++;
            }
        }

        updateSlidePosition();
    }

    function updateSlidePosition() {
        track.style.transition = 'transform 0.3s ease-out';
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

        // 更新按鈕狀態
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === cards.length - 1;
    }

    // 鍵盤控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    // 防止拖曳時選中文字
    track.addEventListener('dragstart', (e) => e.preventDefault());
});

// 更新手機版選單功能
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // 更新選單項目的 href
    const menuItems = [
        { href: '#digital-marketing', text: '數位行銷' },
        { href: '#tech', text: 'AI智能系統' },
        { href: '#consulting', text: '顧問服務' },
        { href: '#course', text: '行銷課程' },
        { href: '#cases', text: '實際案例' },
        { href: '#incubator', text: '創業孵化器' },
        { href: 'https://lin.ee/DGhde7E', text: '立即諮詢', class: 'contact-btn', target: '_blank' }
    ];

    // 重新生成手機版選單
    const mobileNav = document.querySelector('.nav-links');
    if (mobileNav) {
        mobileNav.innerHTML = ''; // 清空現有選單
        
        menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.text;
            if (item.class) {
                link.className = item.class;
            }
            if (item.target) {
                link.target = item.target;
            }
            mobileNav.appendChild(link);
        });
    }

    // 處理所有選單項目的點擊事件
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 關閉選單
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');

            // 處理錨點跳轉
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20; // 添加額外間距

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 選單開關功能
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // 點擊選單外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// 更新標籤頁切換功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化每個服務區塊的標籤頁
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // 獲取該卡片內的所有標籤按鈕和內容
        const tabButtons = card.querySelectorAll('.tab-btn');
        const tabContents = card.querySelectorAll('.tab-content');
        
        // 預設顯示第一個標籤內容
        if (tabContents.length > 0) {
            tabContents[0].classList.add('active');
        }
        if (tabButtons.length > 0) {
            tabButtons[0].classList.add('active');
        }

        // 為每個標籤按鈕添加點擊事件
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按鈕和內容的 active 狀態
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 添加當前按鈕的 active 狀態
                button.classList.add('active');
                
                // 顯示對應的內容
                const targetId = button.getAttribute('data-tab');
                const targetContent = card.querySelector(`#${targetId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });
});

// 更新案例分類功能
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.case-tabs .tab-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    // 預設顯示所有案例
    caseCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按鈕的active狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加當前按鈕的active狀態
            button.classList.add('active');
        });
    });
});

// 設置 Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
    });
    
    // 觀察 hero 區塊的統計數字
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 觀察每個案例卡片的數字
    const caseStats = document.querySelectorAll('.case-card .case-stats');
    caseStats.forEach(statSection => {
        observer.observe(statSection);
    });
});

// 監控元素是否進入視窗
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.number');
            numbers.forEach(number => {
                if (!number.dataset.animated) {
                    const endValue = parseInt(number.textContent);
                    number.dataset.animated = 'true';
                    animateNumber(number, 0, endValue, 2500); // 從 800 改為 2500，延長到 2.5 秒
                }
            });
            observer.unobserve(entry.target);
        }
    });
}

// 數字動畫函數
function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = Math.ceil(range / 50); // 從 20 改為 50，使動畫更平滑
    const stepTime = Math.floor(duration / 50); // 從 20 改為 50，增加動畫步數
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(function() {
        current = Math.min(current + increment, end);
        element.textContent = current + suffix;
        
        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// 更新導航連結功能
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // 處理所有導航連結的點擊事件（包括電腦版和手機版）
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20; // 添加額外間距

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // 關閉手機版選單
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }
        });
    });

    // 選單開關功能
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // 點擊選單外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// 更新案例輪播功能
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.case-slider');
    const cards = document.querySelectorAll('.case-card');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentIndex = 0;

    // 計算可見卡片數量
    function getVisibleCards() {
        if (window.innerWidth >= 1024) {
            return 3; // 電腦版顯示3張
        } else if (window.innerWidth >= 768) {
            return 2; // 平板版顯示2張
        }
        return 1; // 手機版顯示1張
    }

    // 更新按鈕狀態
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - getVisibleCards();
    }

    // 滑動到指定位置
    function slideTo(index) {
        const cardWidth = slider.querySelector('.case-card').offsetWidth;
        const gap = parseInt(window.getComputedStyle(slider).gap);
        slider.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
        currentIndex = index;
        updateButtons();
    }

    // 按鈕事件
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            slideTo(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - getVisibleCards()) {
            slideTo(currentIndex + 1);
        }
    });

    // 初始化
    updateButtons();

    // 監聽視窗大小變化
    window.addEventListener('resize', () => {
        slideTo(0);
    });
}); 