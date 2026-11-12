/* PulCount — Qaraqalpaqsha kirim-shıǵım qosımshası
   Jaratıwshı: Qonarbaev Damir
   HTML + CSS + JS, maǵlıwmatlar brauzerdiń localStorage ında saqlanadı. */
'use strict';

/* ================= helpers ================= */
const KEY = 'pulcount_v1';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic = (n, cls = '') => `<i data-lucide="${n}" ${cls ? `class="${cls}"` : ''}></i>`;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const vib = (ms = 10) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
const store = {
  load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } },
  save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} },
  clear() { try { localStorage.removeItem(KEY); } catch (e) {} }
};
function refreshIcons() {
  try { if (window.lucide) lucide.createIcons({ icons: lucide.icons, attrs: { 'stroke-width': 1.9 } }); } catch (e) {}
}

/* ================= Transliteration: Qaraqalpaq Latın → Kiril ================= */
const PROTECT = /(PulCount|BUSINESS|MAX|Aurora|JPG|PNG|Liquid Glass|Classic|Glass|Uzcard|Humo|Visa|Mastercard|Click|Payme|Paynet|Beeline|Ucell|Mobiuz|Uzmobile|Humans|Uzonline|Sarkor|Comnet|TPS|UzDigital|ATTO|PRO|PIN|CSV|JSON|UZS|USD|EUR|RUB|KZT|AI|ID|QR|GAI|YHXB|SMS|v\d[\d.]*)/g;
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
const t = s => S.lang === 'cyr' ? toCyr(s) : s;

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
const money = (n, sign = false) => (sign ? (n < 0 ? '−' : '+') : (n < 0 ? '−' : '')) + grp(n) + ' ' + cur();
function short(n) {
  const a = Math.abs(n);
  const f = (v) => (Math.round(v * 10) / 10).toString().replace('.', ',');
  if (a >= 1e9) return f(n / 1e9) + ' ' + t('mlrd');
  if (a >= 1e6) return f(n / 1e6) + ' ' + t('mln');
  if (a >= 1e3) return Math.round(n / 1e3) + ' ' + t('mıń');
  return String(Math.round(n));
}
const parseMoney = v => +String(v || '').replace(/[^\d]/g, '') || 0;
const hideable = s => S.hideBal ? `<span class="blurred">${s}</span>` : s;

/* ================= defaults ================= */
const PALETTE = ['#7B5CFA', '#3B3B46', '#A48BFF', '#5233E0', '#C04BE6', '#2B1B78', '#9C8FD9', '#6E6A85', '#D19BFF', '#4F46E5', '#B07CF0', '#8B5CF6'];
const CAT_ICONS = ['shopping-basket', 'car', 'zap', 'smartphone', 'heart-pulse', 'shirt', 'gamepad-2', 'graduation-cap', 'house', 'coffee', 'gift', 'ellipsis', 'briefcase', 'store', 'sparkles', 'trending-up', 'circle-plus', 'plane', 'baby', 'dumbbell', 'pill', 'fuel', 'book-open', 'film', 'wrench', 'paw-print', 'music', 'laptop', 'utensils', 'banknote'];
function defaultCats() {
  return [
    { id: 'food', name: 'Azıq-awqat', icon: 'shopping-basket', color: '#7B5CFA', type: 'expense' },
    { id: 'transport', name: 'Transport', icon: 'car', color: '#3B3B46', type: 'expense' },
    { id: 'utility', name: 'Kommunal', icon: 'zap', color: '#A48BFF', type: 'expense' },
    { id: 'comm', name: 'Baylanıs', icon: 'smartphone', color: '#5233E0', type: 'expense' },
    { id: 'health', name: 'Densawlıq', icon: 'heart-pulse', color: '#C04BE6', type: 'expense' },
    { id: 'cloth', name: 'Kiyim-keshek', icon: 'shirt', color: '#2B1B78', type: 'expense' },
    { id: 'fun', name: 'Kewil ashıw', icon: 'gamepad-2', color: '#9C8FD9', type: 'expense' },
    { id: 'edu', name: 'Bilim', icon: 'graduation-cap', color: '#4F46E5', type: 'expense' },
    { id: 'home', name: 'Turaq jay', icon: 'house', color: '#6E6A85', type: 'expense' },
    { id: 'cafe', name: 'Kafe', icon: 'coffee', color: '#D19BFF', type: 'expense' },
    { id: 'gift', name: 'Sawǵalar', icon: 'gift', color: '#B07CF0', type: 'expense' },
    { id: 'other', name: 'Basqa', icon: 'ellipsis', color: '#8B8799', type: 'expense' },
    { id: 'salary', name: 'Aylıq', icon: 'briefcase', color: '#7B5CFA', type: 'income' },
    { id: 'biz', name: 'Biznes', icon: 'store', color: '#5233E0', type: 'income' },
    { id: 'bonus', name: 'Bonus', icon: 'sparkles', color: '#A48BFF', type: 'income' },
    { id: 'gift_in', name: 'Sawǵa', icon: 'gift', color: '#C04BE6', type: 'income' },
    { id: 'invest', name: 'Investiciya', icon: 'trending-up', color: '#2B1B78', type: 'income' },
    { id: 'other_in', name: 'Basqa kirim', icon: 'circle-plus', color: '#6E6A85', type: 'income' }
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
    v: 1, lang: 'lat', style: 'classic', mode: 'light', elder: false, hideBal: false,
    name: 'Paydalanıwshı', plan: 'pro', planUntil: null,
    wallets: [
      { id: 'cash', name: 'Naq aqsha', icon: 'wallet', theme: 'paper', initial: withDemo ? 850000 : 0 },
      { id: 'uzcard', name: 'Uzcard', icon: 'credit-card', theme: 'violet', initial: withDemo ? 3200000 : 0, no: '8600 •• 4414' },
      { id: 'humo', name: 'Humo', icon: 'credit-card', theme: 'ink', initial: withDemo ? 1450000 : 0, no: '9860 •• 2207' }
    ],
    cats: defaultCats(),
    tx: withDemo ? seedTx() : [],
    budget: { total: 4500000, cats: { food: 1500000, transport: 500000, cafe: 450000, fun: 300000 } },
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

let S = Object.assign(defaults(true), store.load() || {});
if (!['pro', 'max'].includes(S.plan)) { S.plan = 'pro'; S.planUntil = null; }
if (S.autoRenew === undefined) S.autoRenew = true;
if (!Array.isArray(S.invoices)) S.invoices = [];
if (!S.profile) S.profile = { first: S.name && S.name !== 'Paydalanıwshı' ? S.name.split(' ')[0] : '', last: S.name && S.name.includes(' ') ? S.name.split(' ').slice(1).join(' ') : '', father: '', phone: '', photo: '' };
if (S.style === 'aurora' && S.plan !== 'max') S.style = 'glass';
const save = () => store.save(S);
const UI = { tab: 'home', statPeriod: 'month', statOffset: 0, statType: 'expense', svcQuery: '', svcSearch: false, svcGroup: 'all', homeDay: null, capSel: null, gaugeCat: 'all' };

/* ================= derived data ================= */
const catById = id => S.cats.find(c => c.id === id) || { id, name: 'Basqa', icon: 'ellipsis', color: '#8B8799', type: 'expense' };
const walletById = id => S.wallets.find(w => w.id === id);
const walletName = id => walletById(id) ? t(walletById(id).name) : '—';
function walletBal(id) {
  const w = walletById(id); let b = w ? +w.initial || 0 : 0;
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
  if (S.plan === 'max' && S.planUntil && S.planUntil < today()) {
    const w = walletById(S.planWallet) ? S.planWallet : S.wallets[0]?.id;
    if (S.autoRenew && w && walletBal(w) >= PLANS.max.price) {
      S.tx.push({ id: uid(), type: 'expense', amount: PLANS.max.price, cat: 'other', wallet: w, date: today(), note: 'PulCount MAX (avto)', ts: Date.now() });
      S.planUntil = iso(addDays(fromIso(S.planUntil), 30)); if (S.planUntil < today()) S.planUntil = iso(addDays(new Date(), 30));
      setTimeout(() => toast(t('MAX tarifi avtomat jańalandı'), { icon: 'gem' }), 4200);
    } else { S.plan = 'pro'; S.planUntil = null; if (S.style === 'aurora') S.style = 'glass'; }
    save();
  }
  return S.plan === 'max' ? 'max' : 'pro';
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
  S.debts.filter(d => !d.paid).forEach(d => {
    const diff = Math.round((fromIso(d.due) - fromIso(today())) / 864e5);
    if (diff <= 3) out.push({ id: 'd-' + d.id, icon: 'hand-coins', title: `${esc(d.name)}: ${d.type === 'given' ? t('qarızdı qaytarıw múddeti') : t('qarızdı tólew múddeti')}`, text: `${money(d.amount)} · ${diff < 0 ? t('múddeti ótti') : diff === 0 ? t('bugin') : diff + ' ' + t('kún qaldı')}`, raw: true });
  });
  S.goals.filter(g => g.saved >= g.target).forEach(g => out.push({ id: 'g-' + g.id, icon: 'target', title: `${t('Maqsetke jettińiz')}: ${esc(t(g.name))}`, text: money(g.target), raw: true }));
  try { hubLoad().broadcasts.slice().reverse().forEach(b => out.unshift({ id: 'bc-' + b.id, icon: 'megaphone', title: esc(t(b.title)), text: esc(t(b.text)) + ' · ' + b.date.split('-').reverse().join('.'), raw: true })); } catch (e) {}
  out.push({ id: 'welcome', icon: 'sparkles', title: t('PulCount ǵa xosh keldińiz!'), text: t('AI tuymesin basıp, «taksi 25 mıń» dep jazıp kóriń.'), raw: true });
  return out;
}
const unread = () => notifications().filter(n => !S.seen.includes(n.id)).length;

/* ================= theming ================= */
function applyLook() {
  const r = document.documentElement;
  let mode = S.mode;
  if (mode === 'auto') mode = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const aur = S.style === 'aurora' && S.plan === 'max';
  if (aur) mode = 'dark';
  r.dataset.mode = mode; r.dataset.style = aur ? 'aurora' : (S.style === 'aurora' ? 'glass' : S.style); r.dataset.aurora = aur ? '1' : '0';
  r.dataset.tier = S.plan === 'max' ? 'max' : 'pro'; r.dataset.elder = S.elder ? '1' : '0';
  r.lang = S.lang === 'cyr' ? 'kaa-Cyrl' : 'kaa';
  const m = $('meta[name="theme-color"]'); if (m) m.content = mode === 'dark' ? '#111113' : '#F3F2F7';
}
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S.mode === 'auto') applyLook(); }); } catch (e) {}

