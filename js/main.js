/* ============================================= */
/*             ОСНОВНОЙ СКРИПТ (MAIN)            */
/*                (js/main.js)                   */
/* ============================================= */
// --- 1. ЛОГИКА ТЕМЫ (ГЛОБАЛЬНАЯ) ---
// Проверяем настройки при загрузке ЛЮБОЙ страницы
const storedUserProfile = JSON.parse(localStorage.getItem("userProfile"));
const globalTheme = storedUserProfile
  ? storedUserProfile.theme
  : localStorage.getItem("theme");

if (globalTheme === "light") {
  document.body.classList.add("light-theme");
} else {
  document.body.classList.remove("light-theme");
}

// Внутри js/main.js в обработчик ссылок аккордеона

// Найдите где обрабатываются клики по ссылкам в аккордеоне
// Если нет специального обработчика, добавьте этот код:

const topicLinks = document.querySelectorAll(".accordion-content li a");
topicLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Увеличиваем счетчик "просмотренных" тем
    // (Простая логика: клик = изучение. Можно усложнить)
    let learned = parseInt(localStorage.getItem("stats_topics_learned") || 0);
    learned++;
    localStorage.setItem("stats_topics_learned", learned);
  });
});

// Примечание: Логика переключения чекбокса теперь находится в profile.js
// и срабатывает только при нажатии "Сохранить".

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. ЛОГИКА ТЕМНОЙ/СВЕТЛОЙ ТЕМЫ ---

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Проверяем сохраненную настройку
  const currentTheme = localStorage.getItem("theme");

  // Если в хранилище 'light', включаем светлую тему
  if (currentTheme === "light") {
    body.classList.add("light-theme");
    if (themeToggle) themeToggle.checked = true;
  }

  // Обработчик переключения (только если мы на странице профиля и кнопка есть)
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // --- 2. ЛОГИКА УВЕДОМЛЕНИЙ ---

  const notifyToggle = document.getElementById("notify-toggle");
  let notificationInterval;

  // Проверяем сохраненную настройку
  const notificationsEnabled = localStorage.getItem("notifications") === "true";
  if (notifyToggle) {
    notifyToggle.checked = notificationsEnabled;
  }

  // Если уведомления были включены ранее, запускаем цикл
  if (notificationsEnabled) {
    startNotificationLoop();
  }

  if (notifyToggle) {
    notifyToggle.addEventListener("change", () => {
      if (notifyToggle.checked) {
        localStorage.setItem("notifications", "true");
        showToast("🔔 Уведомления включены!", "Мы напомним о важных задачах.");
        startNotificationLoop();
      } else {
        localStorage.setItem("notifications", "false");
        stopNotificationLoop();
        showToast(
          "🔕 Уведомления выключены",
          "Вы больше не будете получать напоминания."
        );
      }
    });
  }

  function startNotificationLoop() {
    // Имитация: уведомление приходит через 10 секунд после включения
    // В реальности здесь был бы запрос к серверу или проверка времени
    if (!notificationInterval) {
      console.log("Система уведомлений запущена");
      notificationInterval = setTimeout(() => {
        showToast(
          "⏰ Напоминание",
          "Пора повторить формулы по физике! Дедлайн завтра."
        );
      }, 10000); // 10 секунд
    }
  }

  function stopNotificationLoop() {
    if (notificationInterval) {
      clearTimeout(notificationInterval);
      notificationInterval = null;
    }
  }

  // --- 3. СИСТЕМА TOAST (Всплывающие сообщения) ---

  // Создаем контейнер для уведомлений, если его нет
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  function showToast(title, message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
            <div class="toast-icon">ℹ️</div>
            <div>
                <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
                <div style="font-size: 0.9em; color: var(--text-muted);">${message}</div>
            </div>
        `;

    toastContainer.appendChild(toast);

    // Анимация появления
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Удаление через 4 секунды
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 400); // Ждем окончания анимации скрытия
    }, 4000);
  }

  // --- 4. ПЛАВНЫЕ ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ ---
  const allLinks = document.querySelectorAll('a:not([href^="#"])');
  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("javascript:")) {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // --- 5. АККОРДЕОН (для навигатора) ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      header.classList.toggle("active");
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
