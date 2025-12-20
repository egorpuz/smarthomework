document.addEventListener("DOMContentLoaded", () => {
  // Логика аккордеона для Навигатора
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  if (accordionHeaders.length > 0) {
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
  }

  // Логика плавного перехода между страницами
  const allLinks = document.querySelectorAll('a:not([href^="#"])');
  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("javascript:")) {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
});
