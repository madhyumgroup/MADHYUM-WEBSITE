/* =========================================================
MADHYUM WEBSITE — FINAL V36 JAVASCRIPT
======================================

Purpose:

* Preserve existing website interactions
* Connect live homepage statistics
* Connect inquiry forms
* Use the confirmed MADHYUM Apps Script /exec backend
  ========================================================= */

(function () {
'use strict';

/* =======================================================
1. MADHYUM BACKEND
======================================================= */

const MADHYUM_API_URL =
'https://script.google.com/macros/s/AKfycbzRgbrdHLtZO6MB-WjazHCqHfQtVEeANQHrCet1Ag/exec';

/* =======================================================
2. HEADER / SCROLL BEHAVIOUR
======================================================= */

const header = document.querySelector('.site-header');

let lastY = window.scrollY;
let ticking = false;

function onScroll() {
const y = window.scrollY;

```
if (header) {
  header.classList.toggle('scrolled', y > 30);

  if (y > lastY && y > 90) {
    header.classList.add('nav-hidden');
  } else if (y < lastY) {
    header.classList.remove('nav-hidden');
  }
}

lastY = y;
ticking = false;
```

}

window.addEventListener(
'scroll',
function () {
if (!ticking) {
window.requestAnimationFrame(onScroll);
ticking = true;
}
},
{ passive: true }
);

/* =======================================================
3. MOBILE MENU
======================================================= */

const mobileMenu = document.querySelector('.mobile-menu');
const menuButton = document.querySelector('.menu-btn');
const closeButtons =
document.querySelectorAll('[data-close-mobile]');

function closeMenu() {
if (mobileMenu) {
mobileMenu.classList.remove('open');
mobileMenu.setAttribute('aria-hidden', 'true');
}

```
if (menuButton) {
  menuButton.setAttribute('aria-expanded', 'false');
}

document.body.classList.remove('menu-open');
```

}

function openMenu() {
if (mobileMenu) {
mobileMenu.classList.add('open');
mobileMenu.setAttribute('aria-hidden', 'false');
}

```
if (menuButton) {
  menuButton.setAttribute('aria-expanded', 'true');
}

document.body.classList.add('menu-open');
```

}

if (menuButton) {
menuButton.addEventListener('click', function () {
if (
mobileMenu &&
mobileMenu.classList.contains('open')
) {
closeMenu();
} else {
openMenu();
}
});
}

closeButtons.forEach(function (button) {
button.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', function (event) {
if (event.key === 'Escape') {
closeMenu();
}
});

/* =======================================================
4. WEBSITE SEARCH
======================================================= */

function S(terms, page, label) {
return terms
.split('|')
.map(function (term) {
return [term, page, label];
});
}

const SEARCH_DATA = [

```
...S(
  'real estate|property|properties|buy property|sell property|invest property|investment property|residential|commercial|plots|plot|land|new projects|projects|development|renovation|rent|rental|lease|apartment|apartments|flat|flats|duplex|villa|villas|bungalow|independent house|shop|office|showroom|property services|3 bhk|2 bhk|1 bhk|bhopal|kolar road|bawadiya kalan|hoshangabad road|jatkhedi|misrod|ayodhya bypass|awadhpuri|katara hills|salaiya|airport road|ratanpur|vidisha road|tintadi kheda|bhauri',
  'real-estate.html',
  'Real Estate'
),

...S(
  'travel|holiday|holidays|tour|tours|domestic holidays|international holidays|family holiday|family package|honeymoon|couple|solo|adventure|hiking|trekking|backpacking|group travel|friends trip|religious travel|spiritual travel|hajj|umrah|karbala|char dham|badrinath|gangotri|yamunotri|corporate travel|business travel|custom travel|weekend getaway|beach escape|mountain getaway|heritage journey|maldives|bali|switzerland|mauritius|dubai|kashmir|thailand|goa|manali|kerala|rajasthan|singapore|nepal|bhutan|tibet|flight|flights|hotel|hotels|resort|resorts|villa stay|airport transfer|cab|chauffeur|cruise|sightseeing|visa assistance|travel insurance|itinerary',
  'travel.html',
  'Travel'
),

...S(
  'education|admission|admissions|course|courses|study|college|university|institute|ug|undergraduate|pg|postgraduate|professional|mbbs|bds|bams|nursing|physiotherapy|btech|be|bca|mca|mtech|bba|bcom|mba|pgdm|mcom|pilot training|aviation management|cabin crew|airport management|llb|ba llb|llm|bba llb|fashion design|interior design|graphic design|ui ux|hotel management|hospitality|culinary arts|journalism|mass communication|digital media|advertising|bsc|msc|biotechnology|agriculture|barch|march|urban planning|pharmacy|paramedical|psychology|india education|study abroad|uk|germany|ireland|usa|canada|australia|new zealand|uae|russia|georgia|kazakhstan|kyrgyzstan|uzbekistan|delhi|noida|dehradun|jaipur|chandigarh|lucknow|mumbai|pune|ahmedabad|vadodara|surat|bengaluru|hyderabad|chennai|coimbatore|kochi|mangalore|bhubaneswar|ranchi|patna|indore|nagpur|raipur|kolkata',
  'education.html',
  'Education & Admissions'
),

...S(
  'consultancy|business services|business support|business setup|business registration|proprietorship|partnership|llp|company registration|gst|gst registration|udyam|msme|itr|tax|profit and loss|balance sheet|financial statements|accounting|compliance|legal assistance|documentation|registry|agreements|business consultancy|business planning|project report|project reports|business proposal|financial projection|growth|expansion|business advisory|website development|business website|digital presence|job consultancy|career consultation|recruitment|placement',
  'consultancy.html',
  'Consultancy & Business Services'
),

...S(
  'events|weddings|wedding|engagement|sagai|mehendi|haldi|sangeet|baraat|reception|vidai|ceremony|venue|banquet|resort|lawn|mandap|stage design|floral decor|theme decor|lighting|entrance decor|led wall|catering|live counters|food stations|desserts|beverages|guest hospitality|vip hospitality|photography|candid photography|videography|cinematic film|pre wedding|drone photography|album|dj|live band|singer|dhol|dance|choreography|anchor|emcee|artist booking|birthday|anniversary|party|get together|corporate event|conference|seminar|meeting|product launch|award function|concert|live show|cultural event|fog entry|cold spark|custom stage|luxury mandap|ramp walk|special effects',
  'events.html',
  'Events & Weddings'
),

...S(
  'membership|member|member privileges|dining|dining privileges|preferred access|brokerage|travel offers|admission assistance|professional expertise|event vendors',
  'membership.html',
  'MADHYUM Membership'
)
```

];

const drawer = document.querySelector('.drawer');
const searchInput = document.querySelector('#searchInput');
const searchResults =
document.querySelector('#searchResults');

function openSearch() {
if (drawer) {
drawer.classList.add('open');
drawer.setAttribute('aria-hidden', 'false');
}

```
setTimeout(function () {
  if (searchInput) {
    searchInput.focus();
  }
}, 80);
```

}

function closeSearch() {
if (drawer) {
drawer.classList.remove('open');
drawer.setAttribute('aria-hidden', 'true');
}
}

document
.querySelectorAll('[data-search]')
.forEach(function (button) {
button.addEventListener('click', openSearch);
});

document
.querySelectorAll('[data-close-search]')
.forEach(function (button) {
button.addEventListener('click', closeSearch);
});

if (drawer) {
drawer.addEventListener('click', function (event) {
if (event.target === drawer) {
closeSearch();
}
});
}

function escapeHTML(value) {
return String(value).replace(
/[&<>'"]/g,
function (character) {
return {
'&': '&',
'<': '<',
'>': '>',
"'": ''',
'"': '"'
}[character];
}
);
}

function renderSearch(query) {

```
if (!searchResults) {
  return;
}

const raw =
  String(query || '').trim().toLowerCase();

if (!raw) {

  searchResults.innerHTML =
    '<div class="result">' +
    '<strong>Start typing a requirement</strong>' +
    '<small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small>' +
    '</div>';

  return;
}

const tokens =
  raw.split(/\s+/).filter(Boolean);

const seen = new Set();

const matches =
  SEARCH_DATA
    .map(function (item) {

      const termText = item[0];
      const page = item[1];
      const label = item[2];

      const haystack =
        termText.toLowerCase();

      const hits =
        tokens.filter(function (token) {
          return haystack.includes(token);
        }).length;

      return [
        termText,
        page,
        label,
        hits
      ];
    })
    .filter(function (item) {

      const hits = item[3];

      return (
        hits === tokens.length ||
        (tokens.length === 1 && hits > 0)
      );

    })
    .sort(function (a, b) {

      return (
        b[3] - a[3] ||
        a[0].length - b[0].length
      );

    })
    .filter(function (item) {

      const key =
        item[1] + '|' + item[0];

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;

    })
    .slice(0, 40);


if (!matches.length) {

  searchResults.innerHTML =
    '<div class="result">' +
    '<strong>No matching keyword found</strong>' +
    '<small>Try a broader requirement or service name.</small>' +
    '</div>';

  return;
}


const pages = {};

matches.forEach(function (item) {

  const term = item[0];
  const page = item[1];
  const label = item[2];

  if (!pages[page]) {
    pages[page] = {
      label: label,
      terms: []
    };
  }

  pages[page].terms.push(term);

});


searchResults.innerHTML =
  Object.entries(pages)
    .map(function (entry) {

      const page = entry[0];
      const value = entry[1];

      return (
        '<a class="result" href="' +
        escapeHTML(page) +
        '">' +
        '<strong>' +
        escapeHTML(value.label) +
        '</strong>' +
        '<small>' +
        escapeHTML(
          value.terms.slice(0, 8).join(' • ')
        ) +
        '</small>' +
        '</a>'
      );

    })
    .join('');
```

}

if (searchInput) {
searchInput.addEventListener(
'input',
function (event) {
renderSearch(event.target.value);
}
);
}

renderSearch('');

/* =======================================================
5. PHOTO SLOTS
======================================================= */

document
.querySelectorAll(
'.section-photo-slot[data-photo], ' +
'.package-photo[data-photo], ' +
'.location-card-photo[data-photo], ' +
'.category-card-photo[data-photo]'
)
.forEach(function (slot) {

```
  const file =
    slot.getAttribute('data-photo');

  if (!file) {
    return;
  }

  const image = new Image();

  image.onload = function () {
    slot.classList.add('has-photo');
    slot.style.backgroundImage =
      'url("images/' + file + '")';
  };

  image.onerror = function () {
    slot.classList.add('photo-pending');
  };

  image.src = 'images/' + file;

});
```

/* =======================================================
6. HOME HERO IMAGE FALLBACK
======================================================= */

const heroImage =
document.querySelector('.layered-hero-image');

if (heroImage) {

```
heroImage.addEventListener(
  'error',
  function () {

    if (!heroImage.dataset.fallback) {

      heroImage.dataset.fallback = '1';

      heroImage.src =
        'images/hero-madhyam.jpg';

    }

  }
);
```

}

/* =======================================================
7. ROTATING WING IMAGE FALLBACK
======================================================= */

document
.querySelectorAll('.layered-wing img')
.forEach(function (image) {

```
  image.addEventListener(
    'error',
    function () {

      const source =
        image.getAttribute('src');

      const file =
        source
          ? source.split('/').pop()
          : '';

      if (
        file &&
        !image.dataset.fallback
      ) {

        image.dataset.fallback = '1';

        image.src =
          'https://raw.githubusercontent.com/madhyumgroup/MADHYUM-WEBSITE/main/' +
          file;

      }

    }
  );

});
```

/* =======================================================
8. SOLUTION PANEL PHOTOS
======================================================= */

document
.querySelectorAll(
'.solution-panel[data-photo]'
)
.forEach(function (panel) {

```
  const file =
    panel.getAttribute('data-photo');

  if (file) {

    panel.style.setProperty(
      '--solution-photo',
      'url("images/' + file + '")'
    );

  }

});
```

/* =======================================================
9. SMOOTH INTERNAL LINKS
======================================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(function (link) {

```
  link.addEventListener(
    'click',
    function (event) {

      const id =
        link.getAttribute('href');

      if (!id || id === '#') {
        return;
      }

      const element =
        document.querySelector(id);

      if (!element) {
        return;
      }

      event.preventDefault();

      closeMenu();

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }
  );

});
```

/* =======================================================
10. REVEAL ANIMATIONS
======================================================= */

const revealElements =
document.querySelectorAll('.reveal');

if (
'IntersectionObserver' in window
) {

```
const observer =
  new IntersectionObserver(
    function (entries) {

      entries.forEach(
        function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
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
    observer.observe(element);
  }
);
```

} else {

```
revealElements.forEach(
  function (element) {
    element.classList.add('visible');
  }
);
```

}

/* =======================================================
11. FIVE-WING HERO SLIDER
======================================================= */

const wings =
Array.from(
document.querySelectorAll('.layered-wing')
);

const previousButton =
document.querySelector('#layeredPrev');

const nextButton =
document.querySelector('#layeredNext');

const dotsContainer =
document.querySelector('#layeredDots');

let activeWing = 0;
let sliderTimer = null;
let sliderPaused = false;

if (wings.length) {

```
const positionClasses = [
  'is-active',
  'position-right',
  'position-far-right',
  'position-far-left',
  'position-left'
];


function updateSlider() {

  wings.forEach(
    function (wing, index) {

      wing.classList.remove(
        'position-left',
        'position-far-left',
        'is-active',
        'position-right',
        'position-far-right'
      );

      const relativePosition =
        (
          index -
          activeWing +
          wings.length
        ) % wings.length;

      const className =
        positionClasses[relativePosition];

      if (className) {
        wing.classList.add(className);
      }

      wing.setAttribute(
        'aria-current',
        relativePosition === 0
          ? 'true'
          : 'false'
      );

    }
  );


  if (dotsContainer) {

    dotsContainer
      .querySelectorAll('.layered-dot')
      .forEach(
        function (dot, index) {

          dot.classList.toggle(
            'active',
            index === activeWing
          );

        }
      );

  }

}


function goNext() {

  activeWing =
    (activeWing + 1) % wings.length;

  updateSlider();

}


function goPrevious() {

  activeWing =
    (
      activeWing -
      1 +
      wings.length
    ) % wings.length;

  updateSlider();

}


function stopSlider() {

  if (sliderTimer) {

    clearInterval(sliderTimer);
    sliderTimer = null;

  }

}


function startSlider() {

  stopSlider();

  if (!sliderPaused) {

    sliderTimer =
      setInterval(
        goNext,
        5200
      );

  }

}


function restartSlider() {
  startSlider();
}


if (dotsContainer) {

  dotsContainer.innerHTML = '';

  wings.forEach(
    function (wing, index) {

      const dot =
        document.createElement('button');

      dot.type = 'button';

      dot.className =
        'layered-dot';

      dot.setAttribute(
        'aria-label',
        'Show ' +
        (
          wing.getAttribute(
            'aria-label'
          ) || 'business'
        )
      );

      dot.addEventListener(
        'click',
        function () {

          activeWing = index;

          updateSlider();
          restartSlider();

        }
      );

      dotsContainer.appendChild(dot);

    }
  );

}


if (nextButton) {

  nextButton.addEventListener(
    'click',
    function () {

      goNext();
      restartSlider();

    }
  );

}


if (previousButton) {

  previousButton.addEventListener(
    'click',
    function () {

      goPrevious();
      restartSlider();

    }
  );

}


const hero =
  document.querySelector('.layered-hero');


if (hero) {

  hero.addEventListener(
    'mouseenter',
    function () {

      sliderPaused = true;
      stopSlider();

    }
  );


  hero.addEventListener(
    'mouseleave',
    function () {

      sliderPaused = false;
      startSlider();

    }
  );


  let startX = 0;


  hero.addEventListener(
    'touchstart',
    function (event) {

      if (
        event.changedTouches &&
        event.changedTouches.length
      ) {

        startX =
          event.changedTouches[0].clientX;

      }

    },
    { passive: true }
  );


  hero.addEventListener(
    'touchend',
    function (event) {

      if (
        !event.changedTouches ||
        !event.changedTouches.length
      ) {
        return;
      }

      const distance =
        event.changedTouches[0].clientX -
        startX;

      if (Math.abs(distance) > 35) {

        if (distance < 0) {
          goNext();
        } else {
          goPrevious();
        }

        restartSlider();

      }

    },
    { passive: true }
  );

}


updateSlider();
startSlider();
```

}

/* =======================================================
12. ACCESSIBLE DETAILS
======================================================= */

document
.querySelectorAll(
'.service-more summary'
)
.forEach(function (summary) {

```
  summary.setAttribute(
    'role',
    'button'
  );

});
```

/* =======================================================
13. BUTTON HOVER TITLES
======================================================= */

document
.querySelectorAll(
'.btn,' +
'.smalllink,' +
'.solution-link,' +
'.service-more summary,' +
'.contact-pill,' +
'.menu-btn,' +
'.iconbtn,' +
'.layered-control,' +
'.layered-dot'
)
.forEach(function (element) {

```
  if (element.hasAttribute('title')) {
    return;
  }

  const label =
    element.getAttribute('aria-label') ||
    element.textContent
      .trim()
      .replace(/\s+/g, ' ');

  if (label) {
    element.setAttribute(
      'title',
      label
    );
  }

});
```

/* =======================================================
14. VISITOR ID
======================================================= */

const VISITOR_STORAGE_KEY =
'madhyum_visitor_id_v1';

function getVisitorId() {

```
try {

  let visitorId =
    localStorage.getItem(
      VISITOR_STORAGE_KEY
    );


  if (!visitorId) {

    if (
      window.crypto &&
      typeof window.crypto.randomUUID ===
        'function'
    ) {

      visitorId =
        window.crypto.randomUUID();

    } else {

      visitorId =
        'v_' +
        Date.now().toString(36) +
        '_' +
        Math.random()
          .toString(36)
          .slice(2);

    }


    localStorage.setItem(
      VISITOR_STORAGE_KEY,
      visitorId
    );

  }


  return visitorId;

} catch (error) {

  return (
    'session_' +
    Date.now().toString(36) +
    '_' +
    Math.random()
      .toString(36)
      .slice(2)
  );

}
```

}

/* =======================================================
15. STAT NUMBER ANIMATION
======================================================= */

function animateStatistic(
element,
target
) {

```
if (
  !element ||
  !Number.isFinite(target)
) {
  return;
}


const finalNumber =
  Math.max(
    0,
    Math.round(target)
  );


const duration = 1100;
const startTime = performance.now();


element.classList.remove(
  'is-loading'
);


function animationFrame(now) {

  const progress =
    Math.min(
      1,
      (
        now -
        startTime
      ) / duration
    );


  const eased =
    1 -
    Math.pow(
      1 - progress,
      3
    );


  const currentNumber =
    Math.round(
      finalNumber * eased
    );


  element.textContent =
    currentNumber.toLocaleString(
      'en-IN'
    ) + '+';


  if (progress < 1) {

    window.requestAnimationFrame(
      animationFrame
    );

  }

}


window.requestAnimationFrame(
  animationFrame
);
```

}

/* =======================================================
16. LIVE HOMEPAGE STATISTICS
======================================================= */

function loadLiveStatistics() {

```
if (
  !document.body.classList.contains(
    'home-page'
  )
) {
  return;
}


const visitorElement =
  document.querySelector(
    '[data-stat-value="visitors"]'
  );

const inquiryElement =
  document.querySelector(
    '[data-stat-value="inquiries"]'
  );

const statusElement =
  document.querySelector(
    '[data-stats-status]'
  );


if (
  !visitorElement &&
  !inquiryElement
) {
  return;
}


const elements = [
  visitorElement,
  inquiryElement
].filter(Boolean);


elements.forEach(
  function (element) {

    element.classList.add(
      'is-loading'
    );

  }
);


const callbackName =
  'madhyumStatsCallback_' +
  Date.now() +
  '_' +
  Math.random()
    .toString(36)
    .slice(2);


const script =
  document.createElement('script');


let finished = false;


function cleanup() {

  script.remove();

  try {
    delete window[callbackName];
  } catch (error) {
    window[callbackName] = undefined;
  }

}


function showFailure() {

  if (finished) {
    return;
  }

  finished = true;

  cleanup();


  elements.forEach(
    function (element) {

      element.classList.remove(
        'is-loading'
      );

      element.textContent = '—';

    }
  );


  if (statusElement) {

    statusElement.textContent =
      'Live statistics are temporarily unavailable.';

  }

}


window[callbackName] =
  function (data) {

    if (finished) {
      return;
    }

    finished = true;

    cleanup();


    if (
      !data ||
      data.success !== true
    ) {

      showFailure();
      return;

    }


    const visitors =
      Number(data.visitors);

    const inquiries =
      Number(data.inquiries);


    if (
      Number.isFinite(visitors)
    ) {

      animateStatistic(
        visitorElement,
        visitors
      );

    } else if (visitorElement) {

      visitorElement.classList.remove(
        'is-loading'
      );

      visitorElement.textContent =
        '—';

    }


    if (
      Number.isFinite(inquiries)
    ) {

      animateStatistic(
        inquiryElement,
        inquiries
      );

    } else if (inquiryElement) {

      inquiryElement.classList.remove(
        'is-loading'
      );

      inquiryElement.textContent =
        '—';

    }


    if (statusElement) {

      statusElement.textContent =
        'Live figures from the MADHYUM network.';

    }

  };


script.onerror =
  function () {

    showFailure();

  };


const requestURL =
  new URL(
    MADHYUM_API_URL,
    window.location.href
  );


requestURL.searchParams.set(
  'action',
  'stats'
);


requestURL.searchParams.set(
  'visitorId',
  getVisitorId()
);


requestURL.searchParams.set(
  'callback',
  callbackName
);


requestURL.searchParams.set(
  '_',
  Date.now().toString()
);


script.src =
  requestURL.toString();


document.head.appendChild(script);


/*
  Safety timeout.

  If Google's response is delayed,
  the page will not remain stuck
  showing a loading state forever.
*/

window.setTimeout(
  function () {

    if (!finished) {
      showFailure();
    }

  },
  10000
);
```

}

loadLiveStatistics();

/* =======================================================
17. INQUIRY FORM SUPPORT
======================================================= */

const pageWing = {

```
'real-estate.html':
  'Real Estate',

'travel.html':
  'Travel',

'education.html':
  'Education & Admissions',

'consultancy.html':
  'Consultancy & Business Services',

'events.html':
  'Events & Weddings',

'contact.html':
  'General / Other'
```

};

function fieldValue(
form,
name
) {

```
const field =
  form.elements[name];

return field
  ? String(
      field.value || ''
    ).trim()
  : '';
```

}

function buildInquiryPayload(form) {

```
const page =
  (
    window.location.pathname
      .split('/')
      .pop() ||
    'index.html'
  ).toLowerCase();


const allFields =
  Array.from(
    form.elements
  ).filter(
    function (element) {

      return (
        element.name &&
        !element.disabled &&
        element.type !== 'submit' &&
        element.type !== 'button'
      );

    }
  );


const commonNames =
  new Set([
    'name',
    'phone',
    'mobile',
    'email',
    'requirement',
    'category'
  ]);


const details = [];


allFields.forEach(
  function (element) {

    const value =
      String(
        element.value || ''
      ).trim();


    if (
      !value ||
      commonNames.has(element.name)
    ) {
      return;
    }


    const label =
      element.closest('label') &&
      element.closest('label')
        .childNodes[0] &&
      element.closest('label')
        .childNodes[0]
        .textContent
        ? element.closest('label')
            .childNodes[0]
            .textContent
            .trim()
        : element.name;


    details.push(
      label +
      ': ' +
      value
    );

  }
);


let requirement;


if (page === 'contact.html') {

  requirement =
    fieldValue(
      form,
      'category'
    );

} else {

  requirement =
    pageWing[page] ||
    form.getAttribute(
      'data-form-name'
    ) ||
    'General / Other';

}


const freeText =
  fieldValue(
    form,
    'requirement'
  );


if (freeText) {

  details.push(
    'Requirement Details: ' +
    freeText
  );

}


return {

  name:
    fieldValue(
      form,
      'name'
    ),

  mobile:
    fieldValue(
      form,
      'phone'
    ) ||
    fieldValue(
      form,
      'mobile'
    ),

  email:
    fieldValue(
      form,
      'email'
    ),

  requirement:
    requirement,

  details:
    details.join('\n'),

  source:
    page

};
```

}

/* =======================================================
18. INQUIRY FORM SUBMISSION
======================================================= */

document
.querySelectorAll(
'[data-form-name]'
)
.forEach(
function (form) {

```
    form.addEventListener(
      'submit',
      async function (event) {

        event.preventDefault();


        const successElement =
          form.querySelector(
            '.form-success'
          );


        const submitButton =
          form.querySelector(
            'button[type="submit"]'
          );


        const payload =
          buildInquiryPayload(form);


        /* ---------------------------------------------
           REQUIRED FIELD CHECK
           --------------------------------------------- */

        if (
          !payload.name ||
          !payload.mobile ||
          !payload.requirement
        ) {

          if (successElement) {

            successElement.textContent =
              'Please complete the required fields before sending your request.';

          }

          return;

        }


        /* ---------------------------------------------
           BUTTON STATE
           --------------------------------------------- */

        if (submitButton) {

          submitButton.disabled = true;

          submitButton.dataset.originalText =
            submitButton.textContent;

          submitButton.textContent =
            'Sending…';

        }


        if (successElement) {
          successElement.textContent = '';
        }


        /* ---------------------------------------------
           SEND TO APPS SCRIPT
           --------------------------------------------- */

        try {

          const response =
            await fetch(
              MADHYUM_API_URL,
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'text/plain;charset=utf-8'
                },

                body:
                  JSON.stringify(
                    payload
                  )

              }
            );


          if (!response.ok) {

            throw new Error(
              'Network response was not successful.'
            );

          }


          const result =
            await response.json();


          if (
            !result ||
            result.success !== true
          ) {

            throw new Error(
              result &&
              result.message
                ? result.message
                : 'Unable to submit the inquiry.'
            );

          }


          /* -------------------------------------------
             SUCCESS
             ------------------------------------------- */

          if (successElement) {

            successElement.textContent =
              'Thank you. Your request has been received' +
              (
                result.inquiryId
                  ? ' (' +
                    result.inquiryId +
                    ')'
                  : ''
              ) +
              '. We will contact you soon.';

          }


          form.reset();


          /*
            Refresh homepage statistics if this
            form happens to be on the homepage.
          */

          if (
            document.body.classList.contains(
              'home-page'
            )
          ) {

            window.setTimeout(
              loadLiveStatistics,
              500
            );

          }


        } catch (error) {

          console.error(
            'MADHYUM inquiry error:',
            error
          );


          if (successElement) {

            successElement.textContent =
              'We could not send your request right now. Please try again in a moment.';

          }

        } finally {

          if (submitButton) {

            submitButton.disabled =
              false;

            submitButton.textContent =
              submitButton.dataset.originalText ||
              'Send Your Request →';

          }

        }

      }
    );

  }
);
```

/* =======================================================
19. FINAL INITIALIZATION
======================================================= */

document.documentElement.classList.add(
'madhyum-js-ready'
);

})();
