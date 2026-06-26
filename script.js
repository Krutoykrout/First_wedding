// INTRO SCREEN CLEANUP (чтобы аккуратно убрать заставку)
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      intro.style.transition = "opacity 1s ease";
      setTimeout(() => intro.remove(), 1000);
    }
  }, 2200);
});


// COUNTDOWN TIMER
// 👉 поменяй дату свадьбы здесь:
const weddingDate = new Date("2026-09-01T00:00:00").getTime();

const countdownEl = document.getElementById("countdown");

function updateCountdown() {
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


// PEARLS ANIMATION (простая, но уже "дорогая" база)
const pearlsContainer = document.querySelector(".pearls");

function createPearl() {
  const pearl = document.createElement("div");

  pearl.style.position = "absolute";
  pearl.style.width = "10px";
  pearl.style.height = "10px";
  pearl.style.borderRadius = "50%";
  pearl.style.background = "radial-gradient(circle at 30% 30%, #fff, #d9d9d9)";
  pearl.style.boxShadow = "0 0 10px rgba(255,255,255,0.3)";

  pearl.style.left = Math.random() * 100 + "vw";
  pearl.style.top = "-20px";

  pearl.style.opacity = Math.random() * 0.6 + 0.3;

  const duration = Math.random() * 5 + 5;

  pearl.style.animation = `fall ${duration}s linear infinite`;

  pearlsContainer.appendChild(pearl);

  setTimeout(() => {
    pearl.remove();
  }, duration * 1000);
}

// CSS animation injection (чтобы не усложнять тебе)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
  }
}
`;
document.head.appendChild(style);

// создаём жемчуг постоянно
setInterval(createPearl, 300);
