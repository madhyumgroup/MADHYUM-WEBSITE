/* =========================================================
   MADHYUM — MAIN JAVASCRIPT
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
      threshold:.1
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
   C-SHAPED ROTATIONAL HERO
========================================================= */

const cOrbit =
  document.getElementById(
    'cOrbit'
  );


const cWings =
  Array.from(
    document.querySelectorAll(
      '.c-wing'
    )
  );


const cPrev =
  document.getElementById(
    'cPrev'
  );


const cNext =
  document.getElementById(
    'cNext'
  );


const cDots =
  document.getElementById(
    'cDots'
  );


const WINGS =
  cWings.length;


let current =
  0;


let timer =
  null;


let resumeTimer =
  null;


let paused =
  false;


let touchStartX =
  0;


/* =========================================================
   C POSITIONS
========================================================= */

/*
  These five slots form the C curve.

  0 = left
  1 = lower-left
  2 = bottom
  3 = lower-right
  4 = right
*/

const SLOT_CLASSES = [

  'c-left',

  'c-lower-left',

  'c-bottom',

  'c-lower-right',

  'c-right'

];


/* =========================================================
   CREATE DOTS
========================================================= */

function createCDots(){

  if (
    !cDots ||
    WINGS !== 5
  ){

    return;

  }


  cDots.innerHTML = '';


  cWings.forEach(
    (wing, index) => {

      const dot =
        document.createElement(
          'button'
        );


      dot.type =
        'button';


      dot.className =
        'c-dot';


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
        `Show ${name}`
      );


      dot.addEventListener(
        'click',
        () => {

          goTo(
            index
          );

          restartAuto();

        }
      );


      cDots.appendChild(
        dot
      );

    }
  );

}


/* =========================================================
   UPDATE DOTS
========================================================= */

function updateCDots(){

  if (!cDots){
    return;
  }


  const dots =
    cDots.querySelectorAll(
      '.c-dot'
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
   UPDATE C POSITIONS
========================================================= */

function updateCPositions(){

  cWings.forEach(
    (wing, index) => {

      /*
        Remove old state classes.
      */

      SLOT_CLASSES.forEach(
        (className) => {

          wing.classList.remove(
            className
          );

        }
      );


      /*
        Remove active.
      */

      wing.classList.remove(
        'c-active'
      );


      /*
        Calculate circular relative slot.
      */

      const relative =
        (
          index -
          current +
          WINGS
        ) %
        WINGS;


      const slotClass =
        SLOT_CLASSES[
          relative
        ];


      if (slotClass){

        wing.classList.add(
          slotClass
        );

      }


      /*
        Current selected item
        is the strongest item.
      */

      if (
        relative === 2
      ){

        wing.classList.add(
          'c-active'
        );

      }

    }
  );


  updateCDots();

}


/* =========================================================
   GO TO
========================================================= */

function goTo(
  index
){

  if (
    WINGS !== 5
  ){

    return;

  }


  current =
    (
      index +
      WINGS
    ) %
    WINGS;


  updateCPositions();

}


/* =========================================================
   NEXT
========================================================= */

function nextC(){

  goTo(
    current + 1
  );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousC(){

  goTo(
    current - 1
  );

}


/* =========================================================
   AUTO ROTATION
========================================================= */

function stopAuto(){

  if (
    timer
  ){

    clearInterval(
      timer
    );

    timer = null;

  }

}


function startAuto(){

  stopAuto();


  if (
    paused ||
    WINGS !== 5
  ){

    return;

  }


  timer =
    setInterval(
      () => {

        if (
          !paused
        ){

          nextC();

        }

      },
      4300
    );

}


function restartAuto(){

  stopAuto();


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

        startAuto();

      },
      800
    );

}


/* =========================================================
   ARROWS
========================================================= */

cNext?.addEventListener(
  'click',
  () => {

    nextC();

    restartAuto();

  }
);


cPrev?.addEventListener(
  'click',
  () => {

    previousC();

    restartAuto();

  }
);


/* =========================================================
   HOVER
========================================================= */

cWings.forEach(
  (wing, index) => {

    wing.addEventListener(
      'mouseenter',
      () => {

        paused = true;

        stopAuto();

      }
    );


    wing.addEventListener(
      'mouseleave',
      () => {

        paused = false;

        startAuto();

      }
    );


    /*
      Side item:
      bring into the centre/bottom slot.

      Active item:
      normal href works.
    */

    wing.addEventListener(
      'click',
      (event) => {

        /*
          The active item is the one
          occupying the bottom-centre
          Education-style slot.

          Its click should open the
          respective page.
        */

        const relative =
          (
            index -
            current +
            WINGS
          ) %
          WINGS;


        if (
          relative !== 2
        ){

          event.preventDefault();

          goTo(
            index - 2
          );

          restartAuto();

        }

      }
    );

  }
);


/* =========================================================
   TOUCH / SWIPE
========================================================= */

cOrbit?.addEventListener(
  'touchstart',
  (event) => {

    touchStartX =
      event
        .changedTouches[0]
        .screenX;


    paused = true;

    stopAuto();

  },
  {
    passive:true
  }
);


cOrbit?.addEventListener(
  'touchend',
  (event) => {

    const endX =
      event
        .changedTouches[0]
        .screenX;


    const distance =
      endX -
      touchStartX;


    if (
      Math.abs(distance) > 45
    ){

      if (
        distance < 0
      ){

        nextC();

      }
      else{

        previousC();

      }

    }


    paused = false;

    startAuto();

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

      nextC();

      restartAuto();

    }


    if (
      event.key === 'ArrowLeft'
    ){

      previousC();

      restartAuto();

    }

  }
);


/* =========================================================
   INITIALISE
========================================================= */

if (
  cOrbit &&
  WINGS === 5
){

  createCDots();

  /*
    We deliberately start with:
    Real Estate = left
    Travel = lower-left
    Education = bottom
    Consultancy = lower-right
    Events = right
  */

  current = 0;

  updateCPositions();

  startAuto();

}
