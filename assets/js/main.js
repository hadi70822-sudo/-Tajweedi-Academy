/* =========================================================
   TAJWEEDI QURAN ACADEMY — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------
     1. PRELOADER
  --------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('hide');
    }, 500);
  });
  // Safety fallback in case the load event is delayed
  setTimeout(function () {
    if (preloader) preloader.classList.add('hide');
  }, 3500);

  /* ---------------------------------------------------
     2. AOS — Animate On Scroll
  --------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* ---------------------------------------------------
     3. NAVBAR — scroll state + active link + mobile close
  --------------------------------------------------- */
  const navbar = document.getElementById('mainNavbar');
  const onScrollNav = function () {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScrollNav);
  onScrollNav();

  const navLinks = document.querySelectorAll('.navbar-tajweedi .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const highlightNav = function () {
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) currentId = section.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // Close mobile menu after clicking a link
  const navCollapseEl = document.getElementById('navbarContent');
  if (navCollapseEl) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl);
        if (bsCollapse && navCollapseEl.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ---------------------------------------------------
     4. TYPED.JS removed - matching requested design
  --------------------------------------------------- */

  /* ---------------------------------------------------
     5. PARTICLES.JS — subtle hero atmosphere
  --------------------------------------------------- */
  if (window.particlesJS && document.getElementById('particles-hero')) {
    particlesJS('particles-hero', {
      particles: {
        number: { value: 34, density: { enable: true, value_area: 900 } },
        color: { value: '#C8A951' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 2.6, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#C8A951',
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true
        },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.25 } } }
      },
      retina_detect: true
    });
  }

  /* ---------------------------------------------------
     6. GSAP — hero entrance timeline
  --------------------------------------------------- */
  if (window.gsap) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.7 })
      .from('.hero-salam', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.hero-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-btn-group .btn', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, '-=0.2')
      .from('.hero-stats', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');

    gsap.utils.toArray('.crescent-float').forEach(function (el, i) {
      gsap.from(el, { opacity: 0, scale: 0.5, duration: 1, delay: 0.3 + i * 0.15 });
    });
  }

  /* ---------------------------------------------------
     7. COUNTER ANIMATION (hero + demo stats)
  --------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = function (el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    const step = function (now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.floor(eased * target);
      el.textContent = currentCount + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------------------------------------------
     8. SWIPER — testimonials slider
  --------------------------------------------------- */
  if (window.Swiper && document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.testimonial-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  /* ---------------------------------------------------
     9. GALLERY LIGHTBOX
  --------------------------------------------------- */
  const lightbox = document.getElementById('lightboxOverlay');
  const lightboxInner = document.getElementById('lightboxInner');
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const title = item.getAttribute('data-title') || '';
      const desc = item.getAttribute('data-desc') || '';
      const visualHTML = item.querySelector('.gallery-visual').innerHTML;
      if (lightboxInner) {
        lightboxInner.innerHTML =
          '<button class="lightbox-close" id="lightboxClose" aria-label="Close preview">&times;</button>' +
          '<div class="mb-3">' + visualHTML + '</div>' +
          '<h4 class="display-font mb-2">' + title + '</h4>' +
          '<p class="text-secondary mb-0">' + desc + '</p>';
        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
      }
      if (lightbox) lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------------------------------------------------
     10. RIPPLE EFFECT ON BUTTONS
  --------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      // Do NOT preventDefault here. Standard links must trigger native behavior.

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 650);
    });
  });

  /* ---------------------------------------------------
     11. BACK TO TOP BUTTON
  --------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------
     12. CONTACT FORM — validation + submission to PHP
  --------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const toastEl = document.getElementById('formToast');
  const toastTitle = document.getElementById('formToastTitle');
  const toastBody = document.getElementById('formToastBody');
  const bsToast = toastEl ? new bootstrap.Toast(toastEl, { delay: 5000 }) : null;

  const showToast = function (success, title, message) {
    if (!toastEl) {
      // Fallback alert if toast element is missing
      alert(title + ': ' + message);
      return;
    }
    toastEl.classList.remove('text-bg-success', 'text-bg-danger', 'border-success', 'border-danger');
    toastEl.classList.add(success ? 'text-bg-success' : 'text-bg-danger');
    toastTitle.textContent = title;
    toastBody.textContent = message;

    if (bsToast) {
      bsToast.show();
    } else {
      const newToast = new bootstrap.Toast(toastEl, { delay: 5000 });
      newToast.show();
    }
  };

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const phoneField = document.getElementById('phone');
      const messageField = document.getElementById('message');

      // Bootstrap built-in validation check
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        showToast(false, 'Check the form', 'Please fill in all required fields correctly.');
        return;
      }
      contactForm.classList.add('was-validated');

      const submitBtn = document.getElementById('contactSubmitBtn');
      submitBtn.classList.add('btn-loading');
      submitBtn.disabled = true;

      // Extract values for WhatsApp
      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const phone = phoneField ? phoneField.value.trim() : 'Not provided';
      const message = messageField ? messageField.value.trim() : 'Not provided';

      // Get selected course name
      const courseSelect = contactForm.querySelector('select');
      const course = courseSelect ? courseSelect.options[courseSelect.selectedIndex].text : 'Not selected';

      // Build WhatsApp message
      let waMessage = `New Admission Inquiry\n`;
      waMessage += `Name: ${name}\n`;
      waMessage += `Phone: ${phone || 'Not provided'}\n`;
      waMessage += `Email: ${email}\n`;
      waMessage += `Course: ${course}\n`;
      waMessage += `Message: ${message || 'Not provided'}`;

      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/923266336947?text=${encodedMsg}`;

      // UI Feedback before redirect
      showToast(true, 'Opening WhatsApp', 'Please tap "Send" in the WhatsApp window to reach us!');

      setTimeout(function() {
        window.open(waUrl, '_blank');

        // Reset state after slight delay
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
      }, 1000);

      /*
      // --- LEGACY BACKEND INTEGRATION (Commented for later) ---
      // const formData = new FormData(contactForm);
      // fetch('assets/php/contact.php', { ... })
      */
    });

    // Remove validation styling as user corrects a field
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.checkValidity()) {
          field.classList.remove('is-invalid');
        }
      });
    });
  }

  /* ---------------------------------------------------
     13. CURRENT YEAR IN FOOTER
  --------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});