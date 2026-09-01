/* =========================================================
   MADHYUM WEBSITE — FINAL C-ORBIT JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER
========================================================= */

const header =
  document.querySelector(
    '.site-header'
  );


window.addEventListener(
  'scroll',
  () => {

    if (!header){
      return;
    }


    header.classList.toggle(
      'scrolled',
      window.scrollY > 30
    );

  }
);


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
  document.querySelectorAll(
    '.reveal'
  );


if (
  'IntersectionObserver' in window
){

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ){

              entry.target.classList.add(
                'visible'
              );

            }

          }
        );

      },
      {
        threshold:0.1
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

}
else{

  revealElements.forEach(
    (element) => {

      element.classList.add(
        'visible'
      );

    }
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
  document.querySelector(
    '.mobile-menu'
  );


const menuButton =
  document.querySelector(
    '.menu-btn'
  );


const mobileCloseButtons =
  document.querySelectorAll(
    '[data-close-mobile]'
  );


menuButton?.addEventListener(
  'click',
  () => {

    mobileMenu?.classList.add(
      'open'
    );

  }
);


mobileCloseButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        mobileMenu?.classList.remove(
          'open'
        );

      }
    );

  }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll(
    '[data-scroll]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        'click',
        (event) => {

          const target =
            link.getAttribute(
              'href'
            );


          if (
            !target ||
            !target.startsWith('#')
          ){

            return;

          }


          const element =
            document.querySelector(
              target
            );


          if (!element){

            return;

          }


          event.preventDefault();


          element.scrollIntoView({

            behavior:'smooth',

            block:'start'

          });


          mobileMenu?.classList.remove(
            'open'
          );

        }
      );

    }
  );


/* =========================================================
   SEARCH
========================================================= */

const drawer =
  document.querySelector(
    '.drawer'
  );


const searchButtons =
  document.querySelectorAll(
    '[data-search]'
  );


const closeSearchButtons =
  document.querySelectorAll(
    '[data-close-search]'
  );


const searchInput =
  document.querySelector(
    '#searchInput'
  );


const searchResults =
  document.querySelector(
    '#searchResults'
  );


searchButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        drawer?.classList.add(
          'open'
        );


        drawer?.setAttribute(
          'aria-hidden',
          'false'
        );


        setTimeout(
          () => {

            searchInput?.focus();

          },
          100
        );

      }
    );

  }
);


closeSearchButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        drawer?.classList.remove(
          'open'
        );


        drawer?.setAttribute(
          'aria-hidden',
          'true'
        );

      }
    );

  }
);


drawer?.addEventListener(
  'click',
  (event) => {

    if (
      event.target === drawer
    ){

      drawer.classList.remove(
        'open'
      );


      drawer.setAttribute(
        'aria-hidden',
        'true'
      );

    }

  }
);


/* =========================================================
   SEARCH DATA
========================================================= */

const SEARCH_DATA = [

  [
    '3 BHK Bhopal',
    'Real Estate',
    'real-estate.html'
  ],

  [
    'Plots & Land',
    'Real Estate',
    'real-estate.html'
  ],

  [
    'Dubai',
    'Travel',
    'travel.html'
  ],

  [
    'Honeymoon',
    'Travel',
    'travel.html'
  ],

  [
    'MBBS',
    'Education & Admissions',
    'education.html'
  ],

  [
    'Engineering',
    'Education & Admissions',
    'education.html'
  ],

  [
    'Study Abroad',
    'Education & Admissions',
    'education.html'
  ],

  [
    'GST',
    'Consultancy & Business Services',
    'consultancy.html'
  ],

  [
    'MSME Udyam',
    'Consultancy & Business Services',
    'consultancy.html'
  ],

  [
    'Wedding Venue',
    'Events & Weddings',
    'events.html'
  ],

  [
    'Corporate Event',
    'Events & Weddings',
    'events.html'
  ]

];


/* =========================================================
   SEARCH RENDER
========================================================= */

