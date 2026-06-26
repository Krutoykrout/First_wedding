
// INTRO
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      setTimeout(() => intro.remove(), 800);
    }
  }, 1500);
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

  countdown.innerText = `${d}д ${h}ч ${m}м`;
}

setInterval(updateCountdown, 60000);
updateCountdown();


// SCROLL FADE (APPLE STYLE)
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
