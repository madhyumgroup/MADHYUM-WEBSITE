/* =========================================================
   MADHYUM WEBSITE — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER
========================================================= */

const header =
  document.querySelector(
    ".site-header"
  );


window.addEventListener(
  "scroll",
  () => {

    if (!header) {
      return;
    }

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }
);


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
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
  .querySelectorAll(".reveal")
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
    ".mobile-menu"
  );


const menuButton =
  document.querySelector(
    ".menu-btn"
  );


const mobileCloseButtons =
  document.querySelectorAll(
    "[data-close-mobile]"
  );


menuButton?.addEventListener(
  "click",
  () => {

    mobileMenu?.classList.add(
      "open"
    );

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
   SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll(
    "[data-scroll]"
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const target =
            link.getAttribute(
              "href"
            );


          if (
            !target ||
            !target.startsWith("#")
          ) {

            return;

          }


          const element =
            document.querySelector(
              target
            );


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

    }
  );


/* =========================================================
   SEARCH
========================================================= */

const drawer =
  document.querySelector(
    ".drawer"
  );


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
   FINAL LAYERED HERO
========================================================= */

const layeredOrbit =
  document.getElementById(
    "layeredOrbit"
  );


const layeredWings =
  Array.from(
    document.querySelectorAll(
      ".layered-wing"
    )
  );


const layeredPrev =
  document.getElementById(
    "layeredPrev"
  );


const layeredNext =
  document.getElementById(
    "layeredNext"
  );


const layeredDots =
  document.getElementById(
    "layeredDots"
  );


const WING_COUNT =
  layeredWings.length;


let activeWing = 0;


let rotationTimer = null;


let isHovering = false;


let isTouching = false;


let touchStartX = 0;


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


  layeredDots.innerHTML = "";


  layeredWings.forEach(
    (wing, index) => {

      const dot =
        document.createElement(
          "button"
        );


      dot.type = "button";

      dot.className =
        "layered-dot";


      dot.setAttribute(
        "aria-label",
        `Select business ${
          index + 1
        }`
      );


      dot.addEventListener(
        "click",
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
   UPDATE POSITIONS
========================================================= */

function updatePositions(){

  layeredWings.forEach(
    (wing, index) => {

      wing.classList.remove(

        "is-active",

        "position-left",

        "position-right",

        "position-far-left",

        "position-far-right"

      );


      const relative =
        (
          index -
          activeWing +
          WING_COUNT
        ) %
        WING_COUNT;


      /*
        0 = centre
        1 = right
        2 = far right
        3 = far left
        4 = left
      */


      if (
        relative === 0
      ){

        wing.classList.add(
          "is-active"
        );

      }


      else if (
        relative === 1
      ){

        wing.classList.add(
          "position-right"
        );

      }


      else if (
        relative === 2
      ){

        wing.classList.add(
          "position-far-right"
        );

      }


      else if (
        relative === 3
      ){

        wing.classList.add(
          "position-far-left"
        );

      }


      else if (
        relative === 4
      ){

        wing.classList.add(
          "position-left"
        );

      }

    }
  );


  /*
    Update progress dots.
  */

  if (layeredDots){

    const dots =
      layeredDots.querySelectorAll(
        ".layered-dot"
      );


    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === activeWing
        );

      }
    );

  }

}


/* =========================================================
   SELECT WING
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


  updatePositions();

}


/* =========================================================
   NEXT
========================================================= */

function nextWing(){

  setWing(
    activeWing + 1
  );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousWing(){

  setWing(
    activeWing - 1
  );

}


/* =========================================================
   CONTROL BUTTONS
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
   CARD / VISUAL CLICK
========================================================= */

layeredWings.forEach(
  (wing, index) => {


    wing.addEventListener(
      "click",
      (event) => {

        /*
          Side item:
          first bring it to centre.
        */

        if (
          index !== activeWing
        ){

          event.preventDefault();

          setWing(index);

          restartRotation();

        }

        /*
          Active item:
          normal href works.
        */

      }
    );


    /*
      Hover pauses rotation.
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

function startRotation(){

  stopRotation();


  rotationTimer =
    setInterval(
      () => {

        if (
          !isHovering &&
          !isTouching
        ){

          nextWing();

        }

      },
      4500
    );

}


function stopRotation(){

  if (rotationTimer){

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
   TOUCH / MOBILE SWIPE
========================================================= */

layeredOrbit?.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event
        .changedTouches[0]
        .screenX;


    isTouching = true;

    stopRotation();

  },
  {
    passive:true
  }
);


layeredOrbit?.addEventListener(
  "touchend",
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


    isTouching = false;

    restartRotation();

  },
  {
    passive:true
  }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    const activeTag =
      document.activeElement?.tagName;


    /*
      Don't interfere with inputs.
    */

    if (

      activeTag === "INPUT" ||
      activeTag === "TEXTAREA" ||
      activeTag === "SELECT"

    ){

      return;

    }


    if (
      event.key === "ArrowRight"
    ){

      nextWing();

      restartRotation();

    }


    if (
      event.key === "ArrowLeft"
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

  createDots();

  setWing(0);

  startRotation();

}


/* =========================================================
   FORM DEMO
========================================================= */

document
  .querySelectorAll(
    ".requirement-form"
  )
  .forEach(
    (form) => {

      form.addEventListener(
        "submit",
        (event) => {

          event.preventDefault();


          const success =
            form.querySelector(
              ".success"
            );


          if (success){

            success.style.display =
              "block";

          }


          form.reset();

        }
      );

    }
  );
