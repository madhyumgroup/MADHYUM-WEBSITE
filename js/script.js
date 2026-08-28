/* =========================================================
   MADHYUM WEBSITE — MAIN JAVASCRIPT
   V-ORBIT HERO VERSION
========================================================= */


/* =========================================================
   HEADER
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

          entry.target.classList.add("visible");

        }

      });

    },
    {
      threshold: 0.1
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
  document.querySelectorAll("[data-close-mobile]");


menuButton?.addEventListener(
  "click",
  () => {

    mobileMenu?.classList.add("open");

  }
);


mobileCloseButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      mobileMenu?.classList.remove("open");

    }
  );

});


/* =========================================================
   SMOOTH SCROLL
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
          behavior: "smooth",
          block: "start"
        });

        mobileMenu?.classList.remove("open");

      }
    );

  });


/* =========================================================
   SEARCH DRAWER
========================================================= */

const drawer =
  document.querySelector(".drawer");

const searchButtons =
  document.querySelectorAll("[data-search]");

const closeSearchButtons =
  document.querySelectorAll("[data-close-search]");

const searchInput =
  document.querySelector("#searchInput");

const searchResults =
  document.querySelector("#searchResults");


/* OPEN SEARCH */

searchButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      drawer?.classList.add("open");

      drawer?.setAttribute(
        "aria-hidden",
        "false"
      );

      setTimeout(() => {

        searchInput?.focus();

      }, 100);

    }
  );

});


/* CLOSE SEARCH */

closeSearchButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      drawer?.classList.remove("open");

      drawer?.setAttribute(
        "aria-hidden",
        "true"
      );

    }
  );

});


/* CLICK OUTSIDE SEARCH */

drawer?.addEventListener(
  "click",
  (event) => {

    if (event.target === drawer) {

      drawer.classList.remove("open");

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
    "Residential Property",
    "Real Estate",
    "real-estate.html"
  ],

  [
    "Commercial Property",
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
    "Family Travel",
    "Travel",
    "travel.html"
  ],

  [
    "International Travel",
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
    "Management",
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
    "Gumasta",
    "Consultancy & Business Services",
    "consultancy.html"
  ],

  [
    "Business Registration",
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
  ],

  [
    "Wedding Planning",
    "Events & Weddings",
    "events.html"
  ],

  [
    "Catering",
    "Events & Weddings",
    "events.html"
  ]

];


/* =========================================================
   SEARCH RENDER
========================================================= */

function renderSearch(query = "") {

  if (!searchResults) return;

  const term =
    query.trim().toLowerCase();


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
    SEARCH_DATA.filter((item) => {

      return (
        item[0]
          .toLowerCase()
          .includes(term)

        ||

        item[1]
          .toLowerCase()
          .includes(term)
      );

    });


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
      .map((item) => {

        return `

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

        `;

      })
      .join("");

}


searchInput?.addEventListener(
  "input",
  (event) => {

    renderSearch(event.target.value);

  }
);


renderSearch();


/* =========================================================
   MADHYUM V-ORBIT HERO
========================================================= */

const layeredOrbit =
  document.getElementById("layeredOrbit");

const layeredWings =
  Array.from(
    document.querySelectorAll(".layered-wing")
  );

const layeredPrev =
  document.getElementById("layeredPrev");

const layeredNext =
  document.getElementById("layeredNext");

const layeredDots =
  document.getElementById("layeredDots");


const WING_COUNT =
  layeredWings.length;


/*
  IMPORTANT:

  HTML order is fixed:

  0 = Real Estate
  1 = Travel
  2 = Education
  3 = Consultancy
  4 = Events


  Initial active/front position:

  Education = bottom centre.
*/

let activeWing = 2;


/*
  Rotation timer
*/

let rotationTimer = null;


/*
  Interaction states
*/

let isHovering = false;

let isTouching = false;


/*
  Touch tracking
*/

let touchStartX = 0;


/* =========================================================
   V-ORBIT POSITIONS
========================================================= */

const V_POSITIONS = [

  /*
    Position 0
    LEFT / UPPER
    REAL ESTATE
  */

  {
    className: "v-real-estate"
  },


  /*
    Position 1
    LEFT / MIDDLE
    TRAVEL
  */

  {
    className: "v-travel"
  },


  /*
    Position 2
    BOTTOM / CENTRE
    EDUCATION
  */

  {
    className: "v-education"
  },


  /*
    Position 3
    RIGHT / MIDDLE
    CONSULTANCY
  */

  {
    className: "v-consultancy"
  },


  /*
    Position 4
    RIGHT / UPPER
    EVENTS
  */

  {
    className: "v-events"
  }

];


/* =========================================================
   CREATE DOTS
========================================================= */

function createLayeredDots() {

  if (
    !layeredDots ||
    !WING_COUNT
  ) {
    return;
  }


  layeredDots.innerHTML = "";


  layeredWings.forEach(
    (wing, index) => {

      const dot =
        document.createElement("button");


      dot.type = "button";

      dot.className =
        "layered-dot";


      dot.setAttribute(
        "aria-label",
        `Select business ${index + 1}`
      );


      dot.addEventListener(
        "click",
        () => {

          setWing(index);

          restartRotation();

        }
      );


      layeredDots.appendChild(dot);

    }
  );

}


/* =========================================================
   APPLY V-ORBIT POSITIONS
========================================================= */

function updateWingPositions() {

  layeredWings.forEach(
    (wing, index) => {

      /*
        Remove old positioning classes.
      */

      wing.classList.remove(
        "is-active",
        "is-v-active",
        "position-left",
        "position-right",
        "position-far-left",
        "position-far-right"
      );


      /*
        Determine where this wing sits
        relative to the current front item.
      */

      const relative =
        (
          index -
          activeWing +
          WING_COUNT
        ) % WING_COUNT;


      /*
        Position 2 is always the
        bottom / front position.
      */

      const targetPosition =
        (
          relative + 2
        ) % WING_COUNT;


      const target =
        V_POSITIONS[targetPosition];


      /*
        Apply the correct V-position class.
      */

      if (target) {

        wing.classList.add(
          target.className
        );

      }


      /*
        Current front item.

        This is the LOWEST point.
      */

      if (
        targetPosition === 2
      ) {

        wing.classList.add(
          "is-v-active"
        );

      }


      /*
        Keep compatibility with
        any existing CSS.
      */

      if (
        targetPosition === 2
      ) {

        wing.classList.add(
          "is-active"
        );

      }

    }
  );


  /*
    Update dots.
  */

  const dots =
    layeredDots
      ? layeredDots.querySelectorAll(
          ".layered-dot"
        )
      : [];


  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === activeWing
      );

    }
  );

}


