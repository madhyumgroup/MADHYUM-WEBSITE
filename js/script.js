/* =========================================================
   MADHYUM WEBSITE — CLEAN C-ORBIT JAVASCRIPT
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

    if (!header) {
      return;
    }

    header.classList.toggle(
      'scrolled',
      window.scrollY > 30
    );

  }
);


/* =========================================================
   REVEAL
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

const hero =
  document.querySelector(
    '.layered-hero'
  );


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


/*
  ==========================================================
  IMPORTANT C-PATH

  slot 0 = LEFT
  slot 1 = LOWER LEFT
  slot 2 = BOTTOM CENTER
  slot 3 = LOWER RIGHT
  slot 4 = RIGHT

  Initial arrangement:

  Real Estate  = LEFT
  Travel       = LOWER LEFT
  Education    = BOTTOM
  Consultancy  = LOWER RIGHT
  Events       = RIGHT
  ==========================================================
*/


const SLOT_CLASSES = [

  'position-left',

  'position-far-left',

  'is-active',

  'position-right',

  'position-far-right'

];


let currentSlot =
  0;


let rotationTimer =
  null;


let hoverPaused =
  false;


let touchPaused =
  false;


let touchStartX =
  0;


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
            The selected business becomes
            the bottom-center business.
          */

          currentSlot =
            (
              index - 2 + WING_COUNT
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

      /*
        The item occupying the
        bottom-center slot is active.
      */

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

      /*
        Remove all possible position classes.
      */

      SLOT_CLASSES.forEach(
        (className) => {

          wing.classList.remove(
            className
          );

        }
      );


      /*
        Calculate the slot occupied
        by this wing.

        0 = left
        1 = lower-left
        2 = bottom
        3 = lower-right
        4 = right
      */

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
   MOVE ONE STEP FORWARD

   C direction:

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

  /*
    Decrease currentSlot by one.

    This makes every individual wing
    move one position forward along
    the C curve.
  */

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
   MOVE ONE STEP BACK
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


function stopRotation(){

  if (
    rotationTimer
  ){

    clearInterval(
      rotationTimer
    );

    rotationTimer = null;

  }

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
   CLICKABLE WINGS
========================================================= */

layeredWings.forEach(
  (wing, index) => {

    /*
      Hover pauses the rotation.
    */

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


    /*
      Side wing:
      clicking it brings that wing
      to BOTTOM CENTER.

      Bottom-center wing:
      normal href opens.
    */

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


        if (
          relative !== 2
        ){

          event.preventDefault();


          /*
            For this wing to become
            bottom-center:

            index - currentSlot = 2

            therefore:

            currentSlot = index - 2
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

      }
    );

  }
);


/* =========================================================
   MOBILE SWIPE
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
   PAUSE WHEN HERO IS OFF SCREEN
========================================================= */

if (
  hero &&
  'IntersectionObserver' in window
){

  const heroObserver =
    new IntersectionObserver(
      (entries) => {

        const visible =
          entries[0]?.isIntersecting;


        if (visible){

          startRotation();

        }
        else{

          stopRotation();

        }

      },
      {
        threshold:0.05
      }
    );


  heroObserver.observe(
    hero
  );

}


/* =========================================================
   INITIALISE
========================================================= */

if (
  layeredOrbit &&
  WING_COUNT === 5
){

  /*
    currentSlot = 0 gives:

    Real Estate  → LEFT
    Travel       → LOWER LEFT
    Education    → BOTTOM CENTER
    Consultancy  → LOWER RIGHT
    Events       → RIGHT
  */

  currentSlot = 0;


  createDots();


  updateOrbit();


  startRotation();

}
