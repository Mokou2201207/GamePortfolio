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
            SE_typewriter(); // 1文字ごとにSEを鳴らす
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
            'ジャンル': '3DスパイアクションFPS',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '1人',
            '開発期間': '2025年7月〜2026年1月（約7ヶ月）',
            '開発環境': 'Unity6 / C# / Visual Studio'
        },
        overview: '滅びゆく世界でワクチンを探す、3DスパイアクションFPS。FPSや探索ゲームが好きな人に向けた作品です。この世界の謎を解きながらワクチンを入手せよ！',
        roles: [
            'マップ制作（ステージデザイン・レベルデザイン）',
            'ゲーム機能全般（プレイヤー操作・敵AI・UI・システム設計など）'
        ],
        highlights: [
            {
                title: '臨場感あふれるムービー演出',
                description: '近年のゲームにおける演出の重要性を考え、<span class="text-red">Cinemachine</span>を活用したカットシーン制作に注力しました。プレイヤー視点だけでなく、敵の視点や一人称・三人称視点を<span class="text-red">効果的に切り替える</span>ことで、物語への没入感と緊迫感を高める演出を実現しました。'
            },
            {
                title: '扇状RayCastによる敵センサー',
                description: '敵の視界判定にColliderではなく<span class="text-red">扇状のRayCast</span>を採用しました。Colliderに比べて<span class="text-red">処理負荷を抑えられる</span>だけでなく、<span class="text-red">遮蔽物の判定も正確</span>に行えるため、パフォーマンスと精度の両立を意識して実装しました。'
            },
            {
                title: '心理を再現する「警戒度」システム',
                description: '敵が一瞬プレイヤーを視認しても即座に攻撃せず、まずは「確認」から入る<span class="text-red">警戒度</span>を導入。距離に応じて<span class="text-red">上昇スピードを変化</span>させることでリアリティを追求しました。また、一度見失うと警戒度は下がる一方、<span class="text-red">敵の移動スピードが上がる</span>ように設計し、逃走時の緊張感を維持しました。'
            },
            {
                title: '手作業による徹底したレベルデザイン',
                description: 'マップのアセットを<span class="text-red">一つずつ手作業で配置</span>し、細部までこだわり抜いた<span class="text-red">レベルデザイン</span>を実現しました。また、ドアやキー（鍵）などのギミック用プログラムも<span class="text-red">すべて自分で設計</span>・実装し、ゲーム体験と完璧に調和するシステムを構築しました。'
            }
        ],
        challenges: [
            {
                title: '敵の作り方 — 人間らしさの再現',
                description: 'どうやって敵を人間らしく動かすかに苦戦。研究の結果、ステートマシン（State）を導入し、Idle状態・Search状態・攻撃状態の3つの状態を設計。移動→索敵→攻撃の流れを実装することで、人間らしい敵の行動パターンを再現した。'
            }
        ],
        techDetails: [],
        links: []
    },
    'pearl-adventure': {
        title: '放て！パール君の大冒険！',
        video: 'Movie/放て！パールの大冒険！プレイ動画.mp4',
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
        video: 'Movie/orimitikun.mp4',
        thumbnail: 'Image/PC and smartphone games.png',
        info: {
            'ジャンル': '2Dアクションゲーム',
            'プラットフォーム': 'PC / スマートフォン',
            '制作人数': '2人',
            '開発期間': '2025年7月（約3週間）',
            '開発環境': 'Unity 2022 / C# / Visual Studio'
        },
        overview: 'コインを取り戻すためにボスに挑む、2Dアクションゲーム。小学生など子供向けに作られた作品で、アクションゲームが好きな子をターゲットにしています。モンスターを倒しながらボスのステージまで進んでいくゲームです。',
        roles: [
            'ステージ全般（プログラム・マップ制作すべて）',
            'プレイヤーの制作',
            '敵キャラクターの制作'
        ],
        highlights: [{
            title: 'コイン取得時の演出',
            description: 'コインを取ったらそのまま消えるのではなく、取得後にエフェクトを再生する演出を加えました。この工夫により、コインを取った瞬間の気持ち良さを生み出し、プレイヤーの達成感を高めています。'
        }],
        challenges: [{
            title: '2Dアクションの壁判定 — 壁に吸い付く不具合',
            description: 'プレイヤーが壁（ブロック）の側面に接触した際、摩擦や判定の重なりによって「壁に吸い付く」ような挙動が発生し、スムーズに落下できない不具合に直面しました。Mathf.Absを使うことで、右側でも左側でも同じロジックで「中心からの距離」を測れるようにし、コードをスリムに保ちつつ、左右どちらの端でも正確に離脱判定（落下への移行）を行えるようになりました。'
        }],
        techDetails: [],
        links: []
    },
    'genesis-maker': {
        title: 'Genesis Maker',
        video: 'Movie/GameMove.mp4',
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
        video: 'Movie/Dount.mp4',
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
        video: 'Movie/GnomeForrest プレイ動画.mp4',
        thumbnail: 'Image/Game Jam.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': '2日間（ゲームジャム）',
            '開発環境': '※ ここに記入',
            'チーム形態': '初対面のメンバーとチーム制作'
        },
        overview: 'ゲームジャムにて初対面のメンバーとチームを組み、わずか2日間で制作したゲームです。初めて会ったメンバーと協力し合いながら、短期間で一つの作品を完成させました。※ ゲームの内容を追記',
        roles: ['※ 担当部分を記入'],
        highlights: [],
        challenges: [],
        techDetails: [],
        links: []
    },
    'swing-bye-bye': {
        title: 'Swing Bye Bye',
        video: 'Movie/Swungbyebye プレイ動画.mp4',
        thumbnail: 'Image/Game Jam2.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': '2日間（ゲームジャム）',
            '開発環境': '※ ここに記入',
            'チーム形態': '初対面のメンバーとチーム制作'
        },
        overview: 'ゲームジャムにて初対面のメンバーとチームを組み、わずか2日間で制作したゲームです。初めて会ったメンバーと協力し合いながら、短期間で一つの作品を完成させました。※ ゲームの内容を追記',
        roles: ['※ 担当部分を記入'],
        highlights: [],
        challenges: [],
        techDetails: [],
        links: []
    },
    'udon-catcher': {
        title: 'Udon キャッチャー',
        video: 'Movie/Udonキャッチャープレイ動画.mp4',
        thumbnail: 'Image/Game Jam3.png',
        info: {
            'ジャンル': '※ ここに記入',
            'プラットフォーム': 'PC (Windows)',
            '制作人数': '※ ここに記入',
            '開発期間': '2日間（ゲームジャム）',
            '開発環境': '※ ここに記入',
            'チーム形態': '初対面のメンバーとチーム制作'
        },
        overview: 'ゲームジャムにて初対面のメンバーとチームを組み、わずか2日間で制作したゲームです。初めて会ったメンバーと協力し合いながら、短期間で一つの作品を完成させました。※ ゲームの内容を追記',
        roles: ['※ 担当部分を記入'],
        highlights: [],
        challenges: [],
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
        video.play();
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
    const highlightsSection = document.getElementById('modal-highlights-section');
    const highlightsDiv = document.getElementById('modal-highlights');
    if (data.highlights && data.highlights.length > 0) {
        highlightsSection.style.display = 'block';
        highlightsDiv.innerHTML = data.highlights.map(h =>
            `<div class="modal-detail-item">
                <h4>${h.title}</h4>
                <p>${h.description}</p>
            </div>`
        ).join('');
    } else {
        highlightsSection.style.display = 'none';
    }

    // 苦戦ポイント
    const challengesSection = document.getElementById('modal-challenges-section');
    const challengesDiv = document.getElementById('modal-challenges');
    if (data.challenges && data.challenges.length > 0) {
        challengesSection.style.display = 'block';
        challengesDiv.innerHTML = data.challenges.map(c =>
            `<div class="modal-detail-item">
                <h4>${c.title}</h4>
                <p>${c.description}</p>
            </div>`
        ).join('');
    } else {
        challengesSection.style.display = 'none';
    }

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
