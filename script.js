/* ===== إعدادات سهلة التعديل ===== */
const OPENING = new Date(2026, 9, 26, 18, 0, 0); // ٢٧ تشرين الأول ٢٠٢٦ الساعة ٦ مساءً (الشهر يبدأ من 0)
const ADDRESS = "الكسوة ، الشارع الرئيسي ، جانب محل ابو العشرة ";                               // اكتب عنوان المحل هنا ليظهر في البطاقة (اتركه فارغاً لإخفائه)

/* ===== العداد ===== */
const ar = n => String(n).padStart(2, "0");
const els = { d: d, h: h, m: m, s: s };
const prev = {};
function tick() {
  let diff = OPENING - new Date();
  if (diff <= 0) { document.body.classList.add("is-open"); return false; }
  const v = {
    d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5),
    m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3)
  };
  for (const k in v) {
    const t = ar(v[k]);
    if (prev[k] !== t) { els[k].textContent = t; els[k].classList.remove("tick"); void els[k].offsetWidth; els[k].classList.add("tick"); prev[k] = t; }
  }
  return true;
}
if (tick()) { const iv = setInterval(() => { if (!tick()) clearInterval(iv); }, 500); }

/* ===== العنوان ===== */
if (ADDRESS) { const a = document.getElementById("addr"); a.textContent = ADDRESS; a.classList.add("on"); }



/* ===== ظهور تدريجي ===== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .2 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ===== غبار ذهبي ===== */
(() => {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const c = document.getElementById("dust"), x = c.getContext("2d"); let W, H, P = [];
  const size = () => { const r = devicePixelRatio || 1; W = c.width = innerWidth * r; H = c.height = innerHeight * r; };
  size(); addEventListener("resize", size);
  const n = innerWidth < 600 ? 28 : 55;
  for (let i = 0; i < n; i++) P.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .4, v: Math.random() * .00035 + .00008, a: Math.random() * 6.28 });
  (function loop() {
    x.clearRect(0, 0, W, H);
    for (const p of P) {
      p.y -= p.v; p.a += .01; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
      x.globalAlpha = .25 + .5 * Math.abs(Math.sin(p.a));
      x.fillStyle = "#f3d58e"; x.beginPath(); x.arc(p.x * W + Math.sin(p.a) * 12, p.y * H, p.r * (devicePixelRatio || 1), 0, 6.28); x.fill();
    }
    requestAnimationFrame(loop);
  })();
})();