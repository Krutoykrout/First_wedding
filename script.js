// === ЗАСТАВКА ===
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
    }, 2000);
  }
});

// === КАЧАНИЕ ЖЕМЧУЖНЫХ БУС ===
const strings = document.querySelectorAll('.pearl-string');
if (strings.length) {
  strings.forEach((str, i) => {
    const delay = i * 0.3;
    const duration = 3 + i * 0.7;
    str.style.animation = `sway ${duration}s infinite alternate ease-in-out`;
    str.style.animationDelay = `${delay}s`;
  });

  // Вставляем ключевые кадры анимации
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes sway {
      0% { transform: rotate(0deg) translateX(0); }
      25% { transform: rotate(2deg) translateX(4px); }
      75% { transform: rotate(-1.5deg) translateX(-4px); }
      100% { transform: rotate(0deg) translateX(0); }
    }
  `;
  document.head.appendChild(styleSheet);
}

// === ТАЙМЕР ===
const weddingDate = new Date('2025-07-15T16:00:00').getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// === КАРТА (заглушка, замени на свой iframe при желании) ===
const mapDiv = document.getElementById('map');
if (mapDiv) {
  mapDiv.innerHTML = '<p style="padding:2rem;">📍 Карта появится после замены на iframe Яндекс.Карт</p>';
}