/* =========================================================
   SET ACTIVE WING
========================================================= */

function setWing(index) {

  if (!WING_COUNT) {
    return;
  }


  activeWing =
    (
      index +
      WING_COUNT
    ) % WING_COUNT;


  updateWingPositions();

}


/* =========================================================
   NEXT
========================================================= */

function nextWing() {

  setWing(
    activeWing + 1
  );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousWing() {

  setWing(
    activeWing - 1
  );

}


/* =========================================================
   BUTTONS
========================================================= */

layeredNext?.addEventListener(
  "click",
  () => {

    nextWing();

    restartRotation();

  }
);


layeredPrev?.addEventListener(
  "click",
  () => {

    previousWing();

    restartRotation();

  }
);


/* =========================================================
   CLICK BEHAVIOUR
========================================================= */

layeredWings.forEach(
  (wing, index) => {

    wing.addEventListener(
      "click",
      (event) => {

        /*
          If the item is not currently
          at the bottom/front position,
          bring it there first.
        */

        if (
          index !== activeWing
        ) {

          event.preventDefault();

          setWing(index);

          restartRotation();

          return;

        }

        /*
          If already active,
          allow its normal href.
        */

      }
    );


    /*
      Pause on hover.
    */

    wing.addEventListener(
      "mouseenter",
      () => {

        isHovering = true;

        stopRotation();

      }
    );


    wing.addEventListener(
      "mouseleave",
      () => {

        isHovering = false;

        startRotation();

      }
    );

  }
);


/* =========================================================
   AUTO ROTATION
========================================================= */

function startRotation() {

  stopRotation();


  rotationTimer =
    setInterval(
      () => {

        if (
          !isHovering &&
          !isTouching
        ) {

          nextWing();

        }

      },
      4500
    );

}


function stopRotation() {

  if (rotationTimer) {

    clearInterval(
      rotationTimer
    );

    rotationTimer = null;

  }

}


function restartRotation() {

  stopRotation();


  setTimeout(
    () => {

      startRotation();

    },
    700
  );

}


/* =========================================================
   TOUCH SWIPE
========================================================= */

layeredOrbit?.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0]
        .screenX;

    isTouching = true;

    stopRotation();

  },
  {
    passive: true
  }
);


layeredOrbit?.addEventListener(
  "touchend",
  (event) => {

    const touchEndX =
      event.changedTouches[0]
        .screenX;


    const distance =
      touchEndX -
      touchStartX;


    if (
      Math.abs(distance) > 45
    ) {

      if (
        distance < 0
      ) {

        nextWing();

      }
      else {

        previousWing();

      }

    }


    isTouching = false;

    restartRotation();

  },
  {
    passive: true
  }
);


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    const tag =
      document.activeElement?.tagName;


    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {

      return;

    }


    if (
      event.key === "ArrowRight"
    ) {

      nextWing();

      restartRotation();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousWing();

      restartRotation();

    }

  }
);


/* =========================================================
   INITIALISE
========================================================= */

if (
  layeredOrbit &&
  WING_COUNT === 5
) {

  createLayeredDots();


  /*
    IMPORTANT:

    Start with EDUCATION
    at bottom-centre.
  */

  setWing(2);


  startRotation();

}