/* ================= toast ================= */
let toastTimer;
function toast(msg, opt = {}) {
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
        $('#aOk').onclick = () => { done = true; res(true); Sheet.back(); };
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
function avatarHtml(cls = '') {
  const p = S.profile || {};
  return p.photo ? `<span class="ava ${cls}"><img src="${p.photo}" alt=""></span>` : `<span class="ava ${cls}">${esc(initials(t(displayName())))}</span>`;
}

/* ================= NAV ================= */
function setTab(tab) {
  UI.tab = tab;
  $$('.nav-it').forEach((b, i) => { b.classList.toggle('on', b.dataset.tab === tab); if (b.dataset.tab === tab) $('.nav-pill').style.setProperty('--i', i); });
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
  const amt = x.type === 'income' ? `<span class="tx-a in num">+${grp(x.amount)}</span>` : x.type === 'transfer' ? `<span class="tx-a num">${grp(x.amount)}</span>` : `<span class="tx-a num">−${grp(x.amount)}</span>`;
  return `<button class="tx" data-tx="${x.id}"><span class="ci" style="background:${c.color}">${ic(c.icon)}</span>
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
  return `<svg viewBox="0 0 220 112" width="100%" class="gauge" aria-hidden="true"><defs><linearGradient id="hatchP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C9B8FF"/><stop offset="1" stop-color="#7B5CFA" stop-opacity=".35"/></linearGradient><linearGradient id="gOn" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#6A47F2"/><stop offset="1" stop-color="#A48BFF"/></linearGradient></defs>${out}</svg>`;
}
function renderHome() {
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

  ${tps.length ? `<div class="sec-h"><h3>${t('Tez qosıw')}</h3><span class="badge ink">MAX</span></div>
  <div class="hscroll tp-row">${tps.map((p, i) => { const c = catById(p.cat); return `<button class="tp" data-tp="${i}"><span class="ci" style="background:${c.color}">${ic(c.icon)}</span><span class="tp-t"><b class="ell">${esc(t(p.note))}</b><small class="num">${grp(p.amount)}</small></span>${ic('plus')}</button>`; }).join('')}</div>` : ''}

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
      <span style="min-width:0"><div class="w-name ell">${esc(t(w.name))}</div><div class="w-bal num ell">${hideable(grp(walletBal(w.id)))}</div></span></button>`).join('')}
    <button class="wallet add" id="hAddW">${ic('plus')}<span>${t('Hamyan qosıw')}</span></button>
  </div>

  ${ups.length ? `<div class="sec-h"><h3>${t('Jaqın tólemler')}</h3><button class="link" id="hRec">${t('Barlıǵı')}${ic('arrow-up-right')}</button></div>
  <div class="hscroll">${ups.map(p => { const c = catById(p.cat); return `<button class="card upc" data-rec="${p.id}">
    <span class="up-top"><span class="ci" style="background:${c.color}">${ic(c.icon)}</span><span class="badge">${p.day}-${t('sáne')}</span></span>
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
function openTx(type = 'expense', preset = null, edit = null) {
  const st = edit ? { ...edit, expr: String(edit.amount) } : {
    type, expr: preset?.amount ? String(preset.amount) : '', cat: preset?.cat || null, wallet: preset?.wallet || (S.homeWallet !== 'all' ? S.homeWallet : S.wallets[0]?.id),
    date: preset?.date || today(), note: preset?.note || ''
  };
  const cats = () => S.cats.filter(c => c.type === st.type);
  if (!st.cat || !cats().some(c => c.id === st.cat)) st.cat = cats()[0]?.id;
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
    $('#txAmt').innerHTML = `${st.type === 'income' ? '+' : '−'}${grp(v)} <small>${cur()}</small>`;
    $('#txAmt').classList.toggle('in', st.type === 'income');
    $('#txExpr').textContent = /[+\-]/.test(st.expr) ? st.expr.replace(/(\d+)/g, m => grp(m)) : '';
  }
  function commit() {
    const amount = evalExpr(st.expr);
    if (!amount) { $('#txAmt').animate([{ transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'none' }], { duration: 300 }); return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' }); }
    if (!st.wallet) return toast(t('Aldın hamyan qosıń'), { icon: 'circle-alert' });
    st.note = ($('#txNote')?.value || '').trim();
    const rec = { id: edit ? edit.id : uid(), type: st.type, amount, cat: st.cat, wallet: st.wallet, date: st.date, note: st.note, ts: Date.now() };
    if (edit) S.tx = S.tx.map(x => x.id === edit.id ? rec : x); else S.tx.push(rec);
    save(); document.removeEventListener('keydown', keyHandler); Sheet.close(); renderView();
    if (!edit) toast(`${t(st.type === 'income' ? 'Kirim qosıldı' : 'Shıǵım qosıldı')}: ${grp(amount)} ${cur()}`, {
      undo: () => { S.tx = S.tx.filter(x => x.id !== rec.id); save(); renderView(); }
    });
    checkBudgetAlert(rec);
  }
  Sheet.open({
    title: edit ? t('Operaciyanı ózgertiw') : t('Jańa operaciya'),
    onClose: () => document.removeEventListener('keydown', keyHandler),
    html: () => `
      <div class="seg violet"><button data-ty="expense" class="${st.type === 'expense' ? 'on' : ''}">${t('Shıǵım')}</button><button data-ty="income" class="${st.type === 'income' ? 'on' : ''}">${t('Kirim')}</button></div>
      <div class="amount-box"><div class="a-v num" id="txAmt"></div><div class="a-expr num" id="txExpr"></div></div>
      <div class="cat-grid" id="txCats">${cats().map(c => `<button class="cat ${c.id === st.cat ? 'on' : ''}" data-c="${c.id}"><span class="c-ic" style="background:${c.color}">${ic(c.icon)}</span><span>${esc(t(c.name))}</span></button>`).join('')}</div>
      <div class="field"><label>${t('Hamyan')}</label><div class="chips">${S.wallets.map(w => `<button class="chip ${w.id === st.wallet ? 'on' : ''}" data-wl="${w.id}">${ic(w.icon)}<span class="ell">${esc(t(w.name))}</span></button>`).join('')}</div></div>
      <div class="row2">
        <div class="field"><label>${t('Sáne')}</label><input class="inp" type="date" id="txDate" value="${st.date}" max="${iso(addDays(new Date(), 365))}"></div>
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
      $$('[data-ty]', el).forEach(b => b.onclick = () => { st.type = b.dataset.ty; st.cat = cats()[0]?.id; st.note = $('#txNote').value; st.date = $('#txDate').value || st.date; Sheet.refresh(); });
      $$('[data-c]', el).forEach(b => b.onclick = () => { st.cat = b.dataset.c; $$('[data-c]', el).forEach(x => x.classList.toggle('on', x === b)); vib(5); });
      $$('[data-wl]', el).forEach(b => b.onclick = () => { st.wallet = b.dataset.wl; $$('[data-wl]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $('#txDate').onchange = e => st.date = e.target.value || today();
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

function openTransfer(edit = null) {
  if (S.wallets.length < 2) return toast(t('Awdarma ushın keminde eki hamyan kerek'), { icon: 'circle-alert' });
  const st = edit ? { ...edit } : { wallet: S.wallets[0].id, to: S.wallets[1].id, amount: 0, date: today(), note: '' };
  Sheet.open({
    title: t('Hamyanlar arası awdarma'),
    html: () => `
      <div class="field"><label>${t('Qaysı hamyannan')}</label><select class="inp" id="trF">${S.wallets.map(w => `<option value="${w.id}" ${w.id === st.wallet ? 'selected' : ''}>${esc(t(w.name))} — ${grp(walletBal(w.id))} ${cur()}</option>`).join('')}</select></div>
      <div style="display:grid;place-items:center;margin:-6px 0"><button class="icon-btn" id="trSwap">${ic('arrow-down-up')}</button></div>
      <div class="field"><label>${t('Qaysı hamyanǵa')}</label><select class="inp" id="trT">${S.wallets.map(w => `<option value="${w.id}" ${w.id === st.to ? 'selected' : ''}>${esc(t(w.name))} — ${grp(walletBal(w.id))} ${cur()}</option>`).join('')}</select></div>
      <div class="field"><label>${t('Muǵdar')} (${cur()})</label>${moneyInput('trA', st.amount)}</div>
      <div class="field"><label>${t('Sáne')}</label><input class="inp" type="date" id="trD" value="${st.date}"></div>
      <button class="btn pri" id="trOk">${ic('arrow-left-right')}${t(edit ? 'Saqlaw' : 'Awdarıw')}</button>
      ${edit ? `<button class="btn danger" id="trDel">${ic('trash-2')}${t('Óshiriw')}</button>` : ''}`,
    mount: el => {
      bindMoney(el);
      $('#trSwap').onclick = () => { const f = $('#trF').value; $('#trF').value = $('#trT').value; $('#trT').value = f; };
      $('#trOk').onclick = () => {
        const f = $('#trF').value, to = $('#trT').value, a = parseMoney($('#trA').value);
        if (f === to) return toast(t('Hamyanlar hár qıylı bolıwı kerek'), { icon: 'circle-alert' });
        if (!a) return toast(t('Muǵdardı kirgiziń'), { icon: 'circle-alert' });
        const rec = { id: edit ? edit.id : uid(), type: 'transfer', amount: a, wallet: f, to, date: $('#trD').value || today(), note: '', ts: Date.now() };
        if (edit) S.tx = S.tx.map(x => x.id === edit.id ? rec : x); else S.tx.push(rec);
        save(); Sheet.close(); renderView(); 
      };
      const d = $('#trDel'); if (d) d.onclick = () => { S.tx = S.tx.filter(x => x.id !== edit.id); save(); Sheet.close(); renderView(); toast(t('Operaciya óshirildi'), { icon: 'trash-2' }); };
    }
  });
}
function openAllTx(focus) {
  const st = { q: '', f: 'all' };
  const listHtml = () => {
    const q = toLat(st.q.trim());
    const list = S.tx.filter(x => (st.f === 'all' || x.type === st.f) && (!q || toLat(catById(x.cat).name + ' ' + (x.note || '') + ' ' + walletName(x.wallet) + ' ' + x.amount).includes(q)));
    const inc = sum(list, 'income'), exp = sum(list, 'expense');
    return `<div class="duo-mini"><div class="dm in"><small>${t('Kirim')}</small><b class="num ell">${hideable('+' + short(inc))}</b></div><div class="dm out"><small>${t('Shıǵım')}</small><b class="num ell">${hideable('−' + short(exp))}</b></div><div class="dm"><small>${t('Sanı')}</small><b class="num">${list.length}</b></div></div>
      ${list.length ? txGroups(list) : `<div class="card empty"><span class="e-ic">${ic('search-x')}</span>${t('Hesh nárse tabılmadı')}</div>`}`;
  };
  Page.open({
    title: t('Barlıq operaciyalar'), sub: `${S.tx.length} ${t('operaciya')}`,
    right: `<button class="pg-btn" id="atAdd" aria-label="add">${ic('plus')}</button>`,
    html: () => `<label class="search">${ic('search')}<input id="atQ" value="${esc(st.q)}" placeholder="${t('Izlew: kategoriya, eskertpe, muǵdar')}"></label>
      <div class="seg">${[['all', 'Barlıǵı'], ['income', 'Kirim'], ['expense', 'Shıǵım'], ['transfer', 'Awdarma']].map(([k, l]) => `<button data-f="${k}" class="${st.f === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
      <div id="atList" style="display:flex;flex-direction:column;gap:8px">${listHtml()}</div>`,
    mount: el => {
      const paint = () => { $('#atList').innerHTML = listHtml(); refreshIcons(); bindTx($('#atList')); };
      bindTx(el);
      $('#atQ').oninput = e => { st.q = e.target.value; paint(); };
      if (focus) setTimeout(() => $('#atQ') && $('#atQ').focus(), 300);
      $('#atAdd').onclick = () => openTx('expense');
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
    html: () => `<div class="card cat-hero"><span class="ci lg" style="background:${ct.color}">${ic(ct.icon)}</span>
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
function renderStats() {
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
      return `<button class="crow" data-cat="${c}"><span class="cr-h"><span class="ci sm" style="background:${ct.color}">${ic(ct.icon)}</span><b class="ell">${esc(t(ct.name))}</b><small class="num">${lim ? `${t('limit')} ${short(lim)}` : p + '%'}</small></span>
        <span class="cr-bar ${lim && v > lim ? 'over' : ''}"><i style="width:${clamp(v / ref * 100, 2, 100)}%"></i></span><span class="cr-f num">${hideable(grp(v))} ${cur()}</span></button>`; }).join('')}</div>`
      : `<div class="card empty"><span class="e-ic">${ic('chart-pie')}</span>${t('Bul dáwirde maǵlıwmat joq')}</div>`}

    ${hm ? `<section class="card heat-card"><div class="sec-h" style="margin:0"><h3>${t('Kalendar')}</h3><span class="badge">${t(MONTHS[hm.getMonth()])}</span></div><div class="heat2">${heat}</div>
      <div class="legend"><span><i class="legend-dot" style="background:var(--violet)"></i>${t('Ortashadan kóp')}</span><span><i class="legend-dot" style="background:var(--lav-2)"></i>${t('Az')}</span><span><i class="legend-dot hatch"></i>${t('Shıǵım joq')}</span></div></section>` : ''}

    ${max ? `<div class="card fc"><div class="fc-top"><span class="ell">${t('Ay aqırına prognoz')}</span><span class="badge ink">MAX</span></div>
        <div class="fc-v num">${short(fc.proj)} <i>${cur()}</i></div>
        <div class="cr-bar ${S.budget.total && fc.proj > S.budget.total ? 'over' : ''}"><i style="width:${S.budget.total ? clamp(fc.proj / S.budget.total * 100, 0, 100) : 60}%"></i></div>
        <div class="t-s">${S.budget.total ? (fc.proj > S.budget.total ? t(`Usı pátte byudjetten ${short(fc.proj - S.budget.total)} swm asıp ketiwi múmkin`) : t(`Byudjette ${short(S.budget.total - fc.proj)} swm qalıwı kútiledi`)) : t('Byudjet ornatılmaǵan')}</div></div>`
      : `<button class="card fc locked" id="stLock"><span class="lk">${ic('lock')}</span><span style="flex:1;min-width:0"><b>${t('Ay aqırına prognoz')}</b><small>${t('MAX tarifinde ashıladı')}</small></span><span class="badge ink">MAX</span></button>`}

    <div class="insights">
      <div class="card ins"><span class="ins-ic">${ic('calendar-days')}</span><small>${t('Ortasha kúnlik')}</small><b class="num ell">${hideable(short(exp / elapsed))}</b></div>
      <div class="card ins"><span class="ins-ic">${ic('flame')}</span><small>${t('Eń qımbat kún')}</small><b class="num ell">${topDay ? hideable(short(topDay[1])) : '—'}</b></div>
      <div class="card ins"><span class="ins-ic">${ic('piggy-bank')}</span><small>${t('Jinaq dárejesi')}</small><b class="num">${saveRate}%</b></div>
      <div class="card ins dark"><span class="ins-ic">${ic('scale')}</span><small>${t('Qaldıq')}</small><b class="num ell">${hideable((inc - exp >= 0 ? '+' : '−') + short(Math.abs(inc - exp)))}</b></div>
    </div>`;
  $$('[data-p]', el).forEach(b => b.onclick = () => { UI.statPeriod = b.dataset.p; UI.statOffset = 0; UI.capSel = null; renderView(); });
  $$('[data-st]', el).forEach(b => b.onclick = () => { UI.statType = b.dataset.st; UI.capSel = null; UI.gaugeCat = 'all'; renderView(); });
  $('#stPrev').onclick = () => { UI.statOffset++; UI.capSel = null; renderView(); };
  $('#stNext').onclick = () => { if (UI.statOffset > 0) { UI.statOffset--; UI.capSel = null; renderView(); } };
  $$('[data-cap]', el).forEach(b => b.onclick = () => { UI.capSel = +b.dataset.cap; renderView(); });
  $$('[data-cat]', el).forEach(b => b.onclick = () => openCatTx(b.dataset.cat, R));
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
function renderServices() {
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
      <button class="tt v" id="tlDep"><span class="tt-top"><span class="tt-ic">${ic('piggy-bank')}</span><span class="tt-go">${ic('arrow-up-right')}</span></span><b>${t('Depozit kalkulyatorı')}</b></button>
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
      <div class="row2"><div class="field"><label>${t('Jıllıq procent')} (%)</label><input class="inp num" id="crP" inputmode="decimal" value="24"></div>
      <div class="field"><label>${t('Múddeti (ay)')}</label><input class="inp num" id="crM" inputmode="numeric" value="24"></div></div>
      <div class="bento" id="crR"></div>`,
    mount: el => {
      bindMoney(el);
      const calc = () => {
        const A = parseMoney($('#crA').value), p = parseFloat(String($('#crP').value).replace(',', '.')) || 0, n = parseInt($('#crM').value) || 0;
        if (!A || !n) { $('#crR').innerHTML = ''; return; }
        const i = p / 1200; const m = i ? A * i / (1 - Math.pow(1 + i, -n)) : A / n; const total = m * n;
        $('#crR').innerHTML = `<div class="card tile violet wide"><div class="t-h">${t('Aylıq tólem')}</div><div class="t-v num">${grp(m)} ${cur()}</div></div>
          <div class="card tile"><div class="t-h">${t('Jámi tólem')}</div><div class="t-v num">${short(total)}</div></div>
          <div class="card tile"><div class="t-h">${t('Artıq tólem')}</div><div class="t-v num">${short(total - A)}</div></div>`;
      };
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
function renderProfile() {
  const el = $('#v-profile'); const max = isMax(); const p = S.profile || {};
  const r = monthRange(); const l = inRange(r.a, r.b); const inc = sum(l, 'income'), exp = sum(l, 'expense');
  const rate = inc ? Math.max(0, Math.round((inc - exp) / inc * 100)) : 0;
  const lock = max ? '' : '<span class="badge ink">MAX</span>';
  const row = (id, icon, title, sub = '', right = ic('chevron-right'), cls = '') => `<button class="row" id="${id}"><span class="r-ic ${cls}">${ic(icon)}</span><span class="r-t"><div>${t(title)}</div>${sub ? `<small>${sub}</small>` : ''}</span><span class="r-v">${right}</span></button>`;
  const sw = (id, icon, title, sub, on) => `<button class="row" id="${id}" role="switch" aria-checked="${on}"><span class="r-ic">${ic(icon)}</span><span class="r-t"><div>${t(title)}</div>${sub ? `<small>${t(sub)}</small>` : ''}</span><span class="switch ${on ? 'on' : ''}"></span></button>`;
  el.innerHTML = `
    <section class="pf">
      <div class="pf-band"><span class="pf-plan">${ic(max ? 'gem' : 'zap')}${max ? 'MAX' : 'PRO'}</span><button class="circ" id="pfEdit" aria-label="edit">${ic('pencil')}</button></div>
      <div class="pf-ava-wrap"><button id="pfAva" class="pf-ava-btn" aria-label="photo">${avatarHtml('xl')}<span class="pf-cam">${ic('camera')}</span></button></div>
      <h2 class="pf-name">${esc(t(displayName()))}</h2>
      <div class="pf-sub">${p.phone ? `<span class="num">+998 ${esc(fmtPhone(p.phone))}</span>` : `<button class="link" id="pfAddPh">${ic('plus')}${t('Telefon nomerin qosıw')}</button>`}</div>
      <div class="pf-status"><span class="status-chip ${max ? 'biz' : ''}">${ic(max ? 'briefcase-business' : 'user-round')}${max ? 'BUSINESS' : t('Paydalanıwshı')}</span>
        <small class="muted">${max && S.planUntil ? `${t('MAX ámel etedi')}: ${S.planUntil.split('-').reverse().join('.')}` : t('PRO tarif aktiv')}</small></div>
      <div class="pf-metrics">
        <div><b class="num">${S.tx.length}</b><small>${t('operaciya')}</small></div>
        <div><b class="num">${streak()}</b><small>${t('kún izbe-iz')}</small></div>
        <div><b class="num">${rate}%</b><small>${t('jinaq')}</small></div>
        <div><b class="num">${S.wallets.length}</b><small>${t('hamyan')}</small></div>
      </div>
      <div class="pf-quick">
        <button id="pqPlan">${ic(max ? 'gem' : 'crown')}<span>${t('Tarif')}</span></button>
        <button id="pqStyle">${ic('palette')}<span>${t('Stil')}</span></button>
        <button id="pqReport">${ic('file-chart-column')}<span>${t('Esabat')}</span></button>
      </div>
    </section>
    ${max ? `<section class="biz-card">
        <div class="bz-top"><span class="bz-logo">${ic('gem')}</span><div style="flex:1;min-width:0"><b>BUSINESS</b><small class="ell">${t('MAX múmkinshilikleri aktiv')}</small></div><span class="bz-chip">${S.autoRenew ? t('Avto') : t('Qolda')}</span></div>
        <div class="bz-grid">
          <button id="bzBiz">${ic('briefcase-business')}<span>${t('Biznes')}</span></button>
          <button id="bzRep">${ic('file-chart-column')}<span>${t('Esabat')}</span></button>
          <button id="bzCal">${ic('calendar-range')}<span>${t('Kalendar')}</span></button>
          <button id="bzFc">${ic('trending-up')}<span>${t('Prognoz')}</span></button>
        </div></section>`
      : `<button class="max-banner" id="pfMax"><span class="mb-gem">${ic('gem')}</span><span class="mb-t"><small>${t('Jańa dárejege kóteriliń')}</small><b>PulCount MAX</b><span class="mb-f">${['Sheksiz AI', 'Biznes paneli', 'Aurora'].map(f => `<i>${t(f)}</i>`).join('')}</span></span><span class="mb-go">${ic('arrow-up-right')}</span></button>`}

    <div class="group"><h4>${t('QARJÍ')}</h4><div class="card list">
      ${row('pfWallets', 'wallet', 'Hamyanlar', `${S.wallets.length} ${t('hamyan')} · ${grp(totalBal())} ${cur()}`)}
      ${row('pfCats', 'shapes', 'Kategoriyalar', `${S.cats.length} ${t('kategoriya')}`)}
      ${row('pfBudget', 'chart-pie', 'Byudjet hám limitler', S.budget.total ? `${t('Ayına')} ${grp(S.budget.total)} ${cur()}` : t('Ornatılmaǵan'))}
      ${row('pfGoals', 'target', 'Jinaq maqsetleri', `${S.goals.length} ${t('maqset')}`)}
      ${row('pfDebts', 'hand-coins', 'Qarız dápteri', `${S.debts.filter(d => !d.paid).length} ${t('aktiv qarız')}`)}
      ${row('pfRec', 'calendar-clock', 'Turaqlı tólemler', `${S.recurring.length} ${t('tólem')}`)}
    </div></div>

    <div class="group"><h4>MAX</h4><div class="card list">
      ${row('pfBiz', 'briefcase-business', 'Biznes paneli', t('Klientler hám hisob-fakturalar'), lock || ic('chevron-right'))}
      ${row('pfRep', 'file-chart-column', 'AI ay esabatı', t('Qarjı densawlıǵı balı'), lock || ic('chevron-right'))}
      ${row('pfCal', 'calendar-range', 'Tólem kalendarı', t('Barlıq tólemler bir kalendarda'), lock || ic('chevron-right'))}
    </div></div>

    <div class="group" id="grpStyle"><h4>${t('PROGRAMMA STILI')}</h4><div class="card list">
      <div class="style-pick">
        <button class="sp ${S.style === 'classic' ? 'on' : ''}" data-style="classic"><span class="prev c"><i></i><i></i><i></i></span><span class="ell">Classic</span></button>
        <button class="sp ${S.style === 'glass' ? 'on' : ''}" data-style="glass"><span class="prev g"><i></i><i></i><i></i></span><span class="ell">Liquid Glass</span></button>
        <button class="sp ${S.style === 'aurora' ? 'on' : ''}" data-style="aurora"><span class="prev a"><i></i><i></i><i></i>${max ? '' : `<em>${ic('lock')}</em>`}</span><span class="ell">Aurora</span></button>
      </div>
      <div style="padding:4px 8px 10px"><div class="seg ${S.style === 'aurora' && max ? 'dim' : ''}">
        <button data-mode="light" class="${S.mode === 'light' ? 'on' : ''}">${t('Jaqtı')}</button><button data-mode="dark" class="${S.mode === 'dark' ? 'on' : ''}">${t('Qarańǵı')}</button><button data-mode="auto" class="${S.mode === 'auto' ? 'on' : ''}">${t('Avtomat')}</button></div></div>
      ${sw('pfElder', 'accessibility', 'Úlkenler ushın rejim', 'Úlken jazıw hám anıq tuymeler', S.elder)}
    </div></div>

    <div class="group"><h4>${t('TIL')}</h4><div class="card list">
      <div style="padding:8px"><div class="seg violet"><button data-lang="lat" class="${S.lang === 'lat' ? 'on' : ''}">Latın</button><button data-lang="cyr" class="${S.lang === 'cyr' ? 'on' : ''}">Кирил</button></div></div>
    </div></div>

    <div class="group"><h4>${t('QÁWIPSIZLIK')}</h4><div class="card list">
      ${row('pfPin', 'lock', 'PIN-kod', S.pin ? t('Qosılǵan') : t('Óshirilgen'))}
      ${sw('pfHide', 'eye-off', 'Balanstı jasırıw', 'Summalar bulıńǵır kórinedi', S.hideBal)}
    </div></div>

    <div class="group"><h4>${t('BASQA')}</h4><div class="card list">
      ${row('pfPlans', max ? 'gem' : 'crown', 'Tarifler', max ? 'MAX · BUSINESS' : 'PRO')}
      ${row('pfAds', 'megaphone', 'Reklama ushın arza', S.ads.length ? `${S.ads.length} ${t('arza jiberilgen')}` : t('Biznesińizdi usınıń'))}
      ${row('pfNotif', 'bell', 'Xabarlamalar', `${unread()} ${t('jańa')}`)}
      ${row('pfData', 'database', 'Maǵlıwmatlar', t('Eksport, rezerv nusqa, tazalaw'))}
      ${row('pfHelp', 'circle-help', 'Járdem hám sorawlar')}
      ${row('pfRate', 'star', 'Qosımshanı bahalaw', S.rated ? '★'.repeat(S.rated) : '')}
      ${row('pfIntro', 'play', 'Introdı qayta kóriw')}
      ${row('pfAbout', 'info', 'Qosımsha haqqında', 'PulCount v3.0')}
    </div></div>
    <p class="muted" style="text-align:center;font-size:.75rem;margin:4px 0 0">PulCount · ${t('Jaratıwshı')}: ${t('Qonarbaev Damir')}</p>
  `;
  $('#pfEdit').onclick = openProfileEdit; $('#pfAva').onclick = openProfileEdit;
  const aph = $('#pfAddPh'); if (aph) aph.onclick = openProfileEdit;
  $('#pqPlan').onclick = () => openPlans(); $('#pqReport').onclick = openReport;
  $('#pqStyle').onclick = () => $('#grpStyle').scrollIntoView({ behavior: 'smooth', block: 'center' });
  const pm = $('#pfMax'); if (pm) pm.onclick = () => openPlans('max');
  const bb = $('#bzBiz'); if (bb) { bb.onclick = openBusiness; $('#bzRep').onclick = openReport; $('#bzCal').onclick = openCalendar; $('#bzFc').onclick = () => setTab('stats'); }
  $('#pfWallets').onclick = openWallets; $('#pfCats').onclick = openCats; $('#pfBudget').onclick = openBudget; $('#pfGoals').onclick = openGoals;
  $('#pfDebts').onclick = openDebts; $('#pfRec').onclick = openRecurring; $('#pfBiz').onclick = openBusiness; $('#pfRep').onclick = openReport; $('#pfCal').onclick = openCalendar;
  $$('[data-style]', el).forEach(b => b.onclick = () => {
    const st = b.dataset.style;
    if (st === 'aurora' && !isMax()) return openPlans('max');
    S.style = st; save(); applyLook(); renderView();
  });
  $$('[data-mode]', el).forEach(b => b.onclick = () => { S.mode = b.dataset.mode; save(); applyLook(); renderView(); });
  $('#pfElder').onclick = () => { S.elder = !S.elder; save(); applyLook(); renderView(); };
  $$('[data-lang]', el).forEach(b => b.onclick = () => { S.lang = b.dataset.lang; save(); renderAll(); });
  $('#pfPin').onclick = openPinSetup;
  $('#pfHide').onclick = () => { S.hideBal = !S.hideBal; save(); renderView(); };
  $('#pfPlans').onclick = () => openPlans(); $('#pfAds').onclick = openAds; $('#pfNotif').onclick = openNotifs; $('#pfData').onclick = openData;
  $('#pfHelp').onclick = openHelp; $('#pfRate').onclick = openRate; $('#pfIntro').onclick = () => runIntro(); $('#pfAbout').onclick = openAbout;
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
  const ava = () => p.photo ? `<img src="${p.photo}" alt="">` : `<span>${esc(initials(t([p.first, p.last].filter(Boolean).join(' ') || 'P')))}</span>`;
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
        <div class="field"><label for="peM">${t('Ákesiniń atı')}</label><input class="inp" id="peM" value="${esc(p.father)}" maxlength="28" placeholder="${t('Mısalı: Azamat ulı')}"></div>
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
function openWallets() {
  Sheet.open({
    title: t('Hamyanlar'),
    html: () => `<div class="card list">${S.wallets.map(w => `<button class="row" data-we="${w.id}"><span class="r-ic ${w.theme === 'ink' ? 'ink' : ''}">${ic(w.icon)}</span><span class="r-t"><div>${esc(t(w.name))}</div><small>${w.no ? esc(w.no) : t('Naq aqsha / basqa')}</small></span><span class="r-v num"><span>${grp(walletBal(w.id))}</span></span></button>`).join('')}</div>
      <button class="btn pri" id="wAdd">${ic('plus')}${t('Jańa hamyan')}</button>
      ${isMax() ? '' : `<div class="demo-note">${ic('info')}${t('PRO tarifte 5 hamyanǵa shekem, MAX ta sheksiz')}</div>`}`,
    mount: el => { $$('[data-we]', el).forEach(b => b.onclick = () => openWalletEdit(walletById(b.dataset.we))); $('#wAdd').onclick = () => openWalletEdit(); }
  });
}
function openWalletEdit(w = null) {
  if (!w && !isMax() && S.wallets.length >= 5) { toast(t('Kóbirek hamyan ushın MAX tarif kerek'), { icon: 'gem' }); return openPlans('max'); }
  const st = w ? { ...w } : { name: '', icon: 'credit-card', theme: 'violet', initial: 0, no: '' };
  const themes = ['violet', 'ink', 'paper', 'lilac'];
  Sheet.open({
    title: w ? t('Hamyandı ózgertiw') : t('Jańa hamyan'),
    html: () => `<div class="field"><label>${t('Atı')}</label><input class="inp" id="wN" value="${esc(st.name)}" placeholder="${t('Mısalı: Uzcard aylıq')}" maxlength="24"></div>
      <div class="field"><label>${t('Karta nomeriniń aqırı (májbúriy emes)')}</label><input class="inp num" id="wNo" value="${esc(st.no || '')}" placeholder="8600 •• 1234" maxlength="16"></div>
      <div class="field"><label>${t('Baslanǵısh balans')} (${cur()})</label>${moneyInput('wI', st.initial)}</div>
      <div class="field"><label>${t('Belgi')}</label><div class="chips">${['credit-card', 'wallet', 'banknote', 'piggy-bank', 'landmark', 'smartphone'].map(i => `<button class="chip ${i === st.icon ? 'on' : ''}" data-wi="${i}">${ic(i)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Reń')}</label><div class="hscroll" style="margin:0;padding:4px 0">${themes.map(th => `<button class="wallet t-${th}" data-wt="${th}" style="flex:0 0 96px;min-height:64px;${th === st.theme ? 'outline:3px solid var(--violet);outline-offset:2px' : ''}"></button>`).join('')}</div></div>
      <button class="btn pri" id="wOk">${t('Saqlaw')}</button>
      ${w ? `<button class="btn danger" id="wDel">${ic('trash-2')}${t('Hamyandı óshiriw')}</button>` : ''}`,
    mount: el => {
      bindMoney(el);
      $$('[data-wi]', el).forEach(b => b.onclick = () => { st.icon = b.dataset.wi; $$('[data-wi]', el).forEach(x => x.classList.toggle('on', x === b)); });
      $$('[data-wt]', el).forEach(b => b.onclick = () => { st.theme = b.dataset.wt; $$('[data-wt]', el).forEach(x => x.style.outline = x === b ? '3px solid var(--violet)' : ''); });
      $('#wOk').onclick = () => {
        st.name = $('#wN').value.trim(); st.no = $('#wNo').value.trim(); st.initial = parseMoney($('#wI').value);
        if (!st.name) return toast(t('Atın kirgiziń'), { icon: 'circle-alert' });
        if (w) S.wallets = S.wallets.map(x => x.id === w.id ? st : x); else S.wallets.push({ ...st, id: uid() });
        save(); Sheet.back(); Sheet.refresh(); renderView(); 
      };
      const d = $('#wDel'); if (d) d.onclick = async () => {
        if (S.wallets.length <= 1) return toast(t('Keminde bir hamyan qalıwı kerek'), { icon: 'circle-alert' });
        if (await ask('Hamyandı óshiriw', 'Bul hamyandaǵı barlıq operaciyalar da óshiriledi.', 'Óshiriw', true)) {
          S.tx = S.tx.filter(x => x.wallet !== w.id && x.to !== w.id); S.wallets = S.wallets.filter(x => x.id !== w.id); if (S.homeWallet === w.id) S.homeWallet = 'all';
          save(); Sheet.back(); Sheet.refresh(); renderView(); toast(t('Hamyan óshirildi'), { icon: 'trash-2' });
        }
      };
    }
  });
}
/* categories */
function openCats() {
  let type = 'expense';
  Sheet.open({
    title: t('Kategoriyalar'),
    html: () => `<div class="seg"><button data-ct="expense" class="${type === 'expense' ? 'on' : ''}">${t('Shıǵım')}</button><button data-ct="income" class="${type === 'income' ? 'on' : ''}">${t('Kirim')}</button></div>
      <div class="cat-grid">${S.cats.filter(c => c.type === type).map(c => `<button class="cat" data-ce="${c.id}"><span class="c-ic" style="background:${c.color}">${ic(c.icon)}</span><span>${esc(t(c.name))}</span></button>`).join('')}
        <button class="cat" id="cAdd"><span class="c-ic" style="background:var(--chip);color:var(--violet)">${ic('plus')}</span><span>${t('Qosıw')}</span></button></div>`,
    mount: el => {
      $$('[data-ct]', el).forEach(b => b.onclick = () => { type = b.dataset.ct; Sheet.refresh(); });
      $$('[data-ce]', el).forEach(b => b.onclick = () => openCatEdit(S.cats.find(c => c.id === b.dataset.ce)));
      $('#cAdd').onclick = () => openCatEdit(null, type);
    }
  });
}
function openCatEdit(c = null, type = 'expense') {
  const st = c ? { ...c } : { name: '', icon: 'shopping-basket', color: PALETTE[0], type };
  Sheet.open({
    title: c ? t('Kategoriyanı ózgertiw') : t('Jańa kategoriya'),
    html: () => `<div style="display:grid;place-items:center"><span class="c-ic" id="ceP" style="width:72px;height:72px;border-radius:24px;display:grid;place-items:center;color:#fff;background:${st.color}">${ic(st.icon)}</span></div>
      <div class="field"><label>${t('Atı')}</label><input class="inp" id="ceN" value="${esc(st.name)}" maxlength="22" placeholder="${t('Mısalı: Balalar')}"></div>
      <div class="field"><label>${t('Belgi')}</label><div class="chips">${CAT_ICONS.map(i => `<button class="chip ${i === st.icon ? 'on' : ''}" data-ci="${i}" aria-label="${i}">${ic(i)}</button>`).join('')}</div></div>
      <div class="field"><label>${t('Reń')}</label><div class="chips">${PALETTE.map(p => `<button class="chip" data-cc="${p}" style="width:40px;height:40px;padding:0;background:${p};${p === st.color ? 'outline:3px solid var(--violet);outline-offset:2px' : ''}" aria-label="${p}"></button>`).join('')}</div></div>
      <button class="btn pri" id="ceOk">${t('Saqlaw')}</button>
      ${c ? `<button class="btn danger" id="ceDel">${ic('trash-2')}${t('Óshiriw')}</button>` : ''}`,
    mount: el => {
      $$('[data-ci]', el).forEach(b => b.onclick = () => { st.icon = b.dataset.ci; $$('[data-ci]', el).forEach(x => x.classList.toggle('on', x === b)); $('#ceP').innerHTML = ic(st.icon); refreshIcons(); });
      $$('[data-cc]', el).forEach(b => b.onclick = () => { st.color = b.dataset.cc; $('#ceP').style.background = st.color; $$('[data-cc]', el).forEach(x => x.style.outline = x === b ? '3px solid var(--violet)' : ''); });
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
        <span class="r-ic" style="background:${c.color};color:#fff">${ic(c.icon)}</span><span class="r-t"><div>${esc(t(c.name))}</div><small class="num">${t('Jumsaldı')}: ${grp(s)}</small></span>
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
function openGoals() {
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
          <div class="field"><label>${t('Kerekli summa')} (${cur()})</label>${moneyInput('gT')}</div>
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
          html: () => `<div class="field"><label>${t('Summa')} (${cur()})</label>${moneyInput('gA')}</div>
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
function openDebts() {
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
      <span class="r-ic" style="background:${c.color};color:#fff">${ic(c.icon)}</span><span class="r-t"><div>${esc(t(p.name))}</div><small>${t('Hár ayda')} ${p.day}-${t('sáne')} · <span class="num">${grp(p.amount)}</span></small></span>
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
        <div class="pc-wallet"><div style="min-width:0"><small class="ell">${w ? esc(t(w.name)).toUpperCase() : ''}</small><b class="num ell">${w ? grp(walletBal(w.id)) : 0} ${cur()}</b></div><span class="mini-card t-${w ? w.theme : 'violet'}"><i></i></span></div>
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
            <div class="muted">PulCount MAX · 30 ${t('kún')}</div><hr>
            <div class="kv"><span>${t('Hamyan')}</span><span>${walletName(wallet)}</span></div>
            <div class="kv"><span>${t('Avto sheship alıw')}</span><span>${S.autoRenew ? t('Qosılǵan') : t('Óshirilgen')}</span></div></div>
            <div class="slider" id="slider"><div class="s-fill"></div><div class="s-txt">${t('Tólew ushın súyreń')}</div><div class="knob">${ic('chevrons-right')}</div></div>
            <div class="demo-note">${ic('shield-check')}${t('Demo rejim: summa hamyannan shıǵım retinde jazıladı')}</div>`,
          mount: e2 => slideToConfirm($('#slider', e2), () => {
            S.tx.push({ id: uid(), type: 'expense', amount: P.price, cat: 'other', wallet, date: today(), note: 'PulCount MAX', ts: Date.now() });
            S.plan = 'max'; S.planUntil = iso(addDays(new Date(), 30)); S.planWallet = wallet; save();
            Sheet.replace({
              title: '', html: () => `<div class="success"><span class="ok-c">${ic('gem')}</span><h3>${t('MAX aktivlestirildi!')}</h3><span class="status-chip biz">${ic('briefcase-business')}BUSINESS</span><div class="muted" style="margin-top:4px">${t('Statusıńız BUSINESS ke ózgerdi')}</div></div>
                <button class="pc-buy" id="mxAur">${ic('sparkle')}${t('Aurora stilin qosıw')}</button><button class="btn ghost" id="mxDone">${t('Keyinirek')}</button>`,
              mount: () => { vib([20, 40, 20]); confetti(160); $('#mxAur').onclick = () => { S.style = 'aurora'; save(); Sheet.close(); Page.closeAll(); renderAll(); }; $('#mxDone').onclick = () => { Sheet.close(); Page.refresh(); }; }
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
  if (await ask('MAX tarifin biykarlaw', 'MAX múmkinshilikleri, Aurora stili hám BUSINESS statusı óshiriledi. Tóleńgen summa qaytarılmaydı.', 'Biykarlaw', true)) {
    S.plan = 'pro'; S.planUntil = null; S.autoRenew = false; if (S.style === 'aurora') S.style = 'glass'; save(); Page.closeAll(); renderAll();
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
      <div class="card crows">${top.map(([c, v]) => { const ct = catById(c); return `<div class="crow"><span class="cr-h"><span class="ci sm" style="background:${ct.color}">${ic(ct.icon)}</span><b class="ell">${esc(t(ct.name))}</b><small class="num">${exp ? Math.round(v / exp * 100) : 0}%</small></span><span class="cr-bar"><i style="width:${exp ? v / exp * 100 : 0}%"></i></span><span class="cr-f num">${grp(v)} ${cur()}</span></div>`; }).join('') || `<div class="muted">${t('Maǵlıwmat joq')}</div>`}</div>
      <div class="sec-h"><h3>${t('AI keńesleri')}</h3></div>
      <div class="card advice">${esc(aiAnswer('keńes ber').text)}</div>`
  });
}
/* MAX: payment calendar */
function openCalendar() {
  if (!isMax()) return openPlans('max');
  let off = 0, sel = today();
  Page.open({
    title: t('Tólem kalendarı'), sub: 'MAX',
    html: () => {
      const base = new Date(new Date().getFullYear(), new Date().getMonth() + off, 1); const y = base.getFullYear(), m = base.getMonth();
      const nd = new Date(y, m + 1, 0).getDate(); const first = (new Date(y, m, 1).getDay() + 6) % 7;
      const ev = {};
      const add = (d, e) => (ev[d] = ev[d] || []).push(e);
      S.recurring.forEach(p => add(iso(new Date(y, m, Math.min(p.day, nd))), { icon: 'repeat', name: t(p.name), amount: p.amount, kind: t('Turaqlı tólem'), done: p.paid === `${y}-${pad(m + 1)}` }));
      S.debts.filter(d => !d.paid).forEach(d => add(d.due, { icon: 'hand-coins', name: d.name, amount: d.amount, kind: t(d.type === 'given' ? 'Qarız qaytarıladı' : 'Qarızdı tólew') }));
      S.invoices.filter(i => !i.paid).forEach(i => add(i.due, { icon: 'file-text', name: i.client, amount: i.amount, kind: t('Hisob-faktura') }));
      if (S.plan === 'max' && S.planUntil) add(S.planUntil, { icon: 'gem', name: 'PulCount MAX', amount: PLANS.max.price, kind: t('Tarif jańalanıwı') });
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
    html: () => `<div class="card tile ink" style="gap:8px"><span class="chip-ic">${ic('megaphone')}</span><div style="font-weight:700">${t('Biznesińizdi PulCount paydalanıwshılarına kórsetiń')}</div>
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
function openData() {
  Sheet.open({
    title: t('Maǵlıwmatlar'),
    html: () => `<div class="card list">
      <button class="row" id="dtCsv"><span class="r-ic">${ic('file-spreadsheet')}</span><span class="r-t"><div>${t('CSV eksport (Excel)')}</div><small>${S.tx.length} ${t('operaciya')}</small></span>${ic('download')}</button>
      <button class="row" id="dtBak"><span class="r-ic">${ic('database-backup')}</span><span class="r-t"><div>${t('Rezerv nusqa (JSON)')}</div><small>${t('Barlıq maǵlıwmattı saqlaw yamasa tiklew')}</small></span>${ic('chevron-right')}</button>
      <button class="row" id="dtDemo"><span class="r-ic">${ic('eraser')}</span><span class="r-t"><div>${t('Operaciyalardı tazalaw')}</div><small>${t('Sazlawlar saqlanadı, jazıwlar óshiriledi')}</small></span>${ic('chevron-right')}</button>
      <button class="row" id="dtReset"><span class="r-ic" style="background:rgba(229,72,77,.12);color:var(--bad)">${ic('trash-2')}</span><span class="r-t"><div style="color:var(--bad)">${t('Hámmesin baslanǵısh halına qaytarıw')}</div><small>${t('Demo maǵlıwmatlar menen qayta baslaw')}</small></span></button>
    </div>`,
    mount: () => {
      $('#dtCsv').onclick = () => {
        const csv = toCSV(); download(`pulcount-${today()}.csv`, csv, 'text/csv;charset=utf-8');
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
            $('#bkD').onclick = () => download(`pulcount-backup-${today()}.json`, json, 'application/json');
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
        if (await ask('Baslanǵısh halına qaytarıw', 'Barlıq sazlawlar hám maǵlıwmatlar óshiriledi.', 'Qaytarıw', true)) { store.clear(); S = defaults(true); save(); Sheet.close(); renderAll(); runIntro(); }
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
    html: () => `<p class="muted" style="margin:0;text-align:center">${t('PulCount sizge unadı ma?')}</p>
      <div style="display:flex;justify-content:center;gap:8px">${[1, 2, 3, 4, 5].map(i => `<button data-star="${i}" style="color:${i <= S.rated ? 'var(--violet)' : 'var(--line)'};font-size:2rem">${ic('star')}</button>`).join('')}</div>`,
    mount: el => $$('[data-star]', el).forEach(b => b.onclick = () => { S.rated = +b.dataset.star; save(); Sheet.close(); renderView(); if (S.rated === 5) confetti(80); })
  });
}
function openAbout() {
  Sheet.open({
    title: t('Qosımsha haqqında'),
    html: () => `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:6px 0">
        <svg viewBox="0 0 118 118" width="92" height="92"><defs><linearGradient id="ab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C7B6FF"/><stop offset=".5" stop-color="#7B5CFA"/><stop offset="1" stop-color="#5233E0"/></linearGradient></defs>
        <rect x="4" y="4" width="110" height="110" rx="34" fill="#7B5CFA"/><path d="M42 86V34h22a16 16 0 0 1 0 32H42" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="80" cy="82" r="7" stroke="#fff" stroke-width="5" fill="none"/></svg>
        <div style="font-family:var(--f-display);font-weight:800;font-size:1.7rem;letter-spacing:-.03em">PulCount</div><span class="badge">${t('Versiya')} 3.0</span></div>
      <p style="margin:0;line-height:1.55;text-align:center">${t('PulCount — tolıǵı menen qaraqalpaq tilindegi kirim-shıǵımdı esaplaw qosımshası. Ol kúndelik qarjılarıńızdı jazıp barıwǵa, byudjet dúziwge, jinaq maqsetlerine jetiwge hám AI kómekshi arqalı ápiwayı tilde operaciya qosıwǵa járdem beredi.')}</p>
      <div class="creator">
        <span class="cr-ava">QD</span>
        <div><small>${t('Jaratıwshı')}</small><b>${t('Qonarbaev Damir')}</b></div>
      </div>
      <p class="muted" style="text-align:center;font-size:.78rem;margin:0">© 2026 PulCount</p>`
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
  lock.innerHTML = `<div class="orb"></div><h2>PulCount</h2><p class="muted" style="margin:0">${t('PIN-kodtı kirgiziń')}</p><div class="pin-dots">${'<i></i>'.repeat(4)}</div>
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
  income: ['ayliq', 'aylıq', 'zarplata', 'oklad', 'kirim', 'keldi', 'tústi', 'tusti', 'aldım', 'aldim', 'bonus', 'premiya', 'sıylıq', 'dáramat', 'daramat', 'tabıs', 'satdım', 'sattım', 'qaytardı', 'qaytardi', 'tapdım', 'tapqanım', 'dividend', 'kelip tústi'],
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
    salary: ['aylıq', 'ayliq', 'zarplata', 'oklad'],
    bonus: ['bonus', 'premiya', 'sıylıq'],
    biz: ['satdım', 'sattım', 'biznes', 'klient', 'buyırtpa', 'buyirtpa', 'zakaz'],
    gift_in: ['sawǵa aldım', 'sawga aldim'],
    invest: ['dividend', 'investiciya', 'depozit', 'procent']
  }
};
function parseAmount(s) {
  s = s.replace(/(\d)[\s ](?=\d{3}\b)/g, '$1');
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*(mlrd|milliard|mln|million|millon|mıń|miń|ming|min|myn|mng|k)?(?!\p{L})/iu);
  if (!m) return 0;
  let v = parseFloat(m[1].replace(',', '.')); const u = (m[2] || '').toLowerCase();
  if (/^ml(rd)|^milliard/.test(u)) v *= 1e9; else if (/^m(ln|illi)/.test(u)) v *= 1e6; else if (u) v *= 1e3;
  return Math.round(v);
}
function guessCat(s, type) {
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
  if (/s[aá]lem|assalaw|hello|privet/.test(s) && !amt) return { text: t(`Sálem, ${S.name}! Men PulCount AI. Maǵan operaciyanı ápiwayı tilde jazıń yamasa qarjılarıńız haqqında soraw beriń.`) };
  if (/raxmet|rahmet|sag bol/.test(s)) return { text: t('Arzımaydı! Jáne ne járdem kerek?') };
  if (amt && !isQ) {
    const type = KW.income.some(k => s.includes(k)) ? 'income' : 'expense';
    const cat = guessCat(s, type); const wallet = guessWallet(s);
    const date = /keshe|kecha/.test(s) ? iso(addDays(new Date(), -1)) : /búrsigún|bursigun/.test(s) ? iso(addDays(new Date(), -2)) : today();
    if (!wallet) return { text: t('Aldın Profil → Hamyanlar bóliminde hamyan qosıń.') };
    const note = raw.trim().slice(0, 50);
    const rec = { id: uid(), type, amount: amt, cat, wallet, date, note, ts: Date.now() };
    S.tx.push(rec); save(); renderView();
    const c = catById(cat);
    return { text: t(type === 'income' ? 'Kirim jazıldı:' : 'Shıǵım jazıldı:'), tx: rec, extra: (() => { const lim = S.budget.cats?.[cat]; if (type === 'expense' && lim) { const sp = catSpent(cat); return sp > lim ? t(`Dıqqat: «${c.name}» limiti asıldı (${short(sp)} / ${short(lim)}).`) : t(`«${c.name}» limitinen ${short(lim - sp)} swm qaldı.`); } return ''; })() };
  }
  if (/balans|qansha pul|qaldı/.test(s)) return { text: t(`Ulıwma balansıńız: ${grp(totalBal())} swm.\n`) + S.wallets.map(w => `• ${t(w.name)}: ${grp(walletBal(w.id))} ${cur()}`).join('\n') };
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
    let x = `<div class="m-row bot"><span class="m-ava">${ic('sparkles')}</span><div class="msg bot">${esc(m.text).replace(/\n/g, '<br>')}`;
    if (m.tx) {
      const tx = S.tx.find(z => z.id === m.tx.id);
      if (tx) {
        const c = catById(tx.cat);
        x += `<div class="tx-rcpt"><div class="tr-top"><span class="ci" style="background:${c.color}">${ic(c.icon)}</span><span class="badge ${tx.type === 'income' ? '' : 'ink'}">${t(tx.type === 'income' ? 'Kirim' : 'Shıǵım')}</span></div>
          <div class="amt num">${tx.type === 'income' ? '+' : '−'}${grp(tx.amount)} <small>${cur()}</small></div>
          <div class="meta"><span>${ic('tag')}${esc(t(c.name))}</span><span>${ic('wallet')}${walletName(tx.wallet)}</span><span>${ic('calendar')}${dayLabel(tx.date)}</span></div>
          <div class="act"><button class="tr-b" data-aedit="${tx.id}">${ic('pencil')}${t('Ózgertiw')}</button><button class="tr-b dark" data-aundo="${tx.id}">${ic('undo-2')}${t('Biykarlaw')}</button></div></div>`;
      } else x += `<div class="tx-rcpt off"><small>${t('Bul operaciya biykarlandı')}</small></div>`;
    }
    if (m.extra) x += `<div class="m-extra">${ic('info')}<span>${esc(m.extra)}</span></div>`;
    return x + '</div></div>';
  };
  const caps = [
    ['receipt', 'Operaciya jazıw', 'Taksi 25 mıń', 'v'], ['chart-pie', 'Analiz', 'Eń kóp qayda jumsadım?', 'k'],
    ['lightbulb', 'Keńes alıw', 'Keńes ber', 'l'], ['wallet', 'Balans', 'Balansım qansha?', 'w']
  ];
  const welcome = () => `<div class="welcome">${orbHtml('big')}<h3>${t('Sálem')}, <span>${esc(t(firstName()))}</span>!</h3><p class="muted">${t('Men PulCount AI. Operaciyanı ápiwayı jazıń yamasa qarjılarıńız haqqında soraw beriń.')}</p>
    <div class="cap-grid">${caps.map(([i, a, ex, cl]) => `<button class="cap ${cl}" data-sg="${ex}"><span class="ci2">${ic(i)}</span><span><b>${t(a)}</b><small>«${t(ex)}»</small></span></button>`).join('')}</div></div>`;
  const sugg = ['Taksi 25 mıń', 'Bazar 180 000 naq', 'Aylıq 6,5 mln keldi', 'Bul ay qansha jumsadım?', 'Byudjet jaǵdayı', 'Maqsetlerim'];
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const left = () => isMax() ? t('Sheksiz') : `${t('Búgin qaldı')}: ${30 - (S.aiCount.d === today() ? S.aiCount.n : 0)}`;
  Page.open({
    raw: true, noRefresh: true,
    head: `<div class="ai-top"><span id="aiOrb">${orbHtml()}</span><div style="min-width:0"><b>PulCount AI</b><small><span class="live"></span><span id="aiLeft" class="ell">${t('Onlayn')} · ${left()}</span></small></div></div>`,
    right: `<button class="pg-btn" id="aiClear" aria-label="clear">${ic('rotate-ccw')}</button>`,
    html: () => `<div class="chat" id="chat">${S.ai.length ? S.ai.map(msgHtml).join('') : welcome()}</div>
      <div class="ai-sugg">${sugg.map(s => `<button data-sg="${s}">${t(s)}</button>`).join('')}</div>
      <form class="ai-bar" id="aiF"><input id="aiI" placeholder="${t('Jazıń: taksi 25 mıń...')}" autocomplete="off">${SR ? `<button type="button" class="mic" id="aiMic" aria-label="mic">${ic('mic')}</button>` : ''}<button class="send" aria-label="send">${ic('arrow-up')}</button></form>`,
    mount: el => {
      const chat = $('#chat', el); const scroll = () => chat.scrollTop = chat.scrollHeight; scroll();
      const bindMsgs = () => {
        $$('[data-aundo]', chat).forEach(b => b.onclick = () => { S.tx = S.tx.filter(x => x.id !== b.dataset.aundo); save(); renderView(); chat.innerHTML = S.ai.map(msgHtml).join(''); refreshIcons(); bindMsgs(); });
        $$('[data-aedit]', chat).forEach(b => b.onclick = () => { const x = S.tx.find(z => z.id === b.dataset.aedit); if (x) openTx(x.type, null, x); });
        $$('.welcome [data-sg]', chat).forEach(b => b.onclick = () => send(t(b.dataset.sg)));
      };
      const send = txt => {
        txt = txt.trim(); if (!txt) return;
        if (!aiLimitOk()) { toast(t('Búgingi AI limiti tawsıldı. MAX ta — sheksiz.'), { icon: 'gem' }); return; }
        S.aiCount.n++; $('#aiLeft').textContent = `${t('Onlayn')} · ${left()}`;
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
  const cv = $('#confetti'); const ctx = cv.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.scale(dpr, dpr);
  const cols = ['#7B5CFA', '#A48BFF', '#1c1c1c', '#ffffff', '#C7B6FF'];
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
  if (introRunning) return; introRunning = true;
  const old = $('#intro'); const I = old.cloneNode(true); old.replaceWith(I);
  I.classList.remove('out', 'gone'); I.style.display = '';
  const nums = ['+25 000', '−12 400', '+6 500 000', '−180 000', '+1 200 000', '−45 000', '+500 000', '−84 000', '−320 000', '+19 900', '−1 800 000', '+2 026'];
  $$('.in-row', I).forEach((r, k) => { const s = [...nums.slice(k * 2), ...nums.slice(0, k * 2)].join('   ·   '); r.innerHTML = `<span>${s}   ·   ${s}   ·   </span><span>${s}   ·   ${s}   ·   </span>`; });
  $('#introTag', I).textContent = t('Kirim-shıǵımıńız endi bir qolda');
  $('#introSkip', I).textContent = t('Ótkerip jiberiw');
  // scramble word
  const W = 'PulCount', CH = '0123456789+−₽$%PULCOUNT'; const wEl = $('#introWord', I);
  wEl.innerHTML = W.split('').map((c, i) => `<span class="${i >= 3 ? 'v' : ''}">${c}</span>`).join('');
  const spans = $$('span', wEl); const t0 = performance.now() + 1500;
  (function scr(now) {
    if (!introRunning) return;
    let done = true;
    spans.forEach((s, i) => { const lockAt = t0 + i * 85; if (now < lockAt) { done = false; s.textContent = now > t0 - 350 ? CH[Math.floor(Math.random() * CH.length)] : ''; s.classList.add('scr'); } else { s.textContent = W[i]; s.classList.remove('scr'); } });
    if (!done) requestAnimationFrame(scr);
  })(performance.now());
  // counter
  const cnt = $('#introCounter', I); const c0 = performance.now() + 1900;
  (function tick(now) { if (!introRunning) return; const p = clamp((now - c0) / 1300, 0, 1); const e = 1 - Math.pow(1 - p, 4); cnt.textContent = p ? grp(8492000 * e) + ' ' + t('swm') : ''; if (p < 1) requestAnimationFrame(tick); })(performance.now());
  // particle burst when the logo lands
  const cv = $('#introBurst', I); const cx = cv.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  const BW = innerWidth, BH = innerHeight; cv.width = BW * dpr; cv.height = BH * dpr; cx.scale(dpr, dpr);
  const st = $('.in-stage', I).getBoundingClientRect(); const ox = st.left + st.width / 2, oy = st.top + st.height / 2;
  const parts = [...Array(70)].map(() => { const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 6; return { x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 1 + Math.random() * 3, c: ['#ffffff', '#A48BFF', '#7B5CFA', '#D3C6FF'][Math.floor(Math.random() * 4)], l: 1 }; });
  setTimeout(() => {
    (function burst() {
      if (!introRunning) return; cx.clearRect(0, 0, BW, BH); let alive = false;
      parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= .965; p.vy *= .965; p.l -= .012; if (p.l > 0) { alive = true; cx.globalAlpha = Math.max(0, p.l); cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill(); } });
      cx.globalAlpha = 1; if (alive) requestAnimationFrame(burst);
    })();
  }, 1950);
  const finish = () => {
    if (!introRunning) return; introRunning = false;
    I.classList.add('out'); vib(12);
    setTimeout(() => { const v = $('.view.active'); if (v) { v.classList.remove('active'); void v.offsetWidth; v.classList.add('active'); } }, 350);
    setTimeout(() => { I.style.display = 'none'; after && after(); }, 1000);
  };
  $('#introSkip', I).onclick = finish; I.onclick = e => { if (e.target.id !== 'introSkip') finish(); };
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(finish, reduce ? 900 : 4400);
}

/* ================= HUB: data shared with the admin panel ================= */
const HUBKEY = 'pulcount_hub_v1';
function hubDefault() {
  return {
    v: 1,
    promos: [
      { id: 'demo-max', title: 'PulCount MAX', text: 'BUSINESS statusı, sheksiz AI, Biznes paneli hám Aurora stili — barlıǵı bir tarifte.', cta: 'Tolıǵıraq', action: 'plans', phone: '', link: '', color: '#7B5CFA', image: '', active: true, order: 1, created: today(), demo: true },
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
  return p.image ? `<img src="${p.image}" alt="">` : `<span class="pa-art ${big ? 'big' : ''}" style="background:${p.color || '#7B5CFA'}"><b>${esc((p.title || 'P').trim().slice(0, 1).toUpperCase())}</b></span>`;
}
function storiesRow() {
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
    el.innerHTML = `<div class="st-media">${p.image ? `<img src="${p.image}" alt="">` : `<div class="st-art" style="background:${p.color || '#7B5CFA'}"><b>${esc(t(p.title))}</b><i></i><i></i></div>`}</div>
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
function launchAds() { setTimeout(() => { if (activePromos().length) openStories(0); }, 250); }
window.addEventListener('storage', e => {
  if (e.key === KEY && e.newValue) { try { S = Object.assign(defaults(false), JSON.parse(e.newValue)); } catch (er) {} applyLook(); renderView(); }
  if (e.key === HUBKEY) { applyHub(); renderView(); }
});

/* ================= boot ================= */
function boot() {
  applyLook();
  setTab('home');
  $$('[data-t]').forEach(e => e.textContent = t(e.dataset.t));
  $$('.nav-it').forEach(b => b.setAttribute('aria-label', t($('.lbl', b).dataset.t)));
  refreshIcons();
  applyHub();
  runIntro(() => showLock(launchAds));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
