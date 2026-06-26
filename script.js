
// INTRO
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => intro.style.opacity = "0", 1200);
});

// COUNTDOWN
const date = new Date("2026-08-07T14:20:00").getTime();
const el = document.getElementById("countdown");

setInterval(() => {
  const d = date - Date.now();

  const days = Math.floor(d / 86400000);
  const hours = Math.floor((d % 86400000) / 3600000);

  el.innerText = `${days} дней ${hours} часов`;
}, 1000);
