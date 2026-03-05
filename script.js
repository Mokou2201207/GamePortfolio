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
            'ジャンル': '3DスパイアクションFPS',
            'プラットフォーム': 'PC (Windows)',
            'イベント': '穴吹デザイン展に出展',
            '制作人数': '1人',
            '開発期間': '2025年7月から制作 (2年生)',
            '開発環境': 'Unity6 / C# / Visual Studio',
            '受賞': '奨励賞'
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
                description: 'どうやって敵を人間らしく動かすかに苦戦。研究の結果、<span class="text-red">ステートマシン（State）</span>を導入し、<span class="text-red">Idle状態・Search状態・攻撃状態</span>の3つの状態を設計。移動→索敵→攻撃の流れを実装することで、<span class="text-red">人間らしい敵の行動パターン</span>を再現した。'
            }
        ],
        techDetails: [],
        links: [
            { label: 'GitHub', url: 'https://github.com/Mokou2005/EchoTrigger2' }
        ]
    },
    'pearl-adventure': {
        title: '放て！パール君の大冒険！',
        video: 'Movie/放て！パールの大冒険！プレイ動画.mp4',
        thumbnail: 'Image/PCgame2.png',
        info: {
            'ジャンル': '2Dシューティングゲーム',
            'プラットフォーム': 'PC (Windows)',
            'イベント': '学校のデザイン展に出展',
            '制作人数': '1人',
            '開発期間': '2024年10月から2025年1月',
            '開発環境': 'C++ / Visual Studio',
            '受賞': '協賛賞'
        },
        overview: '平和な海を取り戻すため、パール君が立ち上がる！自分一人で全てを作り上げた、爽快な2Dシューティングゲームです。',
        roles: ['プログラム、デザイン、ステージ制作を含む全ての工程'],
        highlights: [
            {
                title: '幅広いユーザーが楽しめる難易度設定',
                description: '初心者から上級者まで遊べるよう、<span class="text-red">「簡単」と「難しい」の難易度調節機能</span>を実装しました。誰でもクリアできる楽しさと、歯ごたえのある挑戦を両立させています。'
            },
            {
                title: '多彩なボスギミックと弾幕パターン',
                description: '中ボスとボスの2体を実装し、それぞれに<span class="text-red">独自のギミックや豊富な弾幕パターン</span>を用意しました。ボスの個性に合わせた攻略法を見つける楽しさを追求しています。'
            }
        ],
        challenges: [
            {
                title: 'C++による弾道計算の精度向上',
                description: 'C++での開発において、<span class="text-red">弾の方向や座標を細かく制御</span>することに苦戦しました。意図しない方向に弾が飛ぶ不具合を乗り越え、正確な軌道計算を実現しました。'
            }
        ],
        techDetails: [],
        links: [
            { label: 'Google Drive', url: 'https://drive.google.com/drive/folders/12a-NjLZn93edbnNSN-POn0PbG1pQKUtl?usp=sharing' }
        ]
    },
    'green-kun': {
        title: 'とびだせ！グリーンくん',
        video: 'Movie/orimitikun.mp4',
        thumbnail: 'Image/PC and smartphone games.png',
        info: {
            'ジャンル': '2Dアクションゲーム',
            'プラットフォーム': 'PC / スマートフォン',
            'イベント': 'SanukiXGame出展（地域のイベント）',
            '制作人数': '2人',
            '開発期間': '2025年8月に制作',
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
            description: 'コインを取ったらそのまま消えるのではなく、取得後に<span class="text-red">エフェクトを再生する演出</span>を加えました。この工夫により、コインを取った瞬間の<span class="text-red">気持ち良さ</span>を生み出し、プレイヤーの<span class="text-red">達成感を高めています</span>。'
        }],
        challenges: [{
            title: '2Dアクションの壁判定 — 壁に吸い付く不具合',
            description: 'プレイヤーが壁（ブロック）の側面に接触した際、摩擦や判定 of 重なりによって<span class="text-red">「壁に吸い付く」ような挙動</span>が発生し、スムーズに落下できない不具合に直面しました。<span class="text-red">Mathf.Abs</span>を使うことで、右側でも左側でも同じロジックで「中心からの距離」を測れるようにし、コードをスリムに保ちつつ、左右どちらの端でも正確に<span class="text-red">離脱判定（落下への移行）</span>を行えるようになりました。'
        },
        {
            title: 'コインエフェクトの表示問題',
            description: 'コイン取得時にエフェクトを流す仕組みでしたが、コインを取った後にオブジェクトをDestroyしていたため、<span class="text-red">子要素のエフェクトも一緒に消えてしまい</span>表示できませんでした。解決策として、<span class="text-red">Destroyではなくコライダー（判定）とMeshを非表示</span>にすることで、エフェクトの再生を可能にしました。エフェクトの再生が完了してからオブジェクトを削除する流れに変更し、<span class="text-red">演出を両立</span>させることに成功しました。'
        }],
        techDetails: [],
        links: [
            { label: 'GitHub', url: 'https://github.com/sogotoya/Orimichikun' }
        ]
    },
    'genesis-maker': {
        title: 'Genesis Maker',
        video: 'Movie/GameMove.mp4',
        thumbnail: 'Image/smartphone games.png',
        info: {
            'ジャンル': 'スマートフォンコマンドゲーム',
            'プラットフォーム': 'スマートフォン',
            'イベント': '個人製作',
            '制作人数': '1人',
            '開発期間': '2025年8月に制作',
            '開発環境': 'Unity 2022 / C# / Visual Studio'
        },
        overview: 'コンセプトは「あなたは世界の神様です」。あなたの手で世界を作っていきましょう。ターゲット層は若者向けの作品です。',
        roles: ['すべての工程（企画・プログラム・デザイン・エフェクト）を一人で担当'],
        highlights: [
            {
                title: '選択時の弾むUI演出',
                description: 'コマンドを選択した際、UIに<span class="text-red">はずみの演出</span>を加えることで、操作時の<span class="text-red">気持ちよさ</span>を追求しました。<span class="text-red">DOTweenを用いて</span>コマンドの弾みなどを制作し、スマホならではの直感的なフィードバックを大切にしています。'
            },
            {
                title: '没入感を高めるタップ演出',
                description: '画面をタップした際の<span class="text-red">波紋エフェクト</span>や、長押しスライドで<span class="text-red">星が追いかけてくる演出</span>を実装. 何気ない操作にも「楽しさ」を感じさせる工夫を凝らしました。'
            },
            {
                title: '戦略性を広げるゲームシステム',
                description: '単なるコマンド選択に留まらず、<span class="text-red">引き直し機能</span>や<span class="text-red">保留機能</span>を導入。プレイヤーの選択肢を増やすことで、ゲームとしての<span class="text-red">幅と深み</span>を格段に向上させました。'
            },
            {
                title: '技術的な設計: ScriptableObjectとCommandパターン',
                description: '各コマンドのステータス（気温や水などのステータス）を<span class="text-red">ScriptableObject</span>として定義し、それらを<span class="text-red">Command</span>で実行する設計を採用しました。拡張性と保守性を両立させた設計を意識しています。'
            }
        ],
        challenges: [],
        techDetails: [],
        links: [
            { label: 'GitHub', url: 'https://github.com/Mokou2201207/GenesisMaker' }
        ]
    },
    'donut-shop': {
        title: 'ドーナツ屋さん',
        video: 'Movie/Dount.mp4',
        thumbnail: 'Image/Vrgame.png',
        info: {
            'ジャンル': 'VRシミュレーション',
            'プラットフォーム': 'VR',
            'イベント': '個人製作',
            '制作人数': '2人',
            '開発期間': '2025年12月に制作',
            '開発環境': 'Unity 2022 / C# / Visual Studio'
        },
        overview: 'コンセプトは「あなたもドーナツを作ってみませんか？」。VRでドーナツ作りを体験できるシミュレーションゲームです。シューティングゲームが好きな人にもおすすめの作品です。',
        roles: [
            '家具のアニメーション制作',
            'プレイヤー全般（操作・システム）',
            'PCでもプレイできる用設定',
            '家具のプログラム全般・BGM設定',
            'NPC全般・時計の一部機能'
        ],
        highlights: [
            {
                title: 'リアルな調理体験の追求',
                description: '家具のアニメーションの動きやプログラムを<span class="text-red">細かく設定</span>することで、実際にドーナツを<span class="text-red">作ってる感</span>をより深く得られるようにこだわりました。'
            },
            {
                title: '可読性を意識した保守性の高い設計',
                description: '共同開発において、相手から<span class="text-red">scriptが見えやすく</span>なるように設計. 自分だけでなく<span class="text-red">他人の読みやすさ</span>を徹底的に考慮して制作しました。ぜひ内部設計も見てほしいポイントです。'
            }
        ],
        challenges: [],
        techDetails: [],
        links: [
            { label: 'GitHub', url: 'https://github.com/Mokou2201207/DonutSimulation' }
        ]
    },
    'gnome-forrest': {
        title: 'GnomeForrest',
        video: 'Movie/GnomeForrest プレイ動画.mp4',
        thumbnail: 'Image/Game Jam.png',
        info: {
            'ジャンル': '2Dアクションゲーム',
            'プラットフォーム': 'PC (Windows)',
            'イベント': 'グローバルゲームジャム',
            '制作人数': '4人',
            '開発期間': '2026年1月制作',
            '開発環境': 'Unity 2022 / C# / Visual Studio',
            'チーム形態': '初対面のメンバーとチーム制作'
        },
        overview: 'ゲームジャムにて初対面のメンバーとチームを組み、わずか2日間で制作したゲームです。初めて会ったメンバーと協力し合いながら、短期間で一つの作品を完成させました。コンセプトは「霧を払いスキルを見つけステージを攻略しよう！！」。ターゲット層は子供向けです。',
        roles: [
            'プレイヤーキャラクター制御（一部）',
            'ゲームギミック・システム実装',
            'アニメーション・演出制御',
            'UI・シーン管理',
            'サウンド実装'
        ],
        highlights: [],
        challenges: [],
        techDetails: [],
        links: [
            { label: 'Google Drive', url: 'https://drive.google.com/drive/folders/1-VcnB05WI8pkcEAG62UE45Im2V2kbOca?usp=sharing' }
        ]
    },
    'swing-bye-bye': {
        title: 'Swing Bye Bye',
        video: 'Movie/Swungbyebye プレイ動画.mp4',
        thumbnail: 'Image/Game Jam2.png',
        info: {
            'ジャンル': '競争型NPC避けるゲーム',
            'プラットフォーム': 'PC (Windows)',
            'イベント': 'ゲームジャム高梁岡山2025',
            '制作人数': '4人',
            '開発期間': '2025年10月制作',
            '開発環境': 'Unity 2022 / C# / Visual Studio',
            '受賞': '讃岐GameN賞'
        },
        overview: '「NPCと競争し一位を勝ち取れ！」をコンセプトにした、競争型NPC回避ゲームです。スリルある競争を楽しみたい若者向けの作品です。',
        roles: [
            'タイトル画面全般の制作',
            'ゲーム選択画面全般の制作',
            'チュートリアル作成（マップ以外）',
            '敵AIの制作（移動ルート構築）'
        ],
        highlights: [],
        challenges: [],
        techDetails: [],
        links: [
            { label: 'GitHub', url: 'https://github.com/Mokou2005/SWINGBYE' }
        ]
    },
    'udon-catcher': {
        title: 'Udon キャッチャー',
        video: 'Movie/Udonキャッチャープレイ動画.mp4',
        thumbnail: 'Image/Game Jam3.png',
        info: {
            'ジャンル': '対戦型競争ゲーム',
            'プラットフォーム': 'PC (Windows)',
            'イベント': '讃岐GameN（ゲームジャム）',
            '制作人数': '6人',
            '開発期間': '2025年5月制作',
            '開発環境': 'Unity 2022 / C# / Visual Studio'
        },
        overview: '「みんなで競争してだれが一番食べ物をとれるか勝負！！」をコンセプトにした対戦型競争ゲームです。誰でも直感的に楽しめる作品を目指しました。',
        roles: [
            '画面のフェードアウト演出の制作',
            'タイマーシステムの作成'
        ],
        highlights: [],
        challenges: [],
        techDetails: [],
        links: [
            { label: 'Google Drive', url: 'https://drive.google.com/drive/folders/1snd-EzsmJnT3jQM27QWfpu3CAaER97YL?usp=sharing' }
        ]
    },
};

// ===== モーダル表示 =====
function openWorkModal(gameId) {
    const data = gameData[gameId];
    if (!data) return;

    const modal = document.getElementById('work-modal');

    // タイトル
    document.getElementById('modal-title').textContent = data.title;

    // 受賞
    const awardContainer = document.getElementById('modal-award-container');
    if (data.info['受賞']) {
        awardContainer.innerHTML = `<div class="modal-award">🏆 ${data.info['受賞']}</div>`;
    } else {
        awardContainer.innerHTML = '';
    }

    // イベント
    const eventContainer = document.getElementById('modal-event-container');
    if (data.info['イベント']) {
        eventContainer.innerHTML = `<span class="event-tag">📍 ${data.info['イベント']}</span>`;
    } else {
        eventContainer.innerHTML = '';
    }

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
