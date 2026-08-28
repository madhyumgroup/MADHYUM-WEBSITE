/* =========================================================
   MADHYUM WEBSITE — CLEAN FINAL JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER SCROLL
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


document
  .querySelectorAll('.reveal')
  .forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );


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
   SEARCH DRAWER
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
   LAYERED HERO
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


let activeWing = 0;


let rotationTimer = null;


let resumeTimer = null;


let paused = false;


let touchStartX = 0;


/* =========================================================
   POSITION CLASSES
========================================================= */

const POSITION_CLASSES = [

  'is-active',

  'position-right',

  'position-far-right',

  'position-far-left',

  'position-left'

];


/* =========================================================
   CREATE DOTS
========================================================= */

function createDots(){

  if (
    !layeredDots ||
    !WING_COUNT
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

          setWing(index);

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
        index === activeWing
      );

    }
  );

}


/* =========================================================
   APPLY POSITIONS
========================================================= */

function applyWingPositions(){

  layeredWings.forEach(
    (wing, index) => {

      POSITION_CLASSES.forEach(
        (className) => {

          wing.classList.remove(
            className
          );

        }
      );


      const relative =
        (
          index -
          activeWing +
          WING_COUNT
        ) %
        WING_COUNT;


      const className =
        POSITION_CLASSES[
          relative
        ];


      if (className){

        wing.classList.add(
          className
        );

      }


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
   SET ACTIVE
========================================================= */

function setWing(
  index
){

  if (!WING_COUNT){

    return;

  }


  activeWing =
    (
      index +
      WING_COUNT
    ) %
    WING_COUNT;


  applyWingPositions();

}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

function nextWing(){

  setWing(
    activeWing + 1
  );

}


function previousWing(){

  setWing(
    activeWing - 1
  );

}


/* =========================================================
   ROTATION CONTROL
========================================================= */

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


function startRotation(){

  stopRotation();


  if (paused){

    return;

  }


  rotationTimer =
    setInterval(
      () => {

        if (!paused){

          nextWing();

        }

      },
      4500
    );

}


function restartRotation(){

  stopRotation();


  if (resumeTimer){

    clearTimeout(
      resumeTimer
    );

  }


  resumeTimer =
    setTimeout(
      () => {

        startRotation();

      },
      800
    );

}


/* =========================================================
   PREVIOUS / NEXT BUTTONS
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
      Hover = pause.
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
      Side wing:
      bring it to front.

      Active wing:
      let normal href open.
    */

    wing.addEventListener(
      'click',
      (event) => {

        if (
          index !== activeWing
        ){

          event.preventDefault();

          setWing(index);

          restartRotation();

        }

      }
    );


    /*
      Detect image load failure.
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
      Do not interfere with typing.
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
   STOP HERO ROTATION WHEN HERO LEAVES VIEW
========================================================= */

if (hero){

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

  createDots();

  setWing(0);

  startRotation();

}
