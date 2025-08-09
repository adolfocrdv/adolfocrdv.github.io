// Variables para control scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const btnSearch = document.getElementById('btn-search');
const searchBar = document.getElementById('search-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll hacia abajo y pasamos 100px: ocultamos navbar
    navbar.classList.add('hidden');
  } else if (scrollTop + window.innerHeight < document.body.scrollHeight) {
    // Scroll hacia arriba y no estamos al final de la página: mostramos navbar
    navbar.classList.remove('hidden');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // evita valores negativos
});

// Toggle barra de búsqueda al hacer click en botón Buscar
btnSearch.addEventListener('click', () => {
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block';
    document.getElementById('search-input').focus();
  } else {
    searchBar.style.display = 'none';
  }
});

// Cambio automático de fondo en hero
const hero = document.querySelector('.hero');

const images = [
  'images/poe1.png',
  'images/fondocat.png',
  'images/poe1.png',
  'images/poe1.png'
];

let currentIndex = 0;

function changeBackground() {
  // Efecto de alejamiento suave con escala
  hero.style.transition = 'transform 1.5s ease, background-image 1s ease';
  hero.style.transform = 'scale(1.05)';

  setTimeout(() => {
    hero.style.backgroundImage = `url("${images[currentIndex]}")`;
    hero.style.transform = 'scale(1)';
    currentIndex = (currentIndex + 1) % images.length;
  }, 1200);
}

// Inicializa la primera imagen
changeBackground();

// Cambia cada 6 segundos
setInterval(changeBackground, 6000);

// ============= CARRUSEL DE RECOMENDADOS =============
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  // Remover clases activas
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev');
  });
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Activar slide actual
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  
  // Agregar clase prev al slide anterior
  const prevIndex = index === 0 ? slides.length - 1 : index - 1;
  slides[prevIndex].classList.add('prev');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Navegación con dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto-play del carrusel de recomendados
setInterval(nextSlide, 4000);

// Inicializar carrusel
showSlide(currentSlide);

// Efectos adicionales para las tarjetas de recomendados
document.addEventListener('DOMContentLoaded', () => {
  const recommendedCards = document.querySelectorAll('.recommended-card');
  
  recommendedCards.forEach((card, index) => {
    // Animación de entrada escalonada
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
  
  // Intersection Observer para animar cuando entra en vista
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  });
  
  recommendedCards.forEach(card => {
    observer.observe(card);
  });
});

// ============= FUNCIONALIDAD CATEGORÍAS =============
document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      
      // Por ahora solo mostramos en consola, después configuramos las rutas
      console.log(`Navegando a categoría: ${category}`);
      
      // Efecto visual de click
      card.style.transform = 'translateY(-25px) scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'translateY(-20px) scale(1)';
      }, 150);
    });
    
    // Efectos adicionales de hover
    card.addEventListener('mouseenter', () => {
      card.style.filter = 'brightness(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.filter = 'brightness(1)';
    });
  });
  
  // Animación de entrada para las tarjetas de categoría
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  });
  
  categoryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(card);
  });
});