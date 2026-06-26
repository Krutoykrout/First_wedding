

// INTRO
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      setTimeout(() => intro.remove(), 1000);
    }
  }, 1800);
});


// COUNTDOWN
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


// PEARLS
const container = document.querySelector(".pearls");

const isMobile = window.innerWidth < 768;
const count = isMobile ? 40 : 90;

function createPearls() {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "pearl";

    const size = 5 + Math.random() * 10;

    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = Math.random() * window.innerHeight + "px";

    p.style.opacity = 0.3 + Math.random() * 0.5;

    container.appendChild(p);
  }
}

createPearls();


// MUSIC
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


// ===============================
// SCROLL REVEAL (APPLE STYLE)
// ===============================

const sections = document.querySelectorAll(".section");

function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;

    if (top < triggerBottom) {
      sec.classList.add("show");
    }
  });
}

// первый запуск
revealSections();

// при скролле
window.addEventListener("scroll", revealSections);
