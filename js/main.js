let tentativas = 0;

function avisarNoZap() {
  const { telefone, apikey } = CONFIG.aviso;
  if (!telefone || !apikey) return;
  const texto = "🎉 " + CONFIG.nome + " disse SIM pro convite do jantar! 🍔🐉\n" +
                "(Ela tentou clicar no Não " + tentativas + "x 😂)";
  new Image().src = "https://api.callmebot.com/whatsapp.php" +
    "?phone=" + telefone + "&text=" + encodeURIComponent(texto) + "&apikey=" + apikey;
}

/* nome e dragão nas duas telas */
document.querySelectorAll("[data-nome]").forEach(el => el.textContent = CONFIG.nome);
document.querySelectorAll("#convite .nome").forEach(el => el.textContent = CONFIG.nome + ",");
document.title = CONFIG.nome + ", tenho uma pergunta 🍔";
const tpl = document.getElementById("tpl-dragao");
document.querySelectorAll(".ingresso").forEach(el => el.prepend(tpl.content.cloneNode(true)));

const zap = document.getElementById("zap");
if (CONFIG.whatsapp) {
  zap.href = "https://api.whatsapp.com/send?phone=" + CONFIG.whatsapp + "&text=" + encodeURIComponent(CONFIG.mensagemZap);
} else {
  zap.style.display = "none";
}

/* hambúrgueres e dragõezinhos de fundo */
const flutuantes = document.getElementById("flutuantes");
const simbolos = ["🍔","🐉","🍟","🥤","🐲","⭐","🍔"];
for (let i = 0; i < 12; i++) {
  const s = document.createElement("span");
  s.textContent = simbolos[i % simbolos.length];
  s.style.left = 8 + Math.random() * 84 + "vw";
  s.style.fontSize = 16 + Math.random() * 16 + "px";
  s.style.animationDuration = 10 + Math.random() * 10 + "s";
  s.style.animationDelay = -Math.random() * 18 + "s";
  flutuantes.appendChild(s);
}

/* lâmpadas do varal, seguindo as duas curvas do fio (y = curva quadrática de 4 a 20px) */
const luzes = document.getElementById("luzes");
for (let seg = 0; seg < 2; seg++) {
  for (let k = 1; k <= 7; k++) {
    const t = k / 8;
    const l = document.createElement("i");
    l.style.left = (seg + t) * 50 + "%";
    l.style.top = (1 - t) ** 2 * 4 + 2 * t * (1 - t) * 36 + t * t * 4 + 1 + "px";
    l.style.animationDelay = -Math.random() * 2.4 + "s";
    luzes.appendChild(l);
  }
}

/* ====== botão Não fugitivo ====== */
const sim = document.getElementById("sim");
const nao = document.getElementById("nao");
const frases = [
  "Não", "Tem certeza?", "Pensa bem...", "Errou o botão 😅", "Nem vem!",
  "Tá difícil, né?", "Só tem o sim 😌", "Desiste 😂", "Erro 404", "O dragão não deixa 🐉"
];
let ultimo = 0;

function sobrepoe(x, y, w, h, r, m) {
  return !(x + w + m < r.left || x - m > r.right || y + h + m < r.top || y - m > r.bottom);
}

function fugir(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const agora = Date.now();
  if (agora - ultimo < 120) return;
  ultimo = agora;

  if (!nao.classList.contains("solto")) {
    const r = nao.getBoundingClientRect();
    document.body.appendChild(nao);
    nao.classList.add("solto");
    nao.style.left = r.left + "px";
    nao.style.top = r.top + "px";
  }

  tentativas++;
  nao.textContent = frases[tentativas % frases.length];
  sim.style.transform = "scale(" + Math.min(1 + tentativas * 0.08, 1.7) + ")";

  let px = -999, py = -999;
  const t = e && (e.touches?.[0] || e.changedTouches?.[0]);
  if (t) { px = t.clientX; py = t.clientY; }
  else if (e && "clientX" in e) { px = e.clientX; py = e.clientY; }

  const w = nao.offsetWidth, h = nao.offsetHeight, pad = 12;
  const W = window.innerWidth, H = window.innerHeight;
  const rSim = sim.getBoundingClientRect();
  let x, y, i = 0;
  do {
    x = pad + Math.random() * Math.max(0, W - w - pad * 2);
    y = pad + Math.random() * Math.max(0, H - h - pad * 2);
    i++;
  } while (i < 60 && (sobrepoe(x, y, w, h, rSim, 16) || Math.hypot(x + w / 2 - px, y + h / 2 - py) < 140));
  nao.style.left = x + "px";
  nao.style.top = y + "px";
}

nao.addEventListener("mouseenter", fugir);
nao.addEventListener("touchstart", fugir, { passive: false });
nao.addEventListener("pointerdown", fugir);
nao.addEventListener("click", fugir);
nao.addEventListener("focus", () => fugir());

window.addEventListener("resize", () => {
  if (!nao.classList.contains("solto")) return;
  nao.style.left = Math.min(parseFloat(nao.style.left), innerWidth - nao.offsetWidth - 12) + "px";
  nao.style.top = Math.min(parseFloat(nao.style.top), innerHeight - nao.offsetHeight - 12) + "px";
});

/* ====== Sim ====== */
let jaAvisou = false;
sim.addEventListener("click", () => {
  if (!jaAvisou) { jaAvisou = true; avisarNoZap(); }
  document.getElementById("convite").style.display = "none";
  nao.style.display = "none";
  document.getElementById("sucesso").style.display = "block";
  confete();
  if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
  if (CONFIG.whatsapp) setTimeout(() => { window.location.href = zap.href; }, 2800);
});

