```javascript
/* =========================================================
   MADHYAM WEBSITE — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER
========================================================= */

const header =
  document.querySelector(".site-header");


window.addEventListener("scroll", () => {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:0.1
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

}


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
   SEARCH
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
  document.querySelector("#searchInput");


const searchResults =
  document.querySelector("#searchResults");


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

      },100);

    }
  );

});


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

function renderSearch(query = ""){

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

    renderSearch(
      event.target.value
    );

  }
);


renderSearch();


/* =========================================================
   HERO WING INTERACTION
========================================================= */

const networkWings =
  document.querySelectorAll(
    ".network-wing"
  );


networkWings.forEach((wing) => {

  wing.addEventListener(
    "mouseenter",
    () => {

      networkWings.forEach((otherWing) => {

        if (otherWing !== wing) {

          otherWing.style.opacity = "0.45";

        }

      });

    }
  );


  wing.addEventListener(
    "mouseleave",
    () => {

      networkWings.forEach((otherWing) => {

        otherWing.style.opacity = "";

      });

    }
  );

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      mobileMenu?.classList.remove(
        "open"
      );


      drawer?.classList.remove(
        "open"
      );


      drawer?.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  }
);


/* =========================================================
   FORM DEMO
========================================================= */

document
  .querySelectorAll(".requirement-form")
  .forEach((form) => {

    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const success =
          form.querySelector(".success");


        if (success){

          success.style.display =
            "block";

        }


        form.reset();

      }
    );

  });
```
