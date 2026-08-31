(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  const mobileMenu = document.querySelector(".mobile-menu");
  const menuButton = document.querySelector(".menu-btn");
  const closeMenu = () => {
    mobileMenu?.classList.remove("open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  const openMenu = () => {
    mobileMenu?.classList.add("open");
    mobileMenu?.setAttribute("aria-hidden", "false");
    menuButton?.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };
  menuButton?.addEventListener("click", () => {
    mobileMenu?.classList.contains("open") ? closeMenu() : openMenu();
  });
  document.querySelectorAll("[data-close-mobile]").forEach((btn) => {
    btn.addEventListener("click", closeMenu);
  });

  const drawer = document.querySelector(".drawer");
  const searchInput = document.querySelector("#searchInput");
  const searchResults = document.querySelector("#searchResults");
  const closeSearch = () => {
    drawer?.classList.remove("open");
    drawer?.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll("[data-search]").forEach((btn) => {
    btn.addEventListener("click", () => {
      drawer?.classList.add("open");
      drawer?.setAttribute("aria-hidden", "false");
      window.setTimeout(() => searchInput?.focus(), 80);
    });
  });
  document.querySelectorAll("[data-close-search]").forEach((btn) => btn.addEventListener("click", closeSearch));
  drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeSearch(); });

  const SEARCH_DATA = [
    ["3 BHK Bhopal", "Real Estate", "real-estate.html#property-requirement"],
    ["Plots & Land", "Real Estate", "real-estate.html#property-solutions"],
    ["Dubai", "Travel", "travel.html#travel-offer"],
    ["Honeymoon", "Travel", "travel.html#honeymoon"],
    ["Hajj", "Travel", "travel.html#spiritual"],
    ["Umrah", "Travel", "travel.html#spiritual"],
    ["Karbala", "Travel", "travel.html#spiritual"],
    ["Char Dham", "Travel", "travel.html#spiritual"],
    ["MBBS", "Education & Admissions", "education.html#courses"],
    ["Engineering", "Education & Admissions", "education.html#courses"],
    ["Study Abroad", "Education & Admissions", "education.html#abroad-education"],
    ["GST", "Consultancy & Business Services", "consultancy.html#business-services"],
    ["MSME Udyam", "Consultancy & Business Services", "consultancy.html#business-services"],
    ["Wedding Venue", "Events & Weddings", "events.html#event-services"],
    ["Corporate Event", "Events & Weddings", "events.html#occasion-types"],
    ["Membership", "MADHYUM Membership", "membership.html"]
  ];

  const renderSearch = (query = "") => {
    if (!searchResults) return;
    const term = query.trim().toLowerCase();
    if (!term) {
      searchResults.innerHTML = `<div class="result"><strong>Start typing a requirement</strong><small>Try “3 BHK Bhopal”, “Dubai”, “MBBS”, “GST” or “Hajj”.</small></div>`;
      return;
    }
    const matches = SEARCH_DATA.filter((item) =>
      item[0].toLowerCase().includes(term) || item[1].toLowerCase().includes(term)
    );
    if (!matches.length) {
      searchResults.innerHTML = `<div class="result"><strong>No exact match found</strong><small>Try a different requirement or open a broader category.</small></div>`;
      return;
    }
    searchResults.innerHTML = matches.map((item) =>
      `<a class="result" href="${item[2]}"><strong>${item[0]}</strong><small>→ ${item[1]}</small></a>`
    ).join("");
  };
  searchInput?.addEventListener("input", (e) => renderSearch(e.target.value));
  renderSearch();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("href");
      if (!target || target === "#") return;
      const element = document.querySelector(target);
      if (!element) return;
      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  document.querySelectorAll(".requirement-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.querySelector(".form-success");
      if (!success) return;
      const name = form.dataset.formName || "Requirement";
      success.textContent = `${name} received. Your requirement has been captured on this page.`;
      success.classList.add("show");
      form.reset();
    });
  });

  const layeredOrbit = document.getElementById("layeredOrbit");
  const wings = Array.from(document.querySelectorAll(".layered-wing"));
  const prev = document.getElementById("layeredPrev");
  const next = document.getElementById("layeredNext");
  const dotsWrap = document.getElementById("layeredDots");
  const count = wings.length;
  const slots = ["position-left","position-far-left","is-active","position-right","position-far-right"];
  let currentSlot = 0;
  let timer = null;
  let hoverPaused = false;
  let touchPaused = false;
  let touchStartX = 0;

  const updateDots = () => {
    dotsWrap?.querySelectorAll(".layered-dot").forEach((dot, index) => {
      const relative = (index - currentSlot + count) % count;
      dot.classList.toggle("active", relative === 2);
    });
  };

  const updateOrbit = () => {
    if (count !== 5) return;
    wings.forEach((wing, index) => {
      slots.forEach((slot) => wing.classList.remove(slot));
      const relative = (index - currentSlot + count) % count;
      wing.classList.add(slots[relative]);
      wing.setAttribute("aria-current", relative === 2 ? "true" : "false");
    });
    updateDots();
  };

  const stopRotation = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const startRotation = () => {
    stopRotation();
    if (count !== 5 || hoverPaused || touchPaused) return;
    timer = window.setInterval(() => { if (!hoverPaused && !touchPaused) nextWing(); }, 4300);
  };
  const restartRotation = () => {
    stopRotation();
    window.setTimeout(startRotation, 700);
  };
  const nextWing = () => {
    if (count !== 5) return;
    currentSlot = (currentSlot - 1 + count) % count;
    updateOrbit();
  };
  const previousWing = () => {
    if (count !== 5) return;
    currentSlot = (currentSlot + 1) % count;
    updateOrbit();
  };

  if (dotsWrap && count === 5) {
    wings.forEach((wing, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "layered-dot";
      dot.setAttribute("aria-label", `Select ${wing.innerText.replace(/\s+/g, " ").trim()}`);
      dot.addEventListener("click", () => {
        currentSlot = (index - 2 + count) % count;
        updateOrbit();
        restartRotation();
      });
      dotsWrap.appendChild(dot);
    });
  }

  next?.addEventListener("click", () => { nextWing(); restartRotation(); });
  prev?.addEventListener("click", () => { previousWing(); restartRotation(); });

  wings.forEach((wing, index) => {
    wing.addEventListener("mouseenter", () => { hoverPaused = true; stopRotation(); });
    wing.addEventListener("mouseleave", () => { hoverPaused = false; startRotation(); });
    wing.addEventListener("click", (event) => {
      const relative = (index - currentSlot + count) % count;
      if (relative !== 2) {
        event.preventDefault();
        currentSlot = (index - 2 + count) % count;
        updateOrbit();
        restartRotation();
      }
    });
  });

  layeredOrbit?.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStartX = touch.screenX;
    touchPaused = true;
    stopRotation();
  }, { passive: true });

  layeredOrbit?.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    const distance = touch.screenX - touchStartX;
    if (Math.abs(distance) > 45) distance < 0 ? nextWing() : previousWing();
    touchPaused = false;
    startRotation();
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)) return;
    if (event.key === "ArrowRight") { nextWing(); restartRotation(); }
    if (event.key === "ArrowLeft") { previousWing(); restartRotation(); }
    if (event.key === "Escape") { closeMenu(); closeSearch(); }
  });

  if (layeredOrbit && count === 5) {
    updateOrbit();
    startRotation();
  }
})();
