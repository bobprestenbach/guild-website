/* ==========================================================================
   The Hospitality Guild — Shared JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Nav: Hamburger Menu
     -------------------------------------------------------------------------- */
  function initHamburger() {
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', !isOpen);
      hamburger.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Nav: Active Link Highlighting
     -------------------------------------------------------------------------- */
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll to Top Button
     -------------------------------------------------------------------------- */
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     FAQ Accordion
     -------------------------------------------------------------------------- */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Blog Filter
     -------------------------------------------------------------------------- */
  function initBlogFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        blogCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     Email Capture Form (Training Page)
     -------------------------------------------------------------------------- */
  function initResourceForm() {
    const form = document.querySelector('.resource-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = form.nextElementSibling;
      if (success && success.classList.contains('form-success')) {
        success.classList.add('visible');
        form.style.display = 'none';
      }
    });
  }

  /* --------------------------------------------------------------------------
     Partner Inquiry Form
     -------------------------------------------------------------------------- */
  function initPartnerForm() {
    const form = document.querySelector('.partner-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = form.nextElementSibling;
      if (success && success.classList.contains('form-success')) {
        success.classList.add('visible');
        form.style.display = 'none';
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll reveal (lightweight, no IntersectionObserver polyfill needed)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.card, .blog-card, .pricing-card, .track-card, .community-feature, .timeline-item, .step, .partner-card, .testimonial-card');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease ' + (i % 4 * 0.1) + 's, transform 0.5s ease ' + (i % 4 * 0.1) + 's';
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     Init
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHamburger();
    initActiveNav();
    initScrollTop();
    initFAQ();
    initBlogFilter();
    initResourceForm();
    initPartnerForm();
    initScrollReveal();
  });

})();
