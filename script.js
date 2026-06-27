const weddingDate = new Date('2026-08-07T14:20:00+07:00');
const countdown = document.querySelector('#countdown');
const music = document.querySelector('#weddingMusic');
const musicToggle = document.querySelector('#musicToggle');
const musicLabel = document.querySelector('#musicLabel');
const enterButton = document.querySelector('#enterButton');
const preloader = document.querySelector('#preloader');
const form = document.querySelector('#rsvpForm');
const formStatus = document.querySelector('#formStatus');

let previousCountdown = [];

document.body.classList.add('is-locked');

function padNumber(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  if (!countdown) return;

  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdown.innerHTML = '<div class="wide"><strong>Сегодня</strong><span>наш день</span></div>';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const values = [
    [Math.floor(totalSeconds / 86400), 'дней'],
    [padNumber(Math.floor((totalSeconds % 86400) / 3600)), 'часов'],
    [padNumber(Math.floor((totalSeconds % 3600) / 60)), 'минут'],
    [padNumber(totalSeconds % 60), 'секунд']
  ];

  countdown.innerHTML = values
    .map(([value, label], index) => {
      const shouldFlip = previousCountdown[index] !== undefined && String(previousCountdown[index]) !== String(value);
      return `<div class="${shouldFlip ? 'flip' : ''}"><strong>${value}</strong><span>${label}</span></div>`;
    })
    .join('');

  previousCountdown = values.map(([value]) => value);
}

updateCountdown();
setInterval(updateCountdown, 1000);

async function playMusic() {
  if (!music) return false;
  try {
    await music.play();
    musicToggle?.classList.add('is-playing');
    if (musicLabel) musicLabel.textContent = 'Играет';
    return true;
  } catch (error) {
    if (musicLabel) musicLabel.textContent = 'Музыка';
    return false;
  }
}

function pauseMusic() {
  if (!music) return;
  music.pause();
  musicToggle?.classList.remove('is-playing');
  if (musicLabel) musicLabel.textContent = 'Музыка';
}

if (enterButton) {
  enterButton.addEventListener('click', async () => {
    document.body.classList.add('is-open');
    document.body.classList.remove('is-locked');
    await playMusic();
    setTimeout(() => preloader?.remove(), 1100);
  });
}

if (musicToggle && music) {
  musicToggle.addEventListener('click', async () => {
    if (music.paused) {
      await playMusic();
    } else {
      pauseMusic();
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal-up, .reveal-side, .animated-line').forEach((element, index) => {
  if (element.classList.contains('timeline-item')) {
    const localIndex = [...element.parentElement.children].indexOf(element);
    element.style.setProperty('--delay', `${localIndex * 0.12}s`);
  } else if (index < 8) {
    element.style.setProperty('--delay', `${Math.min(index, 3) * 0.08}s`);
  }
  observer.observe(element);
});

let ticking = false;
function updateParallax() {
  const y = window.scrollY || window.pageYOffset;
  document.documentElement.style.setProperty('--scroll-y', `${y}px`);

  const photo = document.querySelector('.photo-screen');
  if (photo) {
    const rect = photo.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, 1 - Math.abs(rect.top) / window.innerHeight));
    photo.style.setProperty('--photo-scale', (progress * 0.025).toFixed(3));
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
}, { passive: true });

function setFormStatus(message, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.style.color = isError ? '#f0b5aa' : 'rgba(250,246,236,.78)';
}

function getFormRecipient() {
  return atob('ZWtlbm90b3ZhQHlhbmRleC5ydQ==');
}

if (form) {
  const recipient = getFormRecipient();
  const endpoint = `https://formsubmit.co/ajax/${recipient}`;
  form.action = `https://formsubmit.co/${recipient}`;
  form.dataset.ajaxEndpoint = endpoint;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправляем...';
    }
    setFormStatus('Отправляем ответ...');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('FormSubmit error');

      form.reset();
      setFormStatus('Спасибо! Ваш ответ отправлен.');
    } catch (error) {
      setFormStatus('Не получилось отправить форму автоматически. Попробуйте ещё раз чуть позже.', true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить';
      }
    }
  });
}
