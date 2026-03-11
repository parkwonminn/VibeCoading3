/**
 * 현재 시간을 포맷팅하여 반환합니다.
 * @returns {string} YYYY년 MM월 DD일 HH:MM:SS 형식의 문자열
 */
function formatCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}

/**
 * 현재 시간 표시 요소를 업데이트합니다.
 */
function updateTimeDisplay() {
    const timeDisplayElement = document.getElementById('currentTime');
    if (timeDisplayElement) {
        timeDisplayElement.textContent = formatCurrentTime();
    }
}

/**
 * 인사 메시지를 사용자에게 표시합니다.
 */
function showGreetingMessage() {
    const greetingMessages = [
        '안녕하세요!',
        '반갑습니다!',
        '즐거운 하루 되세요!',
    ];
    const randomIndex = Math.floor(Math.random() * greetingMessages.length);
    const selectedMessage = greetingMessages[randomIndex];
    alert(selectedMessage);
}

/**
 * 인사 버튼에 클릭 이벤트 리스너를 연결합니다.
 */
function bindGreetingButtonClick() {
    const greetingButton = document.getElementById('greetingButton');
    if (greetingButton) {
        greetingButton.addEventListener('click', showGreetingMessage);
    }
}

/**
 * 초기화 함수 - 페이지 로드 시 실행됩니다.
 */
function initializePage() {
    updateTimeDisplay();
    bindGreetingButtonClick();

    const timeDisplayElement = document.getElementById('currentTime');
    if (timeDisplayElement) {
        setInterval(updateTimeDisplay, 1000);
    }
}

document.addEventListener('DOMContentLoaded', initializePage);
