const weddingDate = new Date('2026-08-07T14:20:00+07:00');
const countdown = document.querySelector('#countdown');
const music = document.querySelector('#weddingMusic');
const musicToggle = document.querySelector('#musicToggle');
const musicLabel = document.querySelector('#musicLabel');
const form = document.querySelector('#rsvpForm');
const formStatus = document.querySelector('#formStatus');

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
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const values = [
    [days, 'дней'],
    [padNumber(hours), 'часов'],
    [padNumber(minutes), 'минут'],
    [padNumber(seconds), 'секунд']
  ];

  countdown.innerHTML = values
    .map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`)
    .join('');
}

updateCountdown();
setInterval(updateCountdown, 1000);

if (musicToggle && music) {
  musicToggle.addEventListener('click', async () => {
    try {
      if (music.paused) {
        await music.play();
        musicToggle.classList.add('is-playing');
        musicLabel.textContent = 'Песня играет';
      } else {
        music.pause();
        musicToggle.classList.remove('is-playing');
        musicLabel.textContent = 'Включить песню';
      }
    } catch (error) {
      musicLabel.textContent = 'Нажмите ещё раз';
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

function setFormStatus(message, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.style.color = isError ? '#8b1f1f' : '#2f3b2f';
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const endpoint = form.dataset.ajaxEndpoint;
    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправляем...';
    }
    setFormStatus('Отправляем ответ на почту ekenotova@yandex.ru...');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('FormSubmit error');
      }

      form.reset();
      setFormStatus('Спасибо! Ответ отправлен на почту организатора.');
    } catch (error) {
      setFormStatus('Не получилось отправить через форму. Сейчас откроется стандартная отправка на почту.', true);
      setTimeout(() => form.submit(), 900);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить ответ на почту';
      }
    }
  });
}
