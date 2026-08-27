const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

const mobile = document.querySelector('.mobile-menu');
const menuBtn = document.querySelector('.menu-btn');

const menuClose = document.querySelectorAll('[data-close-mobile]');

menuBtn?.addEventListener('click', () => {
  mobile?.classList.add('open');
});

menuClose.forEach(button => {
  button.addEventListener('click', () => {
    mobile?.classList.remove('open');
  });
});

const drawer = document.querySelector('.drawer');

const openSearch = document.querySelectorAll('[data-search]');
const closeSearch = document.querySelectorAll('[data-close-search]');

openSearch.forEach(button => {
  button.addEventListener('click', () => {
    drawer?.classList.add('open');
  });
});

closeSearch.forEach(button => {
  button.addEventListener('click', () => {
    drawer?.classList.remove('open');
  });
});

const searchInput = document.querySelector('#searchInput');
const resultsBox = document.querySelector('#searchResults');

const DATA = [
  ['3 BHK Bhopal', 'Real Estate', 'real-estate.html'],
  ['Dubai', 'Travel', 'travel.html'],
  ['MBBS', 'Education & Admissions', 'education.html'],
  ['GST', 'Consultancy & Business Services', 'consultancy.html'],
  ['Wedding venue', 'Events & Weddings', 'events.html'],
  ['MSME Udyam', 'Consultancy & Business Services', 'consultancy.html'],
  ['Plots & Land', 'Real Estate', 'real-estate.html'],
  ['Honeymoon', 'Travel', 'travel.html']
];

function renderSearch(q = '') {
  const term = q.trim().toLowerCase();

  const hits = term
    ? DATA.filter(item =>
        item[0].toLowerCase().includes(term) ||
        item[1].toLowerCase().includes(term)
      )
    : [];

  if (!resultsBox) return;

  resultsBox.innerHTML = hits.length
    ? hits.map(item => `
        <a class="result" href="${item[2]}">
          <strong>${item[0]}</strong>
          <small>→ ${item[1]}</small>
        </a>
      `).join('')
    : `
      <div class="result">
        <strong>Try a requirement</strong>
        <small>
          Examples: “3 BHK Bhopal”, “Dubai”, “MBBS”, “GST”.
        </small>
      </div>
    `;
}

searchInput?.addEventListener('input', event => {
  renderSearch(event.target.value);
});

renderSearch();

document.querySelectorAll('[data-scroll]').forEach(link => {

  link.addEventListener('click', event => {

    const id = link.getAttribute('href');

    if (id?.startsWith('#')) {

      const element = document.querySelector(id);

      if (element) {

        event.preventDefault();

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        mobile?.classList.remove('open');
      }
    }

  });

});

document.querySelectorAll('.requirement-form').forEach(form => {

  form.addEventListener('submit', event => {

    event.preventDefault();

    const success = form.querySelector('.success');

    if (success) {
      success.style.display = 'block';
    }

    form.reset();
  });

});
