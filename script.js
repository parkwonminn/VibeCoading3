const GREETING_MESSAGES = [
    '안녕하세요! 😊',
    '반갑습니다! 🙌',
    '즐거운 하루 되세요! ☀️',
    '오늘도 좋은 하루 보내세요! 🌟',
];

function pickRandomGreetingMessage() {
    const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length);
    return GREETING_MESSAGES[randomIndex];
}

function formatCurrentTimeAsKoreanString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}

function updateFooterTimeDisplay() {
    const timeDisplayElement = document.getElementById('currentTime');
    if (timeDisplayElement) {
        timeDisplayElement.textContent = formatCurrentTimeAsKoreanString();
    }
}

function showToastNotification({ message, type = 'success' }) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastElement = document.createElement('div');
    toastElement.className = `toast toast--${type}`;
    toastElement.textContent = message;
    toastContainer.appendChild(toastElement);

    requestAnimationFrame(() => {
        toastElement.classList.add('toast--visible');
    });

    setTimeout(() => {
        toastElement.classList.remove('toast--visible');
        toastElement.addEventListener(
            'transitionend',
            () => toastElement.remove(),
            { once: true }
        );
    }, 3000);
}

function handleGreetingButtonClick() {
    const selectedMessage = pickRandomGreetingMessage();
    showToastNotification({ message: selectedMessage, type: 'success' });
}

function validateContactFormFields({ senderName, senderEmail, messageContent }) {
    if (!senderName.trim()) {
        return { isValid: false, errorMessage: '이름을 입력해주세요.' };
    }
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormatRegex.test(senderEmail.trim())) {
        return { isValid: false, errorMessage: '올바른 이메일 주소를 입력해주세요.' };
    }
    if (!messageContent.trim()) {
        return { isValid: false, errorMessage: '메시지를 입력해주세요.' };
    }
    return { isValid: true, errorMessage: null };
}

function handleContactFormSubmit(submitEvent) {
    submitEvent.preventDefault();

    const senderNameValue = document.getElementById('senderName').value;
    const senderEmailValue = document.getElementById('senderEmail').value;
    const messageContentValue = document.getElementById('messageContent').value;

    const validationResult = validateContactFormFields({
        senderName: senderNameValue,
        senderEmail: senderEmailValue,
        messageContent: messageContentValue,
    });

    if (!validationResult.isValid) {
        showToastNotification({ message: validationResult.errorMessage, type: 'error' });
        return;
    }

    const submitButton = submitEvent.target.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = '전송 중...';

    setTimeout(() => {
        showToastNotification({
            message: '메시지가 성공적으로 전송되었습니다!',
            type: 'success',
        });
        document.getElementById('contactForm').reset();
        submitButton.disabled = false;
        submitButton.textContent = '메시지 보내기';
    }, 1000);
}

function toggleMobileNavigationMenu() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navMenu = document.getElementById('navMenu');

    const isMenuNowOpen = navMenu.classList.toggle('nav-list--open');
    hamburgerButton.classList.toggle('hamburger-button--open', isMenuNowOpen);
    hamburgerButton.setAttribute('aria-expanded', String(isMenuNowOpen));
    hamburgerButton.setAttribute('aria-label', isMenuNowOpen ? '메뉴 닫기' : '메뉴 열기');
}

function closeMobileNavigationMenuAfterNavLinkClick() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            const hamburgerButton = document.getElementById('hamburgerButton');
            navMenu.classList.remove('nav-list--open');
            hamburgerButton.classList.remove('hamburger-button--open');
            hamburgerButton.setAttribute('aria-expanded', 'false');
            hamburgerButton.setAttribute('aria-label', '메뉴 열기');
        });
    });
}

function markNavLinkAsActiveForSection({ sectionId }) {
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.toggle('nav-link--active', navLink.dataset.section === sectionId);
    });
}

function initializeSectionObserverForActiveNavHighlight() {
    const observedSections = document.querySelectorAll('section[id]');

    const sectionVisibilityObserver = new IntersectionObserver(
        intersectionEntries => {
            intersectionEntries.forEach(entry => {
                if (entry.isIntersecting) {
                    markNavLinkAsActiveForSection({ sectionId: entry.target.id });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    observedSections.forEach(section => sectionVisibilityObserver.observe(section));
}

function applyScrolledStyleToHeaderOnScroll() {
    const siteHeader = document.getElementById('siteHeader');
    const scrollShadowThresholdInPixels = 20;

    window.addEventListener(
        'scroll',
        () => {
            siteHeader.classList.toggle(
                'header--scrolled',
                window.scrollY > scrollShadowThresholdInPixels
            );
        },
        { passive: true }
    );
}

function setCopyrightYearToCurrentYear() {
    const copyrightYearElement = document.getElementById('copyrightYear');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = new Date().getFullYear();
    }
}

function initializePage() {
    setCopyrightYearToCurrentYear();
    updateFooterTimeDisplay();
    setInterval(updateFooterTimeDisplay, 1000);

    const greetingButton = document.getElementById('greetingButton');
    if (greetingButton) {
        greetingButton.addEventListener('click', handleGreetingButtonClick);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    const hamburgerButton = document.getElementById('hamburgerButton');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMobileNavigationMenu);
    }

    closeMobileNavigationMenuAfterNavLinkClick();
    initializeSectionObserverForActiveNavHighlight();
    applyScrolledStyleToHeaderOnScroll();
}

document.addEventListener('DOMContentLoaded', initializePage);
