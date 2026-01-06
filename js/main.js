// ==================== MENU TOGGLE MÓVIL ====================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

// Toggle del menú
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animar el icono hamburguesa
  navToggle.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== HEADER AL HACER SCROLL ====================
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Agregar sombra al header
  if (currentScroll > 50) {
    header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.2)";
  } else {
    header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
  }

  lastScroll = currentScroll;
});

// ==================== ANIMACIÓN DE ENTRADA ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar elementos para animación
const animatedElements = document.querySelectorAll(
  ".project-card, .skill-category, .stat-item"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ahora, solo mostramos un mensaje
    const formData = new FormData(contactForm);
    const name = formData.get("name");

    alert(`¡Gracias por tu mensaje ${name}! Te contactaré pronto.`);
    contactForm.reset();
  });
}

// ==================== EFECTO DE ESCRITURA EN HERO ====================
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroTitle.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Iniciar después de un breve delay
  setTimeout(typeWriter, 500);
}

// ==================== MODO OSCURO (OPCIONAL) ====================
// Descomentar si quieres agregar un botón de modo oscuro

// const darkModeToggle = document.createElement('button');
// darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
// darkModeToggle.className = 'dark-mode-toggle';
// darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
// document.body.appendChild(darkModeToggle);

// darkModeToggle.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
//   const isDark = document.body.classList.contains('dark-mode');
//   darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
//   localStorage.setItem('darkMode', isDark);
// });

// // Cargar preferencia guardada
// if (localStorage.getItem('darkMode') === 'true') {
//   document.body.classList.add('dark-mode');
//   darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
// }
