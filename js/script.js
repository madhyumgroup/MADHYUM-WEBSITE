/* =========================================================
   MADHYUM WEBSITE
   Main JavaScript
========================================================= */


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
  document.querySelector(".site-header");


window.addEventListener("scroll", () => {

  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },
    {
      threshold:0.1
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    revealObserver.observe(element);

  });


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
  document.querySelector(".mobile-menu");

const menuButton =
  document.querySelector(".menu-btn");

const mobileCloseButtons =
  document.querySelectorAll(
    "[data-close-mobile]"
  );


menuButton?.addEventListener(
  "click",
  () => {

    mobileMenu?.classList.add("open");

  }
);


mobileCloseButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        mobileMenu?.classList.remove(
          "open"
        );

      }
    );

  }
);


/* =========================================================
   SMOOTH INTERNAL SCROLL
========================================================= */

document
  .querySelectorAll("[data-scroll]")
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const target =
          link.getAttribute("href");

        if (
          !target ||
          !target.startsWith("#")
        ) {
          return;
        }

        const element =
          document.querySelector(target);

        if (!element) {
          return;
        }

        event.preventDefault();

        element.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

        mobileMenu?.classList.remove(
          "open"
        );

      }
    );

  });


/* =========================================================
   SEARCH DRAWER
========================================================= */

const drawer =
  document.querySelector(".drawer");

const searchButtons =
  document.querySelectorAll(
    "[data-search]"
  );

const closeSearchButtons =
  document.querySelectorAll(
    "[data-close-search]"
  );

const searchInput =
  document.querySelector(
    "#searchInput"
  );

const searchResults =
  document.querySelector(
    "#searchResults"
  );


searchButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        drawer?.classList.add(
          "open"
        );

        drawer?.setAttribute(
          "aria-hidden",
          "false"
        );

        setTimeout(() => {

          searchInput?.focus();

        },100);

      }
    );

  }
);


closeSearchButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        drawer?.classList.remove(
          "open"
        );

        drawer?.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );

  }
);


/* Close drawer when clicking background */

drawer?.addEventListener(
  "click",
  (event) => {

    if (
      event.target === drawer
    ) {

      drawer.classList.remove(
        "open"
      );

      drawer.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  }
);


/* =========================================================
   SEARCH DATA
========================================================= */

const SEARCH_DATA = [

  [
    "3 BHK Bhopal",
    "Real Estate",
    "real-estate.html"
  ],

  [
    "Plots & Land",
    "Real Estate",
    "real-estate.html"
  ],

  [
    "Dubai",
    "Travel",
    "travel.html"
  ],

  [
    "Honeymoon",
    "Travel",
    "travel.html"
  ],

  [
    "MBBS",
    "Education & Admissions",
    "education.html"
  ],

  [
    "Engineering",
    "Education & Admissions",
    "education.html"
  ],

  [
    "Study Abroad",
    "Education & Admissions",
    "education.html"
  ],

  [
    "GST",
    "Consultancy & Business Services",
    "consultancy.html"
  ],

  [
    "MSME Udyam",
    "Consultancy & Business Services",
    "consultancy.html"
  ],

  [
    "Wedding Venue",
    "Events & Weddings",
    "events.html"
  ],

  [
    "Corporate Event",
    "Events & Weddings",
    "events.html"
  ]

];


/* =========================================================
   SEARCH RENDER
========================================================= */

function renderSearch(
  query = ""
){

  if (!searchResults) {
    return;
  }

  const term =
    query
      .trim()
      .toLowerCase();


  if (!term) {

    searchResults.innerHTML = `

      <div class="result">

        <strong>
          Start typing a requirement
        </strong>

        <small>
          Try “3 BHK Bhopal”,
          “Dubai”, “MBBS” or “GST”.
        </small>

      </div>

    `;

    return;

  }


  const matches =
    SEARCH_DATA.filter(
      (item) => {

        return (
          item[0]
            .toLowerCase()
            .includes(term)
          ||
          item[1]
            .toLowerCase()
            .includes(term)
        );

      }
    );


  if (!matches.length) {

    searchResults.innerHTML = `

      <div class="result">

        <strong>
          No exact match found
        </strong>

        <small>
          Try a different requirement.
        </small>

      </div>

    `;

    return;

  }


  searchResults.innerHTML =
    matches
      .map(
        (item) => `

          <a
            class="result"
            href="${item[2]}"
          >

            <strong>
              ${item[0]}
            </strong>

            <small>
              → ${item[1]}
            </small>

          </a>

        `
      )
      .join("");

}


searchInput?.addEventListener(
  "input",
  (event) => {

    renderSearch(
      event.target.value
    );

  }
);


renderSearch();


/* =========================================================
   3D BUSINESS CAROUSEL
========================================================= */

const orbitTrack =
  document.querySelector(
    "#orbitTrack"
  );

const orbitCards =
  Array.from(
    document.querySelectorAll(
      ".orbit-card"
    )
  );

const orbitPrev =
  document.querySelector(
    "#orbitPrev"
  );

const orbitNext =
  document.querySelector(
    "#orbitNext"
  );

const orbitProgress =
  document.querySelector(
    "#orbitProgress"
  );


/*
  Five business cards.

  72 degrees =
  360 / 5

  This creates a perfect
  circular 3D arrangement.
*/

const CARD_COUNT =
  orbitCards.length;

const ANGLE_STEP =
  CARD_COUNT > 0
    ? 360 / CARD_COUNT
    : 72;


/*
  The selected / front card.
*/

let activeIndex = 0;


/*
  Automatic rotation timer.
*/

let autoTimer = null;


/*
  User interaction states.
*/

let isHovering = false;

let isTouching = false;


/* =========================================================
   BUILD PROGRESS DOTS
========================================================= */

function buildProgress(){

  if (!orbitProgress) {
    return;
  }


  orbitProgress.innerHTML = "";


  orbitCards.forEach(
    (_, index) => {

      const dot =
        document.createElement(
          "button"
        );

      dot.type = "button";

      dot.className =
        "orbit-dot";


      dot.setAttribute(
        "aria-label",
        `Show ${
          orbitCards[index]
            .textContent
            .replace(/\s+/g," ")
            .trim()
        }`
      );


      dot.addEventListener(
        "click",
        () => {

          goTo(index);

          restartAutoRotation();

        }
      );


      orbitProgress.appendChild(
        dot
      );

    }
  );

}


/* =========================================================
   UPDATE DOTS / CARD STATE
========================================================= */

function updateState(){

  const dots =
    orbitProgress
      ? orbitProgress.querySelectorAll(
          ".orbit-dot"
        )
      : [];


  orbitCards.forEach(
    (card, index) => {

      const relative =
        (
          index -
          activeIndex +
          CARD_COUNT
        ) %
        CARD_COUNT;


      /*
        Front card.
      */

      if (relative === 0) {

        card.style.opacity = "1";

        card.style.filter =
          "brightness(1)";

        card.style.zIndex =
          "10";

        card.classList.add(
          "active"
        );

      }


      /*
        Side cards.
      */

      else if (
        relative === 1 ||
        relative === CARD_COUNT - 1
      ){

        card.style.opacity =
          ".88";

        card.style.filter =
          "brightness(.84)";

        card.style.zIndex =
          "6";

        card.classList.remove(
          "active"
        );

      }


      /*
        Rear cards.
      */

      else {

        card.style.opacity =
          ".42";

        card.style.filter =
          "brightness(.55)";

        card.style.zIndex =
          "1";

        card.classList.remove(
          "active"
        );

      }

    }
  );


  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === activeIndex
      );

    }
  );

}


