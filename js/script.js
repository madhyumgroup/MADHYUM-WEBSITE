```javascript
/* =========================================================
   MADHYUM GROUP WEBSITE
   FINAL CLEAN JAVASCRIPT
   Frontend: GitHub Pages
   Backend: Google Apps Script + Google Sheets

   DO NOT CHANGE THE APPS SCRIPT URL BELOW.
========================================================= */

(function () {

  "use strict";

  /* =========================================================
     COMMON HELPERS
  ========================================================= */

  function qs(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  function qsa(selector, parent) {
    return Array.prototype.slice.call(
      (parent || document).querySelectorAll(selector)
    );
  }

  function addEvent(element, eventName, handler, options) {
    if (element) {
      element.addEventListener(eventName, handler, options || false);
    }
  }

  function safeText(value) {
    return String(value || "").trim();
  }

  function escapeHTML(value) {
    return String(value || "").replace(
      /[&<>'"]/g,
      function (character) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;"
        }[character];
      }
    );
  }


  /* =========================================================
     HEADER
  ========================================================= */

  var header = qs(".site-header");
  var lastScrollY = window.scrollY || 0;
  var scrollTicking = false;

  function handleScroll() {

    var currentY = window.scrollY || 0;

    if (header) {

      header.classList.toggle(
        "scrolled",
        currentY > 30
      );

      if (
        currentY > lastScrollY &&
        currentY > 90
      ) {
        header.classList.add("nav-hidden");
      }

      if (currentY < lastScrollY) {
        header.classList.remove("nav-hidden");
      }
    }

    lastScrollY = currentY;
    scrollTicking = false;
  }

  addEvent(
    window,
    "scroll",
    function () {

      if (!scrollTicking) {

        window.requestAnimationFrame(
          handleScroll
        );

        scrollTicking = true;
      }

    },
    { passive: true }
  );


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  var mobileMenu = qs(".mobile-menu");
  var menuButton = qs(".menu-btn");
  var closeMobileButtons =
    qsa("[data-close-mobile]");

  function closeMobileMenu() {

    if (mobileMenu) {

      mobileMenu.classList.remove("open");

      mobileMenu.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    if (menuButton) {

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    document.body.classList.remove(
      "menu-open"
    );
  }

  function openMobileMenu() {

    if (mobileMenu) {

      mobileMenu.classList.add("open");

      mobileMenu.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    if (menuButton) {

      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );
    }

    document.body.classList.add(
      "menu-open"
    );
  }

  addEvent(
    menuButton,
    "click",
    function () {

      if (
        mobileMenu &&
        mobileMenu.classList.contains("open")
      ) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }

    }
  );

  closeMobileButtons.forEach(
    function (button) {

      addEvent(
        button,
        "click",
        closeMobileMenu
      );

    }
  );

  addEvent(
    document,
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeMobileMenu();
      }

    }
  );


  /* =========================================================
     SEARCH DATA
  ========================================================= */

  function makeSearchTerms(
    terms,
    page,
    label
  ) {

    return terms
      .split("|")
      .map(function (term) {

        return [
          term,
          page,
          label
        ];

      });
  }

  var SEARCH_DATA = [

    ...makeSearchTerms(
      "real estate|property|properties|buy property|sell property|invest property|investment property|residential|commercial|plots|plot|land|new projects|projects|development|renovation|rent|rental|lease|apartment|apartments|flat|flats|duplex|villa|villas|bungalow|independent house|shop|office|showroom|property services|3 bhk|2 bhk|1 bhk|bhopal|kolar road|bawadiya kalan|hoshangabad road|jatkhedi|misrod|ayodhya bypass|awadhpuri|katara hills|salaiya|airport road|ratanpur|vidisha road|tintadi kheda|bhauri",
      "real-estate.html",
      "Real Estate"
    ),

    ...makeSearchTerms(
      "travel|holiday|holidays|tour|tours|domestic holidays|international holidays|family holiday|family package|honeymoon|couple|solo|adventure|hiking|trekking|backpacking|group travel|friends trip|religious travel|spiritual travel|hajj|umrah|karbala|char dham|badrinath|gangotri|yamunotri|corporate travel|business travel|custom travel|weekend getaway|beach escape|mountain getaway|heritage journey|maldives|bali|switzerland|mauritius|dubai|kashmir|thailand|goa|manali|kerala|rajasthan|singapore|nepal|bhutan|tibet|flight|flights|hotel|hotels|resort|resorts|villa stay|airport transfer|cab|chauffeur|cruise|sightseeing|visa assistance|travel insurance|itinerary",
      "travel.html",
      "Travel"
    ),

    ...makeSearchTerms(
      "education|admission|admissions|course|courses|study|college|university|institute|ug|undergraduate|pg|postgraduate|professional|mbbs|bds|bams|nursing|physiotherapy|btech|be|bca|mca|mtech|bba|bcom|mba|pgdm|mcom|pilot training|aviation management|cabin crew|airport management|llb|ba llb|llm|bba llb|fashion design|interior design|graphic design|ui ux|hotel management|hospitality|culinary arts|journalism|mass communication|digital media|advertising|bsc|msc|biotechnology|agriculture|barch|march|urban planning|pharmacy|paramedical|psychology|india education|study abroad|uk|germany|ireland|usa|canada|australia|new zealand|uae|russia|georgia|kazakhstan|kyrgyzstan|uzbekistan|delhi|noida|dehradun|jaipur|chandigarh|lucknow|mumbai|pune|ahmedabad|vadodara|surat|bengaluru|hyderabad|chennai|coimbatore|kochi|mangalore|bhubaneswar|ranchi|patna|indore|nagpur|raipur|kolkata",
      "education.html",
      "Education & Admissions"
    ),

    ...makeSearchTerms(
      "consultancy|business services|business support|business setup|business registration|proprietorship|partnership|llp|company registration|gst|gst registration|udyam|msme|itr|tax|profit and loss|balance sheet|financial statements|accounting|compliance|legal assistance|documentation|registry|agreements|business consultancy|business planning|project report|project reports|business proposal|financial projection|growth|expansion|business advisory|website development|business website|digital presence|job consultancy|career consultation|recruitment|placement",
      "consultancy.html",
      "Consultancy & Business Services"
    ),

    ...makeSearchTerms(
      "events|weddings|wedding|engagement|sagai|mehendi|haldi|sangeet|baraat|reception|vidai|ceremony|venue|banquet|resort|lawn|mandap|stage design|floral decor|theme decor|lighting|entrance decor|led wall|catering|live counters|food stations|desserts|beverages|guest hospitality|vip hospitality|photography|candid photography|videography|cinematic film|pre wedding|drone photography|album|dj|live band|singer|dhol|dance|choreography|anchor|emcee|artist booking|birthday|anniversary|party|get together|corporate event|conference|seminar|meeting|product launch|award function|concert|live show|cultural event|fog entry|cold spark|custom stage|luxury mandap|ramp walk|special effects",
      "events.html",
      "Events & Weddings"
    ),

    ...makeSearchTerms(
      "membership|member|member privileges|dining|dining privileges|preferred access|brokerage|travel offers|admission assistance|professional expertise|event vendors",
      "membership.html",
      "MADHYUM Membership"
    )

  ];


  /* =========================================================
     SEARCH DRAWER
  ========================================================= */

  var drawer = qs(".drawer");
  var searchInput = qs("#searchInput");
  var searchResults = qs("#searchResults");

  function openSearch() {

    if (drawer) {

      drawer.classList.add("open");

      drawer.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    window.setTimeout(
      function () {

        if (searchInput) {
          searchInput.focus();
        }

      },
      80
    );
  }

  function closeSearch() {

    if (drawer) {

      drawer.classList.remove("open");

      drawer.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  }

  qsa("[data-search]").forEach(
    function (button) {

      addEvent(
        button,
        "click",
        openSearch
      );

    }
  );

  qsa("[data-close-search]").forEach(
    function (button) {

      addEvent(
        button,
        "click",
        closeSearch
      );

    }
  );

  addEvent(
    drawer,
    "click",
    function (event) {

      if (
        event.target === drawer
      ) {
        closeSearch();
      }

    }
  );

  function renderSearch(
    query
  ) {

    if (!searchResults) {
      return;
    }

    var raw = safeText(
      query
    ).toLowerCase();

    if (!raw) {

      searchResults.innerHTML =
        '<div class="result">' +
        "<strong>Start typing a requirement</strong>" +
        "<small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small>" +
        "</div>";

      return;
    }

    var tokens = raw
      .split(/\s+/)
      .filter(Boolean);

    var matches = [];

    SEARCH_DATA.forEach(
      function (entry) {

        var termText =
          String(entry[0]).toLowerCase();

        var hitCount = 0;

        tokens.forEach(
          function (token) {

            if (
              termText.indexOf(token) !== -1
            ) {
              hitCount++;
            }

          }
        );

        if (
          hitCount === tokens.length ||
          (
            tokens.length === 1 &&
            hitCount > 0
          )
        ) {

          matches.push([
            entry[0],
            entry[1],
            entry[2],
            hitCount
          ]);

        }

      }
    );

    matches.sort(
      function (a, b) {

        if (b[3] !== a[3]) {
          return b[3] - a[3];
        }

        return a[0].length - b[0].length;
      }
    );

    matches =
      matches.slice(0, 40);

    if (!matches.length) {

      searchResults.innerHTML =
        '<div class="result">' +
        "<strong>No matching keyword found</strong>" +
        "<small>Try a broader requirement or service name.</small>" +
        "</div>";

      return;
    }

    var grouped = {};

    matches.forEach(
      function (match) {

        var page = match[1];

        if (!grouped[page]) {

          grouped[page] = {
            label: match[2],
            terms: []
          };
        }

        grouped[page].terms.push(
          match[0]
        );

      }
    );

    var html = "";

    Object.keys(grouped).forEach(
      function (page) {

        var group = grouped[page];

        html +=
          '<a class="result" href="' +
          escapeHTML(page) +
          '">' +
          "<strong>" +
          escapeHTML(group.label) +
          "</strong>" +
          "<small>" +
          escapeHTML(
            group.terms
              .slice(0, 8)
              .join(" - ")
          ) +
          "</small>" +
          "</a>";

      }
    );

    searchResults.innerHTML = html;
  }

  addEvent(
    searchInput,
    "input",
    function (event) {

      renderSearch(
        event.target.value
      );

    }
  );

  renderSearch("");


  /* =========================================================
     PHOTO SLOTS
  ========================================================= */

  qsa(
    ".section-photo-slot[data-photo]," +
    ".package-photo[data-photo]," +
    ".location-card-photo[data-photo]," +
    ".category-card-photo[data-photo]"
  ).forEach(
    function (slot) {

      var file =
        slot.getAttribute(
          "data-photo"
        );

      if (!file) {
        return;
      }

      var image =
        new Image();

      image.onload =
        function () {

          slot.classList.add(
            "has-photo"
          );

          slot.style.backgroundImage =
            'url("images/' +
            file +
            '")';
        };

      image.onerror =
        function () {

          slot.classList.add(
            "photo-pending"
          );
        };

      image.src =
        "images/" + file;
    }
  );


  /* =========================================================
     HERO IMAGE FALLBACK
  ========================================================= */

  var heroImage =
    qs(".layered-hero-image");

  addEvent(
    heroImage,
    "error",
    function () {

      if (
        heroImage &&
        !heroImage.getAttribute(
          "data-fallback"
        )
      ) {

        heroImage.setAttribute(
          "data-fallback",
          "1"
        );

        heroImage.src =
          "images/hero-madhyam.jpg";
      }

    }
  );


  /* =========================================================
     WING IMAGE FALLBACK
  ========================================================= */

  qsa(
    ".layered-wing img"
  ).forEach(
    function (image) {

      addEvent(
        image,
        "error",
        function () {

          var source =
            image.getAttribute(
              "src"
            );

          if (!source) {
            return;
          }

          var parts =
            source.split("/");

          var file =
            parts[parts.length - 1];

          if (
            file &&
            !image.getAttribute(
              "data-fallback"
            )
          ) {

            image.setAttribute(
              "data-fallback",
              "1"
            );

            image.src =
              "https://raw.githubusercontent.com/madhyumgroup/MADHYUM-WEBSITE/main/" +
              file;
          }

        }
      );

    }
  );


  /* =========================================================
     SOLUTION PANEL PHOTOS
  ========================================================= */

  qsa(
    ".solution-panel[data-photo]"
  ).forEach(
    function (panel) {

      var file =
        panel.getAttribute(
          "data-photo"
        );

      if (file) {

        panel.style.setProperty(
          "--solution-photo",
          'url("images/' +
          file +
          '")'
        );
      }

    }
  );


  /* =========================================================
     SMOOTH INTERNAL LINKS
  ========================================================= */

  qsa(
    'a[href^="#"]'
  ).forEach(
    function (link) {

      addEvent(
        link,
        "click",
        function (event) {

          var id =
            link.getAttribute(
              "href"
            );

          if (
            !id ||
            id === "#"
          ) {
            return;
          }

          var target =
            qs(id);

          if (!target) {
            return;
          }

          event.preventDefault();

          closeMobileMenu();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  var revealElements =
    qsa(".reveal");

  if (
    "IntersectionObserver" in window
  ) {

    var revealObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );
              }

            }
          );

        },
        {
          threshold: 0.08
        }
      );

    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "visible"
        );

      }
    );
  }


  /* =========================================================
     HERO WING SLIDER
  ========================================================= */

  var wings =
    qsa(".layered-wing");

  var previousButton =
    qs("#layeredPrev");

  var nextButton =
    qs("#layeredNext");

  var dotsContainer =
    qs("#layeredDots");

  var activeWing = 0;
  var rotationTimer = null;
  var rotationPaused = false;

  if (wings.length) {

    var positionClasses = [
      "is-active",
      "position-right",
      "position-far-right",
      "position-far-left",
      "position-left"
    ];


    /* ---------------------------------------------------------
       DOTS
    --------------------------------------------------------- */

    if (dotsContainer) {

      dotsContainer.innerHTML = "";

      wings.forEach(
        function (wing, index) {

          var dot =
            document.createElement(
              "button"
            );

          dot.type = "button";

          dot.className =
            "layered-dot";

          dot.setAttribute(
            "aria-label",
            "Show " +
            (
              wing.getAttribute(
                "aria-label"
              ) ||
              "business"
            )
          );

          addEvent(
            dot,
            "click",
            function () {

              activeWing = index;

              updateWingSlider();

              restartWingRotation();

            }
          );

          dotsContainer.appendChild(
            dot
          );

        }
      );
    }


    /* ---------------------------------------------------------
       UPDATE SLIDER
    --------------------------------------------------------- */

    function updateWingSlider() {

      wings.forEach(
        function (wing, index) {

          positionClasses.forEach(
            function (className) {

              wing.classList.remove(
                className
              );

            }
          );

          var relative =
            (
              index -
              activeWing +
              wings.length
            ) %
            wings.length;

          var positionClass =
            positionClasses[
              relative
            ];

          if (positionClass) {

            wing.classList.add(
              positionClass
            );
          }

          wing.setAttribute(
            "aria-current",
            relative === 0
              ? "true"
              : "false"
          );

        }
      );

      if (dotsContainer) {

        qsa(
          ".layered-dot",
          dotsContainer
        ).forEach(
          function (dot, index) {

            dot.classList.toggle(
              "active",
              index === activeWing
            );

          }
        );
      }
    }


    /* ---------------------------------------------------------
       NEXT
    --------------------------------------------------------- */

    function goToNextWing() {

      activeWing =
        (
          activeWing + 1
        ) %
        wings.length;

      updateWingSlider();
    }


    /* ---------------------------------------------------------
       PREVIOUS
    --------------------------------------------------------- */

    function goToPreviousWing() {

      activeWing =
        (
          activeWing -
          1 +
          wings.length
        ) %
        wings.length;

      updateWingSlider();
    }


    /* ---------------------------------------------------------
       TIMER
    --------------------------------------------------------- */

    function stopWingRotation() {

      if (rotationTimer) {

        clearInterval(
          rotationTimer
        );

        rotationTimer = null;
      }
    }

    function startWingRotation() {

      stopWingRotation();

      if (rotationPaused) {
        return;
      }

      rotationTimer =
        setInterval(
          function () {

            if (!rotationPaused) {
              goToNextWing();
            }

          },
          5200
        );
    }

    function restartWingRotation() {

      startWingRotation();
    }


    /* ---------------------------------------------------------
       ARROWS
    --------------------------------------------------------- */

    addEvent(
      nextButton,
      "click",
      function () {

        goToNextWing();

        restartWingRotation();

      }
    );

    addEvent(
      previousButton,
      "click",
      function () {

        goToPreviousWing();

        restartWingRotation();

      }
    );


    /* ---------------------------------------------------------
       MOUSE PAUSE
    --------------------------------------------------------- */

    var hero =
      qs(".layered-hero");

    addEvent(
      hero,
      "mouseenter",
      function () {

        rotationPaused = true;

        stopWingRotation();

      }
    );

    addEvent(
      hero,
      "mouseleave",
      function () {

        rotationPaused = false;

        startWingRotation();

      }
    );


    /* ---------------------------------------------------------
       TOUCH SWIPE
    --------------------------------------------------------- */

    var touchStartX = 0;

    addEvent(
      hero,
      "touchstart",
      function (event) {

        if (
          event.changedTouches &&
          event.changedTouches.length
        ) {

          touchStartX =
            event.changedTouches[0]
              .clientX;
        }

      },
      { passive: true }
    );

    addEvent(
      hero,
      "touchend",
      function (event) {

        if (
          !event.changedTouches ||
          !event.changedTouches.length
        ) {
          return;
        }

        var touchEndX =
          event.changedTouches[0]
            .clientX;

        var difference =
          touchEndX -
          touchStartX;

        if (
          Math.abs(difference) > 35
        ) {

          if (difference < 0) {
            goToNextWing();
          } else {
            goToPreviousWing();
          }

          restartWingRotation();
        }

      },
      { passive: true }
    );


    /* ---------------------------------------------------------
       INITIAL STATE
    --------------------------------------------------------- */

    updateWingSlider();

    startWingRotation();
  }


  /* =========================================================
     DETAILS ACCESSIBILITY
  ========================================================= */

  qsa(
    ".service-more summary"
  ).forEach(
    function (summary) {

      summary.setAttribute(
        "role",
        "button"
      );

    }
  );


  /* =========================================================
     TITLE HINTS
  ========================================================= */

  qsa(
    ".btn," +
    ".smalllink," +
    ".solution-link," +
    ".service-more summary," +
    ".contact-pill," +
    ".menu-btn," +
    ".iconbtn," +
    ".layered-control," +
    ".layered-dot"
  ).forEach(
    function (element) {

      if (
        element.hasAttribute(
          "title"
        )
      ) {
        return;
      }

      var label =
        element.getAttribute(
          "aria-label"
        ) ||
        safeText(
          element.textContent
        ).replace(
          /\s+/g,
          " "
        );

      if (label) {

        element.setAttribute(
          "title",
          label
        );
      }

    }
  );


  /* =========================================================
     MADHYUM APPS SCRIPT BACKEND
  ========================================================= */

  var MADHYUM_INQUIRY_API_URL =
    window.MADHYUM_INQUIRY_API_URL ||
    "https://script.google.com/macros/s/AKfycbzRgbrdHLtZO6MB-WjazHCqHfQtVEeANQHrCet1Ag/exec";


  /* =========================================================
     LIVE HOMEPAGE STATISTICS
  ========================================================= */

  if (
    document.body &&
    document.body.classList.contains(
      "home-page"
    )
  ) {

    var statsValues = {

      visitors:
        qs(
          '[data-stat-value="visitors"]'
        ),

      inquiries:
        qs(
          '[data-stat-value="inquiries"]'
        )

    };

    var statsStatus =
      qs(
        "[data-stats-status]"
      );


    /* ---------------------------------------------------------
       VISITOR ID
    --------------------------------------------------------- */

    function getVisitorId() {

      var key =
        "madhyum_visitor_id_v1";

      try {

        var stored =
          localStorage.getItem(
            key
          );

        if (stored) {
          return stored;
        }

        var generated =
          "v_" +
          Date.now().toString(36) +
          "_" +
          Math.random()
            .toString(36)
            .substring(2);

        localStorage.setItem(
          key,
          generated
        );

        return generated;

      } catch (error) {

        return (
          "session_" +
          Date.now().toString(36) +
          "_" +
          Math.random()
            .toString(36)
            .substring(2)
        );
      }
    }


    /* ---------------------------------------------------------
       STAT ANIMATION
    --------------------------------------------------------- */

    function animateStat(
      element,
      value
    ) {

      if (
        !element ||
        !isFinite(value)
      ) {
        return;
      }

      var end =
        Math.max(
          0,
          Math.round(
            Number(value)
          )
        );

      var duration = 1100;

      var startTime =
        performance.now();

      element.classList.remove(
        "is-loading"
      );

      function animate(
        currentTime
      ) {

        var progress =
          Math.min(
            1,
            (
              currentTime -
              startTime
            ) /
            duration
          );

        var eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );

        var currentValue =
          Math.round(
            end * eased
          );

        element.textContent =
          currentValue.toLocaleString(
            "en-IN"
          ) + "+";

        if (
          progress < 1
        ) {

          requestAnimationFrame(
            animate
          );
        }
      }

      requestAnimationFrame(
        animate
      );
    }


    /* ---------------------------------------------------------
       LOAD LIVE STATS
    --------------------------------------------------------- */

    function loadLiveStats() {

      if (
        !statsValues.visitors &&
        !statsValues.inquiries
      ) {
        return;
      }

      if (!MADHYUM_INQUIRY_API_URL) {

        if (statsStatus) {

          statsStatus.textContent =
            "Live statistics are temporarily unavailable.";
        }

        return;
      }


      Object.keys(
        statsValues
      ).forEach(
        function (key) {

          if (
            statsValues[key]
          ) {

            statsValues[key]
              .classList.add(
                "is-loading"
              );
          }

        }
      );


      var callbackName =
        "madhyumStatsCallback_" +
        Date.now();

      var script =
        document.createElement(
          "script"
        );

      var finished = false;

      var timeoutId = null;


      function cleanup() {

        if (timeoutId) {

          clearTimeout(
            timeoutId
          );

          timeoutId = null;
        }

        if (script) {

          script.remove();
        }

        try {

          delete window[
            callbackName
          ];

        } catch (error) {

          window[
            callbackName
          ] = undefined;
        }
      }


      function showStatsError() {

        Object.keys(
          statsValues
        ).forEach(
          function (key) {

            var element =
              statsValues[key];

            if (element) {

              element.classList.remove(
                "is-loading"
              );

              element.textContent =
                "-";
            }

          }
        );

        if (statsStatus) {

          statsStatus.textContent =
            "Live statistics are temporarily unavailable.";
        }
      }


      function fail() {

        if (finished) {
          return;
        }

        finished = true;

        cleanup();

        showStatsError();
      }


      window[
        callbackName
      ] = function (data) {

        if (finished) {
          return;
        }

        finished = true;

        try {

          if (
            !data ||
            data.success !== true
          ) {

            throw new Error(
              "Invalid statistics response."
            );
          }

          var visitors =
            Number(
              data.visitors
            );

          var inquiries =
            Number(
              data.inquiries
            );

          if (
            !isFinite(visitors) ||
            !isFinite(inquiries)
          ) {

            throw new Error(
              "Invalid statistics values."
            );
          }

          animateStat(
            statsValues.visitors,
            visitors
          );

          animateStat(
            statsValues.inquiries,
            inquiries
          );

          if (statsStatus) {

            statsStatus.textContent =
              "Live figures from the MADHYUM network.";
          }

          cleanup();

        } catch (error) {

          cleanup();

          showStatsError();
        }
      };


      addEvent(
        script,
        "error",
        fail
      );


      var requestURL =
        new URL(
          MADHYUM_INQUIRY_API_URL,
          window.location.href
        );

      requestURL.searchParams.set(
        "action",
        "stats"
      );

      requestURL.searchParams.set(
        "visitorId",
        getVisitorId()
      );

      requestURL.searchParams.set(
        "callback",
        callbackName
      );

      requestURL.searchParams.set(
        "_",
        String(
          Date.now()
        )
      );


      script.async = true;

      script.src =
        requestURL.toString();


      timeoutId =
        setTimeout(
          fail,
          15000
        );


      (
        document.head ||
        document.documentElement
      ).appendChild(
        script
      );
    }

    loadLiveStats();
  }


  /* =========================================================
     INQUIRY SYSTEM
  ========================================================= */

  var pageWing = {

    "real-estate.html":
      "Real Estate",

    "travel.html":
      "Travel",

    "education.html":
      "Education & Admissions",

    "consultancy.html":
      "Consultancy & Business Services",

    "events.html":
      "Events & Weddings",

    "contact.html":
      "General / Other"
  };


  function getFieldValue(
    form,
    name
  ) {

    if (
      !form ||
      !form.elements
    ) {
      return "";
    }

    var field =
      form.elements[name];

    if (!field) {
      return "";
    }

    return safeText(
      field.value
    );
  }


  /* ---------------------------------------------------------
     BUILD INQUIRY PAYLOAD
  --------------------------------------------------------- */

  function buildInquiryPayload(
    form
  ) {

    var path =
      window.location.pathname;

    var pathParts =
      path.split("/");

    var page =
      (
        pathParts[
          pathParts.length - 1
        ] ||
        "index.html"
      ).toLowerCase();


    var details = [];

    var formElements =
      Array.prototype.slice.call(
        form.elements
      );


    formElements.forEach(
      function (element) {

        if (
          !element.name ||
          element.disabled ||
          element.type === "submit" ||
          element.type === "button"
        ) {
          return;
        }

        var value =
          safeText(
            element.value
          );

        if (!value) {
          return;
        }

        if (
          element.name === "name" ||
          element.name === "phone" ||
          element.name === "mobile" ||
          element.name === "email" ||
          element.name === "requirement" ||
          element.name === "category"
        ) {
          return;
        }

        var label =
          element.name;

        var closestLabel =
          element.closest(
            "label"
          );

        if (
          closestLabel
        ) {

          var firstText =
            closestLabel
              .childNodes[0];

          if (
            firstText &&
            firstText.textContent
          ) {

            label =
              safeText(
                firstText.textContent
              );
          }
        }

        details.push(
          label +
          ": " +
          value
        );

      }
    );


    var requirement =
      pageWing[page] ||
      safeText(
        form.getAttribute(
          "data-form-name"
        )
      ) ||
      "General / Other";


    if (
      page === "contact.html"
    ) {

      var category =
        getFieldValue(
          form,
          "category"
        );

      if (category) {
        requirement =
          category;
      }
    }


    var freeRequirement =
      getFieldValue(
        form,
        "requirement"
      );

    if (freeRequirement) {

      details.push(
        "Requirement Details: " +
        freeRequirement
      );
    }


    return {

      name:
        getFieldValue(
          form,
          "name"
        ),

      mobile:
        getFieldValue(
          form,
          "phone"
        ) ||
        getFieldValue(
          form,
          "mobile"
        ),

      email:
        getFieldValue(
          form,
          "email"
        ),

      requirement:
        requirement,

      details:
        details.join("\n"),

      source:
        page
    };
  }


  /* ---------------------------------------------------------
     CORS-SAFE SUBMISSION
  --------------------------------------------------------- */

  function submitInquiry(
    payload
  ) {

    /* -------------------------------------------------------
       METHOD 1: SEND BEACON
    ------------------------------------------------------- */

    try {

      if (
        navigator.sendBeacon
      ) {

        var blob =
          new Blob(
            [
              JSON.stringify(
                payload
              )
            ],
            {
              type:
                "text/plain;charset=UTF-8"
            }
          );

        var sent =
          navigator.sendBeacon(
            MADHYUM_INQUIRY_API_URL,
            blob
          );

        if (sent) {
          return true;
        }
      }

    } catch (error) {
      /* Continue to fallback. */
    }


    /* -------------------------------------------------------
       METHOD 2: HIDDEN HTML FORM
    ------------------------------------------------------- */

    try {

      var frame =
        document.createElement(
          "iframe"
        );

      var frameName =
        "madhyumInquiryFrame_" +
        Date.now();

      frame.name =
        frameName;

      frame.setAttribute(
        "aria-hidden",
        "true"
      );

      frame.style.position =
        "fixed";

      frame.style.width =
        "1px";

      frame.style.height =
        "1px";

      frame.style.opacity =
        "0";

      frame.style.pointerEvents =
        "none";

      frame.style.border =
        "0";


      var form =
        document.createElement(
          "form"
        );

      form.method =
        "POST";

      form.action =
        MADHYUM_INQUIRY_API_URL;

      form.target =
        frameName;

      form.style.display =
        "none";


      Object.keys(
        payload
      ).forEach(
        function (key) {

          var input =
            document.createElement(
              "input"
            );

          input.type =
            "hidden";

          input.name =
            key;

          input.value =
            String(
              payload[key] || ""
            );

          form.appendChild(
            input
          );

        }
      );


      document.body.appendChild(
        frame
      );

      document.body.appendChild(
        form
      );

      form.submit();


      setTimeout(
        function () {

          frame.remove();

          form.remove();

        },
        10000
      );


      return true;

    } catch (error) {

      return false;
    }
  }


  /* =========================================================
     CONNECT ALL INQUIRY FORMS
  ========================================================= */

  qsa(
    "[data-form-name]"
  ).forEach(
    function (form) {

      addEvent(
        form,
        "submit",
        function (event) {

          event.preventDefault();


          var successMessage =
            qs(
              ".form-success",
              form
            );

          var submitButton =
            qs(
              'button[type="submit"]',
              form
            );


          var payload =
            buildInquiryPayload(
              form
            );


          /* -------------------------------------------------
             REQUIRED FIELDS
          ------------------------------------------------- */

          if (
            !payload.name ||
            !payload.mobile ||
            !payload.requirement
          ) {

            if (
              successMessage
            ) {

              successMessage.textContent =
                "Please complete the required fields before sending your request.";
            }

            return;
          }


          /* -------------------------------------------------
             BACKEND CHECK
          ------------------------------------------------- */

          if (
            !MADHYUM_INQUIRY_API_URL
          ) {

            if (
              successMessage
            ) {

              successMessage.textContent =
                "The inquiry connection is not configured yet.";
            }

            return;
          }


          /* -------------------------------------------------
             BUTTON STATE
          ------------------------------------------------- */

          var originalButtonText =
            submitButton
              ? submitButton.textContent
              : "";


          if (
            submitButton
          ) {

            submitButton.disabled =
              true;

            submitButton.textContent =
              "Sending...";
          }


          if (
            successMessage
          ) {

            successMessage.textContent =
              "";
          }


          /* -------------------------------------------------
             SEND
          ------------------------------------------------- */

          var submitted =
            submitInquiry(
              payload
            );


          if (submitted) {

            if (
              successMessage
            ) {

              successMessage.textContent =
                "Thank you. Your request has been submitted. We will contact you soon.";
            }

            form.reset();

          } else {

            if (
              successMessage
            ) {

              successMessage.textContent =
                "We could not send your request right now. Please try again in a moment.";
            }
          }


          /* -------------------------------------------------
             RESTORE BUTTON
          ------------------------------------------------- */

          if (
            submitButton
          ) {

            setTimeout(
              function () {

                submitButton.disabled =
                  false;

                submitButton.textContent =
                  originalButtonText ||
                  "Send Your Request";

              },
              400
            );
          }

        }
      );

    }
  );


  /* =========================================================
     FINAL SAFETY
     Prevent JS failure from leaving the page locked.
  ========================================================= */

  window.MADHYUM_JS_READY =
    true;

})();
```
