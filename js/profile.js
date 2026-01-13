/* ============================================= */
/*           ЛОГИКА СТРАНИЦЫ ПРОФИЛЯ             */
/*               (js/profile.js)                 */
/* ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // --- ЭЛЕМЕНТЫ DOM ---
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const classSelect = document.getElementById("class");
  const themeToggle = document.getElementById("theme-toggle");
  const notifyToggle = document.getElementById("notify-toggle");
  const saveBtn = document.querySelector(".save-btn");

  // Элементы отображения
  const displayName = document.getElementById("profile-name-display");
  const displayClass = document.getElementById("profile-class-display");
  const avatarImg = document.getElementById("avatar-img");
  const statTopics = document.getElementById("stat-topics");
  const statHours = document.getElementById("stat-hours");

  // Элементы загрузки аватара
  const editAvatarBtn = document.getElementById("edit-avatar-btn");
  const avatarInput = document.getElementById("avatar-input");

  // --- 1. ЗАГРУЗКА ДАННЫХ ПРИ СТАРТЕ ---
  loadProfileData();
  loadStats();

  function loadProfileData() {
    const user = JSON.parse(localStorage.getItem("userProfile")) || {
      name: "Egor Puzyrev",
      email: "egor@example.com",
      class: "9",
      theme: "dark",
      notifications: false,
      avatar: null, // Base64 string
    };

    // Заполняем поля формы
    usernameInput.value = user.name;
    emailInput.value = user.email;
    classSelect.value = user.class;
    themeToggle.checked = user.theme === "light";
    notifyToggle.checked = user.notifications;

    // Обновляем отображение
    updateDisplay(user);
  }

  function updateDisplay(user) {
    displayName.textContent = user.name;
    displayClass.textContent = `Ученик ${user.class} класса`;

    if (user.avatar) {
      avatarImg.src = user.avatar;
    } else {
      // Генерируем аватар по инициалам, если нет своего
      avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=00F5D4&color=1A202C&size=150`;
    }
  }

  function loadStats() {
    // Загружаем статистику или ставим 0
    const topics = localStorage.getItem("stats_topics_learned") || 0;
    // Храним минуты, переводим в часы для отображения
    const minutes = parseInt(localStorage.getItem("stats_focus_minutes") || 0);
    const hours = (minutes / 60).toFixed(1);

    statTopics.textContent = topics;
    statHours.textContent = `${hours}ч`;
  }

  // --- 2. СОХРАНЕНИЕ ДАННЫХ ---

  // Важно: отменяем стандартную отправку формы
  document.querySelector(".settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    saveProfile();
  });

  function saveProfile() {
    const newSettings = {
      name: usernameInput.value,
      email: emailInput.value,
      class: classSelect.value,
      theme: themeToggle.checked ? "light" : "dark",
      notifications: notifyToggle.checked,
      // Сохраняем текущий src аватара (он обновляется отдельно)
      avatar: avatarImg.src.startsWith("data:") ? avatarImg.src : null,
    };

    // Сохраняем в localStorage
    localStorage.setItem("userProfile", JSON.stringify(newSettings));

    // Применяем тему НЕМЕДЛЕННО
    if (newSettings.theme === "light") {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light"); // Дублируем для main.js
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }

    // Обновляем отображение на странице
    updateDisplay(newSettings);

    // Показываем уведомление об успехе
    // (Используем функцию showToast из main.js если она глобальна, или пишем свою простую)
    alert("✅ Настройки успешно сохранены!");
  }

  // --- 3. СМЕНА АВАТАРКИ ---

  editAvatarBtn.addEventListener("click", () => {
    avatarInput.click(); // Открываем системное окно выбора файла
  });

  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Получаем картинку в формате Base64
        const base64Image = e.target.result;

        // Сразу показываем её (превью)
        avatarImg.src = base64Image;

        // Примечание: Мы пока НЕ сохраняем её в localStorage,
        // пользователь должен нажать "Сохранить изменения" для подтверждения.
      };

      reader.readAsDataURL(file);
    }
  });
});
