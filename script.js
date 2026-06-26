
// ===============================
// INTRO
// ===============================
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      intro.style.transition = "1.2s ease";
      setTimeout(() => intro.remove(), 1200);
    }
  }, 1800);
});


// ===============================
// COUNTDOWN
// ===============================
const weddingDate = new Date("2026-08-07T14:20:00").getTime();
const countdown = document.getElementById("countdown");

function updateCountdown() {
  if (!countdown) return;

  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdown.innerText = "Сегодня 💍";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  countdown.innerText = `${d}д ${h}ч ${m}м ${s}с`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ===============================
// LUX PEARL LAYER (3D FEEL)
// ===============================
const pearlsLayer = document.querySelector(".pearls");

function createPearl() {
  if (!pearlsLayer) return;

  const p = document.createElement("div");
  p.className = "pearl";

  // размер (разная глубина)
  const size = 4 + Math.random() * 10;

  // позиция по всему экрану (ВАЖНО: fixed viewport)
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  p.style.width = size + "px";
  p.style.height = size + "px";

  p.style.left = x + "px";
  p.style.top = y + "px";

  // глубина (имитация Z)
  const depth = Math.random();

  p.style.opacity = 0.25 + depth * 0.6;
  p.style.transform = `scale(${0.8 + depth * 0.6})`;

  // мягкое “дыхание”
  p.style.animation = `floatPearl ${4 + depth * 6}s ease-in-out infinite`;
  p.style.animationDelay = Math.random() * 5 + "s";

  pearlsLayer.appendChild(p);
}

// создаём слой жемчуга
for (let i = 0; i < 90; i++) {
  createPearl();
}


// ===============================
// MOUSE PARALLAX (LUX EFFECT)
// ===============================
document.addEventListener("mousemove", (e) => {
  const pearls = document.querySelectorAll(".pearl");

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  pearls.forEach((p, i) => {
    const speed = (i % 3 + 1) * 0.2;
    p.style.transform += ` translate(${x * speed}px, ${y * speed}px)`;
  });
});


// ===============================
// MUSIC (STABLE LUX VERSION)
// ===============================
const audio = new Audio("music.mp3");
audio.loop = true;
audio.volume = 0.45;

let playing = false;

const btn = document.createElement("button");
btn.innerText = "🎵 Музыка";

Object.assign(btn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "99999",
  padding: "12px 16px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.55)",
  color: "#fff",
  backdropFilter: "blur(10px)",
  cursor: "pointer"
});

document.body.appendChild(btn);

btn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await audio.play();
      playing = true;
      btn.innerText = "⏸ Пауза";
    } else {
      audio.pause();
      playing = false;
      btn.innerText = "🎵 Музыка";
    }
  } catch (e) {
    console.log("Audio error:", e);
    alert("Нажми ещё раз для запуска музыки");
  }
});
function movePearls(x, y) {
  const pearls = document.querySelectorAll(".pearl");

  pearls.forEach((p, i) => {
    const speed = (i % 3 + 1) * 0.2;
    p.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
}

// ПК
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  movePearls(x, y);
});

// 📱 ТЕЛЕФОН
document.addEventListener("touchmove", (e) => {
  if (!e.touches[0]) return;

  const x = (e.touches[0].clientX / window.innerWidth - 0.5) * 10;
  const y = (e.touches[0].clientY / window.innerHeight - 0.5) * 10;

  movePearls(x, y);
});
