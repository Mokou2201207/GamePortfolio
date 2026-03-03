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

// ===== ゲームデータ =====
const gameData = {
    'echo-trigger': {
        title: 'Echo Trigger',
        video: 'Movie/EchoTriggerMove.mp4',
        thumbnail: 'Image/PCgame.png',
        info: {
            'ジャンル': 'ノベル・推理ADV',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '5人（プログラマー担当）',
            '開発期間': '2025年4月〜2025年8月（約5ヶ月）',
            '開発環境': 'Unity 2022.3 / C# / Visual Studio',
            '使用ライブラリ': '※ここに記入'
        },
        overview: '※ここにゲームの概要を記入。どんなゲームか2〜3文で説明。ターゲットユーザーやコンセプトなど。',
        roles: [
            '※ 自分が担当した部分を記入',
            '例: プレイヤーの移動・攻撃システム',
            '例: UI全般のデザイン・実装'
        ],
        highlights: [
            {
                title: '※ こだわったポイント1',
                description: '課題 → 解決策 → 結果 の流れで書くと分かりやすい'
            },
            {
                title: '※ こだわったポイント2',
                description: '例: 会話システムをScriptableObjectで管理し、シナリオの追加・変更が容易になるよう設計した'
            }
        ],
        challenges: [
            {
                title: '※ 苦戦したポイント1',
                description: '何が問題で、どう解決したかを書く'
            }
        ],
        techDetails: [
            {
                title: '※ 技術詳細',
                description: '例: ステートマシンでNPCの行動パターンを管理',
                image: ''
            }
        ],
        links: []
    },
    'pearl-adventure': {
        title: '放て！パール君の大冒険！',
        video: '',
        thumbnail: 'Image/PCgame2.png',
        info: {
            'ジャンル': '2Dアクション',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': '※ ここに記入',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'green-kun': {
        title: 'とびだせ！グリーンくん',
        video: '',
        thumbnail: 'Image/PC and smartphone games.png',
        info: {
            'ジャンル': '2Dアクション',
            'プラットフォーム': 'PC / スマートフォン',
            '制作人数': '※ ここに記入',
            '開発期間': '※ ここに記入',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'genesis-maker': {
        title: 'Genesis Maker',
        video: '',
        thumbnail: 'Image/smartphone games.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'スマートフォン',
            '制作人数': '※ ここに記入',
            '開発期間': '※ ここに記入',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'donut-shop': {
        title: 'ドーナツ屋さん',
        video: '',
        thumbnail: 'Image/Vrgame.png',
        info: {
            'ジャンル': 'VRシミュレーション',
            'プラットフォーム': 'VR',
            '制作人数': '※ ここに記入',
            '開発期間': '※ ここに記入',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'gnome-forrest': {
        title: 'GnomeForrest',
        video: '',
        thumbnail: 'Image/Game Jam.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': 'ゲームジャム（※ 期間を記入）',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'swing-bye-bye': {
        title: 'Swing Bye Bye',
        video: '',
        thumbnail: 'Image/Game Jam2.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': 'ゲームジャム（※ 期間を記入）',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    },
    'udon-catcher': {
        title: 'Udon キャッチャー',
        video: '',
        thumbnail: 'Image/Game Jam3.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': 'ゲームジャム（※ 期間を記入）',
            '開発環境': '※ ここに記入'
        },
        overview: '※ ゲームの概要を記入',
        roles: ['※ 担当部分を記入'],
        highlights: [{ title: '※ こだわったポイント', description: '※ 詳細を記入' }],
        challenges: [{ title: '※ 苦戦したポイント', description: '※ 詳細を記入' }],
        techDetails: [],
        links: []
    }
};

// ===== モーダル表示 =====
function openWorkModal(gameId) {
    const data = gameData[gameId];
    if (!data) return;

    const modal = document.getElementById('work-modal');

    // タイトル
    document.getElementById('modal-title').textContent = data.title;

    // 動画 or サムネイル
    const videoSection = document.getElementById('modal-video-section');
    const imgSection = document.getElementById('modal-img-section');
    const video = document.getElementById('modal-video');
    const videoSrc = document.getElementById('modal-video-src');

    if (data.video) {
        videoSrc.src = data.video;
        video.load();
        videoSection.style.display = 'block';
        imgSection.style.display = 'none';
    } else {
        videoSection.style.display = 'none';
        imgSection.style.display = 'block';
        document.getElementById('modal-img').src = data.thumbnail;
    }

    // 基本情報テーブル
    const table = document.getElementById('modal-info-table');
    table.innerHTML = Object.entries(data.info).map(([key, val]) =>
        `<tr><th>${key}</th><td>${val}</td></tr>`
    ).join('');

    // 概要
    document.getElementById('modal-overview').textContent = data.overview;

    // 担当部分
    const roleList = document.getElementById('modal-role-list');
    roleList.innerHTML = data.roles.map(r => `<li>${r}</li>`).join('');

    // こだわりポイント
    const highlightsDiv = document.getElementById('modal-highlights');
    highlightsDiv.innerHTML = data.highlights.map(h =>
        `<div class="modal-detail-item">
            <h4>${h.title}</h4>
            <p>${h.description}</p>
        </div>`
    ).join('');

    // 苦戦ポイント
    const challengesDiv = document.getElementById('modal-challenges');
    challengesDiv.innerHTML = data.challenges.map(c =>
        `<div class="modal-detail-item">
            <h4>${c.title}</h4>
            <p>${c.description}</p>
        </div>`
    ).join('');

    // 技術詳細
    const techSection = document.getElementById('modal-tech-section');
    const techDiv = document.getElementById('modal-tech-details');
    if (data.techDetails && data.techDetails.length > 0) {
        techSection.style.display = 'block';
        techDiv.innerHTML = data.techDetails.map(t =>
            `<div class="modal-tech-item">
                <h4>${t.title}</h4>
                <p>${t.description}</p>
                ${t.image ? `<img src="${t.image}" alt="${t.title}" class="modal-tech-img">` : ''}
            </div>`
        ).join('');
    } else {
        techSection.style.display = 'none';
    }

    // リンク
    const linksSection = document.getElementById('modal-links-section');
    const linksDiv = document.getElementById('modal-links');
    if (data.links && data.links.length > 0) {
        linksSection.style.display = 'block';
        linksDiv.innerHTML = data.links.map(l =>
            `<a href="${l.url}" target="_blank" class="nes-btn">${l.label}</a>`
        ).join('');
    } else {
        linksSection.style.display = 'none';
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // モーダルを上部にスクロール
    modal.querySelector('.modal-content').scrollTop = 0;
}

// モーダル閉じる
function closeWorkModal(event, forceClose) {
    const modal = document.getElementById('work-modal');
    if (forceClose || event.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // 動画を停止
        const video = document.getElementById('modal-video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('work-modal');
        if (modal && modal.classList.contains('show')) {
            closeWorkModal(e, true);
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
