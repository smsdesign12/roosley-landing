const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.lightbox-close');

function hideLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

document.querySelectorAll('.portfolio-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = button.dataset.full || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

closeLightbox?.addEventListener('click', hideLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) hideLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) hideLightbox();
});

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    feedback.textContent = 'Please complete all required fields before submitting.';
    feedback.className = 'form-feedback error';
    form.reportValidity();
    return;
  }

  feedback.textContent = 'Thanks! Your enquiry has been received. We will be in touch shortly.';
  feedback.className = 'form-feedback success';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

// =============================
// PORTFOLIO CAROUSEL (Mobile Friendly)
// =============================

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Move Slide
function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Next
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

// Previous
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

// =============================
// TOUCH / SWIPE SUPPORT
// =============================

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
});

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    currentIndex = (currentIndex + 1) % slides.length;
  } else if (diff < -50) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }

  updateSlidePosition();
  isDragging = false;
});

// =============================
// AUTO SLIDE (Optional Premium Feel)
// =============================

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}, 6000);