import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  // Initialize ScrollSmoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
  });

  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return;

  const getPreferredTheme = () => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    const label = document.querySelector('.toggle-label');
    if (label) {
      label.textContent = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }
    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (sun && moon) {
      sun.style.display = theme === "dark" ? "none" : "inline-block";
      moon.style.display = theme === "dark" ? "inline-block" : "none";
    }
  };

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  toggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });

  // Nav toggle functionality
  const navToggle = document.getElementById("nav-toggle");
  const navLinksList = document.querySelector(".nav-links-list");
  const navLinks = document.querySelector(".nav-links");
  const navClose = document.querySelector(".nav-links-list-close");

  const toggleNav = () => {
    const isOpen = navLinks.classList.contains("nav-open");
    navLinks.classList.toggle("nav-open");
    navToggle.setAttribute("aria-pressed", !isOpen ? "true" : "false");
  };

  if (navToggle && navLinksList && navLinks) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleNav();
    });
  }

  if (navClose) {
    navClose.addEventListener("click", (e) => {
      e.preventDefault();
      toggleNav();
    });
  }
});