function renderSearch(
  query = ''
){

  if (!searchResults){

    return;

  }


  const term =
    query
      .trim()
      .toLowerCase();


  if (!term){

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
      (item) => (

        item[0]
          .toLowerCase()
          .includes(term)

        ||

        item[1]
          .toLowerCase()
          .includes(term)

      )
    );


  if (!matches.length){

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
      .join('');

}


searchInput?.addEventListener(
  'input',
  (event) => {

    renderSearch(
      event.target.value
    );

  }
);


renderSearch();


/* =========================================================
   C-SHAPED HERO ORBIT
========================================================= */

const layeredOrbit =
  document.getElementById(
    'layeredOrbit'
  );


const layeredWings =
  Array.from(
    document.querySelectorAll(
      '.layered-wing'
    )
  );


const layeredPrev =
  document.getElementById(
    'layeredPrev'
  );


const layeredNext =
  document.getElementById(
    'layeredNext'
  );


const layeredDots =
  document.getElementById(
    'layeredDots'
  );


const WING_COUNT =
  layeredWings.length;


/* =========================================================
   FIVE FIXED C-ORBIT SLOTS

   0 = LEFT
   1 = LOWER LEFT
   2 = BOTTOM CENTER
   3 = LOWER RIGHT
   4 = RIGHT

   Initial:

   REAL ESTATE  → LEFT
   TRAVEL       → LOWER LEFT
   EDUCATION    → BOTTOM
   CONSULTANCY  → LOWER RIGHT
   EVENTS       → RIGHT
========================================================= */

const SLOT_CLASSES = [

  'position-left',

  'position-far-left',

  'is-active',

  'position-right',

  'position-far-right'

];


let currentSlot = 0;


/* =========================================================
   ROTATION STATE
========================================================= */

let rotationTimer = null;

let hoverPaused = false;

let touchPaused = false;

let touchStartX = 0;


/* =========================================================
   CREATE DOTS
========================================================= */

function createDots(){

  if (
    !layeredDots ||
    WING_COUNT !== 5
  ){

    return;

  }


  layeredDots.innerHTML = '';


  layeredWings.forEach(
    (wing, index) => {

      const dot =
        document.createElement(
          'button'
        );


      dot.type =
        'button';


      dot.className =
        'layered-dot';


      const name =
        wing
          .innerText
          .replace(
            /\s+/g,
            ' '
          )
          .trim();


      dot.setAttribute(
        'aria-label',
        `Select ${name}`
      );


      dot.addEventListener(
        'click',
        () => {

          /*
            Put selected wing
            at bottom-center.

            Bottom slot = 2.
          */

          currentSlot =
            (
              index -
              2 +
              WING_COUNT
            ) %
            WING_COUNT;


          updateOrbit();

          restartRotation();

        }
      );


      layeredDots.appendChild(
        dot
      );

    }
  );

}


/* =========================================================
   UPDATE DOTS
========================================================= */

function updateDots(){

  if (!layeredDots){

    return;

  }


  const dots =
    layeredDots.querySelectorAll(
      '.layered-dot'
    );


  dots.forEach(
    (dot, index) => {

      const relative =
        (
          index -
          currentSlot +
          WING_COUNT
        ) %
        WING_COUNT;


      dot.classList.toggle(
        'active',
        relative === 2
      );

    }
  );

}


/* =========================================================
   UPDATE ORBIT
========================================================= */

function updateOrbit(){

  if (
    WING_COUNT !== 5
  ){

    return;

  }


  layeredWings.forEach(
    (wing, index) => {

      SLOT_CLASSES.forEach(
        (className) => {

          wing.classList.remove(
            className
          );

        }
      );


      const relative =
        (
          index -
          currentSlot +
          WING_COUNT
        ) %
        WING_COUNT;


      const slotClass =
        SLOT_CLASSES[
          relative
        ];


      if (slotClass){

        wing.classList.add(
          slotClass
        );

      }


      wing.setAttribute(
        'aria-current',
        relative === 2
          ? 'true'
          : 'false'
      );

    }
  );


  updateDots();

}


/* =========================================================
   NEXT

   C PATH:

   LEFT
      ↓
   LOWER LEFT
      ↓
   BOTTOM
      ↓
   LOWER RIGHT
      ↓
   RIGHT
      ↓
   LEFT
========================================================= */

function nextWing(){

  currentSlot =
    (
      currentSlot -
      1 +
      WING_COUNT
    ) %
    WING_COUNT;


  updateOrbit();

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousWing(){

  currentSlot =
    (
      currentSlot +
      1
    ) %
    WING_COUNT;


  updateOrbit();

}


/* =========================================================
   AUTO ROTATION
========================================================= */

function stopRotation(){

  if (
    rotationTimer
  ){

    clearInterval(
      rotationTimer
    );

    rotationTimer =
      null;

  }

}


function startRotation(){

  stopRotation();


  if (
    WING_COUNT !== 5 ||
    hoverPaused ||
    touchPaused
  ){

    return;

  }


  rotationTimer =
    setInterval(
      () => {

        if (
          !hoverPaused &&
          !touchPaused
        ){

          nextWing();

        }

      },
      4300
    );

}


function restartRotation(){

  stopRotation();


  setTimeout(
    () => {

      startRotation();

    },
    700
  );

}


/* =========================================================
   ARROWS
========================================================= */

layeredNext?.addEventListener(
  'click',
  () => {

    nextWing();

    restartRotation();

  }
);


layeredPrev?.addEventListener(
  'click',
  () => {

    previousWing();

    restartRotation();

  }
);


/* =========================================================
   WING INTERACTION
========================================================= */

layeredWings.forEach(
  (wing, index) => {


    /* -----------------------------------------------
       PAUSE ON HOVER
    ------------------------------------------------ */

    wing.addEventListener(
      'mouseenter',
      () => {

        hoverPaused = true;

        stopRotation();

      }
    );


    wing.addEventListener(
      'mouseleave',
      () => {

        hoverPaused = false;

        startRotation();

      }
    );


    /* -----------------------------------------------
       CLICK
    ------------------------------------------------ */

    wing.addEventListener(
      'click',
      (event) => {

        const relative =
          (
            index -
            currentSlot +
            WING_COUNT
          ) %
          WING_COUNT;


        /*
          Side wing:

          Bring it to the
          bottom-center position.
        */

        if (
          relative !== 2
        ){

          event.preventDefault();


          currentSlot =
            (
              index -
              2 +
              WING_COUNT
            ) %
            WING_COUNT;


          updateOrbit();


          restartRotation();

        }

        /*
          Bottom-center wing:

          Normal href works.
        */

      }
    );

  }
);


/* =========================================================
   TOUCH SWIPE
========================================================= */

layeredOrbit?.addEventListener(
  'touchstart',
  (event) => {

    touchStartX =
      event
        .changedTouches[0]
        .screenX;


    touchPaused = true;

    stopRotation();

  },
  {
    passive:true
  }
);


layeredOrbit?.addEventListener(
  'touchend',
  (event) => {

    const touchEndX =
      event
        .changedTouches[0]
        .screenX;


    const distance =
      touchEndX -
      touchStartX;


    if (
      Math.abs(distance) > 45
    ){

      if (
        distance < 0
      ){

        nextWing();

      }
      else{

        previousWing();

      }

    }


    touchPaused = false;

    startRotation();

  },
  {
    passive:true
  }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  'keydown',
  (event) => {

    const tag =
      document.activeElement?.tagName;


    if (

      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT'

    ){

      return;

    }


    if (
      event.key === 'ArrowRight'
    ){

      nextWing();

      restartRotation();

    }


    if (
      event.key === 'ArrowLeft'
    ){

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
){

  /*
    Initial layout:

    Real Estate  = LEFT
    Travel       = LOWER LEFT
    Education    = BOTTOM CENTER
    Consultancy  = LOWER RIGHT
    Events       = RIGHT
  */

  currentSlot = 0;


  createDots();


  updateOrbit();


  startRotation();

}

/* =========================================================
   V5 — NAVIGATION AUTO HIDE / SHOW
========================================================= */

(() => {
  const pageHeader = document.querySelector(".site-header");
  if (!pageHeader) return;

  let lastY = Math.max(window.scrollY, 0);
  let ticking = false;

  const syncHeader = () => {
    const currentY = Math.max(window.scrollY, 0);

    if (currentY <= 24) {
      pageHeader.classList.remove("nav-hidden");
    } else if (currentY > lastY + 4) {
      pageHeader.classList.add("nav-hidden");
    } else if (currentY < lastY - 4) {
      pageHeader.classList.remove("nav-hidden");
    }

    lastY = currentY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(syncHeader);
      ticking = true;
    }
  }, { passive: true });

  syncHeader();
})();

/* =========================================================
   V5 — VIEW MORE DETAILS
========================================================= */

document.querySelectorAll(".service-more summary").forEach((summary) => {
  summary.addEventListener("click", () => {
    const details = summary.closest(".service-more");
    if (!details) return;

    window.setTimeout(() => {
      const expanded = details.open;
      summary.childNodes[0].textContent = expanded ? "View Less " : "View More ";
    }, 0);
  });
});

/* =========================================================
   V5 — NAVIGATION AUTO HIDE / SHOW
========================================================= */
(() => {
  const pageHeader = document.querySelector(".site-header");
  if (!pageHeader) return;

  let lastY = Math.max(window.scrollY, 0);
  let ticking = false;

  const syncHeader = () => {
    const currentY = Math.max(window.scrollY, 0);

    if (currentY <= 24) {
      pageHeader.classList.remove("nav-hidden");
    } else if (currentY > lastY + 4) {
      pageHeader.classList.add("nav-hidden");
    } else if (currentY < lastY - 4) {
      pageHeader.classList.remove("nav-hidden");
    }

    lastY = currentY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(syncHeader);
      ticking = true;
    }
  }, { passive: true });

  syncHeader();
})();

/* =========================================================
   V5 — VIEW MORE DETAILS
========================================================= */
document.querySelectorAll(".service-more summary").forEach((summary) => {
  summary.addEventListener("click", () => {
    const details = summary.closest(".service-more");
    if (!details) return;

    window.setTimeout(() => {
      const expanded = details.open;
      summary.childNodes[0].textContent = expanded ? "View Less " : "View More ";
    }, 0);
  });
});
