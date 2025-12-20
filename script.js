document.addEventListener("DOMContentLoaded", () => {
  // Анимация появления секций при скролле
  const sections = document.querySelectorAll(".content-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Запускаем счетчик чисел, если это секция "Эффективность"
          if (entry.target.id === "proof") {
            const counters = document.querySelectorAll(".stat-number");
            counters.forEach((counter) => {
              const target = +counter.getAttribute("data-target");
              if (counter.innerText === "0") {
                // Запускаем только один раз
                animateCounter(counter, target);
              }
            });
          }
        }
      });
    },
    {
      threshold: 0.15, // Срабатывает, когда 15% элемента видно
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Анимация для главного экрана при загрузке
  const heroContent = document.querySelector(".hero-content");
  heroContent.style.opacity = "0";
  heroContent.style.transform = "translateY(30px)";
  heroContent.style.transition =
    "opacity 0.8s ease-out, transform 0.8s ease-out";
  setTimeout(() => {
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
  }, 100);

  // Функция для анимации счетчика
  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 секунды
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      current += 1;
      element.innerText = current;
      if (current === target) {
        clearInterval(timer);
      }
    }, stepTime);
  }
});
