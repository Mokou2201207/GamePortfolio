// スムーズスクロール
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// スキルの展開/折りたたみ
function toggleSkills() {
    const grid = document.getElementById('skills-grid');
    const btn = document.getElementById('expand-skills-btn');
    grid.classList.toggle('skills-expanded');
    if (grid.classList.contains('skills-expanded')) {
        btn.textContent = '\u25b2 とじる';
    } else {
        btn.textContent = '\u25bc もっと見る';
    }
}

// BGM制御
let bgmPlaying = false;

function toggleBGM() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('bgm-toggle');
    if (bgmPlaying) {
        bgm.pause();
        btn.textContent = '🔇 BGM';
        bgmPlaying = false;
    } else {
        bgm.volume = document.getElementById('bgm-volume').value / 100;
        bgm.play();
        btn.textContent = '🔊 BGM';
        bgmPlaying = true;
    }
}

function changeBGMVolume(val) {
    const bgm = document.getElementById('bgm');
    bgm.volume = val / 100;
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

// カードホバー動画再生
function playCardVideo(card) {
    const video = card.querySelector('.work-card-video');
    if (video) {
        video.currentTime = 0;
        video.play();
        card.classList.add('video-playing');
    }
}

function stopCardVideo(card) {
    const video = card.querySelector('.work-card-video');
    if (video) {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('video-playing');
    }
}

// 作品タブ切り替え
function switchWorksTab(category, btn) {
    // 全タブコンテンツを非表示
    document.querySelectorAll('.works-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    // 全タブボタンを非アクティブ
    document.querySelectorAll('.works-tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    // 選択タブを表示
    const target = document.getElementById('tab-' + category);
    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');
}

// モーダル表示
function openWorkModal(imgSrc, title) {
    const modal = document.getElementById('work-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    modalImg.alt = title + ' 詳細';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// モーダル閉じる
function closeWorkModal(event, forceClose) {
    const modal = document.getElementById('work-modal');
    if (forceClose || event.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('work-modal');
        if (modal && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});

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