/* =========================================================
   ROTATE CAROUSEL
========================================================= */

function goTo(index){

  if (!orbitTrack) {
    return;
  }


  activeIndex =
    (
      index + CARD_COUNT
    ) %
    CARD_COUNT;


  const rotation =
    -(
      activeIndex *
      ANGLE_STEP
    );


  orbitTrack.style.transform =
    `rotateY(${rotation}deg)`;


  updateState();

}


/* =========================================================
   NEXT
========================================================= */

function next(){

  goTo(
    activeIndex + 1
  );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previous(){

  goTo(
    activeIndex - 1
  );

}


/* =========================================================
   BUTTONS
========================================================= */

orbitNext?.addEventListener(
  "click",
  () => {

    next();

    restartAutoRotation();

  }
);


orbitPrev?.addEventListener(
  "click",
  () => {

    previous();

    restartAutoRotation();

  }
);


/* =========================================================
   CARD CLICK
========================================================= */

/*
  IMPORTANT:

  If a side/rear card is clicked:
    1. It first rotates to the front.
    2. It does NOT immediately navigate.

  Once it is in front:
    clicking it opens its page.

  This gives the user control over
  the rotating carousel.
*/

orbitCards.forEach(
  (card, index) => {

    card.addEventListener(
      "click",
      (event) => {

        if (
          activeIndex !== index
        ){

          event.preventDefault();

          goTo(index);

          restartAutoRotation();

        }

      }
    );


    /*
      Desktop hover pauses rotation.
    */

    card.addEventListener(
      "mouseenter",
      () => {

        isHovering = true;

        stopAutoRotation();

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        isHovering = false;

        startAutoRotation();

      }
    );

  }
);


/* =========================================================
   AUTO ROTATION
========================================================= */

function startAutoRotation(){

  stopAutoRotation();


  autoTimer =
    setInterval(
      () => {

        if (
          !isHovering &&
          !isTouching
        ){

          next();

        }

      },
      5000
    );

}


function stopAutoRotation(){

  if (autoTimer){

    clearInterval(
      autoTimer
    );

    autoTimer = null;

  }

}


function restartAutoRotation(){

  stopAutoRotation();

  setTimeout(
    () => {

      startAutoRotation();

    },
    800
  );

}


/* =========================================================
   TOUCH / SWIPE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


orbitTrack?.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0]
        .screenX;

    isTouching = true;

    stopAutoRotation();

  },
  {
    passive:true
  }
);


orbitTrack?.addEventListener(
  "touchend",
  (event) => {

    touchEndX =
      event.changedTouches[0]
        .screenX;


    const distance =
      touchEndX -
      touchStartX;


    if (
      Math.abs(distance) > 45
    ){

      if (distance < 0){

        next();

      } else {

        previous();

      }

    }


    isTouching = false;

    restartAutoRotation();

  },
  {
    passive:true
  }
);


/* =========================================================
   KEYBOARD CONTROL
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /*
      Don't hijack typing into
      search/input fields.
    */

    const tag =
      document.activeElement?.tagName;


    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ){

      return;

    }


    if (
      event.key === "ArrowRight"
    ){

      next();

      restartAutoRotation();

    }


    if (
      event.key === "ArrowLeft"
    ){

      previous();

      restartAutoRotation();

    }

  }
);


/* =========================================================
   INITIALISE CAROUSEL
========================================================= */

if (
  orbitTrack &&
  CARD_COUNT > 0
){

  /*
    Put cards around the circle.
  */

  orbitCards.forEach(
    (card, index) => {

      card.style.setProperty(
        "--orbit-angle",
        index * ANGLE_STEP
      );

    }
  );


  buildProgress();

  goTo(0);

  startAutoRotation();

}
