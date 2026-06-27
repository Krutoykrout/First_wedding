(() => {
  document.documentElement.classList.add('js');

  const weddingDate = new Date('2026-08-07T14:20:00+07:00');
  const countdown = document.querySelector('#countdown');
  const music = document.querySelector('#weddingMusic');
  const form = document.querySelector('#rsvpForm');
  const formStatus = document.querySelector('#formStatus');
  let previousCountdown = [];
  let musicUnlocked = false;

  function padNumber(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    if (!countdown) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      countdown.innerHTML = '<div><strong>Сегодня</strong><span>наш день</span></div>';
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

  async function tryStartMusic() {
    if (!music || musicUnlocked) return;
    try {
      music.volume = 0.38;
      await music.play();
      musicUnlocked = true;
      removeUnlockListeners();
    } catch (error) {
      musicUnlocked = false;
    }
  }

  function removeUnlockListeners() {
    window.removeEventListener('pointerdown', tryStartMusic);
    window.removeEventListener('touchstart', tryStartMusic);
    window.removeEventListener('keydown', tryStartMusic);
    window.removeEventListener('scroll', tryStartMusic);
  }

  if (music) {
    music.addEventListener('canplaythrough', tryStartMusic, { once: true });
    window.addEventListener('load', tryStartMusic, { once: true });
    document.addEventListener('DOMContentLoaded', tryStartMusic, { once: true });

    // Fallback for browsers that block sound until the first real page interaction.
    window.addEventListener('pointerdown', tryStartMusic, { passive: true });
    window.addEventListener('touchstart', tryStartMusic, { passive: true });
    window.addEventListener('keydown', tryStartMusic);
    window.addEventListener('scroll', tryStartMusic, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach((item, index) => {
      item.style.setProperty('--delay', `${Math.min(index % 4, 3) * 0.08}s`);
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach((item) => item.classList.add('is-visible'));
  });

  let ticking = false;

  function updateParallax() {
    const photo = document.querySelector('.photo-section');
    if (photo) {
      const rect = photo.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, 1 - Math.abs(rect.top) / viewport));
      photo.style.setProperty('--photo-scale', (progress * 0.035).toFixed(3));
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  function setFormStatus(message, isError = false) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.style.color = isError ? '#f0b5aa' : 'rgba(250,246,236,.78)';
  }

  function getRecipient() {
    return atob('ZWtlbm90b3ZhQHlhbmRleC5ydQ==');
  }

  if (form) {
    const recipient = getRecipient();
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
          submitButton.textContent = 'Отправить ответ';
        }
      }
    });
  }
})();
