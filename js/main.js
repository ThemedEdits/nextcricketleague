/* ══════════════════════════════════════
   NEXT CRICKET LEAGUE — main.js
══════════════════════════════════════ */

/* ── Navbar: hide on scroll down, reveal on scroll up ── */
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      // Add solid bg once past 60px
      navbar.classList.toggle('scrolled', currentScrollY > 60);

      if (currentScrollY <= 60) {
        // Near top — always show, no hidden class
        navbar.classList.remove('hidden');
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down — hide
        navbar.classList.add('hidden');
      } else {
        // Scrolling up — show
        navbar.classList.remove('hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ── Tournament filters ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const tCards = document.querySelectorAll('.t-card');
const tDividers = document.querySelectorAll('.t-divider');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    tCards.forEach(card => {
      if (filter === 'all' || card.dataset.status === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // hide all dividers then re-show only those between two visible cards
    tDividers.forEach(d => d.classList.add('hidden'));

    const visibleCards = [...tCards].filter(c => !c.classList.contains('hidden'));
    visibleCards.forEach((card, i) => {
      if (i < visibleCards.length - 1) {
        // find the next sibling divider after this card
        let next = card.nextElementSibling;
        while (next && !next.classList.contains('t-divider')) {
          next = next.nextElementSibling;
        }
        if (next) next.classList.remove('hidden');
      }
    });
  });
});

/* ── Scroll reveal ── */
const revealElements = document.querySelectorAll(
  '.about-grid, .founder-card, .sponsor-card, .t-card, .gallery-item, .contact-card, .section-header, .about-badges, .about-text, .tournament-filters'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((sibling, idx) => {
        setTimeout(() => sibling.classList.add('visible'), idx * 80);
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ── Smooth scroll with elastic momentum ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    const navH = navbar.offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navH;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(Math.max(Math.abs(distance) * 0.5, 600), 1400);
    let startTime = null;

    function easeInOutQuart(t) {
      return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuart(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.style.color = (href === `#${id}`) ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Hero slideshow ── */
const slides = document.querySelectorAll('.hero-slide');

if (slides.length > 1) {
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}


/* ── Tournament card bg slideshows ── */
document.querySelectorAll('.t-card').forEach(card => {
  const slides = card.querySelectorAll('.t-bg-slide');
  if (slides.length < 2) return;
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
});

document.querySelectorAll('.gallery-img').forEach(img => {

  const showImage = () => {
    const wrapper = img.closest('.gallery-placeholder');

    // Force skeleton to stay for at least 5 seconds
    setTimeout(() => {
      wrapper.classList.add('loaded');
    }, 5000);
  };

  if (img.complete) {
    showImage();
  } else {
    img.addEventListener('load', showImage);
  }
});