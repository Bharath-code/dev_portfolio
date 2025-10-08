const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const themeToggleButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon path");

const setTheme = (mode) => {
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon?.setAttribute(
      "d",
      "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
    );
  } else {
    document.documentElement.classList.remove("dark");
    themeIcon?.setAttribute(
      "d",
      "M12 3v2.4M12 18.6V21M4.8 12H3M21 12h-2.4M5.636 5.636 7.124 7.124M18.364 18.364 16.876 16.876M5.636 18.364l1.488-1.488M18.364 5.636l-1.488 1.488M12 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z"
    );
  }
  localStorage.setItem("theme-preference", mode);
};

const currentTheme = () => {
  const stored = localStorage.getItem("theme-preference");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const toggleTheme = () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  setTheme(next);
};

themeToggleButton?.addEventListener("click", toggleTheme);

setTheme(currentTheme());

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

const initGsap = () => {
  if (prefersReducedMotion || typeof gsap === "undefined") return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.from("header", {
    y: -40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from("main section:first-of-type > div", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.18,
    delay: 0.1,
  });

  if (window.ScrollTrigger) {
    gsap.utils.toArray("main section").forEach((section) => {
      if (section === document.querySelector("main section:first-of-type")) return;
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    });
  }
};

window.addEventListener("load", initGsap, { once: true });
