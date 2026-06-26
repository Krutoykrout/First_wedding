// ================= INTRO =================
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      setTimeout(() => intro.remove(), 1000);
    }
  }, 1800);
});


// ================= COUNTDOWN =================
const weddingDate = new Date("2026-08-07T14:20:00").getTime();
const countdown = document.getElementById("countdown");

function updateCountdown() {
  if (!countdown) return;

  const diff = weddingDate - Date.now();

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


// ================= SCROLL REVEAL =================
const sections = document.querySelectorAll(".section");

function reveal() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < trigger) {
      sec.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();


// ================= PEARLS (INDIVIDUAL MOTION) =================
const container = document.querySelector(".pearls");

const isMobile = window.innerWidth < 768;
const count = isMobile ? 40 : 90;

const pearls = [];

function createPearls() {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "pearl";

    const size = 4 + Math.random() * 8;

    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = Math.random() * window.innerHeight + "px";

    // уникальность движения
    p.dataset.ax = (Math.random() * 0.8 + 0.2);
    p.dataset.ay = (Math.random() * 0.8 + 0.2);
    p.dataset.ph = Math.random() * Math.PI * 2;

    container.appendChild(p);
    pearls.push(p);
  }
}

createPearls();


// ================= MOTION ENGINE =================
function animate() {
  const t = Date.now() * 0.0004;

  pearls.forEach(p => {
    const ax = parseFloat(p.dataset.ax);
    const ay = parseFloat(p.dataset.ay);
    const ph = parseFloat(p.dataset.ph);

    const x = Math.sin(t + ph) * ax;
    const y = Math.cos(t + ph) * ay;

    p.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(animate);
}

animate();


// ================= MUSIC =================
const audio = new Audio("music.mp3");
audio.loop = true;
audio.volume = 0.5;

let playing = false;

const btn = document.createElement("button");
btn.innerText = "🎵 Музыка";

Object.assign(btn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "9999"
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
    alert("Нажми ещё раз");
  }
});
