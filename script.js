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


// PEARLS ANIMATION (простая, но уже "дорогая" база)const pearlsContainer = document.querySelector(".pearls");

function createPearl() {
  const pearl = document.createElement("div");
  pearl.classList.add("pearl");

  // ВАЖНО: теперь привязываем к контейнеру, а не к окну
  const containerRect = pearlsContainer.getBoundingClientRect();

  const x = Math.random() * containerRect.width;
  const y = Math.random() * containerRect.height;

  pearl.style.left = x + "px";
  pearl.style.top = y + "px";

  const size = 6 + Math.random() * 10;
  pearl.style.width = size + "px";
  pearl.style.height = size + "px";

  pearl.style.animationDelay = Math.random() * 3 + "s";

  pearlsContainer.appendChild(pearl);
}

// создаём больше, чтобы точно было видно
for (let i = 0; i < 80; i++) {
  createPearl();
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
