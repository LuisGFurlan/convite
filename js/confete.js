/* ====== confete ====== */
function confete() {
  const c = document.getElementById("confete");
  const ctx = c.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);
  const cores = ["#fde68a","#e0a43a","#b4233c","#fff8ec","#6ee7b7","#f87171"];
  const p = Array.from({ length: 180 }, () => ({
    x: innerWidth / 2, y: innerHeight / 2.4,
    vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 4,
    s: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
    cor: cores[Math.floor(Math.random() * cores.length)]
  }));
  let frames = 0;
  (function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    p.forEach(q => {
      q.vy += .35; q.vx *= .99; q.x += q.vx; q.y += q.vy; q.r += q.vr;
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r);
      ctx.fillStyle = q.cor; ctx.fillRect(-q.s / 2, -q.s / 4, q.s, q.s / 2);
      ctx.restore();
    });
    if (++frames < 260) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}
