/* E-esap — Qaraqalpaqsha kirim-shıǵım qosımshası
   Jaratıwshı: Qonarbaev Damir
   HTML + CSS + JS, maǵlıwmatlar brauzerdiń localStorage ında saqlanadı. */
'use strict';

/* ================= helpers ================= */
const KEY = 'pulcount_v1';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic0 = n => `<i data-lucide="${n}"></i>`;
const FLAG = {
  qq: `<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#0099B5"/><rect y="6.72" width="30" height="0.16" fill="#fff"/><rect y="6.88" width="30" height="0.4" fill="#CE1126"/><rect y="7.28" width="30" height="5.44" fill="#F2C200"/><rect y="12.72" width="30" height="0.4" fill="#CE1126"/><rect y="13.12" width="30" height="0.16" fill="#fff"/><rect y="13.28" width="30" height="6.72" fill="#1EB53A"/><circle cx="5" cy="3.4" r="2.2" fill="#fff"/><circle cx="5.8" cy="3.4" r="1.9" fill="#0099B5"/><g fill="#fff"><circle cx="9.2" cy="2.3" r=".5"/><circle cx="10.8" cy="2.3" r=".5"/><circle cx="8.4" cy="4.4" r=".5"/><circle cx="10" cy="4.4" r=".5"/><circle cx="11.6" cy="4.4" r=".5"/></g></svg>`,
  uz: `<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#1EB53A"/><rect width="30" height="13.6" fill="#CE1126"/><rect width="30" height="13.2" fill="#fff"/><rect width="30" height="6.8" fill="#CE1126"/><rect width="30" height="6.4" fill="#0099B5"/><circle cx="5" cy="3.2" r="2.1" fill="#fff"/><circle cx="5.8" cy="3.2" r="1.8" fill="#0099B5"/><g fill="#fff"><circle cx="9" cy="1.8" r=".4"/><circle cx="10.4" cy="1.8" r=".4"/><circle cx="11.8" cy="1.8" r=".4"/><circle cx="9" cy="3.2" r=".4"/><circle cx="10.4" cy="3.2" r=".4"/><circle cx="11.8" cy="3.2" r=".4"/><circle cx="9" cy="4.6" r=".4"/><circle cx="10.4" cy="4.6" r=".4"/><circle cx="11.8" cy="4.6" r=".4"/></g></svg>`,
  kz: `<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#00AFCA"/><circle cx="15" cy="9" r="3.4" fill="#FEC50C"/><g stroke="#FEC50C" stroke-width=".6"><path d="M15 3.6v-1.2M15 14.4v1.2M9.6 9H8.4M20.4 9h1.2M11.2 5.2l-.8-.8M18.8 5.2l.8-.8M11.2 12.8l-.8.8M18.8 12.8l.8.8"/></g><path d="M10.5 16.5q4.5-2 9 0" stroke="#FEC50C" stroke-width=".8" fill="none"/><rect x="1.6" y="1" width="1.4" height="18" fill="#FEC50C" opacity=".85"/></svg>`,
  ru: `<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#D52B1E"/><rect width="30" height="13.33" fill="#0039A6"/><rect width="30" height="6.67" fill="#fff"/></svg>`,
  gb: `<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>`
};
const LANGS = [
  { id: 'lat', flag: FLAG.qq, name: 'Qaraqalpaqsha', sub: 'Latın jazıwı' },
  { id: 'cyr', flag: FLAG.qq, name: 'Қарақалпақша', sub: 'Кирилл жазыўы' },
  { id: 'uz', flag: FLAG.uz, name: 'Oʻzbekcha', sub: 'Lotin yozuvi' },
  { id: 'kk', flag: FLAG.kz, name: 'Қазақша', sub: 'Кирилл жазуы' },
  { id: 'ru', flag: FLAG.ru, name: 'Русский', sub: 'Кириллица' },
  { id: 'en', flag: FLAG.gb, name: 'English', sub: 'Latin script' }
];
const EMJ = { 'circle-help': '❓', 'folder': '📁', 'refresh-cw': '🔄', 'school': '🏫', 'send': '📤', 'shield': '🛡️', 'shopping-cart': '🛒', 'triangle-alert': '⚠️', 'banknote': '💵', 'credit-card': '💳', 'wallet': '👛', 'coins': '🪙', 'landmark': '🏦', 'smartphone': '📱', 'piggy-bank': '🐷', 'briefcase': '💼', 'briefcase-business': '💼', 'gem': '💎', 'gift': '🎁', 'shopping-bag': '🛍️', 'shopping-basket': '🛒', 'plane': '✈️', 'target': '🎯', 'laptop': '💻', 'car': '🚗', 'house': '🏠', 'home': '🏠', 'graduation-cap': '🎓', 'baby': '👶', 'heart': '❤️', 'bus': '🚌', 'coffee': '☕', 'utensils': '🍽️', 'shirt': '👕', 'heart-pulse': '🩺', 'gamepad-2': '🎮', 'tv': '📺', 'wifi': '📶', 'zap': '⚡', 'droplets': '💧', 'flame': '🔥', 'thermometer': '🌡️', 'receipt': '🧾', 'trending-up': '📈', 'hand-coins': '🤲', 'handshake': '🤝', 'heart-handshake': '🤝', 'users': '👥', 'store': '🏪', 'sparkles': '✨', 'sparkle': '✨', 'wand-sparkles': '🪄', 'chart-pie': '📊', 'chart-no-axes-column': '📊', 'file-chart-column': '📊', 'file-spreadsheet': '📗', 'file-text': '📄', 'bell': '🔔', 'bell-ring': '🔔', 'message-square-text': '💬', 'palette': '🎨', 'info': 'ℹ️', 'shield-check': '🛡️', 'lock': '🔒', 'key-round': '🔑', 'database-backup': '💾', 'megaphone': '📣', 'party-popper': '🎉', 'star': '⭐', 'gauge': '⏱️', 'repeat': '💱', 'history': '🕘', 'contact': '📇', 'camera': '📷', 'phone': '📞', 'calendar': '📅', 'calendar-days': '📅', 'calendar-range': '🗓️', 'calendar-clock': '⏰', 'calendar-check': '📆', 'scale': '⚖️', 'siren': '🚨', 'accessibility': '🧓', 'volume-2': '🔊', 'languages': '🌐', 'globe': '🌐', 'smile': '😊', 'log-out': '🚪', 'user': '👤', 'user-round': '👤', 'activity': '📉', 'layers': '🗂️', 'split': '➗', 'mail-check': '✅', 'square-pen': '✏️', 'pencil': '✏️', 'trash-2': '🗑️', 'arrow-right-left': '🔁', 'arrow-left-right': '🔁', 'calculator': '🧮', 'dollar-sign': '💲', 'percent': '💯', 'trophy': '🏆', 'book-open': '📖', 'pill': '💊', 'dumbbell': '🏋️', 'music': '🎵', 'film': '🎬', 'paw-print': '🐾', 'fuel': '⛽', 'train-front': '🚆', 'bike': '🚲', 'hammer': '🔨', 'wrench': '🔧', 'scissors': '✂️', 'pizza': '🍕', 'apple': '🍎', 'beer': '🍺', 'cake': '🎂', 'tickets': '🎟️', 'gift-card': '🎁', 'building-2': '🏢', 'circle-dollar-sign': '💰', 'badge-percent': '🏷️', 'tag': '🏷️', 'package': '📦', 'truck': '🚚', 'stethoscope': '🩺', 'syringe': '💉', 'glasses': '👓', 'watch': '⌚', 'headphones': '🎧', 'monitor': '🖥️', 'printer': '🖨️', 'sofa': '🛋️', 'bed': '🛏️', 'bath': '🛁', 'lamp': '💡', 'lightbulb': '💡', 'leaf': '🍃', 'sun': '☀️', 'moon': '🌙', 'cloud': '☁️', 'umbrella': '☂️', 'map-pin': '📍', 'map': '🗺️', 'navigation': '🧭', 'rocket': '🚀', 'crown': '👑', 'medal': '🏅', 'flag': '🚩', 'bookmark': '🔖', 'clipboard-list': '📋', 'list-checks': '✅', 'notebook': '📓', 'pen-tool': '🖊️', 'brush': '🖌️', 'shapes': '🔷', 'puzzle': '🧩', 'dice-5': '🎲', 'ticket': '🎫', 'popcorn': '🍿', 'ice-cream-cone': '🍦', 'candy': '🍬', 'sandwich': '🥪', 'soup': '🍲', 'salad': '🥗', 'cookie': '🍪', 'croissant': '🥐', 'wine': '🍷', 'cup-soda': '🥤', 'milk': '🥛', 'egg': '🥚', 'fish': '🐟', 'beef': '🥩', 'carrot': '🥕', 'cherry': '🍒', 'banana': '🍌', 'grape': '🍇', 'citrus': '🍋' };
const ic = (n, cls = '') => `<i data-lucide="${n}" ${cls ? `class="${cls}"` : ''}></i>`;
/* emoji tek kategoriyalar hám profil bólimleri ushın */
const icE = (n, cls = '') => (typeof S !== 'undefined' && S && S.iconMode === 'emoji' && EMJ[n]) ? `<span class="emj ${cls}" aria-hidden="true">${EMJ[n]}</span>` : ic(n, cls);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const vib = (ms = 10) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
/* ===== Dawıs effektleri (WebAudio, fayl kerek emes) ===== */
const SFX = (() => {
  let ctx = null, master = null;
  const init = () => { if (ctx) return ctx; const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); master = ctx.createGain(); master.gain.value = .35; master.connect(ctx.destination); return ctx; };
  const tone = (f, d, o = {}) => { const c = init(); if (!c) return; if (c.state === 'suspended') c.resume(); const t0 = c.currentTime + (o.at || 0);
    const os = c.createOscillator(), g = c.createGain(); os.type = o.type || 'sine'; os.frequency.setValueAtTime(f, t0); if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t0 + d);
    const v = o.vol || .25; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(v, t0 + (o.atk || .006)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    os.connect(g); g.connect(master); os.start(t0); os.stop(t0 + d + .02); };
  const noise = (d, o = {}) => { const c = init(); if (!c) return; const t0 = c.currentTime + (o.at || 0); const b = c.createBuffer(1, Math.floor(c.sampleRate * d), c.sampleRate); const ch = b.getChannelData(0); for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / ch.length, 3);
    const s = c.createBufferSource(); s.buffer = b; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = o.f || 3000; f.Q.value = o.q || 1.2; const g = c.createGain(); g.gain.value = o.vol || .25; s.connect(f); f.connect(g); g.connect(master); s.start(t0); };
  const P = {
    tap: () => { tone(1250, .045, { type: 'triangle', vol: .12, to: 900 }); noise(.02, { f: 4200, vol: .06 }); },
    nav: () => { tone(660, .07, { type: 'sine', vol: .14, to: 880 }); tone(990, .06, { at: .04, vol: .08 }); },
    open: () => { tone(420, .14, { type: 'sine', vol: .12, to: 760 }); noise(.08, { f: 1800, vol: .04 }); },
    close: () => { tone(700, .12, { type: 'sine', vol: .1, to: 380 }); },
    toggle: () => { tone(880, .05, { type: 'square', vol: .05 }); tone(1320, .06, { at: .05, type: 'triangle', vol: .1 }); },
    key: () => { tone(1500 + Math.random() * 200, .035, { type: 'triangle', vol: .08 }); },
    success: () => { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, .22, { at: i * .07, type: 'triangle', vol: .13 })); },
    income: () => { [659.25, 987.77, 1318.5].forEach((f, i) => tone(f, .25, { at: i * .06, type: 'sine', vol: .14 })); tone(2637, .3, { at: .18, vol: .04 }); },
    expense: () => { tone(880, .09, { type: 'triangle', vol: .12 }); tone(587.33, .16, { at: .07, type: 'triangle', vol: .12 }); },
    clink: () => { const b = 2200 + Math.random() * 700; [1, 1.47, 2.09].forEach((k, i) => tone(b * k, .32 - i * .08, { type: 'sine', vol: .09 / (i + 1), atk: .004 })); },
    coin: () => { tone(1975.5, .08, { type: 'square', vol: .05 }); tone(2637, .35, { at: .07, type: 'triangle', vol: .12 }); noise(.05, { at: .02, f: 6000, vol: .05 }); },
    del: () => { tone(330, .2, { type: 'sawtooth', vol: .05, to: 140 }); noise(.12, { f: 900, vol: .07 }); },
    error: () => { tone(220, .12, { type: 'square', vol: .06 }); tone(196, .16, { at: .11, type: 'square', vol: .06 }); },
    send: () => { tone(500, .12, { type: 'sine', vol: .12, to: 1400 }); noise(.1, { f: 2500, vol: .05 }); },
    pop: () => { tone(300, .08, { type: 'sine', vol: .18, to: 900 }); },
    party: () => { [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, .3, { at: i * .09, type: 'triangle', vol: .12 })); noise(.4, { at: .3, f: 5000, q: .6, vol: .06 }); }
  };
  return (k) => { if (S && S.sound === false) return; try { (P[k] || P.tap)(); } catch (e) {} };
})();
const sfx = k => SFX(k);
/* ================= akkauntlar (dizimnen ótiw / kiriw) ================= */
const AUTHK = 'eesap_users_v1', SESSK = 'eesap_session_v1';
const Auth = {
  users() { try { return JSON.parse(localStorage.getItem(AUTHK)) || {}; } catch (e) { return {}; } },
  saveUsers(u) { try { localStorage.setItem(AUTHK, JSON.stringify(u)); } catch (e) {} },
  session() { try { return localStorage.getItem(SESSK) || ''; } catch (e) { return ''; } },
  hash(p, salt) { let h1 = 0xdeadbeef ^ salt.length, h2 = 0x41c6ce57; const str = salt + '|' + p; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16); },
  login(phone) { try { localStorage.setItem(SESSK, phone); } catch (e) {} },
  logout() { try { localStorage.removeItem(SESSK); } catch (e) {} }
};
const dataKey = () => { const p = Auth.session(); return p ? KEY + ':' + p : KEY; };
const store = {
  load() { try { return JSON.parse(localStorage.getItem(dataKey())); } catch (e) { return null; } },
  save(d) { try { localStorage.setItem(dataKey(), JSON.stringify(d)); return true; } catch (e) { return false; } },
  clear() { try { localStorage.removeItem(dataKey()); } catch (e) {} }
};
function refreshIcons() {
  try { if (window.lucide) lucide.createIcons({ icons: lucide.icons, attrs: { 'stroke-width': 1.9 } }); } catch (e) {}
}

/* ================= Transliteration: Qaraqalpaq Latın → Kiril ================= */
const PROTECT = /(BUSINESS|MAX|Aurora|JPG|PNG|Liquid Glass|Classic|Glass|Uzcard|Humo|Visa|Mastercard|Click|Payme|Paynet|Beeline|Ucell|Mobiuz|Uzmobile|Humans|Uzonline|Sarkor|Comnet|TPS|UzDigital|ATTO|PRO|PIN|CSV|JSON|UZS|USD|EUR|RUB|KZT|AI|ID|QR|GAI|YHXB|SMS|v\d[\d.]*)/g;
const DI = { Sh: 'Ш', SH: 'Ш', sh: 'ш', Ch: 'Ч', CH: 'Ч', ch: 'ч', Yu: 'Ю', YU: 'Ю', yu: 'ю', Ya: 'Я', YA: 'Я', ya: 'я', Yo: 'Ё', yo: 'ё' };
const MONO = {
  'Á': 'Ә', 'á': 'ә', 'Ǵ': 'Ғ', 'ǵ': 'ғ', 'Í': 'Ы', 'ı': 'ы', 'Ń': 'Ң', 'ń': 'ң', 'Ó': 'Ө', 'ó': 'ө', 'Ú': 'Ү', 'ú': 'ү',
  A: 'А', a: 'а', B: 'Б', b: 'б', D: 'Д', d: 'д', E: 'Е', e: 'е', F: 'Ф', f: 'ф', G: 'Г', g: 'г', H: 'Ҳ', h: 'ҳ', X: 'Х', x: 'х',
  I: 'И', i: 'и', J: 'Ж', j: 'ж', K: 'К', k: 'к', Q: 'Қ', q: 'қ', L: 'Л', l: 'л', M: 'М', m: 'м', N: 'Н', n: 'н', O: 'О', o: 'о',
  P: 'П', p: 'п', R: 'Р', r: 'р', S: 'С', s: 'с', T: 'Т', t: 'т', U: 'У', u: 'у', V: 'В', v: 'в', W: 'Ў', w: 'ў', Y: 'Й', y: 'й',
  Z: 'З', z: 'з', C: 'Ц', c: 'ц'
};
function convertChunk(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const two = s.substr(i, 2);
    if (DI[two]) { out += DI[two]; i++; continue; }
    out += MONO[s[i]] ?? s[i];
  }
  return out;
}
function toCyr(s) {
  s = String(s);
  let res = '', last = 0;
  s.replace(PROTECT, (m, _g, off) => { res += convertChunk(s.slice(last, off)) + m; last = off + m.length; return m; });
  return res + convertChunk(s.slice(last));
}
const C2L = { 'ш': 'sh', 'ч': 'ch', 'ю': 'yu', 'я': 'ya', 'ё': 'yo', 'ә': 'á', 'ғ': 'ǵ', 'ы': 'ı', 'ң': 'ń', 'ө': 'ó', 'ү': 'ú', 'а': 'a', 'б': 'b', 'д': 'd', 'е': 'e', 'ф': 'f', 'г': 'g', 'ҳ': 'h', 'х': 'x', 'и': 'i', 'ж': 'j', 'к': 'k', 'қ': 'q', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'в': 'v', 'ў': 'w', 'й': 'y', 'з': 'z', 'ц': 'c', 'ь': '', 'ъ': '', 'э': 'e', 'щ': 'sh' };
const toLat = s => String(s).toLowerCase().replace(/[а-яёәғқңөүўҳ]/g, c => C2L[c] ?? c);
/* ===== Tiller: qq-Latın (tiykarǵı), qq-Kiril (avtomat), ózbek, qazaq, rus, ingliz ===== */
const I18N = {"uz":{"1 ay":"1 oy","1 hápte":"1 hafta","3 ay":"3 oy","30 kún":"30 kun","5 ke shekem":"5 gacha","AI ay esabatı":"AI oylik hisoboti","AI ay esabatı hám qarjı balı":"AI oylik hisoboti va moliya bali","AI eske salıw xatı":"AI eslatma xati","AI eslep qaldı":"AI eslab qoldi","AI keńesi":"AI maslahati","AI keńesleri":"AI maslahatlari","AI kómekshi":"AI yordamchi","AI kómekshi qalay isleydi?":"AI yordamchi qanday ishlaydi?","AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.":"AI tugmasini bosing va «taksi 25 ming» deb yozib ko'ring.","AI tuymesin basıń hám ápiwayı tilde jazıń: «taksi 25 mıń», «aylıq 6 mln keldi», «keshe bazarǵa 180 000». AI muǵdardı, kategoriyanı hám túrin ózi anıqlaydı. Sonday-aq «bul ay qansha jumsadım?» dep sorawıńız múmkin.":"AI tugmasini bosing va oddiy tilda yozing: «taksi 25 ming», «oylik 6 mln keldi», «kecha bozorga 180 000». AI summa, kategoriya va turini o'zi aniqlaydi. «Bu oy qancha sarfladim?» deb so'rashingiz ham mumkin.","AI usınısı":"AI taklifi","AI ǵa ádettegi tilde jazıń yamasa aytıń: ol summa, kategoriya hám sáneni ózi anıqlaydı.":"AI ga oddiy tilda yozing yoki ayting: u summa, kategoriya va sanani o'zi aniqlaydi.","AQSH dolları":"AQSH dollari","Abonent":"Abonent","Adam atı":"Ism","Adamlar sanı":"Odamlar soni","Adamǵa qarız haqqında SMS jiberiw":"Odamga qarz haqida SMS yuborish","Akkaunttan shıǵıw":"Akkauntdan chiqish","Akkauntıńız bar ma?":"Akkauntingiz bormi?","Akkauntıńız joq pa?":"Akkauntingiz yo'qmi?","Akkauntıńızǵa kiriń":"Akkauntingizga kiring","Aksessuar hám zergerlik":"Aksessuar va zargarlik","Aktiv qarız joq":"Faol qarz yo'q","Aktiv qarız joq. Esap teń!":"Faol qarz yo'q. Hisob teng!","Aktiv qarız joq. Qarjıńız tınısh!":"Faol qarz yo'q. Moliyangiz tinch!","Aldın Profil → Hamyanlar bóliminde hamyan qosıń.":"Avval Profil → Hamyonlar bo'limida hamyon qo'shing.","Aldın hamyan qosıń":"Avval hamyon qo'shing","Aldınǵı dáwir boyınsha maǵlıwmat joq":"Oldingi davr bo'yicha ma'lumot yo'q","Almastırıldı":"Almashtirildi","Almastırıw":"Almashtirish","Alınadı":"Olinadi","Alınǵan":"Olingan","Alınǵanda":"Olinganda","Alıs-berisler":"Oldi-berdilar","Alıw":"Olish","Analiz":"Tahlil","Anıqlanbaǵan":"Aniqlanmagan","Aprel":"Aprel","Aqsha salıw":"Pul solish","Aqıllı byudjet (AI limitler)":"Aqlli byudjet (AI limitlar)","Aqıllı byudjet: AI limitlerdi usınadı":"Aqlli byudjet: AI limitlarni taklif qiladi","Artıq tólem":"Ortiqcha to'lov","Arza jiberiw":"Ariza yuborish","Arza nomeri":"Ariza raqami","Arzanı jiberiń, biz siz benen 24 saat ishinde baylanısamız.":"Arizani yuboring, biz siz bilan 24 soat ichida bog'lanamiz.","Arzımaydı! Jáne ne járdem kerek?":"Arzimaydi! Yana qanday yordam kerak?","Ataw hám reńin ózgertiw":"Nomi va rangini o'zgartirish","Atı":"Ismi","Atı hám summanı kirgiziń":"Nomi va summani kiriting","Atı, familiyası, telefon hám súwret":"Ism, familiya, telefon va rasm","Atın jazıń":"Nomini yozing","Atın kirgiziń":"Nomini kiriting","Atıńızdı kirgiziń":"Ismingizni kiriting","Atıńızdı kiritiń":"Ismingizni kiriting","Avgust":"Avgust","Avto sheship alıw":"Avto yechib olish","Avtomat":"Avtomatik","Awdarma":"O'tkazma","Awdarma ushın keminde eki hamyan kerek":"O'tkazma uchun kamida ikkita hamyon kerak","Awqat jetkeriw":"Ovqat yetkazish","Ay":"Oy","Ay aqırına prognoz":"Oy oxiriga prognoz","Ay kúni (1–28)":"Oy kuni (1–28)","Aylıq":"Oylik","Aylıq %":"Oylik %","Aylıq 6,5 mln keldi":"Oylik 6,5 mln keldi","Aylıq hám avans":"Oylik va avans","Aylıq limitler":"Oylik limitlar","Aylıq procent":"Oylik foiz","Aylıq tólem":"Oylik to'lov","Aylıq ulıwma byudjet":"Oylik umumiy byudjet","Aymaqlıq elektr tarmaqları":"Hududiy elektr tarmoqlari","Aytıń — E-esap ózi jazadı":"Ayting — E-esap o'zi yozadi","Ayına":"Oyiga","Ayına jıynaw kerek":"Oyiga yig'ish kerak","Az":"Kam","Azıq-awqat":"Oziq-ovqat","BASQA":"BOSHQA","Baha":"Baho","Bala-baqsha":"Bog'cha","Balalar":"Bolalar","Balalar baqshası":"Bolalar bog'chasi","Balans":"Balans","Balans esabatları":"Balans hisobotlari","Balans esabatların kóriw":"Balans hisobotlarini ko'rish","Balans qosıldı":"Balans qo'shildi","Balans qosıw":"Balans qo'shish","Balans saqlandı":"Balans saqlandi","Balans óshirildi":"Balans o'chirildi","Balanslar halatı":"Balanslar holati","Balanslar hár qıylı bolıwı kerek":"Balanslar har xil bo'lishi kerak","Balansta jetkilikli qarjı joq":"Balansda yetarli mablag' yo'q","Balanstan balansqa ótkeriw":"Balansdan balansga o'tkazish","Balanstı jasırıw":"Balansni yashirish","Balanstı redaktorlaw":"Balansni tahrirlash","Balanstı óshiriw":"Balansni o'chirish","Balanstı ózgertiw":"Balansni o'zgartirish","Balansım qansha?":"Balansim qancha?","Balansıńız barlıq qarızlardı jabıwǵa jetedi":"Balansingiz barcha qarzlarni yopishga yetadi","Baner":"Banner","Bank, karta, naqd pul hám valyuta — barlıq balanslarıńız bir jerde, bir túymede.":"Bank, karta, naqd pul va valyuta — barcha balanslaringiz bir joyda, bir tugmada.","Barlıq balanslarıńızdıń jıyındısı: naqd pul + kartalar + valyuta. Kóz belgisi menen summanı jasırıwǵa boladı.":"Barcha balanslaringiz yig'indisi: naqd pul + kartalar + valyuta. Ko'z belgisi bilan summani yashirish mumkin.","Barlıq hamyanlar":"Barcha hamyonlar","Barlıq kategoriyalar":"Barcha kategoriyalar","Barlıq kirim-shıǵım jazıwları, maqset hám qarızlar óshiriledi. Hamyan balansları 0 ge túsedi.":"Barcha kirim-chiqim yozuvlari, maqsad va qarzlar o'chiriladi. Hamyon balanslari 0 ga tushadi.","Barlıq maydanlardı toltırıń":"Barcha maydonlarni to'ldiring","Barlıq maǵlıwmatlar tek sizdiń qurılmańızda saqlanadı. Rezerv nusqa ushın Profil → Maǵlıwmatlar bólimin paydalanıń.":"Barcha ma'lumotlar faqat qurilmangizda saqlanadi. Zaxira nusxa uchun Profil → Ma'lumotlar bo'limidan foydalaning.","Barlıq maǵlıwmattı saqlaw yamasa tiklew":"Barcha ma'lumotni saqlash yoki tiklash","Barlıq operaciyalar":"Barcha tranzaksiyalar","Barlıq qarızdı uaqtında qaytarıw ushın kúnine":"Barcha qarzni vaqtida qaytarish uchun kuniga","Barlıq qarızlar":"Barcha qarzlar","Barlıq qarızlar tártipte. Múddetler jaqınlasqanda eskertemen.":"Barcha qarzlar tartibda. Muddatlar yaqinlashganda eslataman.","Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.":"Barcha sozlamalar va ma'lumotlar o'chiriladi.","Barlıq tólemler bir kalendarda":"Barcha to'lovlar bitta kalendarda","Barlıǵı":"Barchasi","Barlıǵın kórsetiw":"Barchasini ko'rsatish","Bas bet":"Bosh sahifa","Baslanǵısh halına qaytarıw":"Boshlang'ich holatga qaytarish","Baslanǵısh summa":"Boshlang'ich summa","Baslanǵısh tártip":"Boshlang'ich tartib","Baslaw":"Boshlash","Basqa":"Boshqa","Basqa dáramatlar":"Boshqa daromadlar","Basqa járiymalar":"Boshqa jarimalar","Basqa kirim":"Boshqa kirim","Basqa maqsetler":"Boshqa maqsadlar","Basqa qarızlar":"Boshqa qarzlar","Basqa qárejetler":"Boshqa xarajatlar","Basqalar":"Boshqalar","Basqarıw":"Boshqarish","Baylanıs":"Aloqa","Baylanıs adamı":"Aloqa uchun shaxs","Baylanıs hám media":"Aloqa va media","Bazar 180 000 naq":"Bozor 180 000 naqd","Bazar hám dúkan":"Bozor va do'kon","Belgi":"Belgi","Berilgen":"Berilgan","Beriw":"Berish","Bilim":"Ta'lim","Bilim hám baylanıs":"Ta'lim va aloqa","Biykar etildi":"Bekor qilindi","Biykarlandı":"Bekor qilindi","Biykarlaw":"Bekor qilish","Biznes":"Biznes","Biznes basqa":"Biznes boshqa","Biznes dáramatları":"Biznes daromadlari","Biznes hám jumıs":"Biznes va ish","Biznes hám tolıq qadaǵalaw ushın":"Biznes va to'liq nazorat uchun","Biznes paneli":"Biznes paneli","Biznes paneli hám hisob-fakturalar":"Biznes paneli va hisob-fakturalar","Biznesińizdi E-esap paydalanıwshılarına kórsetiń":"Biznesingizni E-esap foydalanuvchilariga ko'rsating","Bonus":"Bonus","Bos":"Bo'sh","Bugin":"Bugun","Bugin ele operaciya joq":"Bugun hali tranzaksiya yo'q","Bugingi operaciyalar":"Bugungi tranzaksiyalar","Bul aralıqta maǵlıwmat joq":"Bu oraliqda ma'lumot yo'q","Bul ay ele shıǵım joq.":"Bu oy hali chiqim yo'q.","Bul ay jumsaldı":"Bu oy sarflandi","Bul ay limit":"Bu oy limit","Bul ay qansha jumsadım?":"Bu oy qancha sarfladim?","Bul ay sap payda":"Bu oy sof foyda","Bul ay xızmetlerge":"Bu oy xizmatlarga","Bul brauzerde kontaktlar ashılmaydı":"Bu brauzerda kontaktlar ochilmaydi","Bul bólimde qarız joq":"Bu bo'limda qarz yo'q","Bul dáwirde maǵlıwmat joq":"Bu davrda ma'lumot yo'q","Bul hamyanda qarjı jetkiliksiz. Basqa hamyandı saylań.":"Bu hamyonda mablag' yetarli emas. Boshqa hamyonni tanlang.","Bul jerde sizdiń biznesińiz turıwı múmkin. Arza qaldırıń — biz siz benen baylanısamız.":"Bu yerda sizning biznesingiz turishi mumkin. Ariza qoldiring — biz siz bilan bog'lanamiz.","Bul kategoriyadaǵı operaciyalar «Basqa» ǵa ótedi.":"Bu kategoriyadagi tranzaksiyalar «Boshqa» ga o'tadi.","Bul kúni operaciya joq":"Bu kuni tranzaksiya yo'q","Bul kúni tólem joq":"Bu kuni to'lov yo'q","Bul maqset óshiriledi.":"Bu maqsad o'chiriladi.","Bul nomer aldın dizimnen ótken — Kiriw bólimine ótiń":"Bu raqam avval ro'yxatdan o'tgan — Kirish bo'limiga o'ting","Bul nomer dizimnen ótpegen":"Bu raqam ro'yxatdan o'tmagan","Bul operaciya biykarlanadı. Keyin qaytarıwǵa boladı.":"Bu tranzaksiya bekor qilinadi. Keyin qaytarish mumkin.","Bul operaciya biykarlandı":"Bu tranzaksiya bekor qilindi","Bul operaciyanı óshiriwdi qáleysiz be?":"Bu tranzaksiyani o'chirmoqchimisiz?","Bul rejimde jazıwlar úlkenirek, tuymeler anıǵıraq hám navigaciyada barlıq atamalar kórinedi.":"Bu rejimda yozuvlar kattaroq, tugmalar aniqroq va navigatsiyada barcha nomlar ko'rinadi.","Buyırtpa ushın":"Buyurtma uchun","Byudjet":"Byudjet","Byudjet hám limitler":"Byudjet va limitlar","Byudjet jaǵdayı":"Byudjet holati","Byudjet ornatılmaǵan":"Byudjet o'rnatilmagan","Byudjet ornatılmaǵan. Profil → Byudjet hám limitler bóliminde ornatıń.":"Byudjet o'rnatilmagan. Profil → Byudjet va limitlar bo'limida o'rnating.","Byudjet tawsıldı":"Byudjet tugadi","Byudjetten asıp kettińiz.":"Byudjetdan oshib ketdingiz.","Bólip":"Bo'lib","Bólip tólew":"Bo'lib to'lash","Búgin":"Bugun","Búgin qaldı":"Bugun qoldi","Búgingi AI limiti tawsıldı. MAX ta — sheksiz.":"Bugungi AI limiti tugadi. MAX da — cheksiz.","Click, Payme yamasa karta arqalı":"Click, Payme yoki karta orqali","Dawam etiw":"Davom etish","Dawıs effektleri":"Ovoz effektlari","Dawıs effektleri qosıldı":"Ovoz effektlari yoqildi","Dawıs effektleri óshirildi":"Ovoz effektlari o'chirildi","Dekabr":"Dekabr","Demo kurs":"Demo kurs","Demo maǵlıwmatlar menen qayta baslaw":"Demo ma'lumotlar bilan qayta boshlash","Demo rejim: summa hamyannan shıǵım retinde jazıladı":"Demo rejim: summa hamyondan chiqim sifatida yoziladi","Demo rejim: tólem kirim-shıǵım esabına jazıladı":"Demo rejim: to'lov kirim-chiqim hisobiga yoziladi","Demo tólem":"Demo to'lov","Densawlıq":"Salomatlik","Densawlıq hám kútim":"Salomatlik va parvarish","Depozit kalkulyatorı":"Depozit kalkulyatori","Dinamika":"Dinamika","Dizimnen ótiw":"Ro'yxatdan o'tish","Dizimnen óttińiz!":"Ro'yxatdan o'tdingiz!","Dollar":"Dollar","Dáramatlar":"Daromadlar","Dári-dármaq":"Dori-darmon","Dárixana":"Dorixona","Dáwirdi saylań":"Davrni tanlang","Dıqqat kerek":"Diqqat kerak","Dú":"Du","Dúkan":"Do'kon","Dúysenbi":"Dushanba","Dúyshembi":"Dushanba","E-esap AI chat":"E-esap AI chat","E-esap gruppaları":"E-esap guruhlari","E-esap penen tanısayıq!":"E-esap bilan tanishaylik!","E-esap sizge unadı ma?":"E-esap sizga yoqdimi?","E-esap ǵa xosh keldińiz!":"E-esap ga xush kelibsiz!","E-esap — operaciyalar esabatı":"E-esap — tranzaksiyalar hisoboti","E-esap — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.":"E-esap — kirim-chiqimni hisoblash ilovasi. U kundalik moliyangizni yozib borish, byudjet tuzish, jamg'arma maqsadlariga erishish va AI yordamchi orqali oddiy tilda tranzaksiya qo'shishga yordam beradi.","Ek":"Ya","Ekshembi":"Yakshanba","Eksport, rezerv nusqa, tazalaw":"Eksport, zaxira nusxa, tozalash","Ele esabatlar joq. Tómendegi + túymesin basıp birinshisin qosıń":"Hali hisobotlar yo'q. Pastdagi + tugmasini bosib birinchisini qo'shing","Ele jinaq maqsetińiz joq. Profil → Jinaq maqsetleri.":"Hali jamg'arma maqsadingiz yo'q. Profil → Jamg'arma maqsadlari.","Ele maqset joq":"Hali maqsad yo'q","Ele maqset joq. Ármanıńız ushın jinawdı baslań!":"Hali maqsad yo'q. Orzuingiz uchun yig'ishni boshlang!","Ele maqset joq. Ármanıńız ushın shiyshe kopilka ashıń!":"Hali maqsad yo'q. Orzuingiz uchun shisha kopilka oching!","Ele operaciya joq":"Hali tranzaksiya yo'q","Ele tólem joq":"Hali to'lov yo'q","Elektr energiyası":"Elektr energiyasi","Elektronika hám texnika":"Elektronika va texnika","Emoji":"Emoji","Energiya únemlew":"Energiya tejash","Esabat":"Hisobot","Esap nomerin tolıq kirgiziń":"Hisob raqamini to'liq kiriting","Esap teń":"Hisob teng","Esaptı bólisiw":"Hisobni bo'lishish","Eske salıw":"Eslatma","Eskertpe":"Izoh","Evro":"Yevro","Excel eksport":"Excel eksport","Excel esabatı (.xlsx)":"Excel hisoboti (.xlsx)","Excel esabatı júklendi":"Excel hisoboti yuklandi","Eń az muǵdar — 1 000 swm":"Eng kam summa — 1 000 so'm","Eń kóp qayda jumsadım?":"Eng ko'p qayerga sarfladim?","Eń kóp shıǵımlar":"Eng ko'p chiqimlar","Eń qımbat kún":"Eng qimmat kun","Eń shuǵıl qarız":"Eng shoshilinch qarz","Familiyası":"Familiyasi","Familiyańızdı kiritiń":"Familiyangizni kiriting","Fayl":"Fayl","Fevral":"Fevral","Finans hám minnetlemeler":"Moliya va majburiyatlar","Finans operaciyaları":"Moliyaviy operatsiyalar","Funt sterling":"Funt sterling","Gruppa":"Guruh","Gruppa atı":"Guruh nomi","Gruppa óshiriledi, kategoriyalar «Jeke kategoriyalar» ǵa ótedi.":"Guruh o'chiriladi, kategoriyalar «Shaxsiy kategoriyalar» ga o'tadi.","Gruppanı óshiriw":"Guruhni o'chirish","Gruppanı ózgertiw":"Guruhni o'zgartirish","Hamyan":"Hamyon","Hamyan qosıw":"Hamyon qo'shish","Hamyan saylań":"Hamyonni tanlang","Hamyanda qarjı jetkiliksiz":"Hamyonda mablag' yetarli emas","Hamyandı saylań":"Hamyonni tanlang","Hamyanlar":"Hamyonlar","Hamyanlar boyınsha":"Hamyonlar bo'yicha","Hamyanlarım":"Hamyonlarim","Hamyannan almaw":"Hamyondan olmaslik","Hamyannan tólew":"Hamyondan to'lash","Hamyansız":"Hamyonsiz","Haywanlar":"Uy hayvonlari","Hesh nárse tabılmadı":"Hech narsa topilmadi","Hisob-faktura":"Hisob-faktura","Hisob-fakturalar":"Hisob-fakturalar","Hobbi":"Hobbi","Hududgaz Qaraqalpaqstan":"Hududgaz Qoraqalpog'iston","Hámme ushın baslanǵısh tarif":"Hamma uchun boshlang'ich tarif","Hámmesi":"Hammasi","Hámmesi kózińizdiń aldında":"Hammasi ko'z oldingizda","Hámmesin baslanǵısh halına qaytarıw":"Hammasini boshlang'ich holatga qaytarish","Hápte":"Hafta","Hápte ritmi":"Hafta ritmi","Hápte sayın":"Har hafta","Hápte, ay yamasa jıl boyınsha salıstırıń hám kategoriyalarǵa limit qoyıń.":"Hafta, oy yoki yil bo'yicha solishtiring va kategoriyalarga limit qo'ying.","Hár 30 kúnde tarif hamyannan avtomat jańalanadı":"Har 30 kunda tarif hamyondan avtomatik yangilanadi","Hár adamǵa":"Har bir odamga","Hár ayda":"Har oy","Hár ayda qosıw":"Har oy qo'shish","Házir bar":"Hozir bor","Házirgi tarifińiz":"Joriy tarifingiz","Házirgi versiyada tólemler demo rejimde isleydi: pul alınbaydı, biraq tólem shıǵım retinde esapqa jazıladı.":"Hozirgi versiyada to'lovlar demo rejimda ishlaydi: pul yechilmaydi, lekin to'lov chiqim sifatida hisobga yoziladi.","Házirgi waqıtta qansha qarjıńız bar?":"Hozir qancha mablag'ingiz bor?","Iconlar":"Ikonkalar","Ijara dáramatları":"Ijara daromadlari","Ijara haqı":"Ijara haqi","Ikonka":"Ikonka","Internet":"Internet","Investiciya":"Investitsiya","Ipoteka bank":"Ipoteka bank","Ishimlik suw":"Ichimlik suvi","Ishimlikler":"Ichimliklar","Iyul":"Iyul","Iyun":"Iyun","Izlew":"Qidirish","Izlew: kategoriya, eskertpe, muǵdar":"Qidiruv: kategoriya, izoh, summa","Izoh":"Izoh","Izoh jazıń":"Izoh yozing","JPG yamasa PNG. Súwret qurılmańızda saqlanadı.":"JPG yoki PNG. Rasm qurilmangizda saqlanadi.","Jabıldı":"Yopildi","Jabıw":"Yopish","Janılǵı hám gaz":"Yoqilg'i va gaz","Jaqsı":"Yaxshi","Jaqtı":"Yorug'","Jaqın tólemler":"Yaqin to'lovlar","Jaratılǵan sáne":"Yaratilgan sana","Jaratıw":"Yaratish","Jaratıwshı":"Yaratuvchi","Jazılıwlar":"Obunalar","Jazıń: taksi 25 mıń...":"Yozing: taksi 25 ming...","Jańa":"Yangi","Jańa PIN-kod":"Yangi PIN-kod","Jańa akkaunt jaratıń — bir minut waqıt aladı":"Yangi akkaunt yarating — bir daqiqa vaqt oladi","Jańa balans":"Yangi balans","Jańa balans ashıladı":"Yangi balans ochiladi","Jańa gruppa":"Yangi guruh","Jańa hamyan":"Yangi hamyon","Jańa hisob-faktura":"Yangi hisob-faktura","Jańa kategoriya":"Yangi kategoriya","Jańa maqset":"Yangi maqsad","Jańa noutbuk":"Yangi noutbuk","Jańa operaciya":"Yangi tranzaksiya","Jańa parol":"Yangi parol","Jańa parol qoyıń":"Yangi parol qo'ying","Jańa paroldi qaytalań":"Yangi parolni takrorlang","Jańa qarız":"Yangi qarz","Jańa turaqlı tólem":"Yangi doimiy to'lov","Jeke kategoriyalar":"Shaxsiy kategoriyalar","Jeke kútim":"Shaxsiy parvarish","Jeke qárejetler":"Shaxsiy xarajatlar","Jer":"Yer","Jer salıǵı":"Yer solig'i","Jinaq":"Jamg'arma","Jinaq dárejesi":"Jamg'arma darajasi","Jinaq kalkulyatorı":"Jamg'arma kalkulyatori","Jinaq maqsetleri":"Jamg'arma maqsadlari","Jol kira (avtobus)":"Yo'l kira (avtobus)","Ju":"Ju","Juma":"Juma","Jumsaldı":"Sarflandi","Jámi":"Jami","Jámi jumsaldı":"Jami sarflandi","Jámi kirim":"Jami kirim","Jámi shıǵım":"Jami chiqim","Jámi summa":"Jami summa","Jámi tólem":"Jami to'lov","Járdem hám sorawlar":"Yordam va savollar","Járiymalar":"Jarimalar","Jıl":"Yil","Jıllıq %":"Yillik %","Jıllıq procent":"Yillik foiz","Jılıw hám ıssı suw":"Isitish va issiq suv","Jılıw támiynatı":"Isitish ta'minoti","Jıynaq hám investiciya":"Jamg'arma va investitsiya","Jıynaw":"Yig'ish","Kafe":"Kafe","Kalendar":"Kalendar","Kalkulyator":"Kalkulyator","Kalkulyator tuymelerinde + hám − ne ushın?":"Kalkulyator tugmalaridagi + va − nima uchun?","Karta nomeriniń aqırı (májbúriy emes)":"Karta raqamining oxiri (ixtiyoriy)","Kategoriya":"Kategoriya","Kategoriya limitleri":"Kategoriya limitlari","Kategoriya qosıw":"Kategoriya qo'shish","Kategoriya saylaw":"Kategoriya tanlash","Kategoriyalar":"Kategoriyalar","Kategoriyalar boyınsha":"Kategoriyalar bo'yicha","Kategoriyalarıńızdı óz gruppańızǵa jıynań":"Kategoriyalaringizni o'z guruhingizga yig'ing","Kategoriyanı óshiriw":"Kategoriyani o'chirish","Kategoriyanı ózgertiw":"Kategoriyani o'zgartirish","Keminde 6 belgi":"Kamida 6 belgi","Keminde bir balans qalıwı kerek":"Kamida bitta balans qolishi kerak","Keminde bir kategoriya qalıwı kerek":"Kamida bitta kategoriya qolishi kerak","Kerekli summa":"Kerakli summa","Keshbek hám qaytım":"Keshbek va qaytim","Keshe":"Kecha","Kewil ashıw":"Ko'ngilochar","Kewilli stikerler":"Quvnoq stikerlar","Keyingi tólem":"Keyingi to'lov","Keyinirek":"Keyinroq","Keńes alıw":"Maslahat olish","Keńes ber":"Maslahat ber","Keńes beriw ushın aldın bir neshe operaciya qosıń.":"Maslahat berishim uchun avval bir nechta tranzaksiya qo'shing.","Kim qarızdar?":"Kim qarzdor?","Kimge / kimnen":"Kimga / kimdan","Kimge qarız berdińiz yamasa kimnen aldıńız — bárin jazıń. Qaytarıw múddeti jaqınlasqanda eskertemiz.":"Kimga qarz berdingiz yoki kimdan oldingiz — hammasini yozing. Qaytarish muddati yaqinlashganda eslatamiz.","Kirim":"Kirim","Kirim hám shıǵım":"Kirim va chiqim","Kirim qosıldı":"Kirim qo'shildi","Kirim summası":"Kirim summasi","Kirim-shıǵımıńız endi bir qolda":"Kirim-chiqimingiz endi bir qo'lda","Kirimnen artıq jumsaldı":"Kirimdan ortiq sarflandi","Kiriw":"Kirish","Kiyim-kenshek":"Kiyim-kechak","Kiyim-keshek":"Kiyim-kechak","Klient":"Mijoz","Klientler":"Mijozlar","Klientler hám hisob-fakturalar":"Mijozlar va hisob-fakturalar","Klientlerge hisob-faktura jazıń, tólengende ol avtomat kirimge túsedi.":"Mijozlarga hisob-faktura yozing, to'langanda u avtomatik kirimga tushadi.","Kodtı qayta jiberiw":"Kodni qayta yuborish","Kofe":"Qahva","Komissiya":"Komissiya","Komissiya: 0%":"Komissiya: 0%","Kommunal":"Kommunal","Kommunal tólemler":"Kommunal to'lovlar","Kommunal tólewler":"Kommunal to'lovlar","Kompaniya hám baylanıs adamın kirgiziń":"Kompaniya va aloqa shaxsini kiriting","Kompaniya yamasa brend atı":"Kompaniya yoki brend nomi","Kompyuter":"Kompyuter","Kopilka toldı":"Kopilka to'ldi","Kopilka toldı!":"Kopilka to'ldi!","Kopilka toldı! Maqsetke jettińiz":"Kopilka to'ldi! Maqsadga erishdingiz","Kopilkaǵa aqsha salıw":"Kopilkaga pul solish","Kóylek":"Ko'ylak","Kredit hám nasiya":"Kredit va nasiya","Kredit kalkulyatorı":"Kredit kalkulyatori","Kredit muǵdarı":"Kredit summasi","Kredit tólew":"Kredit to'lash","Kurs":"Kurs","Kurslar demo maqsetinde kórsetilgen, bank kursı menen ayırmashılıǵı bolıwı múmkin":"Kurslar demo maqsadida ko'rsatilgan, bank kursidan farq qilishi mumkin","Kurslar jańalanıp atır":"Kurslar yangilanmoqda","KÓRINIS":"KO'RINISH","Kórinis":"Ko'rinish","Kórip shıǵılmaqta":"Ko'rib chiqilmoqda","Kóshirildi":"Ko'chirildi","Kóshiriw":"Ko'chirish","Kún / Ay / Jıl":"Kun / Oy / Yil","Kún qaldı":"Kun qoldi","Kúnine":"Kuniga","Kúnine 30":"Kuniga 30","Kúnler":"Kunlar","Kúnler boyınsha esap":"Kunlar bo'yicha hisob","Kúnlik limit":"Kunlik limit","Kútilip atır":"Kutilmoqda","Kútilip atırǵan esaplar":"Kutilayotgan hisoblar","Kútilmegen qárejetler":"Kutilmagan xarajatlar","Limit":"Limit","Limit ornatılmaǵan":"Limit o'rnatilmagan","Limit ornatıw":"Limit o'rnatish","Limit orınlanıwı":"Limit bajarilishi","Limit summasın kiritiń":"Limit summasini kiriting","Limitlerdi sazlaw":"Limitlarni sozlash","Logistika":"Logistika","MAX aktivlestirildi!":"MAX faollashtirildi!","MAX satıp alıw":"MAX sotib olish","MAX tarifin biykarlaw":"MAX tarifini bekor qilish","MAX tarifinde ashıladı":"MAX tarifida ochiladi","MB kursı":"MB kursi","Maqset":"Maqsad","Maqset atı":"Maqsad nomi","Maqset hám qarızlar":"Maqsad va qarzlar","Maqset jaratıw":"Maqsad yaratish","Maqset qosıń":"Maqsad qo'shing","Maqset qoyıń, shiyshe kopilkaǵa tıyın salıń hám hár ay qansha jıynaw kerekligin biliń.":"Maqsad qo'ying, shisha kopilkaga tanga soling va har oy qancha yig'ish kerakligini biling.","Maqsetke jettińiz":"Maqsadga erishdingiz","Maqsetke jettińiz!":"Maqsadga erishdingiz!","Maqsetke qosıw":"Maqsadga qo'shish","Maqsetler":"Maqsadlar","Maqsetlerim":"Maqsadlarim","Maqsetli qárejetler":"Maqsadli xarajatlar","Maqsetti óshiriw":"Maqsadni o'chirish","Marketing":"Marketing","Mart":"Mart","Mashina qárejetleri":"Mashina xarajatlari","May":"May","Maǵan qaytadı":"Menga qaytadi","Maǵan qaytaradı":"Menga qaytaradi","Maǵan qaytarılıwı kerek":"Menga qaytarilishi kerak","Maǵlıwmat joq":"Ma'lumot yo'q","Maǵlıwmatlar":"Ma'lumotlar","Maǵlıwmatlar tiklendi":"Ma'lumotlar tiklandi","Maǵlıwmatlarım qayerde saqlanadı?":"Ma'lumotlarim qayerda saqlanadi?","Mektep":"Maktab","Men E-esap AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.":"Men E-esap AI. Tranzaksiyani oddiy yozing yoki moliyangiz haqida savol bering.","Men aldım":"Men oldim","Men berdim":"Men berdim","Men qaytaraman":"Men qaytaraman","Men qaytarıwım kerek":"Men qaytarishim kerak","Meniń arzalarım":"Mening arizalarim","Meniń gruppalarım":"Mening guruhlarim","Mikrofon islemedi. Tekst penen jazıń.":"Mikrofon ishlamadi. Matn bilan yozing.","Miynet dáramatları":"Mehnat daromadlari","Mobil baylanıs":"Mobil aloqa","Muzıka hám kino":"Musiqa va kino","Muǵdar":"Summa","Muǵdar hám valyutanı kiritiń":"Summa va valyutani kiriting","Muǵdardı kirgiziwde esaplaw múmkin: mısalı 12000+8500 — nátiyje avtomat túrde esaplanadı.":"Summani kiritishda hisoblash mumkin: masalan 12000+8500 — natija avtomatik hisoblanadi.","Muǵdardı kirgiziń":"Summani kiriting","Mámleket":"Davlat","Mámleket tólewleri":"Davlat to'lovlari","Múddet aqırında":"Muddat oxirida","Múddeti":"Muddati","Múddeti (ay)":"Muddati (oy)","Múddetsiz":"Muddatsiz","Múlk salıǵı":"Mulk solig'i","Mısalı":"Masalan","Mısalı: Aral Market":"Masalan: Aral Market","Mısalı: Azamat":"Masalan: Azamat","Mısalı: Balalar":"Masalan: Bolalar","Mısalı: Damir":"Masalan: Damir","Mısalı: Darmenbaevich":"Masalan: Darmenbaevich","Mısalı: Internet":"Masalan: Internet","Mısalı: Mashina":"Masalan: Mashina","Mısalı: Qonarbaev":"Masalan: Qonarbaev","Mısalı: Uzcard":"Masalan: Uzcard","Mısalı: bazar":"Masalan: bozor","Naq aqsha / basqa":"Naqd pul / boshqa","Naqd pul":"Naqd pul","Nan hám sút":"Non va sut","Neden":"Nimadan","Nege":"Nimaga","Neshe ayda":"Necha oyda","Noy":"Noy","Noyabr":"Noyabr","Nusqalandı":"Nusxalandi","Nusqalaw":"Nusxalash","Nátiyje":"Natija","Ofis":"Ofis","Oktyabr":"Oktyabr","Onlayn":"Onlayn","Onlayn xaridlar":"Onlayn xaridlar","Operaciya jazıw":"Tranzaksiya yozish","Operaciya qaytarıldı":"Tranzaksiya qaytarildi","Operaciya óshirildi":"Tranzaksiya o'chirildi","Operaciyalardı qosıń — men olardı analiz qılıp, keńes beremen.":"Tranzaksiyalarni qo'shing — men ularni tahlil qilib, maslahat beraman.","Operaciyalardı tazalaw":"Tranzaksiyalarni tozalash","Operaciyanı biykarlaw":"Tranzaksiyani bekor qilish","Operaciyanı ózgertiw":"Tranzaksiyani o'zgartirish","Operator tabılmadı":"Operator topilmadi","Oqıw hám rawajlanıw":"O'qish va rivojlanish","Oqıw tólemi":"O'qish to'lovi","Ornatılmaǵan":"O'rnatilmagan","Ortadaǵı túyme — AI kómekshi. «Keshe 50 mıń taksi» dep jazıń yamasa aytıń, ol operaciyanı ózi qosadı hám keńes beredi.":"O'rtadagi tugma — AI yordamchi. «Kecha 50 ming taksi» deb yozing yoki ayting, u tranzaksiyani o'zi qo'shadi va maslahat beradi.","Ortasha":"O'rtacha","Ortasha kúnlik":"O'rtacha kunlik","Ortashadan kóp":"O'rtachadan ko'p","Oyın":"O'yin","Oyın-kúlki":"O'yin-kulgi","Oyınlar hám servisler":"O'yinlar va servislar","Oyınshıqlar":"O'yinchoqlar","PIN-kod":"PIN-kod","PIN-kodlar sáykes kelmedi":"PIN-kodlar mos kelmadi","PIN-kodtı kirgiziń":"PIN-kodni kiriting","PIN-kodtı qaytalań":"PIN-kodni takrorlang","PIN-kodtı tiklew ushın: Profil → Maǵlıwmatlar → baslanǵısh halına qaytarıw. Házir ápiwayı jol: brauzer maǵlıwmatların tazalań.":"PIN-kodni tiklash uchun: Profil → Ma'lumotlar → boshlang'ich holatga qaytarish. Hozircha oddiy yo'l: brauzer ma'lumotlarini tozalang.","PIN-kodtı umıttım":"PIN-kodni unutdim","PIN-kodtı óshiriwdi qáleysiz be?":"PIN-kodni o'chirmoqchimisiz?","PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz":"PRO tarifda 5 tagacha hamyon, MAX da cheksiz","PRO ǵa ótiw":"PRO ga o'tish","PROGRAMMA STILI":"DASTUR USLUBI","Parol":"Parol","Parol jańalandı":"Parol yangilandi","Parol keminde 6 belgiden turıwı kerek":"Parol kamida 6 belgidan iborat bo'lishi kerak","Parol qáte":"Parol noto'g'ri","Paroldi kiritiń":"Parolni kiriting","Paroldi qayta kiritiń":"Parolni qayta kiriting","Paroldi qaytalań":"Parolni takrorlang","Paroldi tiklew":"Parolni tiklash","Paroldi umıttıńız ba?":"Parolni unutdingizmi?","Paroller sáykes kelmeydi":"Parollar mos kelmaydi","Paydalanıwshı":"Foydalanuvchi","Pi":"Pa","Piyshembi":"Payshanba","Plastik karta":"Plastik karta","Procent dáramatı":"Foiz daromadi","Procent kalkulyatorı":"Foiz kalkulyatori","Procent túri":"Foiz turi","Profil":"Profil","Profil maǵlıwmatları":"Profil ma'lumotlari","Profil → Programma stili bóliminde Classic yamasa Liquid Glass stilin, Jaqtı, Qarańǵı yamasa Avtomat temanı saylań.":"Profil → Dastur uslubi bo'limida Classic yoki Liquid Glass uslubini, Yorug', Qorong'i yoki Avtomatik mavzuni tanlang.","Prognoz":"Prognoz","Programmalar":"Dasturlar","Provayder":"Provayder","Pul awdarıw":"Pul o'tkazish","Push-xabarlama":"Push-xabarnoma","QARJÍ":"MOLIYA","QOSÍMSHA QURALLAR":"QO'SHIMCHA VOSITALAR","Qabıl etildi":"Qabul qilindi","Qaldı":"Qoldi","Qaldıq":"Qoldiq","Qamsızlandırıw":"Sug'urta","Qansha jıynaw kerek":"Qancha yig'ish kerak","Qaraqalpaqsha":"Qoraqalpoqcha","Qarańǵı":"Qorong'i","Qarjı":"Moliya","Qarjı densawlıǵı balı":"Moliyaviy salomatlik bali","Qarjı planı":"Moliya rejasi","Qarjı qurallari":"Moliya vositalari","Qarjı quralları":"Moliya vositalari","Qarjılarıńız qay jerge ketip atır":"Pulingiz qayerga ketyapti","Qarjıńız qayaqqa ketip atırǵanın kategoriyalar boyınsha kóriń. Kirim jasıl, shıǵım qızıl reńde.":"Pulingiz qayerga ketayotganini kategoriyalar bo'yicha ko'ring. Kirim yashil, chiqim qizil rangda.","Qarjıńızdı tolıq qadaǵalań":"Moliyangizni to'liq nazorat qiling","Qarız alıw hám beriw":"Qarz olish va berish","Qarız bergenińiz yamasa alǵanıńız bolsa, jazıp qoyıń":"Qarz bergan yoki olgan bo'lsangiz, yozib qo'ying","Qarız dápteri":"Qarz daftari","Qarız jabıldı":"Qarz yopildi","Qarız jaratıldı":"Qarz yaratildi","Qarız jaratıw":"Qarz yaratish","Qarız joq":"Qarz yo'q","Qarız qaytarıladı":"Qarz qaytariladi","Qarız qosıw":"Qarz qo'shish","Qarızdarlıq":"Qarzdorlik","Qarızdarlıqtı tekseriw":"Qarzdorlikni tekshirish","Qarızdı jabıw ushın":"Qarzni yopish uchun","Qarızdı tólew":"Qarzni to'lash","Qarızlar":"Qarzlar","Qashannan":"Qachondan","Qashanǵa shekem":"Qachongacha","Qaysı balansqa":"Qaysi balansga","Qaysı balanstan":"Qaysi balansdan","Qaysı hamyannan alınadı":"Qaysi hamyondan olinadi","Qaysı hamyanǵa túsedi":"Qaysi hamyonga tushadi","Qaysı valyutaǵa":"Qaysi valyutaga","Qayta jiberiw":"Qayta yuborish","Qaytadan kiriw ushın telefon nomeri hám parol kerek boladı.":"Qayta kirish uchun telefon raqami va parol kerak bo'ladi.","Qaytarıldı":"Qaytarildi","Qaytarıw":"Qaytarish","Qaytarıw múddeti":"Qaytarish muddati","Qaytarıw múddeti — búgin":"Qaytarish muddati — bugun","Qaytarıw sánesi":"Qaytarish sanasi","Qayırlı kesh":"Xayrli kech","Qayırlı kún":"Xayrli kun","Qayırlı tań":"Xayrli tong","Qayırlı tún":"Xayrli tun","Qayırqomlıq":"Xayriya","Qazaq teńgesi":"Qozoq tengesi","Qolıńızdaǵı naqd pul yamasa kartadaǵı summanı kiritiń — esap usı jerden baslanadı. Keyin ózgertiwge boladı.":"Qo'lingizdagi naqd pul yoki kartadagi summani kiriting — hisob shu yerdan boshlanadi. Keyin o'zgartirish mumkin.","Qonarbaev Damir":"Qonarbaev Damir","Qosılǵan":"Qo'shilgan","Qosılǵanda":"Qo'shilganda","Qosımsha haqqında":"Ilova haqida","Qosımsha maǵlıwmat":"Qo'shimcha ma'lumot","Qosımshanı bahalaw":"Ilovani baholash","Qosımshanıń tiykarǵı bólimlerin birge kórip shıǵayıq ba? Bar bolǵanı 30 sekund.":"Ilovaning asosiy bo'limlarini birga ko'rib chiqamizmi? Atigi 30 soniya.","Qosımshaǵa kiriw":"Ilovaga kirish","Qosıw":"Qo'shish","Qońıraw etiw":"Qo'ng'iroq qilish","Qurallar, kurslar, maqset hám qarızlar":"Vositalar, kurslar, maqsad va qarzlar","QÁWIPSIZLIK":"XAVFSIZLIK","Qáte format. JSON tekstti tekseriń":"Noto'g'ri format. JSON matnni tekshiring","Qırǵız somı":"Qirg'iz so'mi","Qıtay yuanı":"Xitoy yuani","Raxmet!":"Rahmat!","Reklama":"Reklama","Reklama beriw":"Reklama berish","Reklama haqqında":"Reklama haqida","Reklama ornı":"Reklama joyi","Reklama túri":"Reklama turi","Reklama ushın arza":"Reklama uchun ariza","Reklamaǵa qaytıw":"Reklamaga qaytish","Rezerv nusqa":"Zaxira nusxa","Rezerv nusqa (JSON)":"Zaxira nusxa (JSON)","Reń":"Rang","Reńi":"Rangi","Reńli sızıq belgiler":"Rangli chiziqli belgilar","Rossiya rublı":"Rossiya rubli","Rubl":"Rubl","SMS kod jiberildi":"SMS kod yuborildi","SMS kod jiberiw":"SMS kod yuborish","SMS kod qayta jiberildi":"SMS kod qayta yuborildi","SMS kodtı kiritiń":"SMS kodni kiriting","SMS xabarlama":"SMS xabarnoma","Saqawat qorı":"Saxovat jamg'armasi","Salon hám gózzallıq":"Salon va go'zallik","Salıqlar":"Soliqlar","Salıstırıw":"Solishtirish","Salıw":"Solish","Sanı":"Soni","Sap jaǵday":"Sof holat","Saqlandı":"Saqlandi","Saqlaw":"Saqlash","Saqlaw hám kiriw":"Saqlash va kirish","Saqlaw: tómendegi tekstti nusqalap, qáwipsiz jerde saqlań":"Saqlash: pastdagi matnni nusxalab, xavfsiz joyda saqlang","Sawda dáramatları":"Savdo daromadlari","Sawǵa":"Sovg'a","Sawǵa hám sıylıqlar":"Sovg'a va mukofotlar","Sawǵalar":"Sovg'alar","Sayaxat":"Sayohat","Saylaw":"Tanlash","Saytqa ótiw":"Saytga o'tish","Sazlawlar saqlanadı, jazıwlar óshiriledi":"Sozlamalar saqlanadi, yozuvlar o'chiriladi","Sentyabr":"Sentyabr","Sh":"Sh","Shay puli":"Choy puli","Shańaraq":"Oila","Shańaraq, balalar, úy":"Oila, bolalar, uy","Sheksiz":"Cheksiz","Shembi":"Shanba","Shiyshe kopilka ashıń":"Shisha kopilka oching","Shıǵım":"Chiqim","Shıǵım bolǵan":"Chiqim bo'lgan","Shıǵım joq":"Chiqim yo'q","Shıǵım qosıldı":"Chiqim qo'shildi","Shıǵım summası":"Chiqim summasi","Shıǵındı shıǵarıw":"Chiqindi olib chiqish","Shıǵıw":"Chiqish","Si":"Se","Siyshembi":"Seshanba","Siz qaytaratuǵın kóbirek":"Siz qaytaradigan ko'proq","Siz qosqanıńız":"Siz qo'shgan","Sizden alınǵan qarız":"Sizdan olingan qarz","Sizden alǵan qarızımdı umıtpadım":"Sizdan olgan qarzimni unutmadim","Sizge berilgen qarız":"Sizga berilgan qarz","Sizge qaytatuǵın kóbirek":"Sizga qaytadigan ko'proq","Skidka":"Chegirma","Skidka kalkulyatorı":"Chegirma kalkulyatori","Sońǵı esabatlar":"So'nggi hisobotlar","Sport":"Sport","Sport zal":"Sport zal","Statistika":"Statistika","Statistika hám byudjet":"Statistika va byudjet","Statistika, limitler, valyuta kursları hám qarjı esaplawıshları — aqıllı sheshimler ushın.":"Statistika, limitlar, valyuta kurslari va moliyaviy kalkulyatorlar — aqlli qarorlar uchun.","Status":"Status","Statusıńız BUSINESS ke ózgerdi":"Statusingiz BUSINESS ga o'zgardi","Stil":"Uslub","Stil hám temanı qalay ózgertemen?":"Uslub va mavzuni qanday o'zgartiraman?","Summa":"Summa","Summa (UZS)":"Summa (UZS)","Summalar bulıńǵır kórinedi":"Summalar xira ko'rinadi","Summanı kiritiń":"Summani kiriting","Suw támiynatı":"Suv ta'minoti","Svet hám gaz":"Svet va gaz","Swm":"So'm","Sá":"Ch","Sálem":"Salom","Sáne":"Sana","Sáneni saylań":"Sanani tanlang","Sárshembi":"Chorshanba","Súwret júklew":"Rasm yuklash","Súwretti oqıw múmkin bolmadı":"Rasmni o'qib bo'lmadi","Sırtta awqatlanıw":"Tashqarida ovqatlanish","TIL":"TIL","Tabılmadı":"Topilmadi","Taksi":"Taksi","Taksi 25 mıń":"Taksi 25 ming","Tarif jańalanıwı":"Tarif yangilanishi","Tarifler":"Tariflar","Tastıyıqlaw":"Tasdiqlash","Tayın":"Tayyor","Tayın! Endi E-esap tan tolıq paydalanıń":"Tayyor! Endi E-esap dan to'liq foydalaning","Taza aymaq":"Toza hudud","Tazalandı":"Tozalandi","Tazalaw":"Tozalash","Tek súwret faylın saylań":"Faqat rasm faylini tanlang","Tekstti belgilep, nusqalań":"Matnni belgilab, nusxalang","Telefon":"Telefon","Telefon balansı":"Telefon balansi","Telefon nomeri":"Telefon raqami","Telefon nomeri kórsetilmegen":"Telefon raqami ko'rsatilmagan","Telefon nomerin qosıw":"Telefon raqamini qo'shish","Telefon nomerin tolıq kirgiziń":"Telefon raqamini to'liq kiriting","Telefon nomerin tolıq kiritiń":"Telefon raqamini to'liq kiriting","Telefon nomerińizdi kiritiń — oǵan tastıyıqlaw kodı SMS arqalı jiberiledi":"Telefon raqamingizni kiriting — unga tasdiqlash kodi SMS orqali yuboriladi","Televidenie":"Televideniye","Tez qosıw":"Tez qo'shish","Tez qosıw shablonları":"Tez qo'shish shablonlari","Teńge":"Tenge","Tiklew":"Tiklash","Tiklew: saqlanǵan tekstti bul jerge qoyıń":"Tiklash: saqlangan matnni shu yerga qo'ying","Til":"Til","Tiykarǵı etiw":"Asosiy qilish","Tiykarǵı maqset":"Asosiy maqsad","Tolıǵıraq":"Batafsil","Transport":"Transport","Transport kartası":"Transport kartasi","Turaq jay":"Uy-joy","Turaqlı tólem":"Doimiy to'lov","Turaqlı tólemler":"Doimiy to'lovlar","Turaqlı tólemler joq":"Doimiy to'lovlar yo'q","Turmıs":"Turmush","Turmıs tárzi":"Turmush tarzi","Tuwılǵan kún sawǵası":"Tug'ilgan kun sovg'asi","Tuwılǵan sáne":"Tug'ilgan sana","Tuwılǵan sáneni saylań":"Tug'ilgan sanani tanlang","Tábiyiy gaz":"Tabiiy gaz","Táriyp":"Tavsif","Tártibin ózgertiw ushın ≡ belgisin súyreń":"Tartibini o'zgartirish uchun ≡ belgisini suring","Tóledim":"To'ladim","Tólem bar":"To'lov bor","Tólem jazıldı":"To'lov yozildi","Tólem kalendarı":"To'lov kalendari","Tólem qosıw":"To'lov qo'shish","Tólem ámelge asırıldı":"To'lov amalga oshirildi","Tólemdi belgilew":"To'lovni belgilash","Tólemler hám qurallar":"To'lovlar va vositalar","Tólemler tarixı":"To'lovlar tarixi","Tólendi":"To'landi","Tólenetuǵın baha":"To'lanadigan narx","Tólengen":"To'langan","Tólew":"To'lash","Tólew múddeti":"To'lov muddati","Tólew ushın súyreń":"To'lash uchun suring","Tólew usılı":"To'lov usuli","Túri":"Turi","Túrk lirası":"Turk lirasi","Túsetuǵın balans":"Tushadigan balans","Túslik":"Tushlik","Túsinbedim. Mısallar:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «keshe bazar 180 000 naq»\n• «bul ay qansha jumsadım?»\n• «keńes ber»":"Tushunmadim. Misollar:\n• «taksi 25 ming»\n• «oylik 6,5 mln keldi»\n• «kecha bozor 180 000 naqd»\n• «bu oy qancha sarfladim?»\n• «maslahat ber»","Túymeler basılǵanda sulıw dawıslar":"Tugmalar bosilganda chiroyli ovozlar","Ulıwma":"Umumiy","Ulıwma balans":"Umumiy balans","Universitet kontraktı":"Universitet kontrakti","Usı ay":"Shu oy","Usı balanstan aylıq shıǵım shegarası":"Shu balansdan oylik chiqim chegarasi","Valyuta":"Valyuta","Valyuta almastırıldı":"Valyuta almashtirildi","Valyuta almastırıw":"Valyuta almashtirish","Valyuta almastırıw (obmen)":"Valyuta almashtirish (obmen)","Valyuta ayırbaslaw":"Valyuta ayirboshlash","Valyuta konvertorı":"Valyuta konvertori","Valyuta konvertorı, kredit hám depozit kalkulyatorları, Excel eksport — barlıǵı bir jerde.":"Valyuta konvertori, kredit va depozit kalkulyatorlari, Excel eksport — hammasi bir joyda.","Valyuta kursları":"Valyuta kurslari","Versiya":"Versiya","Vidjet sazlamaları":"Vidjet sozlamalari","Xabarlamalar":"Xabarnomalar","Xaridlar":"Xaridlar","Xosh keldińiz!":"Xush kelibsiz!","Xalq banki":"Xalq banki","Xızmetkerler":"Xodimlar","Xızmetler":"Xizmatlar","Xızmetler bóliminde":"Xizmatlar bo'limida","Xızmetler bólimindegi tólemler haqıyqıy ma?":"Xizmatlar bo'limidagi to'lovlar haqiqiymi?","Xızmetler hám kalkulyatorlar":"Xizmatlar va kalkulyatorlar","Xızmetti izlew":"Xizmatni qidirish","YHXB (GAI) járiymaları":"YHXB (GAI) jarimalari","Yanvar":"Yanvar","aktiv qarız":"faol qarz","aldınǵı":"oldingi","aldınǵı dáwirge salıstırǵanda":"oldingi davrga nisbatan","asıp ketti":"oshib ketdi","ay":"oy","ay orınlandı":"oy bajarildi","aylıq limitten asıp ketti":"oylik limitdan oshib ketdi","ayına":"oyiga","balansı":"balansi","basqa":"boshqa","bugin":"bugun","bugin tólew kerek":"bugun to'lash kerak","búgin":"bugun","dana":"ta","eske salıw jiberiń":"eslatma yuboring","ga qarızıńızdıń múddeti ótti":"ga qarzingiz muddati o'tdi","hamyan":"hamyon","jańa":"yangi","jetispeydi":"yetishmaydi","joq":"yo'q","jumsaldı":"sarflandi","jumsalǵan":"sarflangan","jámi":"jami","jıl":"yil","jıynań":"yig'ing","kategoriya":"kategoriya","keyingi":"keyingi","kirim":"kirim","kirim − shıǵım":"kirim − chiqim","komissiya":"komissiya","kún":"kun","kún aldın ótti":"kun oldin o'tdi","kún keshikti":"kun kechikdi","kún qaldı":"kun qoldi","kún ótti":"kun o'tdi","kúni alǵan qarızıńızdı eske salaman":"kuni olgan qarzingizni eslataman","kúnnen keyin":"kundan keyin","kútilmekte...":"kutilmoqda...","limit":"limit","limit asıldı":"limit oshdi","limittiń":"limitning","maqset":"maqsad","maqsetke qosıldı":"maqsadga qo'shildi","maǵan qaytaradı":"menga qaytaradi","men qaytaraman":"men qaytaraman","mln":"mln","mlrd":"mlrd","muǵdarı":"summasi","múddeti ótti":"muddati o'tdi","múddetsiz":"muddatsiz","mıń":"ming","nomeri tastıyıqlandı. Endi jańa parol oylap tabıń.":"raqami tasdiqlandi. Endi yangi parol o'ylab toping.","nomerine 5 xanalı tastıyıqlaw kodı jiberildi":"raqamiga 5 xonali tasdiqlash kodi yuborildi","operaciya":"tranzaksiya","operaciya joq":"tranzaksiya yo'q","provayder":"provayder","qaldı":"qoldi","qarız":"qarz","qarızdı qaytarıw múddeti":"qarzni qaytarish muddati","qarızdı tólew múddeti":"qarzni to'lash muddati","qarızınıń múddeti ótti":"qarzining muddati o'tdi","shıǵım":"chiqim","shıǵım, keshegi kúnge salıstırǵanda":"chiqim, kechagi kunga nisbatan","shıǵım, ótken ayǵa salıstırǵanda":"chiqim, o'tgan oyga nisbatan","swm":"so'm","sáne":"sana","tólem":"to'lov","tólendi":"to'landi","«+» túymesi menen jańa balans ashıń: naqd pul, plastik karta yamasa dollar, rubl, teńge. Kartanı basıp tursańız — ótkeriw, obmen hám redaktorlaw.":"«+» tugmasi bilan yangi balans oching: naqd pul, plastik karta yoki dollar, rubl, tenge. Kartani bosib tursangiz — o'tkazish, obmen va tahrirlash.","Ájayıp":"Ajoyib","Ákesiniń atı":"Otasining ismi","Ármanıńızǵa qádem-qádem":"Orzuingizga qadam-baqadam","Ármanıńızǵa shiyshe kopilka ashıń: summa hám múddet qoyıń, hár ay qansha salıw kerekligin E-esap ózi esaplaydı.":"Orzuingiz uchun shisha kopilka oching: summa va muddat qo'ying, har oy qancha solish kerakligini E-esap o'zi hisoblaydi.","Ónim yamasa xızmetińiz haqqında qısqasha":"Mahsulot yoki xizmatingiz haqida qisqacha","Óshirilgen":"O'chirilgan","Óshiriw":"O'chirish","Ótkerildi":"O'tkazildi","Ótkerip jiberiw":"O'tkazib yuborish","Ótkeriw":"O'tkazish","Ótkeriw ushın jáne bir balans kerek":"O'tkazish uchun yana bitta balans kerak","Ótkizip jiberiw":"O'tkazib yuborish","Ózińizge qolaylı tildi saylań: qaraqalpaqsha, ózbekshe, qazaqsha, ruscha yamasa inglisshe.":"O'zingizga qulay tilni tanlang: qoraqalpoqcha, o'zbekcha, qozoqcha, ruscha yoki inglizcha.","Úlken jazıw hám anıq tuymeler":"Katta yozuv va aniq tugmalar","Úlkenler ushın rejim":"Keksalar uchun rejim","Úlkenler ushın rejim ne?":"Keksalar uchun rejim nima?","Únemlendi":"Tejaldi","Únemleysiz":"Tejaysiz","Úskeneler":"Uskunalar","Úy buyımları":"Uy buyumlari","Úy-jay hám kommunal":"Uy-joy va kommunal","Úy-jay qárejetleri":"Uy-joy xarajatlari","ǵa shekem qaytaraman. Raxmet!":"gacha qaytaraman. Rahmat!","5 xanalı kodtı kiritiń":"5 xonali kodni kiriting","Aldınǵı kún":"Oldingi kun","Arza qabıl etildi":"Ariza qabul qilindi","Arza qaldırıw":"Ariza qoldirish","Ay juwmaǵı bonusı":"Oy yakuni bonusi","Dawıs":"Ovoz","1. Eń kóp shıǵım — «Kiyim-keshek» (29%). Onı 15% qısqartsańız, ayına 45 mıń swm únemleysiz.":"1. Eng ko'p chiqim — «Kiyim-kechak» (29%). Uni 15% qisqartsangiz, oyiga 45 ming so'm tejaysiz.","2. Ájayıp! Kirimińizdiń 48% ın saqlap atırsız.":"2. Ajoyib! Kirimingizning 48% ini saqlayapsiz.","4. 24 saat qaǵıydası: kútilmegen úlken satıp alıwdı bir kúnge keyinge qaldırıń.":"4. 24 soat qoidasi: kutilmagan katta xaridni bir kunga keyinga qoldiring.","Gúlnara":"Gulnora","Humans":"Humans","Aurora stili hám widgetler":"Aurora uslubi va vidjetlar","Aurora stilin qosıw":"Aurora uslubini yoqish","BUSINESS statusı":"BUSINESS statusi","BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.":"BUSINESS statusi, cheksiz AI, Biznes paneli va Aurora uslubi — hammasi bitta tarifda.","MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.":"MAX imkoniyatlari, Aurora uslubi va BUSINESS statusi o'chiriladi. To'langan summa qaytarilmaydi.","Tildi saylań":"Tilni tanlang","Akkaunttı óshiriw":"Akkauntni o'chirish","Akkauntıńız hám ondaǵı barlıq maǵlıwmatlar (balanslar, operaciyalar, maqsetler, qarızlar) biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Akkauntingiz va undagi barcha ma'lumotlar (balanslar, tranzaksiyalar, maqsadlar, qarzlar) butunlay o'chiriladi. Buni qaytarib bo'lmaydi.","Anıq pa?":"Aniqmi?","Bul sońǵı eskertiw. Akkaunt hám barlıq maǵlıwmatlar qayta tiklenbeydi.":"Bu oxirgi ogohlantirish. Akkaunt va barcha ma'lumotlar qayta tiklanmaydi.","Biraqola óshiriw":"Butunlay o'chirish","Balans, maqset, qarız, AI kómekshi hám statistika — bárin qısqa sayaxatta birge úyrenip shıǵayıq. Qádem-qádem kórsetemen ✨":"Balans, maqsad, qarz, AI yordamchi va statistika — barchasini qisqa sayohatda birga o'rganib chiqaylik. Qadamma-qadam ko'rsataman ✨","Úyrenip shıǵıw":"O'rganib chiqish","Erteń":"Ertaga","Ay qaldı":"Oy qoldi","AKKAUNT":"AKKAUNT","Kirilgen nomer":"Kirilgan raqam","Maǵlıwmatlar saqlanadı":"Ma'lumotlar saqlanadi","Barlıq maǵlıwmatlar biraqola óshiriledi":"Barcha ma'lumotlar butunlay o'chiriladi","Qosımsha maǵan unamadı":"Ilova menga yoqmadi","Kerekli múmkinshilik jetispeydi":"Kerakli imkoniyat yetishmaydi","Basqa qosımshaǵa ótemen":"Boshqa ilovaga o'taman","Jańa akkaunt ashıwım kerek":"Yangi akkaunt ochishim kerak","Basqa sebep":"Boshqa sabab","Ketiwińizge ókinemiz 😔 Iltimas, sebebin aytıń — bul E-esap tı jaqsılawǵa járdem beredi.":"Ketishingizdan afsusdamiz 😔 Iltimos, sababini ayting — bu E-esap ni yaxshilashga yordam beradi.","Sebebin jazıń...":"Sababini yozing...","Barlıq balanslar, operaciyalar, maqsetler hám qarızlar biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Barcha balanslar, tranzaksiyalar, maqsadlar va qarzlar butunlay o'chiriladi. Buni qaytarib bo'lmaydi.","Qosımsha boyınsha sorawlarǵa juwap":"Ilova bo'yicha savollarga javob","24/7 kómek":"24/7 yordam","Qalay járdem bere alaman?":"Qanday yordam bera olaman?","E-esap qalay isleytuǵını, qaysı bólim ne ushın ekeni — qálegen sorawıńızdı beriń. Tómendegi temalardan da saylawıńızǵa boladı 👇":"E-esap qanday ishlashi, qaysi bo'lim nima uchun ekani — istalgan savolingizni bering. Quyidagi mavzulardan ham tanlashingiz mumkin 👇","Sorawıńızdı jazıń...":"Savolingizni yozing...","Operaciyanı qalay qosaman?":"Tranzaksiyani qanday qo'shaman?","Balans hám kartalar":"Balans va kartalar","Qarız jazıw":"Qarz yozish","AI chat qalay isleydi?":"AI chat qanday ishlaydi?","Limit qoyıw":"Limit qo'yish","Tildi ózgertiw":"Tilni o'zgartirish","Paroldi umıttım":"Parolni unutdim","Maǵlıwmatlarım qayerde?":"Ma'lumotlarim qayerda?","Operaciya qosıw":"Tranzaksiya qo'shish","AI chattı ashıw":"AI chatni ochish","Statistikaǵa ótiw":"Statistikaga o'tish","Til saylaw":"Til tanlash","trln":"trln","Maqsetti redaktorlaw":"Maqsadni tahrirlash","Qarızdı redaktorlaw":"Qarzni tahrirlash","Jıynalǵan summa":"Yig'ilgan summa","Ózgertiw":"O'zgartirish"},"kk":{"1 ay":"1 ай","1 hápte":"1 апта","3 ay":"3 ай","30 kún":"30 күн","5 ke shekem":"5-ке дейін","AI ay esabatı":"AI айлық есебі","AI ay esabatı hám qarjı balı":"AI айлық есебі және қаржы балы","AI eske salıw xatı":"AI еске салу хаты","AI eslep qaldı":"AI есте сақтады","AI keńesi":"AI кеңесі","AI keńesleri":"AI кеңестері","AI kómekshi":"AI көмекші","AI kómekshi qalay isleydi?":"AI көмекші қалай жұмыс істейді?","AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.":"AI түймесін басып, «такси 25 мың» деп жазып көріңіз.","AI tuymesin basıń hám ápiwayı tilde jazıń: «taksi 25 mıń», «aylıq 6 mln keldi», «keshe bazarǵa 180 000». AI muǵdardı, kategoriyanı hám túrin ózi anıqlaydı. Sonday-aq «bul ay qansha jumsadım?» dep sorawıńız múmkin.":"AI түймесін басып, қарапайым тілде жазыңыз: «такси 25 мың», «жалақы 6 млн келді», «кеше базарға 180 000». AI соманы, санатты және түрін өзі анықтайды. «Бұл айда қанша жұмсадым?» деп сұрауға да болады.","AI usınısı":"AI ұсынысы","AI ǵa ádettegi tilde jazıń yamasa aytıń: ol summa, kategoriya hám sáneni ózi anıqlaydı.":"AI-ға қарапайым тілде жазыңыз не айтыңыз: ол соманы, санатты және күнді өзі анықтайды.","AQSH dolları":"АҚШ доллары","Abonent":"Абонент","Adam atı":"Адам аты","Adamlar sanı":"Адамдар саны","Adamǵa qarız haqqında SMS jiberiw":"Адамға қарыз туралы SMS жіберу","Akkaunttan shıǵıw":"Аккаунттан шығу","Akkauntıńız bar ma?":"Аккаунтыңыз бар ма?","Akkauntıńız joq pa?":"Аккаунтыңыз жоқ па?","Akkauntıńızǵa kiriń":"Аккаунтыңызға кіріңіз","Aksessuar hám zergerlik":"Аксессуар және зергерлік","Aktiv qarız joq":"Белсенді қарыз жоқ","Aktiv qarız joq. Esap teń!":"Белсенді қарыз жоқ. Есеп тең!","Aktiv qarız joq. Qarjıńız tınısh!":"Белсенді қарыз жоқ. Қаржыңыз тыныш!","Aldın Profil → Hamyanlar bóliminde hamyan qosıń.":"Алдымен Профиль → Әмияндар бөлімінде әмиян қосыңыз.","Aldın hamyan qosıń":"Алдымен әмиян қосыңыз","Aldınǵı dáwir boyınsha maǵlıwmat joq":"Алдыңғы кезең бойынша дерек жоқ","Almastırıldı":"Айырбасталды","Almastırıw":"Айырбастау","Alınadı":"Алынады","Alınǵan":"Алынған","Alınǵanda":"Алынғанда","Alıs-berisler":"Алыс-берістер","Alıw":"Алу","Analiz":"Талдау","Anıqlanbaǵan":"Анықталмаған","Aprel":"Сәуір","Aqsha salıw":"Ақша салу","Aqıllı byudjet (AI limitler)":"Ақылды бюджет (AI лимиттер)","Aqıllı byudjet: AI limitlerdi usınadı":"Ақылды бюджет: AI лимиттерді ұсынады","Artıq tólem":"Артық төлем","Arza jiberiw":"Өтінім жіберу","Arza nomeri":"Өтінім нөмірі","Arzanı jiberiń, biz siz benen 24 saat ishinde baylanısamız.":"Өтінімді жіберіңіз, біз сізбен 24 сағат ішінде хабарласамыз.","Arzımaydı! Jáne ne járdem kerek?":"Оқасы жоқ! Тағы не көмек керек?","Ataw hám reńin ózgertiw":"Атауы мен түсін өзгерту","Atı":"Аты","Atı hám summanı kirgiziń":"Атауы мен соманы енгізіңіз","Atı, familiyası, telefon hám súwret":"Аты, тегі, телефон және сурет","Atın jazıń":"Атауын жазыңыз","Atın kirgiziń":"Атауын енгізіңіз","Atıńızdı kirgiziń":"Атыңызды енгізіңіз","Atıńızdı kiritiń":"Атыңызды енгізіңіз","Avgust":"Тамыз","Avto sheship alıw":"Авто есептен шығару","Avtomat":"Автомат","Awdarma":"Аударым","Awdarma ushın keminde eki hamyan kerek":"Аударым үшін кемінде екі әмиян керек","Awqat jetkeriw":"Тамақ жеткізу","Ay":"Ай","Ay aqırına prognoz":"Ай соңына болжам","Ay kúni (1–28)":"Ай күні (1–28)","Aylıq":"Жалақы","Aylıq %":"Айлық %","Aylıq 6,5 mln keldi":"Жалақы 6,5 млн келді","Aylıq hám avans":"Жалақы және аванс","Aylıq limitler":"Айлық лимиттер","Aylıq procent":"Айлық пайыз","Aylıq tólem":"Айлық төлем","Aylıq ulıwma byudjet":"Айлық жалпы бюджет","Aymaqlıq elektr tarmaqları":"Аймақтық электр желілері","Aytıń — E-esap ózi jazadı":"Айтыңыз — E-esap өзі жазады","Ayına":"Айына","Ayına jıynaw kerek":"Айына жинау керек","Az":"Аз","Azıq-awqat":"Азық-түлік","BASQA":"БАСҚА","Baha":"Баға","Bala-baqsha":"Балабақша","Balalar":"Балалар","Balalar baqshası":"Балабақша","Balans":"Баланс","Balans esabatları":"Баланс есептері","Balans esabatların kóriw":"Баланс есептерін көру","Balans qosıldı":"Баланс қосылды","Balans qosıw":"Баланс қосу","Balans saqlandı":"Баланс сақталды","Balans óshirildi":"Баланс жойылды","Balanslar halatı":"Баланстар жағдайы","Balanslar hár qıylı bolıwı kerek":"Баланстар әртүрлі болуы керек","Balansta jetkilikli qarjı joq":"Баланста қаражат жеткіліксіз","Balanstan balansqa ótkeriw":"Баланстан балансқа аудару","Balanstı jasırıw":"Балансты жасыру","Balanstı redaktorlaw":"Балансты өңдеу","Balanstı óshiriw":"Балансты жою","Balanstı ózgertiw":"Балансты өзгерту","Balansım qansha?":"Балансым қанша?","Balansıńız barlıq qarızlardı jabıwǵa jetedi":"Балансыңыз барлық қарызды жабуға жетеді","Baner":"Баннер","Bank, karta, naqd pul hám valyuta — barlıq balanslarıńız bir jerde, bir túymede.":"Банк, карта, қолма-қол ақша және валюта — барлық баланстарыңыз бір жерде.","Barlıq balanslarıńızdıń jıyındısı: naqd pul + kartalar + valyuta. Kóz belgisi menen summanı jasırıwǵa boladı.":"Барлық баланстарыңыздың қосындысы: қолма-қол + карталар + валюта. Көз белгісімен соманы жасыруға болады.","Barlıq hamyanlar":"Барлық әмияндар","Barlıq kategoriyalar":"Барлық санаттар","Barlıq kirim-shıǵım jazıwları, maqset hám qarızlar óshiriledi. Hamyan balansları 0 ge túsedi.":"Барлық кіріс-шығыс жазбалары, мақсаттар мен қарыздар жойылады. Әмиян баланстары 0-ге түседі.","Barlıq maydanlardı toltırıń":"Барлық өрістерді толтырыңыз","Barlıq maǵlıwmatlar tek sizdiń qurılmańızda saqlanadı. Rezerv nusqa ushın Profil → Maǵlıwmatlar bólimin paydalanıń.":"Барлық деректер тек құрылғыңызда сақталады. Резервтік көшірме үшін Профиль → Деректер бөлімін пайдаланыңыз.","Barlıq maǵlıwmattı saqlaw yamasa tiklew":"Барлық деректі сақтау не қалпына келтіру","Barlıq operaciyalar":"Барлық операциялар","Barlıq qarızdı uaqtında qaytarıw ushın kúnine":"Барлық қарызды уақытында қайтару үшін күніне","Barlıq qarızlar":"Барлық қарыздар","Barlıq qarızlar tártipte. Múddetler jaqınlasqanda eskertemen.":"Барлық қарыздар ретті. Мерзім жақындағанда ескертемін.","Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.":"Барлық баптаулар мен деректер жойылады.","Barlıq tólemler bir kalendarda":"Барлық төлемдер бір күнтізбеде","Barlıǵı":"Барлығы","Barlıǵın kórsetiw":"Барлығын көрсету","Bas bet":"Басты бет","Baslanǵısh halına qaytarıw":"Бастапқы күйге қайтару","Baslanǵısh summa":"Бастапқы сома","Baslanǵısh tártip":"Бастапқы тәртіп","Baslaw":"Бастау","Basqa":"Басқа","Basqa dáramatlar":"Басқа табыстар","Basqa járiymalar":"Басқа айыппұлдар","Basqa kirim":"Басқа кіріс","Basqa maqsetler":"Басқа мақсаттар","Basqa qarızlar":"Басқа қарыздар","Basqa qárejetler":"Басқа шығындар","Basqalar":"Басқалар","Basqarıw":"Басқару","Baylanıs":"Байланыс","Baylanıs adamı":"Байланыс адамы","Baylanıs hám media":"Байланыс және медиа","Bazar 180 000 naq":"Базар 180 000 қолма-қол","Bazar hám dúkan":"Базар және дүкен","Belgi":"Белгі","Berilgen":"Берілген","Beriw":"Беру","Bilim":"Білім","Bilim hám baylanıs":"Білім және байланыс","Biykar etildi":"Бас тартылды","Biykarlandı":"Болдырылмады","Biykarlaw":"Болдырмау","Biznes":"Бизнес","Biznes basqa":"Бизнес басқа","Biznes dáramatları":"Бизнес табыстары","Biznes hám jumıs":"Бизнес және жұмыс","Biznes hám tolıq qadaǵalaw ushın":"Бизнес және толық бақылау үшін","Biznes paneli":"Бизнес панелі","Biznes paneli hám hisob-fakturalar":"Бизнес панелі және шот-фактуралар","Biznesińizdi E-esap paydalanıwshılarına kórsetiń":"Бизнесіңізді E-esap пайдаланушыларына көрсетіңіз","Bonus":"Бонус","Bos":"Бос","Bugin":"Бүгін","Bugin ele operaciya joq":"Бүгін әлі операция жоқ","Bugingi operaciyalar":"Бүгінгі операциялар","Bul aralıqta maǵlıwmat joq":"Бұл аралықта дерек жоқ","Bul ay ele shıǵım joq.":"Бұл айда әлі шығыс жоқ.","Bul ay jumsaldı":"Бұл айда жұмсалды","Bul ay limit":"Бұл айғы лимит","Bul ay qansha jumsadım?":"Бұл айда қанша жұмсадым?","Bul ay sap payda":"Бұл айғы таза пайда","Bul ay xızmetlerge":"Бұл айда қызметтерге","Bul brauzerde kontaktlar ashılmaydı":"Бұл браузерде контактілер ашылмайды","Bul bólimde qarız joq":"Бұл бөлімде қарыз жоқ","Bul dáwirde maǵlıwmat joq":"Бұл кезеңде дерек жоқ","Bul hamyanda qarjı jetkiliksiz. Basqa hamyandı saylań.":"Бұл әмиянда қаражат жеткіліксіз. Басқа әмиянды таңдаңыз.","Bul jerde sizdiń biznesińiz turıwı múmkin. Arza qaldırıń — biz siz benen baylanısamız.":"Мұнда сіздің бизнесіңіз тұруы мүмкін. Өтінім қалдырыңыз — біз хабарласамыз.","Bul kategoriyadaǵı operaciyalar «Basqa» ǵa ótedi.":"Бұл санаттағы операциялар «Басқа»-ға ауысады.","Bul kúni operaciya joq":"Бұл күні операция жоқ","Bul kúni tólem joq":"Бұл күні төлем жоқ","Bul maqset óshiriledi.":"Бұл мақсат жойылады.","Bul nomer aldın dizimnen ótken — Kiriw bólimine ótiń":"Бұл нөмір бұрын тіркелген — Кіру бөліміне өтіңіз","Bul nomer dizimnen ótpegen":"Бұл нөмір тіркелмеген","Bul operaciya biykarlanadı. Keyin qaytarıwǵa boladı.":"Бұл операция болдырылмайды. Кейін қайтаруға болады.","Bul operaciya biykarlandı":"Бұл операция болдырылмады","Bul operaciyanı óshiriwdi qáleysiz be?":"Бұл операцияны жойғыңыз келе ме?","Bul rejimde jazıwlar úlkenirek, tuymeler anıǵıraq hám navigaciyada barlıq atamalar kórinedi.":"Бұл режимде жазулар үлкенірек, түймелер анығырақ және навигацияда барлық атаулар көрінеді.","Buyırtpa ushın":"Тапсырыс үшін","Byudjet":"Бюджет","Byudjet hám limitler":"Бюджет және лимиттер","Byudjet jaǵdayı":"Бюджет жағдайы","Byudjet ornatılmaǵan":"Бюджет орнатылмаған","Byudjet ornatılmaǵan. Profil → Byudjet hám limitler bóliminde ornatıń.":"Бюджет орнатылмаған. Профиль → Бюджет және лимиттер бөлімінде орнатыңыз.","Byudjet tawsıldı":"Бюджет таусылды","Byudjetten asıp kettińiz.":"Бюджеттен асып кеттіңіз.","Bólip":"Бөліп","Bólip tólew":"Бөліп төлеу","Búgin":"Бүгін","Búgin qaldı":"Бүгін қалды","Búgingi AI limiti tawsıldı. MAX ta — sheksiz.":"Бүгінгі AI лимиті таусылды. MAX-та — шексіз.","Click, Payme yamasa karta arqalı":"Click, Payme не карта арқылы","Dawam etiw":"Жалғастыру","Dawıs effektleri":"Дыбыс эффектілері","Dawıs effektleri qosıldı":"Дыбыс эффектілері қосылды","Dawıs effektleri óshirildi":"Дыбыс эффектілері өшірілді","Dekabr":"Желтоқсан","Demo kurs":"Демо бағам","Demo maǵlıwmatlar menen qayta baslaw":"Демо деректермен қайта бастау","Demo rejim: summa hamyannan shıǵım retinde jazıladı":"Демо режим: сома әмияннан шығыс ретінде жазылады","Demo rejim: tólem kirim-shıǵım esabına jazıladı":"Демо режим: төлем кіріс-шығыс есебіне жазылады","Demo tólem":"Демо төлем","Densawlıq":"Денсаулық","Densawlıq hám kútim":"Денсаулық және күтім","Depozit kalkulyatorı":"Депозит калькуляторы","Dinamika":"Динамика","Dizimnen ótiw":"Тіркелу","Dizimnen óttińiz!":"Тіркелдіңіз!","Dollar":"Доллар","Dáramatlar":"Табыстар","Dári-dármaq":"Дәрі-дәрмек","Dárixana":"Дәріхана","Dáwirdi saylań":"Кезеңді таңдаңыз","Dıqqat kerek":"Назар керек","Dú":"Дс","Dúkan":"Дүкен","Dúysenbi":"Дүйсенбі","Dúyshembi":"Дүйсенбі","E-esap AI chat":"E-esap AI чат","E-esap gruppaları":"E-esap топтары","E-esap penen tanısayıq!":"E-esap-пен танысайық!","E-esap sizge unadı ma?":"E-esap сізге ұнады ма?","E-esap ǵa xosh keldińiz!":"E-esap-қа қош келдіңіз!","E-esap — operaciyalar esabatı":"E-esap — операциялар есебі","E-esap — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.":"E-esap — кіріс-шығысты есептеу қосымшасы. Ол күнделікті қаржыны жазып отыруға, бюджет құруға, жинақ мақсаттарына жетуге және AI көмекші арқылы қарапайым тілде операция қосуға көмектеседі.","Ek":"Жс","Ekshembi":"Жексенбі","Eksport, rezerv nusqa, tazalaw":"Экспорт, резервтік көшірме, тазалау","Ele esabatlar joq. Tómendegi + túymesin basıp birinshisin qosıń":"Әзірге есептер жоқ. Төмендегі + түймесін басып біріншісін қосыңыз","Ele jinaq maqsetińiz joq. Profil → Jinaq maqsetleri.":"Әзірге жинақ мақсатыңыз жоқ. Профиль → Жинақ мақсаттары.","Ele maqset joq":"Әзірге мақсат жоқ","Ele maqset joq. Ármanıńız ushın jinawdı baslań!":"Әзірге мақсат жоқ. Арманыңыз үшін жинауды бастаңыз!","Ele maqset joq. Ármanıńız ushın shiyshe kopilka ashıń!":"Әзірге мақсат жоқ. Арманыңыз үшін шыны қорапша ашыңыз!","Ele operaciya joq":"Әзірге операция жоқ","Ele tólem joq":"Әзірге төлем жоқ","Elektr energiyası":"Электр энергиясы","Elektronika hám texnika":"Электроника және техника","Emoji":"Эмодзи","Energiya únemlew":"Энергия үнемдеу","Esabat":"Есеп","Esap nomerin tolıq kirgiziń":"Есеп нөмірін толық енгізіңіз","Esap teń":"Есеп тең","Esaptı bólisiw":"Есепті бөлісу","Eske salıw":"Еске салу","Eskertpe":"Ескертпе","Evro":"Еуро","Excel eksport":"Excel экспорт","Excel esabatı (.xlsx)":"Excel есебі (.xlsx)","Excel esabatı júklendi":"Excel есебі жүктелді","Eń az muǵdar — 1 000 swm":"Ең аз сома — 1 000 сум","Eń kóp qayda jumsadım?":"Ең көп қайда жұмсадым?","Eń kóp shıǵımlar":"Ең көп шығыстар","Eń qımbat kún":"Ең қымбат күн","Eń shuǵıl qarız":"Ең шұғыл қарыз","Familiyası":"Тегі","Familiyańızdı kiritiń":"Тегіңізді енгізіңіз","Fayl":"Файл","Fevral":"Ақпан","Finans hám minnetlemeler":"Қаржы және міндеттемелер","Finans operaciyaları":"Қаржы операциялары","Funt sterling":"Фунт стерлинг","Gruppa":"Топ","Gruppa atı":"Топ атауы","Gruppa óshiriledi, kategoriyalar «Jeke kategoriyalar» ǵa ótedi.":"Топ жойылады, санаттар «Жеке санаттар»-ға ауысады.","Gruppanı óshiriw":"Топты жою","Gruppanı ózgertiw":"Топты өзгерту","Hamyan":"Әмиян","Hamyan qosıw":"Әмиян қосу","Hamyan saylań":"Әмиянды таңдаңыз","Hamyanda qarjı jetkiliksiz":"Әмиянда қаражат жеткіліксіз","Hamyandı saylań":"Әмиянды таңдаңыз","Hamyanlar":"Әмияндар","Hamyanlar boyınsha":"Әмияндар бойынша","Hamyanlarım":"Әмияндарым","Hamyannan almaw":"Әмияннан алмау","Hamyannan tólew":"Әмияннан төлеу","Hamyansız":"Әмиянсыз","Haywanlar":"Үй жануарлары","Hesh nárse tabılmadı":"Ештеңе табылмады","Hisob-faktura":"Шот-фактура","Hisob-fakturalar":"Шот-фактуралар","Hobbi":"Хобби","Hududgaz Qaraqalpaqstan":"Hududgaz Қарақалпақстан","Hámme ushın baslanǵısh tarif":"Бәріне арналған бастапқы тариф","Hámmesi":"Барлығы","Hámmesi kózińizdiń aldında":"Бәрі көз алдыңызда","Hámmesin baslanǵısh halına qaytarıw":"Бәрін бастапқы күйге қайтару","Hápte":"Апта","Hápte ritmi":"Апта ырғағы","Hápte sayın":"Апта сайын","Hápte, ay yamasa jıl boyınsha salıstırıń hám kategoriyalarǵa limit qoyıń.":"Апта, ай не жыл бойынша салыстырыңыз және санаттарға лимит қойыңыз.","Hár 30 kúnde tarif hamyannan avtomat jańalanadı":"Әр 30 күн сайын тариф әмияннан автомат жаңарады","Hár adamǵa":"Әр адамға","Hár ayda":"Ай сайын","Hár ayda qosıw":"Ай сайын қосу","Házir bar":"Қазір бар","Házirgi tarifińiz":"Қазіргі тарифіңіз","Házirgi versiyada tólemler demo rejimde isleydi: pul alınbaydı, biraq tólem shıǵım retinde esapqa jazıladı.":"Қазіргі нұсқада төлемдер демо режимде жұмыс істейді: ақша алынбайды, бірақ төлем шығыс ретінде есепке жазылады.","Házirgi waqıtta qansha qarjıńız bar?":"Қазір қанша қаражатыңыз бар?","Iconlar":"Белгішелер","Ijara dáramatları":"Жалдау табыстары","Ijara haqı":"Жалдау ақысы","Ikonka":"Белгіше","Internet":"Интернет","Investiciya":"Инвестиция","Ipoteka bank":"Ипотека банк","Ishimlik suw":"Ауыз су","Ishimlikler":"Сусындар","Iyul":"Шілде","Iyun":"Маусым","Izlew":"Іздеу","Izlew: kategoriya, eskertpe, muǵdar":"Іздеу: санат, ескертпе, сома","Izoh":"Түсініктеме","Izoh jazıń":"Түсініктеме жазыңыз","JPG yamasa PNG. Súwret qurılmańızda saqlanadı.":"JPG не PNG. Сурет құрылғыңызда сақталады.","Jabıldı":"Жабылды","Jabıw":"Жабу","Janılǵı hám gaz":"Жанармай және газ","Jaqsı":"Жақсы","Jaqtı":"Жарық","Jaqın tólemler":"Жақын төлемдер","Jaratılǵan sáne":"Құрылған күні","Jaratıw":"Құру","Jaratıwshı":"Жасаушы","Jazılıwlar":"Жазылымдар","Jazıń: taksi 25 mıń...":"Жазыңыз: такси 25 мың...","Jańa":"Жаңа","Jańa PIN-kod":"Жаңа PIN-код","Jańa akkaunt jaratıń — bir minut waqıt aladı":"Жаңа аккаунт ашыңыз — бір минут уақыт алады","Jańa balans":"Жаңа баланс","Jańa balans ashıladı":"Жаңа баланс ашылады","Jańa gruppa":"Жаңа топ","Jańa hamyan":"Жаңа әмиян","Jańa hisob-faktura":"Жаңа шот-фактура","Jańa kategoriya":"Жаңа санат","Jańa maqset":"Жаңа мақсат","Jańa noutbuk":"Жаңа ноутбук","Jańa operaciya":"Жаңа операция","Jańa parol":"Жаңа құпиясөз","Jańa parol qoyıń":"Жаңа құпиясөз қойыңыз","Jańa paroldi qaytalań":"Жаңа құпиясөзді қайталаңыз","Jańa qarız":"Жаңа қарыз","Jańa turaqlı tólem":"Жаңа тұрақты төлем","Jeke kategoriyalar":"Жеке санаттар","Jeke kútim":"Жеке күтім","Jeke qárejetler":"Жеке шығындар","Jer":"Жер","Jer salıǵı":"Жер салығы","Jinaq":"Жинақ","Jinaq dárejesi":"Жинақ деңгейі","Jinaq kalkulyatorı":"Жинақ калькуляторы","Jinaq maqsetleri":"Жинақ мақсаттары","Jol kira (avtobus)":"Жол ақы (автобус)","Ju":"Жм","Juma":"Жұма","Jumsaldı":"Жұмсалды","Jámi":"Барлығы","Jámi jumsaldı":"Барлығы жұмсалды","Jámi kirim":"Барлық кіріс","Jámi shıǵım":"Барлық шығыс","Jámi summa":"Жалпы сома","Jámi tólem":"Жалпы төлем","Járdem hám sorawlar":"Көмек және сұрақтар","Járiymalar":"Айыппұлдар","Jıl":"Жыл","Jıllıq %":"Жылдық %","Jıllıq procent":"Жылдық пайыз","Jılıw hám ıssı suw":"Жылу және ыстық су","Jılıw támiynatı":"Жылумен жабдықтау","Jıynaq hám investiciya":"Жинақ және инвестиция","Jıynaw":"Жинау","Kafe":"Кафе","Kalendar":"Күнтізбе","Kalkulyator":"Калькулятор","Kalkulyator tuymelerinde + hám − ne ushın?":"Калькулятор түймелеріндегі + және − не үшін?","Karta nomeriniń aqırı (májbúriy emes)":"Карта нөмірінің соңы (міндетті емес)","Kategoriya":"Санат","Kategoriya limitleri":"Санат лимиттері","Kategoriya qosıw":"Санат қосу","Kategoriya saylaw":"Санат таңдау","Kategoriyalar":"Санаттар","Kategoriyalar boyınsha":"Санаттар бойынша","Kategoriyalarıńızdı óz gruppańızǵa jıynań":"Санаттарыңызды өз тобыңызға жинаңыз","Kategoriyanı óshiriw":"Санатты жою","Kategoriyanı ózgertiw":"Санатты өзгерту","Keminde 6 belgi":"Кемінде 6 таңба","Keminde bir balans qalıwı kerek":"Кемінде бір баланс қалуы керек","Keminde bir kategoriya qalıwı kerek":"Кемінде бір санат қалуы керек","Kerekli summa":"Қажетті сома","Keshbek hám qaytım":"Кэшбэк және қайтарым","Keshe":"Кеше","Kewil ashıw":"Ойын-сауық","Kewilli stikerler":"Көңілді стикерлер","Keyingi tólem":"Келесі төлем","Keyinirek":"Кейінірек","Keńes alıw":"Кеңес алу","Keńes ber":"Кеңес бер","Keńes beriw ushın aldın bir neshe operaciya qosıń.":"Кеңес беру үшін алдымен бірнеше операция қосыңыз.","Kim qarızdar?":"Кім қарыздар?","Kimge / kimnen":"Кімге / кімнен","Kimge qarız berdińiz yamasa kimnen aldıńız — bárin jazıń. Qaytarıw múddeti jaqınlasqanda eskertemiz.":"Кімге қарыз бердіңіз не кімнен алдыңыз — бәрін жазыңыз. Қайтару мерзімі жақындағанда ескертеміз.","Kirim":"Кіріс","Kirim hám shıǵım":"Кіріс және шығыс","Kirim qosıldı":"Кіріс қосылды","Kirim summası":"Кіріс сомасы","Kirim-shıǵımıńız endi bir qolda":"Кіріс-шығысыңыз енді бір қолда","Kirimnen artıq jumsaldı":"Кірістен артық жұмсалды","Kiriw":"Кіру","Kiyim-kenshek":"Киім-кешек","Kiyim-keshek":"Киім-кешек","Klient":"Клиент","Klientler":"Клиенттер","Klientler hám hisob-fakturalar":"Клиенттер және шот-фактуралар","Klientlerge hisob-faktura jazıń, tólengende ol avtomat kirimge túsedi.":"Клиенттерге шот-фактура жазыңыз, төленгенде ол автомат кіріске түседі.","Kodtı qayta jiberiw":"Кодты қайта жіберу","Kofe":"Кофе","Komissiya":"Комиссия","Komissiya: 0%":"Комиссия: 0%","Kommunal":"Коммуналдық","Kommunal tólemler":"Коммуналдық төлемдер","Kommunal tólewler":"Коммуналдық төлемдер","Kompaniya hám baylanıs adamın kirgiziń":"Компания мен байланыс адамын енгізіңіз","Kompaniya yamasa brend atı":"Компания не бренд атауы","Kompyuter":"Компьютер","Kopilka toldı":"Қорапша толды","Kopilka toldı!":"Қорапша толды!","Kopilka toldı! Maqsetke jettińiz":"Қорапша толды! Мақсатқа жеттіңіз","Kopilkaǵa aqsha salıw":"Қорапшаға ақша салу","Kóylek":"Көйлек","Kredit hám nasiya":"Кредит және несие","Kredit kalkulyatorı":"Кредит калькуляторы","Kredit muǵdarı":"Кредит сомасы","Kredit tólew":"Кредит төлеу","Kurs":"Бағам","Kurslar demo maqsetinde kórsetilgen, bank kursı menen ayırmashılıǵı bolıwı múmkin":"Бағамдар демо мақсатында көрсетілген, банк бағамынан өзгеше болуы мүмкін","Kurslar jańalanıp atır":"Бағамдар жаңартылуда","KÓRINIS":"КӨРІНІС","Kórinis":"Көрініс","Kórip shıǵılmaqta":"Қаралуда","Kóshirildi":"Көшірілді","Kóshiriw":"Көшіру","Kún / Ay / Jıl":"Күн / Ай / Жыл","Kún qaldı":"Күн қалды","Kúnine":"Күніне","Kúnine 30":"Күніне 30","Kúnler":"Күндер","Kúnler boyınsha esap":"Күндер бойынша есеп","Kúnlik limit":"Күндік лимит","Kútilip atır":"Күтілуде","Kútilip atırǵan esaplar":"Күтілетін есептер","Kútilmegen qárejetler":"Күтпеген шығындар","Limit":"Лимит","Limit ornatılmaǵan":"Лимит орнатылмаған","Limit ornatıw":"Лимит орнату","Limit orınlanıwı":"Лимит орындалуы","Limit summasın kiritiń":"Лимит сомасын енгізіңіз","Limitlerdi sazlaw":"Лимиттерді баптау","Logistika":"Логистика","MAX aktivlestirildi!":"MAX іске қосылды!","MAX satıp alıw":"MAX сатып алу","MAX tarifin biykarlaw":"MAX тарифінен бас тарту","MAX tarifinde ashıladı":"MAX тарифінде ашылады","MB kursı":"ОБ бағамы","Maqset":"Мақсат","Maqset atı":"Мақсат атауы","Maqset hám qarızlar":"Мақсат және қарыздар","Maqset jaratıw":"Мақсат құру","Maqset qosıń":"Мақсат қосыңыз","Maqset qoyıń, shiyshe kopilkaǵa tıyın salıń hám hár ay qansha jıynaw kerekligin biliń.":"Мақсат қойыңыз, шыны қорапшаға тиын салыңыз және ай сайын қанша жинау керегін біліңіз.","Maqsetke jettińiz":"Мақсатқа жеттіңіз","Maqsetke jettińiz!":"Мақсатқа жеттіңіз!","Maqsetke qosıw":"Мақсатқа қосу","Maqsetler":"Мақсаттар","Maqsetlerim":"Мақсаттарым","Maqsetli qárejetler":"Мақсатты шығындар","Maqsetti óshiriw":"Мақсатты жою","Marketing":"Маркетинг","Mart":"Наурыз","Mashina qárejetleri":"Көлік шығындары","May":"Мамыр","Maǵan qaytadı":"Маған қайтады","Maǵan qaytaradı":"Маған қайтарады","Maǵan qaytarılıwı kerek":"Маған қайтарылуы керек","Maǵlıwmat joq":"Дерек жоқ","Maǵlıwmatlar":"Деректер","Maǵlıwmatlar tiklendi":"Деректер қалпына келтірілді","Maǵlıwmatlarım qayerde saqlanadı?":"Деректерім қайда сақталады?","Mektep":"Мектеп","Men E-esap AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.":"Мен E-esap AI. Операцияны қарапайым жазыңыз не қаржыңыз туралы сұрақ қойыңыз.","Men aldım":"Мен алдым","Men berdim":"Мен бердім","Men qaytaraman":"Мен қайтарамын","Men qaytarıwım kerek":"Мен қайтаруым керек","Meniń arzalarım":"Менің өтінімдерім","Meniń gruppalarım":"Менің топтарым","Mikrofon islemedi. Tekst penen jazıń.":"Микрофон істемеді. Мәтінмен жазыңыз.","Miynet dáramatları":"Еңбек табыстары","Mobil baylanıs":"Ұялы байланыс","Muzıka hám kino":"Музыка және кино","Muǵdar":"Сома","Muǵdar hám valyutanı kiritiń":"Сома мен валютаны енгізіңіз","Muǵdardı kirgiziwde esaplaw múmkin: mısalı 12000+8500 — nátiyje avtomat túrde esaplanadı.":"Соманы енгізгенде есептеуге болады: мысалы 12000+8500 — нәтиже автомат есептеледі.","Muǵdardı kirgiziń":"Соманы енгізіңіз","Mámleket":"Мемлекет","Mámleket tólewleri":"Мемлекеттік төлемдер","Múddet aqırında":"Мерзім соңында","Múddeti":"Мерзімі","Múddeti (ay)":"Мерзімі (ай)","Múddetsiz":"Мерзімсіз","Múlk salıǵı":"Мүлік салығы","Mısalı":"Мысалы","Mısalı: Aral Market":"Мысалы: Aral Market","Mısalı: Azamat":"Мысалы: Азамат","Mısalı: Balalar":"Мысалы: Балалар","Mısalı: Damir":"Мысалы: Дамир","Mısalı: Darmenbaevich":"Мысалы: Дарменбаевич","Mısalı: Internet":"Мысалы: Интернет","Mısalı: Mashina":"Мысалы: Көлік","Mısalı: Qonarbaev":"Мысалы: Қонарбаев","Mısalı: Uzcard":"Мысалы: Uzcard","Mısalı: bazar":"Мысалы: базар","Naq aqsha / basqa":"Қолма-қол / басқа","Naqd pul":"Қолма-қол ақша","Nan hám sút":"Нан және сүт","Neden":"Неден","Nege":"Неге","Neshe ayda":"Неше айда","Noy":"Қар","Noyabr":"Қараша","Nusqalandı":"Көшірілді","Nusqalaw":"Көшіру","Nátiyje":"Нәтиже","Ofis":"Кеңсе","Oktyabr":"Қазан","Onlayn":"Онлайн","Onlayn xaridlar":"Онлайн сатып алулар","Operaciya jazıw":"Операция жазу","Operaciya qaytarıldı":"Операция қайтарылды","Operaciya óshirildi":"Операция жойылды","Operaciyalardı qosıń — men olardı analiz qılıp, keńes beremen.":"Операцияларды қосыңыз — мен оларды талдап, кеңес беремін.","Operaciyalardı tazalaw":"Операцияларды тазалау","Operaciyanı biykarlaw":"Операцияны болдырмау","Operaciyanı ózgertiw":"Операцияны өзгерту","Operator tabılmadı":"Оператор табылмады","Oqıw hám rawajlanıw":"Оқу және даму","Oqıw tólemi":"Оқу ақысы","Ornatılmaǵan":"Орнатылмаған","Ortadaǵı túyme — AI kómekshi. «Keshe 50 mıń taksi» dep jazıń yamasa aytıń, ol operaciyanı ózi qosadı hám keńes beredi.":"Ортадағы түйме — AI көмекші. «Кеше 50 мың такси» деп жазыңыз не айтыңыз, ол операцияны өзі қосып, кеңес береді.","Ortasha":"Орташа","Ortasha kúnlik":"Орташа күндік","Ortashadan kóp":"Орташадан көп","Oyın":"Ойын","Oyın-kúlki":"Ойын-күлкі","Oyınlar hám servisler":"Ойындар және сервистер","Oyınshıqlar":"Ойыншықтар","PIN-kod":"PIN-код","PIN-kodlar sáykes kelmedi":"PIN-кодтар сәйкес келмеді","PIN-kodtı kirgiziń":"PIN-кодты енгізіңіз","PIN-kodtı qaytalań":"PIN-кодты қайталаңыз","PIN-kodtı tiklew ushın: Profil → Maǵlıwmatlar → baslanǵısh halına qaytarıw. Házir ápiwayı jol: brauzer maǵlıwmatların tazalań.":"PIN-кодты қалпына келтіру: Профиль → Деректер → бастапқы күйге қайтару. Қазір қарапайым жол: браузер деректерін тазалаңыз.","PIN-kodtı umıttım":"PIN-кодты ұмыттым","PIN-kodtı óshiriwdi qáleysiz be?":"PIN-кодты өшіргіңіз келе ме?","PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz":"PRO тарифте 5 әмиянға дейін, MAX-та шексіз","PRO ǵa ótiw":"PRO-ға өту","PROGRAMMA STILI":"БАҒДАРЛАМА СТИЛІ","Parol":"Құпиясөз","Parol jańalandı":"Құпиясөз жаңартылды","Parol keminde 6 belgiden turıwı kerek":"Құпиясөз кемінде 6 таңбадан тұруы керек","Parol qáte":"Құпиясөз қате","Paroldi kiritiń":"Құпиясөзді енгізіңіз","Paroldi qayta kiritiń":"Құпиясөзді қайта енгізіңіз","Paroldi qaytalań":"Құпиясөзді қайталаңыз","Paroldi tiklew":"Құпиясөзді қалпына келтіру","Paroldi umıttıńız ba?":"Құпиясөзді ұмыттыңыз ба?","Paroller sáykes kelmeydi":"Құпиясөздер сәйкес келмейді","Paydalanıwshı":"Пайдаланушы","Pi":"Бс","Piyshembi":"Бейсенбі","Plastik karta":"Пластик карта","Procent dáramatı":"Пайыз табысы","Procent kalkulyatorı":"Пайыз калькуляторы","Procent túri":"Пайыз түрі","Profil":"Профиль","Profil maǵlıwmatları":"Профиль деректері","Profil → Programma stili bóliminde Classic yamasa Liquid Glass stilin, Jaqtı, Qarańǵı yamasa Avtomat temanı saylań.":"Профиль → Бағдарлама стилі бөлімінде Classic не Liquid Glass стилін, Жарық, Қараңғы не Автомат тақырыбын таңдаңыз.","Prognoz":"Болжам","Programmalar":"Бағдарламалар","Provayder":"Провайдер","Pul awdarıw":"Ақша аудару","Push-xabarlama":"Push-хабарлама","QARJÍ":"ҚАРЖЫ","QOSÍMSHA QURALLAR":"ҚОСЫМША ҚҰРАЛДАР","Qabıl etildi":"Қабылданды","Qaldı":"Қалды","Qaldıq":"Қалдық","Qamsızlandırıw":"Сақтандыру","Qansha jıynaw kerek":"Қанша жинау керек","Qaraqalpaqsha":"Қарақалпақша","Qarańǵı":"Қараңғы","Qarjı":"Қаржы","Qarjı densawlıǵı balı":"Қаржы денсаулығы балы","Qarjı planı":"Қаржы жоспары","Qarjı qurallari":"Қаржы құралдары","Qarjı quralları":"Қаржы құралдары","Qarjılarıńız qay jerge ketip atır":"Қаржыңыз қайда кетіп жатыр","Qarjıńız qayaqqa ketip atırǵanın kategoriyalar boyınsha kóriń. Kirim jasıl, shıǵım qızıl reńde.":"Қаржыңыздың қайда кетіп жатқанын санаттар бойынша көріңіз. Кіріс жасыл, шығыс қызыл түсте.","Qarjıńızdı tolıq qadaǵalań":"Қаржыңызды толық бақылаңыз","Qarız alıw hám beriw":"Қарыз алу және беру","Qarız bergenińiz yamasa alǵanıńız bolsa, jazıp qoyıń":"Қарыз берген не алған болсаңыз, жазып қойыңыз","Qarız dápteri":"Қарыз дәптері","Qarız jabıldı":"Қарыз жабылды","Qarız jaratıldı":"Қарыз құрылды","Qarız jaratıw":"Қарыз құру","Qarız joq":"Қарыз жоқ","Qarız qaytarıladı":"Қарыз қайтарылады","Qarız qosıw":"Қарыз қосу","Qarızdarlıq":"Қарыздарлық","Qarızdarlıqtı tekseriw":"Қарыздарлықты тексеру","Qarızdı jabıw ushın":"Қарызды жабу үшін","Qarızdı tólew":"Қарызды төлеу","Qarızlar":"Қарыздар","Qashannan":"Қашаннан","Qashanǵa shekem":"Қашанға дейін","Qaysı balansqa":"Қай балансқа","Qaysı balanstan":"Қай баланстан","Qaysı hamyannan alınadı":"Қай әмияннан алынады","Qaysı hamyanǵa túsedi":"Қай әмиянға түседі","Qaysı valyutaǵa":"Қай валютаға","Qayta jiberiw":"Қайта жіберу","Qaytadan kiriw ushın telefon nomeri hám parol kerek boladı.":"Қайта кіру үшін телефон нөмірі мен құпиясөз керек болады.","Qaytarıldı":"Қайтарылды","Qaytarıw":"Қайтару","Qaytarıw múddeti":"Қайтару мерзімі","Qaytarıw múddeti — búgin":"Қайтару мерзімі — бүгін","Qaytarıw sánesi":"Қайтару күні","Qayırlı kesh":"Қайырлы кеш","Qayırlı kún":"Қайырлы күн","Qayırlı tań":"Қайырлы таң","Qayırlı tún":"Қайырлы түн","Qayırqomlıq":"Қайырымдылық","Qazaq teńgesi":"Қазақ теңгесі","Qolıńızdaǵı naqd pul yamasa kartadaǵı summanı kiritiń — esap usı jerden baslanadı. Keyin ózgertiwge boladı.":"Қолыңыздағы қолма-қол ақшаны не картадағы соманы енгізіңіз — есеп осы жерден басталады. Кейін өзгертуге болады.","Qonarbaev Damir":"Қонарбаев Дамир","Qosılǵan":"Қосылған","Qosılǵanda":"Қосылғанда","Qosımsha haqqında":"Қосымша туралы","Qosımsha maǵlıwmat":"Қосымша ақпарат","Qosımshanı bahalaw":"Қосымшаны бағалау","Qosımshanıń tiykarǵı bólimlerin birge kórip shıǵayıq ba? Bar bolǵanı 30 sekund.":"Қосымшаның негізгі бөлімдерін бірге қарап шығайық па? Небәрі 30 секунд.","Qosımshaǵa kiriw":"Қосымшаға кіру","Qosıw":"Қосу","Qońıraw etiw":"Қоңырау шалу","Qurallar, kurslar, maqset hám qarızlar":"Құралдар, бағамдар, мақсат және қарыздар","QÁWIPSIZLIK":"ҚАУІПСІЗДІК","Qáte format. JSON tekstti tekseriń":"Қате формат. JSON мәтінін тексеріңіз","Qırǵız somı":"Қырғыз сомы","Qıtay yuanı":"Қытай юані","Raxmet!":"Рақмет!","Reklama":"Жарнама","Reklama beriw":"Жарнама беру","Reklama haqqında":"Жарнама туралы","Reklama ornı":"Жарнама орны","Reklama túri":"Жарнама түрі","Reklama ushın arza":"Жарнамаға өтінім","Reklamaǵa qaytıw":"Жарнамаға қайту","Rezerv nusqa":"Резервтік көшірме","Rezerv nusqa (JSON)":"Резервтік көшірме (JSON)","Reń":"Түс","Reńi":"Түсі","Reńli sızıq belgiler":"Түрлі түсті белгішелер","Rossiya rublı":"Ресей рублі","Rubl":"Рубль","SMS kod jiberildi":"SMS код жіберілді","SMS kod jiberiw":"SMS код жіберу","SMS kod qayta jiberildi":"SMS код қайта жіберілді","SMS kodtı kiritiń":"SMS кодты енгізіңіз","SMS xabarlama":"SMS хабарлама","Saqawat qorı":"Қайырымдылық қоры","Salon hám gózzallıq":"Салон және сұлулық","Salıqlar":"Салықтар","Salıstırıw":"Салыстыру","Salıw":"Салу","Sanı":"Саны","Sap jaǵday":"Таза жағдай","Saqlandı":"Сақталды","Saqlaw":"Сақтау","Saqlaw hám kiriw":"Сақтау және кіру","Saqlaw: tómendegi tekstti nusqalap, qáwipsiz jerde saqlań":"Сақтау: төмендегі мәтінді көшіріп, қауіпсіз жерде сақтаңыз","Sawda dáramatları":"Сауда табыстары","Sawǵa":"Сыйлық","Sawǵa hám sıylıqlar":"Сыйлықтар","Sawǵalar":"Сыйлықтар","Sayaxat":"Саяхат","Saylaw":"Таңдау","Saytqa ótiw":"Сайтқа өту","Sazlawlar saqlanadı, jazıwlar óshiriledi":"Баптаулар сақталады, жазбалар жойылады","Sentyabr":"Қыркүйек","Sh":"Сб","Shay puli":"Шай ақы","Shańaraq":"Отбасы","Shańaraq, balalar, úy":"Отбасы, балалар, үй","Sheksiz":"Шексіз","Shembi":"Сенбі","Shiyshe kopilka ashıń":"Шыны қорапша ашыңыз","Shıǵım":"Шығыс","Shıǵım bolǵan":"Шығыс болған","Shıǵım joq":"Шығыс жоқ","Shıǵım qosıldı":"Шығыс қосылды","Shıǵım summası":"Шығыс сомасы","Shıǵındı shıǵarıw":"Қоқыс шығару","Shıǵıw":"Шығу","Si":"Сс","Siyshembi":"Сейсенбі","Siz qaytaratuǵın kóbirek":"Сіз қайтаратын көбірек","Siz qosqanıńız":"Сіз қосқан","Sizden alınǵan qarız":"Сізден алынған қарыз","Sizden alǵan qarızımdı umıtpadım":"Сізден алған қарызымды ұмытпадым","Sizge berilgen qarız":"Сізге берілген қарыз","Sizge qaytatuǵın kóbirek":"Сізге қайтатын көбірек","Skidka":"Жеңілдік","Skidka kalkulyatorı":"Жеңілдік калькуляторы","Sońǵı esabatlar":"Соңғы жазбалар","Sport":"Спорт","Sport zal":"Спорт зал","Statistika":"Статистика","Statistika hám byudjet":"Статистика және бюджет","Statistika, limitler, valyuta kursları hám qarjı esaplawıshları — aqıllı sheshimler ushın.":"Статистика, лимиттер, валюта бағамдары және қаржы калькуляторлары — ақылды шешімдер үшін.","Status":"Мәртебе","Statusıńız BUSINESS ke ózgerdi":"Мәртебеңіз BUSINESS-ке өзгерді","Stil":"Стиль","Stil hám temanı qalay ózgertemen?":"Стиль мен тақырыпты қалай өзгертемін?","Summa":"Сома","Summa (UZS)":"Сома (UZS)","Summalar bulıńǵır kórinedi":"Сомалар бұлыңғыр көрінеді","Summanı kiritiń":"Соманы енгізіңіз","Suw támiynatı":"Сумен жабдықтау","Svet hám gaz":"Жарық және газ","Swm":"Сум","Sá":"Ср","Sálem":"Сәлем","Sáne":"Күні","Sáneni saylań":"Күнді таңдаңыз","Sárshembi":"Сәрсенбі","Súwret júklew":"Сурет жүктеу","Súwretti oqıw múmkin bolmadı":"Суретті оқу мүмкін болмады","Sırtta awqatlanıw":"Сыртта тамақтану","TIL":"ТІЛ","Tabılmadı":"Табылмады","Taksi":"Такси","Taksi 25 mıń":"Такси 25 мың","Tarif jańalanıwı":"Тариф жаңаруы","Tarifler":"Тарифтер","Tastıyıqlaw":"Растау","Tayın":"Дайын","Tayın! Endi E-esap tan tolıq paydalanıń":"Дайын! Енді E-esap-ты толық пайдаланыңыз","Taza aymaq":"Таза аймақ","Tazalandı":"Тазаланды","Tazalaw":"Тазалау","Tek súwret faylın saylań":"Тек сурет файлын таңдаңыз","Tekstti belgilep, nusqalań":"Мәтінді белгілеп, көшіріңіз","Telefon":"Телефон","Telefon balansı":"Телефон балансы","Telefon nomeri":"Телефон нөмірі","Telefon nomeri kórsetilmegen":"Телефон нөмірі көрсетілмеген","Telefon nomerin qosıw":"Телефон нөмірін қосу","Telefon nomerin tolıq kirgiziń":"Телефон нөмірін толық енгізіңіз","Telefon nomerin tolıq kiritiń":"Телефон нөмірін толық енгізіңіз","Telefon nomerińizdi kiritiń — oǵan tastıyıqlaw kodı SMS arqalı jiberiledi":"Телефон нөміріңізді енгізіңіз — оған растау коды SMS арқылы жіберіледі","Televidenie":"Теледидар","Tez qosıw":"Жылдам қосу","Tez qosıw shablonları":"Жылдам қосу үлгілері","Teńge":"Теңге","Tiklew":"Қалпына келтіру","Tiklew: saqlanǵan tekstti bul jerge qoyıń":"Қалпына келтіру: сақталған мәтінді осында қойыңыз","Til":"Тіл","Tiykarǵı etiw":"Негізгі ету","Tiykarǵı maqset":"Негізгі мақсат","Tolıǵıraq":"Толығырақ","Transport":"Көлік","Transport kartası":"Көлік картасы","Turaq jay":"Тұрғын үй","Turaqlı tólem":"Тұрақты төлем","Turaqlı tólemler":"Тұрақты төлемдер","Turaqlı tólemler joq":"Тұрақты төлемдер жоқ","Turmıs":"Тұрмыс","Turmıs tárzi":"Өмір салты","Tuwılǵan kún sawǵası":"Туған күн сыйлығы","Tuwılǵan sáne":"Туған күні","Tuwılǵan sáneni saylań":"Туған күніңізді таңдаңыз","Tábiyiy gaz":"Табиғи газ","Táriyp":"Сипаттама","Tártibin ózgertiw ushın ≡ belgisin súyreń":"Ретін өзгерту үшін ≡ белгісін сүйреңіз","Tóledim":"Төледім","Tólem bar":"Төлем бар","Tólem jazıldı":"Төлем жазылды","Tólem kalendarı":"Төлем күнтізбесі","Tólem qosıw":"Төлем қосу","Tólem ámelge asırıldı":"Төлем жасалды","Tólemdi belgilew":"Төлемді белгілеу","Tólemler hám qurallar":"Төлемдер және құралдар","Tólemler tarixı":"Төлемдер тарихы","Tólendi":"Төленді","Tólenetuǵın baha":"Төленетін баға","Tólengen":"Төленген","Tólew":"Төлеу","Tólew múddeti":"Төлеу мерзімі","Tólew ushın súyreń":"Төлеу үшін сүйреңіз","Tólew usılı":"Төлеу тәсілі","Túri":"Түрі","Túrk lirası":"Түрік лирасы","Túsetuǵın balans":"Түсетін баланс","Túslik":"Түскі ас","Túsinbedim. Mısallar:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «keshe bazar 180 000 naq»\n• «bul ay qansha jumsadım?»\n• «keńes ber»":"Түсінбедім. Мысалдар:\n• «такси 25 мың»\n• «жалақы 6,5 млн келді»\n• «кеше базар 180 000 қолма-қол»\n• «бұл айда қанша жұмсадым?»\n• «кеңес бер»","Túymeler basılǵanda sulıw dawıslar":"Түймелер басылғанда әдемі дыбыстар","Ulıwma":"Жалпы","Ulıwma balans":"Жалпы баланс","Universitet kontraktı":"Университет келісімшарты","Usı ay":"Осы ай","Usı balanstan aylıq shıǵım shegarası":"Осы баланстан айлық шығыс шегі","Valyuta":"Валюта","Valyuta almastırıldı":"Валюта айырбасталды","Valyuta almastırıw":"Валюта айырбастау","Valyuta almastırıw (obmen)":"Валюта айырбастау","Valyuta ayırbaslaw":"Валюта айырбастау","Valyuta konvertorı":"Валюта конвертері","Valyuta konvertorı, kredit hám depozit kalkulyatorları, Excel eksport — barlıǵı bir jerde.":"Валюта конвертері, кредит және депозит калькуляторлары, Excel экспорт — бәрі бір жерде.","Valyuta kursları":"Валюта бағамдары","Versiya":"Нұсқа","Vidjet sazlamaları":"Виджет баптаулары","Xabarlamalar":"Хабарламалар","Xaridlar":"Сатып алулар","Xosh keldińiz!":"Қош келдіңіз!","Xalq banki":"Халық банкі","Xızmetkerler":"Қызметкерлер","Xızmetler":"Қызметтер","Xızmetler bóliminde":"Қызметтер бөлімінде","Xızmetler bólimindegi tólemler haqıyqıy ma?":"Қызметтер бөліміндегі төлемдер шынайы ма?","Xızmetler hám kalkulyatorlar":"Қызметтер және калькуляторлар","Xızmetti izlew":"Қызметті іздеу","YHXB (GAI) járiymaları":"ЖҚҚ айыппұлдары","Yanvar":"Қаңтар","aktiv qarız":"белсенді қарыз","aldınǵı":"алдыңғы","aldınǵı dáwirge salıstırǵanda":"алдыңғы кезеңмен салыстырғанда","asıp ketti":"асып кетті","ay":"ай","ay orınlandı":"ай орындалды","aylıq limitten asıp ketti":"айлық лимиттен асып кетті","ayına":"айына","balansı":"балансы","basqa":"басқа","bugin":"бүгін","bugin tólew kerek":"бүгін төлеу керек","búgin":"бүгін","dana":"дана","eske salıw jiberiń":"еске салу жіберіңіз","ga qarızıńızdıń múddeti ótti":"— қарызыңыздың мерзімі өтті","hamyan":"әмиян","jańa":"жаңа","jetispeydi":"жетіспейді","joq":"жоқ","jumsaldı":"жұмсалды","jumsalǵan":"жұмсалған","jámi":"барлығы","jıl":"жыл","jıynań":"жинаңыз","kategoriya":"санат","keyingi":"келесі","kirim":"кіріс","kirim − shıǵım":"кіріс − шығыс","komissiya":"комиссия","kún":"күн","kún aldın ótti":"күн бұрын өтті","kún keshikti":"күн кешікті","kún qaldı":"күн қалды","kún ótti":"күн өтті","kúni alǵan qarızıńızdı eske salaman":"күні алған қарызыңызды еске саламын","kúnnen keyin":"күннен кейін","kútilmekte...":"күтілуде...","limit":"лимит","limit asıldı":"лимит асты","limittiń":"лимиттің","maqset":"мақсат","maqsetke qosıldı":"мақсатқа қосылды","maǵan qaytaradı":"маған қайтарады","men qaytaraman":"мен қайтарамын","mln":"млн","mlrd":"млрд","muǵdarı":"сомасы","múddeti ótti":"мерзімі өтті","múddetsiz":"мерзімсіз","mıń":"мың","nomeri tastıyıqlandı. Endi jańa parol oylap tabıń.":"нөмірі расталды. Енді жаңа құпиясөз ойлап табыңыз.","nomerine 5 xanalı tastıyıqlaw kodı jiberildi":"нөміріне 5 таңбалы растау коды жіберілді","operaciya":"операция","operaciya joq":"операция жоқ","provayder":"провайдер","qaldı":"қалды","qarız":"қарыз","qarızdı qaytarıw múddeti":"қарызды қайтару мерзімі","qarızdı tólew múddeti":"қарызды төлеу мерзімі","qarızınıń múddeti ótti":"қарызының мерзімі өтті","shıǵım":"шығыс","shıǵım, keshegi kúnge salıstırǵanda":"шығыс, кешегі күнмен салыстырғанда","shıǵım, ótken ayǵa salıstırǵanda":"шығыс, өткен аймен салыстырғанда","swm":"сум","sáne":"күні","tólem":"төлем","tólendi":"төленді","«+» túymesi menen jańa balans ashıń: naqd pul, plastik karta yamasa dollar, rubl, teńge. Kartanı basıp tursańız — ótkeriw, obmen hám redaktorlaw.":"«+» түймесімен жаңа баланс ашыңыз: қолма-қол, карта не доллар, рубль, теңге. Картаны басып тұрсаңыз — аудару, айырбастау және өңдеу.","Ájayıp":"Керемет","Ákesiniń atı":"Әкесінің аты","Ármanıńızǵa qádem-qádem":"Арманыңызға қадам-қадам","Ármanıńızǵa shiyshe kopilka ashıń: summa hám múddet qoyıń, hár ay qansha salıw kerekligin E-esap ózi esaplaydı.":"Арманыңызға шыны қорапша ашыңыз: сома мен мерзім қойыңыз, ай сайын қанша салу керегін E-esap өзі есептейді.","Ónim yamasa xızmetińiz haqqında qısqasha":"Өнім не қызметіңіз туралы қысқаша","Óshirilgen":"Өшірілген","Óshiriw":"Жою","Ótkerildi":"Аударылды","Ótkerip jiberiw":"Өткізіп жіберу","Ótkeriw":"Аудару","Ótkeriw ushın jáne bir balans kerek":"Аудару үшін тағы бір баланс керек","Ótkizip jiberiw":"Өткізіп жіберу","Ózińizge qolaylı tildi saylań: qaraqalpaqsha, ózbekshe, qazaqsha, ruscha yamasa inglisshe.":"Өзіңізге ыңғайлы тілді таңдаңыз: қарақалпақша, өзбекше, қазақша, орысша не ағылшынша.","Úlken jazıw hám anıq tuymeler":"Үлкен жазу және анық түймелер","Úlkenler ushın rejim":"Үлкендерге арналған режим","Úlkenler ushın rejim ne?":"Үлкендерге арналған режим деген не?","Únemlendi":"Үнемделді","Únemleysiz":"Үнемдейсіз","Úskeneler":"Жабдықтар","Úy buyımları":"Үй бұйымдары","Úy-jay hám kommunal":"Тұрғын үй және коммуналдық","Úy-jay qárejetleri":"Тұрғын үй шығындары","ǵa shekem qaytaraman. Raxmet!":"дейін қайтарамын. Рақмет!","5 xanalı kodtı kiritiń":"5 таңбалы кодты енгізіңіз","Aldınǵı kún":"Алдыңғы күн","Arza qabıl etildi":"Өтінім қабылданды","Arza qaldırıw":"Өтінім қалдыру","Ay juwmaǵı bonusı":"Ай қорытындысы бонусы","Dawıs":"Дыбыс","1. Eń kóp shıǵım — «Kiyim-keshek» (29%). Onı 15% qısqartsańız, ayına 45 mıń swm únemleysiz.":"1. Ең көп шығыс — «Киім-кешек» (29%). Оны 15% қысқартсаңыз, айына 45 мың сум үнемдейсіз.","2. Ájayıp! Kirimińizdiń 48% ın saqlap atırsız.":"2. Керемет! Кірісіңіздің 48%-ын сақтап отырсыз.","4. 24 saat qaǵıydası: kútilmegen úlken satıp alıwdı bir kúnge keyinge qaldırıń.":"4. 24 сағат ережесі: күтпеген үлкен сатып алуды бір күнге кейінге қалдырыңыз.","Gúlnara":"Гүлнара","Humans":"Humans","Aurora stili hám widgetler":"Aurora стилі және виджеттер","Aurora stilin qosıw":"Aurora стилін қосу","BUSINESS statusı":"BUSINESS мәртебесі","BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.":"BUSINESS мәртебесі, шексіз AI, Бизнес панелі және Aurora стилі — бәрі бір тарифте.","MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.":"MAX мүмкіндіктері, Aurora стилі және BUSINESS мәртебесі өшіріледі. Төленген сома қайтарылмайды.","Tildi saylań":"Тілді таңдаңыз","Akkaunttı óshiriw":"Аккаунтты жою","Akkauntıńız hám ondaǵı barlıq maǵlıwmatlar (balanslar, operaciyalar, maqsetler, qarızlar) biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Аккаунтыңыз және ондағы барлық деректер (баланстар, операциялар, мақсаттар, қарыздар) толық жойылады. Мұны қайтару мүмкін емес.","Anıq pa?":"Сенімдісіз бе?","Bul sońǵı eskertiw. Akkaunt hám barlıq maǵlıwmatlar qayta tiklenbeydi.":"Бұл соңғы ескерту. Аккаунт пен барлық деректер қайта қалпына келмейді.","Biraqola óshiriw":"Толық жою","Balans, maqset, qarız, AI kómekshi hám statistika — bárin qısqa sayaxatta birge úyrenip shıǵayıq. Qádem-qádem kórsetemen ✨":"Баланс, мақсат, қарыз, AI көмекші және статистика — бәрін қысқа саяхатта бірге үйреніп шығайық. Қадам-қадам көрсетемін ✨","Úyrenip shıǵıw":"Үйреніп шығу","Erteń":"Ертең","Ay qaldı":"Ай қалды","AKKAUNT":"АККАУНТ","Kirilgen nomer":"Кірген нөмір","Maǵlıwmatlar saqlanadı":"Деректер сақталады","Barlıq maǵlıwmatlar biraqola óshiriledi":"Барлық деректер толық жойылады","Qosımsha maǵan unamadı":"Қосымша маған ұнамады","Kerekli múmkinshilik jetispeydi":"Қажетті мүмкіндік жетіспейді","Basqa qosımshaǵa ótemen":"Басқа қосымшаға ауысамын","Jańa akkaunt ashıwım kerek":"Жаңа аккаунт ашуым керек","Basqa sebep":"Басқа себеп","Ketiwińizge ókinemiz 😔 Iltimas, sebebin aytıń — bul E-esap tı jaqsılawǵa járdem beredi.":"Кетуіңізге өкінеміз 😔 Себебін айтыңызшы — бұл E-esap-ты жақсартуға көмектеседі.","Sebebin jazıń...":"Себебін жазыңыз...","Barlıq balanslar, operaciyalar, maqsetler hám qarızlar biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Барлық баланстар, операциялар, мақсаттар мен қарыздар толық жойылады. Мұны қайтару мүмкін емес.","Qosımsha boyınsha sorawlarǵa juwap":"Қосымша бойынша сұрақтарға жауап","24/7 kómek":"24/7 көмек","Qalay járdem bere alaman?":"Қалай көмектесе аламын?","E-esap qalay isleytuǵını, qaysı bólim ne ushın ekeni — qálegen sorawıńızdı beriń. Tómendegi temalardan da saylawıńızǵa boladı 👇":"E-esap қалай жұмыс істейтіні, қай бөлім не үшін екені — кез келген сұрағыңызды қойыңыз. Төмендегі тақырыптардан да таңдай аласыз 👇","Sorawıńızdı jazıń...":"Сұрағыңызды жазыңыз...","Operaciyanı qalay qosaman?":"Операцияны қалай қосамын?","Balans hám kartalar":"Баланс және карталар","Qarız jazıw":"Қарыз жазу","AI chat qalay isleydi?":"AI чат қалай жұмыс істейді?","Limit qoyıw":"Лимит қою","Tildi ózgertiw":"Тілді өзгерту","Paroldi umıttım":"Құпиясөзді ұмыттым","Maǵlıwmatlarım qayerde?":"Деректерім қайда?","Operaciya qosıw":"Операция қосу","AI chattı ashıw":"AI чатты ашу","Statistikaǵa ótiw":"Статистикаға өту","Til saylaw":"Тіл таңдау","trln":"трлн","Maqsetti redaktorlaw":"Мақсатты өңдеу","Qarızdı redaktorlaw":"Қарызды өңдеу","Jıynalǵan summa":"Жиналған сома","Ózgertiw":"Өзгерту"},"ru":{"1 ay":"1 месяц","1 hápte":"1 неделя","3 ay":"3 месяца","30 kún":"30 дней","5 ke shekem":"до 5","AI ay esabatı":"AI-отчёт за месяц","AI ay esabatı hám qarjı balı":"AI-отчёт за месяц и финансовый балл","AI eske salıw xatı":"AI-напоминание","AI eslep qaldı":"AI запомнил","AI keńesi":"Совет AI","AI keńesleri":"Советы AI","AI kómekshi":"AI-помощник","AI kómekshi qalay isleydi?":"Как работает AI-помощник?","AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.":"Нажмите кнопку AI и напишите «такси 25 тыс.».","AI tuymesin basıń hám ápiwayı tilde jazıń: «taksi 25 mıń», «aylıq 6 mln keldi», «keshe bazarǵa 180 000». AI muǵdardı, kategoriyanı hám túrin ózi anıqlaydı. Sonday-aq «bul ay qansha jumsadım?» dep sorawıńız múmkin.":"Нажмите кнопку AI и пишите простым языком: «такси 25 тыс.», «зарплата 6 млн пришла», «вчера на рынок 180 000». AI сам определит сумму, категорию и тип. Можно также спросить: «сколько я потратил в этом месяце?»","AI usınısı":"Предложение AI","AI ǵa ádettegi tilde jazıń yamasa aytıń: ol summa, kategoriya hám sáneni ózi anıqlaydı.":"Пишите или говорите AI обычными словами — он сам определит сумму, категорию и дату.","AQSH dolları":"Доллар США","Abonent":"Абонент","Adam atı":"Имя","Adamlar sanı":"Количество человек","Adamǵa qarız haqqında SMS jiberiw":"Отправить человеку SMS о долге","Akkaunttan shıǵıw":"Выйти из аккаунта","Akkauntıńız bar ma?":"Уже есть аккаунт?","Akkauntıńız joq pa?":"Нет аккаунта?","Akkauntıńızǵa kiriń":"Войдите в аккаунт","Aksessuar hám zergerlik":"Аксессуары и украшения","Aktiv qarız joq":"Активных долгов нет","Aktiv qarız joq. Esap teń!":"Активных долгов нет. Всё в расчёте!","Aktiv qarız joq. Qarjıńız tınısh!":"Активных долгов нет. Финансы в порядке!","Aldın Profil → Hamyanlar bóliminde hamyan qosıń.":"Сначала добавьте кошелёк в Профиль → Кошельки.","Aldın hamyan qosıń":"Сначала добавьте кошелёк","Aldınǵı dáwir boyınsha maǵlıwmat joq":"Нет данных за прошлый период","Almastırıldı":"Обменено","Almastırıw":"Обменять","Alınadı":"Получите","Alınǵan":"Взято","Alınǵanda":"При получении","Alıs-berisler":"Расчёты","Alıw":"Взять","Analiz":"Анализ","Anıqlanbaǵan":"Не определено","Aprel":"Апрель","Aqsha salıw":"Внести деньги","Aqıllı byudjet (AI limitler)":"Умный бюджет (AI-лимиты)","Aqıllı byudjet: AI limitlerdi usınadı":"Умный бюджет: AI предлагает лимиты","Artıq tólem":"Переплата","Arza jiberiw":"Отправить заявку","Arza nomeri":"Номер заявки","Arzanı jiberiń, biz siz benen 24 saat ishinde baylanısamız.":"Отправьте заявку — мы свяжемся с вами в течение 24 часов.","Arzımaydı! Jáne ne járdem kerek?":"Не за что! Чем ещё помочь?","Ataw hám reńin ózgertiw":"Изменить название и цвет","Atı":"Имя","Atı hám summanı kirgiziń":"Введите название и сумму","Atı, familiyası, telefon hám súwret":"Имя, фамилия, телефон и фото","Atın jazıń":"Введите название","Atın kirgiziń":"Введите название","Atıńızdı kirgiziń":"Введите ваше имя","Atıńızdı kiritiń":"Введите ваше имя","Avgust":"Август","Avto sheship alıw":"Автосписание","Avtomat":"Авто","Awdarma":"Перевод","Awdarma ushın keminde eki hamyan kerek":"Для перевода нужно минимум два кошелька","Awqat jetkeriw":"Доставка еды","Ay":"Месяц","Ay aqırına prognoz":"Прогноз на конец месяца","Ay kúni (1–28)":"День месяца (1–28)","Aylıq":"Зарплата","Aylıq %":"Месячный %","Aylıq 6,5 mln keldi":"Пришла зарплата 6,5 млн","Aylıq hám avans":"Зарплата и аванс","Aylıq limitler":"Месячные лимиты","Aylıq procent":"Месячная ставка","Aylıq tólem":"Ежемесячный платёж","Aylıq ulıwma byudjet":"Общий месячный бюджет","Aymaqlıq elektr tarmaqları":"Региональные электросети","Aytıń — E-esap ózi jazadı":"Скажите — E-esap запишет сам","Ayına":"В месяц","Ayına jıynaw kerek":"Нужно копить в месяц","Az":"Мало","Azıq-awqat":"Продукты","BASQA":"ДРУГОЕ","Baha":"Оценка","Bala-baqsha":"Детский сад","Balalar":"Дети","Balalar baqshası":"Детский сад","Balans":"Баланс","Balans esabatları":"Отчёты по балансу","Balans esabatların kóriw":"Отчёты по балансу","Balans qosıldı":"Баланс добавлен","Balans qosıw":"Добавить баланс","Balans saqlandı":"Баланс сохранён","Balans óshirildi":"Баланс удалён","Balanslar halatı":"Состояние балансов","Balanslar hár qıylı bolıwı kerek":"Балансы должны быть разными","Balansta jetkilikli qarjı joq":"Недостаточно средств на балансе","Balanstan balansqa ótkeriw":"Перевод между балансами","Balanstı jasırıw":"Скрыть баланс","Balanstı redaktorlaw":"Редактировать баланс","Balanstı óshiriw":"Удалить баланс","Balanstı ózgertiw":"Изменить баланс","Balansım qansha?":"Какой у меня баланс?","Balansıńız barlıq qarızlardı jabıwǵa jetedi":"Вашего баланса хватает, чтобы закрыть все долги","Baner":"Баннер","Bank, karta, naqd pul hám valyuta — barlıq balanslarıńız bir jerde, bir túymede.":"Банк, карта, наличные и валюта — все балансы в одном месте.","Barlıq balanslarıńızdıń jıyındısı: naqd pul + kartalar + valyuta. Kóz belgisi menen summanı jasırıwǵa boladı.":"Сумма всех балансов: наличные + карты + валюта. Значком глаза сумму можно скрыть.","Barlıq hamyanlar":"Все кошельки","Barlıq kategoriyalar":"Все категории","Barlıq kirim-shıǵım jazıwları, maqset hám qarızlar óshiriledi. Hamyan balansları 0 ge túsedi.":"Все записи доходов и расходов, цели и долги будут удалены. Балансы кошельков обнулятся.","Barlıq maydanlardı toltırıń":"Заполните все поля","Barlıq maǵlıwmatlar tek sizdiń qurılmańızda saqlanadı. Rezerv nusqa ushın Profil → Maǵlıwmatlar bólimin paydalanıń.":"Все данные хранятся только на вашем устройстве. Для резервной копии используйте Профиль → Данные.","Barlıq maǵlıwmattı saqlaw yamasa tiklew":"Сохранить или восстановить все данные","Barlıq operaciyalar":"Все операции","Barlıq qarızdı uaqtında qaytarıw ushın kúnine":"Чтобы вовремя вернуть все долги — в день","Barlıq qarızlar":"Все долги","Barlıq qarızlar tártipte. Múddetler jaqınlasqanda eskertemen.":"Все долги в порядке. Напомню, когда приблизятся сроки.","Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.":"Все настройки и данные будут удалены.","Barlıq tólemler bir kalendarda":"Все платежи в одном календаре","Barlıǵı":"Все","Barlıǵın kórsetiw":"Показать все","Bas bet":"Главная","Baslanǵısh halına qaytarıw":"Сбросить до начального","Baslanǵısh summa":"Начальная сумма","Baslanǵısh tártip":"Порядок по умолчанию","Baslaw":"Начать","Basqa":"Другое","Basqa dáramatlar":"Прочие доходы","Basqa járiymalar":"Прочие штрафы","Basqa kirim":"Другой доход","Basqa maqsetler":"Другие цели","Basqa qarızlar":"Другие долги","Basqa qárejetler":"Прочие расходы","Basqalar":"Прочее","Basqarıw":"Управление","Baylanıs":"Связь","Baylanıs adamı":"Контактное лицо","Baylanıs hám media":"Связь и медиа","Bazar 180 000 naq":"Рынок 180 000 наличными","Bazar hám dúkan":"Рынок и магазин","Belgi":"Значок","Berilgen":"Выдано","Beriw":"Дать","Bilim":"Образование","Bilim hám baylanıs":"Образование и связь","Biykar etildi":"Отменено","Biykarlandı":"Отменено","Biykarlaw":"Отменить","Biznes":"Бизнес","Biznes basqa":"Бизнес прочее","Biznes dáramatları":"Доходы от бизнеса","Biznes hám jumıs":"Бизнес и работа","Biznes hám tolıq qadaǵalaw ushın":"Для бизнеса и полного контроля","Biznes paneli":"Бизнес-панель","Biznes paneli hám hisob-fakturalar":"Бизнес-панель и счета","Biznesińizdi E-esap paydalanıwshılarına kórsetiń":"Покажите свой бизнес пользователям E-esap","Bonus":"Бонус","Bos":"Пусто","Bugin":"Сегодня","Bugin ele operaciya joq":"Сегодня операций пока нет","Bugingi operaciyalar":"Операции за сегодня","Bul aralıqta maǵlıwmat joq":"Нет данных за этот период","Bul ay ele shıǵım joq.":"В этом месяце расходов пока нет.","Bul ay jumsaldı":"Потрачено в этом месяце","Bul ay limit":"Лимит на месяц","Bul ay qansha jumsadım?":"Сколько я потратил в этом месяце?","Bul ay sap payda":"Чистая прибыль за месяц","Bul ay xızmetlerge":"На услуги в этом месяце","Bul brauzerde kontaktlar ashılmaydı":"В этом браузере контакты недоступны","Bul bólimde qarız joq":"В этом разделе долгов нет","Bul dáwirde maǵlıwmat joq":"Нет данных за этот период","Bul hamyanda qarjı jetkiliksiz. Basqa hamyandı saylań.":"В этом кошельке недостаточно средств. Выберите другой.","Bul jerde sizdiń biznesińiz turıwı múmkin. Arza qaldırıń — biz siz benen baylanısamız.":"Здесь может быть ваш бизнес. Оставьте заявку — мы свяжемся с вами.","Bul kategoriyadaǵı operaciyalar «Basqa» ǵa ótedi.":"Операции этой категории перейдут в «Другое».","Bul kúni operaciya joq":"В этот день операций нет","Bul kúni tólem joq":"В этот день платежей нет","Bul maqset óshiriledi.":"Эта цель будет удалена.","Bul nomer aldın dizimnen ótken — Kiriw bólimine ótiń":"Этот номер уже зарегистрирован — перейдите ко входу","Bul nomer dizimnen ótpegen":"Этот номер не зарегистрирован","Bul operaciya biykarlanadı. Keyin qaytarıwǵa boladı.":"Операция будет отменена. Её можно вернуть позже.","Bul operaciya biykarlandı":"Операция отменена","Bul operaciyanı óshiriwdi qáleysiz be?":"Удалить эту операцию?","Bul rejimde jazıwlar úlkenirek, tuymeler anıǵıraq hám navigaciyada barlıq atamalar kórinedi.":"В этом режиме текст крупнее, кнопки чётче, а в навигации видны все подписи.","Buyırtpa ushın":"За заказ","Byudjet":"Бюджет","Byudjet hám limitler":"Бюджет и лимиты","Byudjet jaǵdayı":"Состояние бюджета","Byudjet ornatılmaǵan":"Бюджет не задан","Byudjet ornatılmaǵan. Profil → Byudjet hám limitler bóliminde ornatıń.":"Бюджет не задан. Задайте его в Профиль → Бюджет и лимиты.","Byudjet tawsıldı":"Бюджет исчерпан","Byudjetten asıp kettińiz.":"Вы превысили бюджет.","Bólip":"В рассрочку","Bólip tólew":"Оплата частями","Búgin":"Сегодня","Búgin qaldı":"Осталось сегодня","Búgingi AI limiti tawsıldı. MAX ta — sheksiz.":"Дневной лимит AI исчерпан. В MAX — без ограничений.","Click, Payme yamasa karta arqalı":"Через Click, Payme или карту","Dawam etiw":"Продолжить","Dawıs effektleri":"Звуковые эффекты","Dawıs effektleri qosıldı":"Звуки включены","Dawıs effektleri óshirildi":"Звуки выключены","Dekabr":"Декабрь","Demo kurs":"Демо-курс","Demo maǵlıwmatlar menen qayta baslaw":"Начать заново с демо-данными","Demo rejim: summa hamyannan shıǵım retinde jazıladı":"Демо-режим: сумма записывается как расход из кошелька","Demo rejim: tólem kirim-shıǵım esabına jazıladı":"Демо-режим: платёж записывается в учёт","Demo tólem":"Демо-платёж","Densawlıq":"Здоровье","Densawlıq hám kútim":"Здоровье и уход","Depozit kalkulyatorı":"Депозитный калькулятор","Dinamika":"Динамика","Dizimnen ótiw":"Регистрация","Dizimnen óttińiz!":"Вы зарегистрированы!","Dollar":"Доллар","Dáramatlar":"Доходы","Dári-dármaq":"Лекарства","Dárixana":"Аптека","Dáwirdi saylań":"Выберите период","Dıqqat kerek":"Требует внимания","Dú":"Пн","Dúkan":"Магазин","Dúysenbi":"Понедельник","Dúyshembi":"Понедельник","E-esap AI chat":"Чат E-esap AI","E-esap gruppaları":"Группы E-esap","E-esap penen tanısayıq!":"Давайте познакомимся с E-esap!","E-esap sizge unadı ma?":"Вам нравится E-esap?","E-esap ǵa xosh keldińiz!":"Добро пожаловать в E-esap!","E-esap — operaciyalar esabatı":"E-esap — отчёт по операциям","E-esap — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.":"E-esap — приложение для учёта доходов и расходов. Оно помогает вести ежедневные финансы, составлять бюджет, копить на цели и добавлять операции обычными словами через AI-помощника.","Ek":"Вс","Ekshembi":"Воскресенье","Eksport, rezerv nusqa, tazalaw":"Экспорт, резервная копия, очистка","Ele esabatlar joq. Tómendegi + túymesin basıp birinshisin qosıń":"Пока нет записей. Нажмите + внизу, чтобы добавить первую","Ele jinaq maqsetińiz joq. Profil → Jinaq maqsetleri.":"Целей накоплений пока нет. Профиль → Цели накоплений.","Ele maqset joq":"Целей пока нет","Ele maqset joq. Ármanıńız ushın jinawdı baslań!":"Целей пока нет. Начните копить на мечту!","Ele maqset joq. Ármanıńız ushın shiyshe kopilka ashıń!":"Целей пока нет. Откройте стеклянную копилку для мечты!","Ele operaciya joq":"Операций пока нет","Ele tólem joq":"Платежей пока нет","Elektr energiyası":"Электроэнергия","Elektronika hám texnika":"Электроника и техника","Emoji":"Эмодзи","Energiya únemlew":"Экономия энергии","Esabat":"Отчёт","Esap nomerin tolıq kirgiziń":"Введите номер счёта полностью","Esap teń":"В расчёте","Esaptı bólisiw":"Разделить счёт","Eske salıw":"Напоминание","Eskertpe":"Заметка","Evro":"Евро","Excel eksport":"Экспорт в Excel","Excel esabatı (.xlsx)":"Отчёт Excel (.xlsx)","Excel esabatı júklendi":"Отчёт Excel скачан","Eń az muǵdar — 1 000 swm":"Минимальная сумма — 1 000 сум","Eń kóp qayda jumsadım?":"На что я трачу больше всего?","Eń kóp shıǵımlar":"Крупнейшие расходы","Eń qımbat kún":"Самый затратный день","Eń shuǵıl qarız":"Самый срочный долг","Familiyası":"Фамилия","Familiyańızdı kiritiń":"Введите фамилию","Fayl":"Файл","Fevral":"Февраль","Finans hám minnetlemeler":"Финансы и обязательства","Finans operaciyaları":"Финансовые операции","Funt sterling":"Фунт стерлингов","Gruppa":"Группа","Gruppa atı":"Название группы","Gruppa óshiriledi, kategoriyalar «Jeke kategoriyalar» ǵa ótedi.":"Группа будет удалена, категории перейдут в «Личные категории».","Gruppanı óshiriw":"Удалить группу","Gruppanı ózgertiw":"Изменить группу","Hamyan":"Кошелёк","Hamyan qosıw":"Добавить кошелёк","Hamyan saylań":"Выберите кошелёк","Hamyanda qarjı jetkiliksiz":"Недостаточно средств в кошельке","Hamyandı saylań":"Выберите кошелёк","Hamyanlar":"Кошельки","Hamyanlar boyınsha":"По кошелькам","Hamyanlarım":"Мои кошельки","Hamyannan almaw":"Не списывать с кошелька","Hamyannan tólew":"Оплатить из кошелька","Hamyansız":"Без кошелька","Haywanlar":"Питомцы","Hesh nárse tabılmadı":"Ничего не найдено","Hisob-faktura":"Счёт","Hisob-fakturalar":"Счета","Hobbi":"Хобби","Hududgaz Qaraqalpaqstan":"Худудгаз Каракалпакстан","Hámme ushın baslanǵısh tarif":"Базовый тариф для всех","Hámmesi":"Все","Hámmesi kózińizdiń aldında":"Всё у вас перед глазами","Hámmesin baslanǵısh halına qaytarıw":"Сбросить всё","Hápte":"Неделя","Hápte ritmi":"Ритм недели","Hápte sayın":"Еженедельно","Hápte, ay yamasa jıl boyınsha salıstırıń hám kategoriyalarǵa limit qoyıń.":"Сравнивайте по неделям, месяцам или годам и ставьте лимиты на категории.","Hár 30 kúnde tarif hamyannan avtomat jańalanadı":"Тариф продлевается из кошелька каждые 30 дней","Hár adamǵa":"На человека","Hár ayda":"Ежемесячно","Hár ayda qosıw":"Добавлять каждый месяц","Házir bar":"Сейчас есть","Házirgi tarifińiz":"Ваш текущий тариф","Házirgi versiyada tólemler demo rejimde isleydi: pul alınbaydı, biraq tólem shıǵım retinde esapqa jazıladı.":"В текущей версии платежи работают в демо-режиме: деньги не списываются, но платёж записывается как расход.","Házirgi waqıtta qansha qarjıńız bar?":"Сколько у вас сейчас денег?","Iconlar":"Иконки","Ijara dáramatları":"Доход от аренды","Ijara haqı":"Аренда","Ikonka":"Иконка","Internet":"Интернет","Investiciya":"Инвестиции","Ipoteka bank":"Ипотека банк","Ishimlik suw":"Питьевая вода","Ishimlikler":"Напитки","Iyul":"Июль","Iyun":"Июнь","Izlew":"Поиск","Izlew: kategoriya, eskertpe, muǵdar":"Поиск: категория, заметка, сумма","Izoh":"Комментарий","Izoh jazıń":"Напишите комментарий","JPG yamasa PNG. Súwret qurılmańızda saqlanadı.":"JPG или PNG. Фото хранится на вашем устройстве.","Jabıldı":"Закрыт","Jabıw":"Закрыть","Janılǵı hám gaz":"Топливо и газ","Jaqsı":"Хорошо","Jaqtı":"Светлая","Jaqın tólemler":"Ближайшие платежи","Jaratılǵan sáne":"Дата создания","Jaratıw":"Создать","Jaratıwshı":"Создатель","Jazılıwlar":"Подписки","Jazıń: taksi 25 mıń...":"Напишите: такси 25 тыс...","Jańa":"Новый","Jańa PIN-kod":"Новый PIN-код","Jańa akkaunt jaratıń — bir minut waqıt aladı":"Создайте аккаунт — это займёт минуту","Jańa balans":"Новый баланс","Jańa balans ashıladı":"Будет создан новый баланс","Jańa gruppa":"Новая группа","Jańa hamyan":"Новый кошелёк","Jańa hisob-faktura":"Новый счёт","Jańa kategoriya":"Новая категория","Jańa maqset":"Новая цель","Jańa noutbuk":"Новый ноутбук","Jańa operaciya":"Новая операция","Jańa parol":"Новый пароль","Jańa parol qoyıń":"Задайте новый пароль","Jańa paroldi qaytalań":"Повторите новый пароль","Jańa qarız":"Новый долг","Jańa turaqlı tólem":"Новый регулярный платёж","Jeke kategoriyalar":"Личные категории","Jeke kútim":"Личный уход","Jeke qárejetler":"Личные расходы","Jer":"Земля","Jer salıǵı":"Земельный налог","Jinaq":"Накопления","Jinaq dárejesi":"Уровень накоплений","Jinaq kalkulyatorı":"Калькулятор накоплений","Jinaq maqsetleri":"Цели накоплений","Jol kira (avtobus)":"Проезд (автобус)","Ju":"Пт","Juma":"Пятница","Jumsaldı":"Потрачено","Jámi":"Итого","Jámi jumsaldı":"Всего потрачено","Jámi kirim":"Всего доходов","Jámi shıǵım":"Всего расходов","Jámi summa":"Общая сумма","Jámi tólem":"Всего к оплате","Járdem hám sorawlar":"Помощь и вопросы","Járiymalar":"Штрафы","Jıl":"Год","Jıllıq %":"Годовой %","Jıllıq procent":"Годовая ставка","Jılıw hám ıssı suw":"Отопление и горячая вода","Jılıw támiynatı":"Теплоснабжение","Jıynaq hám investiciya":"Накопления и инвестиции","Jıynaw":"Копить","Kafe":"Кафе","Kalendar":"Календарь","Kalkulyator":"Калькулятор","Kalkulyator tuymelerinde + hám − ne ushın?":"Зачем + и − на клавиатуре?","Karta nomeriniń aqırı (májbúriy emes)":"Последние цифры карты (необязательно)","Kategoriya":"Категория","Kategoriya limitleri":"Лимиты категорий","Kategoriya qosıw":"Добавить категорию","Kategoriya saylaw":"Выбор категории","Kategoriyalar":"Категории","Kategoriyalar boyınsha":"По категориям","Kategoriyalarıńızdı óz gruppańızǵa jıynań":"Соберите категории в свою группу","Kategoriyanı óshiriw":"Удалить категорию","Kategoriyanı ózgertiw":"Изменить категорию","Keminde 6 belgi":"Минимум 6 символов","Keminde bir balans qalıwı kerek":"Должен остаться хотя бы один баланс","Keminde bir kategoriya qalıwı kerek":"Должна остаться хотя бы одна категория","Kerekli summa":"Нужная сумма","Keshbek hám qaytım":"Кэшбэк и возвраты","Keshe":"Вчера","Kewil ashıw":"Развлечения","Kewilli stikerler":"Весёлые стикеры","Keyingi tólem":"Следующий платёж","Keyinirek":"Позже","Keńes alıw":"Получить совет","Keńes ber":"Дай совет","Keńes beriw ushın aldın bir neshe operaciya qosıń.":"Добавьте несколько операций, чтобы я мог дать совет.","Kim qarızdar?":"Кто кому должен?","Kimge / kimnen":"Кому / от кого","Kimge qarız berdińiz yamasa kimnen aldıńız — bárin jazıń. Qaytarıw múddeti jaqınlasqanda eskertemiz.":"Записывайте, кому вы дали в долг и у кого заняли. Напомним, когда подойдёт срок.","Kirim":"Доход","Kirim hám shıǵım":"Доходы и расходы","Kirim qosıldı":"Доход добавлен","Kirim summası":"Сумма дохода","Kirim-shıǵımıńız endi bir qolda":"Доходы и расходы теперь под рукой","Kirimnen artıq jumsaldı":"Потрачено больше дохода","Kiriw":"Войти","Kiyim-kenshek":"Одежда","Kiyim-keshek":"Одежда","Klient":"Клиент","Klientler":"Клиенты","Klientler hám hisob-fakturalar":"Клиенты и счета","Klientlerge hisob-faktura jazıń, tólengende ol avtomat kirimge túsedi.":"Выставляйте счета клиентам — после оплаты они автоматически станут доходом.","Kodtı qayta jiberiw":"Отправить код ещё раз","Kofe":"Кофе","Komissiya":"Комиссия","Komissiya: 0%":"Комиссия: 0%","Kommunal":"Коммуналка","Kommunal tólemler":"Коммунальные платежи","Kommunal tólewler":"Коммунальные платежи","Kompaniya hám baylanıs adamın kirgiziń":"Введите компанию и контактное лицо","Kompaniya yamasa brend atı":"Название компании или бренда","Kompyuter":"Компьютер","Kopilka toldı":"Копилка заполнена","Kopilka toldı!":"Копилка заполнена!","Kopilka toldı! Maqsetke jettińiz":"Копилка заполнена! Цель достигнута","Kopilkaǵa aqsha salıw":"Положить в копилку","Kóylek":"Платье","Kredit hám nasiya":"Кредит и рассрочка","Kredit kalkulyatorı":"Кредитный калькулятор","Kredit muǵdarı":"Сумма кредита","Kredit tólew":"Платёж по кредиту","Kurs":"Курс","Kurslar demo maqsetinde kórsetilgen, bank kursı menen ayırmashılıǵı bolıwı múmkin":"Курсы показаны для примера и могут отличаться от банковских","Kurslar jańalanıp atır":"Курсы обновляются","KÓRINIS":"ВНЕШНИЙ ВИД","Kórinis":"Внешний вид","Kórip shıǵılmaqta":"На рассмотрении","Kóshirildi":"Скопировано","Kóshiriw":"Копировать","Kún / Ay / Jıl":"День / Месяц / Год","Kún qaldı":"Дней осталось","Kúnine":"В день","Kúnine 30":"30 в день","Kúnler":"Дни","Kúnler boyınsha esap":"Отчёт по дням","Kúnlik limit":"Дневной лимит","Kútilip atır":"Ожидается","Kútilip atırǵan esaplar":"Ожидаемые платежи","Kútilmegen qárejetler":"Непредвиденные расходы","Limit":"Лимит","Limit ornatılmaǵan":"Лимит не задан","Limit ornatıw":"Задать лимит","Limit orınlanıwı":"Исполнение лимита","Limit summasın kiritiń":"Введите сумму лимита","Limitlerdi sazlaw":"Настроить лимиты","Logistika":"Логистика","MAX aktivlestirildi!":"MAX активирован!","MAX satıp alıw":"Купить MAX","MAX tarifin biykarlaw":"Отменить тариф MAX","MAX tarifinde ashıladı":"Доступно в тарифе MAX","MB kursı":"Курс ЦБ","Maqset":"Цель","Maqset atı":"Название цели","Maqset hám qarızlar":"Цели и долги","Maqset jaratıw":"Создать цель","Maqset qosıń":"Добавьте цель","Maqset qoyıń, shiyshe kopilkaǵa tıyın salıń hám hár ay qansha jıynaw kerekligin biliń.":"Ставьте цели, кладите монетки в стеклянную копилку и узнайте, сколько откладывать в месяц.","Maqsetke jettińiz":"Цель достигнута","Maqsetke jettińiz!":"Цель достигнута!","Maqsetke qosıw":"Пополнить цель","Maqsetler":"Цели","Maqsetlerim":"Мои цели","Maqsetli qárejetler":"Целевые расходы","Maqsetti óshiriw":"Удалить цель","Marketing":"Маркетинг","Mart":"Март","Mashina qárejetleri":"Расходы на авто","May":"Май","Maǵan qaytadı":"Мне вернут","Maǵan qaytaradı":"Мне вернут","Maǵan qaytarılıwı kerek":"Мне должны вернуть","Maǵlıwmat joq":"Нет данных","Maǵlıwmatlar":"Данные","Maǵlıwmatlar tiklendi":"Данные восстановлены","Maǵlıwmatlarım qayerde saqlanadı?":"Где хранятся мои данные?","Mektep":"Школа","Men E-esap AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.":"Я E-esap AI. Напишите операцию простыми словами или задайте вопрос о финансах.","Men aldım":"Я взял","Men berdim":"Я дал","Men qaytaraman":"Я верну","Men qaytarıwım kerek":"Я должен вернуть","Meniń arzalarım":"Мои заявки","Meniń gruppalarım":"Мои группы","Mikrofon islemedi. Tekst penen jazıń.":"Микрофон не сработал. Напишите текстом.","Miynet dáramatları":"Трудовые доходы","Mobil baylanıs":"Мобильная связь","Muzıka hám kino":"Музыка и кино","Muǵdar":"Сумма","Muǵdar hám valyutanı kiritiń":"Введите сумму и валюту","Muǵdardı kirgiziwde esaplaw múmkin: mısalı 12000+8500 — nátiyje avtomat túrde esaplanadı.":"При вводе суммы можно считать: например 12000+8500 — результат посчитается сам.","Muǵdardı kirgiziń":"Введите сумму","Mámleket":"Государство","Mámleket tólewleri":"Госплатежи","Múddet aqırında":"В конце срока","Múddeti":"Срок","Múddeti (ay)":"Срок (мес.)","Múddetsiz":"Бессрочно","Múlk salıǵı":"Налог на имущество","Mısalı":"Например","Mısalı: Aral Market":"Например: Aral Market","Mısalı: Azamat":"Например: Азамат","Mısalı: Balalar":"Например: Дети","Mısalı: Damir":"Например: Дамир","Mısalı: Darmenbaevich":"Например: Дарменбаевич","Mısalı: Internet":"Например: Интернет","Mısalı: Mashina":"Например: Машина","Mısalı: Qonarbaev":"Например: Конарбаев","Mısalı: Uzcard":"Например: Uzcard","Mısalı: bazar":"Например: рынок","Naq aqsha / basqa":"Наличные / другое","Naqd pul":"Наличные","Nan hám sút":"Хлеб и молоко","Neden":"Из чего","Nege":"На что","Neshe ayda":"За сколько месяцев","Noy":"Ноя","Noyabr":"Ноябрь","Nusqalandı":"Скопировано","Nusqalaw":"Копировать","Nátiyje":"Результат","Ofis":"Офис","Oktyabr":"Октябрь","Onlayn":"Онлайн","Onlayn xaridlar":"Онлайн-покупки","Operaciya jazıw":"Записать операцию","Operaciya qaytarıldı":"Операция восстановлена","Operaciya óshirildi":"Операция удалена","Operaciyalardı qosıń — men olardı analiz qılıp, keńes beremen.":"Добавляйте операции — я проанализирую их и дам совет.","Operaciyalardı tazalaw":"Очистить операции","Operaciyanı biykarlaw":"Отменить операцию","Operaciyanı ózgertiw":"Изменить операцию","Operator tabılmadı":"Оператор не найден","Oqıw hám rawajlanıw":"Учёба и развитие","Oqıw tólemi":"Оплата учёбы","Ornatılmaǵan":"Не задано","Ortadaǵı túyme — AI kómekshi. «Keshe 50 mıń taksi» dep jazıń yamasa aytıń, ol operaciyanı ózi qosadı hám keńes beredi.":"Кнопка в центре — AI-помощник. Напишите или скажите «вчера такси 50 тыс.» — он сам добавит операцию и даст совет.","Ortasha":"Средний","Ortasha kúnlik":"В среднем в день","Ortashadan kóp":"Выше среднего","Oyın":"Игра","Oyın-kúlki":"Развлечения","Oyınlar hám servisler":"Игры и сервисы","Oyınshıqlar":"Игрушки","PIN-kod":"PIN-код","PIN-kodlar sáykes kelmedi":"PIN-коды не совпадают","PIN-kodtı kirgiziń":"Введите PIN-код","PIN-kodtı qaytalań":"Повторите PIN-код","PIN-kodtı tiklew ushın: Profil → Maǵlıwmatlar → baslanǵısh halına qaytarıw. Házir ápiwayı jol: brauzer maǵlıwmatların tazalań.":"Чтобы сбросить PIN: Профиль → Данные → сброс. Простой способ сейчас — очистить данные браузера.","PIN-kodtı umıttım":"Забыл PIN-код","PIN-kodtı óshiriwdi qáleysiz be?":"Отключить PIN-код?","PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz":"В PRO до 5 кошельков, в MAX без ограничений","PRO ǵa ótiw":"Перейти на PRO","PROGRAMMA STILI":"СТИЛЬ ПРИЛОЖЕНИЯ","Parol":"Пароль","Parol jańalandı":"Пароль обновлён","Parol keminde 6 belgiden turıwı kerek":"Пароль должен быть не короче 6 символов","Parol qáte":"Неверный пароль","Paroldi kiritiń":"Введите пароль","Paroldi qayta kiritiń":"Введите пароль ещё раз","Paroldi qaytalań":"Повторите пароль","Paroldi tiklew":"Восстановление пароля","Paroldi umıttıńız ba?":"Забыли пароль?","Paroller sáykes kelmeydi":"Пароли не совпадают","Paydalanıwshı":"Пользователь","Pi":"Чт","Piyshembi":"Четверг","Plastik karta":"Банковская карта","Procent dáramatı":"Процентный доход","Procent kalkulyatorı":"Калькулятор процентов","Procent túri":"Тип ставки","Profil":"Профиль","Profil maǵlıwmatları":"Данные профиля","Profil → Programma stili bóliminde Classic yamasa Liquid Glass stilin, Jaqtı, Qarańǵı yamasa Avtomat temanı saylań.":"В Профиль → Стиль приложения выберите Classic или Liquid Glass и тему: светлую, тёмную или авто.","Prognoz":"Прогноз","Programmalar":"Программы","Provayder":"Провайдер","Pul awdarıw":"Денежный перевод","Push-xabarlama":"Push-уведомления","QARJÍ":"ФИНАНСЫ","QOSÍMSHA QURALLAR":"ДОПОЛНИТЕЛЬНЫЕ ИНСТРУМЕНТЫ","Qabıl etildi":"Принято","Qaldı":"Осталось","Qaldıq":"Остаток","Qamsızlandırıw":"Страхование","Qansha jıynaw kerek":"Сколько нужно накопить","Qaraqalpaqsha":"Каракалпакский","Qarańǵı":"Тёмная","Qarjı":"Финансы","Qarjı densawlıǵı balı":"Балл финансового здоровья","Qarjı planı":"Финансовый план","Qarjı qurallari":"Финансовые инструменты","Qarjı quralları":"Финансовые инструменты","Qarjılarıńız qay jerge ketip atır":"Куда уходят ваши деньги","Qarjıńız qayaqqa ketip atırǵanın kategoriyalar boyınsha kóriń. Kirim jasıl, shıǵım qızıl reńde.":"Смотрите по категориям, куда уходят деньги. Доходы — зелёным, расходы — красным.","Qarjıńızdı tolıq qadaǵalań":"Полный контроль над финансами","Qarız alıw hám beriw":"Взять и дать в долг","Qarız bergenińiz yamasa alǵanıńız bolsa, jazıp qoyıń":"Если вы дали или взяли в долг — запишите","Qarız dápteri":"Книга долгов","Qarız jabıldı":"Долг закрыт","Qarız jaratıldı":"Долг создан","Qarız jaratıw":"Создать долг","Qarız joq":"Долгов нет","Qarız qaytarıladı":"Долг будет возвращён","Qarız qosıw":"Добавить долг","Qarızdarlıq":"Задолженность","Qarızdarlıqtı tekseriw":"Проверить задолженность","Qarızdı jabıw ushın":"Чтобы закрыть долг","Qarızdı tólew":"Погасить долг","Qarızlar":"Долги","Qashannan":"С какого числа","Qashanǵa shekem":"До какого числа","Qaysı balansqa":"На какой баланс","Qaysı balanstan":"С какого баланса","Qaysı hamyannan alınadı":"С какого кошелька списать","Qaysı hamyanǵa túsedi":"На какой кошелёк зачислить","Qaysı valyutaǵa":"В какую валюту","Qayta jiberiw":"Отправить снова","Qaytadan kiriw ushın telefon nomeri hám parol kerek boladı.":"Для повторного входа понадобятся номер телефона и пароль.","Qaytarıldı":"Возвращено","Qaytarıw":"Вернуть","Qaytarıw múddeti":"Срок возврата","Qaytarıw múddeti — búgin":"Срок возврата — сегодня","Qaytarıw sánesi":"Дата возврата","Qayırlı kesh":"Добрый вечер","Qayırlı kún":"Добрый день","Qayırlı tań":"Доброе утро","Qayırlı tún":"Доброй ночи","Qayırqomlıq":"Благотворительность","Qazaq teńgesi":"Казахстанский тенге","Qolıńızdaǵı naqd pul yamasa kartadaǵı summanı kiritiń — esap usı jerden baslanadı. Keyin ózgertiwge boladı.":"Введите сумму наличных или на карте — учёт начнётся с неё. Потом её можно изменить.","Qonarbaev Damir":"Конарбаев Дамир","Qosılǵan":"Добавлено","Qosılǵanda":"При добавлении","Qosımsha haqqında":"О приложении","Qosımsha maǵlıwmat":"Дополнительная информация","Qosımshanı bahalaw":"Оценить приложение","Qosımshanıń tiykarǵı bólimlerin birge kórip shıǵayıq ba? Bar bolǵanı 30 sekund.":"Посмотрим вместе основные разделы приложения? Всего 30 секунд.","Qosımshaǵa kiriw":"Войти в приложение","Qosıw":"Добавить","Qońıraw etiw":"Позвонить","Qurallar, kurslar, maqset hám qarızlar":"Инструменты, курсы, цели и долги","QÁWIPSIZLIK":"БЕЗОПАСНОСТЬ","Qáte format. JSON tekstti tekseriń":"Неверный формат. Проверьте текст JSON","Qırǵız somı":"Киргизский сом","Qıtay yuanı":"Китайский юань","Raxmet!":"Спасибо!","Reklama":"Реклама","Reklama beriw":"Разместить рекламу","Reklama haqqında":"О рекламе","Reklama ornı":"Рекламное место","Reklama túri":"Тип рекламы","Reklama ushın arza":"Заявка на рекламу","Reklamaǵa qaytıw":"Вернуться к рекламе","Rezerv nusqa":"Резервная копия","Rezerv nusqa (JSON)":"Резервная копия (JSON)","Reń":"Цвет","Reńi":"Цвет","Reńli sızıq belgiler":"Цветные линейные иконки","Rossiya rublı":"Российский рубль","Rubl":"Рубль","SMS kod jiberildi":"SMS-код отправлен","SMS kod jiberiw":"Отправить SMS-код","SMS kod qayta jiberildi":"SMS-код отправлен повторно","SMS kodtı kiritiń":"Введите SMS-код","SMS xabarlama":"SMS-уведомление","Saqawat qorı":"Благотворительный фонд","Salon hám gózzallıq":"Салоны и красота","Salıqlar":"Налоги","Salıstırıw":"Сравнение","Salıw":"Положить","Sanı":"Количество","Sap jaǵday":"Чистая позиция","Saqlandı":"Сохранено","Saqlaw":"Сохранить","Saqlaw hám kiriw":"Сохранить и войти","Saqlaw: tómendegi tekstti nusqalap, qáwipsiz jerde saqlań":"Сохранение: скопируйте текст ниже и храните в надёжном месте","Sawda dáramatları":"Доходы от торговли","Sawǵa":"Подарок","Sawǵa hám sıylıqlar":"Подарки и призы","Sawǵalar":"Подарки","Sayaxat":"Путешествия","Saylaw":"Выбрать","Saytqa ótiw":"Перейти на сайт","Sazlawlar saqlanadı, jazıwlar óshiriledi":"Настройки сохранятся, записи удалятся","Sentyabr":"Сентябрь","Sh":"Сб","Shay puli":"Чаевые","Shańaraq":"Семья","Shańaraq, balalar, úy":"Семья, дети, дом","Sheksiz":"Без ограничений","Shembi":"Суббота","Shiyshe kopilka ashıń":"Откройте стеклянную копилку","Shıǵım":"Расход","Shıǵım bolǵan":"Были расходы","Shıǵım joq":"Расходов нет","Shıǵım qosıldı":"Расход добавлен","Shıǵım summası":"Сумма расхода","Shıǵındı shıǵarıw":"Вывоз мусора","Shıǵıw":"Выйти","Si":"Вт","Siyshembi":"Вторник","Siz qaytaratuǵın kóbirek":"Вы должны больше","Siz qosqanıńız":"Добавлено вами","Sizden alınǵan qarız":"Долг, взятый у вас","Sizden alǵan qarızımdı umıtpadım":"Я не забыл о долге вам","Sizge berilgen qarız":"Долг, выданный вам","Sizge qaytatuǵın kóbirek":"Вам должны больше","Skidka":"Скидка","Skidka kalkulyatorı":"Калькулятор скидок","Sońǵı esabatlar":"Последние записи","Sport":"Спорт","Sport zal":"Спортзал","Statistika":"Статистика","Statistika hám byudjet":"Статистика и бюджет","Statistika, limitler, valyuta kursları hám qarjı esaplawıshları — aqıllı sheshimler ushın.":"Статистика, лимиты, курсы валют и финансовые калькуляторы — для умных решений.","Status":"Статус","Statusıńız BUSINESS ke ózgerdi":"Ваш статус изменён на BUSINESS","Stil":"Стиль","Stil hám temanı qalay ózgertemen?":"Как сменить стиль и тему?","Summa":"Сумма","Summa (UZS)":"Сумма (UZS)","Summalar bulıńǵır kórinedi":"Суммы размыты","Summanı kiritiń":"Введите сумму","Suw támiynatı":"Водоснабжение","Svet hám gaz":"Свет и газ","Swm":"Сум","Sá":"Ср","Sálem":"Привет","Sáne":"Дата","Sáneni saylań":"Выберите дату","Sárshembi":"Среда","Súwret júklew":"Загрузить фото","Súwretti oqıw múmkin bolmadı":"Не удалось прочитать фото","Sırtta awqatlanıw":"Еда вне дома","TIL":"ЯЗЫК","Tabılmadı":"Не найдено","Taksi":"Такси","Taksi 25 mıń":"Такси 25 тыс.","Tarif jańalanıwı":"Продление тарифа","Tarifler":"Тарифы","Tastıyıqlaw":"Подтвердить","Tayın":"Готово","Tayın! Endi E-esap tan tolıq paydalanıń":"Готово! Пользуйтесь E-esap на полную","Taza aymaq":"Чистый регион","Tazalandı":"Очищено","Tazalaw":"Очистить","Tek súwret faylın saylań":"Выберите только изображение","Tekstti belgilep, nusqalań":"Выделите и скопируйте текст","Telefon":"Телефон","Telefon balansı":"Баланс телефона","Telefon nomeri":"Номер телефона","Telefon nomeri kórsetilmegen":"Номер телефона не указан","Telefon nomerin qosıw":"Добавить номер телефона","Telefon nomerin tolıq kirgiziń":"Введите номер полностью","Telefon nomerin tolıq kiritiń":"Введите номер полностью","Telefon nomerińizdi kiritiń — oǵan tastıyıqlaw kodı SMS arqalı jiberiledi":"Введите номер телефона — на него придёт SMS-код подтверждения","Televidenie":"Телевидение","Tez qosıw":"Быстрое добавление","Tez qosıw shablonları":"Шаблоны быстрого добавления","Teńge":"Тенге","Tiklew":"Восстановить","Tiklew: saqlanǵan tekstti bul jerge qoyıń":"Восстановление: вставьте сохранённый текст сюда","Til":"Язык","Tiykarǵı etiw":"Сделать основной","Tiykarǵı maqset":"Главная цель","Tolıǵıraq":"Подробнее","Transport":"Транспорт","Transport kartası":"Транспортная карта","Turaq jay":"Жильё","Turaqlı tólem":"Регулярный платёж","Turaqlı tólemler":"Регулярные платежи","Turaqlı tólemler joq":"Регулярных платежей нет","Turmıs":"Быт","Turmıs tárzi":"Образ жизни","Tuwılǵan kún sawǵası":"Подарок на день рождения","Tuwılǵan sáne":"Дата рождения","Tuwılǵan sáneni saylań":"Выберите дату рождения","Tábiyiy gaz":"Природный газ","Táriyp":"Описание","Tártibin ózgertiw ushın ≡ belgisin súyreń":"Перетащите ≡, чтобы изменить порядок","Tóledim":"Оплатил","Tólem bar":"Есть платёж","Tólem jazıldı":"Платёж записан","Tólem kalendarı":"Календарь платежей","Tólem qosıw":"Добавить платёж","Tólem ámelge asırıldı":"Платёж выполнен","Tólemdi belgilew":"Отметить платёж","Tólemler hám qurallar":"Платежи и инструменты","Tólemler tarixı":"История платежей","Tólendi":"Оплачено","Tólenetuǵın baha":"Цена к оплате","Tólengen":"Оплачено","Tólew":"Оплатить","Tólew múddeti":"Срок оплаты","Tólew ushın súyreń":"Проведите для оплаты","Tólew usılı":"Способ оплаты","Túri":"Тип","Túrk lirası":"Турецкая лира","Túsetuǵın balans":"Баланс зачисления","Túslik":"Обед","Túsinbedim. Mısallar:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «keshe bazar 180 000 naq»\n• «bul ay qansha jumsadım?»\n• «keńes ber»":"Не понял. Примеры:\n• «такси 25 тыс.»\n• «зарплата 6,5 млн пришла»\n• «вчера рынок 180 000 наличными»\n• «сколько я потратил в этом месяце?»\n• «дай совет»","Túymeler basılǵanda sulıw dawıslar":"Приятные звуки при нажатии","Ulıwma":"Общее","Ulıwma balans":"Общий баланс","Universitet kontraktı":"Оплата контракта вуза","Usı ay":"Этот месяц","Usı balanstan aylıq shıǵım shegarası":"Месячный предел расходов с этого баланса","Valyuta":"Валюта","Valyuta almastırıldı":"Валюта обменена","Valyuta almastırıw":"Обмен валюты","Valyuta almastırıw (obmen)":"Обмен валюты","Valyuta ayırbaslaw":"Обмен валюты","Valyuta konvertorı":"Конвертер валют","Valyuta konvertorı, kredit hám depozit kalkulyatorları, Excel eksport — barlıǵı bir jerde.":"Конвертер валют, кредитный и депозитный калькуляторы, экспорт в Excel — всё в одном месте.","Valyuta kursları":"Курсы валют","Versiya":"Версия","Vidjet sazlamaları":"Настройка виджетов","Xabarlamalar":"Уведомления","Xaridlar":"Покупки","Xosh keldińiz!":"Добро пожаловать!","Xalq banki":"Народный банк","Xızmetkerler":"Сотрудники","Xızmetler":"Сервисы","Xızmetler bóliminde":"В разделе «Сервисы»","Xızmetler bólimindegi tólemler haqıyqıy ma?":"Платежи в разделе «Сервисы» настоящие?","Xızmetler hám kalkulyatorlar":"Сервисы и калькуляторы","Xızmetti izlew":"Поиск услуги","YHXB (GAI) járiymaları":"Штрафы ГАИ","Yanvar":"Январь","aktiv qarız":"активных долгов","aldınǵı":"пред.","aldınǵı dáwirge salıstırǵanda":"по сравнению с прошлым периодом","asıp ketti":"превышено","ay":"мес.","ay orınlandı":"мес. выполнено","aylıq limitten asıp ketti":"превышен месячный лимит","ayına":"в месяц","balansı":"баланс","basqa":"другое","bugin":"сегодня","bugin tólew kerek":"нужно оплатить сегодня","búgin":"сегодня","dana":"шт.","eske salıw jiberiń":"отправьте напоминание","ga qarızıńızdıń múddeti ótti":"— срок вашего долга истёк","hamyan":"кошелёк","jańa":"новый","jetispeydi":"не хватает","joq":"нет","jumsaldı":"потрачено","jumsalǵan":"потрачено","jámi":"всего","jıl":"г.","jıynań":"копите","kategoriya":"категорий","keyingi":"след.","kirim":"доход","kirim − shıǵım":"доход − расход","komissiya":"комиссия","kún":"дн.","kún aldın ótti":"дн. назад прошло","kún keshikti":"дн. просрочено","kún qaldı":"дн. осталось","kún ótti":"дн. прошло","kúni alǵan qarızıńızdı eske salaman":"— напоминаю о долге, взятом в этот день","kúnnen keyin":"дн. спустя","kútilmekte...":"ожидается...","limit":"лимит","limit asıldı":"лимит превышен","limittiń":"лимита","maqset":"цель","maqsetke qosıldı":"добавлено к цели","maǵan qaytaradı":"вернёт мне","men qaytaraman":"я верну","mln":"млн","mlrd":"млрд","muǵdarı":"сумма","múddeti ótti":"просрочено","múddetsiz":"бессрочно","mıń":"тыс.","nomeri tastıyıqlandı. Endi jańa parol oylap tabıń.":"— номер подтверждён. Теперь придумайте новый пароль.","nomerine 5 xanalı tastıyıqlaw kodı jiberildi":"— на этот номер отправлен 5-значный код","operaciya":"операций","operaciya joq":"нет операций","provayder":"провайдер","qaldı":"осталось","qarız":"долг","qarızdı qaytarıw múddeti":"срок возврата долга","qarızdı tólew múddeti":"срок погашения долга","qarızınıń múddeti ótti":"— срок долга истёк","shıǵım":"расход","shıǵım, keshegi kúnge salıstırǵanda":"расходы по сравнению со вчера","shıǵım, ótken ayǵa salıstırǵanda":"расходы по сравнению с прошлым месяцем","swm":"сум","sáne":"числа","tólem":"платёж","tólendi":"оплачено","«+» túymesi menen jańa balans ashıń: naqd pul, plastik karta yamasa dollar, rubl, teńge. Kartanı basıp tursańız — ótkeriw, obmen hám redaktorlaw.":"Кнопкой «+» откройте новый баланс: наличные, карта или доллар, рубль, тенге. Удерживайте карту — перевод, обмен и редактирование.","Ájayıp":"Отлично","Ákesiniń atı":"Отчество","Ármanıńızǵa qádem-qádem":"К мечте шаг за шагом","Ármanıńızǵa shiyshe kopilka ashıń: summa hám múddet qoyıń, hár ay qansha salıw kerekligin E-esap ózi esaplaydı.":"Откройте стеклянную копилку для мечты: задайте сумму и срок, а E-esap посчитает, сколько откладывать в месяц.","Ónim yamasa xızmetińiz haqqında qısqasha":"Кратко о вашем товаре или услуге","Óshirilgen":"Выключено","Óshiriw":"Удалить","Ótkerildi":"Переведено","Ótkerip jiberiw":"Пропустить","Ótkeriw":"Перевести","Ótkeriw ushın jáne bir balans kerek":"Для перевода нужен ещё один баланс","Ótkizip jiberiw":"Пропустить","Ózińizge qolaylı tildi saylań: qaraqalpaqsha, ózbekshe, qazaqsha, ruscha yamasa inglisshe.":"Выберите удобный язык: каракалпакский, узбекский, казахский, русский или английский.","Úlken jazıw hám anıq tuymeler":"Крупный текст и чёткие кнопки","Úlkenler ushın rejim":"Режим для пожилых","Úlkenler ushın rejim ne?":"Что такое режим для пожилых?","Únemlendi":"Сэкономлено","Únemleysiz":"Сэкономите","Úskeneler":"Оборудование","Úy buyımları":"Товары для дома","Úy-jay hám kommunal":"Жильё и коммуналка","Úy-jay qárejetleri":"Расходы на жильё","ǵa shekem qaytaraman. Raxmet!":"— верну до этой даты. Спасибо!","5 xanalı kodtı kiritiń":"Введите 5-значный код","Aldınǵı kún":"Предыдущий день","Arza qabıl etildi":"Заявка принята","Arza qaldırıw":"Оставить заявку","Ay juwmaǵı bonusı":"Бонус по итогам месяца","Dawıs":"Звук","1. Eń kóp shıǵım — «Kiyim-keshek» (29%). Onı 15% qısqartsańız, ayına 45 mıń swm únemleysiz.":"1. Больше всего расходов — «Одежда» (29%). Сократив на 15%, сэкономите 45 тыс. сум в месяц.","2. Ájayıp! Kirimińizdiń 48% ın saqlap atırsız.":"2. Отлично! Вы сохраняете 48% дохода.","4. 24 saat qaǵıydası: kútilmegen úlken satıp alıwdı bir kúnge keyinge qaldırıń.":"4. Правило 24 часов: отложите спонтанную крупную покупку на сутки.","Gúlnara":"Гульнара","Humans":"Humans","Aurora stili hám widgetler":"Стиль Aurora и виджеты","Aurora stilin qosıw":"Включить стиль Aurora","BUSINESS statusı":"Статус BUSINESS","BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.":"Статус BUSINESS, безлимитный AI, бизнес-панель и стиль Aurora — всё в одном тарифе.","MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.":"Возможности MAX, стиль Aurora и статус BUSINESS будут отключены. Оплата не возвращается.","Tildi saylań":"Выберите язык","Akkaunttı óshiriw":"Удалить аккаунт","Akkauntıńız hám ondaǵı barlıq maǵlıwmatlar (balanslar, operaciyalar, maqsetler, qarızlar) biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Ваш аккаунт и все данные (балансы, операции, цели, долги) будут удалены навсегда. Это нельзя отменить.","Anıq pa?":"Вы уверены?","Bul sońǵı eskertiw. Akkaunt hám barlıq maǵlıwmatlar qayta tiklenbeydi.":"Это последнее предупреждение. Аккаунт и данные восстановить нельзя.","Biraqola óshiriw":"Удалить навсегда","Balans, maqset, qarız, AI kómekshi hám statistika — bárin qısqa sayaxatta birge úyrenip shıǵayıq. Qádem-qádem kórsetemen ✨":"Баланс, цели, долги, AI-помощник и статистика — изучим всё вместе в коротком путешествии. Покажу шаг за шагом ✨","Úyrenip shıǵıw":"Изучить","Erteń":"Завтра","Ay qaldı":"Месяцев осталось","AKKAUNT":"АККАУНТ","Kirilgen nomer":"Номер входа","Maǵlıwmatlar saqlanadı":"Данные сохранятся","Barlıq maǵlıwmatlar biraqola óshiriledi":"Все данные удаляются навсегда","Qosımsha maǵan unamadı":"Приложение не понравилось","Kerekli múmkinshilik jetispeydi":"Не хватает нужной функции","Basqa qosımshaǵa ótemen":"Перехожу в другое приложение","Jańa akkaunt ashıwım kerek":"Нужно создать новый аккаунт","Basqa sebep":"Другая причина","Ketiwińizge ókinemiz 😔 Iltimas, sebebin aytıń — bul E-esap tı jaqsılawǵa járdem beredi.":"Жаль, что вы уходите 😔 Расскажите причину — это поможет улучшить E-esap.","Sebebin jazıń...":"Напишите причину...","Barlıq balanslar, operaciyalar, maqsetler hám qarızlar biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Все балансы, операции, цели и долги будут удалены навсегда. Это нельзя отменить.","Qosımsha boyınsha sorawlarǵa juwap":"Ответы на вопросы о приложении","24/7 kómek":"Помощь 24/7","Qalay járdem bere alaman?":"Чем могу помочь?","E-esap qalay isleytuǵını, qaysı bólim ne ushın ekeni — qálegen sorawıńızdı beriń. Tómendegi temalardan da saylawıńızǵa boladı 👇":"Как работает E-esap, для чего каждый раздел — задайте любой вопрос. Или выберите тему ниже 👇","Sorawıńızdı jazıń...":"Напишите вопрос...","Operaciyanı qalay qosaman?":"Как добавить операцию?","Balans hám kartalar":"Баланс и карты","Qarız jazıw":"Записать долг","AI chat qalay isleydi?":"Как работает AI-чат?","Limit qoyıw":"Задать лимит","Tildi ózgertiw":"Сменить язык","Paroldi umıttım":"Забыл пароль","Maǵlıwmatlarım qayerde?":"Где мои данные?","Operaciya qosıw":"Добавить операцию","AI chattı ashıw":"Открыть AI-чат","Statistikaǵa ótiw":"Перейти к статистике","Til saylaw":"Выбрать язык","trln":"трлн","Maqsetti redaktorlaw":"Редактировать цель","Qarızdı redaktorlaw":"Редактировать долг","Jıynalǵan summa":"Накоплено","Ózgertiw":"Изменить"},"en":{"1 ay":"1 month","1 hápte":"1 week","3 ay":"3 months","30 kún":"30 days","5 ke shekem":"up to 5","AI ay esabatı":"AI monthly report","AI ay esabatı hám qarjı balı":"AI monthly report and finance score","AI eske salıw xatı":"AI reminder message","AI eslep qaldı":"AI remembered","AI keńesi":"AI tip","AI keńesleri":"AI tips","AI kómekshi":"AI assistant","AI kómekshi qalay isleydi?":"How does the AI assistant work?","AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.":"Tap the AI button and type “taxi 25k”.","AI tuymesin basıń hám ápiwayı tilde jazıń: «taksi 25 mıń», «aylıq 6 mln keldi», «keshe bazarǵa 180 000». AI muǵdardı, kategoriyanı hám túrin ózi anıqlaydı. Sonday-aq «bul ay qansha jumsadım?» dep sorawıńız múmkin.":"Tap the AI button and write in plain words: “taxi 25k”, “salary 6M came”, “market 180,000 yesterday”. The AI detects the amount, category and type. You can also ask “how much did I spend this month?”","AI usınısı":"AI suggestion","AI ǵa ádettegi tilde jazıń yamasa aytıń: ol summa, kategoriya hám sáneni ózi anıqlaydı.":"Type or say it to the AI in plain words — it figures out the amount, category and date.","AQSH dolları":"US dollar","Abonent":"Subscriber","Adam atı":"Name","Adamlar sanı":"Number of people","Adamǵa qarız haqqında SMS jiberiw":"Send an SMS about the debt","Akkaunttan shıǵıw":"Log out","Akkauntıńız bar ma?":"Already have an account?","Akkauntıńız joq pa?":"Don't have an account?","Akkauntıńızǵa kiriń":"Sign in to your account","Aksessuar hám zergerlik":"Accessories and jewelry","Aktiv qarız joq":"No active debts","Aktiv qarız joq. Esap teń!":"No active debts. All settled!","Aktiv qarız joq. Qarjıńız tınısh!":"No active debts. Your finances are calm!","Aldın Profil → Hamyanlar bóliminde hamyan qosıń.":"First add a wallet in Profile → Wallets.","Aldın hamyan qosıń":"Add a wallet first","Aldınǵı dáwir boyınsha maǵlıwmat joq":"No data for the previous period","Almastırıldı":"Exchanged","Almastırıw":"Exchange","Alınadı":"You get","Alınǵan":"Borrowed","Alınǵanda":"When received","Alıs-berisler":"Settlements","Alıw":"Take","Analiz":"Analysis","Anıqlanbaǵan":"Undefined","Aprel":"April","Aqsha salıw":"Add money","Aqıllı byudjet (AI limitler)":"Smart budget (AI limits)","Aqıllı byudjet: AI limitlerdi usınadı":"Smart budget: AI suggests limits","Artıq tólem":"Overpayment","Arza jiberiw":"Send request","Arza nomeri":"Request number","Arzanı jiberiń, biz siz benen 24 saat ishinde baylanısamız.":"Send the request and we'll contact you within 24 hours.","Arzımaydı! Jáne ne járdem kerek?":"You're welcome! Anything else?","Ataw hám reńin ózgertiw":"Change name and color","Atı":"Name","Atı hám summanı kirgiziń":"Enter a name and amount","Atı, familiyası, telefon hám súwret":"Name, surname, phone and photo","Atın jazıń":"Enter a name","Atın kirgiziń":"Enter a name","Atıńızdı kirgiziń":"Enter your name","Atıńızdı kiritiń":"Enter your name","Avgust":"August","Avto sheship alıw":"Auto-debit","Avtomat":"Auto","Awdarma":"Transfer","Awdarma ushın keminde eki hamyan kerek":"You need at least two wallets to transfer","Awqat jetkeriw":"Food delivery","Ay":"Month","Ay aqırına prognoz":"End-of-month forecast","Ay kúni (1–28)":"Day of month (1–28)","Aylıq":"Salary","Aylıq %":"Monthly %","Aylıq 6,5 mln keldi":"Salary 6.5M received","Aylıq hám avans":"Salary and advance","Aylıq limitler":"Monthly limits","Aylıq procent":"Monthly rate","Aylıq tólem":"Monthly payment","Aylıq ulıwma byudjet":"Total monthly budget","Aymaqlıq elektr tarmaqları":"Regional power grid","Aytıń — E-esap ózi jazadı":"Just say it — E-esap writes it down","Ayına":"Per month","Ayına jıynaw kerek":"Save per month","Az":"Low","Azıq-awqat":"Groceries","BASQA":"OTHER","Baha":"Rating","Bala-baqsha":"Kindergarten","Balalar":"Kids","Balalar baqshası":"Kindergarten","Balans":"Balance","Balans esabatları":"Balance reports","Balans esabatların kóriw":"View balance reports","Balans qosıldı":"Balance added","Balans qosıw":"Add balance","Balans saqlandı":"Balance saved","Balans óshirildi":"Balance deleted","Balanslar halatı":"Balances overview","Balanslar hár qıylı bolıwı kerek":"Balances must be different","Balansta jetkilikli qarjı joq":"Not enough funds on this balance","Balanstan balansqa ótkeriw":"Transfer between balances","Balanstı jasırıw":"Hide balance","Balanstı redaktorlaw":"Edit balance","Balanstı óshiriw":"Delete balance","Balanstı ózgertiw":"Change balance","Balansım qansha?":"What's my balance?","Balansıńız barlıq qarızlardı jabıwǵa jetedi":"Your balance covers all debts","Baner":"Banner","Bank, karta, naqd pul hám valyuta — barlıq balanslarıńız bir jerde, bir túymede.":"Bank, card, cash and currency — all your balances in one place.","Barlıq balanslarıńızdıń jıyındısı: naqd pul + kartalar + valyuta. Kóz belgisi menen summanı jasırıwǵa boladı.":"The total of all your balances: cash + cards + currency. Tap the eye icon to hide it.","Barlıq hamyanlar":"All wallets","Barlıq kategoriyalar":"All categories","Barlıq kirim-shıǵım jazıwları, maqset hám qarızlar óshiriledi. Hamyan balansları 0 ge túsedi.":"All income/expense records, goals and debts will be deleted. Wallet balances will reset to 0.","Barlıq maydanlardı toltırıń":"Fill in all fields","Barlıq maǵlıwmatlar tek sizdiń qurılmańızda saqlanadı. Rezerv nusqa ushın Profil → Maǵlıwmatlar bólimin paydalanıń.":"All data is stored only on your device. For a backup use Profile → Data.","Barlıq maǵlıwmattı saqlaw yamasa tiklew":"Save or restore all data","Barlıq operaciyalar":"All transactions","Barlıq qarızdı uaqtında qaytarıw ushın kúnine":"To repay all debts on time — per day","Barlıq qarızlar":"All debts","Barlıq qarızlar tártipte. Múddetler jaqınlasqanda eskertemen.":"All debts are in order. I'll remind you when due dates approach.","Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.":"All settings and data will be deleted.","Barlıq tólemler bir kalendarda":"All payments in one calendar","Barlıǵı":"All","Barlıǵın kórsetiw":"Show all","Bas bet":"Home","Baslanǵısh halına qaytarıw":"Reset to default","Baslanǵısh summa":"Initial amount","Baslanǵısh tártip":"Default order","Baslaw":"Start","Basqa":"Other","Basqa dáramatlar":"Other income","Basqa járiymalar":"Other fines","Basqa kirim":"Other income","Basqa maqsetler":"Other goals","Basqa qarızlar":"Other debts","Basqa qárejetler":"Other expenses","Basqalar":"Others","Basqarıw":"Manage","Baylanıs":"Phone & internet","Baylanıs adamı":"Contact person","Baylanıs hám media":"Communication and media","Bazar 180 000 naq":"Market 180,000 cash","Bazar hám dúkan":"Market and store","Belgi":"Icon","Berilgen":"Lent","Beriw":"Lend","Bilim":"Education","Bilim hám baylanıs":"Education and communication","Biykar etildi":"Cancelled","Biykarlandı":"Cancelled","Biykarlaw":"Cancel","Biznes":"Business","Biznes basqa":"Business other","Biznes dáramatları":"Business income","Biznes hám jumıs":"Business and work","Biznes hám tolıq qadaǵalaw ushın":"For business and full control","Biznes paneli":"Business panel","Biznes paneli hám hisob-fakturalar":"Business panel and invoices","Biznesińizdi E-esap paydalanıwshılarına kórsetiń":"Show your business to E-esap users","Bonus":"Bonus","Bos":"Empty","Bugin":"Today","Bugin ele operaciya joq":"No transactions today yet","Bugingi operaciyalar":"Today's transactions","Bul aralıqta maǵlıwmat joq":"No data for this period","Bul ay ele shıǵım joq.":"No expenses this month yet.","Bul ay jumsaldı":"Spent this month","Bul ay limit":"This month's limit","Bul ay qansha jumsadım?":"How much did I spend this month?","Bul ay sap payda":"Net profit this month","Bul ay xızmetlerge":"On services this month","Bul brauzerde kontaktlar ashılmaydı":"Contacts are not available in this browser","Bul bólimde qarız joq":"No debts in this section","Bul dáwirde maǵlıwmat joq":"No data for this period","Bul hamyanda qarjı jetkiliksiz. Basqa hamyandı saylań.":"Not enough funds in this wallet. Choose another one.","Bul jerde sizdiń biznesińiz turıwı múmkin. Arza qaldırıń — biz siz benen baylanısamız.":"Your business could be here. Leave a request and we'll contact you.","Bul kategoriyadaǵı operaciyalar «Basqa» ǵa ótedi.":"Transactions in this category will move to “Other”.","Bul kúni operaciya joq":"No transactions on this day","Bul kúni tólem joq":"No payments on this day","Bul maqset óshiriledi.":"This goal will be deleted.","Bul nomer aldın dizimnen ótken — Kiriw bólimine ótiń":"This number is already registered — go to Sign in","Bul nomer dizimnen ótpegen":"This number is not registered","Bul operaciya biykarlanadı. Keyin qaytarıwǵa boladı.":"This transaction will be cancelled. You can restore it later.","Bul operaciya biykarlandı":"This transaction was cancelled","Bul operaciyanı óshiriwdi qáleysiz be?":"Delete this transaction?","Bul rejimde jazıwlar úlkenirek, tuymeler anıǵıraq hám navigaciyada barlıq atamalar kórinedi.":"In this mode text is larger, buttons are clearer and all labels show in the navigation.","Buyırtpa ushın":"For an order","Byudjet":"Budget","Byudjet hám limitler":"Budget and limits","Byudjet jaǵdayı":"Budget status","Byudjet ornatılmaǵan":"No budget set","Byudjet ornatılmaǵan. Profil → Byudjet hám limitler bóliminde ornatıń.":"No budget set. Set it in Profile → Budget and limits.","Byudjet tawsıldı":"Budget used up","Byudjetten asıp kettińiz.":"You've gone over budget.","Bólip":"In installments","Bólip tólew":"Pay in installments","Búgin":"Today","Búgin qaldı":"Left today","Búgingi AI limiti tawsıldı. MAX ta — sheksiz.":"Today's AI limit is used up. Unlimited with MAX.","Click, Payme yamasa karta arqalı":"Via Click, Payme or card","Dawam etiw":"Continue","Dawıs effektleri":"Sound effects","Dawıs effektleri qosıldı":"Sound effects on","Dawıs effektleri óshirildi":"Sound effects off","Dekabr":"December","Demo kurs":"Demo rate","Demo maǵlıwmatlar menen qayta baslaw":"Restart with demo data","Demo rejim: summa hamyannan shıǵım retinde jazıladı":"Demo mode: the amount is recorded as an expense","Demo rejim: tólem kirim-shıǵım esabına jazıladı":"Demo mode: the payment is recorded in your books","Demo tólem":"Demo payment","Densawlıq":"Health","Densawlıq hám kútim":"Health and care","Depozit kalkulyatorı":"Deposit calculator","Dinamika":"Trend","Dizimnen ótiw":"Sign up","Dizimnen óttińiz!":"You're signed up!","Dollar":"Dollar","Dáramatlar":"Income","Dári-dármaq":"Medicine","Dárixana":"Pharmacy","Dáwirdi saylań":"Choose a period","Dıqqat kerek":"Needs attention","Dú":"Mon","Dúkan":"Store","Dúysenbi":"Monday","Dúyshembi":"Monday","E-esap AI chat":"E-esap AI chat","E-esap gruppaları":"E-esap groups","E-esap penen tanısayıq!":"Let's get to know E-esap!","E-esap sizge unadı ma?":"Do you like E-esap?","E-esap ǵa xosh keldińiz!":"Welcome to E-esap!","E-esap — operaciyalar esabatı":"E-esap — transaction report","E-esap — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.":"E-esap is an income and expense tracker. It helps you log daily finances, plan a budget, reach savings goals and add transactions in plain words with the AI assistant.","Ek":"Sun","Ekshembi":"Sunday","Eksport, rezerv nusqa, tazalaw":"Export, backup, clear","Ele esabatlar joq. Tómendegi + túymesin basıp birinshisin qosıń":"No records yet. Tap + below to add your first one","Ele jinaq maqsetińiz joq. Profil → Jinaq maqsetleri.":"No savings goals yet. Profile → Savings goals.","Ele maqset joq":"No goals yet","Ele maqset joq. Ármanıńız ushın jinawdı baslań!":"No goals yet. Start saving for your dream!","Ele maqset joq. Ármanıńız ushın shiyshe kopilka ashıń!":"No goals yet. Open a glass jar for your dream!","Ele operaciya joq":"No transactions yet","Ele tólem joq":"No payments yet","Elektr energiyası":"Electricity","Elektronika hám texnika":"Electronics and appliances","Emoji":"Emoji","Energiya únemlew":"Energy saving","Esabat":"Report","Esap nomerin tolıq kirgiziń":"Enter the full account number","Esap teń":"Settled","Esaptı bólisiw":"Split the bill","Eske salıw":"Reminder","Eskertpe":"Note","Evro":"Euro","Excel eksport":"Excel export","Excel esabatı (.xlsx)":"Excel report (.xlsx)","Excel esabatı júklendi":"Excel report downloaded","Eń az muǵdar — 1 000 swm":"Minimum amount — 1,000 UZS","Eń kóp qayda jumsadım?":"Where did I spend the most?","Eń kóp shıǵımlar":"Top expenses","Eń qımbat kún":"Most expensive day","Eń shuǵıl qarız":"Most urgent debt","Familiyası":"Surname","Familiyańızdı kiritiń":"Enter your surname","Fayl":"File","Fevral":"February","Finans hám minnetlemeler":"Finance and obligations","Finans operaciyaları":"Financial operations","Funt sterling":"Pound sterling","Gruppa":"Group","Gruppa atı":"Group name","Gruppa óshiriledi, kategoriyalar «Jeke kategoriyalar» ǵa ótedi.":"The group will be deleted; categories move to “Personal categories”.","Gruppanı óshiriw":"Delete group","Gruppanı ózgertiw":"Edit group","Hamyan":"Wallet","Hamyan qosıw":"Add wallet","Hamyan saylań":"Choose a wallet","Hamyanda qarjı jetkiliksiz":"Not enough funds in the wallet","Hamyandı saylań":"Choose a wallet","Hamyanlar":"Wallets","Hamyanlar boyınsha":"By wallet","Hamyanlarım":"My wallets","Hamyannan almaw":"Don't take from wallet","Hamyannan tólew":"Pay from wallet","Hamyansız":"No wallet","Haywanlar":"Pets","Hesh nárse tabılmadı":"Nothing found","Hisob-faktura":"Invoice","Hisob-fakturalar":"Invoices","Hobbi":"Hobbies","Hududgaz Qaraqalpaqstan":"Hududgaz Karakalpakstan","Hámme ushın baslanǵısh tarif":"Starter plan for everyone","Hámmesi":"All","Hámmesi kózińizdiń aldında":"Everything at a glance","Hámmesin baslanǵısh halına qaytarıw":"Reset everything","Hápte":"Week","Hápte ritmi":"Weekly rhythm","Hápte sayın":"Weekly","Hápte, ay yamasa jıl boyınsha salıstırıń hám kategoriyalarǵa limit qoyıń.":"Compare by week, month or year and set limits for categories.","Hár 30 kúnde tarif hamyannan avtomat jańalanadı":"The plan renews from your wallet every 30 days","Hár adamǵa":"Per person","Hár ayda":"Monthly","Hár ayda qosıw":"Add every month","Házir bar":"Saved so far","Házirgi tarifińiz":"Your current plan","Házirgi versiyada tólemler demo rejimde isleydi: pul alınbaydı, biraq tólem shıǵım retinde esapqa jazıladı.":"In this version payments are demo only: no money is charged, but the payment is recorded as an expense.","Házirgi waqıtta qansha qarjıńız bar?":"How much money do you have right now?","Iconlar":"Icons","Ijara dáramatları":"Rental income","Ijara haqı":"Rent","Ikonka":"Icon","Internet":"Internet","Investiciya":"Investments","Ipoteka bank":"Ipoteka Bank","Ishimlik suw":"Drinking water","Ishimlikler":"Drinks","Iyul":"July","Iyun":"June","Izlew":"Search","Izlew: kategoriya, eskertpe, muǵdar":"Search: category, note, amount","Izoh":"Comment","Izoh jazıń":"Write a comment","JPG yamasa PNG. Súwret qurılmańızda saqlanadı.":"JPG or PNG. The photo is stored on your device.","Jabıldı":"Closed","Jabıw":"Close","Janılǵı hám gaz":"Fuel and gas","Jaqsı":"Good","Jaqtı":"Light","Jaqın tólemler":"Upcoming payments","Jaratılǵan sáne":"Created on","Jaratıw":"Create","Jaratıwshı":"Creator","Jazılıwlar":"Subscriptions","Jazıń: taksi 25 mıń...":"Type: taxi 25k...","Jańa":"New","Jańa PIN-kod":"New PIN","Jańa akkaunt jaratıń — bir minut waqıt aladı":"Create a new account — it takes a minute","Jańa balans":"New balance","Jańa balans ashıladı":"A new balance will be created","Jańa gruppa":"New group","Jańa hamyan":"New wallet","Jańa hisob-faktura":"New invoice","Jańa kategoriya":"New category","Jańa maqset":"New goal","Jańa noutbuk":"New laptop","Jańa operaciya":"New transaction","Jańa parol":"New password","Jańa parol qoyıń":"Set a new password","Jańa paroldi qaytalań":"Repeat the new password","Jańa qarız":"New debt","Jańa turaqlı tólem":"New recurring payment","Jeke kategoriyalar":"Personal categories","Jeke kútim":"Personal care","Jeke qárejetler":"Personal expenses","Jer":"Land","Jer salıǵı":"Land tax","Jinaq":"Savings","Jinaq dárejesi":"Savings rate","Jinaq kalkulyatorı":"Savings calculator","Jinaq maqsetleri":"Savings goals","Jol kira (avtobus)":"Bus fare","Ju":"Fri","Juma":"Friday","Jumsaldı":"Spent","Jámi":"Total","Jámi jumsaldı":"Total spent","Jámi kirim":"Total income","Jámi shıǵım":"Total expenses","Jámi summa":"Total amount","Jámi tólem":"Total payment","Járdem hám sorawlar":"Help and FAQ","Járiymalar":"Fines","Jıl":"Year","Jıllıq %":"Annual %","Jıllıq procent":"Annual rate","Jılıw hám ıssı suw":"Heating and hot water","Jılıw támiynatı":"Heating supply","Jıynaq hám investiciya":"Savings and investments","Jıynaw":"Save","Kafe":"Cafe","Kalendar":"Calendar","Kalkulyator":"Calculator","Kalkulyator tuymelerinde + hám − ne ushın?":"What are + and − on the keypad for?","Karta nomeriniń aqırı (májbúriy emes)":"Card number ending (optional)","Kategoriya":"Category","Kategoriya limitleri":"Category limits","Kategoriya qosıw":"Add category","Kategoriya saylaw":"Choose category","Kategoriyalar":"Categories","Kategoriyalar boyınsha":"By category","Kategoriyalarıńızdı óz gruppańızǵa jıynań":"Group your categories your way","Kategoriyanı óshiriw":"Delete category","Kategoriyanı ózgertiw":"Edit category","Keminde 6 belgi":"At least 6 characters","Keminde bir balans qalıwı kerek":"At least one balance must remain","Keminde bir kategoriya qalıwı kerek":"At least one category must remain","Kerekli summa":"Target amount","Keshbek hám qaytım":"Cashback and refunds","Keshe":"Yesterday","Kewil ashıw":"Entertainment","Kewilli stikerler":"Fun stickers","Keyingi tólem":"Next payment","Keyinirek":"Later","Keńes alıw":"Get advice","Keńes ber":"Give advice","Keńes beriw ushın aldın bir neshe operaciya qosıń.":"Add a few transactions first so I can give advice.","Kim qarızdar?":"Who owes?","Kimge / kimnen":"To / from whom","Kimge qarız berdińiz yamasa kimnen aldıńız — bárin jazıń. Qaytarıw múddeti jaqınlasqanda eskertemiz.":"Log who you lent to or borrowed from. We'll remind you when it's due.","Kirim":"Income","Kirim hám shıǵım":"Income and expenses","Kirim qosıldı":"Income added","Kirim summası":"Income amount","Kirim-shıǵımıńız endi bir qolda":"Your income and expenses, all in one place","Kirimnen artıq jumsaldı":"Spent more than earned","Kiriw":"Sign in","Kiyim-kenshek":"Clothing","Kiyim-keshek":"Clothing","Klient":"Client","Klientler":"Clients","Klientler hám hisob-fakturalar":"Clients and invoices","Klientlerge hisob-faktura jazıń, tólengende ol avtomat kirimge túsedi.":"Invoice your clients — once paid, it's recorded as income automatically.","Kodtı qayta jiberiw":"Resend code","Kofe":"Coffee","Komissiya":"Fee","Komissiya: 0%":"Fee: 0%","Kommunal":"Utilities","Kommunal tólemler":"Utility payments","Kommunal tólewler":"Utility payments","Kompaniya hám baylanıs adamın kirgiziń":"Enter the company and contact person","Kompaniya yamasa brend atı":"Company or brand name","Kompyuter":"Computer","Kopilka toldı":"Jar is full","Kopilka toldı!":"Jar is full!","Kopilka toldı! Maqsetke jettińiz":"Jar is full! Goal reached","Kopilkaǵa aqsha salıw":"Add money to the jar","Kóylek":"Dress","Kredit hám nasiya":"Loans and installments","Kredit kalkulyatorı":"Loan calculator","Kredit muǵdarı":"Loan amount","Kredit tólew":"Loan payment","Kurs":"Rate","Kurslar demo maqsetinde kórsetilgen, bank kursı menen ayırmashılıǵı bolıwı múmkin":"Rates are shown as a demo and may differ from bank rates","Kurslar jańalanıp atır":"Updating rates","KÓRINIS":"APPEARANCE","Kórinis":"Appearance","Kórip shıǵılmaqta":"Under review","Kóshirildi":"Copied","Kóshiriw":"Copy","Kún / Ay / Jıl":"Day / Month / Year","Kún qaldı":"Days left","Kúnine":"Per day","Kúnine 30":"30 per day","Kúnler":"Days","Kúnler boyınsha esap":"Daily report","Kúnlik limit":"Daily limit","Kútilip atır":"Pending","Kútilip atırǵan esaplar":"Pending bills","Kútilmegen qárejetler":"Unexpected expenses","Limit":"Limit","Limit ornatılmaǵan":"No limit set","Limit ornatıw":"Set a limit","Limit orınlanıwı":"Limit usage","Limit summasın kiritiń":"Enter the limit amount","Limitlerdi sazlaw":"Set up limits","Logistika":"Logistics","MAX aktivlestirildi!":"MAX activated!","MAX satıp alıw":"Buy MAX","MAX tarifin biykarlaw":"Cancel MAX plan","MAX tarifinde ashıladı":"Available on MAX","MB kursı":"Central Bank rate","Maqset":"Goal","Maqset atı":"Goal name","Maqset hám qarızlar":"Goals and debts","Maqset jaratıw":"Create a goal","Maqset qosıń":"Add a goal","Maqset qoyıń, shiyshe kopilkaǵa tıyın salıń hám hár ay qansha jıynaw kerekligin biliń.":"Set a goal, drop coins into a glass jar and see how much to save each month.","Maqsetke jettińiz":"Goal reached","Maqsetke jettińiz!":"Goal reached!","Maqsetke qosıw":"Add to goal","Maqsetler":"Goals","Maqsetlerim":"My goals","Maqsetli qárejetler":"Planned expenses","Maqsetti óshiriw":"Delete goal","Marketing":"Marketing","Mart":"March","Mashina qárejetleri":"Car expenses","May":"May","Maǵan qaytadı":"Owed to me","Maǵan qaytaradı":"Owed to me","Maǵan qaytarılıwı kerek":"Owed to me","Maǵlıwmat joq":"No data","Maǵlıwmatlar":"Data","Maǵlıwmatlar tiklendi":"Data restored","Maǵlıwmatlarım qayerde saqlanadı?":"Where is my data stored?","Mektep":"School","Men E-esap AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.":"I'm E-esap AI. Type a transaction in plain words or ask about your finances.","Men aldım":"I borrowed","Men berdim":"I lent","Men qaytaraman":"I owe","Men qaytarıwım kerek":"I owe","Meniń arzalarım":"My requests","Meniń gruppalarım":"My groups","Mikrofon islemedi. Tekst penen jazıń.":"The microphone didn't work. Please type instead.","Miynet dáramatları":"Earned income","Mobil baylanıs":"Mobile","Muzıka hám kino":"Music and movies","Muǵdar":"Amount","Muǵdar hám valyutanı kiritiń":"Enter the amount and currency","Muǵdardı kirgiziwde esaplaw múmkin: mısalı 12000+8500 — nátiyje avtomat túrde esaplanadı.":"You can calculate while typing: e.g. 12000+8500 — the result is computed automatically.","Muǵdardı kirgiziń":"Enter the amount","Mámleket":"Government","Mámleket tólewleri":"Government payments","Múddet aqırında":"At the end of the term","Múddeti":"Term","Múddeti (ay)":"Term (months)","Múddetsiz":"No due date","Múlk salıǵı":"Property tax","Mısalı":"For example","Mısalı: Aral Market":"E.g. Aral Market","Mısalı: Azamat":"E.g. Azamat","Mısalı: Balalar":"E.g. Kids","Mısalı: Damir":"E.g. Damir","Mısalı: Darmenbaevich":"E.g. Darmenbaevich","Mısalı: Internet":"E.g. Internet","Mısalı: Mashina":"E.g. Car","Mısalı: Qonarbaev":"E.g. Qonarbaev","Mısalı: Uzcard":"E.g. Uzcard","Mısalı: bazar":"E.g. market","Naq aqsha / basqa":"Cash / other","Naqd pul":"Cash","Nan hám sút":"Bread and milk","Neden":"From what","Nege":"For what","Neshe ayda":"In how many months","Noy":"Nov","Noyabr":"November","Nusqalandı":"Copied","Nusqalaw":"Copy","Nátiyje":"Result","Ofis":"Office","Oktyabr":"October","Onlayn":"Online","Onlayn xaridlar":"Online shopping","Operaciya jazıw":"Record a transaction","Operaciya qaytarıldı":"Transaction restored","Operaciya óshirildi":"Transaction deleted","Operaciyalardı qosıń — men olardı analiz qılıp, keńes beremen.":"Add transactions — I'll analyze them and give advice.","Operaciyalardı tazalaw":"Clear transactions","Operaciyanı biykarlaw":"Cancel transaction","Operaciyanı ózgertiw":"Edit transaction","Operator tabılmadı":"Operator not found","Oqıw hám rawajlanıw":"Learning and growth","Oqıw tólemi":"Tuition","Ornatılmaǵan":"Not set","Ortadaǵı túyme — AI kómekshi. «Keshe 50 mıń taksi» dep jazıń yamasa aytıń, ol operaciyanı ózi qosadı hám keńes beredi.":"The center button is the AI assistant. Type or say “taxi 50k yesterday” and it adds the transaction and gives advice.","Ortasha":"Average","Ortasha kúnlik":"Daily average","Ortashadan kóp":"Above average","Oyın":"Game","Oyın-kúlki":"Fun","Oyınlar hám servisler":"Games and services","Oyınshıqlar":"Toys","PIN-kod":"PIN code","PIN-kodlar sáykes kelmedi":"PINs don't match","PIN-kodtı kirgiziń":"Enter your PIN","PIN-kodtı qaytalań":"Repeat your PIN","PIN-kodtı tiklew ushın: Profil → Maǵlıwmatlar → baslanǵısh halına qaytarıw. Házir ápiwayı jol: brauzer maǵlıwmatların tazalań.":"To reset your PIN: Profile → Data → reset. The simple way for now is to clear browser data.","PIN-kodtı umıttım":"Forgot PIN","PIN-kodtı óshiriwdi qáleysiz be?":"Turn off the PIN?","PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz":"Up to 5 wallets on PRO, unlimited on MAX","PRO ǵa ótiw":"Upgrade to PRO","PROGRAMMA STILI":"APP STYLE","Parol":"Password","Parol jańalandı":"Password updated","Parol keminde 6 belgiden turıwı kerek":"The password must be at least 6 characters","Parol qáte":"Wrong password","Paroldi kiritiń":"Enter your password","Paroldi qayta kiritiń":"Enter the password again","Paroldi qaytalań":"Repeat the password","Paroldi tiklew":"Reset password","Paroldi umıttıńız ba?":"Forgot your password?","Paroller sáykes kelmeydi":"Passwords don't match","Paydalanıwshı":"User","Pi":"Thu","Piyshembi":"Thursday","Plastik karta":"Bank card","Procent dáramatı":"Interest income","Procent kalkulyatorı":"Percent calculator","Procent túri":"Rate type","Profil":"Profile","Profil maǵlıwmatları":"Profile details","Profil → Programma stili bóliminde Classic yamasa Liquid Glass stilin, Jaqtı, Qarańǵı yamasa Avtomat temanı saylań.":"In Profile → App style choose Classic or Liquid Glass and a Light, Dark or Auto theme.","Prognoz":"Forecast","Programmalar":"Software","Provayder":"Provider","Pul awdarıw":"Money transfer","Push-xabarlama":"Push notifications","QARJÍ":"FINANCE","QOSÍMSHA QURALLAR":"EXTRA TOOLS","Qabıl etildi":"Accepted","Qaldı":"Left","Qaldıq":"Remaining","Qamsızlandırıw":"Insurance","Qansha jıynaw kerek":"How much to save","Qaraqalpaqsha":"Karakalpak","Qarańǵı":"Dark","Qarjı":"Finance","Qarjı densawlıǵı balı":"Financial health score","Qarjı planı":"Financial plan","Qarjı qurallari":"Finance tools","Qarjı quralları":"Finance tools","Qarjılarıńız qay jerge ketip atır":"Where your money goes","Qarjıńız qayaqqa ketip atırǵanın kategoriyalar boyınsha kóriń. Kirim jasıl, shıǵım qızıl reńde.":"See where your money goes by category. Income is green, expenses are red.","Qarjıńızdı tolıq qadaǵalań":"Take full control of your money","Qarız alıw hám beriw":"Borrow and lend","Qarız bergenińiz yamasa alǵanıńız bolsa, jazıp qoyıń":"If you lent or borrowed money, write it down","Qarız dápteri":"Debt book","Qarız jabıldı":"Debt closed","Qarız jaratıldı":"Debt created","Qarız jaratıw":"Create debt","Qarız joq":"No debts","Qarız qaytarıladı":"Debt will be repaid","Qarız qosıw":"Add debt","Qarızdarlıq":"Outstanding balance","Qarızdarlıqtı tekseriw":"Check balance due","Qarızdı jabıw ushın":"To close the debt","Qarızdı tólew":"Repay debt","Qarızlar":"Debts","Qashannan":"From","Qashanǵa shekem":"Until","Qaysı balansqa":"To balance","Qaysı balanstan":"From balance","Qaysı hamyannan alınadı":"Which wallet to pay from","Qaysı hamyanǵa túsedi":"Which wallet receives it","Qaysı valyutaǵa":"To which currency","Qayta jiberiw":"Resend","Qaytadan kiriw ushın telefon nomeri hám parol kerek boladı.":"You'll need your phone number and password to sign in again.","Qaytarıldı":"Repaid","Qaytarıw":"Restore","Qaytarıw múddeti":"Due date","Qaytarıw múddeti — búgin":"Due today","Qaytarıw sánesi":"Repayment date","Qayırlı kesh":"Good evening","Qayırlı kún":"Good afternoon","Qayırlı tań":"Good morning","Qayırlı tún":"Good night","Qayırqomlıq":"Charity","Qazaq teńgesi":"Kazakh tenge","Qolıńızdaǵı naqd pul yamasa kartadaǵı summanı kiritiń — esap usı jerden baslanadı. Keyin ózgertiwge boladı.":"Enter the cash you have or your card balance — tracking starts from here. You can change it later.","Qonarbaev Damir":"Damir Qonarbaev","Qosılǵan":"Added","Qosılǵanda":"When added","Qosımsha haqqında":"About the app","Qosımsha maǵlıwmat":"Additional info","Qosımshanı bahalaw":"Rate the app","Qosımshanıń tiykarǵı bólimlerin birge kórip shıǵayıq ba? Bar bolǵanı 30 sekund.":"Shall we take a quick look at the main sections? Just 30 seconds.","Qosımshaǵa kiriw":"Enter the app","Qosıw":"Add","Qońıraw etiw":"Call","Qurallar, kurslar, maqset hám qarızlar":"Tools, rates, goals and debts","QÁWIPSIZLIK":"SECURITY","Qáte format. JSON tekstti tekseriń":"Invalid format. Check the JSON text","Qırǵız somı":"Kyrgyz som","Qıtay yuanı":"Chinese yuan","Raxmet!":"Thank you!","Reklama":"Ads","Reklama beriw":"Advertise","Reklama haqqında":"About ads","Reklama ornı":"Ad slot","Reklama túri":"Ad type","Reklama ushın arza":"Ad request","Reklamaǵa qaytıw":"Back to ads","Rezerv nusqa":"Backup","Rezerv nusqa (JSON)":"Backup (JSON)","Reń":"Color","Reńi":"Color","Reńli sızıq belgiler":"Colorful line icons","Rossiya rublı":"Russian ruble","Rubl":"Ruble","SMS kod jiberildi":"SMS code sent","SMS kod jiberiw":"Send SMS code","SMS kod qayta jiberildi":"SMS code resent","SMS kodtı kiritiń":"Enter the SMS code","SMS xabarlama":"SMS notification","Saqawat qorı":"Charity fund","Salon hám gózzallıq":"Salons and beauty","Salıqlar":"Taxes","Salıstırıw":"Compare","Salıw":"Deposit","Sanı":"Count","Sap jaǵday":"Net position","Saqlandı":"Saved","Saqlaw":"Save","Saqlaw hám kiriw":"Save and sign in","Saqlaw: tómendegi tekstti nusqalap, qáwipsiz jerde saqlań":"Backup: copy the text below and keep it somewhere safe","Sawda dáramatları":"Sales income","Sawǵa":"Gift","Sawǵa hám sıylıqlar":"Gifts and prizes","Sawǵalar":"Gifts","Sayaxat":"Travel","Saylaw":"Select","Saytqa ótiw":"Visit website","Sazlawlar saqlanadı, jazıwlar óshiriledi":"Settings are kept, records are deleted","Sentyabr":"September","Sh":"Sat","Shay puli":"Tips","Shańaraq":"Family","Shańaraq, balalar, úy":"Family, kids, home","Sheksiz":"Unlimited","Shembi":"Saturday","Shiyshe kopilka ashıń":"Open a glass jar","Shıǵım":"Expense","Shıǵım bolǵan":"Had expenses","Shıǵım joq":"No expenses","Shıǵım qosıldı":"Expense added","Shıǵım summası":"Expense amount","Shıǵındı shıǵarıw":"Waste collection","Shıǵıw":"Log out","Si":"Tue","Siyshembi":"Tuesday","Siz qaytaratuǵın kóbirek":"You owe more","Siz qosqanıńız":"Added by you","Sizden alınǵan qarız":"Debt borrowed from you","Sizden alǵan qarızımdı umıtpadım":"I haven't forgotten what I owe you","Sizge berilgen qarız":"Debt lent to you","Sizge qaytatuǵın kóbirek":"You're owed more","Skidka":"Discount","Skidka kalkulyatorı":"Discount calculator","Sońǵı esabatlar":"Recent records","Sport":"Sports","Sport zal":"Gym","Statistika":"Statistics","Statistika hám byudjet":"Statistics and budget","Statistika, limitler, valyuta kursları hám qarjı esaplawıshları — aqıllı sheshimler ushın.":"Statistics, limits, exchange rates and finance calculators — for smart decisions.","Status":"Status","Statusıńız BUSINESS ke ózgerdi":"Your status changed to BUSINESS","Stil":"Style","Stil hám temanı qalay ózgertemen?":"How do I change the style and theme?","Summa":"Amount","Summa (UZS)":"Amount (UZS)","Summalar bulıńǵır kórinedi":"Amounts are blurred","Summanı kiritiń":"Enter an amount","Suw támiynatı":"Water supply","Svet hám gaz":"Power and gas","Swm":"UZS","Sá":"Wed","Sálem":"Hi","Sáne":"Date","Sáneni saylań":"Choose a date","Sárshembi":"Wednesday","Súwret júklew":"Upload photo","Súwretti oqıw múmkin bolmadı":"Couldn't read the photo","Sırtta awqatlanıw":"Eating out","TIL":"LANGUAGE","Tabılmadı":"Not found","Taksi":"Taxi","Taksi 25 mıń":"Taxi 25k","Tarif jańalanıwı":"Plan renewal","Tarifler":"Plans","Tastıyıqlaw":"Confirm","Tayın":"Done","Tayın! Endi E-esap tan tolıq paydalanıń":"Done! Now enjoy E-esap to the fullest","Taza aymaq":"Clean region","Tazalandı":"Cleared","Tazalaw":"Clear","Tek súwret faylın saylań":"Choose an image file only","Tekstti belgilep, nusqalań":"Select and copy the text","Telefon":"Phone","Telefon balansı":"Phone balance","Telefon nomeri":"Phone number","Telefon nomeri kórsetilmegen":"No phone number","Telefon nomerin qosıw":"Add phone number","Telefon nomerin tolıq kirgiziń":"Enter the full phone number","Telefon nomerin tolıq kiritiń":"Enter the full phone number","Telefon nomerińizdi kiritiń — oǵan tastıyıqlaw kodı SMS arqalı jiberiledi":"Enter your phone number — we'll send a confirmation code by SMS","Televidenie":"TV","Tez qosıw":"Quick add","Tez qosıw shablonları":"Quick add templates","Teńge":"Tenge","Tiklew":"Restore","Tiklew: saqlanǵan tekstti bul jerge qoyıń":"Restore: paste the saved text here","Til":"Language","Tiykarǵı etiw":"Make primary","Tiykarǵı maqset":"Main goal","Tolıǵıraq":"More","Transport":"Transport","Transport kartası":"Transit card","Turaq jay":"Housing","Turaqlı tólem":"Recurring payment","Turaqlı tólemler":"Recurring payments","Turaqlı tólemler joq":"No recurring payments","Turmıs":"Living","Turmıs tárzi":"Lifestyle","Tuwılǵan kún sawǵası":"Birthday gift","Tuwılǵan sáne":"Date of birth","Tuwılǵan sáneni saylań":"Choose your date of birth","Tábiyiy gaz":"Natural gas","Táriyp":"Description","Tártibin ózgertiw ushın ≡ belgisin súyreń":"Drag ≡ to reorder","Tóledim":"Paid","Tólem bar":"Payment due","Tólem jazıldı":"Payment recorded","Tólem kalendarı":"Payment calendar","Tólem qosıw":"Add payment","Tólem ámelge asırıldı":"Payment completed","Tólemdi belgilew":"Mark as paid","Tólemler hám qurallar":"Payments and tools","Tólemler tarixı":"Payment history","Tólendi":"Paid","Tólenetuǵın baha":"Price to pay","Tólengen":"Paid","Tólew":"Pay","Tólew múddeti":"Payment due date","Tólew ushın súyreń":"Swipe to pay","Tólew usılı":"Payment method","Túri":"Type","Túrk lirası":"Turkish lira","Túsetuǵın balans":"Receiving balance","Túslik":"Lunch","Túsinbedim. Mısallar:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «keshe bazar 180 000 naq»\n• «bul ay qansha jumsadım?»\n• «keńes ber»":"I didn't get that. Examples:\n• “taxi 25k”\n• “salary 6.5M received”\n• “market 180,000 cash yesterday”\n• “how much did I spend this month?”\n• “give advice”","Túymeler basılǵanda sulıw dawıslar":"Pleasant sounds on taps","Ulıwma":"General","Ulıwma balans":"Total balance","Universitet kontraktı":"University tuition","Usı ay":"This month","Usı balanstan aylıq shıǵım shegarası":"Monthly spending cap for this balance","Valyuta":"Currency","Valyuta almastırıldı":"Currency exchanged","Valyuta almastırıw":"Currency exchange","Valyuta almastırıw (obmen)":"Currency exchange","Valyuta ayırbaslaw":"Currency exchange","Valyuta konvertorı":"Currency converter","Valyuta konvertorı, kredit hám depozit kalkulyatorları, Excel eksport — barlıǵı bir jerde.":"Currency converter, loan and deposit calculators, Excel export — all in one place.","Valyuta kursları":"Exchange rates","Versiya":"Version","Vidjet sazlamaları":"Widget settings","Xabarlamalar":"Notifications","Xaridlar":"Shopping","Xosh keldińiz!":"Welcome!","Xalq banki":"Xalq Bank","Xızmetkerler":"Staff","Xızmetler":"Services","Xızmetler bóliminde":"In Services","Xızmetler bólimindegi tólemler haqıyqıy ma?":"Are the payments in Services real?","Xızmetler hám kalkulyatorlar":"Services and calculators","Xızmetti izlew":"Search services","YHXB (GAI) járiymaları":"Traffic fines","Yanvar":"January","aktiv qarız":"active debts","aldınǵı":"prev","aldınǵı dáwirge salıstırǵanda":"vs previous period","asıp ketti":"exceeded","ay":"mo","ay orınlandı":"months done","aylıq limitten asıp ketti":"monthly limit exceeded","ayına":"per month","balansı":"balance","basqa":"other","bugin":"today","bugin tólew kerek":"due today","búgin":"today","dana":"pcs","eske salıw jiberiń":"send a reminder","ga qarızıńızdıń múddeti ótti":"— your debt is overdue","hamyan":"wallet","jańa":"new","jetispeydi":"short","joq":"none","jumsaldı":"spent","jumsalǵan":"spent","jámi":"total","jıl":"yr","jıynań":"save","kategoriya":"categories","keyingi":"next","kirim":"income","kirim − shıǵım":"income − expenses","komissiya":"fee","kún":"d","kún aldın ótti":"days ago","kún keshikti":"days overdue","kún qaldı":"days left","kún ótti":"days passed","kúni alǵan qarızıńızdı eske salaman":"— a reminder about the debt you took on that day","kúnnen keyin":"days later","kútilmekte...":"pending...","limit":"limit","limit asıldı":"limit exceeded","limittiń":"of the limit","maqset":"goal","maqsetke qosıldı":"added to goal","maǵan qaytaradı":"owes me","men qaytaraman":"I owe","mln":"M","mlrd":"B","muǵdarı":"amount","múddeti ótti":"overdue","múddetsiz":"no due date","mıń":"K","nomeri tastıyıqlandı. Endi jańa parol oylap tabıń.":"— number confirmed. Now create a new password.","nomerine 5 xanalı tastıyıqlaw kodı jiberildi":"— a 5-digit code was sent to this number","operaciya":"transactions","operaciya joq":"no transactions","provayder":"provider","qaldı":"left","qarız":"debt","qarızdı qaytarıw múddeti":"debt due date","qarızdı tólew múddeti":"debt repayment date","qarızınıń múddeti ótti":"— debt is overdue","shıǵım":"expense","shıǵım, keshegi kúnge salıstırǵanda":"expenses vs yesterday","shıǵım, ótken ayǵa salıstırǵanda":"expenses vs last month","swm":"UZS","sáne":"date","tólem":"payment","tólendi":"paid","«+» túymesi menen jańa balans ashıń: naqd pul, plastik karta yamasa dollar, rubl, teńge. Kartanı basıp tursańız — ótkeriw, obmen hám redaktorlaw.":"Use “+” to add a new balance: cash, card or dollar, ruble, tenge. Long-press a card to transfer, exchange or edit.","Ájayıp":"Great","Ákesiniń atı":"Middle name","Ármanıńızǵa qádem-qádem":"Step by step to your dream","Ármanıńızǵa shiyshe kopilka ashıń: summa hám múddet qoyıń, hár ay qansha salıw kerekligin E-esap ózi esaplaydı.":"Open a glass jar for your dream: set an amount and a deadline, and E-esap calculates the monthly savings.","Ónim yamasa xızmetińiz haqqında qısqasha":"Briefly about your product or service","Óshirilgen":"Off","Óshiriw":"Delete","Ótkerildi":"Transferred","Ótkerip jiberiw":"Skip","Ótkeriw":"Transfer","Ótkeriw ushın jáne bir balans kerek":"You need another balance to transfer","Ótkizip jiberiw":"Skip","Ózińizge qolaylı tildi saylań: qaraqalpaqsha, ózbekshe, qazaqsha, ruscha yamasa inglisshe.":"Pick your language: Karakalpak, Uzbek, Kazakh, Russian or English.","Úlken jazıw hám anıq tuymeler":"Large text and clear buttons","Úlkenler ushın rejim":"Senior mode","Úlkenler ushın rejim ne?":"What is senior mode?","Únemlendi":"Saved","Únemleysiz":"You'll save","Úskeneler":"Equipment","Úy buyımları":"Household goods","Úy-jay hám kommunal":"Housing and utilities","Úy-jay qárejetleri":"Housing expenses","ǵa shekem qaytaraman. Raxmet!":"— I'll repay by then. Thank you!","5 xanalı kodtı kiritiń":"Enter the 5-digit code","Aldınǵı kún":"Previous day","Arza qabıl etildi":"Request received","Arza qaldırıw":"Leave a request","Ay juwmaǵı bonusı":"Month-end bonus","Dawıs":"Sound","1. Eń kóp shıǵım — «Kiyim-keshek» (29%). Onı 15% qısqartsańız, ayına 45 mıń swm únemleysiz.":"1. Top expense is “Clothing” (29%). Cut it by 15% to save 45k UZS a month.","2. Ájayıp! Kirimińizdiń 48% ın saqlap atırsız.":"2. Great! You're saving 48% of your income.","4. 24 saat qaǵıydası: kútilmegen úlken satıp alıwdı bir kúnge keyinge qaldırıń.":"4. The 24-hour rule: postpone an unplanned big purchase by a day.","Gúlnara":"Gulnara","Humans":"Humans","Aurora stili hám widgetler":"Aurora style and widgets","Aurora stilin qosıw":"Turn on Aurora style","BUSINESS statusı":"BUSINESS status","BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.":"BUSINESS status, unlimited AI, Business panel and Aurora style — all in one plan.","MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.":"MAX features, Aurora style and BUSINESS status will be turned off. Payments are not refunded.","Tildi saylań":"Choose a language","Akkaunttı óshiriw":"Delete account","Akkauntıńız hám ondaǵı barlıq maǵlıwmatlar (balanslar, operaciyalar, maqsetler, qarızlar) biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"Your account and all its data (balances, transactions, goals, debts) will be permanently deleted. This can't be undone.","Anıq pa?":"Are you sure?","Bul sońǵı eskertiw. Akkaunt hám barlıq maǵlıwmatlar qayta tiklenbeydi.":"This is the final warning. The account and data can't be restored.","Biraqola óshiriw":"Delete permanently","Balans, maqset, qarız, AI kómekshi hám statistika — bárin qısqa sayaxatta birge úyrenip shıǵayıq. Qádem-qádem kórsetemen ✨":"Balance, goals, debts, the AI assistant and stats — let's explore them together on a short tour. I'll show you step by step ✨","Úyrenip shıǵıw":"Explore","Erteń":"Tomorrow","Ay qaldı":"Months left","AKKAUNT":"ACCOUNT","Kirilgen nomer":"Signed-in number","Maǵlıwmatlar saqlanadı":"Your data is kept","Barlıq maǵlıwmatlar biraqola óshiriledi":"All data is deleted permanently","Qosımsha maǵan unamadı":"I didn't like the app","Kerekli múmkinshilik jetispeydi":"A feature I need is missing","Basqa qosımshaǵa ótemen":"I'm switching to another app","Jańa akkaunt ashıwım kerek":"I need to create a new account","Basqa sebep":"Other reason","Ketiwińizge ókinemiz 😔 Iltimas, sebebin aytıń — bul E-esap tı jaqsılawǵa járdem beredi.":"We're sorry to see you go 😔 Please tell us why — it helps us improve E-esap.","Sebebin jazıń...":"Write the reason...","Barlıq balanslar, operaciyalar, maqsetler hám qarızlar biraqola óshiriledi. Bunı qaytarıp bolmaydı.":"All balances, transactions, goals and debts will be permanently deleted. This can't be undone.","Qosımsha boyınsha sorawlarǵa juwap":"Answers about the app","24/7 kómek":"24/7 help","Qalay járdem bere alaman?":"How can I help?","E-esap qalay isleytuǵını, qaysı bólim ne ushın ekeni — qálegen sorawıńızdı beriń. Tómendegi temalardan da saylawıńızǵa boladı 👇":"How E-esap works, what each section is for — ask anything. Or pick a topic below 👇","Sorawıńızdı jazıń...":"Type your question...","Operaciyanı qalay qosaman?":"How do I add a transaction?","Balans hám kartalar":"Balance and cards","Qarız jazıw":"Record a debt","AI chat qalay isleydi?":"How does AI chat work?","Limit qoyıw":"Set a limit","Tildi ózgertiw":"Change language","Paroldi umıttım":"Forgot my password","Maǵlıwmatlarım qayerde?":"Where is my data?","Operaciya qosıw":"Add transaction","AI chattı ashıw":"Open AI chat","Statistikaǵa ótiw":"Go to statistics","Til saylaw":"Choose language","trln":"T","Maqsetti redaktorlaw":"Edit goal","Qarızdı redaktorlaw":"Edit debt","Jıynalǵan summa":"Saved amount","Ózgertiw":"Edit"}};
/* qosımsha awdarmalar (maqset súwreti) */
[['Ármanım', 'Orzuim', 'Арманым', 'Моя мечта', 'My dream'],
 ['Ármanıńız súwreti', 'Orzuingiz rasmi', 'Арманыңыздың суреті', 'Фото вашей мечты', 'Photo of your dream'],
 ['Súwret júklew', 'Rasm yuklash', 'Сурет жүктеу', 'Загрузить фото', 'Upload photo'],
 ['Maqset betinde banka janında kórinedi', "Maqsad sahifasida banka yonida ko'rinadi", 'Мақсат бетінде банка жанында көрінеді', 'Будет видно рядом с копилкой', 'Shown next to the jar on the goal page'],
 ['Súwret júklenbedi', 'Rasm yuklanmadi', 'Сурет жүктелмеді', 'Не удалось загрузить фото', "Couldn't load the photo"],
 ['Operaciyanı óshiriw', "Operatsiyani o'chirish", 'Операцияны өшіру', 'Удалить операцию', 'Delete transaction'],
 ['Bul operaciya óshiriledi. Keyin qaytarıwǵa boladı.', "Bu operatsiya o'chiriladi. Keyin qaytarish mumkin.", 'Бұл операция өшіріледі. Кейін қайтаруға болады.', 'Операция будет удалена. Её можно будет вернуть.', 'This transaction will be deleted. You can restore it later.'],
 ['Bul operaciya óshirildi', "Bu operatsiya o'chirildi", 'Бұл операция өшірілді', 'Эта операция удалена', 'This transaction was deleted'],
 ['Barlıǵın kóriw', "Barchasini ko'rish", 'Барлығын көру', 'Показать все', 'See all'],
 ['Esap / shot nomeri', 'Hisob raqami', 'Шот нөмірі', 'Номер счёта', 'Account number'],
 ['Tariften shıǵıw', 'Tarifdan chiqish', 'Тарифтен шығу', 'Отключить тариф', 'Cancel plan'],
 ['Súwret saqlanbadı: orın jetkiliksiz', "Rasm saqlanmadi: joy yetarli emas", 'Сурет сақталмады: орын жеткіліксіз', 'Фото не сохранено: мало места', 'Photo not saved: not enough space']
].forEach(([k, uz, kk, ru, en]) => { I18N.uz[k] = uz; I18N.kk[k] = kk; I18N.ru[k] = ru; I18N.en[k] = en; });
const t = s => { if (S.lang === 'cyr') return toCyr(s); const d = I18N[S.lang]; if (!d || s == null) return s; const v = d[s]; if (v !== undefined) return v; const k = String(s).trim(); return d[k] !== undefined ? d[k] : s; };

/* ================= dates & money ================= */
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const today = () => iso(new Date());
const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
const WD = ['Ek', 'Dú', 'Si', 'Sá', 'Pi', 'Ju', 'Sh'];
const WD_LONG = ['Ekshembi', 'Dúyshembi', 'Siyshembi', 'Sárshembi', 'Piyshembi', 'Juma', 'Shembi'];
function dayLabel(s) {
  const td = today(), yd = iso(addDays(new Date(), -1));
  if (s === td) return t('Bugin');
  if (s === yd) return t('Keshe');
  const d = fromIso(s);
  return `${d.getDate()} ${t(MONTHS[d.getMonth()])}, ${t(WD_LONG[d.getDay()])}`;
}
const grp = n => String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const cur = () => t('swm');
function kmVsMonth(m) { const M = t(MONTHS[m]); return ({ uz: `${M}ga nisbatan`, kk: `${M} айымен салыстырғанда`, ru: `к прошлому месяцу`, en: `vs ${M}` })[S.lang] || t(`${MONTHS[m]}ǵa salıstırǵanda`); }
const money = (n, sign = false) => (sign ? (n < 0 ? '−' : '+') : (n < 0 ? '−' : '')) + grp(n) + ' ' + cur();
function short(n) {
  const a = Math.abs(n);
  const f = (v) => { const r = Math.round(v * 10) / 10, [ip, dp] = Math.abs(r).toString().split('.'); return (r < 0 ? '-' : '') + ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (dp ? ',' + dp : ''); };
  if (a >= 1e12) return f(n / 1e12) + ' ' + t('trln');
  if (a >= 1e9) return f(n / 1e9) + ' ' + t('mlrd');
  if (a >= 1e6) return f(n / 1e6) + ' ' + t('mln');
  if (a >= 1e3) return Math.round(n / 1e3) + ' ' + t('mıń');
  return String(Math.round(n));
}
const parseMoney = v => +String(v || '').replace(/[^\d]/g, '') || 0;
const hideable = s => S.hideBal ? `<span class="blurred">${s}</span>` : s;

/* ================= defaults ================= */
const PALETTE = ['#F59E0B', '#3B82F6', '#EF4444', '#16A34A', '#8B5CF6', '#EC4899', '#14B8A6', '#0EA5E9', '#F97316', '#6366F1', '#84CC16', '#64748B'];
const CAT_ICONS = ['shopping-basket', 'car', 'zap', 'smartphone', 'heart-pulse', 'shirt', 'gamepad-2', 'graduation-cap', 'house', 'coffee', 'gift', 'ellipsis', 'briefcase', 'store', 'sparkles', 'trending-up', 'circle-plus', 'plane', 'baby', 'dumbbell', 'pill', 'fuel', 'book-open', 'film', 'wrench', 'paw-print', 'music', 'laptop', 'utensils', 'banknote'];
const CAT_VIVID = { food: '#F59E0B', transport: '#3B82F6', utility: '#EAB308', comm: '#14B8A6', health: '#EF4444', cloth: '#EC4899', fun: '#8B5CF6', edu: '#0EA5E9', home: '#6366F1', cafe: '#D97706', gift: '#F43F5E', other: '#64748B', salary: '#16A34A', biz: '#0D9488', bonus: '#F59E0B', invest: '#7C3AED', debt: '#EA580C' };
const VIVID = ['#F59E0B', '#3B82F6', '#EF4444', '#16A34A', '#8B5CF6', '#EC4899', '#14B8A6', '#0EA5E9', '#F97316', '#6366F1', '#84CC16', '#D946EF'];
function catCol(c) { if (!c) return '#64748B'; if (c.ownColor) return c.color; if (c.bg && typeof KM_GROUPS !== 'undefined') { const g = KM_GROUPS.find(x => x[0] === c.bg); if (g) return g[3]; } if (c.grp && S.cgroups) { const g = S.cgroups.find(x => x.id === c.grp); if (g && g.color) return g.color; } if (CAT_VIVID[c.id]) return CAT_VIVID[c.id]; if (c.ownColor) return c.color; let h = 0; for (const ch of String(c.id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return VIVID[h % VIVID.length]; }
function defaultCats() {
  return [
    { id: 'food', name: 'Azıq-awqat', icon: 'shopping-basket', color: '#FF7605', type: 'expense' },
    { id: 'transport', name: 'Transport', icon: 'car', color: '#45403C', type: 'expense' },
    { id: 'utility', name: 'Kommunal', icon: 'zap', color: '#FFB77C', type: 'expense' },
    { id: 'comm', name: 'Baylanıs', icon: 'smartphone', color: '#E66700', type: 'expense' },
    { id: 'health', name: 'Densawlıq', icon: 'heart-pulse', color: '#FFB376', type: 'expense' },
    { id: 'cloth', name: 'Kiyim-keshek', icon: 'shirt', color: '#7F3F0A', type: 'expense' },
    { id: 'fun', name: 'Kewil ashıw', icon: 'gamepad-2', color: '#FFB376', type: 'expense' },
    { id: 'edu', name: 'Bilim', icon: 'graduation-cap', color: '#E66700', type: 'expense' },
    { id: 'home', name: 'Turaq jay', icon: 'house', color: '#544F4B', type: 'expense' },
    { id: 'cafe', name: 'Kafe', icon: 'coffee', color: '#FFC697', type: 'expense' },
    { id: 'gift', name: 'Sawǵalar', icon: 'gift', color: '#FF831D', type: 'expense' },
    { id: 'other', name: 'Basqa', icon: 'ellipsis', color: '#978F88', type: 'expense' },
    { id: 'salary', name: 'Aylıq', icon: 'briefcase', color: '#FF7605', type: 'income' },
    { id: 'biz', name: 'Biznes', icon: 'store', color: '#E66700', type: 'income' },
    { id: 'bonus', name: 'Bonus', icon: 'sparkles', color: '#FFB77C', type: 'income' },
    { id: 'gift_in', name: 'Sawǵa', icon: 'gift', color: '#FFB376', type: 'income' },
    { id: 'invest', name: 'Investiciya', icon: 'trending-up', color: '#7F3F0A', type: 'income' },
    { id: 'other_in', name: 'Basqa kirim', icon: 'circle-plus', color: '#544F4B', type: 'income' }
  ];
}
function seedTx() {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const tx = []; const now = new Date();
  const notes = {
    food: ['Bazar', 'Korzinka', 'Nan hám sút', 'Miywe'], transport: ['Taksi', 'Benzin', 'Avtobus'], cafe: ['Kofe', 'Túslik', 'Lavash'],
    comm: ['Telefon balansı'], fun: ['Kino', 'Oyın'], health: ['Dárixana'], cloth: ['Krossovka', 'Kóylek'], gift: ['Tuwılǵan kún sawǵası'], other: ['Úy buyımları']
  };
  const plan = [['food', .55, 35000, 180000], ['transport', .5, 12000, 60000], ['cafe', .3, 20000, 90000], ['comm', .05, 30000, 60000], ['fun', .08, 40000, 120000], ['health', .06, 25000, 150000], ['cloth', .04, 150000, 450000], ['gift', .03, 100000, 300000], ['other', .07, 20000, 110000]];
  for (let i = 62; i >= 0; i--) {
    const d = addDays(now, -i), ds = iso(d);
    if (d.getDate() === 5) tx.push({ id: uid(), type: 'income', amount: 6500000, cat: 'salary', wallet: 'uzcard', date: ds, note: 'Aylıq' });
    if (d.getDate() === 20) tx.push({ id: uid(), type: 'income', amount: 1200000 + Math.round(rnd() * 8) * 100000, cat: 'biz', wallet: 'humo', date: ds, note: 'Buyırtpa ushın' });
    if (d.getDate() === 1) tx.push({ id: uid(), type: 'expense', amount: 1800000, cat: 'home', wallet: 'uzcard', date: ds, note: 'Ijara haqı' });
    if (d.getDate() === 6 || d.getDate() === 21) tx.push({ id: uid(), type: 'transfer', amount: 1000000, wallet: 'uzcard', to: 'cash', date: ds, note: '' });
    if (d.getDate() === 10) tx.push({ id: uid(), type: 'expense', amount: 280000 + Math.round(rnd() * 10) * 10000, cat: 'utility', wallet: 'humo', date: ds, note: 'Svet hám gaz' });
    plan.forEach(([c, p, mn, mx]) => {
      if (rnd() < p) {
        const amt = Math.round((mn + rnd() * (mx - mn)) / 1000) * 1000;
        const nl = notes[c] || ['']; const w = rnd() < .45 ? 'cash' : (rnd() < .6 ? 'uzcard' : 'humo');
        tx.push({ id: uid(), type: 'expense', amount: amt, cat: c, wallet: w, date: ds, note: nl[Math.floor(rnd() * nl.length)] });
      }
    });
  }
  const b = addDays(now, -12); tx.push({ id: uid(), type: 'income', amount: 500000, cat: 'bonus', wallet: 'uzcard', date: iso(b), note: 'Ay juwmaǵı bonusı' });
  return tx;
}
function defaults(withDemo = true) {
  const now = new Date();
  return {
    v: 1, lang: 'lat', style: 'classic', mode: 'dark', elder: false, hideBal: false,
    name: 'Paydalanıwshı', plan: 'pro', planUntil: null,
    wallets: [
      { id: 'cash', name: 'Naqd pul', icon: 'banknote', theme: 'paper', initial: 0 },
      { id: 'uzcard', name: 'Plastik karta', icon: 'credit-card', theme: 'violet', initial: 0 }
    ],
    cats: defaultCats(),
    tx: withDemo ? seedTx() : [],
    budget: withDemo ? { total: 4500000, cats: { food: 1500000, transport: 500000, cafe: 450000, fun: 300000 } } : { total: 0, cats: {} },
    goals: withDemo ? [
      { id: uid(), name: 'Jańa noutbuk', target: 9000000, saved: 3150000, icon: 'laptop' },
      { id: uid(), name: 'Sayaxat', target: 5000000, saved: 1200000, icon: 'plane' }
    ] : [],
    debts: withDemo ? [
      { id: uid(), name: 'Azamat', amount: 300000, type: 'given', due: iso(addDays(now, 2)), paid: false },
      { id: uid(), name: 'Gúlnara', amount: 500000, type: 'taken', due: iso(addDays(now, 9)), paid: false }
    ] : [],
    recurring: withDemo ? [
      { id: uid(), name: 'Internet', amount: 120000, day: 15, cat: 'comm', paid: '' },
      { id: uid(), name: 'Ijara haqı', amount: 1800000, day: 1, cat: 'home', paid: iso(now).slice(0, 7) },
      { id: uid(), name: 'Sport zal', amount: 250000, day: 20, cat: 'health', paid: '' }
    ] : [],
    ads: [], seenPromos: [], invoices: [], autoRenew: true, planWallet: null, payHist: [], ai: [], aiCount: { d: '', n: 0 }, seen: [], pin: null, homeWallet: 'all', rated: 0
  };
}

let S = Object.assign(defaults(false), store.load() || {});
if (!['pro', 'max'].includes(S.plan)) { S.plan = 'pro'; S.planUntil = null; }
if (S.autoRenew === undefined) S.autoRenew = true;
/* Úlkenler ushın rejim ádette óshik — hámme akkauntlarda bir ret óshiriledi, keyin paydalanıwshı ózi qosa aladı */
if (!S.elderOff1) { S.elder = false; S.elderOff1 = true; try { store.save(S); } catch (e) {} }
if (!Array.isArray(S.invoices)) S.invoices = [];
if (!S.profile) S.profile = { first: S.name && S.name !== 'Paydalanıwshı' ? S.name.split(' ')[0] : '', last: S.name && S.name.includes(' ') ? S.name.split(' ').slice(1).join(' ') : '', father: '', phone: '', photo: '' };

const save = () => store.save(S);
const UI = { tab: 'home', statPeriod: 'month', statOffset: 0, statType: 'expense', svcQuery: '', svcSearch: false, svcGroup: 'all', homeDay: null, capSel: null, gaugeCat: 'all' };

/* ================= derived data ================= */
const catById = id => S.cats.find(c => c.id === id) || { id, name: 'Basqa', icon: 'ellipsis', color: '#978F88', type: 'expense' };
const walletById = id => S.wallets.find(w => w.id === id);
const walletName = id => walletById(id) ? t(walletById(id).name) : '—';
const WCURS = ['UZS', 'USD', 'RUB', 'KZT'];
const WCUR_N = { UZS: 'Swm', USD: 'Dollar', RUB: 'Rubl', KZT: 'Teńge' };
const wCur = w => (w && w.cur && w.cur !== 'UZS' && RATES[w.cur]) ? w.cur : 'UZS';
const curLbl = c => c === 'UZS' ? cur() : c;
function fmtNat(v, c) { if (c === 'UZS') return grp(v); const a = Math.abs(v); return a >= 1000 ? grp(a) : (Math.round(a * 100) / 100).toFixed(2).replace('.', ',').replace(/,00$/, ''); }
function txNat(x, side, id) { const c = wCur(walletById(id)); if (c === 'UZS') return x.amount; const v = side === 'a' ? x.fa : x.fb; return v != null ? +v : x.amount / (RATES[c] || 1); }
function walletNative(id) {
  const w = walletById(id); let b = w ? +w.initial || 0 : 0;
  for (const x of S.tx) {
    if (x.type === 'income' && x.wallet === id) b += txNat(x, 'a', id);
    else if (x.type === 'expense' && x.wallet === id) b -= txNat(x, 'a', id);
    else if (x.type === 'transfer') { if (x.wallet === id) b -= txNat(x, 'a', id); if (x.to === id) b += txNat(x, 'b', id); }
  }
  return b;
}
const kmWCardAmt = w => { const s0 = walletShow(w.id); if (s0.length <= 11) return s0; const c = wCur(w), v = c === 'UZS' ? walletBal(w.id) : walletNative(w.id); return (v < 0 ? '−' : '') + short(Math.abs(v)); };
const walletShow = id => { const c = wCur(walletById(id)); const v = c === 'UZS' ? walletBal(id) : walletNative(id); return (v < 0 ? '−' : '') + fmtNat(v, c); };
function walletBal0(id) {
  const w = walletById(id); if (wCur(w) !== 'UZS') return Math.round(walletNative(id) * RATES[wCur(w)]);
  let b = w ? +w.initial || 0 : 0;
  for (const x of S.tx) {
    if (x.type === 'income' && x.wallet === id) b += x.amount;
    else if (x.type === 'expense' && x.wallet === id) b -= x.amount;
    else if (x.type === 'transfer') { if (x.wallet === id) b -= x.amount; if (x.to === id) b += x.amount; }
  }
  return b;
}
const totalBal = () => S.wallets.reduce((a, w) => a + walletBal(w.id), 0);
const inRange = (a, b, wallet = 'all') => S.tx.filter(x => x.date >= a && x.date <= b && (wallet === 'all' || x.wallet === wallet || x.to === wallet));
const sum = (list, type) => list.filter(x => x.type === type).reduce((a, x) => a + x.amount, 0);
function monthRange(d = new Date()) { const y = d.getFullYear(), m = d.getMonth(); return { a: iso(new Date(y, m, 1)), b: iso(new Date(y, m + 1, 0)) }; }
function streak() {
  const days = new Set(S.tx.map(x => x.date)); let n = 0, d = new Date();
  if (!days.has(iso(d))) d = addDays(d, -1);
  while (days.has(iso(d))) { n++; d = addDays(d, -1); }
  return n;
}
const PLANS = { pro: { name: 'PRO', price: 19900, icon: 'zap' }, max: { name: 'MAX', price: 499000, icon: 'gem' } };
function plan() {
  return 'max'; // tarifler alıp taslandı — barlıq múmkinshilikler hámmege ashıq
}
const isMax = () => plan() === 'max';
const isPro = () => true;
function catSpent(catId, r = monthRange()) { return inRange(r.a, r.b).filter(x => x.type === 'expense' && x.cat === catId).reduce((a, x) => a + x.amount, 0); }
function notifications() {
  const out = []; const r = monthRange(); const spent = sum(inRange(r.a, r.b), 'expense');
  if (S.budget.total > 0 && spent / S.budget.total >= .8) out.push({ id: 'b-' + r.a + (spent > S.budget.total ? 'o' : ''), icon: 'triangle-alert', title: spent > S.budget.total ? 'Aylıq byudjetten asıp kettińiz' : 'Byudjettiń 80% ı jumsaldı', text: `${money(spent)} / ${money(S.budget.total)}` });
  Object.entries(S.budget.cats || {}).forEach(([c, lim]) => { const s = catSpent(c); if (lim > 0 && s > lim) out.push({ id: 'c-' + c + r.a, icon: 'chart-pie', title: `${t(catById(c).name)}: ${t('limit asıldı')}`, text: `${money(s)} / ${money(lim)}`, raw: true }); });
  const now = new Date(), ym = today().slice(0, 7);
  S.recurring.forEach(p => {
    if (p.paid === ym) return; const due = new Date(now.getFullYear(), now.getMonth(), Math.min(p.day, 28)); const diff = Math.round((due - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
    if (diff <= 3) out.push({ id: 'r-' + p.id + ym, icon: 'calendar-clock', title: `${t(p.name)} — ${diff < 0 ? t('múddeti ótti') : diff === 0 ? t('bugin tólew kerek') : diff + ' ' + t('kúnnen keyin')}`, text: money(p.amount), raw: true });
  });
  S.debts.filter(d => !d.paid && d.due).forEach(d => {
    const diff = Math.round((fromIso(d.due) - fromIso(today())) / 864e5);
    if (diff <= 3) out.push({ id: 'd-' + d.id, icon: 'hand-coins', title: `${esc(d.name)}: ${d.type === 'given' ? t('qarızdı qaytarıw múddeti') : t('qarızdı tólew múddeti')}`, text: `${money(d.amount)} · ${diff < 0 ? t('múddeti ótti') : diff === 0 ? t('bugin') : diff + ' ' + t('kún qaldı')}`, raw: true });
  });
  S.goals.filter(g => g.saved >= g.target).forEach(g => out.push({ id: 'g-' + g.id, icon: 'target', title: `${t('Maqsetke jettińiz')}: ${esc(t(g.name))}`, text: money(g.target), raw: true }));
  try { hubLoad().broadcasts.slice().reverse().forEach(b => out.unshift({ id: 'bc-' + b.id, icon: 'megaphone', title: esc(t(b.title)), text: esc(t(b.text)) + ' · ' + b.date.split('-').reverse().join('.'), raw: true })); } catch (e) {}
  out.push({ id: 'welcome', icon: 'sparkles', title: t('E-esap ǵa xosh keldińiz!'), text: t('AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.'), raw: true });
  return out;
}
const unread = () => notifications().filter(n => !S.seen.includes(n.id)).length;

/* ================= theming ================= */
function applyLook() {
  const r = document.documentElement;
  let mode = S.mode;
  if (mode === 'auto') mode = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (S.style === 'aurora') S.style = 'glass';
  const aur = false;
  if (aur) mode = 'dark';
  r.dataset.mode = mode; r.dataset.style = aur ? 'aurora' : (S.style === 'aurora' ? 'glass' : S.style); r.dataset.aurora = aur ? '1' : '0'; r.dataset.icons = S.iconMode === 'emoji' ? 'emoji' : 'icon';
  r.dataset.tier = S.plan === 'max' ? 'max' : 'pro'; r.dataset.elder = S.elder ? '1' : '0';
  r.lang = ({ cyr: 'kaa-Cyrl', lat: 'kaa', uz: 'uz', kk: 'kk', ru: 'ru', en: 'en' })[S.lang] || 'kaa';
  const m = $('meta[name="theme-color"]'); if (m) m.content = mode === 'dark' ? '#0E0A1C' : '#7B5CFA';
}
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S.mode === 'auto') applyLook(); }); } catch (e) {}

/* ================= toast ================= */
let toastTimer;
function toast(msg, opt = {}) {
  if (opt.icon === 'circle-alert') sfx('error');
  const el = $('#toast');
  el.innerHTML = `<span class="t-ic">${ic(opt.icon || 'check')}</span><span>${msg}</span>${opt.undo ? `<button id="tUndo">${t('Qaytarıw')}</button>` : ''}`;
  refreshIcons(); el.classList.add('show');
  if (opt.undo) $('#tUndo').onclick = () => { opt.undo(); el.classList.remove('show'); };
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), opt.ms || 2600);
}

/* ================= sheet system ================= */
const Sheet = {
  stack: [],
  el: () => $('#sheet'),
  open(o) { this.stack.push(o); this.render(true); },
  replace(o) { this.stack[this.stack.length - 1] = o; this.render(); },
  back() { const o = this.stack.pop(); o && o.onClose && o.onClose(); if (!this.stack.length) return this.close(); this.render(); },
  close() {
    this.stack.forEach(o => o.onClose && o.onClose()); this.stack = [];
    const el = this.el(); el.classList.remove('show'); el.style.transform = '';
    const ov = $('#overlay'); ov.classList.remove('show');
    setTimeout(() => { if (!this.stack.length) { ov.classList.add('hide'); el.innerHTML = ''; } }, 420);
  },
  render(first) {
    const o = this.stack[this.stack.length - 1], el = this.el();
    el.className = 'sheet' + (o.full ? ' full' : '') + (el.classList.contains('show') ? ' show' : '');
    el.innerHTML = `<div class="grab"></div>
      <div class="sh-head">${this.stack.length > 1 ? `<button class="sh-close" data-act="back" aria-label="back">${ic('chevron-left')}</button>` : ''}
        ${o.head || `<h2>${o.title || ''}</h2>`}<button class="sh-close" data-act="close" aria-label="close">${ic('x')}</button></div>
      ${o.raw ? o.html() : `<div class="sh-body">${o.html()}</div>`}`;
    refreshIcons();
    const ov = $('#overlay'); ov.classList.remove('hide');
    requestAnimationFrame(() => { ov.classList.add('show'); el.classList.add('show'); });
    $('[data-act="close"]', el).onclick = () => this.close();
    const b = $('[data-act="back"]', el); if (b) b.onclick = () => this.back();
    this.drag(el);
    o.mount && o.mount(el);
  },
  refresh() { if (this.stack.length) this.render(); },
  drag(el) {
    const handle = $('.grab', el), head = $('.sh-head', el); let y0 = null, dy = 0;
    const down = e => { if (e.target.closest('button')) return; y0 = e.clientY; dy = 0; el.style.transition = 'none'; };
    const move = e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); el.style.transform = `translate(-50%, ${dy}px)`; };
    const up = () => { if (y0 === null) return; el.style.transition = ''; el.style.transform = ''; if (dy > 110) this.close(); y0 = null; };
    [handle, head].forEach(h => h && h.addEventListener('pointerdown', down));
    window.onpointermove = move; window.onpointerup = up;
  }
};
$('#overlay').onclick = () => Sheet.close();
document.addEventListener('keydown', e => { if (e.key === 'Escape' && Sheet.stack.length) Sheet.close(); });

function ask(title, text, okLabel = 'Tastıyıqlaw', danger = false) {
  return new Promise(res => {
    let done = false;
    Sheet.open({
      title: t(title), onClose: () => { if (!done) { done = true; res(false); } },
      html: () => `<p class="muted" style="margin:0">${t(text)}</p>
        <div class="row2"><button class="btn ghost" id="aNo">${t('Biykarlaw')}</button><button class="btn ${danger ? 'danger' : 'pri'}" id="aOk">${t(okLabel)}</button></div>`,
      mount: () => {
        $('#aNo').onclick = () => { done = true; res(false); Sheet.back(); };
        $('#aOk').onclick = () => { done = true; if (danger) setTimeout(() => sfx('del'), 30); res(true); Sheet.back(); };
      }
    });
  });
}


/* ================= full-screen pages ================= */
const Page = {
  stack: [],
  el: () => $('#page'),
  open(o) { this.stack.push(o); this.render(true); },
  back() { const o = this.stack.pop(); o && o.onClose && o.onClose(); if (!this.stack.length) return this.hide(); this.render(true); },
  closeAll() { this.stack.forEach(o => o.onClose && o.onClose()); this.stack = []; this.hide(); },
  hide() { const el = this.el(); el.classList.remove('show'); setTimeout(() => { if (!this.stack.length) el.innerHTML = ''; }, 460); },
  render(anim) {
    const o = this.stack[this.stack.length - 1], el = this.el();
    el.innerHTML = `<div class="pg-deco" aria-hidden="true"><i></i><i></i><i></i></div>
      <header class="pg-head"><button class="pg-btn" data-pg="back" aria-label="back">${ic('arrow-left')}</button>
        <div class="pg-title">${o.head || `<h2>${o.title || ''}</h2>${o.sub ? `<small>${o.sub}</small>` : ''}`}</div>${o.right || '<span class="pg-sp"></span>'}</header>
      ${o.raw ? o.html() : `<div class="pg-body">${o.html()}</div>`}`;
    refreshIcons();
    if (anim && el.classList.contains('show')) { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
    requestAnimationFrame(() => el.classList.add('show'));
    $('[data-pg="back"]', el).onclick = () => this.back();
    o.mount && o.mount(el);
  },
  refresh() {
    if (!this.stack.length) return;
    const b = $('.pg-body', this.el()); const st = b ? b.scrollTop : 0; this.render(); const b2 = $('.pg-body', this.el()); if (b2) b2.scrollTop = st;
  }
};
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !Sheet.stack.length && Page.stack.length) Page.back(); });
function displayName() { const p = S.profile || {}; const n = [p.first, p.last].filter(Boolean).join(' '); return n || 'Paydalanıwshı'; }
function firstName() { const p = S.profile || {}; return p.first || 'Paydalanıwshı'; }
function kmModel(g, uid0 = '') {
  const id = 'md' + (g || 'x') + uid0;
  const defs = `<defs>
    <radialGradient id="${id}b" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#FFCDA5"/><stop offset=".55" stop-color="#FF7605"/><stop offset="1" stop-color="#E66700"/></radialGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3CF"/><stop offset="1" stop-color="#F3C2A0"/></linearGradient>
    <linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E2A986"/><stop offset="1" stop-color="#EDB896"/></linearGradient>
    <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7F3F0A"/><stop offset="1" stop-color="#352110"/></linearGradient>
    <linearGradient id="${id}c1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3F3329"/><stop offset="1" stop-color="#1E1813"/></linearGradient>
    <linearGradient id="${id}c2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFECDC"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFE6D2"/></linearGradient>
    <clipPath id="${id}k"><circle cx="60" cy="60" r="60"/></clipPath></defs>
    <circle cx="60" cy="60" r="60" fill="url(#${id}b)"/><circle cx="60" cy="60" r="59" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`;
  const _eye = (x, y, f) => `<ellipse cx="${x}" cy="${y}" rx="2.5" ry="3" fill="#3B2411"/><circle cx="${x + .9}" cy="${y - 1}" r=".9" fill="#fff"/>${f ? `<path d="M${x + (x < 60 ? -2.4 : 2.4)} ${y - 2.2}l${x < 60 ? -1.8 : 1.8} -1.2" stroke="#3B2411" stroke-width="1.2" stroke-linecap="round"/>` : ''}`;
  return `<svg class="mdl ghost" viewBox="0 0 120 120">${defs}<g clip-path="url(#${id}k)">
    <ellipse cx="60" cy="102" rx="22" ry="4.4" fill="#7F3F0A" opacity=".35" class="gh-sh"/>
    <g class="gh-b">
      <path d="M36 58c0-16 10.6-28 24-28s24 12 24 28v28c0 3.4-3.4 4.6-5.6 2.2-2.6-2.8-5.6-2.8-8 0s-5.4 2.8-7.8 0c-1.6-1.8-3.6-2.8-5.2-.4-2.6 3.2-5.6 3.2-8 .4-2.4-2.8-5.4-2.8-8 0-2 2.2-5.4 1-5.4-2.2z" fill="url(#${id}g)"/>
      <path d="M43 50c1.6-7.6 7-12.6 13.6-13.6" stroke="#fff" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="51.5" cy="58" rx="3.8" ry="5" fill="#3B2411"/><ellipse cx="68.5" cy="58" rx="3.8" ry="5" fill="#3B2411"/>
      <circle cx="52.8" cy="56" r="1.4" fill="#fff"/><circle cx="69.8" cy="56" r="1.4" fill="#fff"/>
      <ellipse cx="45" cy="66" rx="4" ry="2.2" fill="#FFC697" opacity=".75"/><ellipse cx="75" cy="66" rx="4" ry="2.2" fill="#FFC697" opacity=".75"/>
      <path d="M56.6 66q3.4 3 6.8 0" stroke="#3B2411" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M36.4 70q-6 2-7 7M83.6 70q6 2 7 7" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".95"/>
    </g></g></svg>`;
}
function avatarHtml(cls = '') {
  const p = S.profile || {};
  return p.photo ? `<span class="ava ${cls}"><img src="${p.photo}" alt=""></span>` : `<span class="ava mdl-ava ${cls}">${kmModel('', cls)}</span>`;
}

/* ================= NAV ================= */
function setTab(tab) {
  UI.tab = tab;
  $$('.nav-it').forEach((b, i) => { b.classList.toggle('on', b.dataset.tab === tab); if (b.dataset.tab === tab) $('.nav-pill').style.setProperty('--i', i); });
  kmFitNav();
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'v-' + tab));
  renderView(tab); window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  vib(8);
}
$$('.nav-it').forEach(b => b.onclick = () => { if (Page.stack.length) Page.closeAll(); setTab(b.dataset.tab); });
$('#aiBtn').onclick = () => openAI();

function renderView(tab = UI.tab) {
  ({ home: renderHome, stats: renderStats, services: renderServices, profile: renderProfile })[tab]();
  refreshIcons();
  const top = Page.stack[Page.stack.length - 1]; if (top && !top.noRefresh) Page.refresh();
}
function renderAll() {
  applyLook();
  $$('[data-t]').forEach(e => e.textContent = t(e.dataset.t));
  $$('.nav-it').forEach(b => b.setAttribute('aria-label', t($('.lbl', b).dataset.t)));
  renderView();
}

/* ================= HOME ================= */
function greeting() {
  const h = new Date().getHours();
  return h < 5 ? 'Qayırlı tún' : h < 11 ? 'Qayırlı tań' : h < 18 ? 'Qayırlı kún' : 'Qayırlı kesh';
}
const initials = n => (String(n).trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2) || 'P').toUpperCase();

function txRow(x) {
  const c = x.type === 'transfer' ? { icon: 'arrow-left-right', color: '#1c1c1c', name: 'Awdarma' } : catById(x.cat);
  const sub = x.type === 'transfer' ? `${walletName(x.wallet)} → ${walletName(x.to)}` : `${walletName(x.wallet)}${x.note ? ' · ' + esc(t(x.note)) : ''}`;
  const amt = x.type === 'income' ? `<span class="tx-a in num">+${grp(x.amount)}</span>` : x.type === 'transfer' ? `<span class="tx-a num">${grp(x.amount)}</span>` : `<span class="tx-a out num">−${grp(x.amount)}</span>`;
  return `<button class="tx" data-tx="${x.id}"><span class="ci" style="--c:${catCol(c)}">${icE(c.icon)}</span>
    <span class="tx-main"><div class="tx-t">${esc(t(c.name))}</div><div class="tx-s">${sub}</div></span>${hideable(amt)}</button>`;
}
function txGroups(list, limit) {
  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date) || (b.ts || 0) - (a.ts || 0));
  const items = limit ? sorted.slice(0, limit) : sorted;
  const g = {}; items.forEach(x => (g[x.date] = g[x.date] || []).push(x));
  return Object.entries(g).map(([d, xs]) => {
    const net = xs.reduce((a, x) => a + (x.type === 'income' ? x.amount : x.type === 'expense' ? -x.amount : 0), 0);
    return `<div class="tx-group"><div class="tx-day"><span>${dayLabel(d)}</span><span class="num">${hideable(money(net, true))}</span></div>
      <div class="card tx-list">${xs.map(txRow).join('')}</div></div>`;
  }).join('');
}
function bindTx(root) { $$('[data-tx]', root).forEach(b => b.onclick = () => { const x = S.tx.find(z => z.id === b.dataset.tx); if (!x) return; x.type === 'transfer' ? openTransfer(x) : openTx(x.type, null, x); }); }

function templates() {
  const m = {};
  S.tx.filter(x => x.type === 'expense' && x.note).slice(-300).forEach(x => { const k = x.cat + '|' + x.note; (m[k] = m[k] || []).push(x.amount); });
  return Object.entries(m).filter(([, a]) => a.length >= 3).sort((a, b) => b[1].length - a[1].length).slice(0, 6)
    .map(([k, a]) => { const [cat, note] = k.split('|'); return { cat, note, amount: Math.round(a.reduce((s, v) => s + v, 0) / a.length / 1000) * 1000 }; });
}
function addQuick(tp) {
  const rec = { id: uid(), type: 'expense', amount: tp.amount, cat: tp.cat, wallet: S.homeWallet !== 'all' ? S.homeWallet : S.wallets[0]?.id, date: today(), note: tp.note, ts: Date.now() };
  if (!rec.wallet) return;
  S.tx.push(rec); save(); UI.homeDay = today(); renderView(); vib(10);
  toast(`${esc(t(tp.note))}: −${grp(tp.amount)} ${cur()}`, { icon: 'zap', undo: () => { S.tx = S.tx.filter(x => x.id !== rec.id); save(); renderView(); } });
}
function gaugeSvg(parts, w = 220) {
  // parts: [{v:0..1, cls}] drawn left→right on a half circle
  const r = 86, cx = 110, cy = 104;
  const pt = a => [cx - r * Math.cos(Math.PI * a), cy - r * Math.sin(Math.PI * a)];
  const arc = (a0, a1) => { const [x0, y0] = pt(a0), [x1, y1] = pt(a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  let a = 0, out = '';
  parts.forEach(p => { if (p.v <= 0.005) return; const a1 = Math.min(1, a + p.v); out += `<path d="${arc(a + .012, a1 - .012)}" class="${p.cls}"/>`; a = a1; });
  return `<svg viewBox="0 0 220 112" width="100%" class="gauge" aria-hidden="true"><defs><linearGradient id="hatchP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFD8B8"/><stop offset="1" stop-color="#FF7605" stop-opacity=".35"/></linearGradient><linearGradient id="gOn" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#E76800"/><stop offset="1" stop-color="#FFB77C"/></linearGradient></defs>${out}</svg>`;
}
function renderHome0() {
  const el = $('#v-home'); const r = monthRange(); const wsel = S.homeWallet; const now = new Date();
  const mlist = inRange(r.a, r.b);
  const inc = sum(mlist.filter(x => wsel === 'all' || x.wallet === wsel), 'income');
  const exp = sum(mlist.filter(x => wsel === 'all' || x.wallet === wsel), 'expense');
  const bal = wsel === 'all' ? totalBal() : walletBal(wsel);
  const allExp = sum(mlist, 'expense'); const bud = S.budget.total || 0; const pct = bud ? Math.round(allExp / bud * 100) : 0;
  const prevR = monthRange(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const prevDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  const elapsedPrev = sum(inRange(prevR.a, iso(new Date(now.getFullYear(), now.getMonth() - 1, Math.min(now.getDate(), prevDays)))), 'expense');
  const delta = elapsedPrev ? Math.round((allExp - elapsedPrev) / elapsedPrev * 100) : 0;
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate() + 1;
  const perDay = bud > allExp ? Math.floor((bud - allExp) / daysLeft) : 0;
  const days = [...Array(7)].map((_, i) => iso(addDays(now, i - 3)));
  const sel = UI.homeDay || today();
  const dayList = S.tx.filter(x => x.date === sel).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const dayExp = sum(dayList, 'expense'), dayInc = sum(dayList, 'income');
  const goal = S.goals[0]; const debts = S.debts.filter(d => !d.paid);
  const segs = 14; const filled = bud ? Math.round(clamp(allExp / bud, 0, 1) * segs) : 0;
  const n = unread(); const max = isMax(); const aur = S.style === 'aurora' && max;
  const tps = max ? templates() : [];
  const todayExp = sum(inRange(today(), today()), 'expense');
  const dayLimit = bud ? Math.max(1, Math.round(bud / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate())) : 0;
  const week = [...Array(7)].map((_, i) => { const d = iso(addDays(now, i - 6)); return { d, v: sum(inRange(d, d), 'expense') }; }); const wmax = Math.max(1, ...week.map(w => w.v));
  const ym = today().slice(0, 7); const ups = S.recurring.filter(p => p.paid !== ym).sort((a, b) => a.day - b.day);

  el.innerHTML = `
  <header class="topbar">
    <button class="ava-btn" id="hAvatar" aria-label="profile">${avatarHtml()}</button>
    <div class="who"><div class="name ell">${t('Sálem')}, ${esc(t(firstName()))}</div><div class="hello ell">${t('Bugin')} ${now.getDate()} ${t(MONTHS[now.getMonth()])} · <b>${max ? 'BUSINESS' : 'PRO'}</b></div></div>
    <button class="icon-btn" id="hSearch" aria-label="search">${ic('search')}</button>
    <button class="icon-btn" id="hBell" aria-label="notifications">${ic('bell')}${n ? '<span class="dot"></span>' : ''}</button>
  </header>
  ${storiesRow()}

  <section class="bal">
    <div class="bal-top">
      <button class="pill-sel" id="hWallet"><span class="ell">${wsel === 'all' ? t('Barlıq hamyanlar') : walletName(wsel)}</span>${ic('chevron-down')}</button>
      <button class="bal-eye" id="hEye" aria-label="hide">${ic(S.hideBal ? 'eye-off' : 'eye')}</button>
    </div>
    <div class="bal-label">${t('Ulıwma balans')}</div>
    <div class="bal-amt num">${hideable(grp(bal))}<small>,00</small><em>${cur()}</em></div>
    <div class="bal-meta"><span class="chip-delta ${delta > 0 ? 'up' : ''} num">${ic(delta > 0 ? 'trending-up' : 'trending-down')}${delta > 0 ? '+' : ''}${delta}%</span><span class="ell">${t('shıǵım, ótken ayǵa salıstırǵanda')}</span></div>
    <div class="bal-acts">
      <button class="ba" data-q="income"><span>${t('Kirim')}</span><b>${ic('arrow-down-left')}</b></button>
      <button class="ba mid" data-q="transfer" aria-label="transfer">${ic('arrow-left-right')}</button>
      <button class="ba" data-q="expense"><b>${ic('arrow-up-right')}</b><span>${t('Shıǵım')}</span></button>
    </div>
  </section>

  <section class="card month">
    <div class="m-head"><div style="min-width:0"><small>${t('Bul ay jumsaldı')}</small><b class="num ell">${hideable(grp(allExp))}<i> / ${bud ? short(bud) : '—'}</i></b></div>
      <button class="circ sm" id="hBudget" aria-label="budget">${ic('sliders-horizontal')}</button></div>
    <div class="segbar">${[...Array(segs)].map((_, i) => `<i class="${i < filled ? (pct > 100 ? 'over' : 'on') : ''}"></i>`).join('')}</div>
    <div class="m-foot"><span><small>${t('Kirim')}</small><b class="num">${hideable('+' + short(inc))}</b></span><span><small>${t('Shıǵım')}</small><b class="num">${hideable('−' + short(exp))}</b></span><span><small>${t('Kúnine')}</small><b class="num">${bud ? short(perDay) : '—'}</b></span></div>
  </section>

  ${aur ? `<section class="aur-row">
    <div class="card aur-gauge"><div class="t-h"><span class="ell">${t('Kúnlik limit')}</span><span class="badge">${pct}%</span></div>
      ${gaugeSvg(dayLimit ? [{ v: clamp(todayExp / dayLimit, 0, 1), cls: 'g-on' }, { v: Math.max(0, 1 - todayExp / dayLimit), cls: 'g-off' }] : [{ v: 1, cls: 'g-off' }])}
      <div class="ag-c"><b class="num">${short(todayExp)}</b><small>/ ${dayLimit ? short(dayLimit) : '—'}</small></div></div>
    <div class="card aur-week"><div class="t-h"><span class="ell">${t('Hápte ritmi')}</span>${ic('activity')}</div>
      <div class="aw-bars">${week.map((w, i) => `<i class="${i === 6 ? 'on' : ''}" style="height:${Math.max(8, w.v / wmax * 100)}%"></i>`).join('')}</div>
      <div class="t-s">${t('Ortasha')}: ${short(week.reduce((a, w) => a + w.v, 0) / 7)}</div></div>
  </section>` : ''}

  ${tps.length ? `<div class="sec-h"><h3>${t('Tez qosıw')}</h3></div>
  <div class="hscroll tp-row">${tps.map((p, i) => { const c = catById(p.cat); return `<button class="tp" data-tp="${i}"><span class="ci" style="--c:${catCol(c)}">${icE(c.icon)}</span><span class="tp-t"><b class="ell">${esc(t(p.note))}</b><small class="num">${grp(p.amount)}</small></span>${ic('plus')}</button>`; }).join('')}</div>` : ''}

  <div class="sec-h"><h3>${t('Qarjı planı')}</h3></div>
  <div class="plan-grid">
    <button class="pt big" id="hBud2">
      <span class="tag">${t('Byudjet')}</span>
      <b class="pt-num num">${pct}<small>%</small></b>
      <span class="pt-t">${bud ? (perDay ? `${t('Kúnine')} ${short(perDay)} ${cur()}` : t('Byudjet tawsıldı')) : t('Byudjet ornatılmaǵan')}</span>
      <span class="pt-foot"><span class="pt-ic">${ic('chart-pie')}</span><span><small>${t('Qaldı')}</small><b class="num">${bud ? short(Math.max(0, bud - allExp)) : '—'}</b></span></span>
    </button>
    <button class="pt lav" id="hGoal">
      <span class="tag">${t('Maqset')}</span>
      <b class="pt-h ell">${goal ? esc(t(goal.name)) : t('Maqset qosıń')}</b>
      ${goal ? `<span class="pt-t num">${Math.min(100, Math.round(goal.saved / goal.target * 100))}% · ${short(goal.saved)}</span><span class="bar"><i style="width:${clamp(goal.saved / goal.target * 100, 0, 100)}%"></i></span>` : `<span class="pt-t">${ic('plus')}</span>`}
    </button>
    <button class="pt ink" id="hDebt">
      <span class="tag">${t('Qarızlar')}</span>
      <span class="pt-avs">${debts.slice(0, 3).map(d => `<i>${esc(initials(d.name))}</i>`).join('')}${debts.length > 3 ? `<i>+${debts.length - 3}</i>` : ''}${!debts.length ? `<i>${ic('check')}</i>` : ''}</span>
      <span class="pt-t">${debts.length} ${t('aktiv qarız')}</span>
    </button>
  </div>

  <div class="sec-h"><h3>${t('Kúnler')}</h3>${max ? `<button class="link" id="hCal">${t('Tólem kalendarı')}${ic('arrow-up-right')}</button>` : ''}</div>
  <div class="days">${days.map(d => { const dd = fromIso(d); const has = S.tx.some(x => x.date === d); return `<button class="day ${d === sel ? 'on' : ''} ${d > today() ? 'fut' : ''}" data-day="${d}"><i class="${has ? 'has' : ''}"></i><span>${t(WD[dd.getDay()])}</span><b>${dd.getDate()}</b></button>`; }).join('')}</div>

  <div class="sec-h"><h3 class="ell">${sel === today() ? t('Bugingi operaciyalar') : dayLabel(sel)}</h3><button class="link" id="hAll">${t('Barlıǵı')}${ic('arrow-up-right')}</button></div>
  ${dayList.length ? `<div class="day-sum"><span>${t('Kirim')} <b class="num">${hideable('+' + grp(dayInc))}</b></span><span>${t('Shıǵım')} <b class="num">${hideable('−' + grp(dayExp))}</b></span></div>
    <div class="card tx-list">${dayList.map(txRow).join('')}</div>`
    : `<div class="card empty"><span class="e-ic">${ic('receipt')}</span><span>${sel === today() ? t('Bugin ele operaciya joq') : t('Bul kúni operaciya joq')}</span>
      <span class="empty-acts"><button class="btn ink sm" data-q="expense">${ic('minus')}${t('Shıǵım')}</button><button class="btn ghost sm" data-q="income">${ic('plus')}${t('Kirim')}</button></span></div>`}

  <div class="sec-h"><h3>${t('Hamyanlarım')}</h3><button class="link" id="hWallets">${t('Basqarıw')}${ic('arrow-up-right')}</button></div>
  <div class="hscroll">
    ${S.wallets.map(w => `<button class="wallet t-${w.theme} ${S.homeWallet === w.id ? 'sel' : ''}" data-w="${w.id}"><span class="w-ic">${ic(w.icon)}</span>${w.no ? `<span class="w-no">${esc(w.no)}</span>` : ''}
      <span style="min-width:0"><div class="w-name ell">${esc(t(w.name))}</div><div class="w-bal num ell">${hideable(walletShow(w.id))} ${curLbl(wCur(w))}</div></span></button>`).join('')}
    <button class="wallet add" id="hAddW">${ic('plus')}<span>${t('Hamyan qosıw')}</span></button>
  </div>

  ${ups.length ? `<div class="sec-h"><h3>${t('Jaqın tólemler')}</h3><button class="link" id="hRec">${t('Barlıǵı')}${ic('arrow-up-right')}</button></div>
  <div class="hscroll">${ups.map(p => { const c = catById(p.cat); return `<button class="card upc" data-rec="${p.id}">
    <span class="up-top"><span class="ci" style="--c:${catCol(c)}">${icE(c.icon)}</span><span class="badge">${p.day}-${t('sáne')}</span></span>
    <span class="u-t ell">${esc(t(p.name))}</span><span class="u-a num ell">${hideable(grp(p.amount))}</span></button>`; }).join('')}</div>` : ''}

  <button class="card tip" id="hAiTip"><span class="tip-ic">${ic('sparkles')}</span><span class="tip-t"><b>${t('AI keńesi')}</b><small>${aiTip()}</small></span>${ic('arrow-up-right')}</button>
  `;
  bindStories(el);
  $('#hAvatar').onclick = () => setTab('profile');
  $('#hEye').onclick = () => { S.hideBal = !S.hideBal; save(); renderView(); };
  $('#hBell').onclick = openNotifs; $('#hSearch').onclick = () => openAllTx(true);
  $('#hWallet').onclick = pickHomeWallet;
  $$('[data-q]', el).forEach(b => b.onclick = () => { const q = b.dataset.q; q === 'transfer' ? openTransfer() : openTx(q); });
  $('#hBudget').onclick = openBudget; $('#hBud2').onclick = openBudget; $('#hGoal').onclick = openGoals; $('#hDebt').onclick = openDebts;
  $$('[data-day]', el).forEach(b => b.onclick = () => { UI.homeDay = b.dataset.day; renderView(); });
  $$('[data-tp]', el).forEach(b => b.onclick = () => addQuick(tps[+b.dataset.tp]));
  const hc = $('#hCal'); if (hc) hc.onclick = openCalendar;
  $('#hAll').onclick = () => openAllTx();
  $('#hWallets').onclick = openWallets; $('#hAddW').onclick = () => openWalletEdit();
  $$('[data-w]', el).forEach(b => b.onclick = () => { S.homeWallet = S.homeWallet === b.dataset.w ? 'all' : b.dataset.w; save(); renderView(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  const hr = $('#hRec'); if (hr) hr.onclick = openRecurring;
  $$('[data-rec]', el).forEach(b => b.onclick = () => payRecurring(b.dataset.rec));
  $('#hAiTip').onclick = () => openAI('Keńes ber');
  bindTx(el);
}
function pickHomeWallet() {
  Sheet.open({
    title: t('Hamyandı saylań'),
    html: () => `<div class="card list">${[{ id: 'all', name: 'Barlıq hamyanlar', icon: 'layers' }, ...S.wallets].map(w => `<button class="row" data-pw="${w.id}"><span class="r-ic">${ic(w.icon)}</span>
      <span class="r-t"><div>${esc(t(w.name))}</div><small class="num">${grp(w.id === 'all' ? totalBal() : walletBal(w.id))} ${cur()}</small></span>${S.homeWallet === w.id ? `<span style="color:var(--violet)">${ic('check')}</span>` : ''}</button>`).join('')}</div>`,
    mount: el => $$('[data-pw]', el).forEach(b => b.onclick = () => { S.homeWallet = b.dataset.pw; save(); Sheet.close(); renderView(); })
  });
}
function aiTip() {
  const r = monthRange(); const list = inRange(r.a, r.b); const exp = sum(list, 'expense'), inc = sum(list, 'income');
  const by = {}; list.filter(x => x.type === 'expense').forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount);
  const top = Object.entries(by).sort((a, b) => b[1] - a[1])[0];
  if (!top) return t('Operaciyalardı qosıń — men olardı analiz qılıp, keńes beremen.');
  const share = Math.round(top[1] / exp * 100);
  if (inc && exp > inc) return t(`Bul ay shıǵım kiriminen ${short(exp - inc)} swm kóp. «${catById(top[0]).name}» kategoriyasın qısqartıp kóriń.`);
  return t(`Shıǵımlarıńızdıń ${share}% ı «${catById(top[0]).name}» ǵa ketti. 10% qısqartsańız, ayına ${short(top[1] * .1)} swm únemleysiz.`);
}

/* ================= add / edit transaction ================= */
function evalExpr(e) {
  const toks = String(e).replace(/×/g, '*').match(/(\d+|[+\-])/g); if (!toks) return 0;
  let total = 0, op = '+';
  for (const k of toks) { if (k === '+' || k === '-') op = k; else total = op === '+' ? total + +k : total - +k; }
  return Math.max(0, total);
}
/* ---- Operaciya qosıw: kategoriyalar (kóp qollanılǵanı birinshi) ---- */
function kmCatOrder(type) {
  const n = {}; S.tx.forEach(x => { if (x.type === type) n[x.cat] = (n[x.cat] || 0) + 1; });
  const base = ['food', 'transport', 'cafe', 'home', 'utility', 'comm', 'health', 'cloth', 'fun', 'gift', 'edu', 'other', 'salary', 'biz', 'bonus', 'gift_in', 'invest', 'other_in'];
  const rank = c => (n[c.id] || 0) * 1000 + (base.includes(c.id) ? 100 - base.indexOf(c.id) : 0);
  return S.cats.filter(c => c.type === type).sort((a, b) => rank(b) - rank(a));
}
function kmTxCats(st) {
  const all = kmCatOrder(st.type); const top = all.slice(0, 10); const sel = all.find(c => c.id === st.cat);
  const list = sel ? [sel, ...all.filter(c => c !== sel).slice(0, 9)] : top;
  return list.map(c => `<button class="tc ${c.id === st.cat ? 'on' : ''}" data-c="${c.id}"><span class="tc-ic" style="--c:${catCol(c)}">${icE(c.icon)}</span><span class="tc-n">${esc(t(c.name))}</span></button>`).join('');
}
function kmCatPicker(type, cur, onPick) {
  let q = '';
  Sheet.open({ title: t('Kategoriya saylaw'),
    html: () => `<label class="km-search">${ic('search')}<input id="cpQ" placeholder="${t('Izlew')}" autocomplete="off"></label><div class="cp-g" id="cpG"></div>`,
    mount: el => { const draw = () => { const qq = toLat(q.toLowerCase()); const l = kmCatOrder(type).filter(c => !qq || toLat(t(c.name)).toLowerCase().includes(qq) || toLat(c.name).toLowerCase().includes(qq));
        $('#cpG', el).innerHTML = l.length ? l.map(c => `<button class="cpk ${c.id === cur ? 'on' : ''}" data-cp="${c.id}"><span class="tc-ic" style="--c:${catCol(c)}">${icE(c.icon)}</span><small>${esc(t(c.name))}</small></button>`).join('') : `<div class="km-empty">${t('Tabılmadı')}</div>`;
        refreshIcons(); $$('[data-cp]', el).forEach(b => b.onclick = () => { vib(5); onPick(b.dataset.cp); Sheet.back(); }); };
      $('#cpQ', el).oninput = e => { q = e.target.value; draw(); }; draw(); } });
}
/* ---- Sáne saylaw: kún / ay / jıl barabanları ---- */
const MON_FULL = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
function kmDateShort(d) { const x = fromIso(d); const diff = Math.round((fromIso(today()) - x) / 864e5); const b = `${x.getDate()} ${t(MON3[x.getMonth()])}${x.getFullYear() !== new Date().getFullYear() ? ' ' + x.getFullYear() : ''}`; return diff === 0 ? `${t('Búgin')}, ${b}` : diff === 1 ? `${t('Keshe')}, ${b}` : b; }
function kmDateLabel(d) {
  const x = fromIso(d); const diff = Math.round((fromIso(today()) - x) / 864e5);
  const base = `${x.getDate()} ${t(MON_FULL[x.getMonth()]).toLowerCase()}${x.getFullYear() !== new Date().getFullYear() ? ' ' + x.getFullYear() : ''}`;
  return diff === 0 ? `${t('Búgin')}, ${base}` : diff === 1 ? `${t('Keshe')}, ${base}` : base;
}
function kmDatePick(cur, onPick) {
  const d0 = fromIso(cur || today()); const st = { d: d0.getDate(), m: d0.getMonth(), y: d0.getFullYear() };
  const Y0 = new Date().getFullYear() - 6, YN = 8; const H = 44;
  const dim = () => new Date(st.y, st.m + 1, 0).getDate();
  const col = (k, items) => `<div class="wh" data-wh="${k}"><div class="wh-pad"></div>${items.map((v, i) => `<div class="wh-i" data-i="${i}">${v}</div>`).join('')}<div class="wh-pad"></div></div>`;
  Sheet.open({ title: t('Sáneni saylań'),
    html: () => `<div class="dq">${[[0, 'Búgin'], [1, 'Keshe'], [2, 'Aldınǵı kún']].map(([n, l]) => `<button class="chip" data-dq="${n}">${t(l)}</button>`).join('')}</div>
      <div class="wheel"><div class="wh-band"></div>
        ${col('d', [...Array(31)].map((_, i) => i + 1))}
        ${col('m', MON_FULL.map(m => t(m)))}
        ${col('y', [...Array(YN)].map((_, i) => Y0 + i))}
      </div>
      <div class="dp-prev" id="dpPrev"></div>
      <button class="btn pri" id="dpOk">${ic('check')}${t('Saylaw')}</button>`,
    mount: el => {
      const W = k => $(`[data-wh="${k}"]`, el);
      const idx = { d: () => st.d - 1, m: () => st.m, y: () => st.y - Y0 };
      const paint = () => {
        const max = dim(); if (st.d > max) st.d = max;
        $$('[data-wh="d"] .wh-i', el).forEach((e, i) => e.classList.toggle('off', i >= max));
        ['d', 'm', 'y'].forEach(k => $$(`[data-wh="${k}"] .wh-i`, el).forEach((e, i) => e.classList.toggle('on', i === idx[k]())));
        const iso2 = `${st.y}-${pad(st.m + 1)}-${pad(st.d)}`; $('#dpPrev', el).innerHTML = `${ic('calendar-check')}<span>${kmDateLabel(iso2)}</span><small>${t(['Ekshembi', 'Dúysenbi', 'Siyshembi', 'Sárshembi', 'Piyshembi', 'Juma', 'Shembi'][fromIso(iso2).getDay()])}</small>`; refreshIcons();
      };
      const go = (k, smooth) => W(k).scrollTo({ top: idx[k]() * H, behavior: smooth ? 'smooth' : 'auto' });
      ['d', 'm', 'y'].forEach(k => { const w = W(k); let tm;
        w.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => { let i = Math.round(w.scrollTop / H);
          if (k === 'd') { i = clamp(i, 0, dim() - 1); st.d = i + 1; } else if (k === 'm') { st.m = clamp(i, 0, 11); } else st.y = Y0 + clamp(i, 0, YN - 1);
          if (Math.abs(w.scrollTop - i * H) > 1) w.scrollTo({ top: i * H, behavior: 'smooth' }); paint(); if (k !== 'd') go('d', true); vib(3); }, 90); });
        $$('.wh-i', w).forEach(e => e.onclick = () => { w.scrollTo({ top: +e.dataset.i * H, behavior: 'smooth' }); }); });
      $$('[data-dq]', el).forEach(b => b.onclick = () => { const x = addDays(new Date(), -b.dataset.dq); st.d = x.getDate(); st.m = x.getMonth(); st.y = x.getFullYear(); paint(); ['m', 'y', 'd'].forEach(k => go(k, true)); });
      requestAnimationFrame(() => { ['d', 'm', 'y'].forEach(k => go(k)); paint(); });
      $('#dpOk', el).onclick = () => { onPick(`${st.y}-${pad(st.m + 1)}-${pad(st.d)}`); Sheet.back(); };
    } });
}
function openTx(type = 'expense', preset = null, edit = null) {
  const st = edit ? { ...edit, expr: String(edit.fa != null && wCur(walletById(edit.wallet)) !== 'UZS' ? edit.fa : edit.amount) } : {
    type, expr: preset?.amount ? String(preset.amount) : '', cat: preset?.cat || null, wallet: preset?.wallet || (S.homeWallet !== 'all' ? S.homeWallet : S.wallets[0]?.id),
    date: preset?.date || today(), note: preset?.note || ''
  };
  const cats = () => S.cats.filter(c => c.type === st.type);
  if (!st.cat || !cats().some(c => c.id === st.cat)) st.cat = kmCatOrder(st.type)[0]?.id;
  const keyHandler = e => {
    if (!$('#txKeys')) return;
    if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('del'); else if (e.key === '+' || e.key === '-') press(e.key); else if (e.key === 'Enter') press('ok');
  };
  function press(k) {
    vib(6);
    if (k === 'del') st.expr = st.expr.slice(0, -1);
    else if (k === 'C') st.expr = '';
    else if (k === 'ok') return commit();
    else if (k === '+' || k === '-') { if (st.expr && !/[+\-]$/.test(st.expr)) st.expr += k; }
    else { if (st.expr.replace(/[^\d]/g, '').length > 14) return; if (st.expr === '0') st.expr = ''; st.expr += k; }
    paintAmount();
  }
  function paintAmount() {
    const v = evalExpr(st.expr);
    const wc = wCur(walletById(st.wallet)); $('#txAmt').innerHTML = `${st.type === 'income' ? '+' : '−'}${fmtNat(v, wc)} <small>${curLbl(wc)}</small>`;
    $('#txAmt').classList.toggle('in', st.type === 'income'); $('#txAmt').classList.toggle('zero', !v);
    $('#txExpr').textContent = /[+\-]/.test(st.expr) ? st.expr.replace(/(\d+)/g, m => grp(m)) : '';
  }
  function commit() {
    const amount = evalExpr(st.expr);
    if (!amount) { $('#txAmt').animate([{ transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'none' }], { duration: 300 }); return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' }); }
    if (!st.wallet) return toast(t('Aldın hamyan qosıń'), { icon: 'circle-alert' });
    st.note = ($('#txNote')?.value || '').trim();
    const wcx = wCur(walletById(st.wallet)); const rec = { id: edit ? edit.id : uid(), type: st.type, amount: wcx === 'UZS' ? amount : Math.round(amount * RATES[wcx]), cat: st.cat, wallet: st.wallet, date: st.date, note: st.note, ts: Date.now() }; if (wcx !== 'UZS') rec.fa = amount;
    if (edit) S.tx = S.tx.map(x => x.id === edit.id ? rec : x); else S.tx.push(rec); sfx(rec.type === 'income' ? 'income' : rec.type === 'expense' ? 'expense' : 'success'); if (rec.type === 'expense') kmWLimitCheck(rec.wallet);
    save(); document.removeEventListener('keydown', keyHandler); Sheet.close(); renderView();
    if (!edit) toast(`${t(st.type === 'income' ? 'Kirim qosıldı' : 'Shıǵım qosıldı')}: ${fmtNat(amount, wcx)} ${curLbl(wcx)}`, {
      undo: () => { S.tx = S.tx.filter(x => x.id !== rec.id); save(); renderView(); }
    });
    checkBudgetAlert(rec);
  }
  Sheet.open({
    title: edit ? t('Operaciyanı ózgertiw') : t('Jańa operaciya'),
    onClose: () => document.removeEventListener('keydown', keyHandler),
    html: () => `
      <div class="seg violet"><button data-ty="expense" class="${st.type === 'expense' ? 'on' : ''}">${t('Shıǵım')}</button><button data-ty="income" class="${st.type === 'income' ? 'on' : ''}">${t('Kirim')}</button></div>
      <div class="amount-box"><small class="a-lbl">${t(st.type === 'income' ? 'Kirim summası' : 'Shıǵım summası')}</small><div class="a-v num" id="txAmt"></div><div class="a-expr num" id="txExpr"></div></div>
      <div class="field tx-cf"><label>${t('Kategoriya')}<button class="link" id="txAllCats">${t('Barlıǵı')} (${cats().length})${ic('chevron-right')}</button></label>
        <div class="tx-cats" id="txCats">${kmTxCats(st)}</div></div>
      <div class="field"><label>${t('Hamyan')}</label><div class="chips">${S.wallets.map(w => `<button class="chip ${w.id === st.wallet ? 'on' : ''}" data-wl="${w.id}">${ic(w.icon)}<span class="ell">${esc(t(w.name))}</span></button>`).join('')}</div></div>
      <div class="row2">
        <div class="field"><label>${t('Sáne')}</label><button class="inp dp-btn" id="txDate">${ic('calendar-days')}<span id="txDateL">${kmDateShort(st.date)}</span></button></div>
        <div class="field"><label>${t('Eskertpe')}</label><input class="inp" id="txNote" value="${esc(st.note)}" placeholder="${t('Mısalı: bazar')}" maxlength="60"></div>
      </div>
      <div class="keypad" id="txKeys">
        ${['1', '2', '3', 'del', '4', '5', '6', '+', '7', '8', '9', '-', '000', '0', 'C', 'ok'].map(k => `<button class="key ${k === '+' || k === '-' || k === 'del' || k === 'C' ? 'op' : ''} ${k === 'ok' ? 'ok' : ''} ${k === '000' ? 'small' : ''}" data-k="${k}">${k === 'del' ? ic('delete') : k === 'ok' ? ic('check') : k === '-' ? '−' : k}</button>`).join('')}
      </div>
      ${edit ? `<button class="btn danger" id="txDel">${ic('trash-2')}${t('Óshiriw')}</button>` : ''}`,
    mount: el => {
      // keypad layout: make ok key span (no row span in 4-col grid with 16 keys); keep simple
      const ok = $('[data-k="ok"]', el); ok.style.gridRow = 'auto'; ok.style.height = '54px';
      paintAmount();
      $$('[data-ty]', el).forEach(b => b.onclick = () => { st.type = b.dataset.ty; st.cat = kmCatOrder(st.type)[0]?.id; st.note = $('#txNote').value; Sheet.refresh(); });
      const bindCats = () => $$('[data-c]', el).forEach(b => b.onclick = () => { st.cat = b.dataset.c; $$('[data-c]', el).forEach(x => x.classList.toggle('on', x === b)); vib(5); });
      bindCats();
      $('#txAllCats').onclick = () => { st.note = $('#txNote').value; kmCatPicker(st.type, st.cat, id => { st.cat = id; }); };
      $$('[data-wl]', el).forEach(b => b.onclick = () => { st.wallet = b.dataset.wl; $$('[data-wl]', el).forEach(x => x.classList.toggle('on', x === b)); paintAmount(); });
      $('#txDate').onclick = () => { st.note = $('#txNote').value; kmDatePick(st.date, d => { st.date = d; }); };
      $$('[data-k]', el).forEach(b => b.onclick = () => press(b.dataset.k));
      const d = $('#txDel'); if (d) d.onclick = async () => {
        if (await ask('Óshiriw', 'Bul operaciyanı óshiriwdi qáleysiz be?', 'Óshiriw', true)) {
          const old = S.tx.find(x => x.id === edit.id); S.tx = S.tx.filter(x => x.id !== edit.id); save(); Sheet.close(); renderView();
          toast(t('Operaciya óshirildi'), { icon: 'trash-2', undo: () => { S.tx.push(old); save(); renderView(); } });
        }
      };
      document.removeEventListener('keydown', keyHandler); document.addEventListener('keydown', keyHandler);
    }
  });
}
function checkBudgetAlert(rec) {
  if (rec.type !== 'expense') return;
  const lim = S.budget.cats?.[rec.cat]; if (!lim) return;
  const s = catSpent(rec.cat);
  if (s > lim) setTimeout(() => toast(`${t(catById(rec.cat).name)}: ${t('limit asıldı')} (${short(s)} / ${short(lim)})`, { icon: 'triangle-alert', ms: 3500 }), 2700);
}
function moneyInput(id, val = '', ph = '0') { return `<input class="inp num money" id="${id}" inputmode="numeric" value="${val ? grp(val) : ''}" placeholder="${ph}" autocomplete="off">`; }
function bindMoney(root) { $$('.money', root).forEach(i => i.addEventListener('input', () => { const v = parseMoney(i.value); i.value = v ? grp(v) : ''; })); }

function openTransfer(edit = null, pre = null) {
  if (S.wallets.length < 2) return toast(t('Awdarma ushın keminde eki hamyan kerek'), { icon: 'circle-alert' });
  const st = edit ? { ...edit } : { wallet: pre?.wallet || S.wallets[0].id, to: pre?.to || S.wallets[1].id, amount: 0, date: today(), note: '' };
  const src0 = edit ? (wCur(walletById(edit.wallet)) === 'UZS' ? edit.amount : txNat(edit, 'a', edit.wallet)) : 0;
  const opt = sel => S.wallets.map(w => `<option value="${w.id}" ${w.id === sel ? 'selected' : ''}>${esc(t(w.name))} — ${walletShow(w.id)} ${curLbl(wCur(w))}</option>`).join('');
  Sheet.open({
    title: t(pre?.fx ? 'Valyuta almastırıw' : 'Balanstan balansqa ótkeriw'),
    html: () => `
      <div class="field"><label>${t('Qaysı balanstan')}</label><select class="inp" id="trF">${opt(st.wallet)}</select></div>
      <div style="display:grid;place-items:center;margin:-6px 0"><button class="icon-btn" id="trSwap">${ic('arrow-down-up')}</button></div>
      <div class="field"><label>${t('Qaysı balansqa')}</label><select class="inp" id="trT">${opt(st.to)}</select></div>
      <div class="field"><label id="trAL">${t('Muǵdar')}</label><div class="we-amt"><input class="inp num" id="trA" inputmode="decimal" value="${src0 ? fmtNat(src0, wCur(walletById(st.wallet))) : ''}" placeholder="0" autocomplete="off"><span id="trAC"></span></div></div>
      <div class="tr-fx" id="trFx"></div>
      <div class="field"><label>${t('Sáne')}</label><input class="inp" type="date" id="trD" value="${st.date}"></div>
      <button class="btn pri" id="trOk">${ic('arrow-left-right')}${t(edit ? 'Saqlaw' : 'Ótkeriw')}</button>
      ${edit ? `<button class="btn danger" id="trDel">${ic('trash-2')}${t('Óshiriw')}</button>` : ''}`,
    mount: el => {
      const num = () => { const v = String($('#trA').value).replace(/\s/g, '').replace(',', '.'); return Math.max(0, parseFloat(v) || 0); };
      const calc = () => {
        const fc = wCur(walletById($('#trF').value)), tc = wCur(walletById($('#trT').value)), a = num();
        $('#trAC').textContent = curLbl(fc);
        const box = $('#trFx');
        if (fc === tc) { box.innerHTML = ''; box.classList.remove('show'); return; }
        const r = a * RATES[fc] / RATES[tc];
        const rate = fc === 'UZS' ? `1 ${tc} = ${fmtNat(RATES[tc], 'UZS')} ${cur()}` : tc === 'UZS' ? `1 ${fc} = ${fmtNat(RATES[fc], 'UZS')} ${cur()}` : `1 ${fc} = ${fmtNat(RATES[fc] / RATES[tc], 'X')} ${tc}`;
        box.classList.add('show');
        box.innerHTML = `<span class="tr-fi">${ic('repeat')}</span><span class="tr-ft"><small>${t('Kurs')}: ${rate}</small><b class="num">${t('Alınadı')}: ${fmtNat(r, tc)} ${curLbl(tc)}</b></span>`; refreshIcons();
      };
      $('#trA').addEventListener('input', e => { const raw = e.target.value.replace(/[^\d,.]/g, ''); const [ip, dp] = raw.split(/[,.]/); e.target.value = (ip ? grp(+ip) : '') + (dp !== undefined ? ',' + dp.slice(0, 2) : ''); calc(); });
      $('#trF').onchange = calc; $('#trT').onchange = calc; calc();
      $('#trSwap').onclick = () => { const f = $('#trF').value; $('#trF').value = $('#trT').value; $('#trT').value = f; calc(); };
      $('#trOk').onclick = () => {
        const f = $('#trF').value, to = $('#trT').value, a = num();
        if (f === to) return toast(t('Balanslar hár qıylı bolıwı kerek'), { icon: 'circle-alert' });
        if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
        const fc = wCur(walletById(f)), tc = wCur(walletById(to)), uzs = Math.round(a * RATES[fc]);
        const rec = { id: edit ? edit.id : uid(), type: 'transfer', amount: uzs, wallet: f, to, date: $('#trD').value || today(), note: fc !== tc ? `${fc} → ${tc}` : '', ts: Date.now() };
        if (fc !== 'UZS') rec.fa = a; if (tc !== 'UZS') rec.fb = Math.round(a * RATES[fc] / RATES[tc] * 100) / 100;
        if (edit) S.tx = S.tx.map(x => x.id === edit.id ? rec : x); else S.tx.push(rec);
        save(); sfx('success'); Sheet.close(); renderView(); toast(t(fc !== tc ? 'Valyuta almastırıldı' : 'Ótkerildi'), { icon: fc !== tc ? 'repeat' : 'arrow-left-right' });
      };
      const d = $('#trDel'); if (d) d.onclick = () => { S.tx = S.tx.filter(x => x.id !== edit.id); save(); Sheet.close(); renderView(); toast(t('Operaciya óshirildi'), { icon: 'trash-2' }); };
    }
  });
}
function openExchange(w) {
  const fc = wCur(w); let tc = fc === 'USD' ? 'UZS' : 'USD';
  const tgtFor = c => S.wallets.find(x => x.id !== w.id && wCur(x) === c);
  Sheet.open({
    title: t('Valyuta almastırıw'),
    html: () => `<div class="ex-from"><small>${t('Qaysı balanstan')}</small><b>${esc(t(w.name))}</b><span class="num">${walletShow(w.id)} ${curLbl(fc)}</span></div>
      <div class="field"><label>${t('Qaysı valyutaǵa')}</label><div class="seg ex-seg">${WCURS.filter(c => c !== fc).map(c => `<button data-xc="${c}" class="${c === tc ? 'on' : ''}"><b>${c}</b><small>${t(WCUR_N[c])}</small></button>`).join('')}</div></div>
      <div class="field"><label>${t('Muǵdar')}</label><div class="we-amt"><input class="inp num" id="exA" inputmode="decimal" placeholder="0" autocomplete="off"><span>${curLbl(fc)}</span></div></div>
      <div class="tr-fx show" id="exR"></div>
      <div class="ex-to" id="exTo"></div>
      <button class="btn pri" id="exOk">${ic('repeat')}${t('Almastırıw')}</button>`,
    mount: el => {
      const num = () => Math.max(0, parseFloat(String($('#exA').value).replace(/\s/g, '').replace(',', '.')) || 0);
      const calc = () => {
        const a = num(), r = a * RATES[fc] / RATES[tc], tg = tgtFor(tc);
        const rate = fc === 'UZS' ? `1 ${tc} = ${fmtNat(RATES[tc], 'UZS')} ${cur()}` : tc === 'UZS' ? `1 ${fc} = ${fmtNat(RATES[fc], 'UZS')} ${cur()}` : `1 ${fc} = ${fmtNat(RATES[fc] / RATES[tc], 'X')} ${tc}`;
        $('#exR').innerHTML = `<span class="tr-fi">${ic('repeat')}</span><span class="tr-ft"><small>${t('Kurs')}: ${rate}</small><b class="num">${t('Alınadı')}: ${fmtNat(r, tc)} ${curLbl(tc)}</b></span>`;
        $('#exTo').innerHTML = `${ic(tg ? 'wallet' : 'plus')}<span>${tg ? `${t('Túsetuǵın balans')}: <b>${esc(t(tg.name))}</b>` : `${t('Jańa balans ashıladı')}: <b>${t(WCUR_N[tc])}</b>`}</span>`; refreshIcons();
      };
      $('#exA').addEventListener('input', e => { const raw = e.target.value.replace(/[^\d,.]/g, ''); const [ip, dp] = raw.split(/[,.]/); e.target.value = (ip ? grp(+ip) : '') + (dp !== undefined ? ',' + dp.slice(0, 2) : ''); calc(); });
      $$('[data-xc]', el).forEach(b => b.onclick = () => { tc = b.dataset.xc; $$('[data-xc]', el).forEach(x => x.classList.toggle('on', x === b)); calc(); });
      calc();
      $('#exOk').onclick = () => {
        const a = num(); if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
        const have = fc === 'UZS' ? walletBal(w.id) : walletNative(w.id); if (a > have + 1e-9) return toast(`${t('Balansta jetkilikli qarjı joq')}: ${walletShow(w.id)} ${curLbl(fc)}`, { icon: 'circle-alert' });
        let tg = tgtFor(tc);
        if (!tg) { tg = { id: uid(), name: WCUR_N[tc], icon: tc === 'UZS' ? 'banknote' : 'coins', kind: 'cash', cur: tc, theme: 'paper', color: { USD: '#22C55E', RUB: '#3B82F6', KZT: '#14B8A6', UZS: '' }[tc], no: '', limit: 0, initial: 0 }; S.wallets.push(tg); }
        const rec = { id: uid(), type: 'transfer', amount: Math.round(a * RATES[fc]), wallet: w.id, to: tg.id, date: today(), note: `${fc} → ${tc}`, ts: Date.now() };
        if (fc !== 'UZS') rec.fa = a; if (tc !== 'UZS') rec.fb = Math.round(a * RATES[fc] / RATES[tc] * 100) / 100;
        S.tx.push(rec); save(); sfx('success'); Sheet.close(); renderView(); toast(`${t('Almastırıldı')}: ${fmtNat(rec.fb ?? rec.amount, tc)} ${curLbl(tc)}`, { icon: 'repeat' });
      };
    }
  });
}
function openAllTx(focus, wid = null) {
  const st = { q: '', f: 'all' };
  const listHtml = () => {
    const q = toLat(st.q.trim());
    const list = S.tx.filter(x => (!wid || x.wallet === wid || x.to === wid) && (st.f === 'all' || x.type === st.f) && (!q || toLat(catById(x.cat).name + ' ' + (x.note || '') + ' ' + walletName(x.wallet) + ' ' + x.amount).includes(q)));
    const inc = sum(list, 'income'), exp = sum(list, 'expense');
    return `<div class="duo-mini"><div class="dm in"><small>${t('Kirim')}</small><b class="num ell">${hideable('+' + short(inc))}</b></div><div class="dm out"><small>${t('Shıǵım')}</small><b class="num ell">${hideable('−' + short(exp))}</b></div><div class="dm"><small>${t('Sanı')}</small><b class="num">${list.length}</b></div></div>
      ${list.length ? txGroups(list) : `<div class="card empty"><span class="e-ic">${ic('search-x')}</span>${t('Hesh nárse tabılmadı')}</div>`}`;
  };
  Page.open({
    title: wid && walletById(wid) ? t(walletById(wid).name) : t('Barlıq operaciyalar'), sub: wid ? `${t('Balans esabatları')} · ${walletBal(wid) < 0 ? '−' : ''}${grp(Math.abs(walletBal(wid)))} ${cur()}` : `${S.tx.length} ${t('operaciya')}`,
    right: `<button class="pg-btn" id="atAdd" aria-label="add">${ic('plus')}</button>`,
    html: () => `<label class="search">${ic('search')}<input id="atQ" value="${esc(st.q)}" placeholder="${t('Izlew: kategoriya, eskertpe, muǵdar')}"></label>
      <div class="seg seg4">${[['all', 'Barlıǵı'], ['income', 'Kirim'], ['expense', 'Shıǵım'], ['transfer', 'Awdarma']].map(([k, l]) => `<button data-f="${k}" class="${st.f === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
      <div id="atList" style="display:flex;flex-direction:column;gap:8px">${listHtml()}</div>`,
    mount: el => {
      const paint = () => { $('#atList').innerHTML = listHtml(); refreshIcons(); bindTx($('#atList')); };
      bindTx(el);
      $('#atQ').oninput = e => { st.q = e.target.value; paint(); };
      if (focus) setTimeout(() => $('#atQ') && $('#atQ').focus(), 300);
      $('#atAdd').onclick = () => openTx('expense', wid ? { wallet: wid } : undefined);
      $$('[data-f]', el).forEach(b => b.onclick = () => { st.f = b.dataset.f; $$('[data-f]', el).forEach(x => x.classList.toggle('on', x === b)); paint(); });
    }
  });
}

/* ================= STATS ================= */
function getRange(period, off) {
  const now = new Date();
  if (period === 'week') {
    const dow = (now.getDay() + 6) % 7; const mon = addDays(now, -dow - 7 * off); const sun = addDays(mon, 6);
    const lbl = mon.getMonth() === sun.getMonth() ? `${mon.getDate()}–${sun.getDate()} ${t(MONTHS[mon.getMonth()])}` : `${mon.getDate()} ${t(MONTHS[mon.getMonth()]).slice(0, 3)} – ${sun.getDate()} ${t(MONTHS[sun.getMonth()]).slice(0, 3)}`;
    return { a: iso(mon), b: iso(sun), label: lbl, days: 7 };
  }
  if (period === 'year') { const y = now.getFullYear() - off; return { a: `${y}-01-01`, b: `${y}-12-31`, label: `${y}-${t('jıl')}`, days: 365, y }; }
  const d = new Date(now.getFullYear(), now.getMonth() - off, 1); const r = monthRange(d);
  return { ...r, label: `${t(MONTHS[d.getMonth()])} ${d.getFullYear()}`, days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(), d };
}
function niceMax(v) { if (v <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))); const m = v / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
function barChart(cols) {
  const W = 340, H = 180, pl = 44, pb = 24, pt = 12, pr = 6;
  const max = niceMax(Math.max(1, ...cols.flatMap(c => [c.inc, c.exp])));
  const ih = H - pt - pb, cw = (W - pl - pr) / cols.length, bw = Math.min(11, cw / 3.2);
  let g = '';
  [0, .5, 1].forEach(f => { const y = pt + ih - ih * f; g += `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" style="stroke:var(--line)" stroke-dasharray="${f ? '3 4' : ''}"/><text x="${pl - 6}" y="${y + 3}" text-anchor="end">${f ? short(max * f) : '0'}</text>`; });
  cols.forEach((c, i) => {
    const cx = pl + cw * i + cw / 2; const hi = ih * c.inc / max, he = ih * c.exp / max;
    g += `<rect x="${cx - bw - 1.5}" y="${pt + ih - hi}" width="${bw}" height="${Math.max(0, hi)}" rx="3" style="fill:var(--violet)"><title>${grp(c.inc)}</title></rect>`;
    g += `<rect x="${cx + 1.5}" y="${pt + ih - he}" width="${bw}" height="${Math.max(0, he)}" rx="3" style="fill:var(--fg);opacity:.82"><title>${grp(c.exp)}</title></rect>`;
    g += `<text x="${cx}" y="${H - 7}" text-anchor="middle" ${c.cur ? 'style="fill:var(--violet);font-weight:700"' : ''}>${c.label}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img">${g}</svg>`;
}
function forecastMonth() {
  const r = monthRange(); const exp = sum(inRange(r.a, r.b), 'expense'); const d = new Date().getDate(); const n = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  return { exp, proj: Math.round(exp / d * n), d, n };
}
function openCatTx(c, R) {
  const ct = catById(c); const l = inRange(R.a, R.b).filter(x => x.cat === c && x.type !== 'transfer');
  Page.open({
    title: t(ct.name), sub: R.label,
    html: () => `<div class="card cat-hero"><span class="ci lg" style="--c:${catCol(ct)}">${icE(ct.icon)}</span>
      <div style="flex:1;min-width:0"><small class="muted">${t('Jámi')}</small><div class="ch-v num ell">${hideable(grp(l.reduce((a, x) => a + x.amount, 0)))} <i>${cur()}</i></div></div><span class="badge">${l.length} ${t('operaciya')}</span></div>
      ${l.length ? txGroups(l) : `<div class="card empty">${t('Maǵlıwmat joq')}</div>`}`,
    mount: el => bindTx(el)
  });
}
function statBuckets(R, type) {
  if (UI.statPeriod === 'year') return MONTHS.map((m, i) => { const rr = monthRange(new Date(R.y, i, 1)); return { label: t(m).slice(0, 3), full: `${t(m)} ${R.y}`, v: sum(inRange(rr.a, rr.b), type), fut: rr.a > today() }; });
  if (UI.statPeriod === 'week') return [...Array(7)].map((_, i) => { const d = iso(addDays(fromIso(R.a), i)); return { label: t(WD[fromIso(d).getDay()]), full: dayLabel(d), v: sum(inRange(d, d), type), fut: d > today() }; });
  const out = []; let s = fromIso(R.a); const end = fromIso(R.b); let k = 1;
  while (s <= end) { const e = addDays(s, 6) > end ? end : addDays(s, 6); out.push({ label: `${s.getDate()}–${e.getDate()}`, full: `${s.getDate()}–${e.getDate()} ${t(MONTHS[s.getMonth()])}`, v: sum(inRange(iso(s), iso(e)), type), fut: iso(s) > today() }); s = addDays(e, 1); k++; }
  return out;
}
function renderStats0() {
  const el = $('#v-stats'); const R = getRange(UI.statPeriod, UI.statOffset); const P = getRange(UI.statPeriod, UI.statOffset + 1);
  const list = inRange(R.a, R.b); const inc = sum(list, 'income'), exp = sum(list, 'expense');
  const type = UI.statType; const tot = type === 'expense' ? exp : inc;
  const ptot = sum(inRange(P.a, P.b), type); const dl = ptot ? Math.round((tot - ptot) / ptot * 100) : null;
  const by = {}; list.filter(x => x.type === type).forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount);
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]);
  const endD = R.b > today() ? today() : R.b; const elapsed = Math.max(1, Math.round((fromIso(endD) - fromIso(R.a)) / 864e5) + 1);
  const dayTotals = {}; list.filter(x => x.type === 'expense').forEach(x => dayTotals[x.date] = (dayTotals[x.date] || 0) + x.amount);
  const topDay = Object.entries(dayTotals).sort((a, b) => b[1] - a[1])[0];
  const bk = statBuckets(R, type); const bmax = Math.max(1, ...bk.map(b => b.v));
  if (UI.capSel == null || UI.capSel >= bk.length) { let mi = 0; bk.forEach((b, i) => { if (b.v > bk[mi].v) mi = i; }); UI.capSel = mi; }
  const word = UI.statPeriod === 'year' ? String(R.y) : UI.statPeriod === 'month' ? t(MONTHS[R.d.getMonth()]) : t('Hápte');
  const wfs = Math.min(112, Math.round(560 / word.length));
  // gauge: selected category vs its limit (or whole budget)
  const gcats = ['all', ...rows.map(r => r[0])]; if (!gcats.includes(UI.gaugeCat)) UI.gaugeCat = 'all';
  const gc = UI.gaugeCat; const gSpent = gc === 'all' ? tot : (by[gc] || 0);
  const gLim = type === 'expense' ? (gc === 'all' ? (UI.statPeriod === 'month' ? S.budget.total : 0) : (UI.statPeriod === 'month' ? S.budget.cats?.[gc] || 0 : 0)) : 0;
  const gRef = gLim || (gc === 'all' ? ptot : sum(inRange(P.a, P.b).filter(x => x.cat === gc), type)) || gSpent || 1;
  const fc = forecastMonth(); const max = isMax();
  const projPart = UI.statPeriod === 'month' && UI.statOffset === 0 && type === 'expense' && gc === 'all' ? Math.max(0, Math.min(1, fc.proj / gRef) - Math.min(1, gSpent / gRef)) : 0;
  const gParts = [{ v: Math.min(1, gSpent / gRef), cls: 'g-on' }, { v: projPart, cls: 'g-hatch' }, { v: Math.max(0, 1 - Math.min(1, gSpent / gRef) - projPart), cls: 'g-off' }];
  // heat
  const hm = UI.statPeriod === 'year' ? null : fromIso(R.a); let heat = '';
  if (hm) {
    const y = hm.getFullYear(), m = hm.getMonth(); const first = (new Date(y, m, 1).getDay() + 6) % 7; const nd = new Date(y, m + 1, 0).getDate();
    const vals = [...Array(nd)].map((_, i) => sum(inRange(iso(new Date(y, m, i + 1)), iso(new Date(y, m, i + 1))), 'expense'));
    const nz = vals.filter(Boolean); const avg = nz.length ? nz.reduce((a, b) => a + b, 0) / nz.length : 0;
    heat = ['Dú', 'Si', 'Sá', 'Pi', 'Ju', 'Sh', 'Ek'].map(w => `<span class="wd">${t(w)}</span>`).join('') + '<span class="e"></span>'.repeat(first) +
      vals.map((v, i) => { const d = iso(new Date(y, m, i + 1)); const cls = d === today() ? 'td' : d > today() ? 'fu' : !v ? 'no' : v > avg ? 'hi' : 'lo'; return `<span class="hc ${cls}" title="${grp(v)} ${cur()}">${i + 1}</span>`; }).join('');
  }
  const saveRate = inc ? Math.round((inc - exp) / inc * 100) : 0;
  el.innerHTML = `
    <div class="page-head"><div><h1 class="page-title">${t('Statistika')}</h1><p>${t('Qarjılarıńız qay jerge ketip atır')}</p></div>
      <button class="icon-btn" id="stAll" aria-label="list">${ic('list')}</button></div>
    <div class="seg">${[['week', 'Hápte'], ['month', 'Ay'], ['year', 'Jıl']].map(([k, l]) => `<button data-p="${k}" class="${UI.statPeriod === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
    <section class="mcard">
      <div class="mc-top"><span class="mc-pill">${list.filter(x => x.type === type).length} ${t('operaciya')}</span>
        <span class="mc-nav"><button id="stPrev" aria-label="prev">${ic('chevron-left')}</button><button id="stNext" aria-label="next" ${UI.statOffset === 0 ? 'disabled' : ''}>${ic('chevron-right')}</button></span></div>
      <div class="mc-per">${R.label}</div>
      <div class="mc-sum num">${hideable(grp(tot))}<i>${cur()}</i></div>
      <div class="mc-delta">${dl === null ? t('Aldınǵı dáwir boyınsha maǵlıwmat joq') : `<b class="num">${dl > 0 ? '+' : ''}${dl}%</b> ${t('aldınǵı dáwirge salıstırǵanda')}`}</div>
      <div class="mc-word" style="font-size:${wfs}px" aria-hidden="true">${word}</div>
    </section>
    <div class="seg2"><button data-st="expense" class="${type === 'expense' ? 'on' : ''}">${ic('arrow-up-right')}${t('Shıǵım')}<b class="num">${hideable(short(exp))}</b></button><button data-st="income" class="${type === 'income' ? 'on' : ''}">${ic('arrow-down-left')}${t('Kirim')}<b class="num">${hideable(short(inc))}</b></button></div>

    <section class="card caps-card">
      <div class="sec-h" style="margin:0"><h3>${t('Dinamika')}</h3><span class="muted" style="font-size:.78rem">${t('Ortasha')}: ${short(bk.reduce((a, b) => a + b.v, 0) / bk.length)}</span></div>
      <div class="caps" style="--n:${bk.length}">${bk.map((b, i) => `<button class="cap-col ${i === UI.capSel ? 'on' : ''} ${b.fut ? 'fut' : ''}" data-cap="${i}"><span class="cap-bar" style="height:${Math.max(10, b.v / bmax * 100)}%">${i === UI.capSel ? `<em class="cap-tip num">${hideable(short(b.v))}</em>` : ''}</span><small>${b.label}</small></button>`).join('')}</div>
      <div class="caps-foot"><span class="ell">${bk[UI.capSel].full}</span><b class="num">${hideable(grp(bk[UI.capSel].v))} ${cur()}</b></div>
    </section>

    <section class="card gauge-card">
      <div class="sec-h" style="margin:0"><h3>${gLim ? t('Limit orınlanıwı') : t('Salıstırıw')}</h3><button class="circ sm" id="stBud" aria-label="budget">${ic('sliders-horizontal')}</button></div>
      <div class="g-wrap">${gaugeSvg(gParts)}<div class="g-c"><small>${t(type === 'expense' ? 'Jámi jumsaldı' : 'Jámi kirim')}</small><b class="num">${hideable(short(gSpent))}</b><span>${gLim ? `${t('limit')} ${short(gLim)}` : `${t('aldınǵı')} ${short(gRef)}`}</span></div></div>
      <div class="g-pick"><button id="gPrev" aria-label="prev">${ic('chevron-left')}</button><span class="ell">${gc === 'all' ? t('Barlıq kategoriyalar') : esc(t(catById(gc).name))}</span><button id="gNext" aria-label="next">${ic('chevron-right')}</button></div>
      <div class="legend"><span><i class="legend-dot" style="background:var(--violet)"></i>${t('Jumsaldı')}</span>${projPart ? `<span><i class="legend-dot hatch"></i>${t('Prognoz')}</span>` : ''}<span><i class="legend-dot" style="background:var(--chip)"></i>${t('Qaldı')}</span></div>
    </section>

    <div class="sec-h"><h3>${t('Kategoriyalar')}</h3><span class="badge">${rows.length}</span></div>
    ${rows.length ? `<div class="card crows">${rows.slice(0, 7).map(([c, v]) => { const ct = catById(c); const lim = type === 'expense' && UI.statPeriod === 'month' ? (S.budget.cats?.[c] || 0) : 0; const ref = lim || tot; const p = Math.round(v / tot * 100);
      return `<button class="crow" data-cat="${c}"><span class="cr-h"><span class="ci sm" style="--c:${catCol(ct)}">${icE(ct.icon)}</span><b class="ell">${esc(t(ct.name))}</b><small class="num">${lim ? `${t('limit')} ${short(lim)}` : p + '%'}</small></span>
        <span class="cr-bar ${lim && v > lim ? 'over' : ''}"><i style="width:${clamp(v / ref * 100, 2, 100)}%"></i></span><span class="cr-f num">${hideable(grp(v))} ${cur()}</span></button>`; }).join('')}</div>`
      : `<div class="card empty"><span class="e-ic">${ic('chart-pie')}</span>${t('Bul dáwirde maǵlıwmat joq')}</div>`}

    ${hm ? `<section class="card heat-card"><div class="sec-h" style="margin:0"><h3>${t('Kalendar')}</h3><span class="badge">${t(MONTHS[hm.getMonth()])}</span></div><div class="heat2">${heat}</div>
      <div class="legend"><span><i class="legend-dot" style="background:var(--violet)"></i>${t('Ortashadan kóp')}</span><span><i class="legend-dot" style="background:var(--lav-2)"></i>${t('Az')}</span><span><i class="legend-dot hatch"></i>${t('Shıǵım joq')}</span></div></section>` : ''}

    ${max ? `<div class="card fc"><div class="fc-top"><span class="ell">${t('Ay aqırına prognoz')}</span></div>
        <div class="fc-v num">${short(fc.proj)} <i>${cur()}</i></div>
        <div class="cr-bar ${S.budget.total && fc.proj > S.budget.total ? 'over' : ''}"><i style="width:${S.budget.total ? clamp(fc.proj / S.budget.total * 100, 0, 100) : 60}%"></i></div>
        <div class="t-s">${S.budget.total ? (fc.proj > S.budget.total ? t(`Usı pátte byudjetten ${short(fc.proj - S.budget.total)} swm asıp ketiwi múmkin`) : t(`Byudjette ${short(S.budget.total - fc.proj)} swm qalıwı kútiledi`)) : t('Byudjet ornatılmaǵan')}</div></div>`
      : `<button class="card fc locked" id="stLock"><span class="lk">${ic('lock')}</span><span style="flex:1;min-width:0"><b>${t('Ay aqırına prognoz')}</b><small>${t('MAX tarifinde ashıladı')}</small></span><span class="badge ink">MAX</span></button>`}

    <div class="insights">
      <div class="card ins"><span class="ins-ic">${ic('calendar-days')}</span><small>${t('Ortasha kúnlik')}</small><b class="num ell">${hideable(short(exp / elapsed))}</b></div>
      <div class="card ins"><span class="ins-ic">${ic('flame')}</span><small>${t('Eń qımbat kún')}</small><b class="num ell">${topDay ? hideable(short(topDay[1])) : '—'}</b></div>
      <div class="card ins"><span class="ins-ic">${ic('coins')}</span><small>${t('Jinaq dárejesi')}</small><b class="num">${saveRate}%</b></div>
      <div class="card ins dark"><span class="ins-ic">${ic('scale')}</span><small>${t('Qaldıq')}</small><b class="num ell">${hideable((inc - exp >= 0 ? '+' : '−') + short(Math.abs(inc - exp)))}</b></div>
    </div>`;
  $$('[data-p]', el).forEach(b => b.onclick = () => { UI.statPeriod = b.dataset.p; UI.statOffset = 0; UI.capSel = null; renderView(); });
  $$('[data-st]', el).forEach(b => b.onclick = () => { UI.statType = b.dataset.st; UI.capSel = null; UI.gaugeCat = 'all'; renderView(); });
  $('#stPrev').onclick = () => { UI.statOffset++; UI.capSel = null; renderView(); };
  $('#stNext').onclick = () => { if (UI.statOffset > 0) { UI.statOffset--; UI.capSel = null; renderView(); } };
  $$('[data-cap]', el).forEach(b => b.onclick = () => { UI.capSel = +b.dataset.cap; renderView(); });
  $$('[data-cat]', el).forEach(b => b.onclick = () => openCatTx(b.dataset.cat, R));
  const csm = $('#csMore', el); if (csm) csm.onclick = () => { UI.csAll = !UI.csAll; renderView(); };
  const gi = gcats.indexOf(gc);
  $('#gPrev').onclick = () => { UI.gaugeCat = gcats[(gi - 1 + gcats.length) % gcats.length]; renderView(); };
  $('#gNext').onclick = () => { UI.gaugeCat = gcats[(gi + 1) % gcats.length]; renderView(); };
  $('#stBud').onclick = openBudget;
  const lk = $('#stLock'); if (lk) lk.onclick = () => openPlans('max');
  $('#stAll').onclick = () => openAllTx();
}

/* ================= SERVICES ================= */
const SERVICES = [
  { id: 'mobile', name: 'Mobil baylanıs', icon: 'smartphone', cat: 'comm', kind: 'mobile' },
  { id: 'elec', name: 'Elektr energiyası', icon: 'zap', cat: 'utility', util: true, prov: ['Aymaqlıq elektr tarmaqları'] },
  { id: 'gas', name: 'Tábiyiy gaz', icon: 'flame', cat: 'utility', util: true, prov: ['Hududgaz Qaraqalpaqstan'] },
  { id: 'water', name: 'Ishimlik suw', icon: 'droplets', cat: 'utility', util: true, prov: ['Suw támiynatı'] },
  { id: 'heat', name: 'Jılıw hám ıssı suw', icon: 'thermometer', cat: 'utility', util: true, prov: ['Jılıw támiynatı'] },
  { id: 'trash', name: 'Shıǵındı shıǵarıw', icon: 'trash-2', cat: 'utility', util: true, prov: ['Taza aymaq'] },
  { id: 'net', name: 'Internet', icon: 'wifi', cat: 'comm', prov: ['Uzonline', 'Sarkor', 'TPS', 'Comnet'] },
  { id: 'tv', name: 'Televidenie', icon: 'tv', cat: 'comm', prov: ['UzDigital TV', 'Sarkor TV'] },
  { id: 'credit', name: 'Kredit tólew', icon: 'landmark', cat: 'other', prov: ['Xalq banki', 'Agrobank', 'Ipoteka bank', 'Kapitalbank'] },
  { id: 'edu', name: 'Oqıw tólemi', icon: 'graduation-cap', cat: 'edu', prov: ['Universitet kontraktı', 'Kolledj', 'Balalar baqshası'] },
  { id: 'fine', name: 'Járiymalar', icon: 'siren', cat: 'other', prov: ['YHXB (GAI) járiymaları', 'Basqa járiymalar'] },
  { id: 'tax', name: 'Salıqlar', icon: 'receipt', cat: 'other', prov: ['Múlk salıǵı', 'Jer salıǵı'] },
  { id: 'transport', name: 'Transport kartası', icon: 'bus', cat: 'transport', prov: ['ATTO'] },
  { id: 'charity', name: 'Qayırqomlıq', icon: 'heart-handshake', cat: 'gift', prov: ['Saqawat qorı'] },
  { id: 'games', name: 'Oyınlar hám servisler', icon: 'gamepad-2', cat: 'fun', prov: ['Steam', 'PUBG Mobile UC', 'Telegram Premium'] }
];
const OPERATORS = [
  { name: 'Beeline', codes: ['90', '91'] }, { name: 'Ucell', codes: ['93', '94', '50'] }, { name: 'Mobiuz', codes: ['97', '88'] },
  { name: 'Uzmobile', codes: ['95', '99', '77'] }, { name: 'Humans', codes: ['33'] }
];
const RATES = { USD: 12850, EUR: 13920, RUB: 132, KZT: 25.4, UZS: 1 };
const SVC_GROUP = { mobile: 'comm', elec: 'util', gas: 'util', water: 'util', heat: 'util', trash: 'util', net: 'comm', tv: 'comm', credit: 'fin', edu: 'life', fine: 'gov', tax: 'gov', transport: 'life', charity: 'life', games: 'life' };
const SVC_GROUPS = [['all', 'Barlıǵı'], ['util', 'Kommunal'], ['comm', 'Baylanıs'], ['fin', 'Qarjı'], ['gov', 'Mámleket'], ['life', 'Turmıs']];
const SVC_GNAME = { util: 'Kommunal', comm: 'Baylanıs', fin: 'Qarjı', gov: 'Mámleket', life: 'Turmıs' };
const FX_CHG = { USD: .12, EUR: -.08, RUB: .31, KZT: -.05 };
function renderServicesOld() {
  const el = $('#v-services'); const q = toLat(UI.svcQuery.trim()); const g = UI.svcGroup || 'all';
  const shown = SERVICES.filter(s => (g === 'all' || SVC_GROUP[s.id] === g) && (!q || toLat(s.name).includes(q) || (s.prov || []).some(p => toLat(p).includes(q))));
  const recent = []; const seen = new Set();
  S.payHist.slice().reverse().forEach(p => { const k = p.svc + p.acc; if (!seen.has(k) && recent.length < 3) { seen.add(k); recent.push(p); } });
  const r = monthRange(); const paidMonth = S.payHist.filter(p => p.date >= r.a && p.date <= r.b).reduce((a, p) => a + p.amount, 0);
  el.innerHTML = `
    <div class="page-head"><div><h1 class="page-title">${t('Xızmetler')}</h1><p>${t('Tólemler hám qurallar')}</p></div>
      <div class="ph-acts"><button class="circ" id="svSearch" aria-label="search">${ic(UI.svcSearch ? 'x' : 'search')}</button><button class="circ" id="svHist" aria-label="history">${ic('receipt')}${S.payHist.length ? `<em>${Math.min(9, S.payHist.length)}</em>` : ''}</button></div></div>
    ${UI.svcSearch ? `<label class="search">${ic('search')}<input id="svQ" value="${esc(UI.svcQuery)}" placeholder="${t('Xızmetti izlew')}"></label>` : ''}
    ${q ? '' : `<section class="sv-sum">
      <div class="ss-l"><small>${t('Bul ay xızmetlerge')}</small><b class="num ell">${hideable(grp(paidMonth))} <i>${cur()}</i></b><span>${S.payHist.length} ${t('tólem')} · ${t('komissiya')} 0%</span></div>
      <div class="ss-r">${recent.length ? recent.map(p => { const s = SERVICES.find(x => x.id === p.svc) || SERVICES[0]; return `<button class="qp" data-rep="${S.payHist.lastIndexOf(p)}"><span>${ic(s.icon)}</span><small class="ell num">${p.svc === 'mobile' ? '…' + p.acc.slice(-4) : esc(String(p.acc).slice(-5))}</small></button>`; }).join('') : ''}
        <button class="qp add" data-svc="mobile"><span>${ic('plus')}</span><small>${t('Jańa')}</small></button></div>
    </section>`}
    <div class="grp-chips">${SVC_GROUPS.map(([k, l]) => `<button data-g="${k}" class="${g === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
    <div class="shop">${shown.map((s, i) => `<button class="shop-card ${s.id === 'mobile' ? 'hl' : i % 5 === 3 ? 'v' : ''}" data-svc="${s.id}">
        <small class="ell">${t(SVC_GNAME[SVC_GROUP[s.id]])}</small><b>${t(s.name)}</b><em class="ell">${s.kind === 'mobile' ? '0% ' + t('komissiya') : (s.prov || []).length + ' ' + t('provayder')}</em>
        <span class="sc-ic">${ic(s.icon)}</span><span class="sc-go">${ic('plus')}</span></button>`).join('') || `<div class="card empty" style="grid-column:1/-1"><span class="e-ic">${ic('search-x')}</span>${t('Hesh nárse tabılmadı')}</div>`}</div>
    <div class="sec-h"><h3>${t('Valyuta kursları')}</h3><span class="badge">${t('Demo kurs')}</span></div>
    <div class="card fx-list">${['USD', 'EUR', 'RUB'].map(c => { const ch = FX_CHG[c]; return `<button class="fx2" data-rate="${c}"><span class="fx2-l"><b class="num">${String(RATES[c]).replace('.', ',')}<i>,00</i></b><small><span class="fdot ${ch > 0 ? 'up' : ''}"></span>1 ${c} · ${ch > 0 ? '+' : ''}${String(ch).replace('.', ',')}%</small></span><span class="circ sm">${ic('arrow-up-right')}</span></button>`; }).join('')}</div>
    <div class="sec-h"><h3>${t('Qarjı qurallari')}</h3></div>
    <div class="tool-tiles">
      <button class="tt ink" id="tlCredit"><span class="tt-top"><span class="tt-ic">${ic('landmark')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Kredit kalkulyatorı')}</b></button>
      <button class="tt v" id="tlDep"><span class="tt-top"><span class="tt-ic">${ic('coins')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Depozit kalkulyatorı')}</b></button>
      <button class="tt card" id="tlFx"><span class="tt-top"><span class="tt-ic">${ic('repeat')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Valyuta konvertorı')}</b></button>
      <button class="tt lav" id="svUtil"><span class="tt-top"><span class="tt-ic">${ic('house')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Kommunal tólemler')}</b></button>
    </div>`;
  const qi = $('#svQ'); if (qi) qi.oninput = e => { UI.svcQuery = e.target.value; const pos = e.target.selectionStart; renderView(); const n = $('#svQ'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) {} };
  $('#svSearch').onclick = () => { UI.svcSearch = !UI.svcSearch; if (!UI.svcSearch) UI.svcQuery = ''; renderView(); const n = $('#svQ'); n && n.focus(); };
  $('#svHist').onclick = openPayHistory;
  $$('[data-svc]', el).forEach(b => b.onclick = () => openPay(SERVICES.find(s => s.id === b.dataset.svc)));
  $$('[data-g]', el).forEach(b => b.onclick = () => { UI.svcGroup = b.dataset.g; renderView(); });
  $('#svUtil').onclick = openUtilities;
  $$('[data-rate]', el).forEach(b => b.onclick = () => openFx(b.dataset.rate));
  $('#tlFx').onclick = () => openFx('USD'); $('#tlCredit').onclick = openCreditCalc; $('#tlDep').onclick = openDepositCalc;
  $$('[data-rep]', el).forEach(b => b.onclick = () => { const p = S.payHist[+b.dataset.rep]; if (p) openPay(SERVICES.find(s => s.id === p.svc), p); });
}
function openPayHistory() {
  Page.open({
    title: t('Tólemler tarixı'), sub: `${S.payHist.length} ${t('tólem')}`,
    html: () => S.payHist.length ? `<div class="card list">${S.payHist.slice().reverse().map((p, i) => { const s = SERVICES.find(x => x.id === p.svc) || SERVICES[0]; return `<button class="row" data-rep="${S.payHist.length - 1 - i}"><span class="r-ic">${ic(s.icon)}</span>
      <span class="r-t"><div>${t(s.name)}</div><small>${esc(p.svc === 'mobile' ? '+998 ' + fmtPhone(p.acc) : p.acc)} · ${dayLabel(p.date)}</small></span><span class="r-v num"><span>${grp(p.amount)}</span>${ic('rotate-ccw')}</span></button>`; }).join('')}</div>`
      : `<div class="card empty"><span class="e-ic">${ic('receipt')}</span>${t('Ele tólem joq')}</div>`,
    mount: el => $$('[data-rep]', el).forEach(b => b.onclick = () => { const p = S.payHist[+b.dataset.rep]; openPay(SERVICES.find(s => s.id === p.svc), p); })
  });
}
function openUtilities() {
  Sheet.open({
    title: t('Kommunal tólemler'),
    html: () => `<div class="card list">${SERVICES.filter(s => s.util).map(s => `<button class="row" data-u="${s.id}"><span class="r-ic">${ic(s.icon)}</span><span class="r-t"><div>${t(s.name)}</div><small>${t(s.prov[0])}</small></span>${ic('chevron-right')}</button>`).join('')}</div>`,
    mount: el => $$('[data-u]', el).forEach(b => b.onclick = () => openPay(SERVICES.find(s => s.id === b.dataset.u)))
  });
}
const fmtPhone = d => { d = d.replace(/\D/g, '').slice(0, 9); const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean); return p.length ? `(${p[0]}${p[0].length === 2 && p.length > 1 ? ')' : ''}${p[1] ? ' ' + p[1] : ''}${p[2] ? '-' + p[2] : ''}${p[3] ? '-' + p[3] : ''}` : ''; };
const detectOp = d => { const c = d.replace(/\D/g, '').slice(0, 2); return OPERATORS.find(o => o.codes.includes(c)); };
function openPay(svc, repeat = null) {
  const st = { prov: repeat?.prov || svc.prov?.[0] || '', acc: repeat?.acc || '', amount: repeat?.amount || 0, wallet: repeat?.wallet && walletById(repeat.wallet) ? repeat.wallet : S.wallets[0]?.id, debt: null };
  const isMob = svc.kind === 'mobile';
  const form = () => ({
    title: t(svc.name),
    html: () => `
      <div style="display:flex;align-items:center;gap:12px"><span class="chip-ic" style="width:52px;height:52px;border-radius:18px">${ic(svc.icon)}</span>
        <div style="min-width:0"><div style="font-weight:700">${t(svc.name)}</div><small class="muted">${t('Komissiya: 0%')}</small></div></div>
      ${isMob ? `<div class="field"><label>${t('Telefon nomeri')}</label>
          <div style="display:flex;gap:8px"><span class="inp" style="width:auto;display:grid;place-items:center;flex:none">+998</span><input class="inp num" id="pAcc" inputmode="tel" placeholder="(90) 123-45-67" value="${esc(fmtPhone(st.acc))}"></div>
          <div id="pOp" style="min-height:26px"></div></div>`
      : `${svc.prov && svc.prov.length > 1 ? `<div class="field"><label>${t('Provayder')}</label><select class="inp" id="pProv">${svc.prov.map(p => `<option ${p === st.prov ? 'selected' : ''}>${esc(t(p))}</option>`).join('')}</select></div>` : ''}
        <div class="field"><label>${t(svc.util ? 'Esap nomeri (lícevoy schyot)' : 'Esap / shot nomeri')}</label><input class="inp num" id="pAcc" inputmode="numeric" placeholder="${t('Mısalı')}: 1234567" value="${esc(st.acc)}" maxlength="20"></div>
        ${svc.util ? `<button class="btn ghost sm" id="pCheck" style="align-self:flex-start">${ic('search')}${t('Qarızdarlıqtı tekseriw')}</button><div id="pDebt"></div>` : ''}`}
      <div class="field"><label>${t('Muǵdar')} (${cur()})</label>${moneyInput('pAmt', st.amount)}
        <div class="chips" style="margin-top:4px">${(isMob ? [5000, 10000, 20000, 50000] : [50000, 100000, 200000, 500000]).map(v => `<button class="chip" data-am="${v}">${grp(v)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Hamyannan tólew')}</label><div class="chips">${S.wallets.map(w => `<button class="chip ${w.id === st.wallet ? 'on' : ''}" data-pw="${w.id}">${ic(w.icon)}<span class="ell">${esc(t(w.name))} · ${short(walletBal(w.id))}</span></button>`).join('')}</div></div>
      <button class="btn pri" id="pNext">${t('Dawam etiw')}${ic('arrow-right')}</button>`,
    mount: el => {
      bindMoney(el);
      const acc = $('#pAcc');
      const opPaint = () => { if (!isMob) return; const o = detectOp(acc.value); $('#pOp').innerHTML = o ? `<span class="badge">${ic('signal')}${o.name}</span>` : (acc.value.replace(/\D/g, '').length >= 2 ? `<span class="badge bad">${t('Operator tabılmadı')}</span>` : ''); refreshIcons(); };
      if (isMob) { acc.oninput = () => { acc.value = fmtPhone(acc.value); opPaint(); }; opPaint(); }
      $$('[data-am]', el).forEach(b => b.onclick = () => { $('#pAmt').value = grp(+b.dataset.am); });
      $$('[data-pw]', el).forEach(b => b.onclick = () => { st.wallet = b.dataset.pw; $$('[data-pw]', el).forEach(x => x.classList.toggle('on', x === b)); });
      const ck = $('#pCheck'); if (ck) ck.onclick = () => {
        const a = acc.value.replace(/\D/g, ''); if (a.length < 5) return toast(t('Esap nomerin tolıq kirgiziń'), { icon: 'circle-alert' });
        $('#pDebt').innerHTML = `<div class="typing"><i></i><i></i><i></i></div>`;
        setTimeout(() => {
          let h = 0; for (const ch of a + svc.id) h = (h * 31 + ch.charCodeAt(0)) % 100000; const debt = 40000 + (h % 36) * 5000;
          $('#pDebt').innerHTML = `<div class="card" style="padding:14px;display:flex;justify-content:space-between;gap:10px;align-items:center"><div style="min-width:0"><small class="muted">${t('Abonent')}: ${a}</small><div style="font-weight:700">${t('Qarızdarlıq')}: <span class="num">${grp(debt)} ${cur()}</span></div></div><span class="badge">${t('Demo')}</span></div>`;
          $('#pAmt').value = grp(debt);
        }, 900);
      };
      $('#pNext').onclick = () => {
        st.acc = isMob ? acc.value.replace(/\D/g, '') : acc.value.trim(); st.amount = parseMoney($('#pAmt').value); const pv = $('#pProv'); if (pv) st.prov = svc.prov[pv.selectedIndex];
        if (isMob) { if (st.acc.length !== 9) return toast(t('Telefon nomerin tolıq kirgiziń'), { icon: 'circle-alert' }); if (!detectOp(st.acc)) return toast(t('Operator tabılmadı'), { icon: 'circle-alert' }); st.prov = detectOp(st.acc).name; }
        else if (st.acc.length < 5) return toast(t('Esap nomerin tolıq kirgiziń'), { icon: 'circle-alert' });
        if (st.amount < 1000) return toast(t('Eń az muǵdar — 1 000 swm'), { icon: 'circle-alert' });
        if (!st.wallet) return toast(t('Aldın hamyan qosıń'), { icon: 'circle-alert' });
        if (walletBal(st.wallet) < st.amount) return toast(t('Hamyanda qarjı jetkiliksiz'), { icon: 'circle-alert' });
        Sheet.open(confirmStep());
      };
    }
  });
  const accLabel = () => isMob ? '+998 ' + fmtPhone(st.acc) : st.acc;
  const confirmStep = () => ({
    title: t('Tastıyıqlaw'),
    html: () => `<div class="receipt">
        <span class="r-logo">${ic('zap')}</span>
        <div class="r-amt num">${grp(st.amount)}<span style="font-size:1.2rem;color:var(--muted);letter-spacing:0"> ${cur()}</span></div>
        <div class="muted" style="font-size:.9rem">${t(svc.name)}</div>
        <hr>
        <div class="kv"><span>${t('Provayder')}</span><span>${esc(t(st.prov))}</span></div>
        <div class="kv"><span>${t(isMob ? 'Nomer' : 'Esap')}</span><span class="num">${esc(accLabel())}</span></div>
        <div class="kv"><span>${t('Hamyan')}</span><span>${walletName(st.wallet)}</span></div>
        <div class="kv"><span>${t('Komissiya')}</span><span>0 ${cur()}</span></div>
        <hr>
        <div class="kv"><span>${t('Jámi')}</span><span class="num" style="font-size:1.05rem">${grp(st.amount)} ${cur()}</span></div>
      </div>
      <div class="slider" id="slider"><div class="s-fill"></div><div class="s-txt">${t('Tólew ushın súyreń')}</div><div class="knob">${ic('chevrons-right')}</div></div>
      <div class="demo-note">${ic('shield-check')}${t('Demo rejim: tólem kirim-shıǵım esabına jazıladı')}</div>`,
    mount: el => slideToConfirm($('#slider', el), () => {
      const rec = { id: uid(), type: 'expense', amount: st.amount, cat: svc.cat, wallet: st.wallet, date: today(), note: `${t(svc.name)} · ${accLabel()}`, ts: Date.now() };
      S.tx.push(rec); S.payHist.push({ svc: svc.id, prov: st.prov, acc: st.acc, amount: st.amount, wallet: st.wallet, date: today() }); S.payHist = S.payHist.slice(-30); save();
      Sheet.replace(successStep('Tólem ámelge asırıldı', `${grp(st.amount)} ${cur()} · ${t(svc.name)}`)); renderView();
    })
  });
  Sheet.open(form());
}
function successStep(title, sub) {
  return {
    title: '', html: () => `<div class="success"><span class="ok-c">${ic('check')}</span><h3>${t(title)}</h3><div class="muted num">${sub}</div></div>
      <button class="btn ink" id="sDone">${t('Tayın')}</button>`,
    mount: () => { vib([20, 40, 20]); confetti(60); $('#sDone').onclick = () => Sheet.close(); }
  };
}
function slideToConfirm(sl, done) {
  const knob = $('.knob', sl), fill = $('.s-fill', sl); let x0 = null, dx = 0, max = 0, finished = false;
  const set = v => { knob.style.transform = `translateX(${v}px)`; fill.style.width = (v + 64) + 'px'; };
  knob.addEventListener('pointerdown', e => { if (finished) return; x0 = e.clientX; max = sl.clientWidth - 64; knob.classList.remove('anim'); fill.classList.remove('anim'); knob.setPointerCapture(e.pointerId); });
  knob.addEventListener('pointermove', e => { if (x0 === null) return; dx = clamp(e.clientX - x0, 0, max); set(dx); });
  const end = () => { if (x0 === null) return; x0 = null; knob.classList.add('anim'); fill.classList.add('anim');
    if (dx > max * .82) { finished = true; set(max); vib(15); setTimeout(done, 280); } else { dx = 0; set(0); } };
  knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
  knob.tabIndex = 0; knob.addEventListener('keydown', e => { if (e.key === 'Enter' && !finished) { finished = true; max = sl.clientWidth - 64; knob.classList.add('anim'); fill.classList.add('anim'); set(max); setTimeout(done, 300); } });
}
function openFx(from = 'USD') {
  const codes = ['USD', 'EUR', 'RUB', 'KZT', 'UZS'];
  Sheet.open({
    title: t('Valyuta konvertorı'),
    html: () => `<div class="field"><label>${t('Muǵdar')}</label>${moneyInput('fxA', 100)}</div>
      <div class="row2"><div class="field"><label>${t('Neden')}</label><select class="inp" id="fxF">${codes.map(c => `<option ${c === from ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      <div class="field"><label>${t('Nege')}</label><select class="inp" id="fxT">${codes.map(c => `<option ${c === 'UZS' ? 'selected' : ''}>${c}</option>`).join('')}</select></div></div>
      <div class="card" style="padding:20px;text-align:center"><small class="muted">${t('Nátiyje')}</small><div class="num" id="fxR" style="font-family:var(--f-display);font-weight:800;font-size:2rem;letter-spacing:-.03em;word-break:break-all"></div></div>
      <div class="demo-note">${ic('info')}${t('Kurslar demo maqsetinde kórsetilgen, bank kursı menen ayırmashılıǵı bolıwı múmkin')}</div>`,
    mount: el => {
      bindMoney(el);
      const calc = () => { const a = parseMoney($('#fxA').value), f = $('#fxF').value, to = $('#fxT').value; const r = a * RATES[f] / RATES[to]; $('#fxR').textContent = (r >= 100 ? grp(r) : (Math.round(r * 100) / 100).toString().replace('.', ',')) + ' ' + to; };
      ['#fxA', '#fxF', '#fxT'].forEach(s => $(s).addEventListener('input', calc)); calc();
    }
  });
}
function openCreditCalc() {
  Sheet.open({
    title: t('Kredit kalkulyatorı'),
    html: () => `<div class="field"><label>${t('Kredit muǵdarı')} (${cur()})</label>${moneyInput('crA', 20000000)}</div>
      <div class="field"><label>${t('Procent túri')}</label><div class="seg cr-seg"><button data-pt="y" class="on">${t('Jıllıq %')}</button><button data-pt="m">${t('Aylıq %')}</button></div></div>
      <div class="row2"><div class="field"><label id="crPL">${t('Jıllıq procent')} (%)</label><input class="inp num" id="crP" inputmode="decimal" value="24"></div>
      <div class="field"><label>${t('Múddeti (ay)')}</label><input class="inp num" id="crM" inputmode="numeric" value="24"></div></div>
      <div class="bento" id="crR"></div>`,
    mount: el => {
      bindMoney(el); let pt = 'y';
      const calc = () => {
        const A = parseMoney($('#crA').value), p = parseFloat(String($('#crP').value).replace(',', '.')) || 0, n = parseInt($('#crM').value) || 0;
        if (!A || !n) { $('#crR').innerHTML = ''; return; }
        const i = pt === 'm' ? p / 100 : p / 1200; const m = i ? A * i / (1 - Math.pow(1 + i, -n)) : A / n; const total = m * n;
        $('#crR').innerHTML = `<div class="card tile violet wide"><div class="t-h">${t('Aylıq tólem')}</div><div class="t-v num">${grp(m)} ${cur()}</div></div>
          <div class="card tile"><div class="t-h">${t('Jámi tólem')}</div><div class="t-v num">${short(total)}</div></div>
          <div class="card tile"><div class="t-h">${t('Artıq tólem')}</div><div class="t-v num">${short(total - A)}</div></div>`;
      };
      $$('[data-pt]', el).forEach(b => b.onclick = () => { if (pt === b.dataset.pt) return; const v = parseFloat(String($('#crP').value).replace(',', '.')) || 0; pt = b.dataset.pt; $$('[data-pt]', el).forEach(x => x.classList.toggle('on', x === b)); $('#crPL').textContent = `${t(pt === 'm' ? 'Aylıq procent' : 'Jıllıq procent')} (%)`; $('#crP').value = String(Math.round((pt === 'm' ? v / 12 : v * 12) * 100) / 100).replace('.', ','); calc(); });
      ['#crA', '#crP', '#crM'].forEach(s => $(s).addEventListener('input', calc)); calc();
    }
  });
}
function openDepositCalc() {
  Sheet.open({
    title: t('Depozit kalkulyatorı'),
    html: () => `<div class="field"><label>${t('Baslanǵısh summa')} (${cur()})</label>${moneyInput('dpA', 5000000)}</div>
      <div class="field"><label>${t('Hár ayda qosıw')} (${cur()})</label>${moneyInput('dpAdd', 500000)}</div>
      <div class="row2"><div class="field"><label>${t('Jıllıq procent')} (%)</label><input class="inp num" id="dpP" inputmode="decimal" value="20"></div>
      <div class="field"><label>${t('Múddeti (ay)')}</label><input class="inp num" id="dpM" inputmode="numeric" value="12"></div></div>
      <div class="bento" id="dpR"></div>`,
    mount: el => {
      bindMoney(el);
      const calc = () => {
        let b = parseMoney($('#dpA').value); const add = parseMoney($('#dpAdd').value), p = parseFloat(String($('#dpP').value).replace(',', '.')) || 0, n = parseInt($('#dpM').value) || 0;
        const start = b; for (let k = 0; k < n; k++) { b = b * (1 + p / 1200); if (k < n - 1) b += add; }
        const put = start + add * Math.max(0, n - 1);
        $('#dpR').innerHTML = `<div class="card tile violet wide"><div class="t-h">${t('Múddet aqırında')}</div><div class="t-v num">${grp(b)} ${cur()}</div></div>
          <div class="card tile"><div class="t-h">${t('Siz qosqanıńız')}</div><div class="t-v num">${short(put)}</div></div>
          <div class="card tile"><div class="t-h">${t('Procent dáramatı')}</div><div class="t-v num">${short(b - put)}</div></div>`;
      };
      ['#dpA', '#dpAdd', '#dpP', '#dpM'].forEach(s => $(s).addEventListener('input', calc)); calc();
    }
  });
}

/* ================= PROFILE ================= */
function renderProfile0() {
  const el = $('#v-profile'); const max = isMax(); const p = S.profile || {};
  const r = monthRange(); const l = inRange(r.a, r.b); const inc = sum(l, 'income'), exp = sum(l, 'expense');
  const rate = inc ? Math.max(0, Math.round((inc - exp) / inc * 100)) : 0;
  const lock = max ? '' : '<span class="badge ink">MAX</span>';
  const row = (id, icon, title, sub = '', right = ic('chevron-right'), cls = '') => `<button class="row" id="${id}"><span class="r-ic ${cls}">${icE(icon)}</span><span class="r-t"><div>${t(title)}</div>${sub ? `<small>${sub}</small>` : ''}</span><span class="r-v">${right}</span></button>`;
  const sw = (id, icon, title, sub, on) => `<button class="row" id="${id}" role="switch" aria-checked="${on}"><span class="r-ic">${icE(icon)}</span><span class="r-t"><div>${t(title)}</div>${sub ? `<small>${t(sub)}</small>` : ''}</span><span class="switch ${on ? 'on' : ''}"></span></button>`;
  el.innerHTML = `
    <section class="pf">
      <div class="pf-band"><span></span><button class="circ" id="pfEdit" aria-label="edit">${ic('pencil')}</button></div>
      <div class="pf-ava-wrap"><button id="pfAva" class="pf-ava-btn" aria-label="photo">${avatarHtml('xl')}<span class="pf-cam">${ic('camera')}</span></button></div>
      <h2 class="pf-name">${esc(t(displayName()))}</h2>
      <div class="pf-sub">${p.phone ? `<span class="num">+998 ${esc(fmtPhone(p.phone))}</span>` : `<button class="link" id="pfAddPh">${ic('plus')}${t('Telefon nomerin qosıw')}</button>`}</div>
      <div class="pf-metrics">
        <div><b class="num">${S.tx.length}</b><small>${t('operaciya')}</small></div>
        <div><b class="num">${S.wallets.length}</b><small>${t('hamyan')}</small></div>
      </div>
      <div class="pf-quick">
        <button id="pqPlan">${ic('calendar-range')}<span>${t('Kalendar')}</span></button>
        <button id="pqStyle">${ic('palette')}<span>${t('Stil')}</span></button>
        <button id="pqReport">${ic('file-chart-column')}<span>${t('Esabat')}</span></button>
      </div>
    </section>
    <div class="group"><h4>${t('QARJÍ')}</h4><div class="card list">
      ${row('pfWallets', 'wallet', 'Hamyanlar', `${S.wallets.length} ${t('hamyan')} · ${grp(totalBal())} ${cur()}`)}
      ${row('pfBudget', 'chart-pie', 'Byudjet hám limitler', S.budget.total ? `${t('Ayına')} ${grp(S.budget.total)} ${cur()}` : t('Ornatılmaǵan'))}
      ${row('pfGoals', 'target', 'Jinaq maqsetleri', `${S.goals.length} ${t('maqset')}`)}
      ${row('pfDebts', 'hand-coins', 'Qarızlar', `${S.debts.filter(d => !d.paid).length} ${t('aktiv qarız')}`)}
      ${row('pfRec', 'calendar-clock', 'Turaqlı tólemler', `${S.recurring.length} ${t('tólem')}`)}
    </div></div>

    <div class="group"><h4>${t('QOSÍMSHA QURALLAR')}</h4><div class="card list">
      ${row('pfBiz', 'briefcase-business', 'Biznes paneli', t('Klientler hám hisob-fakturalar'), lock || ic('chevron-right'))}
      ${row('pfCal', 'calendar-range', 'Tólem kalendarı', t('Barlıq tólemler bir kalendarda'), lock || ic('chevron-right'))}
    </div></div>

    <div class="group" id="grpStyle"><h4>${t('PROGRAMMA STILI')}</h4><div class="card list">
      <div class="style-pick">
        <button class="sp ${S.style === 'classic' ? 'on' : ''}" data-style="classic"><span class="prev c"><i></i><i></i><i></i></span><span class="ell">Classic</span></button>
        <button class="sp ${S.style === 'glass' ? 'on' : ''}" data-style="glass"><span class="prev g"><i></i><i></i><i></i></span><span class="ell">Liquid Glass</span></button>
      </div>
      <div style="padding:4px 8px 10px"><div class="seg ${S.style === 'aurora' ? 'dim' : ''}">
        <button data-mode="light" class="${S.mode === 'light' ? 'on' : ''}">${t('Jaqtı')}</button><button data-mode="dark" class="${S.mode === 'dark' ? 'on' : ''}">${t('Qarańǵı')}</button><button data-mode="auto" class="${S.mode === 'auto' ? 'on' : ''}">${t('Avtomat')}</button></div></div>
      ${sw('pfElder', 'accessibility', 'Úlkenler ushın rejim', 'Úlken jazıw hám anıq tuymeler', S.elder)}
      ${sw('pfSound', 'volume-2', 'Dawıs effektleri', 'Túymeler basılǵanda sulıw dawıslar', S.sound !== false)}
    </div></div>

    <div class="group" id="grpLook"><h4>${t('KÓRINIS')}</h4><div class="card list">
      <div class="look-pick">
        <button class="lp-b ${S.iconMode !== 'emoji' ? 'on' : ''}" data-im="icon"><span class="lp-prev"><i style="--c:#F59E0B">${ic0('shopping-basket')}</i><i style="--c:#3B82F6">${ic0('car')}</i><i style="--c:#EF4444">${ic0('heart-pulse')}</i></span><b>${t('Iconlar')}</b><small>${t('Reńli sızıq belgiler')}</small></button>
        <button class="lp-b ${S.iconMode === 'emoji' ? 'on' : ''}" data-im="emoji"><span class="lp-prev e"><i>🛒</i><i>🚗</i><i>🩺</i></span><b>${t('Emoji')}</b><small>${t('Kewilli stikerler')}</small></button>
      </div>
    </div></div>

    <div class="group" id="grpLang"><h4>${t('TIL')}</h4><div class="card list">
      ${(() => { const L = LANGS.find(x => x.id === S.lang) || LANGS[0]; return `<button class="row lang-one" id="pfLang"><span class="lang-f">${L.flag}</span><span class="r-t"><div>${t('Til')}</div><small>${L.name} · ${L.sub}</small></span><span class="r-v">${ic('chevron-right')}</span></button>`; })()}
    </div></div>

    <div class="group"><h4>${t('QÁWIPSIZLIK')}</h4><div class="card list">
      ${row('pfSup', 'headset', 'AI Support', 'Qosımsha boyınsha sorawlarǵa juwap', ic('chevron-right'), 'sup-ic')}
      ${row('pfPin', 'lock', 'PIN-kod', S.pin ? t('Qosılǵan') : t('Óshirilgen'))}
      ${sw('pfHide', 'eye-off', 'Balanstı jasırıw', 'Summalar bulıńǵır kórinedi', S.hideBal)}
    </div></div>

    <div class="group"><h4>${t('BASQA')}</h4><div class="card list">
      ${row('pfNotif', 'bell', 'Xabarlamalar', `${unread()} ${t('jańa')}`)}
      ${row('pfData', 'database', 'Maǵlıwmatlar', t('Eksport, rezerv nusqa, tazalaw'))}
      ${row('pfHelp', 'circle-help', 'Járdem hám sorawlar')}
      ${row('pfRate', 'star', 'Qosımshanı bahalaw', S.rated ? '★'.repeat(S.rated) : '')}
      ${row('pfAbout', 'info', 'Qosımsha haqqında', 'E-esap v3.0')}
    </div></div>
    <div class="group"><h4>${t('AKKAUNT')}</h4><div class="card list acc-card">
      <button class="row acc-row" id="pfLogout"><span class="r-ic acc-o">${ic('log-out')}</span><span class="r-t"><div>${t('Akkaunttan shıǵıw')}</div><small>${t('Maǵlıwmatlar saqlanadı')}</small></span><span class="r-v">${ic('chevron-right')}</span></button>
      <button class="row acc-row" id="pfDelAcc"><span class="r-ic acc-d">${ic('user-x')}</span><span class="r-t"><div class="acc-dt">${t('Akkaunttı óshiriw')}</div><small>${t('Barlıq maǵlıwmatlar biraqola óshiriledi')}</small></span><span class="r-v">${ic('chevron-right')}</span></button>
    </div></div>
  `;
  $('#pfDelAcc').onclick = () => {
    const R = [['frown', 'Qosımsha maǵan unamadı'], ['puzzle', 'Kerekli múmkinshilik jetispeydi'], ['repeat', 'Basqa qosımshaǵa ótemen'], ['user-plus', 'Jańa akkaunt ashıwım kerek'], ['pencil-line', 'Basqa sebep']];
    let sel = null;
    Sheet.open({ title: t('Akkaunttı óshiriw'),
      html: () => `<p class="dl-sub">${t('Ketiwińizge ókinemiz 😔 Iltimas, sebebin aytıń — bul E-esap tı jaqsılawǵa járdem beredi.')}</p>
        <div class="dl-list">${R.map(([icn, l], k) => `<button class="dl-r" data-r="${k}"><span class="dl-i">${ic(icn)}</span><span>${t(l)}</span><i class="dl-c"></i></button>`).join('')}</div>
        <div class="dl-other"><textarea class="inp" id="dlTxt" rows="3" maxlength="300" placeholder="${t('Sebebin jazıń...')}"></textarea></div>
        <div class="dl-warn">${ic('triangle-alert')}<span>${t('Barlıq balanslar, operaciyalar, maqsetler hám qarızlar biraqola óshiriledi. Bunı qaytarıp bolmaydı.')}</span></div>
        <button class="btn dl-go" id="dlGo" disabled>${ic('trash-2')}${t('Akkaunttı óshiriw')}</button>`,
      mount: el => {
        const go = $('#dlGo', el), tx = $('#dlTxt', el), oth = $('.dl-other', el);
        const upd = () => { go.disabled = sel == null || (sel === 4 && tx.value.trim().length < 3); };
        $$('[data-r]', el).forEach(b => b.onclick = () => { sel = +b.dataset.r; $$('[data-r]', el).forEach(x => x.classList.toggle('on', x === b)); oth.classList.toggle('show', sel === 4); if (sel === 4) setTimeout(() => tx.focus(), 60); upd(); });
        tx.addEventListener('input', upd);
        go.onclick = async () => {
          if (!(await ask('Anıq pa?', 'Bul sońǵı eskertiw. Akkaunt hám barlıq maǵlıwmatlar qayta tiklenbeydi.', 'Biraqola óshiriw', true))) return;
          try { const fb = JSON.parse(localStorage.getItem('eesap_delfb') || '[]'); fb.push({ reason: sel === 4 ? tx.value.trim() : R[sel][1], at: Date.now() }); localStorage.setItem('eesap_delfb', JSON.stringify(fb.slice(-20))); } catch (e) {}
          const ph = Auth.session(); try { localStorage.removeItem(KEY + ':' + ph); } catch (e) {}
          const u = Auth.users(); delete u[ph]; Auth.saveUsers(u); Auth.logout();
          try { sessionStorage.setItem('eesap_skipintro', '1'); } catch (e) {} location.reload();
        };
      } });
  };
  $('#pfSup').onclick = () => openSupport();
  $('#pfLogout').onclick = async () => { if (!(await ask('Akkaunttan shıǵıw', 'Qaytadan kiriw ushın telefon nomeri hám parol kerek boladı.', 'Shıǵıw', true))) return; Auth.logout(); try { sessionStorage.setItem('eesap_skipintro', '1'); } catch (e) {} location.reload(); };
  $('#pfEdit').onclick = openProfileEdit; $('#pfAva').onclick = openProfileEdit;
  const aph = $('#pfAddPh'); if (aph) aph.onclick = openProfileEdit;
  $('#pqPlan').onclick = () => openCalendar(); $('#pqReport').onclick = openReport;
  $('#pqStyle').onclick = () => $('#grpStyle').scrollIntoView({ behavior: 'smooth', block: 'center' });
  const pm = $('#pfMax'); if (pm) pm.onclick = () => openPlans('max');
  const bb = $('#bzBiz'); if (bb) { bb.onclick = openBusiness; $('#bzRep').onclick = openReport; $('#bzCal').onclick = openCalendar; $('#bzFc').onclick = () => setTab('stats'); }
  $('#pfWallets').onclick = openWallets; $('#pfBudget').onclick = openBudget; $('#pfGoals').onclick = openGoals;
  $('#pfDebts').onclick = openDebts; $('#pfRec').onclick = openRecurring; $('#pfBiz').onclick = openBusiness; $('#pfCal').onclick = openCalendar;
  $$('[data-style]', el).forEach(b => b.onclick = () => {
    const st = b.dataset.style;
    
    S.style = st; save(); applyLook(); renderView();
  });
  $$('[data-mode]', el).forEach(b => b.onclick = () => { S.mode = b.dataset.mode; save(); applyLook(); renderView(); });
  $('#pfElder').onclick = () => { S.elder = !S.elder; save(); applyLook(); renderView(); };
  $('#pfSound').onclick = () => { S.sound = S.sound === false; save(); renderView(); if (S.sound) setTimeout(() => sfx('success'), 60); toast(t(S.sound ? 'Dawıs effektleri qosıldı' : 'Dawıs effektleri óshirildi'), { icon: S.sound ? 'volume-2' : 'volume-x' }); };
  $('#pfLang').onclick = () => Sheet.open({ title: t('Tildi saylań'),
    html: () => `<div class="card list lang-list">${LANGS.map(L => `<button class="lang-r ${S.lang === L.id ? 'on' : ''}" data-lang="${L.id}"><span class="lang-f">${L.flag}</span><span class="lang-t"><b>${L.name}</b><small>${L.sub}</small></span><span class="lang-c">${ic('check')}</span></button>`).join('')}</div>`,
    mount: e2 => $$('[data-lang]', e2).forEach(b => b.onclick = () => { S.lang = b.dataset.lang; save(); Sheet.close(); renderAll(); sfx('toggle'); }) });
  $$('[data-im]', el).forEach(b => b.onclick = () => { S.iconMode = b.dataset.im; save(); document.documentElement.dataset.icons = S.iconMode; renderAll(); sfx('toggle'); });
  $('#pfPin').onclick = openPinSetup;
  $('#pfHide').onclick = () => { S.hideBal = !S.hideBal; save(); renderView(); };
  $('#pfNotif').onclick = openNotifs; $('#pfData').onclick = openData;
  $('#pfHelp').onclick = openHelp; $('#pfRate').onclick = openRate; $('#pfAbout').onclick = openAbout;
}
function resizePhoto(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = 320, c = document.createElement('canvas'); c.width = c.height = s; const x = c.getContext('2d');
        const m = Math.min(img.width, img.height); x.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
        res(c.toDataURL('image/jpeg', .84));
      };
      img.onerror = rej; img.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}
function openProfileEdit() {
  const p = { first: '', last: '', father: '', phone: '', photo: '', ...(S.profile || {}) };
  const ava = () => p.photo ? `<img src="${p.photo}" alt="">` : kmModel('', 'pe');
  Page.open({
    title: t('Profil maǵlıwmatları'), noRefresh: true, sub: t('Atı, familiyası, telefon hám súwret'),
    html: () => `
      <section class="pe-photo card">
        <div class="pe-ava" id="peAva">${ava()}</div>
        <div class="pe-acts">
          <label class="btn ink sm" for="peFile">${ic('camera')}${t('Súwret júklew')}</label>
          <input type="file" id="peFile" accept="image/*" hidden>
          <button class="btn ghost sm ${p.photo ? '' : 'hide'}" id="peDel">${ic('trash-2')}${t('Óshiriw')}</button>
        </div>
        <small class="muted">${t('JPG yamasa PNG. Súwret qurılmańızda saqlanadı.')}</small>
      </section>
      <div class="card pe-form">
        <div class="field"><label for="peF">${t('Atı')}</label><input class="inp" id="peF" value="${esc(p.first)}" maxlength="24" placeholder="${t('Mısalı: Damir')}" autocomplete="given-name"></div>
        <div class="field"><label for="peL">${t('Familiyası')}</label><input class="inp" id="peL" value="${esc(p.last)}" maxlength="28" placeholder="${t('Mısalı: Qonarbaev')}" autocomplete="family-name"></div>
        <div class="field"><label for="peM">${t('Ákesiniń atı')}</label><input class="inp" id="peM" value="${esc(p.father)}" maxlength="28" placeholder="${t('Mısalı: Darmenbaevich')}"></div>
        <div class="field"><label for="peP">${t('Telefon nomeri')}</label><div class="ph-in"><span>+998</span><input class="inp num" id="peP" inputmode="tel" value="${esc(fmtPhone(p.phone))}" placeholder="(90) 123-45-67" autocomplete="tel-national"></div></div>
      </div>
      <button class="btn pri" id="peSave">${ic('check')}${t('Saqlaw')}</button>`,
    mount: el => {
      const ph = $('#peP'); ph.oninput = () => { ph.value = fmtPhone(ph.value); };
      $('#peFile').onchange = async e => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        if (!/^image\//.test(f.type)) return toast(t('Tek súwret faylın saylań'), { icon: 'circle-alert' });
        try { p.photo = await resizePhoto(f); $('#peAva').innerHTML = ava(); $('#peDel').classList.remove('hide'); }
        catch (er) { toast(t('Súwretti oqıw múmkin bolmadı'), { icon: 'circle-alert' }); }
      };
      $('#peDel').onclick = () => { p.photo = ''; $('#peAva').innerHTML = ava(); $('#peDel').classList.add('hide'); };
      $('#peSave').onclick = () => {
        p.first = $('#peF').value.trim(); p.last = $('#peL').value.trim(); p.father = $('#peM').value.trim();
        const d = ph.value.replace(/\D/g, '');
        if (d && d.length !== 9) return toast(t('Telefon nomerin tolıq kirgiziń'), { icon: 'circle-alert' });
        p.phone = d;
        if (!p.first) return toast(t('Atıńızdı kirgiziń'), { icon: 'circle-alert' });
        S.profile = p; S.name = displayName(); save(); Page.back(); renderView();
      };
    }
  });
}
function editName() { openProfileEdit(); }
/* wallets */
function kmLongPress(b) {
  let tm = null, x0 = 0, y0 = 0;
  const stop = () => { clearTimeout(tm); tm = null; b.classList.remove('lp'); };
  b.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; b._lp = false; b.classList.add('lp'); tm = setTimeout(() => { tm = null; b._lp = true; b.classList.remove('lp'); vib(18); sfx('open'); openWalletMenu(walletById(b.dataset.w)); }, 480); });
  b.addEventListener('pointermove', e => { if (tm && Math.hypot(e.clientX - x0, e.clientY - y0) > 10) stop(); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => b.addEventListener(ev, () => { if (tm) stop(); }));
  b.addEventListener('contextmenu', e => e.preventDefault());
}
function openWallets() {
  Sheet.open({
    title: t('Hamyanlar'),
    html: () => `<div class="card list">${S.wallets.map(w => `<button class="row" data-we="${w.id}"><span class="r-ic ${w.theme === 'ink' ? 'ink' : ''}">${ic(w.icon)}</span><span class="r-t"><div>${esc(t(w.name))}</div><small>${w.no ? esc(w.no) : t('Naq aqsha / basqa')}</small></span><span class="r-v num"><span>${walletShow(w.id)}</span></span></button>`).join('')}</div>
      <button class="btn pri" id="wAdd">${ic('plus')}${t('Jańa hamyan')}</button>
      ${isMax() ? '' : `<div class="demo-note">${ic('info')}${t('PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz')}</div>`}`,
    mount: el => { $$('[data-we]', el).forEach(b => b.onclick = () => openWalletMenu(walletById(b.dataset.we))); $('#wAdd').onclick = () => openWalletEdit(); }
  });
}
const KM_WICONS = ['banknote', 'credit-card', 'wallet', 'coins', 'landmark', 'smartphone', 'piggy-bank', 'briefcase', 'gem', 'gift', 'shopping-bag', 'plane'];
const KM_WCLR = ['', '#7B5CFA', '#FF8A1F', '#5B3EE6', '#22C55E', '#3B82F6', '#EF4444', '#EC4899', '#14B8A6', '#1C1C1C'];
const isCardW = w => w && (w.kind ? w.kind === 'card' : !(w.id === 'cash' || w.icon === 'banknote' || w.theme === 'paper'));
function kmWSpent(id) { const r = monthRange(new Date()); return S.tx.filter(x => x.type === 'expense' && x.wallet === id && x.date >= r.a && x.date <= r.b).reduce((a, x) => a + x.amount, 0); }
function kmWLimitCheck(id) {
  const w = walletById(id); if (!w || !w.limit) return;
  const sp = kmWSpent(id);
  if (sp > w.limit) setTimeout(() => toast(`${t(w.name)}: ${t('aylıq limitten asıp ketti')} (${short(sp)} / ${short(w.limit)})`, { icon: 'circle-alert' }), 600);
  else if (sp >= w.limit * .85) setTimeout(() => toast(`${t(w.name)}: ${t('limittiń')} ${Math.round(sp / w.limit * 100)}% ${t('jumsaldı')}`, { icon: 'gauge' }), 600);
}
async function kmWDelete(w) {
  if (S.wallets.length <= 1) { toast(t('Keminde bir balans qalıwı kerek'), { icon: 'circle-alert' }); return false; }
  if (!(await ask('Balanstı óshiriw', `«${t(w.name)}» hám ondaǵı barlıq operaciyalar óshiriledi. Bunı qaytarıp bolmaydı.`, 'Óshiriw', true))) return false;
  S.tx = S.tx.filter(x => x.wallet !== w.id && x.to !== w.id); S.wallets = S.wallets.filter(x => x.id !== w.id); if (S.homeWallet === w.id) S.homeWallet = 'all';
  save(); Sheet.close(); renderView(); toast(t('Balans óshirildi'), { icon: 'trash-2' }); return true;
}
function openWalletMenu(w) {
  if (!w) return;
  const bal = walletBal(w.id), sp = kmWSpent(w.id);
  const row = (id, icn, label, cls = '') => `<button class="wm-row ${cls}" id="${id}"><span class="wm-i">${ic(icn)}</span><span class="wm-l">${t(label)}</span>${ic('chevron-right')}</button>`;
  Sheet.open({
    head: `<h2 class="wm-h"><span class="wm-av ${w.color ? 'c-on' : 't-' + w.theme}" ${w.color ? `style="--wc:${w.color}"` : ''}>${ic(w.icon)}</span><span class="ell">${esc(t(w.name))}</span></h2>`,
    html: () => `<div class="wm-sum"><div><small>${t('Balans')}</small><b class="num ${bal < 0 ? 'neg' : ''}">${hideable(walletShow(w.id))} <i>${curLbl(wCur(w))}</i></b></div>
        ${w.limit ? `<div class="wm-lim"><small>${t('Bul ay limit')}</small><b class="num">${short(sp)} / ${short(w.limit)}</b><span class="wm-bar"><i style="width:${Math.min(100, sp / w.limit * 100)}%;${sp > w.limit ? 'background:#EF4444' : ''}"></i></span></div>` : ''}</div>
      <div class="wm-list">
        ${row('wmTr', 'arrow-right-left', 'Balanstan balansqa ótkeriw')}
        ${row('wmFx', 'repeat', 'Valyuta almastırıw (obmen)')}
        ${row('wmRep', 'chart-no-axes-column', 'Balans esabatların kóriw')}
        ${row('wmEd', 'square-pen', 'Balanstı redaktorlaw')}
        ${row('wmDel', 'trash-2', 'Balanstı óshiriw', 'danger')}
      </div>`,
    mount: el => {
      const tr = $('#wmTr', el); if (tr) tr.onclick = () => { const to = S.wallets.find(x => x.id !== w.id); if (!to) return toast(t('Ótkeriw ushın jáne bir balans kerek'), { icon: 'circle-alert' }); openTransfer(null, { wallet: w.id, to: to.id }); };
      const fx = $('#wmFx', el); if (fx) fx.onclick = () => openExchange(w);
      $('#wmRep', el).onclick = () => { Sheet.close(); setTimeout(() => openAllTx(false, w.id), 200); };
      $('#wmEd', el).onclick = () => openWalletEdit(w);
      $('#wmDel', el).onclick = () => kmWDelete(w);
    }
  });
}
function openWalletEdit(w = null) {
  const cb = w ? (wCur(w) === 'UZS' ? walletBal(w.id) : walletNative(w.id)) : 0;
  const st = w ? { ...w, kind: isCardW(w) ? 'card' : 'cash', cur: wCur(w), color: w.color || '', bal: cb, limOn: !!w.limit } : { name: '', icon: 'credit-card', theme: 'violet', kind: 'card', cur: 'UZS', initial: 0, no: '', color: '#7B5CFA', bal: 0, limit: 0, limOn: false };
  let icOpen = false;
  const sw = c => `<button class="wc-dot ${c ? '' : 'auto'} ${st.color === c ? 'on' : ''}" data-wc="${c}" ${c ? `style="--c:${c}"` : ''} aria-label="${c || 'auto'}">${ic('check')}</button>`;
  Sheet.open({
    head: `<h2>${t(w ? 'Balans' : 'Jańa balans')}</h2>${w ? `<button class="sh-close sh-del" id="weDel" aria-label="delete">${ic('trash-2')}</button>` : ''}`,
    html: () => `<div class="we">
      <div class="we-2"><div class="field"><label>${t('Atı')}</label><input class="inp" id="wN" value="${esc(st.name)}" placeholder="${t('Mısalı: Uzcard')}" maxlength="24"></div>
        <div class="field we-ic"><label>${t('Belgi')}</label><button class="inp we-icb" id="weIcB"><span class="we-icv">${ic(st.icon)}</span>${ic('chevron-down')}</button></div></div>
      <div class="we-icg ${icOpen ? 'show' : ''}" id="weIcG">${KM_WICONS.map(i => `<button class="${i === st.icon ? 'on' : ''}" data-wi="${i}">${ic(i)}</button>`).join('')}</div>
      <div class="field"><label>${t('Túri')}</label><div class="seg we-seg"><button data-wk="cash" class="${st.kind === 'cash' ? 'on' : ''}">${ic('banknote')}${t('Naqd pul')}</button><button data-wk="card" class="${st.kind === 'card' ? 'on' : ''}">${ic('credit-card')}${t('Plastik karta')}</button></div></div>
      <div class="field"><label>${t('Valyuta')}</label><div class="seg we-cur">${WCURS.map(c => `<button data-cu="${c}" class="${st.cur === c ? 'on' : ''}">${c}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Muǵdar')}</label><div class="we-amt"><input class="inp num" id="wB" inputmode="decimal" value="${st.bal ? (st.bal < 0 ? '-' : '') + fmtNat(st.bal, st.cur) : ''}" placeholder="0" autocomplete="off"><span id="wBc">${st.cur}</span></div></div>
      <div class="field we-no ${st.kind === 'card' ? '' : 'hide'}"><label>${t('Karta nomeriniń aqırı (májbúriy emes)')}</label><input class="inp num" id="wNo" value="${esc(st.no || '')}" placeholder="8600 •• 1234" maxlength="16"></div>
      <div class="field"><label>${t('Reńi')}</label><div class="we-clr">${KM_WCLR.map(sw).join('')}</div></div>
      <div class="we-lim">
        <div class="we-lh"><span class="we-li">${ic('gauge')}</span><span class="we-lt"><b>${t('Limit ornatıw')}</b><small>${t('Usı balanstan aylıq shıǵım shegarası')}</small></span><button class="switch we-sw ${st.limOn ? 'on' : ''}" id="weLimSw" role="switch" aria-label="limit"></button></div>
        <div class="we-amt we-lin ${st.limOn ? '' : 'hide'}"><input class="inp num money" id="wL" inputmode="numeric" value="${st.limit ? grp(st.limit) : ''}" placeholder="${t('Limit summasın kiritiń')}" autocomplete="off"><span>UZS</span></div>
      </div>
      <button class="btn pri" id="wOk">${ic('check')}${t('Saqlaw')}</button></div>`,
    mount: el => {
      bindMoney(el);
      const bi = $('#wB', el);
      bi.addEventListener('input', () => { const neg = /^\s*[-−]/.test(bi.value); const raw = bi.value.replace(/[^\d,.]/g, ''); const [ip, dp] = raw.split(/[,.]/); bi.value = (neg ? '-' : '') + (ip ? grp(+ip) : '') + (dp !== undefined && st.cur !== 'UZS' ? ',' + dp.slice(0, 2) : ''); });
      const bnum = () => { const neg = /^\s*[-−]/.test(bi.value); return (neg ? -1 : 1) * (parseFloat(bi.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0); };
      $$('[data-cu]', el).forEach(b => b.onclick = () => { st.cur = b.dataset.cu; $$('[data-cu]', el).forEach(x => x.classList.toggle('on', x === b)); $('#wBc', el).textContent = st.cur; });
      const keep = () => { st.name = $('#wN', el).value; st.no = $('#wNo', el).value; st.limit = parseMoney($('#wL', el).value); };
      $('#weIcB', el).onclick = () => { icOpen = !icOpen; $('#weIcG', el).classList.toggle('show', icOpen); };
      $$('[data-wi]', el).forEach(b => b.onclick = () => { st.icon = b.dataset.wi; $$('[data-wi]', el).forEach(x => x.classList.toggle('on', x === b)); $('.we-icv', el).innerHTML = ic(st.icon); refreshIcons(); icOpen = false; $('#weIcG', el).classList.remove('show'); });
      $$('[data-wk]', el).forEach(b => b.onclick = () => { st.kind = b.dataset.wk; $$('[data-wk]', el).forEach(x => x.classList.toggle('on', x === b)); $('.we-no', el).classList.toggle('hide', st.kind !== 'card'); if (st.kind === 'cash' && st.icon === 'credit-card') { st.icon = 'banknote'; $('.we-icv', el).innerHTML = ic('banknote'); refreshIcons(); } if (st.kind === 'card' && st.icon === 'banknote') { st.icon = 'credit-card'; $('.we-icv', el).innerHTML = ic('credit-card'); refreshIcons(); } });
      $$('[data-wc]', el).forEach(b => b.onclick = () => { st.color = b.dataset.wc; $$('[data-wc]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $('#weLimSw', el).onclick = e => { st.limOn = !st.limOn; e.currentTarget.classList.toggle('on', st.limOn); $('.we-lin', el).classList.toggle('hide', !st.limOn); if (st.limOn) setTimeout(() => $('#wL', el).focus(), 50); };
      $('#wOk', el).onclick = () => {
        keep(); const name = st.name.trim();
        if (!name) return toast(t('Atın kirgiziń'), { icon: 'circle-alert' });
        if (st.limOn && !st.limit) return toast(t('Limit summasın kiritiń'), { icon: 'circle-alert' });
        const nb = bnum();
        const rec = { id: w ? w.id : uid(), name, icon: st.icon, kind: st.kind, cur: st.cur, theme: st.color ? (st.kind === 'card' ? 'violet' : 'paper') : (w ? w.theme : (st.kind === 'card' ? 'violet' : 'paper')), color: st.color, no: st.kind === 'card' ? st.no.trim() : '', limit: st.limOn ? st.limit : 0, initial: 0 };
        if (w) S.wallets = S.wallets.map(x => x.id === w.id ? rec : x); else S.wallets.push(rec);
        if (w) { const n0 = st.cur === 'UZS' ? walletBal(rec.id) : walletNative(rec.id); rec.initial = Math.round((nb - n0) * 100) / 100; } else rec.initial = nb;
        save(); sfx('success'); Sheet.close(); renderView(); toast(t(w ? 'Balans saqlandı' : 'Balans qosıldı'));
      };
      const d = $('#weDel', el); if (d) d.onclick = () => kmWDelete(w);
    }
  });
}
/* categories */
function openCats0() {
  let type = 'expense';
  Sheet.open({
    title: t('Kategoriyalar'),
    html: () => `<div class="seg"><button data-ct="expense" class="${type === 'expense' ? 'on' : ''}">${t('Shıǵım')}</button><button data-ct="income" class="${type === 'income' ? 'on' : ''}">${t('Kirim')}</button></div>
      <div class="cat-grid">${S.cats.filter(c => c.type === type).map(c => `<button class="cat" data-ce="${c.id}"><span class="c-ic" style="--c:${catCol(c)}">${icE(c.icon)}</span><span>${esc(t(c.name))}</span></button>`).join('')}
        <button class="cat" id="cAdd"><span class="c-ic" style="background:var(--chip);color:var(--violet)">${ic('plus')}</span><span>${t('Qosıw')}</span></button></div>`,
    mount: el => {
      $$('[data-ct]', el).forEach(b => b.onclick = () => { type = b.dataset.ct; Sheet.refresh(); });
      $$('[data-ce]', el).forEach(b => b.onclick = () => openCatEdit(S.cats.find(c => c.id === b.dataset.ce)));
      $('#cAdd').onclick = () => openCatEdit(null, type);
    }
  });
}
function openCatEdit(c = null, type = 'expense') {
  const st = c ? { ...c, color: catCol(c) } : { name: '', icon: 'shopping-basket', color: PALETTE[0], type, ownColor: true };
  Sheet.open({
    title: c ? t('Kategoriyanı ózgertiw') : t('Jańa kategoriya'),
    html: () => `<div style="display:grid;place-items:center"><span class="c-ic" id="ceP" style="width:72px;height:72px;border-radius:24px;display:grid;place-items:center;color:#fff;background:${st.color}">${ic(st.icon)}</span></div>
      <div class="field"><label>${t('Atı')}</label><input class="inp" id="ceN" value="${esc(st.name)}" maxlength="22" placeholder="${t('Mısalı: Balalar')}"></div>
      <div class="field"><label>${t('Belgi')}</label><div class="chips">${CAT_ICONS.map(i => `<button class="chip ${i === st.icon ? 'on' : ''}" data-ci="${i}" aria-label="${i}">${ic(i)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Reń')}</label><div class="chips">${PALETTE.map(p => `<button class="chip sw-c" data-cc="${p}" style="--sw:${p};background:${p}!important;background-image:none!important;${p === st.color ? 'outline:3px solid var(--violet);outline-offset:2px' : ''}" aria-label="${p}"></button>`).join('')}</div></div>
      <button class="btn pri" id="ceOk">${t('Saqlaw')}</button>
      ${c ? `<button class="btn danger" id="ceDel">${ic('trash-2')}${t('Óshiriw')}</button>` : ''}`,
    mount: el => {
      $$('[data-ci]', el).forEach(b => b.onclick = () => { st.icon = b.dataset.ci; $$('[data-ci]', el).forEach(x => x.classList.toggle('on', x === b)); $('#ceP').innerHTML = ic(st.icon); refreshIcons(); });
      $$('[data-cc]', el).forEach(b => b.onclick = () => { st.color = b.dataset.cc; st.ownColor = true; $('#ceP').style.background = st.color; $$('[data-cc]', el).forEach(x => x.style.outline = x === b ? '3px solid var(--violet)' : ''); });
      $('#ceOk').onclick = () => {
        st.name = $('#ceN').value.trim(); if (!st.name) return toast(t('Atın kirgiziń'), { icon: 'circle-alert' });
        if (c) S.cats = S.cats.map(x => x.id === c.id ? st : x); else S.cats.push({ ...st, id: uid() });
        save(); Sheet.back(); Sheet.refresh(); renderView(); 
      };
      const d = $('#ceDel'); if (d) d.onclick = async () => {
        if (S.cats.filter(x => x.type === c.type).length <= 1) return toast(t('Keminde bir kategoriya qalıwı kerek'), { icon: 'circle-alert' });
        if (await ask('Kategoriyanı óshiriw', 'Bul kategoriyadaǵı operaciyalar «Basqa» ǵa ótedi.', 'Óshiriw', true)) {
          const fallback = c.type === 'income' ? 'other_in' : 'other';
          S.cats = S.cats.filter(x => x.id !== c.id);
          if (!S.cats.some(x => x.id === fallback)) S.cats.push(defaultCats().find(x => x.id === fallback));
          S.tx.forEach(x => { if (x.cat === c.id) x.cat = fallback; }); delete S.budget.cats[c.id];
          save(); Sheet.back(); Sheet.refresh(); renderView();
        }
      };
    }
  });
}
/* budget */
function openBudget() {
  Sheet.open({
    title: t('Byudjet hám limitler'),
    html: () => {
      const r = monthRange(); const spent = sum(inRange(r.a, r.b), 'expense'); const p = S.budget.total ? spent / S.budget.total * 100 : 0;
      return `<div class="card tile violet"><div class="t-h">${t('Bul ay jumsaldı')}</div><div class="t-v num">${grp(spent)} ${cur()}</div>
        <div class="bar"><i style="width:${clamp(p, 0, 100)}%"></i></div><div class="t-s">${S.budget.total ? `${Math.round(p)}% · ${t('limit')} ${grp(S.budget.total)} ${cur()}` : t('Limit ornatılmaǵan')}</div></div>
      ${isMax() ? `<button class="btn ink" id="bAi">${ic('wand-sparkles')}${t('Aqıllı byudjet: AI limitlerdi usınadı')}</button>` : ''}
      <div class="field"><label>${t('Aylıq ulıwma byudjet')} (${cur()})</label>${moneyInput('bT', S.budget.total)}</div>
      <div class="sec-h"><h3>${t('Kategoriya limitleri')}</h3></div>
      <div class="card list">${S.cats.filter(c => c.type === 'expense').map(c => { const s = catSpent(c.id), l = S.budget.cats[c.id] || 0; return `<div class="row" style="flex-wrap:wrap">
        <span class="r-ic" style="background:${c.color};color:#fff">${icE(c.icon)}</span><span class="r-t"><div>${esc(t(c.name))}</div><small class="num">${t('Jumsaldı')}: ${grp(s)}</small></span>
        <input class="inp num money" data-bl="${c.id}" inputmode="numeric" value="${l ? grp(l) : ''}" placeholder="${t('Limit')}" style="width:42%;height:44px">
        ${l ? `<div class="bar ${s > l ? 'over' : ''}" style="width:100%"><i style="width:${clamp(s / l * 100, 0, 100)}%"></i></div>` : ''}</div>`; }).join('')}</div>
      <button class="btn pri" id="bOk">${t('Saqlaw')}</button>`;
    },
    mount: el => {
      bindMoney(el);
      const ba = $('#bAi'); if (ba) ba.onclick = () => { const sb = smartBudget(); $('#bT').value = sb.total ? grp(sb.total) : ''; $$('[data-bl]', el).forEach(i => { const v = sb.cats[i.dataset.bl]; i.value = v ? grp(v) : ''; }); };
      $('#bOk').onclick = () => {
        S.budget.total = parseMoney($('#bT').value); S.budget.cats = {};
        $$('[data-bl]', el).forEach(i => { const v = parseMoney(i.value); if (v) S.budget.cats[i.dataset.bl] = v; });
        save(); Sheet.close(); renderView(); 
      };
    }
  });
}
/* goals */
function openGoals0() {
  Sheet.open({
    title: t('Jinaq maqsetleri'),
    html: () => `${S.goals.length ? S.goals.map(g => { const p = clamp(g.saved / g.target * 100, 0, 100); return `<div class="card tile" style="gap:10px">
        <div style="display:flex;align-items:center;gap:12px"><span class="chip-ic" style="width:44px;height:44px">${ic(g.icon)}</span>
          <div style="flex:1;min-width:0"><div style="font-weight:700" class="ell">${esc(t(g.name))}</div><small class="muted num">${grp(g.saved)} / ${grp(g.target)} ${cur()}</small></div>
          <b class="num" style="font-family:var(--f-display);font-size:1.2rem">${Math.round(p)}%</b></div>
        <div class="bar"><i style="width:${p}%"></i></div>
        <div class="row2"><button class="btn ghost sm" data-gdel="${g.id}" style="width:100%">${ic('trash-2')}${t('Óshiriw')}</button><button class="btn pri sm" data-gadd="${g.id}" style="width:100%">${ic('plus')}${t('Qosıw')}</button></div></div>`; }).join('')
      : `<div class="card empty"><span class="e-ic">${ic('target')}</span>${t('Ele maqset joq. Ármanıńız ushın jinawdı baslań!')}</div>`}
      <button class="btn ink" id="gNew">${ic('plus')}${t('Jańa maqset')}</button>`,
    mount: el => {
      $('#gNew').onclick = () => Sheet.open({
        title: t('Jańa maqset'),
        html: () => `<div class="field"><label>${t('Maqset atı')}</label><input class="inp" id="gN" placeholder="${t('Mısalı: Mashina')}" maxlength="26"></div>
          <div class="field"><label>${t('Kerekli summa')}</label><div class="km-amt"><input class="num money" id="gT" inputmode="numeric" placeholder="0" autocomplete="off"><span class="km-cur">UZS</span></div></div>
          <div class="field"><label>${t('Belgi')}</label><div class="chips">${['target', 'laptop', 'plane', 'car', 'house', 'graduation-cap', 'gift', 'smartphone', 'baby', 'heart'].map((i, k) => `<button class="chip ${k === 0 ? 'on' : ''}" data-gi="${i}">${ic(i)}</button>`).join('')}</div></div>
          <button class="btn pri" id="gOk">${t('Saqlaw')}</button>`,
        mount: e2 => {
          bindMoney(e2); let icon = 'target';
          $$('[data-gi]', e2).forEach(b => b.onclick = () => { icon = b.dataset.gi; $$('[data-gi]', e2).forEach(x => x.classList.toggle('on', x === b)); });
          $('#gOk').onclick = () => { const n = $('#gN').value.trim(), tg = parseMoney($('#gT').value); if (!n || !tg) return toast(t('Barlıq maydanlardı toltırıń'), { icon: 'circle-alert' }); S.goals.push({ id: uid(), name: n, target: tg, saved: 0, icon }); save(); Sheet.back(); Sheet.refresh(); renderView(); };
        }
      });
      $$('[data-gadd]', el).forEach(b => b.onclick = () => {
        const g = S.goals.find(x => x.id === b.dataset.gadd);
        Sheet.open({
          title: t('Maqsetke qosıw'),
          html: () => `<div class="field"><label>${t('Summa')}</label><div class="km-amt"><input class="num money" id="gA" inputmode="numeric" placeholder="0" autocomplete="off"><span class="km-cur">UZS</span></div></div>
            <div class="chips">${[50000, 100000, 500000, 1000000].map(v => `<button class="chip" data-gq="${v}">+${short(v)}</button>`).join('')}</div>
            <div class="field"><label>${t('Qaysı hamyannan alınadı')}</label><select class="inp" id="gW"><option value="">${t('Hamyannan almaw')}</option>${S.wallets.map(w => `<option value="${w.id}">${esc(t(w.name))} — ${grp(walletBal(w.id))}</option>`).join('')}</select></div>
            <button class="btn pri" id="gAOk">${t('Qosıw')}</button>`,
          mount: e3 => {
            bindMoney(e3); $$('[data-gq]', e3).forEach(q => q.onclick = () => $('#gA').value = grp(+q.dataset.gq));
            $('#gAOk').onclick = () => {
              const a = parseMoney($('#gA').value); if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
              const w = $('#gW').value; if (w) S.tx.push({ id: uid(), type: 'expense', amount: a, cat: 'other', wallet: w, date: today(), note: `${t('Jinaq')}: ${g.name}`, ts: Date.now() });
              const was = g.saved >= g.target; g.saved += a; save(); Sheet.back(); Sheet.refresh(); renderView();
              if (!was && g.saved >= g.target) { confetti(140); toast(t('Maqsetke jettińiz!'), { icon: 'party-popper', ms: 3500 }); }
            };
          }
        });
      });
      $$('[data-gdel]', el).forEach(b => b.onclick = async () => { if (await ask('Maqsetti óshiriw', 'Bul maqset óshiriledi.', 'Óshiriw', true)) { S.goals = S.goals.filter(x => x.id !== b.dataset.gdel); save(); Sheet.refresh(); renderView(); } });
    }
  });
}
/* debts */
function openDebts0() {
  let tab = 'given';
  Sheet.open({
    title: t('Qarız dápteri'),
    html: () => {
      const list = S.debts.filter(d => d.type === tab).sort((a, b) => a.paid - b.paid || a.due.localeCompare(b.due));
      const tot = list.filter(d => !d.paid).reduce((a, d) => a + d.amount, 0);
      return `<div class="seg"><button data-dt="given" class="${tab === 'given' ? 'on' : ''}">${t('Men berdim')}</button><button data-dt="taken" class="${tab === 'taken' ? 'on' : ''}">${t('Men aldım')}</button></div>
        <div class="card tile ${tab === 'given' ? 'violet' : 'ink'}"><div class="t-h">${t(tab === 'given' ? 'Maǵan qaytarılıwı kerek' : 'Men qaytarıwım kerek')}</div><div class="t-v num">${grp(tot)} ${cur()}</div></div>
        ${list.length ? `<div class="card list">${list.map(d => { const diff = Math.round((fromIso(d.due) - fromIso(today())) / 864e5); return `<div class="row" style="${d.paid ? 'opacity:.5' : ''}">
          <span class="avatar" style="width:40px;height:40px;font-size:.8rem;box-shadow:none">${esc(initials(d.name))}</span>
          <span class="r-t"><div>${esc(d.name)}</div><small>${d.paid ? t('Qaytarıldı') : `${d.due.split('-').reverse().join('.')} · ${diff < 0 ? t('múddeti ótti') : diff + ' ' + t('kún qaldı')}`}</small></span>
          <span style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><b class="num" style="font-size:.9rem">${grp(d.amount)}</b>
          ${d.paid ? `<button class="badge" data-ddel="${d.id}">${t('Óshiriw')}</button>` : `<button class="badge ink" data-dpay="${d.id}">${t('Qaytarıldı')}</button>`}</span></div>`; }).join('')}</div>`
        : `<div class="card empty"><span class="e-ic">${ic('hand-coins')}</span>${t('Bul bólimde qarız joq')}</div>`}
        <button class="btn pri" id="dNew">${ic('plus')}${t('Qarız qosıw')}</button>`;
    },
    mount: el => {
      $$('[data-dt]', el).forEach(b => b.onclick = () => { tab = b.dataset.dt; Sheet.refresh(); });
      $$('[data-dpay]', el).forEach(b => b.onclick = () => { const d = S.debts.find(x => x.id === b.dataset.dpay); d.paid = true; save(); Sheet.refresh(); renderView();  });
  $$('[data-ddel]', el).forEach(b => b.onclick = () => { S.debts = S.debts.filter(x => x.id !== b.dataset.ddel); save(); Sheet.refresh(); });
      $('#dNew').onclick = () => Sheet.open({
        title: t('Jańa qarız'),
        html: () => `<div class="seg"><button data-nt="given" class="${tab === 'given' ? 'on' : ''}">${t('Men berdim')}</button><button data-nt="taken" class="${tab === 'taken' ? 'on' : ''}">${t('Men aldım')}</button></div>
          <div class="field"><label>${t('Adam atı')}</label><input class="inp" id="dN" maxlength="24" placeholder="${t('Mısalı: Azamat')}"></div>
          <div class="field"><label>${t('Summa')} (${cur()})</label>${moneyInput('dA')}</div>
          <div class="field"><label>${t('Qaytarıw sánesi')}</label><input class="inp" type="date" id="dD" value="${iso(addDays(new Date(), 7))}"></div>
          <button class="btn pri" id="dOk">${t('Saqlaw')}</button>`,
        mount: e2 => {
          bindMoney(e2); let nt = tab;
          $$('[data-nt]', e2).forEach(b => b.onclick = () => { nt = b.dataset.nt; $$('[data-nt]', e2).forEach(x => x.classList.toggle('on', x === b)); });
          $('#dOk').onclick = () => { const n = $('#dN').value.trim(), a = parseMoney($('#dA').value); if (!n || !a) return toast(t('Barlıq maydanlardı toltırıń'), { icon: 'circle-alert' }); S.debts.push({ id: uid(), name: n, amount: a, type: nt, due: $('#dD').value || today(), paid: false }); tab = nt; save(); Sheet.back(); Sheet.refresh(); renderView(); };
        }
      });
    }
  });
}
/* recurring */
function payRecurring(id) {
  const p = S.recurring.find(x => x.id === id); if (!p) return;
  ask('Tólemdi belgilew', `«${p.name}» — ${grp(p.amount)} swm. Shıǵım retinde jazılsın ba?`, 'Tóledim').then(ok => {
    if (!ok) return; S.tx.push({ id: uid(), type: 'expense', amount: p.amount, cat: p.cat, wallet: S.wallets[0]?.id, date: today(), note: p.name, ts: Date.now() });
    p.paid = today().slice(0, 7); save(); Sheet.refresh(); renderView(); 
  });
}
function openRecurring() {
  const ym = today().slice(0, 7);
  Sheet.open({
    title: t('Turaqlı tólemler'),
    html: () => `${S.recurring.length ? `<div class="card list">${S.recurring.sort((a, b) => a.day - b.day).map(p => { const c = catById(p.cat); return `<div class="row">
      <span class="r-ic" style="background:${c.color};color:#fff">${icE(c.icon)}</span><span class="r-t"><div>${esc(t(p.name))}</div><small>${t('Hár ayda')} ${p.day}-${t('sáne')} · <span class="num">${grp(p.amount)}</span></small></span>
      ${p.paid === ym ? `<span class="badge">${ic('check')}${t('Tólendi')}</span>` : `<button class="badge ink" data-rp="${p.id}">${t('Tólew')}</button>`}
      <button class="sh-close" data-rd="${p.id}" style="width:32px;height:32px">${ic('x')}</button></div>`; }).join('')}</div>`
      : `<div class="card empty"><span class="e-ic">${ic('calendar-clock')}</span>${t('Turaqlı tólemler joq')}</div>`}
      <button class="btn pri" id="rNew">${ic('plus')}${t('Tólem qosıw')}</button>`,
    mount: el => {
      $$('[data-rp]', el).forEach(b => b.onclick = () => payRecurring(b.dataset.rp));
      $$('[data-rd]', el).forEach(b => b.onclick = () => { S.recurring = S.recurring.filter(x => x.id !== b.dataset.rd); save(); Sheet.refresh(); renderView(); });
      $('#rNew').onclick = () => Sheet.open({
        title: t('Jańa turaqlı tólem'),
        html: () => `<div class="field"><label>${t('Atı')}</label><input class="inp" id="rN" maxlength="24" placeholder="${t('Mısalı: Internet')}"></div>
          <div class="row2"><div class="field"><label>${t('Summa')}</label>${moneyInput('rA')}</div><div class="field"><label>${t('Ay kúni (1–28)')}</label><input class="inp num" id="rD" inputmode="numeric" value="10"></div></div>
          <div class="field"><label>${t('Kategoriya')}</label><select class="inp" id="rC">${S.cats.filter(c => c.type === 'expense').map(c => `<option value="${c.id}">${esc(t(c.name))}</option>`).join('')}</select></div>
          <button class="btn pri" id="rOk">${t('Saqlaw')}</button>`,
        mount: e2 => {
          bindMoney(e2);
          $('#rOk').onclick = () => { const n = $('#rN').value.trim(), a = parseMoney($('#rA').value), d = clamp(parseInt($('#rD').value) || 1, 1, 28); if (!n || !a) return toast(t('Barlıq maydanlardı toltırıń'), { icon: 'circle-alert' }); S.recurring.push({ id: uid(), name: n, amount: a, day: d, cat: $('#rC').value, paid: '' }); save(); Sheet.back(); Sheet.refresh(); renderView(); };
        }
      });
    }
  });
}
/* notifications */
function openNotifs() {
  const list = notifications();
  Sheet.open({
    title: t('Xabarlamalar'),
    onClose: () => { S.seen = [...new Set([...S.seen, ...list.map(n => n.id)])].slice(-200); save(); renderView(); },
    html: () => `<div class="card list">${list.map(n => `<div class="row"><span class="r-ic ${S.seen.includes(n.id) ? '' : 'ink'}">${ic(n.icon)}</span><span class="r-t"><div style="white-space:normal">${n.raw ? n.title : t(n.title)}</div><small style="white-space:normal">${n.text}</small></span></div>`).join('')}</div>`
  });
}
/* plans */
const PLAN_ROWS = [
  ['sparkles', 'AI kómekshi', 'Kúnine 30', 'Sheksiz'],
  ['wallet', 'Hamyanlar', '5 ke shekem', 'Sheksiz'],
  ['chart-pie', 'Statistika hám byudjet', true, true],
  ['layout-grid', 'Xızmetler hám kalkulyatorlar', true, true],
  ['briefcase-business', 'Biznes paneli hám hisob-fakturalar', false, true],
  ['file-chart-column', 'AI ay esabatı hám qarjı balı', false, true],
  ['trending-up', 'Ay aqırına prognoz', false, true],
  ['calendar-range', 'Tólem kalendarı', false, true],
  ['wand-sparkles', 'Aqıllı byudjet (AI limitler)', false, true],
  ['zap', 'Tez qosıw shablonları', false, true],
  ['sparkle', 'Aurora stili hám widgetler', false, true],
  ['badge-check', 'BUSINESS statusı', false, true]
];
function openPlans(pref) {
  let sel = pref || 'max';
  let wallet = S.planWallet && walletById(S.planWallet) ? S.planWallet : S.wallets.slice().sort((a, b) => walletBal(b.id) - walletBal(a.id))[0]?.id;
  const cell = v => v === true ? `<span class="pv ok">${ic('check')}</span>` : v === false ? `<span class="pv no">${ic('minus')}</span>` : `<span class="pv tx">${t(v)}</span>`;
  Page.open({
    title: t('Tarifler'), sub: isMax() ? 'MAX · BUSINESS' : 'PRO',
    html: () => {
      const P = PLANS[sel]; const isCur = plan() === sel; const w = walletById(wallet); const max = isMax();
      const btnTxt = isCur ? t('Házirgi tarifińiz') : sel === 'pro' ? t('PRO ǵa ótiw') : t('MAX satıp alıw');
      return `
      <div class="plan-tabs"><button data-pl="pro" class="${sel === 'pro' ? 'on' : ''}">${ic('zap')}PRO</button><button data-pl="max" class="${sel === 'max' ? 'on' : ''}">${ic('gem')}MAX</button></div>
      <div class="pay-card ${sel}">
        <span class="pc-ic">${ic(P.icon)}</span>
        <div class="pc-amt num">${grp(P.price)}<small> ${cur()}</small></div>
        <div class="pc-sub">${sel === 'pro' ? t('Hámme ushın baslanǵısh tarif') : t('Biznes hám tolıq qadaǵalaw ushın')}</div>
        <div class="pc-rows">
          <div class="pc-row"><span>${t('Tólew usılı')}</span>${w ? `<button class="pc-wallet-btn" id="pcWallet"><span class="pc-wdot t-${w.theme}"></span><span class="ell">${esc(t(w.name))}</span><b>${ic('chevron-right')}</b></button>` : '<span class="pc-val">—</span>'}</div>
          <div class="pc-row"><span>${t('Status')}</span><span class="status-chip sm ${sel === 'max' ? 'biz' : ''}">${sel === 'max' ? 'BUSINESS' : t('Paydalanıwshı')}</span></div>
          <div class="pc-row"><span>${t('Múddeti')}</span><span class="pc-val">${t('30 kún')}</span></div>
          ${isCur && sel === 'max' && S.planUntil ? `<div class="pc-row"><span>${t('Keyingi tólem')}</span><span class="pc-val num">${S.planUntil.split('-').reverse().join('.')}</span></div>` : ''}
          <div class="pc-row"><span>${t('Jámi tólem')}</span><span class="pc-val num">${grp(P.price)} ${cur()}</span></div>
        </div>
        <hr>
        <div class="pc-wallet"><div style="min-width:0"><small class="ell">${w ? esc(t(w.name)).toUpperCase() : ''}</small><b class="num ell">${w ? walletShow(w.id) : 0} ${curLbl(wCur(w))}</b></div><span class="mini-card t-${w ? w.theme : 'violet'}"><i></i></span></div>
        <hr>
        <label class="pc-check"><input type="checkbox" id="pcAuto" ${S.autoRenew ? 'checked' : ''}><span class="box">${ic('check')}</span><span><b>${t('Avto sheship alıw')}</b><small>${t('Hár 30 kúnde tarif hamyannan avtomat jańalanadı')}</small></span></label>
        <button class="pc-buy" id="pcBuy" ${isCur ? 'disabled' : ''}>${btnTxt}</button>
      </div>
      <div class="pc-foot">${t('Click, Payme yamasa karta arqalı')} · ${t('Demo tólem')}</div>
      ${max ? `<button class="btn danger" id="pcCancel">${ic('circle-x')}${t('MAX tarifin biykarlaw')}</button>` : ''}
      <div class="sec-h"><h3>${t('Salıstırıw')}</h3></div>
      <div class="card cmp">
        <div class="cmp-h"><span></span><b>PRO</b><b class="mx">MAX</b></div>
        ${PLAN_ROWS.map(([i, n, a, b]) => `<div class="cmp-r"><span class="cmp-n">${ic(i)}<span>${t(n)}</span></span>${cell(a)}${cell(b)}</div>`).join('')}
      </div>`;
    },
    mount: el => {
      $$('[data-pl]', el).forEach(b => b.onclick = () => { sel = b.dataset.pl; Page.refresh(); });
      const wb = $('#pcWallet'); if (wb) wb.onclick = () => { const i = S.wallets.findIndex(x => x.id === wallet); wallet = S.wallets[(i + 1) % S.wallets.length].id; Page.refresh(); };
      $('#pcAuto').onchange = e => { S.autoRenew = e.target.checked; save(); };
      const cc = $('#pcCancel'); if (cc) cc.onclick = cancelMax;
      $('#pcBuy').onclick = async () => {
        const P = PLANS[sel];
        if (sel === 'pro') return cancelMax();
        if (!wallet) return toast(t('Aldın hamyan qosıń'), { icon: 'circle-alert' });
        if (walletBal(wallet) < P.price) return toast(t('Bul hamyanda qarjı jetkiliksiz. Basqa hamyandı saylań.'), { icon: 'circle-alert' });
        Sheet.open({
          title: t('Tastıyıqlaw'),
          html: () => `<div class="receipt"><span class="r-logo">${ic('gem')}</span><div class="r-amt num">${grp(P.price)}<span style="font-size:1.1rem;color:var(--muted);letter-spacing:0"> ${cur()}</span></div>
            <div class="muted">E-esap MAX · 30 ${t('kún')}</div><hr>
            <div class="kv"><span>${t('Hamyan')}</span><span>${walletName(wallet)}</span></div>
            <div class="kv"><span>${t('Avto sheship alıw')}</span><span>${S.autoRenew ? t('Qosılǵan') : t('Óshirilgen')}</span></div></div>
            <div class="slider" id="slider"><div class="s-fill"></div><div class="s-txt">${t('Tólew ushın súyreń')}</div><div class="knob">${ic('chevrons-right')}</div></div>
            <div class="demo-note">${ic('shield-check')}${t('Demo rejim: summa hamyannan shıǵım retinde jazıladı')}</div>`,
          mount: e2 => slideToConfirm($('#slider', e2), () => {
            S.tx.push({ id: uid(), type: 'expense', amount: P.price, cat: 'other', wallet, date: today(), note: 'E-esap MAX', ts: Date.now() });
            S.plan = 'max'; S.planUntil = iso(addDays(new Date(), 30)); S.planWallet = wallet; save();
            Sheet.replace({
              title: '', html: () => `<div class="success"><span class="ok-c">${ic('gem')}</span><h3>${t('MAX aktivlestirildi!')}</h3><span class="status-chip biz">${ic('briefcase-business')}BUSINESS</span><div class="muted" style="margin-top:4px">${t('Statusıńız BUSINESS ke ózgerdi')}</div></div>
                <button class="pc-buy" id="mxAur">${ic('sparkle')}${t('Aurora stilin qosıw')}</button><button class="btn ghost" id="mxDone">${t('Keyinirek')}</button>`,
              mount: () => { vib([20, 40, 20]); confetti(160); $('#mxAur').onclick = () => { S.style = 'glass'; save(); Sheet.close(); Page.closeAll(); renderAll(); }; $('#mxDone').onclick = () => { Sheet.close(); Page.refresh(); }; }
            });
            renderAll();
          })
        });
      };
    }
  });
}
async function cancelMax() {
  if (!isMax()) return;
  if (await ask('MAX tarifin biykarlaw', 'MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.', 'Tariften shıǵıw', true)) {
    S.plan = 'pro'; S.planUntil = null; S.autoRenew = false; save(); Page.closeAll(); renderAll();
  }
}
/* MAX: business panel */
function openBusiness() {
  if (!isMax()) return openPlans('max');
  Page.open({
    title: t('Biznes paneli'), sub: 'BUSINESS',
    right: `<button class="pg-btn" id="invNew" aria-label="add">${ic('plus')}</button>`,
    html: () => {
      const pend = S.invoices.filter(i => !i.paid), paid = S.invoices.filter(i => i.paid); const tot = a => a.reduce((s, i) => s + i.amount, 0);
      const r = monthRange(); const l = inRange(r.a, r.b); const profit = sum(l, 'income') - sum(l, 'expense');
      return `<section class="biz-hero"><small>${t('Bul ay sap payda')}</small><b class="num ell">${money(profit, true)}</b><span>${t('kirim − shıǵım')}</span></section>
      <div class="duo-mini"><div class="dm"><small>${t('Kútilip atır')}</small><b class="num ell">${short(tot(pend))}</b></div><div class="dm in"><small>${t('Tólengen')}</small><b class="num ell">${short(tot(paid))}</b></div><div class="dm"><small>${t('Klientler')}</small><b class="num">${new Set(S.invoices.map(i => i.client)).size}</b></div></div>
      <div class="sec-h"><h3>${t('Hisob-fakturalar')}</h3></div>
      ${S.invoices.length ? `<div class="card list">${S.invoices.slice().sort((a, b) => a.paid - b.paid || a.due.localeCompare(b.due)).map(i => { const diff = Math.round((fromIso(i.due) - fromIso(today())) / 864e5); return `<div class="row" style="${i.paid ? 'opacity:.55' : ''}">
          <span class="r-ic ink">${ic('file-text')}</span><span class="r-t"><div>${esc(i.client)}</div><small>#${i.no} · ${i.paid ? t('Tólendi') : diff < 0 ? t('múddeti ótti') : i.due.split('-').reverse().join('.')}</small></span>
          <span class="inv-r"><b class="num">${grp(i.amount)}</b>${i.paid ? `<button class="badge" data-idel="${i.id}">${t('Óshiriw')}</button>` : `<button class="badge ink" data-ipay="${i.id}">${t('Tólendi')}</button>`}</span></div>`; }).join('')}</div>`
        : `<div class="card empty"><span class="e-ic">${ic('file-text')}</span>${t('Klientlerge hisob-faktura jazıń, tólengende ol avtomat kirimge túsedi.')}</div>`}`;
    },
    mount: el => {
      $$('[data-ipay]', el).forEach(b => b.onclick = () => {
        const i = S.invoices.find(x => x.id === b.dataset.ipay); i.paid = true;
        S.tx.push({ id: uid(), type: 'income', amount: i.amount, cat: S.cats.some(c => c.id === 'biz') ? 'biz' : 'other_in', wallet: i.wallet && walletById(i.wallet) ? i.wallet : S.wallets[0]?.id, date: today(), note: `${t('Hisob-faktura')} #${i.no} · ${i.client}`, ts: Date.now() });
        save(); renderView();
      });
      $$('[data-idel]', el).forEach(b => b.onclick = () => { S.invoices = S.invoices.filter(x => x.id !== b.dataset.idel); save(); renderView(); });
      $('#invNew').onclick = () => Sheet.open({
        title: t('Jańa hisob-faktura'),
        html: () => `<div class="field"><label>${t('Klient')}</label><input class="inp" id="ivC" maxlength="30" placeholder="${t('Mısalı: Aral Market')}"></div>
          <div class="row2"><div class="field"><label>${t('Summa')} (${cur()})</label>${moneyInput('ivA')}</div><div class="field"><label>${t('Tólew múddeti')}</label><input class="inp" type="date" id="ivD" value="${iso(addDays(new Date(), 7))}"></div></div>
          <div class="field"><label>${t('Qaysı hamyanǵa túsedi')}</label><select class="inp" id="ivW">${S.wallets.map(w => `<option value="${w.id}">${esc(t(w.name))}</option>`).join('')}</select></div>
          <button class="btn pri" id="ivOk">${t('Saqlaw')}</button>`,
        mount: e2 => {
          bindMoney(e2);
          $('#ivOk').onclick = () => { const c = $('#ivC').value.trim(), a = parseMoney($('#ivA').value); if (!c || !a) return toast(t('Barlıq maydanlardı toltırıń'), { icon: 'circle-alert' });
            S.invoices.push({ id: uid(), no: 1001 + S.invoices.length, client: c, amount: a, due: $('#ivD').value || today(), wallet: $('#ivW').value, paid: false }); save(); Sheet.close(); renderView(); };
        }
      });
    }
  });
}
/* MAX: AI report */
function healthScore() {
  const r = monthRange(); const l = inRange(r.a, r.b); const inc = sum(l, 'income'), exp = sum(l, 'expense');
  let s = 45; if (inc) s += clamp((inc - exp) / inc * 100, -40, 40) * .7; else s -= 10;
  if (S.budget.total) s += exp <= S.budget.total ? 15 : -10;
  s += Math.min(10, streak() * 2);
  if (S.goals.length) s += 10 * S.goals.reduce((a, g) => a + Math.min(1, g.saved / g.target), 0) / S.goals.length;
  return Math.round(clamp(s, 0, 100));
}
function openReport() {
  if (!isMax()) return openPlans('max');
  const r = monthRange(); const l = inRange(r.a, r.b); const inc = sum(l, 'income'), exp = sum(l, 'expense');
  const pr = monthRange(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)); const pl = inRange(pr.a, pr.b); const pinc = sum(pl, 'income'), pexp = sum(pl, 'expense');
  const sc = healthScore(); const lbl = sc >= 80 ? 'Ájayıp' : sc >= 60 ? 'Jaqsı' : sc >= 40 ? 'Ortasha' : 'Dıqqat kerek';
  const by = {}; l.filter(x => x.type === 'expense').forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount); const top = Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const fc = forecastMonth(); const pct = (a, b) => b ? Math.round((a - b) / b * 100) : 0; const sg = v => (v > 0 ? '+' : '') + v + '%';
  Page.open({
    title: t('AI ay esabatı'), sub: `${t(MONTHS[new Date().getMonth()])} ${new Date().getFullYear()}`,
    html: () => `<section class="rep-hero">
        <div class="rep-g">${gaugeSvg([{ v: sc / 100, cls: 'g-on' }, { v: 1 - sc / 100, cls: 'g-off' }])}<div class="rg-c"><b class="num">${sc}</b><small>/ 100</small></div></div>
        <div class="rep-t"><small>${t('Qarjı densawlıǵı balı')}</small><h3>${t(lbl)}</h3></div>
      </section>
      <div class="duo-mini"><div class="dm in"><small>${t('Kirim')}</small><b class="num ell">${short(inc)}</b><em>${sg(pct(inc, pinc))}</em></div><div class="dm"><small>${t('Shıǵım')}</small><b class="num ell">${short(exp)}</b><em>${sg(pct(exp, pexp))}</em></div><div class="dm"><small>${t('Prognoz')}</small><b class="num ell">${short(fc.proj)}</b><em>${fc.d}/${fc.n}</em></div></div>
      <div class="sec-h"><h3>${t('Eń kóp shıǵımlar')}</h3></div>
      <div class="card crows">${top.map(([c, v]) => { const ct = catById(c); return `<div class="crow"><span class="cr-h"><span class="ci sm" style="--c:${catCol(ct)}">${icE(ct.icon)}</span><b class="ell">${esc(t(ct.name))}</b><small class="num">${exp ? Math.round(v / exp * 100) : 0}%</small></span><span class="cr-bar"><i style="width:${exp ? v / exp * 100 : 0}%"></i></span><span class="cr-f num">${grp(v)} ${cur()}</span></div>`; }).join('') || `<div class="muted">${t('Maǵlıwmat joq')}</div>`}</div>
      <div class="sec-h"><h3>${t('AI keńesleri')}</h3></div>
      <div class="card advice">${esc(aiAnswer('keńes ber').text)}</div>`
  });
}
/* MAX: payment calendar */
function openCalendar() {
  if (!isMax()) return openPlans('max');
  let off = 0, sel = today();
  Page.open({
    title: t('Tólem kalendarı'),
    html: () => {
      const base = new Date(new Date().getFullYear(), new Date().getMonth() + off, 1); const y = base.getFullYear(), m = base.getMonth();
      const nd = new Date(y, m + 1, 0).getDate(); const first = (new Date(y, m, 1).getDay() + 6) % 7;
      const ev = {};
      const add = (d, e) => (ev[d] = ev[d] || []).push(e);
      S.recurring.forEach(p => add(iso(new Date(y, m, Math.min(p.day, nd))), { icon: 'repeat', name: t(p.name), amount: p.amount, kind: t('Turaqlı tólem'), done: p.paid === `${y}-${pad(m + 1)}` }));
      S.debts.filter(d => !d.paid).forEach(d => add(d.due, { icon: 'hand-coins', name: d.name, amount: d.amount, kind: t(d.type === 'given' ? 'Qarız qaytarıladı' : 'Qarızdı tólew') }));
      S.invoices.filter(i => !i.paid).forEach(i => add(i.due, { icon: 'file-text', name: i.client, amount: i.amount, kind: t('Hisob-faktura') }));
      if (S.plan === 'max' && S.planUntil) add(S.planUntil, { icon: 'gem', name: 'E-esap MAX', amount: PLANS.max.price, kind: t('Tarif jańalanıwı') });
      const txd = {}; S.tx.filter(x => x.type === 'expense' && x.date.startsWith(`${y}-${pad(m + 1)}`)).forEach(x => txd[x.date] = (txd[x.date] || 0) + x.amount);
      const evs = ev[sel] || []; const dayTx = S.tx.filter(x => x.date === sel);
      return `<div class="cal-head"><button class="circ" id="calP">${ic('chevron-left')}</button><b>${t(MONTHS[m])} ${y}</b><button class="circ" id="calN">${ic('chevron-right')}</button></div>
        <div class="card cal">${['Dú', 'Si', 'Sá', 'Pi', 'Ju', 'Sh', 'Ek'].map(w => `<span class="wd">${t(w)}</span>`).join('')}${'<span></span>'.repeat(first)}
          ${[...Array(nd)].map((_, i) => { const d = iso(new Date(y, m, i + 1)); const e = ev[d]; return `<button class="cd ${d === sel ? 'sel' : ''} ${d === today() ? 'td' : ''} ${e ? 'ev' : txd[d] ? 'hastx' : d < today() ? 'no' : ''}" data-cd="${d}">${i + 1}${e ? `<i>${e.length}</i>` : ''}</button>`; }).join('')}</div>
        <div class="legend"><span><i class="legend-dot" style="background:var(--violet)"></i>${t('Tólem bar')}</span><span><i class="legend-dot" style="background:var(--lav-2)"></i>${t('Shıǵım bolǵan')}</span><span><i class="legend-dot hatch"></i>${t('Bos')}</span></div>
        <div class="sec-h"><h3>${dayLabel(sel)}</h3></div>
        ${evs.length ? `<div class="card list">${evs.map(e => `<div class="row"><span class="r-ic ${e.done ? '' : 'ink'}">${ic(e.icon)}</span><span class="r-t"><div>${esc(e.name)}</div><small>${e.kind}${e.done ? ' · ' + t('Tólendi') : ''}</small></span><span class="r-v num"><span>${grp(e.amount)}</span></span></div>`).join('')}</div>` : ''}
        ${dayTx.length ? txGroups(dayTx) : evs.length ? '' : `<div class="card empty">${t('Bul kúni tólem joq')}</div>`}`;
    },
    mount: el => {
      $('#calP').onclick = () => { off--; Page.refresh(); }; $('#calN').onclick = () => { off++; Page.refresh(); };
      $$('[data-cd]', el).forEach(b => b.onclick = () => { sel = b.dataset.cd; Page.refresh(); });
      bindTx(el);
    }
  });
}
function smartBudget() {
  const now = new Date(); const res = {}; let total = 0;
  for (let k = 1; k <= 2; k++) { const r = monthRange(new Date(now.getFullYear(), now.getMonth() - k, 1)); inRange(r.a, r.b).filter(x => x.type === 'expense').forEach(x => res[x.cat] = (res[x.cat] || 0) + x.amount / 2); }
  Object.keys(res).forEach(c => { res[c] = Math.round(res[c] * .9 / 10000) * 10000; total += res[c]; });
  return { cats: res, total };
}
/* ads */
function adStatus(id) {
  const a = hubLoad().applications.find(x => x.id === id); const st = a ? a.status : 'review';
  return st === 'approved' ? `<span class="badge">${ic('check')}${t('Qabıl etildi')}</span>` : st === 'rejected' ? `<span class="badge bad">${t('Biykar etildi')}</span>` : `<span class="badge ink">${t('Kórip shıǵılmaqta')}</span>`;
}
function openAds() {
  const st = { kind: 'Baner', dur: '1 ay' };
  Sheet.open({
    title: t('Reklama ushın arza'), full: true,
    html: () => `<div class="card tile ink" style="gap:8px"><span class="chip-ic">${ic('megaphone')}</span><div style="font-weight:700">${t('Biznesińizdi E-esap paydalanıwshılarına kórsetiń')}</div>
        <div class="t-s" style="white-space:normal">${t('Arzanı jiberiń, biz siz benen 24 saat ishinde baylanısamız.')}</div></div>
      <div class="field"><label>${t('Kompaniya yamasa brend atı')}</label><input class="inp" id="adN" maxlength="40"></div>
      <div class="row2"><div class="field"><label>${t('Baylanıs adamı')}</label><input class="inp" id="adP" maxlength="30"></div>
        <div class="field"><label>${t('Telefon')}</label><input class="inp num" id="adT" inputmode="tel" placeholder="+998" maxlength="17"></div></div>
      <div class="field"><label>${t('Reklama túri')}</label><div class="chips">${['Baner', 'Push-xabarlama', 'AI usınısı', 'Xızmetler bóliminde'].map(k => `<button class="chip ${k === st.kind ? 'on' : ''}" data-ak="${k}">${t(k)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Múddeti')}</label><div class="seg">${['1 hápte', '1 ay', '3 ay'].map(k => `<button data-ad="${k}" class="${k === st.dur ? 'on' : ''}">${t(k)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Byudjet')} (${cur()})</label>${moneyInput('adB', '', '1 000 000')}</div>
      <div class="field"><label>${t('Reklama haqqında')}</label><textarea class="inp" id="adX" maxlength="400" placeholder="${t('Ónim yamasa xızmetińiz haqqında qısqasha')}"></textarea></div>
      <button class="btn pri" id="adOk">${ic('send')}${t('Arza jiberiw')}</button>
      ${S.ads.length ? `<div class="sec-h"><h3>${t('Meniń arzalarım')}</h3></div><div class="card list">${S.ads.slice().reverse().map(a => `<div class="row"><span class="r-ic">${ic('file-text')}</span><span class="r-t"><div>${esc(a.name)}</div><small>${t(a.kind)} · ${t(a.dur)} · ${a.date.split('-').reverse().join('.')}</small></span>${adStatus(a.id)}</div>`).join('')}</div>` : ''}`,
    mount: el => {
      bindMoney(el);
      $$('[data-ak]', el).forEach(b => b.onclick = () => { st.kind = b.dataset.ak; $$('[data-ak]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $$('[data-ad]', el).forEach(b => b.onclick = () => { st.dur = b.dataset.ad; $$('[data-ad]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $('#adOk').onclick = () => {
        const n = $('#adN').value.trim(), p = $('#adP').value.trim(), tel = $('#adT').value.replace(/[^\d+]/g, '');
        if (!n || !p) return toast(t('Kompaniya hám baylanıs adamın kirgiziń'), { icon: 'circle-alert' });
        if (tel.replace(/\D/g, '').length < 9) return toast(t('Telefon nomerin tolıq kirgiziń'), { icon: 'circle-alert' });
        const ad = { id: uid(), name: n, person: p, tel, kind: st.kind, dur: st.dur, budget: parseMoney($('#adB').value), text: $('#adX').value.trim(), date: today(), status: 'review' };
        S.ads.push(ad); const hb = hubLoad(); hb.applications.push({ ...ad, from: displayName(), fromPhone: (S.profile || {}).phone || '' }); hubSave(hb);
        save(); Sheet.replace(successStep('Arza qabıl etildi', t('Arza nomeri') + ': #' + (1000 + S.ads.length))); renderView();
      };
    }
  });
}
/* data */
function download(name, text, type) {
  try { const b = new Blob([text], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); } catch (e) {}
}
function copyText(txt, el) {
  const ok = () => toast(t('Nusqalandı'), { icon: 'copy' });
  try { navigator.clipboard.writeText(txt).then(ok, () => { el && el.select(); toast(t('Tekstti belgilep, nusqalań'), { icon: 'info' }); }); } catch (e) { el && el.select(); }
}
function toCSV() {
  const rows = [['Sáne', 'Túri', 'Kategoriya', 'Hamyan', 'Muǵdar', 'Eskertpe'].map(t)];
  [...S.tx].sort((a, b) => a.date.localeCompare(b.date)).forEach(x => rows.push([x.date, t(x.type === 'income' ? 'Kirim' : x.type === 'expense' ? 'Shıǵım' : 'Awdarma'), x.type === 'transfer' ? '' : t(catById(x.cat).name), walletName(x.wallet) + (x.to ? ' → ' + walletName(x.to) : ''), x.amount, x.note || '']));
  return '﻿' + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
}
/* ===== Shiyrayli Excel (.xlsx) esabatı — kitapxanasız ===== */
function kmZip(files) {
  const enc = new TextEncoder(); const crcT = kmZip.t || (kmZip.t = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })());
  const crc = b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const parts = [], cen = []; let off = 0;
  const u16 = v => [v & 255, (v >>> 8) & 255], u32 = v => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  for (const [name, text] of files) {
    const nb = enc.encode(name), db = enc.encode(text), c = crc(db);
    const lh = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(c), ...u32(db.length), ...u32(db.length), ...u16(nb.length), ...u16(0)]);
    parts.push(lh, nb, db);
    cen.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(c), ...u32(db.length), ...u32(db.length), ...u16(nb.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(off)]), nb);
    off += lh.length + nb.length + db.length;
  }
  const cs = cen.reduce((a, b) => a + b.length, 0);
  const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(cs), ...u32(off), ...u16(0)]);
  return new Blob([...parts, ...cen, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
function exportXLSX() {
  const X = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const col = i => String.fromCharCode(65 + i);
  const list = [...S.tx].sort((a, b) => b.date.localeCompare(a.date) || (b.ts || 0) - (a.ts || 0));
  const inc = sum(list, 'income'), exp = sum(list, 'expense');
  const rows = []; let r = 0;
  const cell = (c, v, st, num) => num ? `<c r="${col(c)}${r}" s="${st}"><v>${v}</v></c>` : `<c r="${col(c)}${r}" s="${st}" t="inlineStr"><is><t xml:space="preserve">${X(v)}</t></is></c>`;
  const row = (cells, ht) => { r++; rows.push(`<row r="${r}"${ht ? ` ht="${ht}" customHeight="1"` : ''}>${cells.map(f => f()).join('')}</row>`); };
  row([() => cell(0, t('E-esap — operaciyalar esabatı'), 2)], 30);
  row([() => cell(0, `${t('Jaratılǵan sáne')}: ${today().split('-').reverse().join('.')} · ${list.length} ${t('operaciya')}`, 9)], 18);
  row([], 8);
  row([() => cell(0, t('Jámi kirim'), 7), () => cell(1, '', 7), () => cell(2, inc, 10, 1)], 22);
  row([() => cell(0, t('Jámi shıǵım'), 7), () => cell(1, '', 7), () => cell(2, -exp, 11, 1)], 22);
  row([() => cell(0, t('Qaldıq'), 12), () => cell(1, '', 12), () => cell(2, inc - exp, 13, 1)], 24);
  row([], 10);
  const hr = r + 1;
  row([t('№'), t('Sáne'), t('Túri'), t('Kategoriya'), t('Hamyan'), t('Izoh'), t('Summa (UZS)')].map((h, i) => () => cell(i, h, 1)), 26);
  list.forEach((x, i) => { const z = i % 2 ? 1 : 0; const ty = x.type === 'income' ? t('Kirim') : x.type === 'expense' ? t('Shıǵım') : t('Awdarma');
    const amt = x.type === 'income' ? x.amount : x.type === 'expense' ? -x.amount : x.amount;
    row([() => cell(0, i + 1, z ? 15 : 14, 1), () => cell(1, x.date.split('-').reverse().join('.'), z ? 5 : 3), () => cell(2, ty, z ? 5 : 3), () => cell(3, x.type === 'transfer' ? '—' : t(catById(x.cat).name), z ? 5 : 3),
      () => cell(4, walletName(x.wallet) + (x.to ? ' → ' + walletName(x.to) : ''), z ? 5 : 3), () => cell(5, x.note || '', z ? 5 : 3),
      () => cell(6, amt, x.type === 'income' ? (z ? 17 : 16) : (z ? 6 : 4), 1)], 20); });
  const last = r;
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheetPr><tabColor rgb="FF7B5CFA"/></sheetPr>
<sheetViews><sheetView workbookViewId="0" showGridLines="0"><pane ySplit="${hr}" topLeftCell="A${hr + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
<cols><col min="1" max="1" width="7" customWidth="1"/><col min="2" max="2" width="13" customWidth="1"/><col min="3" max="3" width="12" customWidth="1"/><col min="4" max="4" width="24" customWidth="1"/><col min="5" max="5" width="20" customWidth="1"/><col min="6" max="6" width="34" customWidth="1"/><col min="7" max="7" width="18" customWidth="1"/></cols>
<sheetData>${rows.join('')}</sheetData>
${list.length ? `<autoFilter ref="A${hr}:G${last}"/>` : ''}
<mergeCells count="5"><mergeCell ref="A1:G1"/><mergeCell ref="A2:G2"/><mergeCell ref="A4:B4"/><mergeCell ref="A5:B5"/><mergeCell ref="A6:B6"/></mergeCells>
<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;
  const V = 'FF7B5CFA', VD = 'FF2B1B78', L = 'FFF4F1FF', B = 'FFDCD5F7';
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="2"><numFmt numFmtId="164" formatCode="#,##0;[Red]\-#,##0"/><numFmt numFmtId="165" formatCode="+#,##0;-#,##0;0"/></numFmts>
<fonts count="7"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="18"/><color rgb="${VD}"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><color rgb="FF1C1C1C"/><name val="Calibri"/></font><font><sz val="10"/><color rgb="FF8A8798"/><name val="Calibri"/></font><font><b/><sz val="12"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF5B3EE6"/><name val="Calibri"/></font></fonts>
<fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="${V}"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="${L}"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="${VD}"/></patternFill></fill></fills>
<borders count="2"><border/><border><left style="thin"><color rgb="${B}"/></left><right style="thin"><color rgb="${B}"/></right><top style="thin"><color rgb="${B}"/></top><bottom style="thin"><color rgb="${B}"/></bottom></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="18">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="164" fontId="3" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="164" fontId="3" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1"/>
<xf numFmtId="165" fontId="6" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="164" fontId="3" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="0" fontId="5" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="164" fontId="5" fillId="4" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="165" fontId="6" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
<xf numFmtId="165" fontId="6" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  const files = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${X(t('Esabat'))}" sheetId="1" r:id="rId1"/></sheets>${list.length ? `<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">'${X(t('Esabat'))}'!$A$${hr}:$G$${last}</definedName></definedNames>` : ''}</workbook>`],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ['xl/styles.xml', styles], ['xl/worksheets/sheet1.xml', sheet]];
  const blob = kmZip(files);
  try { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `e-esap-${today()}.xlsx`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800); } catch (e) {}
  toast(t('Excel esabatı júklendi'), { icon: 'file-spreadsheet' });
  return blob;
}
function openData() {
  Sheet.open({
    title: t('Maǵlıwmatlar'),
    html: () => `<div class="card list">
      <button class="row" id="dtCsv"><span class="r-ic">${ic('file-spreadsheet')}</span><span class="r-t"><div>${t('Excel esabatı (.xlsx)')}</div><small>${S.tx.length} ${t('operaciya')}</small></span>${ic('download')}</button>
      <button class="row" id="dtBak"><span class="r-ic">${ic('database-backup')}</span><span class="r-t"><div>${t('Rezerv nusqa (JSON)')}</div><small>${t('Barlıq maǵlıwmattı saqlaw yamasa tiklew')}</small></span>${ic('chevron-right')}</button>
      <button class="row" id="dtDemo"><span class="r-ic">${ic('eraser')}</span><span class="r-t"><div>${t('Operaciyalardı tazalaw')}</div><small>${t('Sazlawlar saqlanadı, jazıwlar óshiriledi')}</small></span>${ic('chevron-right')}</button>
      <button class="row" id="dtReset"><span class="r-ic" style="background:rgba(229,72,77,.12);color:var(--bad)">${ic('trash-2')}</span><span class="r-t"><div style="color:var(--bad)">${t('Hámmesin baslanǵısh halına qaytarıw')}</div><small>${t('Demo maǵlıwmatlar menen qayta baslaw')}</small></span></button>
    </div>`,
    mount: () => {
      $('#dtCsv').onclick = () => { exportXLSX(); return;
        const csv = toCSV(); download(`e-esap-${today()}.csv`, csv, 'text/csv;charset=utf-8');
        Sheet.open({ title: 'CSV', html: () => `<textarea class="inp" id="csvT" style="min-height:220px;font-size:.75rem" readonly>${esc(csv)}</textarea><button class="btn pri" id="csvC">${ic('copy')}${t('Nusqalaw')}</button>`, mount: () => $('#csvC').onclick = () => copyText(csv, $('#csvT')) });
      };
      $('#dtBak').onclick = () => {
        const json = JSON.stringify(S);
        Sheet.open({
          title: t('Rezerv nusqa'),
          html: () => `<div class="field"><label>${t('Saqlaw: tómendegi tekstti nusqalap, qáwipsiz jerde saqlań')}</label><textarea class="inp" id="bkT" style="min-height:120px;font-size:.72rem" readonly>${esc(json)}</textarea></div>
            <div class="row2"><button class="btn ghost" id="bkC">${ic('copy')}${t('Nusqalaw')}</button><button class="btn ghost" id="bkD">${ic('download')}${t('Fayl')}</button></div>
            <div class="field"><label>${t('Tiklew: saqlanǵan tekstti bul jerge qoyıń')}</label><textarea class="inp" id="bkI" style="min-height:100px;font-size:.72rem" placeholder="{ ... }"></textarea></div>
            <button class="btn pri" id="bkR">${ic('rotate-ccw')}${t('Tiklew')}</button>`,
          mount: () => {
            $('#bkC').onclick = () => copyText(json, $('#bkT'));
            $('#bkD').onclick = () => download(`e-esap-backup-${today()}.json`, json, 'application/json');
            $('#bkR').onclick = () => {
              try { const d = JSON.parse($('#bkI').value); if (!d || !Array.isArray(d.tx) || !Array.isArray(d.wallets)) throw 0; S = Object.assign(defaults(false), d); save(); Sheet.close(); renderAll(); toast(t('Maǵlıwmatlar tiklendi')); }
              catch (e) { toast(t('Qáte format. JSON tekstti tekseriń'), { icon: 'circle-alert' }); }
            };
          }
        });
      };
      $('#dtDemo').onclick = async () => {
        if (await ask('Operaciyalardı tazalaw', 'Barlıq kirim-shıǵım jazıwları, maqset hám qarızlar óshiriledi. Hamyan balansları 0 ge túsedi.', 'Tazalaw', true)) {
          S.tx = []; S.goals = []; S.debts = []; S.recurring = []; S.payHist = []; S.wallets.forEach(w => w.initial = 0); S.seen = []; save(); Sheet.close(); renderView(); toast(t('Tazalandı'), { icon: 'eraser' });
        }
      };
      $('#dtReset').onclick = async () => {
        if (await ask('Baslanǵısh halına qaytarıw', 'Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.', 'Qaytarıw', true)) { store.clear(); S = defaults(false); save(); Sheet.close(); renderAll(); runIntro(); }
      };
    }
  });
}
function openHelp() {
  const qa = [
    ['AI kómekshi qalay isleydi?', 'AI tuymesin basıń hám ápiwayı tilde jazıń: «taksi 25 mıń», «aylıq 6 mln keldi», «keshe bazarǵa 180 000». AI muǵdardı, kategoriyanı hám túrin ózi anıqlaydı. Sonday-aq «bul ay qansha jumsadım?» dep sorawıńız múmkin.'],
    ['Maǵlıwmatlarım qayerde saqlanadı?', 'Barlıq maǵlıwmatlar tek sizdiń qurılmańızda saqlanadı. Rezerv nusqa ushın Profil → Maǵlıwmatlar bólimin paydalanıń.'],
    ['Stil hám temanı qalay ózgertemen?', 'Profil → Programma stili bóliminde Classic yamasa Liquid Glass stilin, Jaqtı, Qarańǵı yamasa Avtomat temanı saylań.'],
    ['Úlkenler ushın rejim ne?', 'Bul rejimde jazıwlar úlkenirek, tuymeler anıǵıraq hám navigaciyada barlıq atamalar kórinedi.'],
    ['Xızmetler bólimindegi tólemler haqıyqıy ma?', 'Házirgi versiyada tólemler demo rejimde isleydi: pul alınbaydı, biraq tólem shıǵım retinde esapqa jazıladı.'],
    ['Kalkulyator tuymelerinde + hám − ne ushın?', 'Muǵdardı kirgiziwde esaplaw múmkin: mısalı 12000+8500 — nátiyje avtomat túrde esaplanadı.']
  ];
  Sheet.open({
    title: t('Járdem hám sorawlar'),
    html: () => `<div class="card list">${qa.map(([q, a]) => `<details class="row" style="display:block"><summary style="font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:10px">${t(q)}${ic('chevron-down')}</summary><p class="muted" style="margin:10px 0 2px;font-size:.88rem">${t(a)}</p></details>`).join('')}</div>`
  });
}
function openRate() {
  Sheet.open({
    title: t('Qosımshanı bahalaw'),
    html: () => `<p class="muted" style="margin:0;text-align:center">${t('E-esap sizge unadı ma?')}</p>
      <div style="display:flex;justify-content:center;gap:8px">${[1, 2, 3, 4, 5].map(i => `<button data-star="${i}" style="color:${i <= S.rated ? 'var(--violet)' : 'var(--line)'};font-size:2rem">${ic('star')}</button>`).join('')}</div>`,
    mount: el => $$('[data-star]', el).forEach(b => b.onclick = () => { S.rated = +b.dataset.star; save(); Sheet.close(); renderView(); if (S.rated === 5) confetti(80); })
  });
}
function openAbout() {
  Sheet.open({
    title: t('Qosımsha haqqında'),
    html: () => `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:6px 0">
        <svg viewBox="0 0 118 118" width="92" height="92"><defs><linearGradient id="ab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFCEA7"/><stop offset=".5" stop-color="#FF7605"/><stop offset="1" stop-color="#E66700"/></linearGradient></defs>
        <rect x="4" y="4" width="110" height="110" rx="34" fill="#FF7605"/><path d="M59 31a28 28 0 1 1-0.1 0M69 71l18 18" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div style="font-family:var(--f-display);font-weight:800;font-size:1.7rem;letter-spacing:-.03em">E-esap</div><span class="badge">${t('Versiya')} 3.0</span></div>
      <p style="margin:0;line-height:1.55;text-align:center">${t('E-esap — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.')}</p>
      <p class="ab-foot">© 2026 E-esap<br><span>${t('Jaratıwshı')} · ${t('Qonarbaev Damir')}</span></p>`
  });
}
/* PIN */
function pinPad(title, onDone) {
  let v = '';
  return {
    title: t(title),
    html: () => `<div class="pin-dots" id="pd">${'<i></i>'.repeat(4)}</div>
      <div class="keypad" style="grid-template-columns:repeat(3,1fr)">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(k => k ? `<button class="key" data-pk="${k}">${k === 'del' ? ic('delete') : k}</button>` : '<span></span>').join('')}</div>`,
    mount: el => $$('[data-pk]', el).forEach(b => b.onclick = () => {
      vib(5); const k = b.dataset.pk; if (k === 'del') v = v.slice(0, -1); else if (v.length < 4) v += k;
      $$('#pd i', el).forEach((d, i) => d.classList.toggle('f', i < v.length));
      if (v.length === 4) setTimeout(() => { const r = onDone(v); if (r === false) { const pd = $('#pd', el); pd.classList.remove('err'); void pd.offsetWidth; pd.classList.add('err'); v = ''; $$('#pd i', el).forEach(d => d.classList.remove('f')); vib(80); } }, 120);
    })
  };
}
function openPinSetup() {
  if (S.pin) {
    return ask('PIN-kod', 'PIN-kodtı óshiriwdi qáleysiz be?', 'Óshiriw', true).then(ok => { if (ok) { S.pin = null; save(); renderView();  } });
  }
  let first = null;
  Sheet.open(pinPad('Jańa PIN-kod', v => {
    if (!first) { first = v; Sheet.replace(pinPad('PIN-kodtı qaytalań', v2 => { if (v2 !== first) { toast(t('PIN-kodlar sáykes kelmedi'), { icon: 'circle-alert' }); return false; } S.pin = btoa(v2); save(); Sheet.close(); renderView();  })); }
  }));
}
function showLock(after) {
  if (!S.pin) { after && after(); return; }
  const lock = document.createElement('div'); lock.className = 'lock';
  let v = '';
  lock.innerHTML = `<div class="orb"></div><h2>E-esap</h2><p class="muted" style="margin:0">${t('PIN-kodtı kirgiziń')}</p><div class="pin-dots">${'<i></i>'.repeat(4)}</div>
    <div class="keypad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(k => k ? `<button class="key" data-lk="${k}">${k === 'del' ? ic('delete') : k}</button>` : '<span></span>').join('')}</div>
    <button class="link" id="lkForgot" style="margin-top:12px">${t('PIN-kodtı umıttım')}</button>`;
  document.body.appendChild(lock); refreshIcons();
  const dots = $('.pin-dots', lock);
  $$('[data-lk]', lock).forEach(b => b.onclick = () => {
    vib(5); const k = b.dataset.lk; if (k === 'del') v = v.slice(0, -1); else if (v.length < 4) v += k;
    $$('i', dots).forEach((d, i) => d.classList.toggle('f', i < v.length));
    if (v.length === 4) setTimeout(() => {
      if (btoa(v) === S.pin) { lock.style.transition = 'opacity .4s'; lock.style.opacity = 0; setTimeout(() => { lock.remove(); after && after(); }, 400); }
      else { dots.classList.remove('err'); void dots.offsetWidth; dots.classList.add('err'); v = ''; $$('i', dots).forEach(d => d.classList.remove('f')); vib(80); }
    }, 120);
  });
  $('#lkForgot', lock).onclick = () => { $('#lkForgot', lock).textContent = t('PIN-kodtı tiklew ushın: Profil → Maǵlıwmatlar → baslanǵısh halına qaytarıw. Házir ápiwayı jol: brauzer maǵlıwmatların tazalań.'); $('#lkForgot', lock).style.fontSize = '.75rem'; $('#lkForgot', lock).style.textAlign = 'center'; };
}

/* ================= AI ================= */
const KW = {
  income: ['oylik', 'oldim', 'avans', 'tushdi', 'keldi', 'ayliq', 'aylıq', 'zarplata', 'oklad', 'kirim', 'keldi', 'tústi', 'tusti', 'aldım', 'aldim', 'bonus', 'premiya', 'sıylıq', 'dáramat', 'daramat', 'tabıs', 'satdım', 'sattım', 'qaytardı', 'qaytardi', 'tapdım', 'tapqanım', 'dividend', 'kelip tústi'],
  cats: {
    food: ['nan', 'azıq', 'aziq', 'awqat', 'bazar', 'market', 'korzinka', 'makro', 'gósh', 'gosh', 'miywe', 'sút', 'sut', 'produkt', 'shay', 'qant', 'un ', 'kartoshka', 'magazin', 'dúkan', 'dukan', 'ovqat'],
    transport: ['taksi', 'taxi', 'avtobus', 'benzin', 'metan', 'propan', 'marshrut', 'yandex', 'mashina', 'transport', 'poezd', 'avia', 'bilet', 'jol haqı', 'remont mashina'],
    utility: ['kommunal', 'svet', 'elektr', 'gaz', 'suw', 'jılıw', 'jiliw', 'issiq', 'ıssı'],
    comm: ['telefon', 'internet', 'baylanıs', 'paynet', 'beeline', 'ucell', 'mobiuz', 'uzmobile', 'humans', 'tarif'],
    health: ['dári', 'dari', 'apteka', 'dárixana', 'emlewxana', 'shıpaker', 'doktor', 'vrach', 'tis', 'klinika', 'bolnica'],
    cloth: ['kiyim', 'kóylek', 'koylek', 'krossovka', 'shalbar', 'kurtka', 'ayaq kiyim', 'futbolka', 'kepka'],
    fun: ['kino', 'oyın', 'oyin', 'konsert', 'park', 'netflix', 'spotify', 'dem alıs', 'game', 'pubg', 'steam'],
    edu: ['kitap', 'kurs', 'oqıw', 'oqiw', 'kontrakt', 'repetitor', 'mektep', 'universitet', 'sabaq'],
    home: ['ijara', 'kvartira', 'úy ', 'remont', 'mebel', 'arenda'],
    cafe: ['kafe', 'restoran', 'kofe', 'coffee', 'fastfud', 'lavash', 'burger', 'pizza', 'shashlık', 'shashlik', 'túslik', 'tuslik', 'samsa', 'palaw'],
    gift: ['sawǵa', 'sawga', 'tuwılǵan kún', 'toy', 'gúl', 'gul '],
    salary: ['aylıq', 'ayliq', 'oylik', 'avans', 'zarplata', 'oklad'],
    bonus: ['bonus', 'premiya', 'sıylıq'],
    biz: ['satdım', 'sattım', 'biznes', 'klient', 'buyırtpa', 'buyirtpa', 'zakaz'],
    gift_in: ['sawǵa aldım', 'sawga aldim'],
    invest: ['dividend', 'investiciya', 'depozit', 'procent']
  }
};
function parseAmount(s) {
  s = s.replace(/(\d)[\s ](?=\d{3}\b)/g, '$1');
  s = s.replace(/\b\d{1,3}(?:[.,]\d{3})+(?![.,]?\d)/g, m => m.replace(/[.,]/g, ''));
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*(mlrd|milliard|mln|million|millon|mıń|miń|ming|min|myn|mng|k)?(?!\p{L})/iu);
  if (!m) return 0;
  let v = parseFloat(m[1].replace(',', '.')); const u = (m[2] || '').toLowerCase();
  if (/^ml(rd)|^milliard/.test(u)) v *= 1e9; else if (/^m(ln|illi)/.test(u)) v *= 1e6; else if (u) v *= 1e3;
  return Math.round(v);
}
function guessCat0(s, type) {
  const order = type === 'income' ? ['gift_in', 'salary', 'bonus', 'biz', 'invest'] : ['cafe', 'food', 'transport', 'utility', 'comm', 'health', 'cloth', 'fun', 'edu', 'home', 'gift'];
  for (const c of order) if (KW.cats[c].some(k => s.includes(k)) && S.cats.some(x => x.id === c)) return c;
  // custom categories by name
  const cust = S.cats.find(c => c.type === type && s.includes(toLat(c.name)));
  if (cust) return cust.id;
  return type === 'income' ? (S.cats.some(x => x.id === 'other_in') ? 'other_in' : S.cats.find(c => c.type === 'income')?.id) : (S.cats.some(x => x.id === 'other') ? 'other' : S.cats.find(c => c.type === 'expense')?.id);
}
function guessWallet(s) {
  for (const w of S.wallets) if (s.includes(toLat(w.name))) return w.id;
  if (/naq|nalichn|qolda/.test(s)) return S.wallets.find(w => w.id === 'cash')?.id || S.wallets[0]?.id;
  if (/karta|kartadan|kartaǵa/.test(s)) return S.wallets.find(w => w.theme !== 'paper')?.id || S.wallets[0]?.id;
  return S.homeWallet !== 'all' ? S.homeWallet : S.wallets[0]?.id;
}
function aiAnswer(raw) {
  const s = ' ' + toLat(raw) + ' ';
  const r = monthRange(); const list = inRange(r.a, r.b); const exp = sum(list, 'expense'), inc = sum(list, 'income');
  const by = {}; list.filter(x => x.type === 'expense').forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount);
  const top = Object.entries(by).sort((a, b) => b[1] - a[1]);
  const amt = parseAmount(s);
  const isQ = /\?|qansha|neshe|qayda|qayerge|qanday|keńes|kenes|maslahat|balans|byudjet|budjet|analiz|esabat|statistika|kórset|korset|únem|tejew|maqset|jinaq|qarız|qariz|limit/.test(s);
  if (/s[aá]lem|assalaw|hello|privet/.test(s) && !amt) return { text: t(`Sálem, ${S.name}! Men E-esap AI. Maǵan operaciyanı ápiwayı tilde jazıń yamasa qarjılarıńız haqqında soraw beriń.`) };
  if (/raxmet|rahmet|sag bol/.test(s)) return { text: t('Arzımaydı! Jáne ne járdem kerek?') };
  if (amt && !isQ) {
    const type = KW.income.some(k => s.includes(k)) ? 'income' : 'expense';
    const cat = guessCat(s, type); const wallet = guessWallet(s);
    const date = /keshe|kecha/.test(s) ? iso(addDays(new Date(), -1)) : /búrsigún|bursigun/.test(s) ? iso(addDays(new Date(), -2)) : today();
    if (!wallet) return { text: t('Aldın Profil → Hamyanlar bóliminde hamyan qosıń.') };
    const note = raw.trim().slice(0, 50);
    const rec = { id: uid(), type, amount: amt, cat, wallet, date, note, ts: Date.now() };
    S.tx.push(rec); save(); renderView(); sfx(rec.type === 'income' ? 'income' : 'expense'); if (rec.type === 'expense') kmWLimitCheck(rec.wallet);
    const c = catById(cat);
    return { text: '', tx: rec, extra: (() => { const lim = S.budget.cats?.[cat]; if (type === 'expense' && lim) { const sp = catSpent(cat); return sp > lim ? t(`Dıqqat: «${c.name}» limiti asıldı (${short(sp)} / ${short(lim)}).`) : t(`«${c.name}» limitinen ${short(lim - sp)} swm qaldı.`); } return ''; })() };
  }
  if (/balans|qansha pul|qaldı/.test(s)) return { text: t(`Ulıwma balansıńız: ${grp(totalBal())} swm.\n`) + S.wallets.map(w => `• ${t(w.name)}: ${walletShow(w.id)} ${curLbl(wCur(w))}`).join('\n') };
  if (/bugin/.test(s)) { const te = sum(inRange(today(), today()), 'expense'), ti = sum(inRange(today(), today()), 'income'); return { text: t(`Bugin: shıǵım ${grp(te)} swm, kirim ${grp(ti)} swm.`) }; }
  if (/h[aá]pte/.test(s)) { const a = iso(addDays(new Date(), -6)); const l = inRange(a, today()); return { text: t(`Sońǵı 7 kúnde: shıǵım ${grp(sum(l, 'expense'))} swm, kirim ${grp(sum(l, 'income'))} swm.`) }; }
  if (/byudjet|budjet|limit/.test(s)) { if (!S.budget.total) return { text: t('Byudjet ornatılmaǵan. Profil → Byudjet hám limitler bóliminde ornatıń.') }; const p = Math.round(exp / S.budget.total * 100); return { text: t(`Aylıq byudjettiń ${p}% ı jumsaldı (${grp(exp)} / ${grp(S.budget.total)} swm). ${exp < S.budget.total ? `Qalǵan ${grp(S.budget.total - exp)} swm.` : 'Byudjetten asıp kettińiz.'}`) }; }
  if (/maqset|jinaq/.test(s)) return { text: S.goals.length ? S.goals.map(g => `• ${t(g.name)}: ${Math.round(g.saved / g.target * 100)}% (${short(g.saved)} / ${short(g.target)})`).join('\n') : t('Ele jinaq maqsetińiz joq. Profil → Jinaq maqsetleri.') };
  if (/qarız|qariz/.test(s)) { const g = S.debts.filter(d => !d.paid && d.type === 'given').reduce((a, d) => a + d.amount, 0), tk = S.debts.filter(d => !d.paid && d.type === 'taken').reduce((a, d) => a + d.amount, 0); return { text: t(`Sizge qaytarılıwı kerek: ${grp(g)} swm.\nSiz qaytarıwıńız kerek: ${grp(tk)} swm.`) }; }
  if (/ke[ńn]es|maslahat|[uú]nem|tejew|qalay/.test(s)) {
    if (!top.length) return { text: t('Keńes beriw ushın aldın bir neshe operaciya qosıń.') };
    const tips = [];
    const share = Math.round(top[0][1] / exp * 100);
    tips.push(t(`1. Eń kóp shıǵım — «${catById(top[0][0]).name}» (${share}%). Onı 15% qısqartsańız, ayına ${short(top[0][1] * .15)} swm únemleysiz.`));
    if (inc) { const rate = Math.round((inc - exp) / inc * 100); tips.push(t(rate < 20 ? `2. Jinaq dárejeńiz ${rate}%. Kirimniń keminde 20% ın jinawǵa háreket etiń.` : `2. Ájayıp! Kirimińizdiń ${rate}% ın saqlap atırsız.`)); }
    const cafe = by.cafe || 0; if (cafe > 0) tips.push(t(`3. Kafege ${short(cafe)} swm jumsadıńız. Úyden túslik alıp shıǵıw jaqsı únem beredi.`));
    tips.push(t('4. 24 saat qaǵıydası: kútilmegen úlken satıp alıwdı bir kúnge keyinge qaldırıń.'));
    return { text: tips.join('\n\n') };
  }
  if (/kirim|tapt|dáramat|daramat|tapqan/.test(s)) return { text: t(`Bul ay kirim: ${grp(inc)} swm.`) };
  if (/e[ńn] k[oó]p|qayda|qayerge|kategoriya/.test(s) || /qansha|jumsad|shıǵ|shig|analiz|esabat|statistika/.test(s)) {
    if (!top.length) return { text: t('Bul ay ele shıǵım joq.') };
    return { text: t(`Bul ay jámi shıǵım: ${grp(exp)} swm.\nEń kóp jumsalǵan kategoriyalar:\n`) + top.slice(0, 3).map(([c, v], i) => `${i + 1}. ${t(catById(c).name)} — ${grp(v)} ${cur()} (${Math.round(v / exp * 100)}%)`).join('\n') };
  }
  return { text: t('Túsinbedim. Mısallar:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «keshe bazar 180 000 naq»\n• «bul ay qansha jumsadım?»\n• «keńes ber»') };
}
function aiLimitOk() {
  if (isMax()) return true;
  if (S.aiCount.d !== today()) S.aiCount = { d: today(), n: 0 };
  return S.aiCount.n < 30;
}
const orbHtml = (cls = '') => `<span class="orb2 ${cls}"><i></i><i></i>${ic('sparkles')}</span>`;
function openAI(prefill) {
  const msgHtml = m => {
    if (m.who === 'me') return `<div class="m-row me"><div class="msg me">${esc(m.text)}</div></div>`;
    let x = `<div class="m-row bot"><span class="m-ava">${ic('sparkles')}</span><div class="msg bot ${m.tx ? 'bare' : ''}">${m.tx ? (m.text ? `<div class="m-txt">${esc(m.text).replace(/\n/g, '<br>')}</div>` : '') : esc(m.text).replace(/\n/g, '<br>')}`;
    if (m.tx) {
      const tx = S.tx.find(z => z.id === m.tx.id);
      if (tx) {
        x += kmRcpt(tx);
      } else x += kmRcptOff(m.tx);
    }
    if (m.extra) x += `<div class="m-extra">${ic('info')}<span>${esc(m.extra)}</span></div>`;
    return x + '</div></div>';
  };
  const caps = [
    ['receipt', 'Operaciya jazıw', 'Taksi 25 mıń', 'v'], ['chart-pie', 'Analiz', 'Eń kóp qayda jumsadım?', 'k'],
    ['lightbulb', 'Keńes alıw', 'Keńes ber', 'l'], ['wallet', 'Balans', 'Balansım qansha?', 'w']
  ];
  const welcome = () => `<div class="welcome">${orbHtml('big')}<h3>${t('Sálem')}, <span>${esc(t(firstName()))}</span>!</h3><p class="muted">${t('Men E-esap AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.')}</p>
    <div class="cap-grid">${caps.map(([i, a, ex, cl]) => `<button class="cap ${cl}" data-sg="${ex}"><span class="ci2">${ic(i)}</span><span><b>${t(a)}</b><small>«${t(ex)}»</small></span></button>`).join('')}</div></div>`;
  const sugg = ['Taksi 25 mıń', 'Bazar 180 000 naq', 'Aylıq 6,5 mln keldi', 'Bul ay qansha jumsadım?', 'Byudjet jaǵdayı', 'Maqsetlerim'];
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const left = () => isMax() ? t('Sheksiz') : `${t('Búgin qaldı')}: ${30 - (S.aiCount.d === today() ? S.aiCount.n : 0)}`;
  Page.open({
    raw: true, noRefresh: true,
    head: `<div class="ai-top"><span id="aiOrb">${orbHtml()}</span><div class="ai-tt"><b><span>E-esap AI</span><i class="ai-on" title="Onlayn"></i></b><small><span class="live"></span><span id="aiLeft" class="ell">${t('Onlayn')}</span></small></div></div>`,
    right: `<span class="ai-hr"><button class="pg-btn" id="aiCal" aria-label="calendar">${ic('calendar-days')}</button><button class="pg-btn" id="aiClear" aria-label="clear">${ic('rotate-ccw')}</button></span>`,
    html: () => `<div class="chat" id="chat">${S.ai.length ? S.ai.map(msgHtml).join('') : welcome()}</div>
      <div class="ai-sugg">${sugg.map(s => `<button data-sg="${s}">${t(s)}</button>`).join('')}</div>
      <form class="ai-bar" id="aiF"><input id="aiI" placeholder="${t('Jazıń: taksi 25 mıń...')}" autocomplete="off">${SR ? `<button type="button" class="mic" id="aiMic" aria-label="mic">${ic('mic')}</button>` : ''}<button class="send" aria-label="send">${ic('arrow-up')}</button></form>`,
    mount: el => {
      const chat = $('#chat', el); const scroll = () => chat.scrollTop = chat.scrollHeight; scroll();
      const bindMsgs = () => {
        kmBindRcpt(chat, () => { chat.innerHTML = S.ai.map(msgHtml).join(''); refreshIcons(); bindMsgs(); });
        $$('.welcome [data-sg]', chat).forEach(b => b.onclick = () => send(t(b.dataset.sg)));
      };
      const send = txt => { sfx('send');
        txt = txt.trim(); if (!txt) return;
        if (!aiLimitOk()) { toast(t('Búgingi AI limiti tawsıldı. MAX ta — sheksiz.'), { icon: 'gem' }); return; }
        S.aiCount.n++; $('#aiLeft').textContent = `${t('Onlayn')}`;
        const w = $('.welcome', chat); if (w) w.remove();
        S.ai.push({ who: 'me', text: txt }); chat.insertAdjacentHTML('beforeend', msgHtml(S.ai[S.ai.length - 1])); $('#aiI').value = '';
        chat.insertAdjacentHTML('beforeend', `<div class="m-row bot" id="typing"><span class="m-ava">${ic('sparkles')}</span><div class="msg bot"><div class="typing"><i></i><i></i><i></i></div></div></div>`); scroll();
        $('#aiOrb').classList.add('thinking'); refreshIcons();
        setTimeout(() => {
          const a = aiAnswer(txt); const m = { who: 'bot', text: a.text, tx: a.tx ? { id: a.tx.id } : null, extra: a.extra || '' };
          S.ai.push(m); S.ai = S.ai.slice(-40); save();
          const ty = $('#typing'); ty && ty.remove(); chat.insertAdjacentHTML('beforeend', msgHtml(m)); refreshIcons(); bindMsgs(); scroll(); vib(8);
          const o = $('#aiOrb'); o && o.classList.remove('thinking');
        }, 700 + Math.random() * 450);
      };
      bindMsgs();
      $('#aiF').onsubmit = e => { e.preventDefault(); send($('#aiI').value); };
      $$('.ai-sugg [data-sg]', el).forEach(b => b.onclick = () => send(t(b.dataset.sg)));
      kmWordHints(el);
      $('#aiCal').onclick = () => kmDayCal();
      $('#aiClear').onclick = () => { S.ai = []; save(); chat.innerHTML = welcome(); refreshIcons(); bindMsgs(); };
      const mic = $('#aiMic');
      if (mic) mic.onclick = () => {
        try {
          const rec = new SR(); rec.lang = 'uz-UZ'; rec.interimResults = false; mic.classList.add('rec');
          rec.onresult = e => { $('#aiI').value = e.results[0][0].transcript; };
          rec.onerror = () => toast(t('Mikrofon islemedi. Tekst penen jazıń.'), { icon: 'mic-off' });
          rec.onend = () => mic.classList.remove('rec'); rec.start();
        } catch (e) { mic.classList.remove('rec'); toast(t('Mikrofon islemedi. Tekst penen jazıń.'), { icon: 'mic-off' }); }
      };
      if (prefill) setTimeout(() => send(t(prefill)), 450);
    }
  });
}

/* ================= confetti ================= */
function confetti(n = 100) {
  sfx('party');
  const cv = $('#confetti'); const ctx = cv.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.scale(dpr, dpr);
  const cols = ['#FF7605', '#FFB77C', '#1c1c1c', '#ffffff', '#FFCEA7'];
  const ps = [...Array(n)].map(() => ({ x: innerWidth / 2 + (Math.random() - .5) * 80, y: innerHeight * .45, vx: (Math.random() - .5) * 12, vy: -Math.random() * 13 - 4, r: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - .5) * .3 }));
  let f = 0;
  (function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); });
    if (++f < 110) requestAnimationFrame(loop); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}

/* ================= INTRO ================= */
let introRunning = false;
function runIntro(after) {
  // Jańa qısqa premium intro: suyıq shiyshe logotip + jaqtı nurı (~2 sek)
  if (introRunning) return; introRunning = true;
  const old = $('#intro'); const I = document.createElement('div'); I.id = 'intro'; I.className = 'ei'; I.setAttribute('role', 'presentation'); old.replaceWith(I);
  I.innerHTML = `<div class="ei-bg"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div><div class="ei-grain"></div>
    <div class="ei-c">
      <div class="ei-logo"><i class="ei-halo"></i><div class="ei-glass"><svg viewBox="0 0 118 118" fill="none"><path class="ei-e" d="M44 32v54M44 32h32M44 59h24M44 86h32" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><i class="ei-sweep"></i></div></div>
      <div class="ei-word" aria-label="E-esap">${'E-esap'.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</div>
      <div class="ei-tag">${t('Kirim-shıǵımıńız endi bir qolda')}</div>
    </div>
    <div class="ei-bar"><i></i></div>
    <button class="ei-skip" id="introSkip">${t('Ótkerip jiberiw')}</button>`;
  requestAnimationFrame(() => I.classList.add('on'));
  const finish = () => {
    if (!introRunning) return; introRunning = false;
    I.classList.add('out'); vib(10);
    setTimeout(() => { const v = $('.view.active'); if (v) { v.classList.remove('active'); void v.offsetWidth; v.classList.add('active'); } }, 200);
    setTimeout(() => { I.style.display = 'none'; after && after(); }, 650);
  };
  I.onclick = finish;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(finish, reduce ? 700 : 2100);
}

/* ================= HUB: data shared with the admin panel ================= */
const HUBKEY = 'pulcount_hub_v1';
function hubDefault() {
  return {
    v: 1,
    promos: [
      { id: 'demo-max', title: 'E-esap MAX', text: 'BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.', cta: 'Tolıǵıraq', action: 'plans', phone: '', link: '', color: '#FF7605', image: '', active: true, order: 1, created: today(), demo: true },
      { id: 'demo-slot', title: 'Reklama ornı', text: 'Bul jerde sizdiń biznesińiz turıwı múmkin. Arza qaldırıń — biz siz benen baylanısamız.', cta: 'Arza qaldırıw', action: 'apply', phone: '', link: '', color: '#1c1c1c', image: '', active: true, order: 2, created: today(), demo: true }
    ],
    stats: {}, applications: [], broadcasts: [], prices: { pro: 19900, max: 499000 }, rates: { USD: 12850, EUR: 13920, RUB: 132, KZT: 25.4 },
    admin: { user: 'admin', pass: 'admin123' }
  };
}
function hubLoad() {
  let h = null; try { h = JSON.parse(localStorage.getItem(HUBKEY)); } catch (e) {}
  if (!h) { h = hubDefault(); hubSave(h); }
  const d = hubDefault(); ['promos', 'applications', 'broadcasts'].forEach(k => { if (!Array.isArray(h[k])) h[k] = d[k]; });
  h.stats = h.stats || {}; h.prices = { ...d.prices, ...(h.prices || {}) }; h.rates = { ...d.rates, ...(h.rates || {}) };
  return h;
}
function hubSave(h) { try { localStorage.setItem(HUBKEY, JSON.stringify(h)); return true; } catch (e) { return false; } }
function applyHub() {
  const h = hubLoad();
  PLANS.pro.price = +h.prices.pro || PLANS.pro.price; PLANS.max.price = +h.prices.max || PLANS.max.price;
  Object.assign(RATES, h.rates);
}
function hubStat(id, field) { const h = hubLoad(); const s = h.stats[id] = h.stats[id] || { views: 0, clicks: 0, skips: 0 }; s[field] = (s[field] || 0) + 1; hubSave(h); }
function activePromos() {
  const td = today();
  return hubLoad().promos.filter(p => p.active && (!p.start || p.start <= td) && (!p.end || p.end >= td)).sort((a, b) => (a.order || 0) - (b.order || 0));
}
function promoArt(p, big) {
  return p.image ? `<img src="${p.image}" alt="">` : `<span class="pa-art ${big ? 'big' : ''}" style="background:${p.color || '#FF7605'}"><b>${esc((p.title || 'P').trim().slice(0, 1).toUpperCase())}</b></span>`;
}
function storiesRow() { return '';
  const list = activePromos(); const seen = S.seenPromos || [];
  return `<div class="stories hscroll" aria-label="Reklamalar">
    <button class="sto add" id="stoAdd"><span class="sto-ring"><span class="sto-in">${ic('plus')}</span></span><small>${t('Reklama beriw')}</small></button>
    ${list.map((p, i) => `<button class="sto ${seen.includes(p.id) ? 'seen' : ''}" data-sto="${i}"><span class="sto-ring"><span class="sto-in">${promoArt(p)}</span></span><small class="ell">${esc(t(p.title))}</small></button>`).join('')}
  </div>`;
}
function bindStories(root) {
  const a = $('#stoAdd', root); if (a) a.onclick = openAds;
  $$('[data-sto]', root).forEach(b => b.onclick = () => openStories(+b.dataset.sto));
}
let storyOpen = false;
function openStories(start = 0, onDone) {
  const list = activePromos(); if (!list.length || storyOpen) { onDone && onDone(); return; }
  storyOpen = true;
  const DUR = 15000, SKIP = 5000; let i = clamp(start, 0, list.length - 1), t0 = 0, pausedAt = 0, raf = 0, paused = false;
  const el = document.createElement('div'); el.className = 'story'; el.setAttribute('role', 'dialog'); document.body.appendChild(el);
  const close = () => { cancelAnimationFrame(raf); el.classList.add('out'); setTimeout(() => el.remove(), 300); storyOpen = false; renderView(); onDone && onDone(); };
  const elapsed = () => (paused ? pausedAt : performance.now()) - t0;
  const next = () => { i++; if (i >= list.length) close(); else render(); };
  const prev = () => { if (i > 0) { i--; render(); } };
  function render() {
    const p = list[i];
    S.seenPromos = [...new Set([...(S.seenPromos || []), p.id])]; save(); hubStat(p.id, 'views');
    el.innerHTML = `<div class="st-media">${p.image ? `<img src="${p.image}" alt="">` : `<div class="st-art" style="background:${p.color || '#FF7605'}"><b>${esc(t(p.title))}</b><i></i><i></i></div>`}</div>
      <div class="st-shade"></div>
      <div class="st-bars">${list.map((_, k) => `<i><b style="width:${k < i ? 100 : 0}%"></b></i>`).join('')}</div>
      <div class="st-top"><span class="st-ava">${promoArt(p)}</span><div class="st-who"><b class="ell">${esc(t(p.title))}</b><small>${t('Reklama')} · 15 s</small></div>
        <button class="st-skip" id="stSkip" disabled><span id="stCnt">5</span></button></div>
      <button class="st-tap l" id="stL" aria-label="prev"></button><button class="st-tap r" id="stR" aria-label="next"></button>
      <div class="st-bottom"><p>${esc(t(p.text || ''))}</p><button class="st-cta" id="stCta">${ic(p.action === 'plans' ? 'gem' : p.action === 'apply' ? 'megaphone' : 'phone')}${esc(t(p.cta || 'Baylanısıw'))}</button></div>`;
    refreshIcons(); t0 = performance.now(); paused = false;
    $('#stSkip', el).onclick = () => { if (elapsed() < SKIP) return; hubStat(p.id, 'skips'); next(); };
    $('#stR', el).onclick = () => { if (elapsed() >= SKIP) next(); };
    $('#stL', el).onclick = () => { if (elapsed() >= SKIP) prev(); };
    ['#stL', '#stR'].forEach(s => { const b = $(s, el); b.onpointerdown = () => { if (!paused) { paused = true; pausedAt = performance.now(); } }; b.onpointerup = b.onpointerleave = () => { if (paused) { t0 += performance.now() - pausedAt; paused = false; } }; });
    $('#stCta', el).onclick = () => {
      hubStat(p.id, 'clicks');
      if (p.action === 'plans') { close(); setTimeout(() => openPlans('max'), 320); return; }
      if (p.action === 'apply') { close(); setTimeout(openAds, 320); return; }
      paused = true; pausedAt = performance.now(); promoContact(p, el, () => { t0 += performance.now() - pausedAt; paused = false; });
    };
  }
  function loop() {
    const e = elapsed(); const bar = $$('.st-bars b', el)[i]; if (bar) bar.style.width = clamp(e / DUR * 100, 0, 100) + '%';
    const sk = $('#stSkip', el); if (sk) { if (e < SKIP) { sk.disabled = true; const c = $('#stCnt', el); if (c) c.textContent = Math.ceil((SKIP - e) / 1000); } else if (sk.disabled) { sk.disabled = false; sk.innerHTML = `${t('Ótkerip jiberiw')}${ic('chevron-right')}`; refreshIcons(); } }
    if (e >= DUR) next();
    if (storyOpen) raf = requestAnimationFrame(loop);
  }
  render(); requestAnimationFrame(() => el.classList.add('show')); raf = requestAnimationFrame(loop);
}
function promoContact(p, host, resume) {
  const box = document.createElement('div'); box.className = 'st-contact';
  box.innerHTML = `<div class="sc-card"><span class="sc-h">${t('Baylanıs')}</span><b>${esc(t(p.title))}</b>
    ${p.phone ? `<div class="sc-num num">${esc(p.phone)}</div><div class="sc-acts"><a class="btn pri" href="tel:${esc(p.phone.replace(/[^\d+]/g, ''))}">${ic('phone')}${t('Qońıraw etiw')}</a><button class="btn ghost" id="scCopy">${ic('copy')}${t('Nusqalaw')}</button></div>` : `<p class="muted">${t('Telefon nomeri kórsetilmegen')}</p>`}
    ${p.link ? `<a class="btn ink" href="${esc(p.link)}" target="_blank" rel="noopener">${ic('external-link')}${t('Saytqa ótiw')}</a>` : ''}
    <button class="btn ghost" id="scBack">${t('Reklamaǵa qaytıw')}</button></div>`;
  host.appendChild(box); refreshIcons();
  const cp = $('#scCopy', box); if (cp) cp.onclick = () => copyText(p.phone);
  $('#scBack', box).onclick = () => { box.remove(); resume(); };
}
function launchAds() { /* reklama óshirilgen */ }
window.addEventListener('storage', e => {
  if (e.key === KEY && e.newValue) { try { S = Object.assign(defaults(false), JSON.parse(e.newValue)); } catch (er) {} applyLook(); renderView(); }
  if (e.key === HUBKEY) { applyHub(); renderView(); }
});


/* =====================================================================
   E-esap — admin talapları (v4)
   ===================================================================== */
(function kmMigrate() {
  if (!S.km4) {
    S.km4 = true; S.mode = 'dark';
    S.wallets.forEach(w => { if (w.id === 'cash' && /naq/i.test(w.name)) { w.name = 'Naqd pul'; w.icon = 'banknote'; } if (w.id === 'uzcard' && w.name === 'Uzcard' && !S.tx.length) w.name = 'Plastik karta'; });
  }
  if (!Array.isArray(S.widgets)) S.widgets = ['month', 'pending', 'plan', 'recent', 'fx'];
  if (!Array.isArray(S.wHidden)) S.wHidden = [];
  S.widgets = S.widgets.filter(w => w !== 'wallets');
  if (!S.kmSwap1) { S.kmSwap1 = true; const a = S.widgets.indexOf('fx'), b = S.widgets.indexOf('recent'); if (a > -1 && b > -1 && a < b) { S.widgets[a] = 'recent'; S.widgets[b] = 'fx'; } }
  if (!S.learn) S.learn = {};
  if (!Array.isArray(S.cgroups)) S.cgroups = [];
  if (!S.km3c) { S.km3c = true; const ok = ['#FF7605', '#45403C', '#FFB77C', '#E66700', '#7F3F0A', '#1C1C1C', '#E66700', '#FFB376', '#FFC697', '#FF831D', '#544F4B', '#978F88'];
    S.cats.forEach((c, i) => { if (!ok.includes(String(c.color).toUpperCase()) && !ok.includes(c.color)) c.color = ok[i % ok.length]; });  }
  save();
})();
const KM_COL = ['#7B5CFA', '#FF8A1F', '#B8A6FF', '#FFB866', '#5B3EE6', '#FFD3A6', '#1C1C1C', '#D9CFFF', '#E86A12', '#9C85FF', '#8A8798', '#3A1FB8'];
const kmD = c => document.documentElement.dataset.mode === 'dark' ? ({ '#3A1FB8': '#9C85FF',  '#1C1C1C': '#F8F5F3', '#3C3834': '#D6D2CF', '#544F4B': '#A9A9B1', '#45403C': '#B4B4BC', '#7F3F0A': '#FFCEA7', '#978F88': '#EDE8E4' }[String(c).toUpperCase()] || c) : c;
const kmLight = c => ['#FFE5CF', '#FFC697', '#FFF2E8', '#FFB376', '#978F88', '#F8F5F3', '#D6D2CF', '#A9A9B1', '#B4B4BC', '#FFCEA7', '#EDE8E4'].includes(c);
const KM_WCOL = ['#7B5CFA', '#FF8A1F', '#B8A6FF', '#FFB866', '#5B3EE6', '#1C1C1C'];
const MON3 = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const hhmm = ts => { if (!ts) return ''; const d = new Date(ts); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
const debtLeft = d => Math.max(0, (d.amount || 0) - (d.paidAmt || 0));
const debtUZS = d => Math.round(debtLeft(d) * (RATES[d.cur || 'UZS'] || 1));

/* hamyan balansı: tólenbegen qarızlar da esapqa alınadı */
function walletBal(id) {
  let b = walletBal0(id);
  for (const d of S.debts) if (!d.paid && d.wallet === id) b += d.type === 'taken' ? debtUZS(d) : -debtUZS(d);
  return b;
}
/* AI úyreniwi: paydalanıwshı dúzetken kategoriyalar */
const kmKey = s => toLat(String(s || '')).replace(/[0-9.,]+/g, ' ').replace(/\b(mıń|min|ming|mln|million|swm|so'm|som|naq|karta|kartadan|keshe|bugin)\b/g, ' ').trim().split(/\s+/).filter(w => w.length > 2);
function guessCat(s, type) {
  for (const w of kmKey(s)) { const c = S.learn[type + ':' + w]; if (c && S.cats.some(x => x.id === c)) return c; }
  return guessCat0(s, type);
}
function kmLearn(tx) { kmKey(tx.note).slice(0, 3).forEach(w => S.learn[tx.type + ':' + w] = tx.cat); }

/* ---------- valyuta kursı (cbu.uz, kúnine bir ret) ---------- */
function kmFxApply() { if (!S.fx || !S.fx.r) return; Object.entries(S.fx.r).forEach(([c, v]) => { RATES[c] = v.r; FX_CHG[c] = v.d; }); }
function kmFxLoad(force) {
  kmFxApply();
  if (!force && S.fx && S.fx.day === today()) return;
  fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/').then(r => r.json()).then(list => {
    const r = {}; list.forEach(x => { if (['USD', 'EUR', 'RUB', 'KZT', 'CNY', 'GBP', 'TRY', 'KGS'].includes(x.Ccy)) r[x.Ccy] = { r: +x.Rate / (+x.Nominal || 1), d: +x.Diff || 0, n: x.CcyNm_UZ }; });
    if (r.USD) { S.fx = { day: today(), r, at: Date.now() }; save(); kmFxApply(); if (UI.tab === 'home') renderView(); }
  }).catch(() => {});
}
const FX_META = { USD: ['AQSH dolları', '#FF7605'], EUR: ['Evro', '#E66700'], RUB: ['Rossiya rublı', '#1C1C1C'], KZT: ['Qazaq teńgesi', '#E66700'], CNY: ['Qıtay yuanı', '#45403C'], GBP: ['Funt sterling', '#FF7605'], TRY: ['Túrk lirası', '#1C1C1C'], KGS: ['Qırǵız somı', '#1C1C1C'] };
const fxNum = v => v >= 100 ? grp(v) + ',' + String(Math.round(v * 100) % 100).padStart(2, '0') : String(Math.round(v * 100) / 100).replace('.', ',');
function fxRow(c) {
  const [nm, col] = FX_META[c] || [c, '#544F4B']; const d = FX_CHG[c] || 0;
  return `<button class="row fx-r" data-fx="${c}"><span class="fx-flag" style="background:${col}">${c.slice(0, 2)}</span>
    <span class="r-t"><div class="ell">${t(nm)}</div><small>${c} → UZS</small></span>
    <span class="fx-v"><b class="num">${fxNum(RATES[c] || 0)} UZS</b><small class="num ${d >= 0 ? 'up' : 'dn'}">${d >= 0 ? '▲' : '▼'} ${String(Math.abs(Math.round(d * 100) / 100)).replace('.', ',')}</small></span></button>`;
}
function openFxAll() {
  Page.open({
    title: t('Valyuta kursları'), sub: S.fx ? `${t('MB kursı')} · ${S.fx.day.split('-').reverse().join('.')}` : t('Demo kurs'),
    right: `<button class="pg-btn" id="fxRe" aria-label="refresh">${ic('refresh-cw')}</button>`,
    html: () => `<div class="card list">${Object.keys(FX_META).filter(c => RATES[c]).map(fxRow).join('')}</div>
      <button class="btn pri" id="fxConv">${ic('arrow-left-right')}${t('Valyuta konvertorı')}</button>`,
    mount: el => { $$('[data-fx]', el).forEach(b => b.onclick = () => openFx(b.dataset.fx)); $('#fxConv').onclick = () => openFx('USD'); $('#fxRe').onclick = () => { kmFxLoad(true); toast(t('Kurslar jańalanıp atır'), { icon: 'refresh-cw' }); setTimeout(() => Page.refresh(), 1500); }; }
  });
}
if (!RATES.CNY) { RATES.CNY = 1780; RATES.GBP = 16300; RATES.TRY = 375; RATES.KGS = 148; }

/* ---------- BAS BET ---------- */
const WIDGETS = {
  month: ['calendar-range', 'Usı ay'], pending: ['clock', 'Kútilip atırǵan esaplar'], plan: ['target', 'Maqset hám qarızlar'],
  fx: ['banknote', 'Valyuta kursları'], recent: ['receipt', 'Sońǵı esabatlar']
};
function kmCatChips(list, type) {
  const by = {}; list.filter(x => x.type === type).forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount);
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!rows.length) return `<span class="muted um-none">${t('Ele operaciya joq')}</span>`;
  return rows.map(([c, v]) => { const ct = catById(c); return `<span class="um-chip ${type === 'income' ? 'in' : 'out'}" title="${esc(t(ct.name))}">${icE(ct.icon)}<b class="num">${hideable(grp(v))}</b><i>uzs</i></span>`; }).join('');
}
function renderHome() {
  const el = $('#v-home'); const now = new Date(); const r = monthRange(); const wsel = S.homeWallet;
  const mlist = inRange(r.a, r.b).filter(x => wsel === 'all' || x.wallet === wsel);
  const inc = sum(mlist, 'income'), exp = sum(mlist, 'expense');
  const bal = wsel === 'all' ? totalBal() : walletBal(wsel);
  const prevR = monthRange(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const prevDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  const pEnd = iso(new Date(now.getFullYear(), now.getMonth() - 1, Math.min(now.getDate(), prevDays)));
  const plist = inRange(prevR.a, pEnd).filter(x => wsel === 'all' || x.wallet === wsel);
  const pInc = sum(plist, 'income'), pExp = sum(plist, 'expense');
  const pc = (a, b) => b ? Math.round((a - b) / b * 100) : (a ? 100 : 0);
  const dExp = pc(exp, pExp), dInc = pc(inc, pInc);
  const yIso = iso(addDays(now, -1)); const dl0 = S.tx.filter(x => x.type === 'expense' && (wsel === 'all' || x.wallet === wsel));
  const tdExp = dl0.filter(x => x.date === today()).reduce((a, x) => a + x.amount, 0), ydExp = dl0.filter(x => x.date === yIso).reduce((a, x) => a + x.amount, 0);
  const dDay = pc(tdExp, ydExp);
  const bud = S.budget.total || 0; const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); const daysLeft = dim - now.getDate() + 1;
  const perDay = Math.max(0, Math.floor(((bud || inc) - exp) / daysLeft)); const monthLeft = (bud || inc) - exp;
  const n = unread(); const ym = today().slice(0, 7);
  const recs = S.recurring.filter(p => p.paid !== ym);
  const dGiven = S.debts.filter(d => !d.paid && d.type === 'given'), dTaken = S.debts.filter(d => !d.paid && d.type === 'taken');
  const pendIn = dGiven.reduce((a, d) => a + debtUZS(d), 0), pendOut = recs.reduce((a, p) => a + p.amount, 0) + dTaken.reduce((a, d) => a + debtUZS(d), 0);
  const goal = S.goals[0];
  const W = {
    month: () => `<div class="sec-h"><h3>${t('Usı ay')}</h3><button class="link" id="hMonAll">${t('Barlıǵı')}${ic('chevron-right')}</button></div>
      <div class="um">
        <button class="card um-c in" data-st="income"><div class="um-row um-in"><div class="um-l"><div class="um-v num">${hideable(grp(inc))}<i>uzs</i></div><small>${t('kirim')}</small></div>
          <div class="um-r"><b class="num">${dInc > 0 ? '+' : ''}${dInc}%</b><small>${kmVsMonth((now.getMonth() + 11) % 12)}</small></div></div>
          <div class="um-chips">${kmCatChips(mlist, 'income')}</div></button>
        <button class="card um-c out" data-st="expense"><div class="um-row um-out"><div class="um-l"><div class="um-v num">${hideable(grp(exp))}<i>uzs</i></div><small>${t('shıǵım')}</small></div>
          <div class="um-r"><b class="num">${dExp > 0 ? '+' : ''}${dExp}%</b><small>${kmVsMonth((now.getMonth() + 11) % 12)}</small></div></div>
          <div class="um-chips">${kmCatChips(mlist, 'expense')}</div></button>
      </div>`,
    pending: () => `<div class="sec-h"><h3>${t('Kútilip atırǵan esaplar')}</h3></div>
      <div class="km-two pend">
        <button class="card pd in" id="hPendIn"><b class="num">${hideable(grp(pendIn))}</b><small><em>${t('kirim')}</em> ${t('kútilmekte...')}</small><span class="pd-bar"><i style="width:${pendIn + pendOut ? Math.round(pendIn / (pendIn + pendOut) * 100) : 0}%"></i><span>${dGiven.length} ${t('dana')}</span></span></button>
        <button class="card pd out" id="hPendOut"><b class="num">${hideable(grp(pendOut))}</b><small><em>${t('shıǵım')}</em> ${t('kútilmekte...')}</small><span class="pd-bar"><i style="width:${pendIn + pendOut ? Math.round(pendOut / (pendIn + pendOut) * 100) : 0}%"></i><span>${recs.length + dTaken.length} ${t('dana')}</span></span></button>
      </div>`,
    plan: () => { const mg = kmMainGoal(); const act = S.debts.filter(d => !d.paid);
      const give = act.filter(d => d.type === 'given').reduce((a, d) => a + debtUZS(d), 0), take = act.filter(d => d.type === 'taken').reduce((a, d) => a + debtUZS(d), 0); const net = give - take;
      const gp = mg ? clamp(mg.saved / mg.target * 100, 0, 100) : 0;
      return `<div class="hp3">
      <button class="hp3-c hp3-g" id="hGoal">
        <span class="hp3-tag">${ic('target')}${t('Maqset')}</span>
        ${mg ? `<div class="hp3-jar">${kmPig(mg, null, 'h')}</div>
          <b class="hp3-n ell">${esc(t(mg.name))}</b><span class="hp3-s num">${short(mg.saved)} / ${short(mg.target)}</span>
          <span class="hp3-bar"><i style="width:${gp}%"></i><em class="num">${Math.round(gp)}%</em></span>`
        : `<span class="hp3-e">${ic('plus')}<small>${t('Shiyshe kopilka ashıń')}</small></span>`}
      </button>
      <button class="hp3-c hp3-d" id="hDebt">
        <span class="hp3-tag">${ic('hand-coins')}${t('Qarızlar')}</span>
        <b class="hp3-n kw-h">${t('Kim qarızdar?')}</b>
        ${kmWho(true)}
      </button></div>`; },
    fx: () => `<div class="sec-h"><h3>${t('Valyuta kursları')} <span class="badge">3</span></h3><button class="link" id="hFxAll">${t('Barlıǵı')}${ic('arrow-up-right')}</button></div>
      <div class="card list">${['RUB', 'USD', 'EUR'].map(fxRow).join('')}</div>`,
    wallets: () => `<div class="sec-h"><h3>${t('Hamyanlarım')}</h3><button class="link" id="hWallets">${t('Basqarıw')}${ic('arrow-up-right')}</button></div>
      <div class="km-wl">${S.wallets.map(w => `<button class="card km-w ${S.homeWallet === w.id ? 'sel' : ''}" data-w="${w.id}"><span class="w-ic t-${w.theme}">${ic(w.icon)}</span><span style="min-width:0"><small class="ell">${esc(t(w.name))}</small><b class="num ell">${hideable(walletShow(w.id))} ${curLbl(wCur(w))}</b></span></button>`).join('')}
        <button class="card km-w add" id="hAddW">${ic('plus')}<small>${t('Hamyan qosıw')}</small></button></div>`,
    recent: () => { const l = [...S.tx].sort((a, b) => b.date.localeCompare(a.date) || (b.ts || 0) - (a.ts || 0)).slice(0, 6);
      return `<div class="sec-h"><h3>${t('Sońǵı esabatlar')}</h3>${l.length ? `<button class="link" id="hAll">${t('Barlıǵı')}${ic('arrow-up-right')}</button>` : ''}</div>
      ${l.length ? `<div class="card tx-list">${l.map(txRow).join('')}</div>` : `<div class="card empty"><span class="e-ic">${ic('receipt')}</span><span>${t('Ele esabatlar joq. Tómendegi + túymesin basıp birinshisin qosıń')}</span>
        <span class="empty-acts"><button class="btn ink sm" data-q="expense">${ic('minus')}${t('Shıǵım')}</button><button class="btn ghost sm" data-q="income">${ic('plus')}${t('Kirim')}</button></span></div>`}`; }
  };
  el.innerHTML = `
  <header class="topbar">
    <button class="ava-btn" id="hAvatar" aria-label="profile">${avatarHtml()}</button>
    <div class="who"><div class="name ell">${t('Sálem')}, ${esc(t(firstName()))}</div><div class="hello ell">${t('Bugin')} ${now.getDate()} ${t(MONTHS[now.getMonth()])}</div></div>
    <button class="icon-btn" id="hSearch" aria-label="search">${ic('search')}</button>
    <button class="icon-btn" id="hBell" aria-label="notifications">${ic('bell')}${n ? '<span class="dot"></span>' : ''}</button>
  </header>
  <section class="bal">
    <div class="bal-top">
      <button class="pill-sel" id="hWallet"><span class="ell">${wsel === 'all' ? t('Barlıq hamyanlar') : walletName(wsel)}</span>${ic('chevron-down')}</button>
      <button class="bal-eye" id="hEye" aria-label="hide">${ic(S.hideBal ? 'eye-off' : 'eye')}</button>
    </div>
    <div class="bal-label">${t('Ulıwma balans')}</div>
    ${(() => { const full = (bal < 0 ? '−' : '') + grp(bal), big = full.length > 13, txt = big ? (bal < 0 ? '−' : '') + short(Math.abs(bal)) : full; return `<div class="bal-amt num ${big ? 'sh' : ''}" style="--n:${Math.max(6, txt.length)}">${hideable(txt)}${big ? '' : '<small>,00</small>'}<em>${cur()}</em></div>`; })()}
    <div class="bal-meta"><span class="chip-delta ${dDay > 0 ? 'bad' : dDay < 0 ? 'good' : ''} num">${ic(dDay > 0 ? 'trending-down' : 'trending-up')}${dDay > 0 ? '−' : dDay < 0 ? '+' : ''}${Math.abs(dDay)}%</span><span class="ell">${t('shıǵım, keshegi kúnge salıstırǵanda')}</span></div>
    <div class="bal-acts">
      <button class="ba" data-q="income"><span>${t('Kirim')}</span><b>${ic('arrow-down-left')}</b></button>
      <button class="ba mid" data-q="transfer" aria-label="transfer">${ic('arrow-left-right')}</button>
      <button class="ba" data-q="expense"><b>${ic('arrow-up-right')}</b><span>${t('Shıǵım')}</span></button>
    </div>
  </section>
  <div class="km-wrow">
    <button class="wr-add" id="hWAdd" aria-label="add">${ic('plus')}</button>
    ${[...S.wallets].sort((a, b) => (b.id === S.homeWallet) - (a.id === S.homeWallet)).map(w => `<button class="wr-c t-${w.theme} ${w.color ? 'c-on' : ''} ${S.homeWallet === w.id ? 'sel' : ''}" data-w="${w.id}" ${w.color ? `style="--wc:${w.color}"` : ''}><span class="wr-n">${ic(w.icon)}<span class="ell">${esc(t(w.name))}</span></span><b class="num ell">${hideable(kmWCardAmt(w))}<i>${wCur(w) === 'UZS' ? 'uzs' : wCur(w)}</i></b></button>`).join('')}
  </div>
  ${S.widgets.filter(w => W[w] && !S.wHidden.includes(w)).map(w => W[w]()).join('')}
  <button class="km-wset" id="hWset">${ic('layers')}${t('Vidjet sazlamaları')}</button>`;
  const on = (s, f) => { const b = $(s, el); if (b) b.onclick = f; };
  on('#hAvatar', () => setTab('profile')); on('#hEye', () => { S.hideBal = !S.hideBal; save(); renderView(); });
  on('#hBell', openNotifs); on('#hSearch', () => openAllTx(true)); on('#hWallet', pickHomeWallet);
  $$('[data-q]', el).forEach(b => b.onclick = () => { const q = b.dataset.q; q === 'transfer' ? openTransfer() : openTx(q); });
  $$('[data-st]', el).forEach(b => b.onclick = () => { UI.stT = b.dataset.st; setTab('stats'); });
  on('#hPendIn', openDebts); on('#hPendOut', () => recs.length ? openRecurring() : openDebts());
  on('#hGoal', openGoals); on('#hDebt', openDebts); on('#hFxAll', openFxAll);
  $$('[data-fx]', el).forEach(b => b.onclick = () => openFx(b.dataset.fx));
  on('#hWallets', openWallets); on('#hAddW', () => openWalletEdit()); on('#hAll', () => openAllTx());
  $$('[data-w]', el).forEach(b => b.onclick = () => { if (b._lp) { b._lp = false; return; } S.homeWallet = S.homeWallet === b.dataset.w ? 'all' : b.dataset.w; save(); renderView(); window.scrollTo({ top: 0, behavior: 'smooth' }); const rw = $('.wr-c', $('#v-home'))?.parentElement; if (rw) rw.scrollTo({ left: 0, behavior: 'smooth' }); });
  $$('.wr-c[data-w]', el).forEach(kmLongPress);
  on('#hWset', openWidgets); on('#hWAdd', () => openWalletEdit()); on('#hMonAll', () => setTab('stats'));
  bindTx(el);
}

/* ---------- Vidjet sazlamaları ---------- */
function openWidgets() {
  Page.open({
    title: t('Vidjet sazlamaları'), sub: t('Tártibin ózgertiw ushın ≡ belgisin súyreń'),
    html: () => `<div class="card list wg-list" id="wgL">${S.widgets.map(w => { const off = S.wHidden.includes(w); return `<div class="row wg ${off ? 'off' : ''}" data-wg="${w}">
        <button class="wg-x ${off ? 'add' : ''}" data-wt="${w}" aria-label="toggle">${ic(off ? 'plus' : 'x')}</button>
        <span class="r-ic">${ic(WIDGETS[w][0])}</span><span class="r-t"><div class="ell">${t(WIDGETS[w][1])}</div></span>
        <span class="wg-h" aria-label="drag">${ic('grip-horizontal')}</span></div>`; }).join('')}</div>
      <button class="btn ghost" id="wgReset">${ic('rotate-ccw')}${t('Baslanǵısh tártip')}</button>`,
    mount: el => {
      $$('[data-wt]', el).forEach(b => b.onclick = () => { const w = b.dataset.wt; S.wHidden = S.wHidden.includes(w) ? S.wHidden.filter(x => x !== w) : [...S.wHidden, w]; save(); renderView(); });
      $('#wgReset').onclick = () => { S.widgets = ['month', 'pending', 'plan', 'recent', 'fx']; S.wHidden = []; save(); renderView(); };
      const L = $('#wgL', el);
      $$('.wg-h', el).forEach(h => h.addEventListener('pointerdown', e => {
        e.preventDefault(); const row = h.closest('.wg'); const y0 = e.clientY; let moved = 0; row.classList.add('drag');
        const mv = ev => {
          const dy = ev.clientY - y0 - moved; row.style.transform = `translateY(${dy}px)`;
          const H = row.offsetHeight;
          if (dy > H * .6 && row.nextElementSibling) { L.insertBefore(row.nextElementSibling, row); moved += H; row.style.transform = `translateY(${ev.clientY - y0 - moved}px)`; vib(6); }
          else if (dy < -H * .6 && row.previousElementSibling) { L.insertBefore(row.previousElementSibling, row.nextElementSibling); moved -= H; row.style.transform = `translateY(${ev.clientY - y0 - moved}px)`; vib(6); }
        };
        const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); row.classList.remove('drag'); row.style.transform = '';
          S.widgets = $$('.wg', L).map(r => r.dataset.wg); save(); renderView(); };
        window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      }));
    }
  });
}

/* ---------- STATISTIKA (Hisobchi kórinisi) ---------- */
function kmSmooth(p) {
  if (p.length < 2) return p.length ? `M${p[0][0]},${p[0][1]}` : '';
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
function kmLine(series, labels, opt = {}) {
  series = series.map(x => ({ ...x, c: kmD(x.c) }));
  const Wd = 330, Hd = 170, L = 6, Rt = 46, T = 10, B = 24; const w = Wd - L - Rt, h = Hd - T - B;
  const all = series.flatMap(s => s.v); let mx = Math.max(0, ...all), mn = Math.min(0, ...all);
  if (opt.sym) { const m = Math.max(Math.abs(mx), Math.abs(mn)) || 1; mx = m; mn = -m; }
  if (mx === mn) mx = mn + 1;
  const n = labels.length; const X = i => L + (n < 2 ? w / 2 : i * w / (n - 1)); const Y = v => T + (mx - v) / (mx - mn) * h;
  const ticks = [...Array(5)].map((_, i) => mn + (mx - mn) * i / 4);
  const step = Math.max(1, Math.ceil(n / 6));
  let svg = `<svg class="km-line" viewBox="0 0 ${Wd} ${Hd}" preserveAspectRatio="none"><defs>${series.map((s, k) => `<linearGradient id="lg${opt.id}${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.c}" stop-opacity=".45"/><stop offset="1" stop-color="${s.c}" stop-opacity="0"/></linearGradient>`).join('')}</defs>`;
  svg += ticks.map(v => `<line x1="${L}" x2="${L + w}" y1="${Y(v)}" y2="${Y(v)}" class="gl"/><text x="${Wd - 2}" y="${Y(v) + 3}" text-anchor="end" class="ax">${opt.sym ? short(Math.abs(v)).replace(' ', '') : (v < -1 ? '−' : '') + short(Math.abs(v)).replace(' ', '')}</text>`).join('');
  series.forEach((s, k) => {
    const pts = s.v.map((v, i) => [X(i), Y(v)]); const d = kmSmooth(pts); const y0 = Y(opt.sym ? 0 : Math.max(mn, 0));
    svg += `<path d="${d} L${X(n - 1)},${y0} L${X(0)},${y0} Z" fill="url(#lg${opt.id}${k})" ${opt.sym && s.neg ? `transform="scale(1,-1) translate(0,${-2 * y0})"` : ''} style="${opt.sym && s.neg ? 'display:none' : ''}"/>`;
    if (opt.sym && s.neg) svg += `<path d="${d} L${X(n - 1)},${y0} L${X(0)},${y0} Z" fill="${s.c}" fill-opacity=".22"/>`;
    svg += `<path d="${d}" fill="none" stroke="${s.c}" stroke-width="2.4" stroke-linecap="round" ${s.dash ? 'stroke-dasharray="6 5"' : ''}/>`;
    const lp = pts[pts.length - 1]; if (lp && !opt.sym) svg += `<circle cx="${lp[0]}" cy="${lp[1]}" r="3.6" fill="${s.c}" stroke="var(--card-solid)" stroke-width="2"/>`;
  });
  const li = new Set(n <= 6 ? [...Array(n).keys()] : [0, 1, 2, 3, 4].map(k => Math.round(k * (n - 1) / 4)));
  svg += labels.map((l, i) => li.has(i) ? `<text x="${clamp(X(i), 16, L + w - 14)}" y="${Hd - 6}" text-anchor="middle" class="ax">${l}</text>` : '').join('');
  return svg + '</svg>';
}
function kmIE(base, R) {
  const inc = sum(base, 'income'), exp = sum(base, 'expense'); const diff = inc - exp; const tot = inc + exp;
  // dáwirlerge bólemiz: hápte → kúnler, ay → háptelep, jıl → aylar
  const end = R.end; const buckets = [];
  if (UI.statPeriod === 'year') { for (let m = 0; m <= fromIso(end).getMonth(); m++) { const a = `${R.y}-${pad(m + 1)}-01`, b = `${R.y}-${pad(m + 1)}-${pad(new Date(R.y, m + 1, 0).getDate())}`; buckets.push([t(MON3[m]), a, b]); } }
  else if (UI.statPeriod === 'week') { for (let d = fromIso(R.a); iso(d) <= end; d = addDays(d, 1)) buckets.push([`${t(['Ek', 'Dú', 'Si', 'Sá', 'Pi', 'Ju', 'Sh'][d.getDay()])} ${d.getDate()}`, iso(d), iso(d)]); }
  else { const a0 = fromIso(R.a); const last = fromIso(end).getDate(); for (let s0 = 1; s0 <= last; s0 += 7) { const e0 = Math.min(s0 + 6, new Date(a0.getFullYear(), a0.getMonth() + 1, 0).getDate()); const lbl = `${s0}–${e0}`; buckets.push([lbl, iso(new Date(a0.getFullYear(), a0.getMonth(), s0)), iso(new Date(a0.getFullYear(), a0.getMonth(), e0))]); } }
  const rows = buckets.map(([l, a, b]) => { const l2 = base.filter(x => x.date >= a && x.date <= b); return [l, sum(l2, 'income'), sum(l2, 'expense')]; });
  const mx = Math.max(1, ...rows.flatMap(r => [r[1], r[2]]));
  const ip = tot ? Math.round(inc / tot * 100) : 50;
  return `<div class="ie2-top">
      <div class="ie2-c in"><span class="ie2-ic">${ic('arrow-down-left')}</span><div><small>${t('Kirim')}</small><b class="num">+${inc >= 1e6 ? short(inc) : grp(inc)}</b></div></div>
      <div class="ie2-c out"><span class="ie2-ic">${ic('arrow-up-right')}</span><div><small>${t('Shıǵım')}</small><b class="num">−${exp >= 1e6 ? short(exp) : grp(exp)}</b></div></div>
    </div>
    <div class="ie2-split"><i style="width:${ip}%"></i></div>
    <div class="ie2-res ${diff >= 0 ? 'ok' : 'bad'}">${ic(diff >= 0 ? 'trending-up' : 'trending-down')}<span>${diff >= 0 ? t('Únemlendi') : t('Kirimnen artıq jumsaldı')}</span><b class="num">${diff >= 0 ? '+' : '−'}${grp(Math.abs(diff))} uzs</b></div>
    <div class="ie2-list">${rows.map(([l, i, e]) => `<div class="ie2-r ${!i && !e ? 'nil' : ''}"><span class="ie2-l">${l}</span>
      ${!i && !e ? `<div class="ie2-none">${t('operaciya joq')}</div>` : `<div class="ie2-bars">${i ? `<div class="ie2-b in"><i style="width:${Math.max(3, i / mx * 100)}%"></i><b class="num">+${short(i)}</b></div>` : ''}${e ? `<div class="ie2-b out"><i style="width:${Math.max(3, e / mx * 100)}%"></i><b class="num">−${short(e)}</b></div>` : ''}</div>`}</div>`).join('')}</div>`;
}
function kmBars(inc, exp, labels) {
  const Wd = 330, Hd = 176, L = 4, Rt = 44, T = 8, B = 22; const w = Wd - L - Rt, h = Hd - T - B; const n = labels.length;
  const mx = Math.max(1, ...inc, ...exp); const mid = T + h / 2; const sc = v => v / mx * (h / 2 - 4);
  const bw = Math.max(4, Math.min(10, w / n * .34)); const X = i => L + (i + .5) * w / n;
  const ci = kmD('#FF7605'), ce = kmD('#1C1C1C');
  let svg = `<svg class="km-line" viewBox="0 0 ${Wd} ${Hd}" preserveAspectRatio="none">`;
  [mx, mx / 2, 0, mx / 2, mx].forEach((v, k) => { const y = T + k * h / 4; svg += `<line x1="${L}" x2="${L + w}" y1="${y}" y2="${y}" class="gl" ${k === 2 ? 'style="stroke-width:1.4;opacity:1"' : ''}/><text x="${Wd - 2}" y="${y + 3}" text-anchor="end" class="ax">${k === 2 ? '0' : (k < 2 ? '+' : '−') + short(v).replace(' ', '')}</text>`; });
  inc.forEach((v, i) => { if (v) svg += `<rect x="${X(i) - bw - .6}" y="${mid - sc(v)}" width="${bw}" height="${Math.max(1.5, sc(v))}" rx="${Math.min(3, bw / 2)}" fill="${ci}"/>`; });
  exp.forEach((v, i) => { if (v) svg += `<rect x="${X(i) + .6}" y="${mid}" width="${bw}" height="${Math.max(1.5, sc(v))}" rx="${Math.min(3, bw / 2)}" fill="${ce}"/>`; });
  const li = new Set(n <= 6 ? [...Array(n).keys()] : [0, 1, 2, 3, 4].map(k => Math.round(k * (n - 1) / 4)));
  svg += labels.map((l, i) => li.has(i) ? `<text x="${clamp(X(i), 16, L + w - 14)}" y="${Hd - 5}" text-anchor="middle" class="ax">${l}</text>` : '').join('');
  return svg + '</svg>';
}
function kmDonut(parts, cols, label, total) {
  cols = cols.map(kmD); const tot = parts.reduce((a, p) => a + p, 0); const R = 46, C = 2 * Math.PI * R; let off = 0;
  const gap = parts.length > 1 ? 2.2 : 0;
  const segs = tot ? parts.map((v, i) => { const len = v / tot * C; const seg = `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${cols[i]}" stroke-width="14" stroke-dasharray="${Math.max(0.01, len - gap)} ${C}" stroke-dashoffset="${-off}" class="dn-s" style="animation-delay:${i * .05}s"/>`; off += len; return seg; }).join('') : '';
  return `<div class="dnut"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--chip)" stroke-width="14"/><g transform="rotate(-90 60 60)">${segs}</g></svg>
    <div class="dn-c"><small>${t(label)}</small><b class="num">${hideable(short(total))}</b><i>uzs</i></div></div>`;
}
function kmPie(parts, cols, label, total) {
  cols = cols.map(kmD);
  const tot = parts.reduce((a, p) => a + p, 0) || 1; const cx = 186, cy = 100; let a = -Math.PI / 2; let out = '';
  parts.forEach((v, i) => {
    const ang = v / tot * Math.PI * 2; const r = Math.max(56, 86 - Math.min(i, 6) * 4); const mid = a + ang / 2; const ox = Math.cos(mid) * 3, oy = Math.sin(mid) * 3;
    if (ang >= Math.PI * 2 - 1e-6) out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cols[i]}"/>`;
    else { const x1 = cx + ox + r * Math.cos(a), y1 = cy + oy + r * Math.sin(a), x2 = cx + ox + r * Math.cos(a + ang), y2 = cy + oy + r * Math.sin(a + ang);
      out += `<path d="M${cx + ox},${cy + oy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${ang > Math.PI ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${cols[i]}" stroke="none"/>`; }
    const pc = v / tot * 100; if (pc >= 6) out += `<text x="${(cx + ox + Math.cos(mid) * r * .64).toFixed(1)}" y="${(cy + oy + Math.sin(mid) * r * .64 + 4).toFixed(1)}" text-anchor="middle" class="pl ${kmLight(cols[i]) ? 'dk' : ''}">${(Math.round(pc * 10) / 10).toString().replace('.', ',')}%</text>`;
    a += ang;
  });
  if (!parts.length) out = `<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="var(--violet-soft)" stroke-width="22"/>`;
  return `<div class="km-pie"><svg viewBox="0 0 300 200">${out}</svg><div class="pie-lbl"><small>${t(label)}</small><b class="num">${hideable(grp(total))} <i>uzs</i></b></div></div>`;
}
function kmRange() {
  const R = getRange(UI.statPeriod, UI.statOffset); const a = fromIso(R.a); const bb = R.b > today() ? today() : R.b; const b = fromIso(bb);
  const lbl = UI.statPeriod === 'year' ? R.label : a.getMonth() === b.getMonth() ? `${a.getDate()}–${b.getDate()} ${t(MON3[a.getMonth()])} ${a.getFullYear()}` : `${a.getDate()} ${t(MON3[a.getMonth()])} – ${b.getDate()} ${t(MON3[b.getMonth()])}`;
  return { ...R, end: bb, lbl };
}
function renderStats() {
  const el = $('#v-stats'); const R = kmRange();
  UI.stT = UI.stT || 'expense'; UI.stW = UI.stW || 'all'; UI.stWT = UI.stWT || 'expense'; UI.stD = UI.stD || 'all';
  if (!UI.stBW) UI.stBW = S.wallets.map(w => w.id);
  const base = inRange(R.a, R.b); const list = base.filter(x => UI.stW === 'all' || x.wallet === UI.stW);
  const tps = UI.stT === 'all' ? ['income', 'expense'] : [UI.stT];
  const by = {}; list.filter(x => tps.includes(x.type)).forEach(x => by[x.cat] = (by[x.cat] || 0) + x.amount);
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]); const tot = rows.reduce((a, r) => a + r[1], 0);
  // kúnler
  const days = []; for (let d = fromIso(R.a); iso(d) <= R.end; d = addDays(d, 1)) days.push(iso(d));
  const yearMode = UI.statPeriod === 'year';
  const pts = yearMode ? [...Array(fromIso(R.end).getMonth() + 1)].map((_, m) => `${R.y}-${pad(m + 1)}-${pad(new Date(R.y, m + 1, 0).getDate())}`) : days;
  const lbls = yearMode ? pts.map(p => t(MON3[+p.slice(5, 7) - 1])) : pts.map(p => `${t(MON3[+p.slice(5, 7) - 1]).toLowerCase()} ${+p.slice(8)}`);
  const balAt = (wid, d) => { const w = walletById(wid); let b = +w.initial || 0; for (const x of S.tx) { if (x.date > d) continue; if (x.type === 'income' && x.wallet === wid) b += x.amount; else if (x.type === 'expense' && x.wallet === wid) b -= x.amount; else if (x.type === 'transfer') { if (x.wallet === wid) b -= x.amount; if (x.to === wid) b += x.amount; } } return b; };
  const BCOL = ['#7B5CFA', '#FF8A1F', '#B8A6FF', '#FFB866']; const balSeries = S.wallets.map((w, i) => ({ id: w.id, w, c: BCOL[i % 4], dash: i >= 2, v: pts.map(d => balAt(w.id, d)) })).filter(s => UI.stBW.includes(s.id));
  const prevOf = p => yearMode ? p.slice(0, 7) + '-01' : p;
  const dsum = (type) => pts.map(p => base.filter(x => x.type === type && x.date >= prevOf(p) && x.date <= p).reduce((a, x) => a + x.amount, 0));
  const ieSeries = [{ c: '#FF7605', v: dsum('income') }, { c: '#978F88', v: dsum('expense').map(v => -v), neg: true }];
  // hamyanlar boyınsha
  const wby = S.wallets.map((w, i) => ({ w, c: KM_WCOL[i % KM_WCOL.length], v: sum(base.filter(x => x.wallet === w.id), UI.stWT) })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  const wtot = wby.reduce((a, x) => a + x.v, 0);
  // limitler
  const lims = Object.entries(S.budget.cats || {}).filter(([, v]) => v > 0);
  // qarızlar
  const dl = S.debts.filter(d => !d.paid && (UI.stD === 'all' || (UI.stD === 'taken' ? d.type === 'taken' : d.type === 'given')));
  const dTaken = dl.filter(d => d.type === 'taken').reduce((a, d) => a + debtUZS(d), 0), dGiven = dl.filter(d => d.type === 'given').reduce((a, d) => a + debtUZS(d), 0);
  const dParts = UI.stD === 'all' ? [dGiven, dTaken].filter(v => v) : dl.map(debtUZS);
  const dCols = UI.stD === 'all' ? [dGiven ? '#FF7605' : null, dTaken ? '#1C1C1C' : null].filter(Boolean) : dl.map((_, i) => KM_COL[i % KM_COL.length]);
  const seg = (k, val, opts) => `<div class="seg km-seg">${opts.map(([v, l]) => `<button data-${k}="${v}" class="${val === v ? 'on' : ''}">${t(l)}</button>`).join('')}</div>`;
  const wchips = (k, sel, multi) => `<div class="km-chips">${multi ? '' : `<button class="kc ${sel === 'all' ? 'on' : ''}" data-${k}="all">${ic('layers')}UZS</button><i class="kc-sep"></i>`}${S.wallets.map((w, i) => `<button class="kc ${multi ? (sel.includes(w.id) ? 'on' : '') : (sel === w.id ? 'on' : '')}" data-${k}="${w.id}" style="--kc:${KM_WCOL[i % KM_WCOL.length]}">${ic(w.icon)}${esc(t(w.name))}</button>`).join('')}</div>`;
  const info = `<span class="km-i">${ic('info')}</span>`;
  const PR = getRange(UI.statPeriod, UI.statOffset + 1); const pTot = inRange(PR.a, PR.b).filter(x => (UI.stW === 'all' || x.wallet === UI.stW) && tps.includes(x.type)).reduce((a, x) => a + x.amount, 0);
  const dPc = pTot ? Math.round((tot - pTot) / pTot * 100) : 0;
  const mWord = UI.statPeriod === 'year' ? String(R.y) : UI.statPeriod === 'month' ? t(MONTHS[R.d.getMonth()]) : t('Hápte');
  el.innerHTML = `
  <div class="page-head"><div><h1 class="page-title">${t('Statistika')}</h1><p>${t('Qarjılarıńız qay jerge ketip atır')}</p></div>
    <button class="icon-btn" id="stAllTx" aria-label="list">${ic('list')}</button></div>
  <div class="seg">${[['week', 'Hápte'], ['month', 'Ay'], ['year', 'Jıl']].map(([k, l]) => `<button data-p="${k}" class="${UI.statPeriod === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
  <section class="mcard">
    <div class="mc-top"><span class="mc-pill">${list.filter(x => tps.includes(x.type)).length} ${t('operaciya')}</span>
      <span class="mc-nav"><button id="stPrev" aria-label="prev">${ic('chevron-left')}</button><button id="stNext" aria-label="next" ${UI.statOffset <= 0 ? 'disabled' : ''}>${ic('chevron-right')}</button></span></div>
    <div class="mc-per">${R.lbl}</div>
    <div class="mc-sum num">${hideable(grp(tot))}<i>${cur()}</i></div>
    <div class="mc-delta">${pTot ? `<b class="num">${dPc > 0 ? '+' : ''}${dPc}%</b> ${t('aldınǵı dáwirge salıstırǵanda')}` : t('Aldınǵı dáwir boyınsha maǵlıwmat joq')}</div>
    <div class="mc-word" style="font-size:${Math.min(112, Math.round(560 / mWord.length))}px" aria-hidden="true">${mWord}</div>
  </section>

  <section class="card km-sc"><h4>${t('Kategoriyalar boyınsha')}${info}</h4>${wchips('sw', UI.stW)}
    <div class="cs-top">${kmDonut(rows.map(r => r[1]), rows.map((_, i) => KM_COL[i % KM_COL.length]), UI.stT === 'income' ? 'kirim' : UI.stT === 'expense' ? 'shıǵım' : 'aylanıs', tot)}
      <div class="cs-leg">${rows.slice(0, 4).map(([c, v], i) => `<span style="--cc:${kmD(KM_COL[i % KM_COL.length])}"><i></i><em class="ell">${esc(t(catById(c).name))}</em><b class="num">${Math.round(v / tot * 100)}%</b></span>`).join('')}${rows.length > 4 ? `<span class="more" style="--cc:var(--muted)"><i></i><em>+${rows.length - 4} ${t('basqa')}</em></span>` : ''}${!rows.length ? `<span class="muted">${t('Maǵlıwmat joq')}</span>` : ''}</div></div>
    ${seg('stt', UI.stT, [['all', 'Barlıǵı'], ['income', 'Kirim'], ['expense', 'Shıǵım']])}
    ${rows.length ? `<div class="cs-rows ${UI.csAll ? 'all' : ''}">${rows.map(([c, v], i) => { const ct = catById(c); const col = kmD(KM_COL[i % KM_COL.length]); const lim = S.budget.cats?.[c]; const pc = v / tot * 100;
      return `<button class="cs-r" data-cat="${c}" style="--cc:${col}"><span class="cs-ic">${icE(ct.icon)}</span><span class="cs-m"><span class="cs-l"><em class="ell">${esc(t(ct.name))}</em>${lim ? `<span class="cr-l num">${Math.round(v / lim * 100)}%</span>` : ''}<b class="num">${hideable(grp(v))}</b></span><span class="cs-b"><i style="width:${Math.max(2, pc)}%"></i></span></span><small class="num">${(Math.round(pc * 10) / 10).toString().replace('.', ',')}%</small></button>`; }).join('')}</div>
      ${rows.length > 5 ? `<button class="cs-more" id="csMore">${t(UI.csAll ? 'Jıynaw' : 'Barlıǵın kórsetiw')} (${rows.length})${ic(UI.csAll ? 'chevron-up' : 'chevron-down')}</button>` : ''}`
      : `<div class="km-empty">${t('Bul aralıqta maǵlıwmat joq')}</div>`}
  </section>

  <section class="card km-sc"><h4>${t('Balanslar halatı')}${info}</h4>
    <div class="km-chips bl-chips">${S.wallets.map((w, i) => { const on = UI.stBW.includes(w.id); const c = kmD(['#7B5CFA', '#FF8A1F', '#B8A6FF', '#FFB866'][i % 4]); return `<button class="kc bl ${on ? 'on' : ''}" data-sb="${w.id}" style="--kc:${c}"><i class="${i >= 2 ? 'dash' : ''}"></i>${esc(t(w.name))}<b class="num">${short(walletBal(w.id))}</b></button>`; }).join('')}</div>
    ${balSeries.length ? kmLine(balSeries, lbls, { id: 'b' }) : `<div class="km-empty">${t('Hamyan saylań')}</div>`}</section>

  <section class="card km-sc ie2"><h4>${t('Kirim hám shıǵım')}${info}</h4>${kmIE(base, R)}</section>

  <section class="card km-sc"><h4>${t('Hamyanlar boyınsha')}${info}</h4>
    ${seg('swt', UI.stWT, [['income', 'Kirim'], ['expense', 'Shıǵım']])}
    ${wby.length ? `<div class="cs-top">${kmDonut(wby.map(x => x.v), wby.map(x => x.c), UI.stWT === 'income' ? 'kirim' : 'shıǵım', wtot)}
      <div class="cs-leg">${wby.map(x => `<span style="--cc:${kmD(x.c)}"><i></i><em class="ell">${esc(t(x.w.name))}</em><b class="num">${Math.round(x.v / wtot * 100)}%</b></span>`).join('')}</div></div>
      <div class="cs-rows all">${wby.map(x => { const pc = x.v / wtot * 100; return `<div class="cs-r" style="--cc:${kmD(x.c)}"><span class="cs-ic">${ic(x.w.icon)}</span><span class="cs-m"><span class="cs-l"><em class="ell">${esc(t(x.w.name))}</em><b class="num">${hideable(grp(x.v))}</b></span><span class="cs-b"><i style="width:${Math.max(2, pc)}%"></i></span></span><small class="num">${(Math.round(pc * 10) / 10).toString().replace('.', ',')}%</small></div>`; }).join('')}</div>`
      : `<div class="km-empty">${t('Bul aralıqta maǵlıwmat joq')}</div>`}</section>

  <section class="card km-sc"><h4>${t('Aylıq limitler')}${info}</h4>
    ${lims.length ? `<div class="lm-rows">${lims.map(([c, lim]) => { const ct = catById(c); const sp = catSpent(c); const p = Math.round(sp / lim * 100); const st = p > 100 ? 'over' : p >= 80 ? 'warn' : '';
      return `<div class="lm ${st}"><span class="cs-ic" style="--cc:${kmD(ct.color)}">${icE(ct.icon)}</span><div class="lm-m"><div class="lm-t"><em class="ell">${esc(t(ct.name))}</em><span class="lm-p num">${p}%</span></div>
        <div class="lm-b"><i style="width:${clamp(p, 0, 100)}%"></i></div><small class="num">${grp(sp)} / ${grp(lim)} uzs · ${p > 100 ? t('asıp ketti') + ' ' + short(sp - lim) : t('qaldı') + ' ' + short(Math.max(0, lim - sp))}</small></div></div>`; }).join('')}</div>`
      : `<div class="km-empty">${t('Limit ornatılmaǵan')}</div>`}
    <button class="btn ghost sm" id="stLim">${ic('sliders-horizontal')}${t('Limitlerdi sazlaw')}</button></section>

  <section class="card km-sc"><h4>${t('Alıs-berisler')}${info}</h4>
    ${!S.debts.some(d => !d.paid) ? `<div class="ab-empty"><span>${ic('hand-coins')}</span><div><b>${t('Aktiv qarız joq')}</b><small>${t('Qarız bergenińiz yamasa alǵanıńız bolsa, jazıp qoyıń')}</small></div><button class="btn pri sm" id="stDebtNew">${ic('plus')}${t('Qosıw')}</button></div>` : `
    ${seg('sd', UI.stD, [['all', 'Barlıǵı'], ['taken', 'Alınǵan'], ['given', 'Berilgen']])}
    ${UI.stD === 'all' ? `<div class="ab-two"><div class="ab-c in"><small>${ic('arrow-down-left')}${t('Maǵan qaytadı')}</small><b class="num">+${short(dGiven)}</b></div><div class="ab-c out"><small>${ic('arrow-up-right')}${t('Men qaytaraman')}</small><b class="num">−${short(dTaken)}</b></div></div>
      <div class="ab-bar"><i style="width:${dTaken + dGiven ? Math.round(dGiven / (dTaken + dGiven) * 100) : 50}%"></i></div>
      <div class="ab-net">${t('Sap jaǵday')}: <b class="num">${dGiven - dTaken >= 0 ? '+' : '−'}${grp(Math.abs(dGiven - dTaken))} uzs</b></div>`
      : dl.length ? `<div class="cs-rows all">${dl.map(d => `<div class="cs-r" style="--cc:${d.type === 'given' ? '#FF7605' : kmD('#1C1C1C')}"><span class="qa-av" style="width:32px;height:32px;font-size:.7rem">${esc(initials(d.name))}</span><span class="cs-m"><span class="cs-l"><em class="ell">${esc(d.name)}</em><b class="num">${grp(debtLeft(d))} ${d.cur && d.cur !== 'UZS' ? d.cur : ''}</b></span></span></div>`).join('')}</div>` : `<div class="km-empty">${t('Qarız joq')}</div>`}`}
  </section>`;
  $('#stPrev').onclick = () => { UI.statOffset++; renderView(); };
  $('#stNext').onclick = () => { if (UI.statOffset > 0) { UI.statOffset--; renderView(); } };
  $$('[data-p]', el).forEach(b => b.onclick = () => { UI.statPeriod = b.dataset.p; UI.statOffset = 0; renderView(); });
  $('#stAllTx').onclick = () => openAllTx();
  $$('[data-sw]', el).forEach(b => b.onclick = () => { UI.stW = b.dataset.sw; renderView(); });
  $$('[data-sb]', el).forEach(b => b.onclick = () => { const id = b.dataset.sb; UI.stBW = UI.stBW.includes(id) ? UI.stBW.filter(x => x !== id) : [...UI.stBW, id]; renderView(); });
  $$('[data-stt]', el).forEach(b => b.onclick = () => { UI.stT = b.dataset.stt; renderView(); });
  $$('[data-swt]', el).forEach(b => b.onclick = () => { UI.stWT = b.dataset.swt; renderView(); });
  $$('[data-sd]', el).forEach(b => b.onclick = () => { UI.stD = b.dataset.sd; renderView(); });
  $$('[data-cat]', el).forEach(b => b.onclick = () => openCatTx(b.dataset.cat, R));
  const csm = $('#csMore', el); if (csm) csm.onclick = () => { UI.csAll = !UI.csAll; renderView(); };
  $('#stLim').onclick = openBudget; const sdn = $('#stDebtNew', el); if (sdn) sdn.onclick = () => openDebtNew('given');
}

/* ---------- KATEGORIYALAR (gruppalar) ---------- */
const KM_EMOJI = {"k_f1": "🍱", "k_f2": "🛒", "k_f3": "🍔", "k_f4": "🥤", "k_f5": "☕", "k_f6": "🏪", "k_f7": "🛵", "k_m1": "💸", "k_m2": "📤", "k_m3": "🏦", "k_m4": "💹", "k_m5": "🏛️", "k_m6": "💱", "k_m7": "📈", "k_m8": "🛡️", "k_m9": "🧾", "k_t1": "🚕", "k_t2": "⛽", "k_t3": "🚙", "k_t4": "🚌", "k_t5": "🔧", "k_o1": "📦", "k_o2": "❓", "k_o3": "👤", "k_o4": "🔄", "k_o5": "⚠️", "k_o6": "🎯", "k_i1": "💰", "k_i2": "💪", "k_i3": "🏷️", "k_i4": "🎯", "k_i5": "🔑", "k_i6": "🪙", "k_i7": "💵", "k_l1": "🎁", "k_l2": "🤝", "k_l3": "🎭", "k_l4": "🏃", "k_l5": "✈️", "k_l6": "🎬", "k_l7": "🐾", "k_l8": "🎨", "k_l9": "🤲", "k_w1": "🏢", "k_w2": "👥", "k_w3": "📢", "k_w4": "🖥️", "k_w5": "🚚", "k_w6": "💻", "k_w7": "📁", "k_h1": "🏠", "k_h2": "🧾", "k_h3": "🌍", "k_h4": "💡", "k_d1": "🩺", "k_d2": "🧴", "k_d3": "💊", "k_d4": "💇", "k_s1": "🛍️", "k_s2": "👕", "k_s3": "📱", "k_s4": "🛋️", "k_s5": "💍", "k_s6": "🧸", "k_s7": "📦", "k_e1": "📞", "k_e2": "📚", "k_e3": "🔁", "k_e4": "💻", "k_c1": "🧒", "k_c2": "🏫", "k_c3": "🧸", "k_c4": "👪"};
const KM_GEMOJI = {"food": "🍽️", "fin": "📊", "tr": "🚗", "oth": "⚙️", "inc": "💵", "life": "🎉", "biz": "💼", "home": "🏠", "hl": "❤️", "shop": "🛍️", "edu": "🎓", "fam": "👨‍👩‍👧"};
const KM_IEMOJI = {"shopping-basket": "🧺", "car": "🚗", "zap": "⚡", "smartphone": "📱", "heart-pulse": "❤️", "shirt": "👕", "gamepad-2": "🎮", "graduation-cap": "🎓", "house": "🏠", "coffee": "☕", "gift": "🎁", "ellipsis": "📦", "briefcase": "💼", "store": "🏪", "sparkles": "✨", "trending-up": "📈", "circle-plus": "➕", "utensils": "🍽️", "plane": "✈️", "baby": "🧒", "heart": "❤️", "target": "🎯", "laptop": "💻", "folder": "📁", "circle-user": "👤", "wallet": "👛", "book-open": "📚", "music": "🎵", "dumbbell": "🏋️", "pill": "💊", "bus": "🚌", "fuel": "⛽", "phone": "📞", "tag": "🏷️", "coins": "🪙", "banknote": "💵"};
const catEmoji = c => KM_EMOJI[c.id] || KM_IEMOJI[c.icon] || '🏷️';
const KM_GROUPS = [["food", "Azıq-awqat", "utensils", "#F59E0B", "expense", [["f1", "Ulıwma", "utensils"], ["f2", "Bazar hám dúkan", "shopping-cart"], ["f3", "Sırtta awqatlanıw", "utensils"], ["f4", "Ishimlikler", "coffee"], ["f5", "Kofe", "coffee"], ["f6", "Dúkan", "store"], ["f7", "Awqat jetkeriw", "truck"]], ["food", "cafe"]], ["fin", "Finans hám minnetlemeler", "percent", "#14B8A6", "expense", [["m1", "Qarızlar", "banknote"], ["m2", "Pul awdarıw", "send"], ["m3", "Kredit hám nasiya", "landmark"], ["m4", "Finans operaciyaları", "trending-up"], ["m5", "Mámleket tólewleri", "landmark"], ["m6", "Valyuta ayırbaslaw", "arrow-left-right"], ["m7", "Jıynaq hám investiciya", "trending-up"], ["m8", "Qamsızlandırıw", "shield"], ["m9", "Salıqlar", "receipt"]], []], ["tr", "Transport", "car", "#06B6D4", "expense", [["t1", "Taksi", "car"], ["t2", "Janılǵı hám gaz", "fuel"], ["t3", "Ulıwma", "car"], ["t4", "Jol kira (avtobus)", "bus"], ["t5", "Mashina qárejetleri", "wrench"]], ["transport"]], ["oth", "Basqalar", "ellipsis", "#6B7280", "expense", [["o1", "Basqa qárejetler", "ellipsis"], ["o2", "Anıqlanbaǵan", "circle-help"], ["o3", "Jeke qárejetler", "user"], ["o4", "Balanstı ózgertiw", "refresh-cw"], ["o5", "Kútilmegen qárejetler", "triangle-alert"], ["o6", "Maqsetli qárejetler", "target"]], ["other"]], ["inc", "Dáramatlar", "trending-up", "#22C55E", "income", [["i1", "Basqa dáramatlar", "coins"], ["i2", "Miynet dáramatları", "briefcase"], ["i3", "Sawda dáramatları", "tag"], ["i4", "Biznes dáramatları", "target"], ["i5", "Ijara dáramatları", "key-round"], ["i6", "Keshbek hám qaytım", "coins"], ["i7", "Aylıq hám avans", "banknote"]], ["salary", "biz", "bonus", "gift_in", "invest", "other_in"]], ["life", "Turmıs tárzi", "sparkles", "#8B5CF6", "expense", [["l1", "Sawǵa hám sıylıqlar", "gift"], ["l2", "Xızmetler", "users"], ["l3", "Oyın-kúlki", "smile"], ["l4", "Sport", "dumbbell"], ["l5", "Sayaxat", "plane"], ["l6", "Muzıka hám kino", "music"], ["l7", "Haywanlar", "paw-print"], ["l8", "Hobbi", "sparkles"], ["l9", "Qayırqomlıq", "heart"]], ["fun", "gift"]], ["biz", "Biznes hám jumıs", "briefcase", "#3B82F6", "expense", [["w1", "Ofis", "building-2"], ["w2", "Xızmetkerler", "users"], ["w3", "Marketing", "megaphone"], ["w4", "Úskeneler", "laptop"], ["w5", "Logistika", "truck"], ["w6", "Programmalar", "laptop"], ["w7", "Biznes basqa", "folder"]], []], ["home", "Úy-jay hám kommunal", "house", "#6366F1", "expense", [["h1", "Úy-jay qárejetleri", "house"], ["h2", "Kommunal tólewler", "receipt"], ["h3", "Jer", "globe"], ["h4", "Energiya únemlew", "lightbulb"]], ["home", "utility"]], ["hl", "Densawlıq hám kútim", "heart", "#EF4444", "expense", [["d1", "Densawlıq", "stethoscope"], ["d2", "Jeke kútim", "heart"], ["d3", "Dári-dármaq", "pill"], ["d4", "Salon hám gózzallıq", "sparkles"]], ["health"]], ["shop", "Xaridlar", "shopping-cart", "#EC4899", "expense", [["s1", "Ulıwma", "shopping-cart"], ["s2", "Kiyim-kenshek", "shirt"], ["s3", "Elektronika hám texnika", "smartphone"], ["s4", "Úy buyımları", "store"], ["s5", "Aksessuar hám zergerlik", "gem"], ["s6", "Oyınshıqlar", "smile"], ["s7", "Onlayn xaridlar", "shopping-cart"]], ["cloth"]], ["edu", "Bilim hám baylanıs", "graduation-cap", "#0EA5E9", "expense", [["e1", "Baylanıs hám media", "phone"], ["e2", "Oqıw hám rawajlanıw", "book-open"], ["e3", "Jazılıwlar", "repeat"], ["e4", "Kompyuter", "laptop"]], ["comm", "edu"]], ["fam", "Shańaraq, balalar, úy", "baby", "#F97316", "expense", [["c1", "Balalar", "baby"], ["c2", "Mektep", "school"], ["c3", "Bala-baqsha", "smile"], ["c4", "Shańaraq", "users"]], []]];
(function kmCleanGroups() { if (S.kmCg3) return; S.kmCg3 = true; S.cgroups = (S.cgroups || []).filter(g => S.cats.some(c => c.grp === g.id)); save(); })();
(function kmSeedCats() {
  if (S.kmCats2) return; S.kmCats2 = true;
  KM_GROUPS.forEach(([gid, , , col, type, cats, defs]) => {
    defs.forEach(id => { const c = S.cats.find(x => x.id === id); if (c) c.bg = gid; });
    cats.forEach(([cid, name, icon]) => { const id = 'k_' + cid; if (!S.cats.some(c => c.id === id)) S.cats.push({ id, name, icon, color: col, type, bg: gid }); });
  });
  save();
})();
function openCats() {
  UI.cType = UI.cType || 'expense'; UI.cOpen = UI.cOpen || { mine: true }; UI.cq = ''; UI.cView = UI.cView || S.catView || 'icon'; if (UI.cView === 'fill') UI.cView = 'icon';
  const tile = (c, gcol) => { const lim = c.type === 'expense' ? S.budget.cats?.[c.id] : 0; const p = lim ? clamp(catSpent(c.id) / lim * 100, 0, 100) : 0;
    return `<button class="cg-t ${UI.cView === 'fill' ? 'fill' : ''}" data-ce="${c.id}" style="--tc:${gcol || catCol(c)}">${lim ? `<i class="cg-lim" style="height:${p}%"></i>` : ''}<span class="cg-ti ${UI.cView === 'emoji' ? 'em' : ''}">${UI.cView === 'emoji' ? catEmoji(c) : ic(c.icon)}</span><small class="ell2">${esc(t(c.name))}</small></button>`; };
  const body = () => {
    const q = toLat(UI.cq || ''); const match = c => !q || toLat(t(c.name)).includes(q) || toLat(c.name).includes(q);
    const cats = S.cats;
    const userGroups = S.cgroups;
    const bgIds = new Set(KM_GROUPS.map(g => g[0]));
    const mine = cats.filter(c => !(c.bg && bgIds.has(c.bg)) && !userGroups.some(g => g.id === c.grp));
    const grp = (id, name, icon, color, list, own) => { const open = UI.cOpen[id] || !!q; const l = list.filter(match); if (q && !l.length) return '';
      return `<div class="card cg ${open ? 'open' : ''}"><div class="cg-h" data-cg="${id}"><span class="cg-ic ${UI.cView === 'emoji' ? 'em' : ''}" style="background:${color}">${UI.cView === 'emoji' ? (KM_GEMOJI[id] || (id === 'mine' ? '👤' : '📁')) : ic(icon)}</span><span class="r-t"><div class="ell">${esc(t(name))}</div><small>${l.length} ${t('kategoriya')}</small></span>
        <button class="cg-m" data-cgm="${id}" data-own="${own ? 1 : 0}" aria-label="menu">${ic('ellipsis')}</button><span class="cg-ch">${ic(open ? 'chevron-up' : 'chevron-down')}</span></div>
      ${open ? `<div class="cg-grid">${l.map(c => tile(c, color)).join('')}<button class="cg-t add" data-cadd="${id}">${ic('plus')}<small>${t('Qosıw')}</small></button></div>`
        : `<div class="cg-dots">${l.slice(0, 6).map(c => `<i style="--tc:${color}" class="${UI.cView === 'emoji' ? 'em' : ''}">${UI.cView === 'emoji' ? catEmoji(c) : ic(c.icon)}</i>`).join('')}${l.length > 6 ? `<i class="more">+${l.length - 6}</i>` : ''}</div>`}</div>`; };
    return `<label class="km-search">${ic('search')}<input id="cQ" placeholder="${t('Izlew')}" value="${esc(UI.cq || '')}"></label>
      <div class="card cg-view"><span>${t('Kórinis')}</span><div class="seg">${[['icon', 'Ikonka'], ['emoji', 'Emoji']].map(([v, l]) => `<button data-cv="${v}" class="${UI.cView === v ? 'on' : ''}">${t(l)}</button>`).join('')}</div></div>
      <small class="cg-cap">${t('Meniń gruppalarım')}</small>
      ${grp('mine', 'Jeke kategoriyalar', 'circle-user', '#7B5CFA', mine, true)}
      ${userGroups.map(g => grp(g.id, g.name, 'folder', g.color || '#8B5CF6', cats.filter(c => c.grp === g.id), true)).join('')}
      <button class="cg-new" id="cgNew"><span>${ic('plus')}</span><span class="r-t"><div>${t('Jańa gruppa')}</div><small>${t('Kategoriyalarıńızdı óz gruppańızǵa jıynań')}</small></span></button>
      <small class="cg-cap">${t('E-esap gruppaları')}</small>
      ${KM_GROUPS.map(([id, name, icon, color]) => grp(id, name, icon, color, cats.filter(c => c.bg === id && !c.grp), false)).join('')}`;
  };
  const addIn = g => { const before = new Set(S.cats.map(c => c.id)); UI.cOpen[g] = true; const kg = KM_GROUPS.find(x => x[0] === g); openCatEdit(null, kg ? kg[4] : 'expense');
    const iv = setInterval(() => { const nw = S.cats.find(c => !before.has(c.id)); if (nw) { if (KM_GROUPS.some(x => x[0] === g)) { nw.bg = g; nw.color = KM_GROUPS.find(x => x[0] === g)[3]; } else if (g !== 'mine') nw.grp = g; save(); clearInterval(iv); Page.refresh(); } else if (!Sheet.stack.length) clearInterval(iv); }, 300); };
  const groupForm = (g = null) => Sheet.open({ title: g ? t('Gruppanı ózgertiw') : t('Jańa gruppa'),
    html: () => `<div class="field"><label>${t('Gruppa atı')}</label><input class="inp" id="gNm" maxlength="24" value="${g ? esc(g.name) : ''}" placeholder="${t('Mısalı: Balalar')}"></div>
      <div class="field"><label>${t('Reń')}</label><div class="chips">${['#F59E0B', '#14B8A6', '#06B6D4', '#22C55E', '#8B5CF6', '#3B82F6', '#EF4444', '#EC4899'].map(c => `<button class="chip sw-c" data-gc="${c}" style="--sw:${c};background:${c}!important;background-image:none!important;width:38px;height:38px;padding:0;background:${c};${(g ? g.color : '#FF7605') === c ? 'outline:3px solid var(--violet);outline-offset:2px' : ''}"></button>`).join('')}</div></div>
      <button class="btn pri" id="gOk">${t(g ? 'Saqlaw' : 'Jaratıw')}</button>`,
    mount: e2 => { let col = g ? g.color : '#8B5CF6'; $$('[data-gc]', e2).forEach(b => b.onclick = () => { col = b.dataset.gc; $$('[data-gc]', e2).forEach(x => x.style.outline = x === b ? '3px solid var(--violet)' : ''); });
      $('#gOk').onclick = () => { const n = $('#gNm').value.trim(); if (!n) return toast(t('Atın jazıń'), { icon: 'circle-alert' }); if (g) { g.name = n; g.color = col; } else { const id = 'cg' + uid(); S.cgroups.push({ id, name: n, color: col }); UI.cOpen[id] = true; } save(); Sheet.close(); Page.refresh(); }; } });
  Page.open({
    title: t('Kategoriyalar'),
    html: () => `<div id="kmCats">${body()}</div>`,
    mount: el => {
      const q = $('#cQ', el); q.oninput = () => { UI.cq = q.value; const pos = q.selectionStart; Page.refresh(); const q2 = $('#cQ'); q2.focus(); q2.setSelectionRange(pos, pos); };
      $$('[data-cv]', el).forEach(b => b.onclick = () => { UI.cView = S.catView = b.dataset.cv; save(); Page.refresh(); });
      $$('[data-cg]', el).forEach(b => b.onclick = e => { if (e.target.closest('[data-cgm]')) return; UI.cOpen[b.dataset.cg] = !UI.cOpen[b.dataset.cg]; Page.refresh(); });
      $$('[data-cgm]', el).forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.cgm; const own = b.dataset.own === '1'; const ug = S.cgroups.find(g => g.id === id);
        Sheet.open({ title: t('Gruppa'), html: () => `<div class="card list">
            <button class="row" data-mm="add"><span class="r-ic">${ic('plus')}</span><span class="r-t"><div>${t('Kategoriya qosıw')}</div></span></button>
            ${ug ? `<button class="row" data-mm="edit"><span class="r-ic">${ic('pencil')}</span><span class="r-t"><div>${t('Ataw hám reńin ózgertiw')}</div></span></button>
            <button class="row" data-mm="del"><span class="r-ic">${ic('trash-2')}</span><span class="r-t"><div>${t('Gruppanı óshiriw')}</div></span></button>` : ''}</div>`,
          mount: e3 => $$('[data-mm]', e3).forEach(m => m.onclick = async () => { const a = m.dataset.mm; Sheet.close();
            if (a === 'add') setTimeout(() => addIn(id), 250);
            if (a === 'edit') setTimeout(() => groupForm(ug), 250);
            if (a === 'del' && await ask('Gruppanı óshiriw', 'Gruppa óshiriledi, kategoriyalar «Jeke kategoriyalar» ǵa ótedi.', 'Óshiriw', true)) { S.cats.forEach(c => { if (c.grp === id) delete c.grp; }); S.cgroups = S.cgroups.filter(g => g.id !== id); save(); Page.refresh(); } }) }); });
      $$('[data-ce]', el).forEach(b => b.onclick = () => openCatEdit(S.cats.find(c => c.id === b.dataset.ce)));
      $$('[data-cadd]', el).forEach(b => b.onclick = () => addIn(b.dataset.cadd));
      $('#cgNew', el).onclick = () => groupForm();
    }
  });
}

/* ---------- QARIZLAR ---------- */
function openDebtNew(type = 'given', ed = null) {
  const st = ed ? { type: ed.type, cur: ed.cur || 'UZS', wallet: ed.wallet ?? '', sms: !!ed.sms } : { type, cur: 'UZS', wallet: S.wallets[0]?.id || '', sms: false };
  Page.open({
    title: t(ed ? 'Qarızdı redaktorlaw' : 'Qarız jaratıw'),
    html: () => `<div class="seg km-seg2"><button data-nt="given" class="${st.type === 'given' ? 'on' : ''}">${ic('arrow-up-right')}${t('Beriw')}</button><button data-nt="taken" class="${st.type === 'taken' ? 'on' : ''}">${ic('arrow-down-left')}${t('Alıw')}</button></div>
      <div class="field"><label>${t('Atı')} <span class="cnt" id="dCnt">0/32</span></label><div class="inp-w"><input class="inp" id="dN" maxlength="32" placeholder="${t('Kimge / kimnen')}" autocomplete="off"><button class="inp-b" id="dCt" aria-label="contacts">${ic('contact')}</button></div></div>
      <div class="field"><label>${t('Telefon nomeri')}</label><div class="inp-w"><span class="inp-pre">+998</span><input class="inp ph" id="dP" inputmode="tel" placeholder="90 123 45 67"></div></div>
      <div class="field"><label>${t('Summa')}</label><div class="km-amt"><input class="num money" id="dA" inputmode="numeric" placeholder="0" autocomplete="off"><select id="dC">${['UZS', 'USD', 'EUR', 'RUB'].map(c => `<option>${c}</option>`).join('')}</select></div></div>
      <div class="field"><label>${t('Hamyan')}</label><div class="chips">${S.wallets.map((w, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-dw="${w.id}">${ic(w.icon)}${esc(t(w.name))}</button>`).join('')}<button class="chip" data-dw="">${ic('circle-off')}${t('Hamyansız')}</button></div></div>
      <div class="row2"><div class="field"><label>${t('Qashannan')}</label><input class="inp" type="date" id="dF" value="${today()}"></div><div class="field"><label>${t('Qashanǵa shekem')}</label><input class="inp" type="date" id="dD" value="${iso(addDays(new Date(), 30))}"></div></div>
      <div class="field"><label>${t('Táriyp')}</label><div class="inp-w"><textarea class="inp ta" id="dT" maxlength="200" placeholder="${t('Qosımsha maǵlıwmat')}"></textarea><button class="inp-b" id="dMic" aria-label="mic">${ic('mic')}</button></div></div>
      <button class="card row km-sms" id="dSms" role="switch"><span class="r-ic">${ic('message-square-text')}</span><span class="r-t"><div>${t('SMS xabarlama')}</div><small>${t('Adamǵa qarız haqqında SMS jiberiw')}</small></span><span class="switch" id="dSw"></span></button>
      <button class="btn pri" id="dOk">${ic('check')}${t(ed ? 'Saqlaw' : 'Jaratıw')}</button>`,
    mount: el => {
      if (ed) { $('#dN', el).value = ed.name || ''; $('#dCnt', el).textContent = `${(ed.name || '').length}/32`; $('#dP', el).value = ed.phone ? fmtPhone(ed.phone) : ''; $('#dA', el).value = grp(ed.amount); $('#dC', el).value = ed.cur || 'UZS'; $('#dF', el).value = ed.date || today(); $('#dD', el).value = ed.due || today(); $('#dT', el).value = ed.note || '';
        $$('[data-dw]', el).forEach(x => x.classList.toggle('on', x.dataset.dw === (ed.wallet || ''))); $('#dSw', el).classList.toggle('on', st.sms); $$('input[type="date"]', el).forEach(i => i.dispatchEvent(new Event('change'))); }
      const A = $('#dA', el); A.addEventListener('input', () => { const v = parseMoney(A.value); A.value = v ? grp(v) : ''; A.style.fontSize = A.value.length > 11 ? '1.9rem' : ''; });
      $('#dN', el).addEventListener('input', e => $('#dCnt', el).textContent = `${e.target.value.length}/32`);
      $('#dP', el).addEventListener('input', e => e.target.value = fmtPhone(e.target.value));
      $$('[data-nt]', el).forEach(b => b.onclick = () => { st.type = b.dataset.nt; $$('[data-nt]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $$('[data-dw]', el).forEach(b => b.onclick = () => { st.wallet = b.dataset.dw; $$('[data-dw]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $('#dC', el).onchange = e => st.cur = e.target.value;
      $('#dSms', el).onclick = () => { st.sms = !st.sms; $('#dSw', el).classList.toggle('on', st.sms); };
      $('#dCt', el).onclick = async () => {
        if (!('contacts' in navigator && navigator.contacts.select)) return toast(t('Bul brauzerde kontaktlar ashılmaydı'), { icon: 'contact' });
        try { const [c] = await navigator.contacts.select(['name', 'tel'], { multiple: false }); if (c) { $('#dN', el).value = (c.name && c.name[0] || '').slice(0, 32); if (c.tel && c.tel[0]) $('#dP', el).value = fmtPhone(c.tel[0].replace(/\D/g, '').replace(/^998/, '')); } } catch (e) {}
      };
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition; const mic = $('#dMic', el);
      mic.onclick = () => { if (!SR) return toast(t('Mikrofon islemedi. Tekst penen jazıń.'), { icon: 'mic-off' }); try { const r = new SR(); r.lang = 'uz-UZ'; mic.classList.add('rec'); r.onresult = e => { $('#dT', el).value += (($('#dT', el).value ? ' ' : '') + e.results[0][0].transcript); }; r.onend = () => mic.classList.remove('rec'); r.start(); } catch (e) { mic.classList.remove('rec'); } };
      $('#dOk', el).onclick = () => {
        const n = $('#dN', el).value.trim(), a = parseMoney(A.value); if (!n || !a) return toast(t('Atı hám summanı kirgiziń'), { icon: 'circle-alert' });
        const phone = $('#dP', el).value.replace(/\D/g, '');
        const d = { id: ed ? ed.id : uid(), name: n, phone, amount: a, cur: st.cur, wallet: st.wallet, type: st.type, date: $('#dF', el).value || today(), due: $('#dD', el).value || today(), note: $('#dT', el).value.trim(), sms: st.sms, paid: false };
        if (ed) { Object.assign(ed, { ...d, paid: ed.paid, paidAt: ed.paidAt, paidAmt: ed.paidAmt, parts: ed.parts }); if (debtLeft(ed) <= 0 && !ed.paid) { ed.paid = true; ed.paidAt = today(); } else if (debtLeft(ed) > 0) ed.paid = false; save(); Page.back(); renderView(); Sheet.stack.length && Sheet.refresh(); toast(t('Saqlandı'), { icon: 'check' }); return; }
        S.debts.push(d); save(); Page.back(); renderView(); toast(t('Qarız jaratıldı'), { icon: 'check' });
        if (st.sms && phone.length >= 9) { const body = `${t('Sálem')}, ${n}! ${st.type === 'given' ? t('Sizge berilgen qarız') : t('Sizden alınǵan qarız')}: ${grp(a)} ${st.cur}. ${t('Qaytarıw sánesi')}: ${d.due.split('-').reverse().join('.')}. — E-esap`; location.href = `sms:+998${phone}?body=${encodeURIComponent(body)}`; }
      };
    }
  });
}
/* ================= QARJÍ AI — aqıllı qarız kómekshisi ================= */
function kmTrust(name) {
  const k = String(name || '').trim().toLowerCase(); const done = S.debts.filter(d => d.type === 'given' && d.paid && String(d.name).trim().toLowerCase() === k);
  if (!done.length) return null; const ok = done.filter(d => !d.due || (d.paidAt || today()) <= d.due).length; return Math.round(ok / done.length * 100);
}
function kmRemind(d) {
  const diff = Math.round((fromIso(d.due) - fromIso(today())) / 864e5); const left = `${grp(debtLeft(d))} ${d.cur && d.cur !== 'UZS' ? d.cur : t('swm')}`;
  return d.type === 'given'
    ? `${t('Sálem')}, ${d.name}! ${(d.date || today()).split('-').reverse().join('.')} ${t('kúni alǵan qarızıńızdı eske salaman')}: ${left}. ${diff < 0 ? t('Múddeti') + ' ' + -diff + ' ' + t('kún aldın ótti') : diff === 0 ? t('Qaytarıw múddeti — búgin') : t('Qaytarıw múddeti') + ': ' + d.due.split('-').reverse().join('.') + ' (' + diff + ' ' + t('kún qaldı') + ')'}. ${t('Raxmet!')}`
    : `${t('Sálem')}, ${d.name}! ${t('Sizden alǵan qarızımdı umıtpadım')}: ${left}. ${d.due.split('-').reverse().join('.')} ${t('ǵa shekem qaytaraman. Raxmet!')}`;
}
function kmInsights() {
  const act = S.debts.filter(d => !d.paid); const out = [];
  const late = act.filter(d => d.due && d.due < today());
  const soon = act.filter(d => d.due >= today() && (fromIso(d.due) - fromIso(today())) / 864e5 <= 3);
  const taken = act.filter(d => d.type === 'taken');
  late.forEach(d => out.push(['alarm-clock', `${d.type === 'given' ? `<b>${esc(d.name)}</b> ${t('qarızınıń múddeti ótti')} — ${t('eske salıw jiberiń')}` : `<b>${esc(d.name)}</b> ${t('ga qarızıńızdıń múddeti ótti')}`}`]));
  soon.forEach(d => out.push(['clock', `<b>${esc(d.name)}</b> — ${d.due === today() ? t('búgin') : Math.round((fromIso(d.due) - fromIso(today())) / 864e5) + ' ' + t('kún qaldı')} (${short(debtUZS(d))})`]));
  if (taken.length) { const tot = taken.reduce((a, d) => a + debtUZS(d), 0); const far = taken.reduce((m, d) => d.due > m ? d.due : m, today()); const days = Math.max(1, Math.round((fromIso(far) - fromIso(today())) / 864e5));
    out.push(['coins', `${t('Barlıq qarızdı uaqtında qaytarıw ushın kúnine')} <b>${short(Math.ceil(tot / days))}</b> ${t('jıynań')}`]); }
  const free = totalBal() - taken.reduce((a, d) => a + debtUZS(d), 0);
  if (taken.length) out.push(['scale', free >= 0 ? `${t('Balansıńız barlıq qarızlardı jabıwǵa jetedi')} ✓` : `${t('Qarızdı jabıw ushın')} <b>${short(-free)}</b> ${t('jetispeydi')}`]);
  if (!out.length) out.push(['sparkles', act.length ? t('Barlıq qarızlar tártipte. Múddetler jaqınlasqanda eskertemen.') : t('Aktiv qarız joq. Qarjıńız tınısh!')]);
  return out.slice(0, 4);
}
/* ---------- Qarız kartası (hámme jerde birdey) ---------- */
function kmDebtCard(d) {
  const diff = d.due ? Math.round((fromIso(d.due) - fromIso(today())) / 864e5) : null; const p = d.amount ? Math.round((d.paidAmt || 0) / d.amount * 100) : 0; const tr = d.type === 'given' ? kmTrust(d.name) : null;
  const st = d.paid ? ['done', t('Jabıldı')] : diff == null ? ['', t('Múddetsiz')] : diff < 0 ? ['late', -diff + ' ' + t('kún keshikti')] : diff === 0 ? ['late', t('Búgin')] : diff <= 3 ? ['soon', diff + ' ' + t('kún qaldı')] : ['', diff + ' ' + t('kún qaldı')];
  return `<div class="card qa-d ${d.paid ? 'paid' : ''}">
    <div class="qa-dh"><span class="qa-av">${esc(initials(d.name))}</span><div class="r-t"><div class="ell">${esc(d.name)}</div><small class="ell">${d.type === 'given' ? t('Men berdim') : t('Men aldım')}${d.phone ? ' · +998 ' + fmtPhone(d.phone) : ''}${tr != null ? ` · ${ic('shield-check')}${tr}%` : ''}</small></div><span class="qa-st ${st[0]}">${st[1]}</span></div>
    <div class="qa-am"><b class="num">${grp(debtLeft(d))}<i> ${d.cur && d.cur !== 'UZS' ? d.cur : 'uzs'}</i></b><small>${p ? `${t('tólendi')} ${p}% · ${grp(d.paidAmt)} / ${grp(d.amount)}` : `${t('jámi')} ${grp(d.amount)}`}</small></div>
    <div class="qa-pr"><i style="width:${d.paid ? 100 : p}%"></i></div>
    ${d.note ? `<small class="qa-note ell">${esc(d.note)}</small>` : ''}
    ${d.paid ? `<div class="qa-act one"><button class="btn ghost sm" data-ddel="${d.id}">${ic('trash-2')}${t('Óshiriw')}</button></div>` :
    `<div class="qa-act"><button class="btn ghost sm" data-drem="${d.id}">${ic('bell-ring')}${t('Eske salıw')}</button><button class="btn ghost sm" data-dpart="${d.id}">${ic('split')}${t('Bólip')}</button><button class="btn pri sm" data-dpay="${d.id}">${ic('check')}${t('Jabıw')}</button></div>`}
  </div>`;
}
function kmBindDebts(el) {
  const find = id => S.debts.find(x => x.id === id);
  $$('[data-ded]', el).forEach(b => b.onclick = () => { const d = find(b.dataset.ded); if (!d) return; Sheet.stack.length && Sheet.close(); setTimeout(() => openDebtNew(d.type, d), Sheet.stack.length ? 250 : 0); });
  $$('[data-dpay]', el).forEach(b => b.onclick = () => { const d = find(b.dataset.dpay); d.paidAmt = d.amount; d.paid = true; d.paidAt = today(); save(); renderView(); Sheet.stack.length && Sheet.refresh(); confetti(60); toast(t('Qarız jabıldı'), { icon: 'check' }); });
  $$('[data-ddel]', el).forEach(b => b.onclick = () => { S.debts = S.debts.filter(x => x.id !== b.dataset.ddel); save(); renderView(); Sheet.stack.length && Sheet.refresh(); });
  $$('[data-dpart]', el).forEach(b => b.onclick = () => { const d = find(b.dataset.dpart); Sheet.stack.length && Sheet.close();
    setTimeout(() => Sheet.open({ title: t('Bólip tólew'), html: () => `<p class="muted" style="margin:0 0 10px">${esc(d.name)} · ${t('qaldı')}: <b class="num">${grp(debtLeft(d))}</b></p>
        <div class="field"><label>${t('Summa')}</label>${moneyInput('dpA')}</div>
        <div class="chips">${[25, 50, 75].map(q => `<button class="chip" data-dq="${q}">${q}%</button>`).join('')}</div>
        <button class="btn pri" id="dpOk">${t('Saqlaw')}</button>`,
      mount: e2 => { bindMoney(e2); $$('[data-dq]', e2).forEach(q => q.onclick = () => $('#dpA').value = grp(Math.round(debtLeft(d) * q.dataset.dq / 100)));
        $('#dpOk').onclick = () => { const a = Math.min(parseMoney($('#dpA').value), debtLeft(d)); if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
          d.paidAmt = (d.paidAmt || 0) + a; d.parts = [...(d.parts || []), { a, date: today() }]; if (debtLeft(d) <= 0) { d.paid = true; d.paidAt = today(); confetti(60); }
          save(); Sheet.close(); renderView(); toast(t('Tólem jazıldı'), { icon: 'check' }); }; } }), Sheet.stack.length ? 0 : 0); });
  $$('[data-drem]', el).forEach(b => b.onclick = () => { const d = find(b.dataset.drem); const txt = kmRemind(d); Sheet.stack.length && Sheet.close();
    Sheet.open({ title: t('AI eske salıw xatı'), html: () => `<div class="card qa-msg"><span class="qa-ai">${ic('sparkles')}</span><textarea class="inp ta" id="rmT">${esc(txt)}</textarea></div>
        <div class="qa-share">${d.phone ? `<button class="btn pri" id="rmS">${ic('message-square-text')}SMS</button>` : ''}<button class="btn ink" id="rmTg">${ic('send')}Telegram</button><button class="btn ghost" id="rmC">${ic('copy')}${t('Kóshiriw')}</button></div>`,
      mount: () => { const v = () => $('#rmT').value;
        if ($('#rmS')) $('#rmS').onclick = () => location.href = `sms:+998${d.phone}?body=${encodeURIComponent(v())}`;
        $('#rmTg').onclick = () => window.open(`https://t.me/share/url?url=${encodeURIComponent('E-esap')}&text=${encodeURIComponent(v())}`, '_blank');
        $('#rmC').onclick = () => { navigator.clipboard?.writeText(v()); toast(t('Kóshirildi'), { icon: 'copy' }); }; } }); });
}
/* Tarazı — kim kimge qarızdar, kórinip turadı */
function kmWho(compact) {
  const act = S.debts.filter(d => !d.paid); const G = act.filter(d => d.type === 'given'), T = act.filter(d => d.type === 'taken');
  const sumOf = l => l.reduce((a, d) => a + debtUZS(d), 0); const m = kmMainDebt();
  const dd = m && m.due ? Math.round((fromIso(m.due) - fromIso(today())) / 864e5) : null;
  const avs = l => `<span class="kw-av">${l.slice(0, 3).map(d => `<i>${esc(initials(d.name))}</i>`).join('')}${l.length > 3 ? `<i class="more">+${l.length - 3}</i>` : ''}</span>`;
  const row = (l, cls, ic1, lbl) => `<div class="kw-r ${cls}"><span class="kw-ic">${ic(ic1)}</span><span class="kw-t"><small>${t(lbl)}</small><b class="num">${l.length ? (cls === 'in' ? '+' : '−') + short(sumOf(l)) : '0'}</b></span>${l.length ? avs(l) : `<span class="kw-none">${t('joq')}</span>`}</div>`;
  return `<div class="kw ${compact ? 'kwc' : ''}">
    ${row(G, 'in', 'arrow-down-left', 'Maǵan qaytaradı')}
    ${row(T, 'out', 'arrow-up-right', 'Men qaytaraman')}
    ${m ? `<div class="kw-next ${dd != null && dd < 0 ? 'late' : ''}">${ic('bell')}<span class="ell"><b>${esc(m.name)}</b> · ${dd == null ? t('múddetsiz') : dd < 0 ? -dd + ' ' + t('kún keshikti') : dd === 0 ? t('búgin') : dd + ' ' + t('kún qaldı')}</span></div>` : `<div class="kw-next">${ic('check')}<span>${t('Aktiv qarız joq')}</span></div>`}
  </div>`;
}
function kmShake(give, take, compact) {
  const tot = give + take; const gp = tot ? Math.round(give / tot * 100) : 50;
  return `<div class="hs ${compact ? 'cp' : ''}">
    <div class="hs-ico"><span class="hs-ring"></span><span class="hs-ring b"></span><span class="hs-hand">${ic('handshake')}</span>
      ${compact ? `<i class="hs-c l num">${short(give)}</i><i class="hs-c r num">${short(take)}</i>` : ''}</div>
    ${compact ? '' : `<div class="hs-sides"><span><small>${ic('arrow-down-left')}${t('Maǵan qaytadı')}</small><b class="num">${short(give)}</b></span><span class="r"><small>${t('Men qaytaraman')}${ic('arrow-up-right')}</small><b class="num">${short(take)}</b></span></div>`}
    <div class="hs-bar"><i style="width:${gp}%"></i></div></div>`;
}
function kmScale(give, take) {
  const tot = give + take; const ang = tot ? clamp((take - give) / tot, -1, 1) * 14 : 0;
  return `<div class="tz" style="--a:${ang}deg">
    <svg viewBox="0 0 300 190" aria-hidden="true">
      <defs><linearGradient id="tzM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#FFCBA0"/><stop offset="1" stop-color="#9E8A7A"/></linearGradient>
        <linearGradient id="tzP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7F1"/><stop offset="1" stop-color="#C2AA96"/></linearGradient></defs>
      <ellipse cx="150" cy="180" rx="70" ry="6" fill="rgba(0,0,0,.35)"/>
      <path d="M118 178h64l-10-14h-44z" fill="url(#tzM)"/><rect x="145" y="40" width="10" height="126" rx="4" fill="url(#tzM)"/>
      <circle cx="150" cy="38" r="9" fill="url(#tzM)"/>
      <g class="tz-beam"><rect x="40" y="34" width="220" height="7" rx="3.5" fill="url(#tzM)"/>
        <g class="tz-pan l"><path d="M52 41 30 104M52 41 74 104" stroke="#F0E0D3" stroke-width="1.4"/><path d="M22 104h60c0 12-13 20-30 20s-30-8-30-20z" fill="url(#tzP)"/>
          <g class="tz-c">${[0, 1, 2, 3].slice(0, give ? clamp(Math.ceil(give / (tot || 1) * 4), 1, 4) : 0).map(i => `<ellipse cx="52" cy="${100 - i * 5}" rx="15" ry="4.5" class="tzc"/>`).join('')}</g></g>
        <g class="tz-pan r"><path d="M248 41 226 104M248 41 270 104" stroke="#F0E0D3" stroke-width="1.4"/><path d="M218 104h60c0 12-13 20-30 20s-30-8-30-20z" fill="url(#tzP)"/>
          <g class="tz-c">${[0, 1, 2, 3].slice(0, take ? clamp(Math.ceil(take / (tot || 1) * 4), 1, 4) : 0).map(i => `<ellipse cx="248" cy="${100 - i * 5}" rx="15" ry="4.5" class="tzc"/>`).join('')}</g></g></g>
    </svg>
    <div class="tz-lbl l"><small>${t('Maǵan qaytadı')}</small><b class="num">${short(give)}</b></div>
    <div class="tz-lbl r"><small>${t('Men qaytaraman')}</small><b class="num">${short(take)}</b></div></div>`;
}
function kmMainDebt() {
  const act = S.debts.filter(d => !d.paid); if (!act.length) return null;
  return [...act].sort((a, b) => (a.due || '9999').localeCompare(b.due || '9999') || debtUZS(b) - debtUZS(a))[0];
}
function kmDebtRing(d) {
  const start = fromIso(d.date || today()), end = fromIso(d.due || today()); const total = Math.max(1, (end - start) / 864e5); const left = Math.round((end - fromIso(today())) / 864e5);
  const p = clamp(1 - left / total, 0, 1); const C = 2 * Math.PI * 34;
  return `<div class="dr ${left < 0 ? 'late' : ''}"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" class="dr-b"/><circle cx="40" cy="40" r="34" class="dr-f" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - (left < 0 ? 1 : p))}"/></svg>
    <span><b class="num">${Math.abs(left)}</b><small>${left < 0 ? t('kún ótti') : t('kún')}</small></span></div>`;
}
function openDebtList(type) {
  UI.dTab = type || UI.dTab || 'given';
  Sheet.open({ title: t('Barlıq qarızlar'),
    html: () => { const list = S.debts.filter(d => d.type === UI.dTab).sort((a, b) => a.paid - b.paid || (a.due || '').localeCompare(b.due || ''));
      return `<div class="seg" style="margin-bottom:12px"><button data-dt="given" class="${UI.dTab === 'given' ? 'on' : ''}">${t('Berilgen')}</button><button data-dt="taken" class="${UI.dTab === 'taken' ? 'on' : ''}">${t('Alınǵan')}</button></div>
        <div class="qa-list">${list.length ? list.map(kmDebtCard).join('') : `<div class="card empty"><span class="e-ic">${ic('hand-coins')}</span>${t('Bul bólimde qarız joq')}</div>`}</div>`; },
    mount: el => { $$('[data-dt]', el).forEach(b => b.onclick = () => { UI.dTab = b.dataset.dt; Sheet.refresh(); }); kmBindDebts(el); } });
}
function openDebts() {
  Page.open({
    title: t('Qarızlar'),
    right: `<button class="pg-btn" id="dAdd" aria-label="add">${ic('plus')}</button>`,
    html: () => {
      const act = S.debts.filter(d => !d.paid); const give = act.filter(d => d.type === 'given').reduce((a, d) => a + debtUZS(d), 0), take = act.filter(d => d.type === 'taken').reduce((a, d) => a + debtUZS(d), 0);
      const net = give - take; const m = kmMainDebt(); const others = S.debts.length - (m ? 1 : 0);
      return `<section class="qa-hero">
          <div class="qa-top"><span class="qa-ai">${ic('users')}</span><div><b>${t('Kim qarızdar?')}</b><small>${net > 0 ? t('Sizge qaytatuǵın kóbirek') : net < 0 ? t('Siz qaytaratuǵın kóbirek') : t('Esap teń')}</small></div>
            <div class="qa-net"><small>${t('Sap jaǵday')}</small><b class="num">${net >= 0 ? '+' : '−'}${short(Math.abs(net))}</b></div></div>
          ${kmWho()}
        </section>
        ${m ? `<div class="qa-main-cap"><span>${ic('flame')}${t('Eń shuǵıl qarız')}</span></div>
          <div class="qa-main">${kmDebtRing(m)}${kmDebtCard(m)}</div>` : `<div class="card empty"><span class="e-ic">${ic('hand-coins')}</span>${t('Aktiv qarız joq. Esap teń!')}</div>`}
        ${others > 0 ? `<button class="qa-more" id="dMore"><span class="qa-stack">${S.debts.filter(d => d !== m).slice(0, 3).map(d => `<i>${esc(initials(d.name))}</i>`).join('')}</span><span class="r-t"><div>${t('Basqa qarızlar')}</div><small>${others} ${t('qarız')}</small></span>${ic('chevron-right')}</button>` : ''}
        <div class="card qa-ins"><h4>${ic('sparkles')}${t('AI keńesleri')}</h4>${kmInsights().map(([i, x]) => `<p>${ic(i)}<span>${x}</span></p>`).join('')}</div>
        <button class="btn pri" id="dNew">${ic('plus')}${t('Qarız jaratıw')}</button>`;
    },
    mount: el => {
      kmBindDebts(el);
      const mo = $('#dMore', el); if (mo) mo.onclick = () => openDebtList();
      $('#dNew', el).onclick = $('#dAdd', el).onclick = () => openDebtNew(UI.dTab || 'given');
      const tz = null; if (tz) { const a = tz.style.getPropertyValue('--a'); tz.style.setProperty('--a', '0deg'); requestAnimationFrame(() => setTimeout(() => tz.style.setProperty('--a', a), 60)); }
    }
  });
}

/* ================= MAQSETLER — haqıyqıy shiyshe kopilka ================= */
function kmPig(g, from, uidp = '') {
  // 2D shiyshe banka-kopilka: kontrastlı shiyshe, teńgeler qaqpaqtaǵı tesikten túsip úyiledi
  const p = clamp(g.saved / g.target, 0, 1); const f = from != null ? clamp(from, 0, 1) : p; const id = 'cj' + String(g.id).replace(/\W/g, '') + uidp;
  const body = 'M58 62c0 6-6 9-14 15-10 8-14 18-14 34v82c0 20 14 30 40 30h60c26 0 40-10 40-30v-82c0-16-4-26-14-34-8-6-14-9-14-15z';
  const inBody = (x, y) => x > 36 && x < 164 && y < 218 && y > 70 && !(y < 92 && (x < 52 || x > 148));
  const lvl = v => 214 - 140 * v; const mound = x => ((x - 100) / 64) ** 2 * 12;
  const all = [];
  for (let row = 0, y = 212; y > 72; row++, y -= 5.6) {
    for (let x = 44 + (row % 2) * 12; x < 160; x += 23) {
      const jx = x + ((row * 7 + x) % 5) - 2, jy = y + ((x * 3 + row) % 3) - 1; if (!inBody(jx, jy)) continue;
      if (jy < lvl(p) + mound(jx)) continue;
      all.push({ jx, jy, r: ((row * 13 + x) % 21) - 10, isNew: from != null && jy < lvl(f) + mound(jx) });
    }
  }
  // kishi summa bolsa da — keminde bir teńge kórinsin
  if (p > 0 && !all.length) all.push({ jx: 100, jy: 212, r: 4, isNew: from != null });
  const news = all.filter(c => c.isNew); const nN = news.length;
  const stp = nN ? clamp(1.5 / nN, .045, .16) : 0; let k = 0;
  const coin = c => `<ellipse cy="3" rx="13.5" ry="4.8" fill="#7A4E02"/><ellipse rx="13.5" ry="4.8" fill="url(#${id}c)" stroke="#9C6A08" stroke-width=".6"/><ellipse rx="9.4" ry="3" fill="none" stroke="rgba(255,248,210,.85)" stroke-width=".9"/>`;
  const coins = all.map(c => {
    if (!c.isNew) return `<g transform="translate(${c.jx} ${c.jy}) rotate(${c.r})">${coin(c)}</g>`;
    const d = (.55 + k++ * stp).toFixed(2);
    return `<g transform="translate(${c.jx} ${c.jy})"><g class="cn nw" style="--sx:${(100 - c.jx).toFixed(0)}px;--sy:${(58 - c.jy).toFixed(0)}px;animation-delay:${d}s"><g transform="rotate(${c.r})">${coin(c)}</g></g></g>`;
  }).join('');
  const land = (.55 + Math.max(0, nN - 1) * stp + .62).toFixed(2);
  const side = p > .08 ? [[46, lvl(p) + 18, -12], [154, lvl(p) + 20, 14]].filter(([x, y]) => y < 206).map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-3" y="-13" width="6" height="26" rx="3" fill="#8A5A04"/><ellipse cx="1.5" rx="4.6" ry="13" fill="url(#${id}c)"/></g>`).join('') : '';
  return `<div class="cj ${p >= 1 ? 'full' : ''} ${from != null && nN ? 'drop' : ''}" style="--land:${land}s;--drops:${Math.min(nN, 6) || 1};--dstep:${Math.max(stp, .12).toFixed(2)}s">
  <svg viewBox="0 0 200 250" aria-hidden="true">
    <defs>
      <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6C8"/><stop offset=".35" stop-color="#FFD54A"/><stop offset=".7" stop-color="#E8A817"/><stop offset="1" stop-color="#A86F05"/></linearGradient>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,255,255,.46)"/><stop offset=".16" stop-color="rgba(255,255,255,.1)"/><stop offset=".5" stop-color="rgba(255,255,255,.02)"/><stop offset=".84" stop-color="rgba(255,255,255,.08)"/><stop offset="1" stop-color="rgba(255,255,255,.4)"/></linearGradient>
      <linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".42" stop-color="#D9D3E6"/><stop offset=".55" stop-color="#9F96B4"/><stop offset="1" stop-color="#EEEAF6"/></linearGradient>
      <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,255,255,0)"/><stop offset=".5" stop-color="rgba(255,255,255,.55)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></linearGradient>
      <radialGradient id="${id}d" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="rgba(22,8,70,.28)"/><stop offset="1" stop-color="rgba(14,4,48,.62)"/></radialGradient>
      <clipPath id="${id}k"><path d="${body}"/></clipPath>
      <filter id="${id}b"><feGaussianBlur stdDeviation="1.2"/></filter>
    </defs>
    <ellipse class="cj-sh" cx="100" cy="240" rx="74" ry="7"/>
    <path class="cj-out" d="${body}"/>
    <path class="cj-back" d="${body}" fill="url(#${id}d)"/>
    <g clip-path="url(#${id}k)">${coins}${side}<rect class="cj-shine" x="-60" y="40" width="46" height="200" fill="url(#${id}s)" transform="skewX(-18)"/></g>
    <path class="cj-glass" d="${body}" fill="url(#${id}g)"/>
    <path class="cj-rim" d="M44 222c14 8 98 8 112 0"/>
    <path class="cj-hl" d="M44 108v80" filter="url(#${id}b)"/><path class="cj-hl t" d="M54 100v20"/>
    <path class="cj-hl r" d="M156 116v66"/>
    <rect class="cj-neck" x="56" y="50" width="88" height="14" rx="5"/>
    <g class="cj-lid"><rect x="50" y="26" width="100" height="26" rx="7" fill="url(#${id}m)" stroke="rgba(60,40,110,.35)" stroke-width="1"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<rect x="${55 + i * 8.6}" y="30" width="2.2" height="19" rx="1" fill="rgba(60,44,100,.28)"/>`).join('')}
      <ellipse cx="100" cy="27" rx="50" ry="6" fill="#FBF9FF"/><rect x="82" y="24.5" width="36" height="5" rx="2.5" fill="#24133F"/></g>
    <g class="cj-drop"><g><rect x="94" y="-26" width="12" height="28" rx="6" fill="url(#${id}c)" stroke="#9C6A08" stroke-width=".6"/><rect x="97" y="-22" width="2" height="20" rx="1" fill="rgba(255,255,255,.9)"/></g></g>
  </svg>
  ${p >= 1 ? `<span class="pig-ok">${ic('sparkles')}${t('Kopilka toldı!')}</span>` : ''}</div>`;
}
/* Maqset súwreti — qısıp, localStorage ǵa sıyatuǵın JPEG etip saqlaymız */
function kmImgFile(file, max = 900) {
  return new Promise((res, rej) => {
    if (!file || !/^image\//.test(file.type)) return rej(new Error('type'));
    const fr = new FileReader(); fr.onerror = rej;
    fr.onload = () => { const im = new Image(); im.onerror = rej; im.onload = () => {
      const s = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas');
      c.width = Math.round(im.width * s); c.height = Math.round(im.height * s); const x = c.getContext('2d');
      x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL('image/jpeg', .82)); }; im.src = fr.result; };
    fr.readAsDataURL(file);
  });
}
/* ===== Óz dizaynımızdaǵı tańlaw — barlıq native <select> avtomat almastırıladı ===== */
const KSel = (() => {
  const parts = txt => { const i = txt.indexOf(' — '); return i > 0 ? [txt.slice(0, i), txt.slice(i + 3)] : [txt, '']; };
  const curTxt = sel => { const o = sel.options[sel.selectedIndex]; return o ? o.textContent : ''; };
  function paint(sel) { const b = sel && sel._kb; if (!b) return; const [a, c] = parts(curTxt(sel)); const tt = b.querySelector('.ks-t'), v = b.querySelector('.ks-v'); if (tt.textContent !== a) tt.textContent = a; if (v.textContent !== c) v.textContent = c; if (v.hidden !== !c) v.hidden = !c; if (b.disabled !== sel.disabled) b.disabled = sel.disabled; }
  function enhance(sel) {
    if (sel._kb) return;
    const b = document.createElement('button'); b.type = 'button';
    b.className = sel.classList.contains('inp') ? 'inp ksel ks-full' : 'ksel ks-mini';
    b.innerHTML = `<span class="ks-t"></span><span class="ks-v num"></span><span class="ks-c">${ic('chevron-down')}</span>`;
    b.setAttribute('aria-haspopup', 'listbox');
    sel._kb = b; sel.classList.add('ks-hid'); sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true'); sel.after(b); paint(sel); refreshIcons();
    b.onclick = () => open(sel);
    sel.addEventListener('change', () => paint(sel));
  }
  let cur = null;
  function close() { if (!cur) return; const c = cur; cur = null; c.ov.classList.remove('on'); c.sel._kb && c.sel._kb.classList.remove('open'); setTimeout(() => c.ov.remove(), 200); }
  function open(sel) {
    close(); sfx('tap'); const b = sel._kb, r = b.getBoundingClientRect();
    const ov = document.createElement('div'); ov.className = 'ks-ov';
    ov.innerHTML = `<div class="ks-pop" role="listbox">${[...sel.options].map((o, i) => { const [a, c] = parts(o.textContent); return `<button type="button" role="option" class="ks-o ${i === sel.selectedIndex ? 'on' : ''}" data-i="${i}" ${o.disabled ? 'disabled' : ''}><span class="ks-t">${esc(a)}</span>${c ? `<span class="ks-v num">${esc(c)}</span>` : ''}<span class="ks-ck">${ic('check')}</span></button>`; }).join('')}</div>`;
    document.body.appendChild(ov); refreshIcons();
    const pop = ov.firstElementChild, vh = innerHeight, vw = innerWidth;
    const w = Math.min(vw - 16, Math.max(r.width, 190));
    pop.style.width = w + 'px'; pop.style.left = clamp(r.right - w > 8 && r.left + w > vw - 8 ? r.right - w : r.left, 8, vw - w - 8) + 'px';
    const below = vh - r.bottom - 14, above = r.top - 14, h = pop.scrollHeight;
    if (below >= Math.min(h, 220) || below >= above) { pop.style.top = (r.bottom + 6) + 'px'; pop.style.maxHeight = Math.min(340, below) + 'px'; pop.classList.add('dn'); }
    else { pop.style.bottom = (vh - r.top + 6) + 'px'; pop.style.maxHeight = Math.min(340, above) + 'px'; pop.classList.add('up'); }
    cur = { ov, sel }; b.classList.add('open');
    requestAnimationFrame(() => ov.classList.add('on'));
    const on = pop.querySelector('.ks-o.on'); if (on) pop.scrollTop = on.offsetTop - pop.clientHeight / 2 + on.offsetHeight / 2;
    ov.addEventListener('click', e => { const o = e.target.closest('.ks-o'); if (o && !o.disabled) { const i = +o.dataset.i; if (i !== sel.selectedIndex) { sel.selectedIndex = i; sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); } paint(sel); } close(); });
  }
  // programma ishinde value ózgertilse de jazıw jańalansın
  for (const k of ['value', 'selectedIndex']) { const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, k); if (d && d.set) Object.defineProperty(HTMLSelectElement.prototype, k, { configurable: true, enumerable: d.enumerable, get() { return d.get.call(this); }, set(v) { d.set.call(this, v); paint(this); } }); }
  addEventListener('resize', close); addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  addEventListener('scroll', e => { if (cur && !cur.ov.contains(e.target)) close(); }, true);
  const scan = () => { document.querySelectorAll('select:not(.ks-hid)').forEach(enhance); document.querySelectorAll('select.ks-hid').forEach(s => { paint(s); if (!s._kb.isConnected) { s._kb = null; s.classList.remove('ks-hid'); enhance(s); } }); if (cur && !cur.sel.isConnected) close(); };
  { let q = 0; new MutationObserver(() => { if (!q) q = requestAnimationFrame(() => { q = 0; scan(); }); }).observe(document.documentElement, { childList: true, subtree: true }); }
  return { scan, close };
})();
function kmGoalStats(g) {
  const left = Math.max(0, g.target - g.saved); const dl = g.due ? Math.round((fromIso(g.due) - fromIso(today())) / 864e5) : null; const months = dl != null ? Math.max(1, Math.ceil(dl / 30.4)) : null;
  const useM = dl != null && dl >= 31, tv = dl == null ? '—' : useM ? Math.round(dl / 30.4) : Math.max(0, dl);
  const box = (icn, c, lbl, val) => `<div class="gs-c"><div class="gs-h"><i class="gs-i" style="--c:${c}">${ic(icn)}</i><small>${t(lbl)}</small></div><b class="num">${val}</b></div>`;
  return `<div class="g-st">${box('wallet', '#7B5CFA', 'Qaldı', short(left))}${box(useM ? 'calendar-range' : 'calendar-clock', '#FF8A1F', useM ? 'Ay qaldı' : 'Kún qaldı', tv)}${box('trending-up', '#16A34A', 'Ayına', months && left ? short(Math.ceil(left / months)) : '—')}</div>`;
}
function kmMainGoal() { return S.goals.find(g => g.id === S.mainGoal) || S.goals.find(g => g.saved < g.target) || S.goals[0]; }
function kmGoalAdd(g) {
  Sheet.open({ title: t('Kopilkaǵa aqsha salıw'),
    html: () => `<div class="field"><label>${t('Summa')}</label><div class="km-amt"><input class="num money" id="gA" inputmode="numeric" placeholder="0" autocomplete="off"><span class="km-cur">UZS</span></div></div>
      <div class="chips">${[50000, 100000, 500000, 1000000].map(v => `<button class="chip" data-gq="${v}">+${short(v)}</button>`).join('')}<button class="chip" data-gq="${Math.max(0, g.target - g.saved)}">${t('Hámmesi')}</button></div>
      <div class="field"><label>${t('Qaysı hamyannan alınadı')}</label><select class="inp" id="gW"><option value="">${t('Hamyannan almaw')}</option>${S.wallets.map(w => `<option value="${w.id}">${esc(t(w.name))} — ${grp(walletBal(w.id))}</option>`).join('')}</select></div>
      <button class="btn pri" id="gAOk">${ic('coins')}${t('Salıw')}</button>`,
    mount: e3 => { bindMoney(e3); $$('[data-gq]', e3).forEach(q => q.onclick = () => $('#gA').value = grp(+q.dataset.gq));
      $('#gAOk').onclick = () => { const a = parseMoney($('#gA').value); if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
        const w = $('#gW').value; if (w) S.tx.push({ id: uid(), type: 'expense', amount: a, cat: 'other', wallet: w, date: today(), note: `${t('Jinaq')}: ${g.name}`, ts: Date.now() });
        UI.goalDrop = { id: g.id, from: clamp(g.saved / g.target, 0, 1) }; setTimeout(() => { const ns = $$('.pig-stage .cj.drop .cn.nw'); const pick = ns.length > 9 ? ns.filter((_, i) => i % Math.ceil(ns.length / 9) === 0) : ns; pick.forEach(n => setTimeout(() => sfx('clink'), (parseFloat(n.style.animationDelay) + .6) * 1000)); if (!ns.length) sfx('coin'); }, 30); const was = g.saved >= g.target; g.saved += a; S.mainGoal = g.id; save(); vib(12); Sheet.close(); renderView();
        if (!was && g.saved >= g.target) setTimeout(() => { confetti(150); toast(t('Kopilka toldı! Maqsetke jettińiz'), { icon: 'party-popper', ms: 3500 }); }, 1500); }; } });
}
function openGoals() {
  Page.open({
    title: t('Maqsetler'),
    right: `<button class="pg-btn" id="gAdd" aria-label="add">${ic('plus')}</button>`,
    html: () => { const g = kmMainGoal(); if (!g) return `<div class="card empty"><span class="e-ic">${ic('coins')}</span>${t('Ele maqset joq. Ármanıńız ushın shiyshe kopilka ashıń!')}</div><button class="btn pri" id="gNew">${ic('plus')}${t('Jańa maqset')}</button>`;
      const p = clamp(g.saved / g.target * 100, 0, 100); const from = UI.goalDrop && UI.goalDrop.id === g.id ? UI.goalDrop.from : null; const others = S.goals.filter(x => x !== g);
      return `<section class="pig-stage ${p >= 100 ? 'done' : ''}">
          <div class="ps-top"><span class="ps-tag">${ic(g.icon)}${t('Tiykarǵı maqset')}</span><span class="ps-btns"><button class="ps-x" data-ged="${g.id}" aria-label="edit">${ic('square-pen')}</button><button class="ps-x" data-gdel="${g.id}" aria-label="delete">${ic('trash-2')}</button></span></div>
          <div class="ps-sw ${g.img ? 'has' : ''}" id="psSw">
            <div class="ps-sl">${kmPig(g, from)}</div>
            ${g.img ? `<div class="ps-sl"><figure class="ps-ph"><div class="ph-fr"><div class="phf-in"><img src="${g.img}" alt="" draggable="false"><i class="ph-gl"></i></div><span class="ph-sp a">✦</span><span class="ph-sp b">✦</span><span class="ph-sp c">✧</span></div><figcaption>${ic('sparkles')}${t('Ármanım')}</figcaption></figure></div>` : ''}
          </div>
          ${g.img ? `<div class="ps-dots" id="psDots"><i class="on"></i><i></i></div>` : ''}
          <div class="ps-name ell">${esc(t(g.name))}</div>
          <div class="ps-sum"><b class="num">${grp(g.saved)}</b><span class="num">/ ${grp(g.target)} ${cur()}</span></div>
          <div class="ps-bar"><i style="width:${p}%"></i><span class="num">${Math.round(p)}%</span></div>
        </section>
        ${kmGoalStats(g)}
        <button class="btn pri" id="gIn" ${p >= 100 ? 'disabled' : ''}>${ic('coins')}${p >= 100 ? t('Kopilka toldı') : t('Aqsha salıw')}</button>
        ${others.length ? `<button class="qa-more" id="gMore"><span class="qa-stack">${others.slice(0, 3).map(o => `<i>${ic(o.icon)}</i>`).join('')}</span><span class="r-t"><div>${t('Basqa maqsetler')}</div><small>${others.length} ${t('maqset')}</small></span>${ic('chevron-right')}</button>` : ''}
        <button class="btn ghost" id="gNew">${ic('plus')}${t('Jańa maqset')}</button>`; },
    mount: el => {
      UI.goalDrop = null;
      { const sw = $('#psSw', el), dots = $('#psDots', el); if (sw && dots) { const ds = $$('i', dots); sw.addEventListener('scroll', () => { const i = Math.round(sw.scrollLeft / Math.max(1, sw.clientWidth)); ds.forEach((d, j) => d.classList.toggle('on', j === i)); }, { passive: true }); ds.forEach((d, j) => d.onclick = () => sw.scrollTo({ left: j * sw.clientWidth, behavior: 'smooth' })); } }
      const nw = (eg = null) => Sheet.open({
        title: t(eg ? 'Maqsetti redaktorlaw' : 'Jańa maqset'),
        html: () => `<div class="field"><label>${t('Maqset atı')}</label><input class="inp" id="gN" placeholder="${t('Mısalı: Mashina')}" maxlength="26" value="${eg ? esc(eg.name) : ''}"></div>
          <div class="field"><label>${t('Kerekli summa')}</label><div class="km-amt"><input class="num money" id="gT" inputmode="numeric" placeholder="0" autocomplete="off" value="${eg ? grp(eg.target) : ''}"><span class="km-cur">UZS</span></div></div>
          ${eg ? `<div class="field"><label>${t('Jıynalǵan summa')}</label><div class="km-amt"><input class="num money" id="gS" inputmode="numeric" placeholder="0" autocomplete="off" value="${eg.saved ? grp(eg.saved) : ''}"><span class="km-cur">UZS</span></div></div>` : ''}
          <div class="field"><label>${t('Qashanǵa shekem')}</label><input class="inp" type="date" id="gD" value="${eg ? (eg.due || '') : iso(addDays(new Date(), 182))}"></div>
          <div class="field"><label>${t('Ármanıńız súwreti')}</label><div class="g-up ${eg && eg.img ? 'has' : ''}" id="gUp"><input type="file" accept="image/*" id="gF" hidden>
            <button type="button" class="g-up-b" id="gUpB"><span class="g-up-pv">${eg && eg.img ? `<img src="${eg.img}" alt="">` : ''}</span><span class="g-up-e">${ic('image-plus')}<b>${t('Súwret júklew')}</b><small>${t('Maqset betinde banka janında kórinedi')}</small></span></button>
            <button type="button" class="g-up-x" id="gUpX" aria-label="remove">${ic('x')}</button></div></div>
          <div class="field"><label>${t('Belgi')}</label><div class="chips">${['target', 'laptop', 'plane', 'car', 'house', 'graduation-cap', 'gift', 'smartphone', 'baby', 'heart'].map((i, k) => `<button class="chip ${(eg ? eg.icon === i : k === 0) ? 'on' : ''}" data-gi="${i}">${ic(i)}</button>`).join('')}</div></div>
          <button class="btn pri" id="gOk">${t('Saqlaw')}</button>`,
        mount: e2 => { bindMoney(e2); let icon = eg ? eg.icon : 'target'; let img = eg ? (eg.img || '') : '';
          const up = $('#gUp', e2), fi = $('#gF', e2), pv = $('.g-up-pv', e2);
          const setImg = v => { img = v; up.classList.toggle('has', !!v); pv.innerHTML = v ? `<img src="${v}" alt="">` : ''; };
          $('#gUpB', e2).onclick = () => fi.click();
          $('#gUpX', e2).onclick = () => setImg('');
          fi.onchange = () => { const f = fi.files && fi.files[0]; if (!f) return; up.classList.add('ld'); kmImgFile(f).then(v => { setImg(v); sfx('pop'); }).catch(() => toast(t('Súwret júklenbedi'), { icon: 'circle-alert' })).finally(() => { up.classList.remove('ld'); fi.value = ''; }); };
          $$('[data-gi]', e2).forEach(b => b.onclick = () => { icon = b.dataset.gi; $$('[data-gi]', e2).forEach(x => x.classList.toggle('on', x === b)); });
          $('#gOk').onclick = () => { const n = $('#gN').value.trim(), tg = parseMoney($('#gT').value); if (!n || !tg) return toast(t('Barlıq maydanlardı toltırıń'), { icon: 'circle-alert' });
            if (eg) { Object.assign(eg, { name: n, target: tg, saved: Math.max(0, parseMoney($('#gS').value)), icon, due: $('#gD').value || '', img }); if (!save() && img) { eg.img = ''; save(); toast(t('Súwret saqlanbadı: orın jetkiliksiz'), { icon: 'circle-alert' }); } Sheet.close(); renderView(); Page.stack.length && Page.refresh && Page.refresh(); toast(t('Saqlandı'), { icon: 'check' }); return; }
            const id = uid(); S.goals.push({ id, name: n, target: tg, saved: 0, icon, due: $('#gD').value || '', start: today(), img }); S.mainGoal = id; if (!save() && img) { S.goals[S.goals.length - 1].img = ''; save(); toast(t('Súwret saqlanbadı: orın jetkiliksiz'), { icon: 'circle-alert' }); } Sheet.close(); renderView(); }; }
      });
      $('#gNew', el) && ($('#gNew', el).onclick = () => nw()); $('#gAdd', el) && ($('#gAdd', el).onclick = () => nw());
      $$('[data-ged]', el).forEach(b => b.onclick = () => nw(S.goals.find(x => x.id === b.dataset.ged)));
      const g = kmMainGoal(); if ($('#gIn', el)) $('#gIn', el).onclick = () => kmGoalAdd(g);
      $$('[data-gdel]', el).forEach(b => b.onclick = async () => { if (await ask('Maqsetti óshiriw', 'Bul maqset óshiriledi.', 'Óshiriw', true)) { S.goals = S.goals.filter(x => x.id !== b.dataset.gdel); if (S.mainGoal === b.dataset.gdel) S.mainGoal = null; save(); renderView(); } });
      const mo = $('#gMore', el); if (mo) mo.onclick = () => Sheet.open({ title: t('Basqa maqsetler'),
        html: () => `<div class="gl">${S.goals.filter(x => x !== kmMainGoal()).map(o => { const p = clamp(o.saved / o.target * 100, 0, 100); return `<div class="card gl-r">
            <div class="gl-pig gl-cj">${kmPig(o, null, "s")}</div>
            <div class="gl-i"><div class="ell"><b>${esc(t(o.name))}</b></div><small class="num">${grp(o.saved)} / ${grp(o.target)}</small><div class="ps-bar sm"><i style="width:${p}%"></i></div>
              <div class="gl-a"><button class="btn ghost sm" data-gmain="${o.id}">${ic('star')}${t('Tiykarǵı etiw')}</button><button class="btn pri sm" data-gput="${o.id}" ${p >= 100 ? 'disabled' : ''}>${ic('coins')}</button></div></div></div>`; }).join('')}</div>`,
        mount: e4 => { $$('[data-gmain]', e4).forEach(b => b.onclick = () => { S.mainGoal = b.dataset.gmain; save(); Sheet.close(); renderView(); });
          $$('[data-gput]', e4).forEach(b => b.onclick = () => { const o = S.goals.find(x => x.id === b.dataset.gput); S.mainGoal = o.id; save(); Sheet.close(); renderView(); setTimeout(() => kmGoalAdd(o), 350); }); } });
    }
  });
}

function kmPlanTiles() {
  const g = S.goals; const d = S.debts.filter(x => !x.paid);
  const gs = g.reduce((a, x) => a + x.saved, 0), gt = g.reduce((a, x) => a + x.target, 0);
  return `<div class="km-two sv-two">
    <button class="pt lav" id="svG2"><span class="tag">${ic('target')}${t('Maqsetler')}</span><b class="pt-h num ell">${g.length ? Math.round(gs / (gt || 1) * 100) + '%' : ic('plus')}</b><span class="pt-t">${g.length} ${t('maqset')}</span>${g.length ? `<span class="bar"><i style="width:${clamp(gs / (gt || 1) * 100, 0, 100)}%"></i></span>` : ''}</button>
    <button class="pt ink" id="svD2"><span class="tag">${ic('hand-coins')}${t('Qarızlar')}</span><b class="pt-h num ell">${short(d.reduce((a, x) => a + debtUZS(x), 0))}</b><span class="pt-t">${d.length} ${t('aktiv qarız')}</span></button></div>`;
}
function kmGoalPlan(g) {
  const start = fromIso(g.start || g.created || today()); const end = g.due ? fromIso(g.due) : addDays(start, 365);
  const n = clamp(Math.ceil((end - start) / (864e5 * 30.4)), 1, 36); const per = Math.ceil(g.target / n); const done = Math.min(n, Math.floor(g.saved / per + 1e-9));
  return { n, per, done };
}
function openCalc() {
  let ex = '';
  const calc = v => { try { const r = Function('"use strict";return (' + v.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/,/g, '.').replace(/%/g, '/100') + ')')(); return isFinite(r) ? Math.round(r * 100) / 100 : ''; } catch (e) { return ''; } };
  Sheet.open({ title: t('Kalkulyator'),
    html: () => `<div class="calc"><div class="calc-d"><small id="clE">&nbsp;</small><b class="num" id="clR">0</b></div>
      <div class="calc-k">${['C', '⌫', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '00', '0', ',', '='].map(k => `<button class="ck ${/[÷×−+=]/.test(k) ? 'op' : /[C⌫%]/.test(k) ? 'fn' : ''} ${k === '=' ? 'eq' : ''}" data-k="${k}">${k}</button>`).join('')}</div></div>`,
    mount: el => { const E = $('#clE', el), R = $('#clR', el);
      const show = () => { E.textContent = ex || ' '; const r = calc(ex); R.textContent = r === '' ? (ex ? '…' : '0') : String(r).replace('.', ','); };
      $$('[data-k]', el).forEach(b => b.onclick = () => { const k = b.dataset.k; vib(4);
        if (k === 'C') ex = ''; else if (k === '⌫') ex = ex.slice(0, -1); else if (k === '=') { const r = calc(ex); ex = r === '' ? ex : String(r).replace('.', ','); } else ex += k; show(); }); } });
}
function openSaveCalc() {
  Sheet.open({ title: t('Jinaq kalkulyatorı'),
    html: () => `<div class="field"><label>${t('Qansha jıynaw kerek')}</label>${moneyInput('scT')}</div>
      <div class="field"><label>${t('Házir bar')}</label>${moneyInput('scH')}</div>
      <div class="field"><label>${t('Neshe ayda')}</label><input class="inp" id="scM" inputmode="numeric" value="12"></div>
      <div class="card kc-res" id="scR"></div>`,
    mount: el => { bindMoney(el); const r = () => { const tg = parseMoney($('#scT').value), h = parseMoney($('#scH').value), m = Math.max(1, +$('#scM').value || 1); const left = Math.max(0, tg - h);
        $('#scR').innerHTML = `<div><small>${t('Ayına jıynaw kerek')}</small><b class="num">${grp(Math.ceil(left / m))} ${cur()}</b></div><div><small>${t('Hápte sayın')}</small><b class="num">${grp(Math.ceil(left / (m * 4.345)))}</b></div><div><small>${t('Kúnine')}</small><b class="num">${grp(Math.ceil(left / (m * 30.4)))}</b></div>`; };
      $$('input', el).forEach(i => i.addEventListener('input', r)); r(); } });
}
function openDiscount() {
  Sheet.open({ title: t('Skidka kalkulyatorı'),
    html: () => `<div class="field"><label>${t('Baha')}</label>${moneyInput('dsP')}</div>
      <div class="field"><label>${t('Skidka')} %</label><div class="chips">${[5, 10, 15, 20, 30, 50].map(v => `<button class="chip ${v === 20 ? 'on' : ''}" data-dp="${v}">${v}%</button>`).join('')}</div></div>
      <div class="card kc-res" id="dsR"></div>`,
    mount: el => { bindMoney(el); let pc = 20; const r = () => { const p = parseMoney($('#dsP').value); const off = Math.round(p * pc / 100);
        $('#dsR').innerHTML = `<div><small>${t('Tólenetuǵın baha')}</small><b class="num">${grp(p - off)} ${cur()}</b></div><div><small>${t('Únemleysiz')}</small><b class="num">${grp(off)}</b></div>`; };
      $('#dsP').addEventListener('input', r); $$('[data-dp]', el).forEach(b => b.onclick = () => { pc = +b.dataset.dp; $$('[data-dp]', el).forEach(x => x.classList.toggle('on', x === b)); r(); }); r(); } });
}
function openSplit() {
  Sheet.open({ title: t('Esaptı bólisiw'),
    html: () => `<div class="field"><label>${t('Jámi summa')}</label>${moneyInput('spT')}</div>
      <div class="field"><label>${t('Adamlar sanı')}</label><div class="kc-step"><button class="pg-btn" id="spM">${ic('minus')}</button><b class="num" id="spN">2</b><button class="pg-btn" id="spP">${ic('plus')}</button></div></div>
      <div class="field"><label>${t('Shay puli')}</label><div class="chips">${[0, 5, 10, 15].map(v => `<button class="chip ${v === 0 ? 'on' : ''}" data-tp="${v}">${v}%</button>`).join('')}</div></div>
      <div class="card kc-res" id="spR"></div>`,
    mount: el => { bindMoney(el); let n = 2, tp = 0; const r = () => { const tot = parseMoney($('#spT').value) * (1 + tp / 100); $('#spN').textContent = n;
        $('#spR').innerHTML = `<div><small>${t('Hár adamǵa')}</small><b class="num">${grp(Math.ceil(tot / n))} ${cur()}</b></div><div><small>${t('Jámi')}</small><b class="num">${grp(Math.round(tot))}</b></div>`; };
      $('#spT').addEventListener('input', r); $('#spM').onclick = () => { n = Math.max(1, n - 1); r(); }; $('#spP').onclick = () => { n = Math.min(50, n + 1); r(); };
      $$('[data-tp]', el).forEach(b => b.onclick = () => { tp = +b.dataset.tp; $$('[data-tp]', el).forEach(x => x.classList.toggle('on', x === b)); r(); }); r(); } });
}
function openPercent() {
  Sheet.open({ title: t('Procent kalkulyatorı'),
    html: () => `<div class="field"><label>${t('Summa')}</label>${moneyInput('pcA')}</div><div class="field"><label>%</label><input class="inp" id="pcP" inputmode="decimal" value="12"></div><div class="card kc-res" id="pcR"></div>`,
    mount: el => { bindMoney(el); const r = () => { const a = parseMoney($('#pcA').value), p = parseFloat(String($('#pcP').value).replace(',', '.')) || 0; const v = Math.round(a * p / 100);
        $('#pcR').innerHTML = `<div><small>${p}% ${t('muǵdarı')}</small><b class="num">${grp(v)}</b></div><div><small>${t('Qosılǵanda')}</small><b class="num">${grp(a + v)}</b></div><div><small>${t('Alınǵanda')}</small><b class="num">${grp(a - v)}</b></div>`; };
      $$('input', el).forEach(i => i.addEventListener('input', r)); r(); } });
}
function renderServices() {
  const el = $('#v-services'); const fxDay = S.fx && S.fx.day;
  const goals = S.goals; const act = S.debts.filter(d => !d.paid); const m = kmMainDebt();
  const ppl = {}; act.forEach(d => { const k = d.name.trim(); (ppl[k] = ppl[k] || { name: k, give: 0, take: 0, due: d.due, n: 0 }); const p = ppl[k]; if (d.type === 'given') p.give += debtUZS(d); else p.take += debtUZS(d); p.n++; if (d.due && (!p.due || d.due < p.due)) p.due = d.due; });
  const people = Object.values(ppl).sort((a, b) => (a.due || '9').localeCompare(b.due || '9'));
  el.innerHTML = `
    <div class="page-head"><div><h1 class="page-title">${t('Xızmetler')}</h1><p>${t('Qurallar, kurslar, maqset hám qarızlar')}</p></div></div>
    <div class="sec-h"><h3>${t('Valyuta kursları')}</h3><button class="link" id="svFxAll">${fxDay ? t('MB kursı') : t('Demo kurs')}${ic('chevron-right')}</button></div>
    <div class="card fx-list">${['USD', 'EUR', 'RUB'].map(c => { const ch = FX_CHG[c] || 0; return `<button class="fx2" data-rate="${c}"><span class="fx2-l"><b class="num">${fxNum(RATES[c] || 0)}</b><small><span class="fdot ${ch > 0 ? 'up' : ''}"></span>1 ${c} · ${ch >= 0 ? '▲ +' : '▼ '}${String(Math.round(ch * 100) / 100).replace('.', ',')} UZS</small></span><span class="fx2-go">${ic('arrow-up-right')}</span></button>`; }).join('')}</div>
    <div class="sec-h"><h3>${t('Qarjı qurallari')}</h3></div>
    <div class="tool-tiles">
      <button class="tt v" id="tlFx"><span class="tt-top"><span class="tt-ic">${ic('repeat')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Valyuta konvertorı')}</b></button>
      <button class="tt card" id="tlCredit"><span class="tt-top"><span class="tt-ic">${ic('landmark')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Kredit kalkulyatorı')}</b></button>
      <button class="tt lav" id="tlDep"><span class="tt-top"><span class="tt-ic">${ic('coins')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Depozit kalkulyatorı')}</b></button>
      <button class="tt ink" id="tlCsv"><span class="tt-top"><span class="tt-ic">${ic('file-spreadsheet')}</span><span class="tt-go">${ic('download')}</span></span><b>${t('Excel eksport')}</b></button>
    </div>
    <div class="sec-h"><h3>${t('Kategoriyalar')}</h3><button class="link" id="svCats2">${t('Barlıǵı')}${ic('chevron-right')}</button></div>
    <button class="card sv-cats" id="svCats"><div class="svc-grid">${KM_GROUPS.slice(0, 8).map(g => `<span class="svc-g"><i style="--c:${g[3]}">${S.iconMode === 'emoji' && KM_GEMOJI[g[0]] ? `<span class="emj">${KM_GEMOJI[g[0]]}</span>` : ic(g[2])}</i><small>${esc(t(g[1]).split(/[ ,]/)[0])}</small></span>`).join('')}</div>
      <div class="svc-f"><span><b>${S.cats.length} ${t('kategoriya')}</b><small>${t('Qosıw, ózgertiw hám gruppalarǵa jıynaw')}</small></span><span class="svc-go">${ic('arrow-right')}</span></div></button>
    <div class="sec-h"><h3>${t('Maqsetler')}</h3><button class="link" id="svGoals">${t('Barlıǵı')}${ic('chevron-right')}</button></div>
    ${goals.length ? goals.slice(0, 2).map(g => { const pl = kmGoalPlan(g); const p = clamp(g.saved / g.target * 100, 0, 100);
      return `<div class="card sg">
        <div class="sg-h"><span class="sg-ic">${ic(g.icon)}</span><div class="r-t"><div class="ell">${esc(t(g.name))}</div><small class="num">${short(g.saved)} / ${short(g.target)} · ${t('ayına')} ${short(pl.per)}</small></div><b class="num sg-p">${Math.round(p)}%</b></div>
        <div class="sg-m">${[...Array(pl.n)].map((_, i) => { const st = i < pl.done ? 'ok' : i === pl.done && p < 100 ? 'next' : '';
          return `<button class="mc ${st}" ${st === 'next' ? `data-gm="${g.id}"` : 'disabled'}><span class="mc-b">${st === 'ok' ? ic('check') : st === 'next' ? ic('plus') : ''}</span><small>${i + 1}-${t('ay')}</small></button>`; }).join('')}</div>
        <small class="sg-f">${pl.done}/${pl.n} ${t('ay orınlandı')}${p < 100 ? ` · ${t('keyingi')}: <b class="num">${short(pl.per)}</b>` : ` · ${t('Maqsetke jettińiz!')}`}</small>
      </div>`; }).join('') + (goals.length > 2 ? `<button class="sv-more" id="svGoalsMore"><span class="sv-more-st">${goals.slice(2, 5).map(g => `<i>${ic(g.icon)}</i>`).join('')}</span><b>${t('Barlıǵın kóriw')}</b><span class="sv-more-n num">+${goals.length - 2}</span>${ic('chevron-right')}</button>` : '') : `<div class="card empty"><span class="e-ic">${ic('target')}</span>${t('Ele maqset joq')}</div>`}
    <button class="btn ghost" id="svGoalNew">${ic('plus')}${t('Jańa maqset')}</button>
    <div class="sec-h"><h3>${t('Qarızlar')}</h3><button class="link" id="svDebts">${t('Barlıǵı')}${ic('chevron-right')}</button></div>
    ${m ? `<div class="sv-main">${kmDebtCard(m)}</div>` : ''}
    ${people.length ? `<div class="card list sv-ppl">${people.slice(0, 2).map(p => { const dd = p.due ? Math.round((fromIso(p.due) - fromIso(today())) / 864e5) : null; const net = p.give - p.take;
      return `<button class="row" data-pp="${esc(p.name)}"><span class="qa-av">${esc(initials(p.name))}</span><span class="r-t"><div class="ell">${esc(p.name)}</div><small>${net >= 0 ? t('maǵan qaytaradı') : t('men qaytaraman')} · ${dd == null ? t('múddetsiz') : dd < 0 ? -dd + ' ' + t('kún keshikti') : dd + ' ' + t('kún qaldı')}</small></span><b class="num ${net >= 0 ? 'pos' : 'neg'}">${net >= 0 ? '+' : '−'}${short(Math.abs(net))}</b></button>`; }).join('')}</div>${people.length > 2 ? `<button class="sv-more" id="svDebtsMore"><span class="sv-more-st">${people.slice(2, 5).map(p => `<i class="av">${esc(initials(p.name))}</i>`).join('')}</span><b>${t('Barlıǵın kóriw')}</b><span class="sv-more-n num">+${people.length - 2}</span>${ic('chevron-right')}</button>` : ''}`
      : `<div class="card empty"><span class="e-ic">${ic('hand-coins')}</span>${t('Aktiv qarız joq')}</div>`}
    <button class="btn ghost" id="svDebtNew">${ic('plus')}${t('Qarız jaratıw')}</button>`;
  $('#svFxAll').onclick = openFxAll;
  $$('[data-rate]', el).forEach(b => b.onclick = () => openFx(b.dataset.rate));
  $('#tlCsv').onclick = () => exportXLSX();
  $('#svCats').onclick = () => openCats(); $('#svCats2').onclick = () => openCats();
 $('#tlFx').onclick = () => openFx('USD'); $('#tlCredit').onclick = openCreditCalc; $('#tlDep').onclick = openDepositCalc;
  $('#svGoals').onclick = openGoals; $('#svDebts').onclick = openDebts; if ($('#svGoalsMore')) $('#svGoalsMore').onclick = openGoals; if ($('#svDebtsMore')) $('#svDebtsMore').onclick = () => openDebtList(); $('#svDebtNew').onclick = () => openDebtNew('given');
  $('#svGoalNew').onclick = () => { openGoals(); setTimeout(() => { const b = $('#gNew') || $('#gAdd'); b && b.click(); }, 350); };
  $$('[data-gm]', el).forEach(b => b.onclick = () => { const g = S.goals.find(x => x.id === b.dataset.gm); const pl = kmGoalPlan(g); const add = Math.min(pl.per * (pl.done + 1) - g.saved, g.target - g.saved);
    g.saved += add; save(); vib(10); renderView(); toast(`${pl.done + 1}-${t('ay')}: +${grp(add)} ${t('maqsetke qosıldı')}`, { icon: 'check', undo: () => { g.saved -= add; save(); renderView(); } }); if (g.saved >= g.target) confetti(120); });
  $$('[data-pp]', el).forEach(b => b.onclick = () => openDebtList());
  kmBindDebts(el);
  refreshIcons();
}
function renderProfile() { renderProfile0(); }

/* ---------- AI chat: Hisobchi kórinisindegi karta ---------- */
function kmRcpt(tx) {
  const c = catById(tx.cat); const inc = tx.type === 'income';
  return `<div class="km-rc2" data-rc="${tx.id}">
    <div class="km-rc">
      <div class="rc-h"><b class="rc-amt num ${inc ? 'in' : 'out'}">${inc ? '+' : '−'}${grp(tx.amount)} <i>uzs</i></b><button class="rc-del" data-rdel="${tx.id}" aria-label="delete">${ic('trash-2')}</button></div>
      <div class="rc-nw"><input class="rc-note" data-rnote="${tx.id}" value="${esc(tx.note || '')}" placeholder="${t('Izoh jazıń')}" maxlength="80"><span class="rc-pen" aria-hidden="true">${ic('pencil')}</span><button class="rc-ok" data-rok="${tx.id}" aria-label="ok">${ic('check')}</button></div>
      <div class="rc-foot"><span class="ell">${walletName(tx.wallet)} ${t('balansı')}: <b class="num">${walletShow(tx.wallet)} ${curLbl(wCur(walletById(tx.wallet)))}</b></span><span class="num">${hhmm(tx.ts) || dayLabel(tx.date)}</span></div>
    </div>
    <div class="rc-pills"><button data-rw="${tx.id}"><span class="ell">${walletName(tx.wallet)}</span>${ic('chevrons-up-down')}</button><button data-rcat="${tx.id}">${icE(c.icon)}<span class="ell">${esc(t(c.name))}</span>${ic('chevrons-up-down')}</button></div></div>`;
}
/* AI chat: aldın jazılǵan sózlerdi eslep qalıw hám usınıs etiw */
function kmVocab() {
  const v = {};
  const add = (text, type, w8) => String(text || '').split(/[^\p{L}'ʼ‘’-]+/u).forEach(w => {
    w = w.replace(/^['ʼ‘’-]+|['ʼ‘’-]+$/g, ''); if (w.length < 3) return; const k = w.toLowerCase();
    if (/^(mıń|min|ming|mln|million|swm|som|so'm|uzs|sum|keldi|aldım|aldim|oldim)$/.test(k)) return;
    const e = v[k] || (v[k] = { w, n: 0, inc: 0, exp: 0 }); e.n += w8; if (type === 'income') e.inc += w8; else if (type === 'expense') e.exp += w8; e.w = w;
  });
  S.tx.forEach(x => add(x.note, x.type, 2));
  S.ai.forEach(m => { if (m.who === 'me') { const r = S.ai[S.ai.indexOf(m) + 1]; const tx = r && r.tx && (S.tx.find(z => z.id === r.tx.id) || r.tx.snap); add(m.text, tx ? tx.type : null, 1); } });
  return v;
}
function kmWordHints(el) {
  const inp = $('#aiI', el); const sug = $('.ai-sugg', el); if (!inp || !sug) return;
  const box = document.createElement('div'); box.className = 'ai-words'; sug.after(box);
  let vocab = null;
  const render = () => {
    const m = inp.value.match(/([\p{L}'ʼ‘’-]{1,})$/u); const pre = m ? m[1].toLowerCase() : '';
    if (pre.length < 2) { box.innerHTML = ''; box.classList.remove('on'); return; }
    vocab = vocab || kmVocab();
    const list = Object.entries(vocab).filter(([k]) => k.startsWith(pre) && k !== pre).sort((a, b) => b[1].n - a[1].n).slice(0, 6);
    if (!list.length) { box.innerHTML = ''; box.classList.remove('on'); return; }
    box.classList.add('on');
    box.innerHTML = list.map(([k, e]) => { return `<button type="button" class="aw" data-aw="${esc(e.w)}">${ic('history')}${esc(e.w)}</button>`; }).join('');
    refreshIcons();
    $$('[data-aw]', box).forEach(b => b.onmousedown = b.ontouchstart = ev => { ev.preventDefault();
      inp.value = inp.value.replace(/([\p{L}'ʼ‘’-]{1,})$/u, b.dataset.aw) + ' '; inp.focus(); render(); });
  };
  inp.addEventListener('input', render);
  inp.closest('form').addEventListener('submit', () => { vocab = null; setTimeout(render, 0); });
}
function kmDayCal(sel) {
  const st = { m: sel ? fromIso(sel) : new Date(), d: sel || today() }; st.m = new Date(st.m.getFullYear(), st.m.getMonth(), 1);
  const WD = ['Du', 'Si', 'Sá', 'Pi', 'Ju', 'Sh', 'Ek'];
  Sheet.open({
    title: t('Kúnler boyınsha esap'),
    html: () => {
      const y = st.m.getFullYear(), mo = st.m.getMonth(); const dim = new Date(y, mo + 1, 0).getDate(); const off = (new Date(y, mo, 1).getDay() + 6) % 7;
      const dayExp = d => S.tx.filter(x => x.date === d && x.type === 'expense').reduce((a, x) => a + x.amount, 0);
      const days = [...Array(dim)].map((_, i) => iso(new Date(y, mo, i + 1)));
      const max = Math.max(1, ...days.map(dayExp));
      const list = S.tx.filter(x => x.date === st.d).sort((a, b) => (b.ts || 0) - (a.ts || 0));
      const de = sum(list, 'expense'), di = sum(list, 'income');
      return `<div class="dc-nav"><button class="pg-btn" id="dcP">${ic('chevron-left')}</button><b>${t(MONTHS[mo])} ${y}</b><button class="pg-btn" id="dcN">${ic('chevron-right')}</button></div>
        <div class="dc-grid">${WD.map(w => `<span class="dc-w">${t(w)}</span>`).join('')}${'<span></span>'.repeat(off)}${days.map(d => { const v = dayExp(d); const fut = d > today();
          return `<button class="dc-d ${d === st.d ? 'on' : ''} ${d === today() ? 'td' : ''} ${fut ? 'fut' : ''}" data-dd="${d}" ${fut ? 'disabled' : ''}><b>${+d.slice(8)}</b>${v ? `<small class="num">${short(v).replace(' ', '')}</small><i style="opacity:${.25 + .75 * v / max}"></i>` : ''}</button>`; }).join('')}</div>
        <div class="card dc-sum"><div><small>${dayLabel(st.d)}</small><b class="num">−${grp(de)} <i>uzs</i></b><span>${t('jumsalǵan')}</span></div><div class="dc-in"><small>${t('Kirim')}</small><b class="num">+${grp(di)}</b></div></div>
        ${list.length ? `<div class="card tx-list">${list.map(txRow).join('')}</div>` : `<div class="km-empty">${t('Bul kúni operaciya joq')}</div>`}`;
    },
    mount: el => {
      $('#dcP', el).onclick = () => { st.m = new Date(st.m.getFullYear(), st.m.getMonth() - 1, 1); Sheet.refresh(); };
      $('#dcN', el).onclick = () => { st.m = new Date(st.m.getFullYear(), st.m.getMonth() + 1, 1); Sheet.refresh(); };
      $$('[data-dd]', el).forEach(b => b.onclick = () => { st.d = b.dataset.dd; vib(6); Sheet.refresh(); });
      bindTx(el);
    }
  });
}
function kmRcptOff(r) {
  const x = r && r.snap; if (!x) return `<div class="km-rc off"><div class="rc-off-h">${ic('undo-2')}${t('Bul operaciya óshirildi')}</div></div>`;
  const c = catById(x.cat); const inc = x.type === 'income';
  return `<div class="km-rc off"><div class="rc-off-h">${ic('undo-2')}${t('Biykarlandı')}${r.at ? ' · ' + hhmm(r.at) : ''}</div>
    <div class="rc-top"><span class="ci" style="--c:${catCol(c)}">${icE(c.icon)}</span>
      <div class="rc-mid"><b class="ell">${esc(t(c.name))}</b><small class="ell">${esc(x.note || '')}</small></div>
      <b class="rc-amt num"><s>${inc ? '+' : '−'}${grp(x.amount)}</s></b></div>
    <div class="rc-foot"><span class="ell">${walletName(x.wallet)} · ${dayLabel(x.date)}</span><button class="rc-back" data-rback="${x.id}">${ic('rotate-ccw')}${t('Qaytarıw')}</button></div></div>`;
}
function kmBindRcpt(root, rerender) {
  const find = id => S.tx.find(z => z.id === id);
  $$('[data-rdel]', root).forEach(b => b.onclick = async () => { const id = b.dataset.rdel; if (await ask('Operaciyanı óshiriw', 'Bul operaciya óshiriledi. Keyin qaytarıwǵa boladı.', 'Óshiriw', true)) { const tx = find(id); S.ai.forEach(m => { if (m.tx && m.tx.id === id) { m.tx.snap = { ...tx }; m.tx.at = Date.now(); } }); S.tx = S.tx.filter(x => x.id !== id); save(); renderView(); rerender(); } });
  $$('[data-rback]', root).forEach(b => b.onclick = () => { const id = b.dataset.rback; const m = S.ai.find(m => m.tx && m.tx.id === id && m.tx.snap); if (!m) return; S.tx.push(m.tx.snap); delete m.tx.snap; delete m.tx.at; save(); renderView(); rerender(); toast(t('Operaciya qaytarıldı'), { icon: 'rotate-ccw' }); });
  $$('[data-rnote]', root).forEach(i => { i.oninput = () => i.closest('.rc-nw').classList.add('ed'); i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); $(`[data-rok="${i.dataset.rnote}"]`, root).click(); } }; });
  $$('[data-rok]', root).forEach(b => b.onclick = () => { const x = find(b.dataset.rok); if (!x) return; x.note = $(`[data-rnote="${x.id}"]`, root).value.trim(); kmLearn(x); save(); renderView(); b.closest('.rc-nw').classList.remove('ed'); toast(t('Saqlandı'), { icon: 'check' }); });
  $$('[data-rw]', root).forEach(b => b.onclick = () => { const x = find(b.dataset.rw); if (!x) return;
    Sheet.open({ title: t('Hamyan'), html: () => `<div class="card list">${S.wallets.map(w => `<button class="row" data-pw="${w.id}"><span class="r-ic">${ic(w.icon)}</span><span class="r-t"><div>${esc(t(w.name))}</div><small class="num">${walletShow(w.id)} ${curLbl(wCur(w))}</small></span>${x.wallet === w.id ? ic('check') : ''}</button>`).join('')}</div>`,
      mount: e => $$('[data-pw]', e).forEach(p => p.onclick = () => { x.wallet = p.dataset.pw; save(); Sheet.close(); renderView(); rerender(); }) }); });
  $$('[data-rcat]', root).forEach(b => b.onclick = () => { const x = find(b.dataset.rcat); if (!x) return;
    Sheet.open({ title: t('Kategoriya'), html: () => `<div class="cg-grid sheet-g">${S.cats.filter(c => c.type === x.type).map(c => `<button class="cg-t ${x.cat === c.id ? 'on' : ''}" data-pc="${c.id}"><span style="color:${catCol(c)}">${icE(c.icon)}</span><small class="ell2">${esc(t(c.name))}</small></button>`).join('')}</div>`,
      mount: e => $$('[data-pc]', e).forEach(p => p.onclick = () => { x.cat = p.dataset.pc; kmLearn(x); save(); Sheet.close(); renderView(); rerender(); toast(t('AI eslep qaldı'), { icon: 'sparkles' }); }) }); });
}
kmFxLoad();

/* dawıs tek tiykarǵı túymelerde: navbar, + túymesi */
document.addEventListener('pointerdown', e => { const b = e.target.closest('.nav-it,.nav-add'); if (!b) return; sfx(b.matches('.nav-add') ? 'pop' : 'nav'); }, { passive: true });
/* navbar: aktiv jazıw óz tárepine sıyǵansha kishireyedi, ➕ ortada qozǵalmaydı */
function kmFitNav() { $$('.nav-it .lbl').forEach(x => x.style.removeProperty('font-size')); }
addEventListener('resize', () => kmFitNav());
/* ================= AI Support (qosımsha boyınsha kómek) ================= */
const SUP_KB = [
  { k: ['operaciya', 'kirim', 'shıǵım', 'qosıw', 'jazıw', 'qalay qos', 'расход', 'доход', 'add', 'expense', 'income', 'xarajat', 'chiqim'], a: 'Operaciya qosıwdıń eki jolı bar:\n\n1️⃣ Tómendegi ortadaǵı ➕ túymesin basıń → «Shıǵım» yamasa «Kirim» saylań → summanı jazıń → kategoriya hám hamyandı saylań → ✓ basıń.\n\n2️⃣ Bas bettegi balans kartasındaǵı «Kirim» / «Shıǵım» túymeleri.\n\n💡 AI chatqa «taksi 25 mıń» dep jazsańız da óz-ózinen qosıladı.', go: [['Operaciya qosıw', () => openTx('expense')]] },
  { k: ['balans', 'hamyan', 'karta', 'naqd', 'plastik', 'кошел', 'wallet', 'card', 'hamyon'], a: 'Balanslar bas bettegi kartalar qatarında turadı 💳\n\n• Jańa balans: ➕ túymesi (kartalar qatarınıń basında).\n• Kartanı jay bassańız — sol balans boyınsha filtr.\n• Kartanı basıp tursańız — menyu: ótkeriw 🔁, valyuta almastırıw 💱, esabatlar, redaktorlaw ✏️ hám óshiriw.\n• Redaktorda atı, belgisi, túri, valyutası, reńi hám aylıq limiti ózgertiledi.', go: [['Balans qosıw', () => openWalletEdit()]] },
  { k: ['ótker', 'awdar', 'перевод', 'transfer', 'o\'tkaz'], a: 'Bir balanstan ekinshisine ótkeriw 🔁\n\nBalans kartasın basıp turıń → «Balanstan balansqa ótkeriw». Qaysı balanstan hám qaysı balansqa ekenin saylap, summanı jazıń. Valyutası hár qıylı bolsa, kurs óz-ózinen esaplanadı.', go: [['Ótkeriw', () => openTransfer()]] },
  { k: ['valyuta', 'dollar', 'rubl', 'teńge', 'obmen', 'kurs', 'usd', 'rub', 'kzt', 'валют', 'currency', 'exchange'], a: 'Valyuta menen islew 💱\n\n• Balans redaktorında valyutanı saylań: UZS, USD, RUB yamasa KZT.\n• Kartanı basıp tursańız → «Valyuta almastırıw (obmen)»: summanı jazasız, kurs hám alınatuǵın summa birden kórinedi.\n• Valyuta kursları «Xızmetler» bóliminde. Kurslar Oraylıq banktan alınadı.', go: [['Valyuta kursları', () => openFxAll()]] },
  { k: ['maqset', 'kopilka', 'jinaq', 'jıynaw', 'цель', 'goal', 'maqsad', 'копил'], a: 'Maqset jaratıw 🎯\n\nBas bettegi «Maqsetler» kartasın yamasa Profil → Jinaq maqsetleri ge kiriń → ➕ «Jańa maqset». Atı, kerekli summa hám múddetin jazasız.\n\nE-esap hár ay qansha salıw kerekligin ózi esaplaydı. «Aqsha salıw» basqan sayın shiyshe kopilka toladı 🪙.', go: [['Maqsetler', () => openGoals()]] },
  { k: ['qarız', 'qariz', 'долг', 'debt', 'qarz', 'berdim', 'aldım'], a: 'Qarızlar 🤝\n\nBas bettegi «Kim qarızdar?» kartası yamasa Profil → Qarızlar.\n\n• «Beriw» — siz kimgedur qarız berdińiz.\n• «Alıw» — siz kimnendur qarız aldıńız.\n\nAtı, telefonı, summası hám qaytarıw múddetin jazıń. Múddet jaqınlasqanda eskertemiz ⏰. Qaytarılǵanda qarızdı ashıp «Qaytarıldı» dep belgileysiz.', go: [['Qarız qosıw', () => openDebtNew()]] },
  { k: ['ai', 'chat', 'kómekshi', 'dawıs', 'mikrofon', 'голос', 'voice'], a: 'E-esap AI 🤖\n\nOrtadaǵı túymeni basıp ashıladı. Ápiwayı tilde jazıń yamasa 🎙️ mikrofon menen aytıń:\n• «taksi 25 mıń»\n• «aylıq 6,5 mln keldi»\n• «bul ay qansha jumsadım?»\n• «keńes ber»\n\nAI summa, kategoriya hám sáneni ózi tabadı. Qosılǵan operaciyanıń kategoriyası yamasa hamyanın sol jerdiń ózinde ózgertiwge boladı.', go: [['AI chattı ashıw', () => openAI()]] },
  { k: ['statistika', 'esabat', 'analiz', 'diagramma', 'статист', 'отчёт', 'stats', 'report', 'hisobot'], a: 'Statistika 📊\n\nTómengi menyudaǵı ekinshi bólim. Hápte, ay yamasa jıl saylanadı. Kirim 🟢 jasıl, shıǵım 🔴 qızıl. Kategoriyalar diagramması, kúnlik dinamika hám limitlerdiń orınlanıwı kórinedi.\n\n📗 Barlıq esabattı Excel ge «Xızmetler → Excel eksport» arqalı júklep alasız.', go: [['Statistikaǵa ótiw', () => { Page.closeAll(); setTab('stats'); }]] },
  { k: ['limit', 'byudjet', 'бюджет', 'budget', 'shegara'], a: 'Byudjet hám limitler 🚦\n\nProfil → Byudjet hám limitler. Aylıq ulıwma byudjet hám hár kategoriyaǵa limit qoyasız. Sonday-aq hár balansqa óz aylıq limiti qoyıladı (balans redaktorında).\n\nLimittiń 85% ına jetkende hám asıp ketkende eskertiw shıǵadı.', go: [['Byudjet', () => openBudget()]] },
  { k: ['kategoriya', 'категор', 'category', 'kategoriy'], a: 'Kategoriyalar 🗂️\n\nProfil → Kategoriyalar. Jańa kategoriya qosıw, atın, belgisin hám reńin ózgertiw yamasa óshiriw múmkin. Kategoriyalardı óz gruppańızǵa jıynay alasız.\n\nOperaciya qosıwda «Barlıǵı» basılsa, barlıq kategoriyalar ashıladı.', go: [['Kategoriyalar', () => openCats()]] },
  { k: ['kredit', 'depozit', 'kalkulyator', 'procent', 'кредит', 'loan', 'deposit', 'foiz'], a: 'Qarjı esaplawıshları 🧮\n\n«Xızmetler» bóliminde:\n• 🏦 Kredit kalkulyatorı — aylıq tólem, jámi hám artıq tólem. Procent jıllıq yamasa aylıq saylanadı.\n• 📈 Depozit kalkulyatorı — múddet aqırında qansha bolatuǵını.\n• 💱 Valyuta konvertorı.', go: [['Kredit kalkulyatorı', () => openCreditCalc()]] },
  { k: ['excel', 'eksport', 'export', 'xlsx', 'júklep'], a: 'Excel eksport 📗\n\nXızmetler → Excel eksport. Barlıq operaciyalar, kategoriyalar hám balanslar bir chirayli .xlsx faylǵa saqlanadı.\n\nRezerv nusqa (JSON) ushın: Profil → Maǵlıwmatlar.', go: [['Maǵlıwmatlar', () => openData()]] },
  { k: ['til', 'язык', 'language', 'tilin', 'ruscha', 'english', 'qazaq'], a: 'Tildi ózgertiw 🌐\n\nProfil → «Til» qatarın basıń hám saylań: Qaraqalpaqsha (Latın / Kiril), Oʻzbekcha, Қазақша, Русский yamasa English. Pútkil qosımsha birden sol tilge ótedi.', go: [['Til saylaw', () => { Page.closeAll(); setTab('profile'); setTimeout(() => $('#pfLang')?.click(), 350); }]] },
  { k: ['qarańǵı', 'tema', 'stil', 'dark', 'jaqtı', 'liquid', 'glass', 'emoji', 'icon', 'kórinis', 'тема', 'theme'], a: 'Kórinisti ózgertiw 🎨\n\nProfil bóliminde:\n• Programma stili — Classic yamasa Liquid Glass; Jaqtı, Qarańǵı yamasa Avtomat tema.\n• Kórinis — kategoriyalar Iconlar yamasa Emoji túrinde.\n• Úlkenler ushın rejim — úlken jazıwlar hám anıq túymeler.' },
  { k: ['parol', 'пароль', 'password', 'umıt', 'kiriw', 'login', 'забыл'], a: 'Parol hám kiriw 🔑\n\nParoldi umıtsańız: Kiriw betinde «Paroldi umıttıńız ba?» → telefon nomeri → SMS kod → jańa paroldi eki ret kiritesiz.\n\nAkkaunttan shıǵıw yamasa onı óshiriw: Profil → AKKAUNT bólimi.' },
  { k: ['pin', 'qulıp', 'qáwipsiz', 'jasır', 'безопас', 'security'], a: 'Qáwipsizlik 🛡️\n\n• PIN-kod — qosımsha ashılǵanda 4 xanalı kod soraladı (Profil → PIN-kod).\n• Balanstı jasırıw — summalar bulıńǵır kórinedi, kóz belgisi menen de jasırıwǵa boladı 👁️.', go: [['PIN-kod', () => openPinSetup()]] },
  { k: ['maǵlıwmat', 'saqlan', 'qayerde', 'данные', 'data', 'backup', 'rezerv', 'joǵal'], a: 'Maǵlıwmatlarıńız qayerde? 💾\n\nHázirgi versiyada barlıq maǵlıwmatlar usı qurılmadaǵı brauzerde saqlanadı. Brauzer tazalansa joǵalıwı múmkin, sonlıqtan waqtı-waqtı menen Profil → Maǵlıwmatlar → Rezerv nusqa alıp qoyıń.', go: [['Rezerv nusqa', () => openData()]] },
  { k: ['akkaunt', 'óshir', 'удал', 'delete', 'shıǵıw', 'выйти'], a: 'Akkaunt 👤\n\nProfildiń eń tómeninde AKKAUNT bólimi:\n• «Akkaunttan shıǵıw» — maǵlıwmatlar saqlanadı, qayta kiriwge boladı.\n• «Akkaunttı óshiriw» — sebep saylaǵannan keyin akkaunt hám barlıq maǵlıwmatlar biraqola óshiriledi ⚠️.' },
  { k: ['salem', 'sálem', 'assalaw', 'привет', 'hello', 'hi', 'salom'], a: 'Sálem! 👋 Men E-esap Support. Qosımsha boyınsha qálegen sorawıńızdı beriń — qalay isleytuǵının túsindirip beremen.' },
  { k: ['raxmet', 'rahmet', 'спасибо', 'thanks', 'rahmat'], a: 'Arzımaydı! 😊 Jáne soraw bolsa, jazıp qoyıń.' }
];
function supAnswer(q) {
  const s0 = String(q).toLowerCase();
  let best = null, sc = 0;
  for (const it of SUP_KB) { const n = it.k.filter(k => s0.includes(k.toLowerCase())).length; if (n > sc) { sc = n; best = it; } }
  if (best) return best;
  return { a: 'Bul sorawdı tolıq túsinbedim 🤔 Tómendegi temalardan birin saylań yamasa basqasha jazıp kóriń: operaciya qosıw, balans, valyuta, maqset, qarız, statistika, limit, til, parol.', chips: true };
}
function openSupport() {
  const topics = ['Operaciyanı qalay qosaman?', 'Balans hám kartalar', 'Valyuta almastırıw', 'Maqset jaratıw', 'Qarız jazıw', 'AI chat qalay isleydi?', 'Limit qoyıw', 'Tildi ózgertiw', 'Paroldi umıttım', 'Maǵlıwmatlarım qayerde?'];
  const hist = []; let acts = {};
  const bot = (txt, go) => { const id = 'a' + Math.random().toString(36).slice(2, 7); if (go) go.forEach((g, n) => acts[id + n] = g[1]);
    return `<div class="m-row bot"><span class="m-ava sup-ava">${ic('headset')}</span><div class="msg bot">${esc(t(txt)).replace(/\n/g, '<br>')}${go ? `<div class="sup-go">${go.map((g, n) => `<button data-act="${id + n}">${t(g[0])}${ic('arrow-right')}</button>`).join('')}</div>` : ''}</div></div>`; };
  Page.open({
    raw: true, noRefresh: true,
    head: `<div class="ai-top"><span class="sup-orb">${ic('headset')}</span><div class="ai-tt"><b><span>AI Support</span><i class="ai-on"></i></b><small><span class="live"></span><span class="ell">${t('Onlayn')} · ${t('24/7 kómek')}</span></small></div></div>`,
    html: () => `<div class="chat" id="supChat"><div class="sup-hero"><span class="sup-big">${ic('headset')}</span><h3>${t('Qalay járdem bere alaman?')}</h3><p>${t('E-esap qalay isleytuǵını, qaysı bólim ne ushın ekeni — qálegen sorawıńızdı beriń. Tómendegi temalardan da saylawıńızǵa boladı 👇')}</p>
        <div class="sup-topics">${topics.map(x => `<button data-tp="${x}">${t(x)}</button>`).join('')}</div></div></div>
      <form class="ai-bar" id="supF"><input id="supI" placeholder="${t('Sorawıńızdı jazıń...')}" autocomplete="off"><button class="send" aria-label="send">${ic('arrow-up')}</button></form>`,
    mount: el => {
      const chat = $('#supChat', el); const scroll = () => chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
      const bind = () => { $$('[data-act]', chat).forEach(b => b.onclick = () => { const f = acts[b.dataset.act]; if (f) { Page.back(); setTimeout(f, 300); } }); $$('[data-tp]', chat).forEach(b => b.onclick = () => send(t(b.dataset.tp))); refreshIcons(); };
      const send = q => { q = q.trim(); if (!q) return; sfx('send');
        chat.insertAdjacentHTML('beforeend', `<div class="m-row me"><div class="msg me">${esc(q)}</div></div>`); $('#supI', el).value = '';
        chat.insertAdjacentHTML('beforeend', `<div class="m-row bot" id="supTy"><span class="m-ava sup-ava">${ic('headset')}</span><div class="msg bot"><div class="typing"><i></i><i></i><i></i></div></div></div>`); refreshIcons(); scroll();
        setTimeout(() => { $('#supTy', chat)?.remove(); const r = supAnswer(q); chat.insertAdjacentHTML('beforeend', bot(r.a, r.go));
          if (r.chips) chat.insertAdjacentHTML('beforeend', `<div class="sup-topics in">${topics.map(x => `<button data-tp="${x}">${t(x)}</button>`).join('')}</div>`);
          bind(); scroll(); }, 650);
      };
      $('#supF', el).onsubmit = e => { e.preventDefault(); send($('#supI', el).value); };
      bind();
    }
  });
}
/* ================= Sáne tańlaw (barlıq sáne maydanları ushın) ================= */
const DMON = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
function kmDateModal(cur, onPick, title) {
  const d0 = cur ? fromIso(cur) : new Date(); const w = { d: d0.getDate(), m: d0.getMonth() + 1, y: d0.getFullYear() };
  const Y0 = new Date().getFullYear() - 10, YN = 22, H = 44;
  const M = document.createElement('div'); M.className = 'au-modal dt-modal';
  M.innerHTML = `<div class="au-mbox"><div class="au-mh"><b>${t(title || 'Sáneni saylań')}</b><button class="au-mx" aria-label="close">${ic('x')}</button></div>
    <div class="dt-quick"><button data-q="0">${t('Búgin')}</button><button data-q="1">${t('Erteń')}</button><button data-q="7">+7 ${t('kún')}</button><button data-q="30">+30 ${t('kún')}</button></div>
    <div class="wheel au-wheel"><div class="wh-band"></div>
    <div class="wh" data-ab="d"><div class="wh-pad"></div>${Array.from({ length: 31 }, (_, i) => `<div class="wh-i" data-i="${i}">${i + 1}</div>`).join('')}<div class="wh-pad"></div></div>
    <div class="wh" data-ab="m"><div class="wh-pad"></div>${DMON.map((m, i) => `<div class="wh-i" data-i="${i}">${t(m)}</div>`).join('')}<div class="wh-pad"></div></div>
    <div class="wh" data-ab="y"><div class="wh-pad"></div>${Array.from({ length: YN }, (_, i) => `<div class="wh-i" data-i="${i}">${Y0 + i}</div>`).join('')}<div class="wh-pad"></div></div></div>
    <button class="btn pri au-btn" id="dtOk">${ic('check')}${t('Saylaw')}</button></div>`;
  document.body.appendChild(M); refreshIcons(); requestAnimationFrame(() => M.classList.add('show'));
  const close = () => { M.classList.remove('show'); setTimeout(() => M.remove(), 250); };
  M.onclick = e => { if (e.target === M) close(); }; $('.au-mx', M).onclick = close;
  const W = k => $(`[data-ab="${k}"]`, M), idx = { d: () => w.d - 1, m: () => w.m - 1, y: () => w.y - Y0 };
  const dim = () => new Date(w.y, w.m, 0).getDate();
  const paint = () => { if (w.d > dim()) w.d = dim(); $$('[data-ab="d"] .wh-i', M).forEach((e, i) => e.classList.toggle('off', i >= dim())); ['d', 'm', 'y'].forEach(k => $$(`[data-ab="${k}"] .wh-i`, M).forEach((e, i) => e.classList.toggle('on', i === idx[k]()))); };
  const goW = (k, sm) => W(k).scrollTo({ top: idx[k]() * H, behavior: sm ? 'smooth' : 'auto' });
  ['d', 'm', 'y'].forEach(k => { const el = W(k); let tm;
    el.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => { let i = Math.round(el.scrollTop / H);
      if (k === 'd') { i = clamp(i, 0, dim() - 1); w.d = i + 1; } else if (k === 'm') w.m = clamp(i, 0, 11) + 1; else w.y = Y0 + clamp(i, 0, YN - 1);
      if (Math.abs(el.scrollTop - i * H) > 1) el.scrollTo({ top: i * H, behavior: 'smooth' }); paint(); if (k !== 'd') goW('d', true); vib(3); }, 90); });
    $$('.wh-i', el).forEach(e => e.onclick = () => el.scrollTo({ top: +e.dataset.i * H, behavior: 'smooth' })); });
  $$('[data-q]', M).forEach(b => b.onclick = () => { const d = addDays(new Date(), +b.dataset.q); w.d = d.getDate(); w.m = d.getMonth() + 1; w.y = d.getFullYear(); ['m', 'y', 'd'].forEach(k => goW(k, true)); paint(); });
  requestAnimationFrame(() => { ['d', 'm', 'y'].forEach(k => goW(k)); paint(); });
  $('#dtOk', M).onclick = () => { onPick(`${w.y}-${pad(w.m)}-${pad(w.d)}`); close(); };
}
const kmDtLabel = v => { if (!v) return t('Sáneni saylań'); const d = fromIso(v); return `${d.getDate()} ${t(DMON[d.getMonth()])} ${d.getFullYear()}`; };
function kmDateEnhance(root) {
  (root.querySelectorAll ? root.querySelectorAll('input[type="date"]:not([data-dt])') : []).forEach(inp => {
    inp.dataset.dt = '1'; inp.style.display = 'none';
    const b = document.createElement('button'); b.type = 'button'; b.className = 'inp dt-btn';
    const lbl = inp.closest('.field')?.querySelector('label')?.textContent || '';
    const narrow = !!inp.closest('.row2'); const draw = () => { const v = inp.value; let L = kmDtLabel(v); if (narrow && v) { const d = fromIso(v); L = `${d.getDate()} ${t(DMON[d.getMonth()]).slice(0, 3)} ${d.getFullYear()}`; } b.innerHTML = `${ic('calendar-days')}<span>${L}</span>${narrow ? '' : ic('chevron-down')}`; refreshIcons(); };
    b.onclick = () => kmDateModal(inp.value, v => { inp.value = v; draw(); inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true })); }, lbl.trim() || 'Sáneni saylań');
    inp.after(b); draw();
  });
}
try { new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && kmDateEnhance(n)))).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
/* ================= Jańa akkaunt: baslanǵısh summa + oqıtıw turı ================= */
function showSetup(done) {
  document.body.classList.add('au-on');
  const A = document.createElement('div'); A.className = 'auth'; A.id = 'setup'; document.body.appendChild(A);
  let cur0 = 'UZS';
  A.innerHTML = `<div class="au-wrap su-wrap"><div class="su-steps"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
    <div class="au-logo su-logo"><svg viewBox="0 0 118 118" fill="none"><rect x="4" y="4" width="110" height="110" rx="34" fill="#7B5CFA"/><path d="M44 32v54M44 32h32M44 59h24M44 86h32" stroke="#fff" stroke-width="10" stroke-linecap="round"/></svg><b>E-esap</b></div>
    <h1>${t('Házirgi waqıtta qansha qarjıńız bar?')}</h1><p class="au-sub">${t('Qolıńızdaǵı naqd pul yamasa kartadaǵı summanı kiritiń — esap usı jerden baslanadı. Keyin ózgertiwge boladı.')}</p>
    <label class="su-l">${t('Muǵdar hám valyutanı kiritiń')}</label>
    <div class="su-amt"><input class="num" id="suA" inputmode="numeric" placeholder="${t('Summanı kiritiń')}" autocomplete="off"><button class="su-cur" id="suC"><b>UZS</b>${ic('chevron-down')}</button></div>
    <div class="su-curs" id="suCs">${WCURS.map(c => `<button data-sc="${c}" class="${c === 'UZS' ? 'on' : ''}"><b>${c}</b><small>${t(WCUR_N[c])}</small></button>`).join('')}</div>
    <div class="su-sp"></div>
    <button class="btn pri au-btn" id="suGo">${t('Dawam etiw')}${ic('arrow-right')}</button>
    <button class="btn ghost au-btn su-skip" id="suSkip">${t('Ótkizip jiberiw')}</button></div>`;
  refreshIcons();
  const inp = $('#suA', A);
  inp.addEventListener('input', () => { const raw = inp.value.replace(/[^\d,.]/g, ''); const [ip, dp] = raw.split(/[,.]/); inp.value = (ip ? grp(+ip) : '') + (dp !== undefined && cur0 !== 'UZS' ? ',' + dp.slice(0, 2) : ''); });
  $('#suC', A).onclick = () => $('#suCs', A).classList.toggle('show');
  $$('[data-sc]', A).forEach(b => b.onclick = () => { cur0 = b.dataset.sc; $$('[data-sc]', A).forEach(x => x.classList.toggle('on', x === b)); $('#suC b', A).textContent = cur0; $('#suCs', A).classList.remove('show'); inp.focus(); });
  const fin = () => { S.needSetup = false; save(); A.classList.add('out'); setTimeout(() => { A.remove(); document.body.classList.remove('au-on'); done(); }, 350); };
  $('#suGo', A).onclick = () => {
    const v = parseFloat(inp.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    if (v > 0) {
      if (cur0 === 'UZS') { const w = S.wallets.find(x => x.id === 'cash') || S.wallets[0]; w.initial = v; }
      else S.wallets.push({ id: uid(), name: WCUR_N[cur0], icon: 'coins', kind: 'cash', cur: cur0, theme: 'paper', color: { USD: '#22C55E', RUB: '#3B82F6', KZT: '#14B8A6' }[cur0], no: '', limit: 0, initial: v });
      sfx('coin');
    }
    fin();
  };
  $('#suSkip', A).onclick = fin;
  setTimeout(() => inp.focus(), 300);
}
function kmTourAsk() {
  if (!S.tourAsk) return; S.tourAsk = false; save();
  const M = document.createElement('div'); M.className = 'tr-ask'; M.innerHTML = `<div class="tr-box"><div class="tr-em">🚀</div><h3>${t('E-esap penen tanısayıq!')}</h3><p>${t('Balans, maqset, qarız, AI kómekshi hám statistika — bárin qısqa sayaxatta birge úyrenip shıǵayıq. Qádem-qádem kórsetemen ✨')}</p>
    <div class="tr-btns"><button class="btn ghost" id="trLater">${t('Keyinirek')}</button><button class="btn pri" id="trStart">${t('Úyrenip shıǵıw')}</button></div></div>`;
  document.body.appendChild(M); requestAnimationFrame(() => M.classList.add('show'));
  const close = () => { M.classList.remove('show'); setTimeout(() => M.remove(), 250); };
  $('#trLater', M).onclick = close; $('#trStart', M).onclick = () => { close(); setTimeout(kmTour, 260); };
}
function kmTour() {
  const steps = [
    { tab: 'home', sel: '#v-home .bal', title: '💰 Ulıwma balans', text: 'Bul jerde barlıq balanslarıńızdıń jıyındısı turadı: naqd pul + kartalar + valyuta. 👁️ Kóz belgisi summanı jasıradı, «Kirim» hám «Shıǵım» túymeleri menen tez operaciya qosasız.' },
    { tab: 'home', sel: '#v-home .km-wrow', title: '💳 Balanslarıńız', text: '➕ túymesi menen jańa balans ashıń: naqd pul, plastik karta yamasa 💵 dollar, rubl, teńge. Kartanı basıp tursańız — ótkeriw 🔁, obmen 💱 hám redaktorlaw ✏️ shıǵadı.' },
    { tab: 'home', sel: '#v-home .hp3-g', title: '🎯 Maqset jaratıw', text: 'Ármanıńızǵa shiyshe kopilka ashıń 🫙: summa hám múddet qoyıń. E-esap hár ay qansha salıw kerekligin ózi esaplaydı, tıyın salǵan sayın kopilka toladı 🪙.' },
    { tab: 'home', sel: '#v-home .hp3-d', title: '🤝 Qarız alıw hám beriw', text: 'Kimge qarız berdińiz yamasa kimnen aldıńız — bárin jazıń 📝. Qaytarıw múddeti jaqınlasqanda ⏰ eskertemiz, SMS eske salıw da jiberiwge boladı.' },
    { tab: 'home', sel: '#nav .nav-add', title: '🤖 E-esap AI chat', text: 'Ortadaǵı túyme — AI kómekshi. «Keshe 50 mıń taksi» dep jazıń yamasa 🎙️ aytıń: ol operaciyanı ózi qosadı, «bul ay qansha jumsadım?» degen sorawlarǵa juwap beredi hám keńes beredi 💡.' },
    { tab: 'stats', sel: '#v-stats .mcard', title: '📊 Statistika', text: 'Qarjıńız qayaqqa ketip atırǵanın kóriń. Kirim 🟢 jasıl, shıǵım 🔴 qızıl reńde. Strelkalar menen aldıńǵı aylardı salıstırasız.' },
    { tab: 'stats', sel: '#v-stats > .seg', title: '📅 Dáwirdi saylań', text: 'Hápte, ay yamasa jıl boyınsha esapty kóriń. Tómende kategoriyalar diagramması 🍩 hám limitler 🚦 turadı — artıq jumsawdan saqlaydı.' },
    { tab: 'services', sel: '#v-services .tool-tiles', title: '🧰 Qarjı quralları', text: '💱 Valyuta konvertorı — kurs boyınsha tez esaplaw. 🏦 Kredit kalkulyatorı — aylıq tólem hám artıq tólem (jıllıq yamasa aylıq %). 📈 Depozit — qansha payda kóresiz. 📗 Excel eksport — barlıq esabatlar bir faylda.' },
    { tab: 'profile', sel: '#grpLang', title: '🌐 Til', text: 'Usı jerdi basıp, ózińizge qolaylı tildi saylań: qaraqalpaqsha (Latın hám Kiril), ózbekshe, qazaqsha, ruscha yamasa inglisshe 🗣️. Til almastırılǵanda pútkil qosımsha sol tilge ótedi.' }
  ];
  let k = 0;
  const T = document.createElement('div'); T.className = 'tour'; T.innerHTML = `<div class="tr-hole"></div><div class="tr-top"><div class="tr-bars">${steps.map(() => '<i></i>').join('')}</div><button class="tr-x" aria-label="close">${ic('x')}</button></div><div class="tr-tip"><div class="tr-n"></div><h3></h3><p></p><div class="tr-act"><button class="btn ghost sm" id="tPrev">${ic('arrow-left')}</button><button class="btn pri" id="tNext">${t('Dawam etiw')}</button></div></div>`;
  document.body.appendChild(T); refreshIcons();
  const stopScroll = e => { if (!e.target.closest || !e.target.closest('.tr-tip')) e.preventDefault(); };
  ['wheel', 'touchmove'].forEach(ev => document.addEventListener(ev, stopScroll, { passive: false })); document.documentElement.classList.add('tour-lock');
  const hole = $('.tr-hole', T), tip = $('.tr-tip', T);
  const place = () => {
    const st = steps[k]; const el = $$(st.sel.split(',').map(x => x.trim()).join(',')).find(e => e.offsetParent !== null);
    $$('.tr-bars i', T).forEach((b, n) => b.classList.toggle('on', n <= k));
    $('.tr-n', tip).textContent = `${k + 1} / ${steps.length}`; $('h3', tip).textContent = t(st.title); $('p', tip).textContent = t(st.text);
    $('#tNext', T).textContent = t(k === steps.length - 1 ? 'Tamamlaw' : 'Dawam etiw'); $('#tPrev', T).style.visibility = k ? 'visible' : 'hidden';
    if (!el) { hole.style.cssText = 'left:50%;top:40%;width:0;height:0'; tip.style.top = '40%'; return; }
    const r0 = el.getBoundingClientRect();
    const need = tip.offsetHeight + 40; if (r0.top < 80 || r0.bottom > innerHeight - need) { const tgt = r0.height + need + 100 < innerHeight ? scrollY + r0.top - 90 : scrollY + r0.top - Math.max(80, innerHeight - r0.height - need); window.scrollTo({ top: Math.max(0, tgt), behavior: 'auto' }); }
    requestAnimationFrame(() => {
      const r = el.getBoundingClientRect(), pd = 8, th = tip.offsetHeight + 18, top0 = 64, bot0 = innerHeight - 12;
      hole.style.cssText = `left:${r.left - pd}px;top:${r.top - pd}px;width:${r.width + pd * 2}px;height:${r.height + pd * 2}px;border-radius:${Math.min(28, parseFloat(getComputedStyle(el).borderTopLeftRadius) + pd || 20)}px`;
      const below = bot0 - (r.bottom + pd), above = (r.top - pd) - top0;
      let y; if (below >= th) y = r.bottom + pd + 12; else if (above >= th) y = r.top - pd - 12 - tip.offsetHeight; else { y = bot0 - tip.offsetHeight; }
      tip.style.top = `${Math.max(top0, y)}px`; tip.classList.toggle('up', y < r.top);
    });
  };
  const go = n => {
    if (n >= steps.length) return end(true); k = Math.max(0, n);
    const st = steps[k]; if (UI.tab !== st.tab) { if (Page.stack.length) Page.closeAll(); setTab(st.tab); setTimeout(place, 350); } else place();
    tip.classList.remove('in'); void tip.offsetWidth; tip.classList.add('in'); sfx('nav');
  };
  const end = fin => { ['wheel', 'touchmove'].forEach(ev => document.removeEventListener(ev, stopScroll)); document.documentElement.classList.remove('tour-lock'); T.classList.add('out'); setTimeout(() => T.remove(), 250); setTab('home'); if (fin) { confetti(); toast(t('Tayın! Endi E-esap tan tolıq paydalanıń'), { icon: 'party-popper' }); } };
  $('#tNext', T).onclick = () => go(k + 1); $('#tPrev', T).onclick = () => go(k - 1); $('.tr-x', T).onclick = () => end(false);
  addEventListener('resize', () => T.isConnected && place());
  requestAnimationFrame(() => T.classList.add('show')); go(0);
}
/* ================= Kiriw aldınan tanıstırıw (onboarding) ================= */
function showOnboard(done) {
  S.lang = 'lat'; S.mode = 'light'; S.style = 'glass'; S.elder = false; applyLook();
  document.body.classList.add('au-on');
  const O = document.createElement('div'); O.className = 'ob'; document.body.appendChild(O);
  const sp = n => Array.from({ length: n }, (_, k) => `<i class="ob-sp" style="--x:${(k * 37 + 11) % 96}%;--y:${(k * 53 + 7) % 90}%;--d:${(k % 5) * .7}s;--s:${3 + k % 4}px"></i>`).join('');
  const SL = [
    { k: 'wal', em: '💼', title: 'Barlıq qarjıńız bir jerde', text: 'Karta, naqd pul hám valyuta — barlıq balanslarıńız bir qosımshada, bir qarasta.',
      scene: `<div class="obw-total"><small>Ulıwma balans</small><b class="num" data-count="28450000">0</b><span>swm</span></div>
        <div class="obw-deck">
          <div class="obw-card c3"><div class="obw-t"><span>💵</span><b>Naqd pul</b></div><b class="obw-v num">9 000 000</b><small>swm</small></div>
          <div class="obw-card c2"><div class="obw-t"><span class="obw-chip"></span><b>HUMO</b></div><b class="obw-v num">7 000 000</b><small>9860 •• 2207</small></div>
          <div class="obw-card c1"><div class="obw-t"><span class="obw-chip"></span><b>UZCARD</b></div><b class="obw-v num">12 450 000</b><small>8600 •• 4417</small></div>
        </div>
        <div class="obw-fx"><span>$ <b class="num">1 200</b></span><span>₽ <b class="num">15 000</b></span><span>₸ <b class="num">80 000</b></span></div>` },
    { k: 'ai', em: '🎙️', title: 'Aytıń — AI ózi jazadı', text: 'Ádettegi tilde jazıń yamasa aytıń: summa, kategoriya hám sáneni E-esap AI ózi tabadı.',
      scene: `<div class="oba-bub"><span class="oba-type" data-type="Keshe taksige 25 mıń, túslikke 40 mıń jumsadım"></span><i class="oba-cur"></i></div>
        <div class="oba-mic"><i class="r1"></i><i class="r2"></i><i class="r3"></i><span>🎙️</span></div>
        <div class="oba-res"><div><em class="oi" style="--c:#3B82F6">${ic0('car')}</em><span><b>Taksi</b><small>Transport</small></span><b class="r num">−25 000</b></div><div><em class="oi" style="--c:#D97706">${ic0('utensils')}</em><span><b>Túslik</b><small>Kafe</small></span><b class="r num">−40 000</b></div><p>✨ AI 2 operaciyanı tanıdı</p></div>` },
    { k: 'goal', em: '🎯', title: 'Ármanıńızǵa qádem-qádem', text: 'Maqset qoyıń — E-esap hár ay qansha jıynaw kerekligin esaplap, sizdi qollap baradı.',
      scene: `<div class="obg-ring"><svg viewBox="0 0 200 200"><defs><linearGradient id="obgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE066"/><stop offset="1" stop-color="#FF8A1F"/></linearGradient></defs><circle cx="100" cy="100" r="84" class="obg-bg"/><circle cx="100" cy="100" r="84" class="obg-fg"/></svg>
          <div class="obg-in"><span>🏝️</span><b class="num"><i data-count="68">0</i>%</b><small>Sayaxat</small></div>
          <div class="obg-orb"><i>🪙</i><i>🪙</i><i>🪙</i></div></div>
        <div class="obg-pill">📅 Ayına <b class="num">450 000</b> swm jıynań</div>` },
    { k: 'stat', em: '📊', title: 'Aqıllı statistika', text: 'Qarjıńız qayaqqa ketip atırǵanın kóriń, limit qoyıń hám aqıllı sheshim qabıl etiń.',
      scene: `<div class="obs-card"><div class="obs-h"><b>Noyabr</b><span class="g num">+4,2 mln</span><span class="r num">−2,8 mln</span></div>
          <div class="obs-bars">${[['🛒', 82, '#F59E0B'], ['🚗', 55, '#3B82F6'], ['☕', 38, '#D97706'], ['🏠', 92, '#6366F1'], ['🎮', 30, '#8B5CF6'], ['🩺', 46, '#EF4444'], ['🎁', 24, '#EC4899']].map(([e, h, c], n) => `<div class="obs-b" style="--h:${h}%;--c:${c};--d:${n * .09}s"><em>${e}</em><i></i></div>`).join('')}</div></div>
        <div class="obs-tick"><div>${['$ 12 850', '€ 13 920', '₽ 158', '₸ 26', '£ 16 210', '¥ 1 780'].concat(['$ 12 850', '€ 13 920', '₽ 158', '₸ 26', '£ 16 210', '¥ 1 780']).map(x => `<span class="num">${x}</span>`).join('')}</div></div>` }
  ];
  let i = 0, raf = null, t0 = 0, timers = []; const DUR = 6000;
  O.innerHTML = `<div class="ob-wrap"><div class="ob-stage">${SL.map((x, k) => `<div class="ob-sc sc-${x.k} ${k === 0 ? 'on' : ''}"><div class="ob-mesh"></div>${sp(14)}<div class="ob-in">${x.scene}</div></div>`).join('')}
      <div class="ob-brand"><svg viewBox="0 0 118 118"><rect x="4" y="4" width="110" height="110" rx="34" fill="#fff"/><path d="M44 32v54M44 32h32M44 59h24M44 86h32" stroke="#7B5CFA" stroke-width="11" stroke-linecap="round"/></svg><b>E-esap</b></div>
      <button class="ob-skip" id="obSkip">${t('Ótkizip jiberiw')}</button>
      <div class="ob-tap l"></div><div class="ob-tap r"></div></div>
    <div class="ob-cap"><div class="ob-bars">${SL.map(() => '<span><i></i></span>').join('')}</div><h2 id="obT"></h2><p id="obP"></p></div>
    <button class="btn pri ob-go" id="obGo">${t('Qosımshaǵa kiriw')}${ic('arrow-right')}</button></div>`;
  refreshIcons();
  const bars = $$('.ob-bars span', O);
  const clear = () => { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; };
  const anim = sc => {
    $$('[data-count]', sc).forEach(el => { const to = +el.dataset.count, st = performance.now(), d = 1400; const f = n => { const p = Math.min(1, (n - st) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = grp(Math.round(to * e)); if (p < 1 && sc.classList.contains('on')) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    const ty = $('.oba-type', sc); if (ty) { const txt = ty.dataset.type; ty.textContent = ''; sc.classList.remove('typed'); let n = 0; const iv = setInterval(() => { ty.textContent = txt.slice(0, ++n); if (n >= txt.length) { clearInterval(iv); sc.classList.add('typed'); } }, 42); timers.push(iv); }
  };
  const show = k => {
    clear(); i = (k + SL.length) % SL.length; t0 = performance.now();
    $$('.ob-sc', O).forEach((e, n) => { e.classList.remove('on'); if (n === i) { void e.offsetWidth; e.classList.add('on'); anim(e); } });
    $('#obT', O).textContent = `${t(SL[i].title)} ${SL[i].em}`; $('#obP', O).textContent = t(SL[i].text);
    const c = $('.ob-cap', O); c.classList.remove('in'); void c.offsetWidth; c.classList.add('in');
    bars.forEach((b, n) => b.querySelector('i').style.width = n < i ? '100%' : '0%');
  };
  const tick = () => { const p = Math.min(1, (performance.now() - t0) / DUR); bars[i].querySelector('i').style.width = p * 100 + '%'; if (p >= 1) show(i + 1); raf = requestAnimationFrame(tick); };
  const end = () => { cancelAnimationFrame(raf); clear(); O.classList.add('out'); setTimeout(() => { O.remove(); done(); }, 380); };
  $('.ob-tap.l', O).onclick = () => show(i - 1); $('.ob-tap.r', O).onclick = () => show(i + 1);
  let sx = null; O.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  O.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); sx = null; });
  $('#obGo', O).onclick = () => { sfx('pop'); end(); }; $('#obSkip', O).onclick = end;
  show(0); raf = requestAnimationFrame(tick);
}
/* ================= Kiriw / Dizimnen ótiw ekranı ================= */
const SMS_CODE = '12345';
const auPhone = d => { d = String(d).replace(/\D/g, '').slice(-9); return '+998 ' + [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' '); };
const AU_Y0 = new Date().getFullYear() - 90, AU_YN = 85;
const AU_MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
function showAuth() {
  document.body.classList.add('au-on');
  S.lang = 'lat'; S.mode = 'light'; S.style = 'glass'; S.elder = false; applyLook();
  let A = $('#auth'); if (!A) { A = document.createElement('div'); A.id = 'auth'; A.className = 'auth'; document.body.appendChild(A); }
  const st = { scr: 'login', reg: {}, phone: '', timer: null, left: 0 };
  const logo = `<div class="au-logo"><svg viewBox="0 0 118 118" fill="none"><rect x="4" y="4" width="110" height="110" rx="34" fill="url(#auG)"/><defs><linearGradient id="auG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9C85FF"/><stop offset="1" stop-color="#5B3EE6"/></linearGradient></defs><path d="M44 32v54M44 32h32M44 59h24M44 86h32" stroke="#fff" stroke-width="10" stroke-linecap="round"/></svg><b>E-esap</b></div>`;
  const phoneF = (id, v = '') => `<div class="au-ph"><span>+998</span><input class="inp num" id="${id}" inputmode="numeric" autocomplete="tel-national" placeholder="90 123 45 67" value="${v}" maxlength="12"></div>`;
  const passF = (id, ph, ac = 'current-password') => `<div class="au-pw"><input class="inp" id="${id}" type="password" autocomplete="${ac}" placeholder="${t(ph)}" maxlength="32"><button type="button" class="au-eye" data-eye="${id}" aria-label="show">${ic('eye')}</button></div>`;
  const err = m => { const e = $('.au-err', A); if (e) { e.textContent = t(m); e.classList.add('show'); } const c = $('.au-card', A); c && c.animate([{ transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'none' }], { duration: 280 }); vib(30); };
  const digits = v => String(v || '').replace(/\D/g, '');
  const maskPhone = el => el.addEventListener('input', () => { const d = digits(el.value).slice(0, 9); el.value = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' '); });
  const startTimer = () => { clearInterval(st.timer); st.left = 59; st.timer = setInterval(() => { st.left--; const b = $('#auRe', A); if (b) { b.disabled = st.left > 0; b.textContent = st.left > 0 ? `${t('Qayta jiberiw')} 0:${String(st.left).padStart(2, '0')}` : t('Kodtı qayta jiberiw'); } if (st.left <= 0) clearInterval(st.timer); }, 1000); };
  const done = (phone, isNew) => {
    clearInterval(st.timer); Auth.login(phone);
    const u = Auth.users()[phone];
    // jańa akkaunt — barlıǵı 0 den, standart dizayn (jaqtı, Classic, Latın)
    try { if (isNew) { const f = defaults(false); Object.assign(f, { lang: 'lat', mode: 'light', style: 'classic', iconMode: 'icon', needSetup: true, tourAsk: true, elder: false, elderOff1: true, km4: true, homeWallet: 'all', onboarded: true }); localStorage.setItem(KEY + ':' + phone, JSON.stringify(f)); } } catch (e) {}
    try { const raw = localStorage.getItem(KEY + ':' + phone); const d = raw ? JSON.parse(raw) : {}; d.profile = { ...(d.profile || {}), first: u.first, last: u.last, phone: phone, birth: u.birth }; d.name = u.first; d.onboarded = true; localStorage.setItem(KEY + ':' + phone, JSON.stringify(d)); } catch (e) {}
    try { sessionStorage.setItem('eesap_skipintro', '1'); } catch (e) {}
    A.classList.add('out'); sfx('success'); setTimeout(() => location.reload(), 380);
  };
  const render = () => {
    const y = new Date().getFullYear(), r = st.reg;
    let h = '';
    if (st.scr === 'login') h = `${logo}<h1>${t('Xosh keldińiz!')}</h1><p class="au-sub">${t('Akkauntıńızǵa kiriń')}</p>
      <div class="au-card"><label>${t('Telefon nomeri')}</label>${phoneF('auP', st.phone)}<label>${t('Parol')}</label>${passF('auPw', 'Paroldi kiritiń')}
      <button class="au-link au-fg" id="auFg">${t('Paroldi umıttıńız ba?')}</button><div class="au-err"></div>
      <button class="btn pri au-btn" id="auGo">${t('Kiriw')}${ic('arrow-right')}</button></div>
      <p class="au-sw">${t('Akkauntıńız joq pa?')} <button class="au-link" id="auToReg">${t('Dizimnen ótiw')}</button></p>`;
    else if (st.scr === 'reg') h = `<button class="au-back" id="auBack">${ic('arrow-left')}</button><h1>${t('Dizimnen ótiw')}</h1><p class="au-sub">${t('Jańa akkaunt jaratıń — bir minut waqıt aladı')}</p>
      <div class="au-card"><label>${t('Atı')}</label><input class="inp" id="rF" autocomplete="given-name" placeholder="${t('Mısalı: Damir')}" value="${esc(r.first || '')}" maxlength="24">
      <label>${t('Familiyası')}</label><input class="inp" id="rL" autocomplete="family-name" placeholder="${t('Mısalı: Qonarbaev')}" value="${esc(r.last || '')}" maxlength="28">
      <label>${t('Tuwılǵan sáne')}</label><button type="button" class="inp au-dobb ${r.y ? 'set' : ''}" id="rDob">${ic('calendar')}<span>${r.y ? `${r.d} ${t(AU_MONTHS[r.m - 1])} ${r.y}` : t('Kún / Ay / Jıl')}</span>${ic('chevron-down')}</button>
      <label>${t('Telefon nomeri')}</label>${phoneF('rP', r.phone || '')}
      <label>${t('Parol')}</label>${passF('rPw', 'Keminde 6 belgi', 'new-password')}
      <label>${t('Paroldi qaytalań')}</label>${passF('rPw2', 'Paroldi qayta kiritiń', 'new-password')}
      <div class="au-err"></div><button class="btn pri au-btn" id="rGo">${ic('message-square-text')}${t('SMS kod jiberiw')}</button></div>
      <p class="au-sw">${t('Akkauntıńız bar ma?')} <button class="au-link" id="auToLog">${t('Kiriw')}</button></p>`;
    else if (st.scr === 'otp') h = `<button class="au-back" id="auBack">${ic('arrow-left')}</button><div class="au-big">${ic('message-square-text')}</div><h1>${t('SMS kodtı kiritiń')}</h1>
      <p class="au-sub"><b class="num">${auPhone(st.otpFor === 'reset' ? st.phone : r.phone)}</b> ${t('nomerine 5 xanalı tastıyıqlaw kodı jiberildi')}</p>
      <div class="au-card"><div class="au-otp">${'<input inputmode="numeric" maxlength="1" class="num" autocomplete="one-time-code">'.repeat(5)}</div><div class="au-err"></div>
      <button class="btn pri au-btn" id="oGo">${t('Tastıyıqlaw')}</button><button class="au-link au-re" id="auRe" disabled></button></div>`;
    else if (st.scr === 'forgot') h = `<button class="au-back" id="auBack">${ic('arrow-left')}</button><div class="au-big">${ic('key-round')}</div><h1>${t('Paroldi tiklew')}</h1>
      <p class="au-sub">${t('Telefon nomerińizdi kiritiń — oǵan tastıyıqlaw kodı SMS arqalı jiberiledi')}</p>
      <div class="au-card"><label>${t('Telefon nomeri')}</label>${phoneF('fP', st.phone)}<div class="au-err"></div>
      <button class="btn pri au-btn" id="fGo">${ic('message-square-text')}${t('SMS kod jiberiw')}</button></div>`;
    else if (st.scr === 'newpass') h = `<button class="au-back" id="auBack">${ic('arrow-left')}</button><div class="au-big ok">${ic('shield-check')}</div><h1>${t('Jańa parol qoyıń')}</h1>
      <p class="au-sub"><b class="num">${auPhone(st.phone)}</b> ${t('nomeri tastıyıqlandı. Endi jańa parol oylap tabıń.')}</p>
      <div class="au-card"><label>${t('Jańa parol')}</label>${passF('nPw', 'Keminde 6 belgi', 'new-password')}<label>${t('Jańa paroldi qaytalań')}</label>${passF('nPw2', 'Paroldi qayta kiritiń', 'new-password')}<div class="au-err"></div>
      <button class="btn pri au-btn" id="nGo">${ic('check')}${t('Saqlaw hám kiriw')}</button></div>`;
    A.innerHTML = `<div class="au-wrap au-s-${st.scr}">${h}</div>`; refreshIcons();
    $$('[data-eye]', A).forEach(b => b.onclick = () => { const i = $('#' + b.dataset.eye, A); i.type = i.type === 'password' ? 'text' : 'password'; b.innerHTML = ic(i.type === 'password' ? 'eye' : 'eye-off'); refreshIcons(); });
    $$('.au-ph input', A).forEach(maskPhone);
    $$('input', A).forEach(i => i.addEventListener('input', () => { const e = $('.au-err', A); e && e.classList.remove('show'); }));
    const b = $('#auBack', A); if (b) b.onclick = () => { clearInterval(st.timer); st.scr = st.scr === 'otp' ? (st.otpFor === 'reset' ? 'forgot' : 'reg') : st.scr === 'newpass' ? 'forgot' : 'login'; render(); };
    const enter = (sel, fn) => $$(sel, A).forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); fn(); } }));
    if (st.scr === 'login') {
      const go = () => {
        const ph = digits($('#auP', A).value), pw = $('#auPw', A).value; st.phone = $('#auP', A).value;
        if (ph.length !== 9) return err('Telefon nomerin tolıq kiritiń');
        if (!pw) return err('Paroldi kiritiń');
        const u = Auth.users()[ph];
        if (!u) return err('Bul nomer dizimnen ótpegen');
        if (u.pass !== Auth.hash(pw, ph)) return err('Parol qáte');
        done(ph, false);
      };
      $('#auGo', A).onclick = go; enter('#auP,#auPw', go);
      $('#auFg', A).onclick = () => { st.phone = $('#auP', A).value; st.scr = 'forgot'; render(); };
      $('#auToReg', A).onclick = () => { st.scr = 'reg'; render(); };
    }
    const keepReg = () => Object.assign(r, { first: $('#rF', A).value.trim(), last: $('#rL', A).value.trim(), phone: digits($('#rP', A).value) });
    if (st.scr === 'reg') {
      $('#rDob', A).onclick = () => {
        keepReg();
        const w = { d: r.d || 1, m: r.m || 1, y: r.y || 2000 };
        const M = document.createElement('div'); M.className = 'au-modal';
        M.innerHTML = `<div class="au-mbox"><div class="au-mh"><b>${t('Tuwılǵan sáne')}</b><button class="au-mx" aria-label="close">${ic('x')}</button></div>
          <div class="wheel au-wheel"><div class="wh-band"></div>
          <div class="wh" data-ab="d"><div class="wh-pad"></div>${Array.from({ length: 31 }, (_, i) => `<div class="wh-i" data-i="${i}">${i + 1}</div>`).join('')}<div class="wh-pad"></div></div>
          <div class="wh" data-ab="m"><div class="wh-pad"></div>${AU_MONTHS.map((m, i) => `<div class="wh-i" data-i="${i}">${t(m)}</div>`).join('')}<div class="wh-pad"></div></div>
          <div class="wh" data-ab="y"><div class="wh-pad"></div>${Array.from({ length: AU_YN }, (_, i) => `<div class="wh-i" data-i="${i}">${AU_Y0 + i}</div>`).join('')}<div class="wh-pad"></div></div></div>
          <button class="btn pri au-btn" id="dobOk">${ic('check')}${t('Saylaw')}</button></div>`;
        A.appendChild(M); refreshIcons(); requestAnimationFrame(() => M.classList.add('show'));
        const close = () => { M.classList.remove('show'); setTimeout(() => M.remove(), 250); };
        M.onclick = e => { if (e.target === M) close(); }; $('.au-mx', M).onclick = close;
        const H = 44, W = k => $(`[data-ab="${k}"]`, M);
        const idx = { d: () => w.d - 1, m: () => w.m - 1, y: () => w.y - AU_Y0 };
        const dim = () => new Date(w.y, w.m, 0).getDate();
        const paint = () => { if (w.d > dim()) w.d = dim(); $$('[data-ab="d"] .wh-i', M).forEach((e, i) => e.classList.toggle('off', i >= dim())); ['d', 'm', 'y'].forEach(k => $$(`[data-ab="${k}"] .wh-i`, M).forEach((e, i) => e.classList.toggle('on', i === idx[k]()))); };
        const goW = (k, sm) => W(k).scrollTo({ top: idx[k]() * H, behavior: sm ? 'smooth' : 'auto' });
        ['d', 'm', 'y'].forEach(k => { const el = W(k); let tm;
          el.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => { let i = Math.round(el.scrollTop / H);
            if (k === 'd') { i = clamp(i, 0, dim() - 1); w.d = i + 1; } else if (k === 'm') w.m = clamp(i, 0, 11) + 1; else w.y = AU_Y0 + clamp(i, 0, AU_YN - 1);
            if (Math.abs(el.scrollTop - i * H) > 1) el.scrollTo({ top: i * H, behavior: 'smooth' }); paint(); if (k !== 'd') goW('d', true); vib(3); }, 90); });
          $$('.wh-i', el).forEach(e => e.onclick = () => el.scrollTo({ top: +e.dataset.i * H, behavior: 'smooth' })); });
        requestAnimationFrame(() => { ['d', 'm', 'y'].forEach(k => goW(k)); paint(); });
        $('#dobOk', M).onclick = () => { Object.assign(r, w); close(); const b = $('#rDob', A); b.classList.add('set'); $('span', b).textContent = `${w.d} ${t(AU_MONTHS[w.m - 1])} ${w.y}`; const e = $('.au-err', A); e && e.classList.remove('show'); };
      };
      $('#auToLog', A).onclick = () => { st.scr = 'login'; render(); };
      $('#rGo', A).onclick = () => {
        keepReg();
        const p1 = $('#rPw', A).value, p2 = $('#rPw2', A).value;
        if (r.first.length < 2) return err('Atıńızdı kiritiń');
        if (r.last.length < 2) return err('Familiyańızdı kiritiń');
        if (!r.y) return err('Tuwılǵan sáneni saylań');
                if (r.phone.length !== 9) return err('Telefon nomerin tolıq kiritiń');
        if (Auth.users()[r.phone]) return err('Bul nomer aldın dizimnen ótken — Kiriw bólimine ótiń');
        if (p1.length < 6) return err('Parol keminde 6 belgiden turıwı kerek');
        if (p1 !== p2) return err('Paroller sáykes kelmeydi');
        r.pass = Auth.hash(p1, r.phone); st.otpFor = 'reg'; st.scr = 'otp'; render(); startTimer(); toast(t('SMS kod jiberildi'), { icon: 'message-square-text' });
      };
    }
    if (st.scr === 'otp') {
      const ins = $$('.au-otp input', A);
      ins.forEach((i, k) => {
        i.addEventListener('input', () => { const v = digits(i.value); if (v.length > 1) { v.split('').slice(0, 5 - k).forEach((c, j) => ins[k + j].value = c); ins[Math.min(4, k + v.length)].focus(); } else { i.value = v; if (v && k < 4) ins[k + 1].focus(); } ins.forEach(x => x.classList.toggle('on', !!x.value)); if (ins.every(x => x.value)) setTimeout(check, 120); });
        i.addEventListener('keydown', e => { if (e.key === 'Backspace' && !i.value && k > 0) ins[k - 1].focus(); });
      });
      setTimeout(() => ins[0].focus(), 80);
      const check = () => {
        const code = ins.map(x => x.value).join('');
        if (code.length < 5) return err('5 xanalı kodtı kiritiń');
        if (code !== SMS_CODE) { ins.forEach(x => { x.value = ''; x.classList.remove('on'); }); ins[0].focus(); return err('Kod qáte. Qaytadan kiritiń'); }
        if (st.otpFor === 'reset') { clearInterval(st.timer); st.scr = 'newpass'; render(); return; }
        const u = Auth.users(); u[r.phone] = { first: r.first, last: r.last, birth: `${r.y}-${String(r.m).padStart(2, '0')}-${String(r.d).padStart(2, '0')}`, pass: r.pass, created: Date.now() }; Auth.saveUsers(u);
        toast(t('Dizimnen óttińiz!'), { icon: 'circle-check' }); done(r.phone, true);
      };
      $('#oGo', A).onclick = check;
      $('#auRe', A).onclick = () => { startTimer(); toast(t('SMS kod qayta jiberildi'), { icon: 'message-square-text' }); };
    }
    if (st.scr === 'forgot') {
      const go = () => { const ph = digits($('#fP', A).value); st.phone = ph; if (ph.length !== 9) return err('Telefon nomerin tolıq kiritiń'); if (!Auth.users()[ph]) return err('Bul nomer dizimnen ótpegen'); st.otpFor = 'reset'; st.scr = 'otp'; render(); startTimer(); toast(t('SMS kod jiberildi'), { icon: 'message-square-text' }); };
      $('#fGo', A).onclick = go; enter('#fP', go);
    }
    if (st.scr === 'newpass') {
      const go = () => { const p1 = $('#nPw', A).value, p2 = $('#nPw2', A).value; if (p1.length < 6) return err('Parol keminde 6 belgiden turıwı kerek'); if (p1 !== p2) return err('Paroller sáykes kelmeydi'); const u = Auth.users(); u[st.phone].pass = Auth.hash(p1, st.phone); Auth.saveUsers(u); toast(t('Parol jańalandı'), { icon: 'circle-check' }); done(st.phone, false); };
      $('#nGo', A).onclick = go; enter('#nPw,#nPw2', go); setTimeout(() => $('#nPw', A).focus(), 80);
    }
  };
  render();
}
/* ================= boot ================= */
function boot() {
  applyLook();
  setTab('home');
  $$('[data-t]').forEach(e => e.textContent = t(e.dataset.t));
  $$('.nav-it').forEach(b => b.setAttribute('aria-label', t($('.lbl', b).dataset.t)));
  refreshIcons();
  applyHub();
  let skip = false; try { skip = sessionStorage.getItem('eesap_skipintro') === '1'; sessionStorage.removeItem('eesap_skipintro'); } catch (e) {}
  const go = () => { if (!Auth.session() || !Auth.users()[Auth.session()]) { if (skip) showAuth(); else showOnboard(showAuth); } else if (S.needSetup) showSetup(() => { renderAll(); setTimeout(kmTourAsk, 700); }); else { showLock(launchAds); if (S.tourAsk) setTimeout(kmTourAsk, 1500); } };
  if (skip) { const I = $('#intro'); if (I) I.style.display = 'none'; go(); } else runIntro(go);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();