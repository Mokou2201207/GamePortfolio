// スムーズスクロール
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ドラクエ風・RPG風のタイピングエフェクト
const textToType = "「よくぞきた、わかものよ！\nここは わたしの ポートフォリオだ。\nゆっくり まわって いくがよい。」";
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
};
