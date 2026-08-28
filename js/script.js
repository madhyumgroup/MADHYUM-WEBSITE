/* =========================================================
   MADHYUM WEBSITE — CLEAN FINAL JAVASCRIPT
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
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
  document.querySelectorAll(
    '.reveal'
  );


if (
  'IntersectionObserver'
  in window
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
   MADHYUM C-SHAPED HERO
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


/*
  There must be exactly five wings.
*/

const WING_COUNT =
  layeredWings.length;


/*
  IMPORTANT:

  Current index is deliberately set to 2.

  With the position system below:

  wing 0 Real Estate
  wing 1 Travel
  wing 2 Education
  wing 3 Consultancy
  wing 4 Events

  the initial visual layout becomes:

  Real Estate  = LEFT
  Travel       = LOWER LEFT
  Education    = BOTTOM
  Consultancy  = LOWER RIGHT
  Events       = RIGHT
*/

let current =
  2;


/*
  Auto rotation.
*/

let rotationTimer =
  null;


/*
  Used to prevent multiple
  restart timers.
*/

let resumeTimer =
  null;


/*
  Pause state.
*/

let paused =
  false;


/*
  Touch state.
*/

let touchStartX =
  0;


/* =========================================================
   POSITION CLASSES
========================================================= */

/*
  JavaScript relative slots:

  relative 0 = bottom
  relative 1 = lower-right
  relative 2 = right
  relative 3 = left
  relative 4 = lower-left
*/

const POSITION_CLASSES = [

  'is-active',

  'position-right',

  'position-far-right',

  'position-left',

  'position-far-left'

];


/* =========================================================
   CREATE DOTS
========================================================= */

function createLayeredDots(){

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


      const label =
        wing
          .innerText
          .replace(
            /\s+/g,
            ' '
          )
          .trim();


      dot.setAttribute(
        'aria-label',
        `Select ${label}`
      );


      dot.addEventListener(
        'click',
        () => {

          /*
            Clicking a dot makes that
            business the BOTTOM CENTER
            active position.
          */

          setWing(
            index
          );


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

      dot.classList.toggle(
        'active',
        index === current
      );

    }
  );

}


/* =========================================================
   APPLY POSITIONS
========================================================= */

function updateWingPositions(){

  layeredWings.forEach(
    (wing, index) => {

      /*
        Remove previous state classes.
      */

      wing.classList.remove(

        'is-active',

        'position-left',

        'position-right',

        'position-far-left',

        'position-far-right'

      );


      /*
        Calculate current
        circular relative position.
      */

      const relative =
        (
          index -
          current +
          WING_COUNT
        ) %
        WING_COUNT;


      /*
        Apply the matching slot.
      */

      const positionClass =
        POSITION_CLASSES[
          relative
        ];


      if (
        positionClass
      ){

        wing.classList.add(
          positionClass
        );

      }


      /*
        Accessibility state.

        The active item is the
        bottom-center item.
      */

      wing.setAttribute(
        'aria-current',
        relative === 0
          ? 'true'
          : 'false'
      );

    }
  );


  updateDots();

}


/* =========================================================
   SET ACTIVE WING
========================================================= */

function setWing(
  index
){

  if (
    WING_COUNT !== 5
  ){

    return;

  }


  current =
    (
      index +
      WING_COUNT
    ) %
    WING_COUNT;


  updateWingPositions();

}


/* =========================================================
   C-SHAPE MOVEMENT
========================================================= */

/*
  IMPORTANT:

  We move CURRENT BACKWARD.

  That creates this path:

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

  This is the C-shaped left-to-right
  circulation we agreed on.
*/

function nextWing(){

  setWing(
    current - 1
  );

}


function previousWing(){

  setWing(
    current + 1
  );

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

  }


  rotationTimer =
    null;

}


function startRotation(){

  stopRotation();


  if (
    paused ||
    WING_COUNT !== 5
  ){

    return;

  }


  rotationTimer =
    setInterval(
      () => {

        if (!paused){

          nextWing();

        }

      },
      4300
    );

}


function restartRotation(){

  stopRotation();


  if (
    resumeTimer
  ){

    clearTimeout(
      resumeTimer
    );

  }


  resumeTimer =
    setTimeout(
      () => {

        startRotation();

      },
      900
    );

}


/* =========================================================
   ARROW CONTROLS
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
   WING HOVER + CLICK
========================================================= */

layeredWings.forEach(
  (wing, index) => {

    /*
      Hover pauses the orbit.
    */

    wing.addEventListener(
      'mouseenter',
      () => {

        paused = true;

        stopRotation();

      }
    );


    wing.addEventListener(
      'mouseleave',
      () => {

        paused = false;

        startRotation();

      }
    );


    /*
      Clicking a side wing brings it
      to the BOTTOM CENTER position.

      Clicking the active/bottom wing
      follows its normal href.
    */

    wing.addEventListener(
      'click',
      (event) => {

        const relative =
          (
            index -
            current +
            WING_COUNT
          ) %
          WING_COUNT;


        /*
          Side item.
        */

        if (
          relative !== 0
        ){

          event.preventDefault();


          setWing(
            index
          );


          restartRotation();

        }

        /*
          Active item:

          Do nothing.

          Its <a href="..."> works normally.
        */

      }
    );


    /*
      Detect broken images.
    */

    const image =
      wing.querySelector(
        'img'
      );


    image?.addEventListener(
      'error',
      () => {

        wing.classList.add(
          'image-missing'
        );

        console.warn(
          'MADHYUM image could not load:',
          image.src
        );

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


    paused = true;

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


    paused = false;

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


    /*
      Don't interfere with input typing.
    */

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
   PAUSE WHEN HERO IS NOT VISIBLE
========================================================= */

if (
  hero &&
  'IntersectionObserver'
  in window
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
   INITIALISE HERO
========================================================= */

if (
  layeredOrbit &&
  WING_COUNT === 5
){

  createLayeredDots();


  /*
    Initial locked composition:

    Real Estate = LEFT
    Travel = LOWER LEFT
    Education = BOTTOM CENTER
    Consultancy = LOWER RIGHT
    Events = RIGHT
  */

  current = 2;


  updateWingPositions();


  startRotation();

}
