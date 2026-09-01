/* =========================================================
   MADHYUM GROUP — MAIN JAVASCRIPT
   js/main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     1. ELEMENT HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


  /* =========================================================
     2. HEADER — AUTO HIDE / SHOW ON SCROLL
     ========================================================= */

  const header = $(".site-header");

  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      // Always show header near the top
      if (currentScrollY <= 20) {
        header.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Scrolling down = hide
      if (currentScrollY > lastScrollY + 5) {
        header.classList.add("nav-hidden");
      }

      // Scrolling up = show
      else if (currentScrollY < lastScrollY - 5) {
        header.classList.remove("nav-hidden");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );
  }


  /* =========================================================
     3. MOBILE / MENU FEATURE
     ========================================================= */

  const menuButton = $(".menu-btn");
  const mobileMenu = $(".mobile-menu");

  const closeMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    if (menuButton) {
     
