// スムーズスクロール
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ドラクエ風・RPG風のタイピングエフェクト
const textToType = "「ようこそ、冒険者さん！\nここは わたしの ポートフォリオです。\nぜひ ゆっくり 見ていってくださいね。」";
const typewriterElement = document.getElementById('typewriter-text');
let charIndex = 0;
let isTyping = false;

function typeWriter() {
    isTyping = true;
    if (charIndex < textToType.length) {
        if (textToType.charAt(charIndex) === '\n') {
            typewriterElement.innerHTML += '<br>';
        } else {
            typewriterElement.innerHTML += textToType.charAt(charIndex);
        }
        charIndex++;
        // ランダムなタイピング速度でより人間らしく、ゲームっぽく
        let speed = Math.random() * 50 + 50;
        setTimeout(typeWriter, speed);
    } else {
        isTyping = false;
    }
}

// 初期化
window.onload = () => {
    // 少し遅れてタイピング開始
    setTimeout(() => {
        if (typewriterElement) {
            typewriterElement.innerHTML = '';
            typeWriter();
        }
    }, 800);

    // スライムの目がマウスを追う
    const pupils = document.querySelectorAll('.pupil');
    document.addEventListener('mousemove', (e) => {
        pupils.forEach((pupil) => {
            const eye = pupil.parentElement;
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const maxMove = 3;
            const moveX = Math.cos(angle) * maxMove;
            const moveY = Math.sin(angle) * maxMove;
            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });
};
