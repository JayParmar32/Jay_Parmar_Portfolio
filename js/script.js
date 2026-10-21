document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Close mobile navbar after clicking a link
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");
        toggler.click();
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form: frontend-only confirmation
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      formMessage.className = "alert alert-success";
      formMessage.textContent = "Thanks! Your message is ready to send. Connect this form to your preferred email service when you are ready.";
      formMessage.classList.remove("d-none");
      form.reset();
    });
  }
});
