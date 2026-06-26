// ===============================
// НАСТРОЙКИ ДЛЯ ОТВЕТОВ ГОСТЕЙ
// ===============================
// Заполните контакты, чтобы кнопки работали сразу.
// PHONE_FOR_SMS: номер в международном формате без пробелов, например "+79991234567".
// TELEGRAM_USERNAME: ник без @, например "my_wedding".
// MAX_LINK: ссылка на чат/профиль в MAX, если она у вас есть.
const RSVP_CONTACTS = {
  PHONE_FOR_SMS: "",
  TELEGRAM_USERNAME: "",
  MAX_LINK: ""
};

// Дата и время свадьбы для обратного отсчёта.
// Формат: год-месяц-деньTчасы:минуты:секунды
const WEDDING_DATE = new Date("2026-08-07T14:20:00");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const difference = WEDDING_DATE - now;

  if (difference <= 0) {
    $("#days").textContent = "00";
    $("#hours").textContent = "00";
    $("#minutes").textContent = "00";
    $("#seconds").textContent = "00";
    return;
  }

  const seconds = Math.floor(difference / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = seconds % 60;

  $("#days").textContent = days;
  $("#hours").textContent = pad(hours);
  $("#minutes").textContent = pad(minutes);
  $("#seconds").textContent = pad(restSeconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach((element) => revealObserver.observe(element));

const audio = $("#weddingAudio");
const musicToggle = $("#musicToggle");
const musicStatus = $("#musicStatus");

musicToggle.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      musicToggle.textContent = "Поставить на паузу";
      musicStatus.textContent = "Музыка играет.";
    } else {
      audio.pause();
      musicToggle.textContent = "Включить музыку";
      musicStatus.textContent = "Музыка на паузе.";
    }
  } catch (error) {
    musicStatus.textContent = "Добавьте файл assets/music/song.mp3 — тогда кнопка запустит песню.";
  }
});

audio.addEventListener("ended", () => {
  musicToggle.textContent = "Включить музыку";
  musicStatus.textContent = "Песня закончилась.";
});

function createGuestMessage(data) {
  const lines = [
    "Здравствуйте! Подтверждаю ответ на свадьбу 07.08.2026.",
    `Имя: ${data.name}`,
    `Присутствие: ${data.presence}`,
    `Количество гостей: ${data.guests || 1}`
  ];

  if (data.comment) {
    lines.push(`Комментарий: ${data.comment}`);
  }

  return lines.join("\n");
}

function configureReplyLinks(message) {
  const encodedMessage = encodeURIComponent(message);
  const smsLink = $("#smsLink");
  const telegramLink = $("#telegramLink");
  const maxLink = $("#maxLink");

  if (RSVP_CONTACTS.PHONE_FOR_SMS) {
    smsLink.href = `sms:${RSVP_CONTACTS.PHONE_FOR_SMS}?body=${encodedMessage}`;
    smsLink.classList.remove("disabled");
    smsLink.style.opacity = "1";
  } else {
    smsLink.href = "#";
    smsLink.style.opacity = ".45";
  }

  if (RSVP_CONTACTS.TELEGRAM_USERNAME) {
    telegramLink.href = `https://t.me/${RSVP_CONTACTS.TELEGRAM_USERNAME}`;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener";
    telegramLink.style.opacity = "1";
  } else {
    // Работает без указанного ника: откроется меню «поделиться» в Telegram.
    telegramLink.href = `https://t.me/share/url?url=&text=${encodedMessage}`;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener";
    telegramLink.style.opacity = "1";
  }

  if (RSVP_CONTACTS.MAX_LINK) {
    maxLink.href = RSVP_CONTACTS.MAX_LINK;
    maxLink.target = "_blank";
    maxLink.rel = "noopener";
    maxLink.style.opacity = "1";
  } else {
    maxLink.href = "#";
    maxLink.style.opacity = ".45";
  }
}

$("#rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());
  const message = createGuestMessage(data);

  $("#replyText").textContent = message;
  $("#replyBox").hidden = false;
  configureReplyLinks(message);
  $("#replyBox").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("#copyReply").addEventListener("click", async () => {
  const text = $("#replyText").textContent;

  try {
    await navigator.clipboard.writeText(text);
    $("#copyReply").textContent = "Скопировано";
    setTimeout(() => {
      $("#copyReply").textContent = "Скопировать";
    }, 1800);
  } catch (error) {
    alert("Не удалось скопировать автоматически. Выделите текст ответа и скопируйте вручную.");
  }
});
