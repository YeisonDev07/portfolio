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

// ==================== EMAILJS CONFIGURACIÓN ====================
// Inicializar EmailJS con tu Public Key
// Obtén tu Public Key en: https://dashboard.emailjs.com/admin/account
emailjs.init("uaU1acW9HUXAYnFAc"); // ⚠️ REEMPLAZA CON TU PUBLIC KEY

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener el botón de envío
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Deshabilitar botón y mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Configuración de EmailJS
    const serviceID = "default_service"; // Tu Service ID
    const templateID = "template_yq7elmz"; // Tu Template ID

    // Enviar email usando EmailJS
    emailjs
      .sendForm(serviceID, templateID, contactForm)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);

          // Mostrar mensaje de éxito
          showMessage(
            "¡Mensaje enviado con éxito! Te contactaré pronto.",
            "success"
          );

          // Resetear formulario
          contactForm.reset();
        },
        (error) => {
          console.error("FAILED...", error);

          // Mostrar mensaje de error
          showMessage(
            "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente por email.",
            "error"
          );
        }
      )
      .finally(() => {
        // Rehabilitar botón y restaurar texto original
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
}

// ==================== FUNCIÓN PARA MOSTRAR MENSAJES ====================
function showMessage(message, type) {
  // Crear elemento del mensaje
  const messageDiv = document.createElement("div");
  messageDiv.className = `message-alert message-${type}`;
  messageDiv.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check-circle" : "exclamation-circle"
    }"></i>
    <span>${message}</span>
    <button class="message-close" aria-label="Cerrar">&times;</button>
  `;

  // Agregar al body
  document.body.appendChild(messageDiv);

  // Mostrar con animación
  setTimeout(() => messageDiv.classList.add("show"), 10);

  // Cerrar al hacer click en el botón
  const closeBtn = messageDiv.querySelector(".message-close");
  closeBtn.addEventListener("click", () => {
    messageDiv.classList.remove("show");
    setTimeout(() => messageDiv.remove(), 300);
  });

  // Auto-cerrar después de 5 segundos
  setTimeout(() => {
    messageDiv.classList.remove("show");
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
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
