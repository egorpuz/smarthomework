/* ============================================= */
/*           СКРИПТЫ ДЛЯ ФОКУС-КОМНАТЫ           */
/*             (js/focus-room.js)                */
/* ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  const timeLeftDisplay = document.getElementById("time-left");
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const resetBtn = document.getElementById("reset-btn");
  const progressBar = document.querySelector(".progress-bar");
  const sessionTitle = document.getElementById("session-title");

  const workTime = 25 * 60; // 25 минут работы
  const breakTime = 5 * 60; // 5 минут отдыха
  let currentTime = workTime;
  let timeRemaining = currentTime;
  let timerId = null;
  let isPaused = true;
  let isWorkSession = true;

  const radius = progressBar.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progressBar.style.strokeDasharray = circumference;

  function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeLeftDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    const offset =
      circumference - (timeRemaining / currentTime) * circumference;
    progressBar.style.strokeDashoffset = offset;
  }

  function switchSession() {
    isWorkSession = !isWorkSession;
    currentTime = isWorkSession ? workTime : breakTime;
    timeRemaining = currentTime;
    sessionTitle.textContent = isWorkSession
      ? "Время сфокусироваться"
      : "Время для отдыха";
    progressBar.style.stroke = isWorkSession ? "#00F5D4" : "#F97316"; // Меняем цвет прогресс-бара
    updateDisplay();

    // Автоматический старт следующей сессии после короткой паузы
    setTimeout(() => {
      if (!isPaused) startTimer();
    }, 1000);
  }

  function countdown() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      // Можно добавить звук уведомления
      // new Audio('notification.mp3').play();
      switchSession();
    }
  }

  function startTimer() {
    if (isPaused) {
      isPaused = false;
      timerId = setInterval(countdown, 1000);
      startBtn.style.display = "none";
      pauseBtn.style.display = "inline-flex";
    }
  }

  function pauseTimer() {
    isPaused = true;
    clearInterval(timerId);
    timerId = null;
    startBtn.style.display = "inline-flex";
    startBtn.innerHTML = '<span class="icon">▶</span> Продолжить';
    pauseBtn.style.display = "none";
  }

  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isPaused = true;
    isWorkSession = true;
    currentTime = workTime;
    timeRemaining = currentTime;
    sessionTitle.textContent = "Время сфокусироваться";
    progressBar.style.stroke = "#00F5D4";
    updateDisplay();

    startBtn.style.display = "inline-flex";
    startBtn.innerHTML = '<span class="icon">▶</span> Старт';
    pauseBtn.style.display = "none";
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay(); // Изначальное отображение
});
// Внутри js/focus-room.js

function countdown() {
  if (timeRemaining > 0 && !isPaused) {
    timeRemaining--;
    updateDisplay();

    // --- НОВОЕ: Добавляем секунду к общей статистике ---
    // (Для оптимизации можно сохранять раз в минуту, но так точнее)
    if (timeRemaining % 60 === 0) {
      // Каждую минуту
      let totalMinutes = parseInt(
        localStorage.getItem("stats_focus_minutes") || 0
      );
      totalMinutes++;
      localStorage.setItem("stats_focus_minutes", totalMinutes);
    }
  } else if (timeRemaining <= 0) {
    clearInterval(timerId);
    // ... (алерт)
  }
}
