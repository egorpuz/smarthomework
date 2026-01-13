/* ============================================= */
/*           СКРИПТЫ ДЛЯ БИБЛИОТЕКИ              */
/*              (js/library.js)                  */
/* ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card-container");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Убираем класс active у всех кнопок
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // 2. Добавляем active нажатой кнопке
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // 3. Фильтрация карточек с анимацией
      cards.forEach((card) => {
        // Сначала скрываем
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
          ) {
            card.style.display = "block";
            // Небольшая задержка для плавного появления
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 50);
          } else {
            card.style.display = "none";
          }
        }, 300); // Ждем пока исчезнет (0.3s)
      });
    });
  });
});
