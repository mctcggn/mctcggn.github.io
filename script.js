/* =============================================
   MCTC Club Website — script.js
   ============================================= */

// ─── CLUB OFFICER DETAILS ─────────────────────
// Update these whenever office-bearers change.
const PRESIDENT_NAME  = 'TM Shravasti';          // ← change this
const PRESIDENT_PHONE = '+91 9985087768';  // ← change this
const PRESIDENT_WA    = 'https://wa.me/919985087768'; // ← change this

const VP_NAME         = 'TM Shriya';          // ← change this
const VP_PHONE        = '+91 8909673922';  // ← change this
const VP_WA           = 'https://wa.me/918909673922'; // ← change this

// ─── CLUB ADDRESS ─────────────────────────────
const CLUB_VENUE_NAME = 'The Clay House Pre School, Basement';                   // ← change this
const CLUB_ADDRESS    = 'Sector 46, Gurugram, Haryana';                 // ← change this
const CLUB_MAPS_URL   = 'https://goo.gl/maps/Njm6LJm79A2CMxgb6';       // ← change this
// ─────────────────────────────────────────────

// Injects names, phones, WhatsApp links & address into elements with matching data attributes.
function injectOfficerDetails() {
  document.querySelectorAll('[data-name="president"]').forEach(el => el.textContent = PRESIDENT_NAME);
  document.querySelectorAll('[data-name="vp"]').forEach(el => el.textContent = VP_NAME);
  document.querySelectorAll('[data-phone="president"]').forEach(el => {
    el.textContent = PRESIDENT_PHONE;
    if (el.tagName === 'A') el.href = 'tel:' + PRESIDENT_PHONE.replace(/\s+/g, '');
  });
  document.querySelectorAll('[data-phone="vp"]').forEach(el => {
    el.textContent = VP_PHONE;
    if (el.tagName === 'A') el.href = 'tel:' + VP_PHONE.replace(/\s+/g, '');
  });
  document.querySelectorAll('[data-wa="president"]').forEach(el => el.href = PRESIDENT_WA);
  document.querySelectorAll('[data-wa="vp"]').forEach(el => el.href = VP_WA);

  // ─── Address injection ───
  // data-venue="club"   → injects the venue/school name as text
  // data-address="club" → injects the street/area address as text
  // data-maps="club"    → sets href to the Google Maps link (use on <a> tags)
  document.querySelectorAll('[data-venue="club"]').forEach(el => {
    el.textContent = CLUB_VENUE_NAME;
  });
  document.querySelectorAll('[data-address="club"]').forEach(el => {
    el.textContent = CLUB_ADDRESS;
    if (el.tagName === 'A') el.href = CLUB_MAPS_URL;
  });
  document.querySelectorAll('[data-maps="club"]').forEach(el => {
    el.href = CLUB_MAPS_URL;
  });
}

// ─── PAGE NAVIGATION ───
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Update nav state for new page
  setTimeout(() => updateNav(), 50);
  // Close mobile nav
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  if (navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
  // Trigger reveal for new page
  setTimeout(() => triggerReveal(), 100);
}

// ─── SCROLL TO SECTION ID ───
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close nav when overlay is clicked
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// Escape key closes menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// ─── SCROLL: NAV BACKGROUND + BACK-TO-TOP ───
const topnav  = document.getElementById('topnav');
const backTop = document.getElementById('backTop');

function updateNav() {
  topnav.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', updateNav);

// ─── FADE-UP ANIMATIONS (hero) ───
function triggerReveal() {
  const items = document.querySelectorAll('.page.active .fade-up');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
}

// Initial trigger on load
window.addEventListener('load', () => {
  triggerReveal();
});

// ─── INTERSECTION OBSERVER: scroll reveals ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function observeRevealElements() {
  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));
}
observeRevealElements();

// ─── FAQ ACCORDION ───
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-q');
  if (!btn) return;
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close all in same list
  const list = item.closest('.faq-list');
  list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Toggle current
  if (!isOpen) item.classList.add('open');
});

// ─── GALLERY FILTER ───
function filterGallery(cat, btn) {
  // Update active button
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide items
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ─── CONTACT FORM ───
function handleFormSubmit() {
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }
}

// ─── SMOOTH NAV LINK CLICKS ───
// All nav menu clicks are handled via onclick attributes calling showPage()
// This ensures SPA-like navigation with no page reload.

// ─── FOOTER LINK CLICKS ───
// Already handled via onclick attributes

// ─── ROLE SCRIPT ACCORDIONS ───
function toggleScript(btn) {
  const accordion = btn.closest('.script-accordion');
  const isOpen = accordion.classList.contains('open');
  // Close all others
  document.querySelectorAll('.script-accordion.open').forEach(a => a.classList.remove('open'));
  // Toggle current
  if (!isOpen) accordion.classList.add('open');
}

// ─── INIT: Show home page on load ───
showPage('home');
updateNav();
injectOfficerDetails();
