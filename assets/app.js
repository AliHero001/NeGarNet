document.documentElement.classList.add("js");

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 760px)").matches) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "باز کردن منو");
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("form[data-mailto]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input, select, textarea")];
    const body = fields
      .filter((field) => field.name && field.value.trim())
      .map((field) => {
        const label = field.closest("label")?.firstChild?.textContent?.trim() || field.name;
        return `${label}: ${field.value.trim()}`;
      })
      .join("\n");
    const subject = form.dataset.subject || "پیام از وب‌سایت نگار نت";
    window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
