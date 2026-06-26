// ===============================
// INTRO SCREEN
// ===============================
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      intro.style.transition = "opacity 1s ease";

      setTimeout(() => {
        intro.remove();
      }, 1000);
    }
  }, 2000);
});


// ===============================
// COUNTDOWN TIMER
// ===============================
const weddingDate = new Date("2026-08-07T14:20:00").getTime();

const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  if (!countdownEl) return;

  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "Сегодня 💍";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML =
    `${days}д : ${hours}ч : ${minutes}м : ${seconds}с`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ===============================
// PEARL FIELD (стабильная версия)
// ===============================
const pearlsContainer = document.querySelector(".pearls");

function createPearls() {
  if (!pearlsContainer) return;

  for (let i = 0; i < 70; i++) {
    const pearl = document.createElement("div");
    pearl.classList.add("pearl");

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    const size = 6 + Math.random() * 10;

    pearl.style.left = x + "px";
    pearl.style.top = y + "px";
    pearl.style.width = size + "px";
    pearl.style.height = size + "px";

    pearl.style.opacity = 0.5 + Math.random() * 0.5;

    pearl.style.animationDelay = Math.random() * 4 + "s";

    pearlsContainer.appendChild(pearl);
  }
}

createPearls();

// ===============================
// MUSIC PLAYER (100% WORKING)
// ===============================

const audio = new Audio("music.mp3"); // или твое имя файла
audio.loop = true;
audio.volume = 0.5;

let isPlaying = false;

// создаём кнопку
const musicBtn = document.createElement("button");
musicBtn.innerText = "🎵 Включить музыку";

musicBtn.style.position = "fixed";
musicBtn.style.bottom = "20px";
musicBtn.style.right = "20px";
musicBtn.style.zIndex = "9999";

musicBtn.style.padding = "12px 16px";
musicBtn.style.borderRadius = "30px";
musicBtn.style.border = "1px solid rgba(255,255,255,0.3)";
musicBtn.style.background = "rgba(0,0,0,0.6)";
musicBtn.style.color = "#fff";
musicBtn.style.cursor = "pointer";
musicBtn.style.backdropFilter = "blur(10px)";

document.body.appendChild(musicBtn);

// ВАЖНО: разные типы событий для мобилки и ПК
function toggleMusic() {
  if (!isPlaying) {
    audio.play()
      .then(() => {
        isPlaying = true;
        musicBtn.innerText = "⏸ Выключить музыку";
      })
      .catch(err => {
        console.log("Музыка заблокирована браузером:", err);
        alert("Нажми ещё раз, чтобы включить музыку");
      });
  } else {
    audio.pause();
    isPlaying = false;
    musicBtn.innerText = "🎵 Включить музыку";
  }
}

musicBtn.addEventListener("click", toggleMusic);
musicBtn.addEventListener("touchstart", toggleMusic);
