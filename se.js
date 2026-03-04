// ====================================
// 🔊 SE（効果音）システム
// Web Audio API で レトロ8bit風SE を生成
// ====================================

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// 基本的な音を鳴らすヘルパー
function playTone(frequency, duration, type = 'square', volume = 0.15, decay = true) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    if (decay) {
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
}

// 複数音を連続で鳴らすヘルパー
function playMelody(notes, type = 'square', volume = 0.12) {
    const ctx = getAudioContext();
    let time = ctx.currentTime;

    notes.forEach(([freq, dur]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
        time += dur * 0.7;
    });
}

// ノイズ生成ヘルパー
function playNoise(duration, volume = 0.08) {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
}

// ====================================
// SE 定義（場所ごとに異なる音）
// ====================================

// 🎮 PRESS START ボタン — ファンファーレ風の起動音
function SE_pressStart() {
    playMelody([
        [523, 0.08],  // C5
        [659, 0.08],  // E5
        [784, 0.08],  // G5
        [1047, 0.2],  // C6 (長め)
    ], 'square', 0.12);
    setTimeout(() => playNoise(0.05, 0.04), 50);
}

// 🧭 ナビボタン (HOME, STATUS, MAGIC, QUESTS) — カーソル移動音
function SE_navigate() {
    playMelody([
        [880, 0.05],
        [1320, 0.08],
    ], 'square', 0.10);
}

// 📑 タブ切り替え — ページめくり風
function SE_tabSwitch() {
    playMelody([
        [600, 0.04],
        [900, 0.04],
        [1200, 0.06],
    ], 'triangle', 0.10);
    setTimeout(() => playNoise(0.03, 0.03), 20);
}

// 🎴 カードホバー — ソフトなピコッ音
function SE_cardHover() {
    playTone(1400, 0.06, 'sine', 0.06, true);
}

// 📖 カードクリック / モーダル展開 — 決定音（ドレミ上昇）
function SE_modalOpen() {
    playMelody([
        [440, 0.06],   // A4
        [554, 0.06],   // C#5
        [659, 0.06],   // E5
        [880, 0.12],   // A5
    ], 'square', 0.10);
}

// ❌ モーダル閉じる — キャンセル音（下降）
function SE_modalClose() {
    playMelody([
        [660, 0.05],
        [440, 0.05],
        [330, 0.08],
    ], 'square', 0.10);
}

// 📦 スキル展開/折りたたみ — ポップ音
function SE_toggleExpand() {
    playMelody([
        [500, 0.04],
        [700, 0.04],
        [1000, 0.08],
    ], 'triangle', 0.10);
}

// 🔊 BGMトグル — スイッチ音
function SE_bgmToggle() {
    playTone(800, 0.04, 'square', 0.10);
    setTimeout(() => playTone(1200, 0.06, 'square', 0.10), 50);
}

// 📧 連絡先ボタン — コイン音
function SE_contact() {
    playMelody([
        [988, 0.06],   // B5
        [1319, 0.12],  // E6
    ], 'square', 0.12);
    setTimeout(() => playTone(1319, 0.15, 'sine', 0.05), 80);
}

// 🔗 汎用ボタン — シンプルクリック音
function SE_click() {
    playTone(1000, 0.05, 'square', 0.08);
}

// 💬 タイプライター — RPG会話風の1文字ごとのピッ音
function SE_typewriter() {
    const freq = 800 + Math.random() * 200; // 800〜1000Hz でランダム感
    playTone(freq, 0.04, 'square', 0.06, true);
}
