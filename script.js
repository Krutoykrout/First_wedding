// INTRO
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => intro.remove(), 800);
  }, 1200);
});

// COUNTDOWN
const target = new Date("2026-08-07T14:20:00").getTime();
const el = document.getElementById("countdown");

function update() {
  const diff = target - Date.now();

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);

  el.innerText = `${d} дней ${h} часов`;
}

setInterval(update, 1000);
update();
