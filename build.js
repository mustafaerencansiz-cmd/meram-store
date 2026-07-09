const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = __dirname;
const OUT = path.join(ROOT, "_site");
const CONTENT = path.join(ROOT, "content");

function loadYml(name) {
  return yaml.load(fs.readFileSync(path.join(CONTENT, name), "utf8"));
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

const STYLE = `
:root {
  --ink: #2A2420; --cream: #F4EEE3; --terracotta: #B05433;
  --sand: #C9B28C; --olive: #4B5842; --grey: #8C8276; --line: #D2C6B2;
}
* { box-sizing: border-box; }
body { margin:0; background: var(--cream); color: var(--ink); font-family: 'Outfit', sans-serif; }
nav { display:flex; align-items:center; justify-content:space-between; padding: 22px 60px;
  border-bottom: 1px solid var(--line); position: sticky; top:0; background: var(--cream); z-index: 10; }
nav img { height: 34px; }
nav .links a { color: var(--ink); text-decoration:none; margin-left: 34px; font-size: 14px;
  letter-spacing: 1px; text-transform: uppercase; font-weight:500; }
nav .links a.active, nav .links a:hover { color: var(--terracotta); }
section { padding: 90px 60px; max-width: 1400px; margin: 0 auto; }
.hero-section { padding: 0; max-width: none; position: relative; overflow:hidden;
  animation: heroOpen 1.1s cubic-bezier(.65,0,.35,1) both; }
.hero-section img { width: 100%; display:block; }
.hero-veil { position:absolute; top:0; height:100%; background: var(--cream); }
.hero-veil.veil-sand { left:62%; width:24%; animation: veilSand 1.1s ease both; animation-delay: .35s; }
.hero-veil.veil-terracotta { left:86%; width:14%; animation: veilTerracotta 1.1s ease both; animation-delay: .5s; }
.hero-overlay { position:absolute; top:0; left:0; height:100%; display:flex; flex-direction:column;
  justify-content:center; padding: 0 60px; max-width: 640px; }
.hero-overlay .eyebrow { font-family:'DM Mono', monospace; letter-spacing:2px; color: var(--terracotta); margin-bottom: 10px; }
.hero-overlay h1 { font-family:'Italiana', serif; font-size: 90px; margin: 0 0 20px; letter-spacing: 4px; }
.hero-overlay .sub { font-family:'DM Mono', monospace; letter-spacing:3px; font-size: 18px; margin-bottom: 34px; color: #443c35;}
.hero-overlay .cta-btn { opacity:0; transform: translateY(46px);
  animation: riseUp .8s cubic-bezier(.22,1,.36,1) both; animation-delay: .9s; }
.cta-btn { display:inline-block; border: 2px solid var(--ink); padding: 16px 40px;
  font-family:'Outfit', sans-serif; font-weight:700; letter-spacing:2px; font-size:13px;
  text-transform:uppercase; text-decoration:none; color: var(--ink); background: var(--cream); }
@keyframes heroOpen { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes veilSand { from { background: var(--cream); } to { background: var(--sand); } }
@keyframes veilTerracotta { from { background: var(--cream); } to { background: var(--terracotta); } }
@keyframes riseUp { from { opacity:0; transform: translateY(46px); } to { opacity:1; transform: translateY(0); } }
@keyframes dropDown { from { opacity:0; transform: translateY(-18px); } to { opacity:1; transform: translateY(0); } }
nav .links a { opacity:0; transform: translateY(-18px); animation: dropDown .6s ease both; }
nav .links a:nth-child(1) { animation-delay: .05s; }
nav .links a:nth-child(2) { animation-delay: .15s; }
nav .links a:nth-child(3) { animation-delay: .25s; }
nav .links a:nth-child(4) { animation-delay: .35s; }
.value-strip { display:flex; justify-content:center; gap: 70px; padding: 40px 60px;
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  font-family:'DM Mono', monospace; font-size: 14px; letter-spacing: 1px; color: var(--cream); flex-wrap: wrap;
  background: var(--ink); }
h2.section-title { font-family:'Italiana', serif; font-size: 44px; text-align:center; margin: 0 0 12px; letter-spacing: 2px; }
p.section-sub { text-align:center; color: var(--grey); font-family:'DM Mono', monospace;
  font-size: 14px; letter-spacing: 1px; margin-bottom: 60px; }
.grid { display:grid; grid-template-columns: repeat(2, minmax(260px,1fr)); gap: 30px; max-width: 800px; margin: 0 auto; }
.card { border: 1px solid var(--line); background: #fff; overflow:hidden; }
.card-img { aspect-ratio: 4/5; background-size: cover; background-position: center; }
.card-body { padding: 18px 20px; text-align:center; }
.card-body .tag { font-family:'DM Mono', monospace; font-size: 12px; color: var(--grey); letter-spacing:1px; }
.card-body h3 { font-family:'Outfit', sans-serif; font-weight:600; font-size: 17px; margin: 6px 0; }
.card-body p { font-size: 13px; color: var(--grey); margin: 0 0 10px; min-height: 32px; }
.price { font-family:'DM Mono', monospace; font-size: 14px; color: var(--terracotta); }
.about { display:flex; gap: 80px; align-items:center; flex-wrap: wrap; }
.about .visual { flex: 0 0 340px; height: 420px; background: var(--olive); display:flex; align-items:center; justify-content:center; }
.about .visual span { font-family:'Italiana', serif; color: var(--cream); font-size: 30px; letter-spacing: 6px; }
.about .text { flex:1; min-width: 280px; }
.about .text h2 { font-family:'Italiana', serif; font-size: 38px; letter-spacing:1px; margin-top:0; }
.about .text p { line-height: 1.85; color: #443c35; font-size: 15.5px; margin-bottom: 18px; }
.about .signature { font-family:'DM Mono', monospace; font-size: 13px; color: var(--grey); letter-spacing: 1px; }
.contact-wrap { display:flex; gap: 90px; flex-wrap: wrap; }
.contact-form { flex:1; min-width: 280px; }
.contact-form label { display:block; font-family:'DM Mono', monospace; font-size: 12px; letter-spacing:1px;
  color: var(--grey); margin: 20px 0 8px; text-transform: uppercase; }
.contact-form input, .contact-form textarea { width:100%; border:none; border-bottom: 1px solid var(--ink);
  background: transparent; padding: 10px 4px; font-family:'Outfit', sans-serif; font-size: 15px; color: var(--ink); }
.contact-form button { margin-top: 34px; background: var(--ink); color: var(--cream); border:none;
  padding: 16px 44px; font-family:'Outfit', sans-serif; font-weight:700; letter-spacing: 2px;
  font-size: 13px; text-transform: uppercase; cursor:pointer; }
.contact-social { flex: 0 0 320px; }
.contact-social h4 { font-family:'DM Mono', monospace; font-size: 13px; letter-spacing:1px; color: var(--grey);
  text-transform: uppercase; margin-bottom: 18px; }
.contact-social a { display:block; padding: 16px 0; border-bottom: 1px solid var(--line);
  color: var(--ink); text-decoration:none; font-size: 16px; }
.contact-social a:hover { color: var(--terracotta); }
footer { background: var(--ink); color: var(--cream); text-align:center; padding: 50px 20px;
  font-family:'DM Mono', monospace; font-size: 13px; letter-spacing: 1px; }
footer img { height: 60px; margin-bottom: 18px; opacity: .9; }
footer .footer-brand { font-weight:600; letter-spacing: 2px; margin-bottom: 6px; }
footer .footer-tagline { opacity: .85; }
.center { text-align:center; }
`;

function pageShell(title, body, active) {
  function navlink(label, href, key) {
    const cls = key === active ? ' class="active"' : "";
    return `<a href="${href}"${cls}>${label}</a>`;
  }
  const navHtml = `
<nav>
  <a href="/"><img src="/images/logo.png" alt="Meram"></a>
  <div class="links">
    ${navlink("Ana Sayfa", "/", "home")}
    ${navlink("Koleksiyon", "/koleksiyon.html", "koleksiyon")}
    ${navlink("Hakkımızda", "/hakkimizda.html", "hakkimizda")}
    ${navlink("İletişim", "/iletisim.html", "iletisim")}
  </div>
</nav>`;
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — Meram Store</title>
<link rel="icon" type="image/png" href="/images/favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Outfit:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${STYLE}</style>
</head>
<body>
${navHtml}
${body}
<footer>
  <img src="/images/logo-light.png" alt="Meram">
  <div class="footer-brand">MERAM STORE</div>
  <div class="footer-tagline">SADELİK, SICAKLIK, NİYET</div>
</footer>
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
</body>
</html>`;
}

function productCard(p) {
  return `
        <div class="card">
          <div class="card-img" style="background-image:url('${p.image}')"></div>
          <div class="card-body">
            <div class="tag">${p.color_tag}</div>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <span class="price">${p.price}</span>
          </div>
        </div>`;
}

// ---------- home ----------
const home = loadYml("home.yml");
const koleksiyon = loadYml("koleksiyon.yml");
const hakkimizda = loadYml("hakkimizda.yml");
const iletisim = loadYml("iletisim.yml");

const homeBody = `
<section class="hero-section">
  <img src="${home.hero_image}" alt="Meram Hero">
  <div class="hero-veil veil-sand"></div>
  <div class="hero-veil veil-terracotta"></div>
  <div class="hero-overlay">
    <div class="eyebrow">MERAM STORE</div>
    <h1>${home.hero_title}</h1>
    <div class="sub">${home.hero_subtitle}</div>
    <a href="/koleksiyon.html" class="cta-btn">${home.hero_cta_text}</a>
  </div>
</section>
<div class="value-strip">
  ${home.value_props.map((v) => `<span>${v.toUpperCase()}</span>`).join("\n  ")}
</div>
<section>
  <h2 class="section-title">${home.featured_title}</h2>
  <p class="section-sub">${home.featured_subtitle.toUpperCase()}</p>
  <div class="grid">${koleksiyon.products.map(productCard).join("")}
  </div>
  <div class="center" style="margin-top:50px;">
    <a href="/koleksiyon.html" class="cta-btn">Tüm Koleksiyonu Gör</a>
  </div>
</section>
`;

const koleksiyonBody = `
<section>
  <h2 class="section-title">${koleksiyon.page_title}</h2>
  <p class="section-sub">${koleksiyon.page_subtitle.toUpperCase()}</p>
  <div class="grid">${koleksiyon.products.map(productCard).join("")}
  </div>
</section>
`;

const hakkimizdaBody = `
<section style="background:#EFE7D8;">
  <div class="about">
    <div class="visual"><span>MERAM</span></div>
    <div class="text">
      <h2>${hakkimizda.page_title}</h2>
      ${hakkimizda.paragraphs.map((p) => `<p>${p}</p>`).join("\n      ")}
      <div class="signature">${hakkimizda.signature}</div>
    </div>
  </div>
</section>
`;

const iletisimBody = `
<section>
  <h2 class="section-title">${iletisim.page_title}</h2>
  <p class="section-sub">${iletisim.page_subtitle.toUpperCase()}</p>
  <div class="contact-wrap">
    <div class="contact-form">
      <label>Ad Soyad</label>
      <input type="text" placeholder="Adın Soyadın">
      <label>E-posta</label>
      <input type="email" placeholder="ornek@eposta.com">
      <label>Mesajın</label>
      <textarea rows="4" placeholder="Mesajını yaz..."></textarea>
      <button type="button" onclick="alert('Bu form şu an bağlı değil.')">Gönder</button>
    </div>
    <div class="contact-social">
      <h4>Bizi Takip Et</h4>
      <a href="${iletisim.instagram_url}" target="_blank" rel="noopener">Instagram — ${iletisim.instagram_handle}</a>
      <a href="${iletisim.etsy_url}" target="_blank" rel="noopener">Etsy — MeramStore</a>
      <a href="#">${iletisim.trendyol_text}</a>
      <a href="mailto:${iletisim.email}">${iletisim.email}</a>
    </div>
  </div>
</section>
`;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

fs.writeFileSync(path.join(OUT, "index.html"), pageShell("Ana Sayfa", homeBody, "home"));
fs.writeFileSync(path.join(OUT, "koleksiyon.html"), pageShell("Koleksiyon", koleksiyonBody, "koleksiyon"));
fs.writeFileSync(path.join(OUT, "hakkimizda.html"), pageShell("Hakkımızda", hakkimizdaBody, "hakkimizda"));
fs.writeFileSync(path.join(OUT, "iletisim.html"), pageShell("İletişim", iletisimBody, "iletisim"));

copyRecursive(path.join(ROOT, "images"), path.join(OUT, "images"));
copyRecursive(path.join(ROOT, "admin"), path.join(OUT, "admin"));

console.log("Build complete ->", OUT);
