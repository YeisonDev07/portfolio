/* ══════════════════════════════════════════════════════════
   YEISON GIL — PORTFOLIO JS
   ══════════════════════════════════════════════════════════ */

/* ── NAV TOGGLE (móvil) ────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Cerrar al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Cerrar al hacer click fuera
document.addEventListener('click', e => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  }
});

/* ── NAV SCROLL SHADOW ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── SCROLL SUAVE (por si hay hrefs con #) ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SCROLL TOP ────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── ANIMATE ON SCROLL (IntersectionObserver) ──────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

/* ── CONTACT FORM (EmailJS) ────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Validación básica
    const name    = contactForm.from_name.value.trim();
    const email   = contactForm.from_email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Por favor completa todos los campos.', 'err');
      return;
    }

    // Estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';
    setStatus('', '');

    try {
      await emailjs.sendForm(
        'default_service',     // ⚠️ Reemplaza con tu Service ID
        'template_yq7elmz',    // ⚠️ Reemplaza con tu Template ID
        contactForm
      );
      setStatus('✓ Mensaje enviado. ¡Te contactaré pronto!', 'ok');
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('✗ Error al enviar. Escríbeme a yeisongil.dev9701@gmail.com', 'err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar mensaje';
    }
  });
}

function setStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = type;
}

/* ── ACTIVE NAV LINK (scroll spy) ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spyObserver.observe(s));