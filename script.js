(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.style.display = 'flex';
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeMobileMenu = function () {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = 'none';
      }
    }, 300);
  };

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const serviceInput = document.getElementById('service');
      const service = serviceInput ? serviceInput.value.trim() : '';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        highlightEmptyFields(name, email, message);
        return;
      }

      if (!isValidEmail(email)) {
        const emailInput = document.getElementById('email');
        emailInput.style.borderColor = 'rgba(239, 68, 68, 0.6)';
        emailInput.focus();
        return;
      }

      const waNumber = '918688641066';
      const waMessage = buildWhatsAppMessage(name, email, service, message);
      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(waMessage);

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(20px)';
      contactForm.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      setTimeout(function () {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
          formSuccess.style.animation = 'fade-up 0.5s ease both';
        }
      }, 300);
    });

    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        this.style.borderColor = '';
      });
    });
  }

  function highlightEmptyFields(name, email, message) {
    if (!name) {
      const el = document.getElementById('name');
      el.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      el.focus();
    } else if (!email) {
      const el = document.getElementById('email');
      el.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      el.focus();
    } else if (!message) {
      const el = document.getElementById('message');
      el.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      el.focus();
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function buildWhatsAppMessage(name, email, service, message) {
    var text = 'Hello Cedentic Technologies!\n\n';
    text += 'Name: ' + name + '\n';
    text += 'Email: ' + email + '\n';
    if (service) {
      text += 'Service: ' + service + '\n';
    }
    text += '\nMessage:\n' + message;
    return text;
  }

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (mobileMenu.style.display !== 'flex') {
    mobileMenu.style.display = 'none';
  }
})();
