// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Detección de dispositivos
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Constantes
  const SCROLL_THRESHOLD = 100;
  const TOUCH_THRESHOLD = isMobileDevice ? 5 : 30;
  
  // Variables de estado
  let currentSection = 1;
  let isAnimating = false;
  let hasExpanded = false;
  let touchStartY = 0;
  let touchStartX = 0;
  let scrollAccumulator = 0;
  let isScrollEnabled = true;
  let isNavigatingBack = false;
  let scrollSavedPosition = 0;
  let scrollUnlocked = false;

  // Obtener referencias a las secciones
  const section1 = document.getElementById("section1");
  const section2 = document.getElementById("section2");
  const section3 = document.getElementById("section3");

  // Verificar que todos los elementos necesarios existan
  if (!section1 || !section2 || !section3) {
    console.error('No se encontraron todas las secciones necesarias');
    return; // Salir si faltan elementos
  }

  // Función universal para activar/desactivar scroll
  function activeScroll(enable) {
    if (enable) {
      // Habilitar scroll - enfoque universal
      scrollUnlocked = true;
      
      // Eliminar todos los bloqueos de scroll
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.body.style.left = "";
      
      // Restaurar la posición del scroll
      if (scrollSavedPosition > 0) {
        window.scrollTo(0, scrollSavedPosition);
        scrollSavedPosition = 0;
      }
      
      // Forzar reflow para asegurar que los cambios se apliquen
      document.body.getBoundingClientRect();
      
      console.log("Scroll activado");
    } else {
      // Deshabilitar scroll - enfoque universal
      scrollUnlocked = false;
      
      // Guardar la posición actual del scroll
      scrollSavedPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Bloquear el scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollSavedPosition}px`;
      document.body.style.left = "0";
      
      console.log("Scroll desactivado");
    }
  }

  // Función para crear estrellas
  function createStars() {
    const stars = document.getElementById("stars");
    if (!stars) {
      console.error('Elemento stars no encontrado');
      return;
    }

    const numberOfStars = 200;
    const fragment = document.createDocumentFragment(); // Usar fragment para mejor rendimiento

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2;

      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random()};
        animation: twinkle ${2 + Math.random() * 4}s infinite;
      `;

      fragment.appendChild(star);
    }

    // Agregar un solo estilo para todas las animaciones
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }`;
    document.head.appendChild(styleSheet);

    stars.appendChild(fragment);
  }

  // Inicializar el scroll de manera segura
  function initializeScroll() {
    // Asegurarnos de que el scroll esté bloqueado al inicio
    activeScroll(false);
  }

  // Función para animar entre secciones
  function animateToSection(sectionNumber) {
    if (isAnimating || !isScrollEnabled) return;
    
    isAnimating = true;
    isScrollEnabled = false;

    const currentElement = document.getElementById(`section${currentSection}`);
    const nextElement = document.getElementById(`section${sectionNumber}`);

    if (!currentElement || !nextElement) {
      console.error('Elementos de sección no encontrados');
      isAnimating = false;
      isScrollEnabled = true;
      return;
    }

    // Bloquear scroll para la animación
    activeScroll(false);

    currentElement.classList.remove("visible");
    currentElement.style.opacity = "0";

    setTimeout(() => {
      currentElement.style.visibility = "hidden";
      nextElement.style.visibility = "visible";
      nextElement.style.opacity = "1";
      nextElement.classList.add("visible");

      if (sectionNumber === 3 && !isNavigatingBack) {
        const cards = nextElement.querySelectorAll(".card");
        cards.forEach((card, index) => {
          card.style.transform = "scale(0)";
          setTimeout(() => {
            card.style.transform = "scale(1)";
          }, index * 100);
        });
      }

      setTimeout(() => {
        isAnimating = false;
        isNavigatingBack = false;

        // Desbloquear scroll solo si estamos en sección 3 expandida
        if (sectionNumber === 3 && hasExpanded) {
          unlockScrollCompletely();
        } else {
          // Habilitar navegación después de 500ms
          setTimeout(() => {
            isScrollEnabled = true;
          }, 500);
        }
      }, 600);

      currentSection = sectionNumber;
    }, 400);
  }
  
  // Función específica para desbloquear completamente el scroll
  function unlockScrollCompletely() {
    // Primero, asegurarnos de que todas las propiedades de bloqueo se eliminen
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";
    document.body.style.top = "";
    document.body.style.left = "";
    
    // Restaurar la posición del scroll si es necesario
    if (scrollSavedPosition > 0) {
      window.scrollTo(0, scrollSavedPosition);
      scrollSavedPosition = 0;
    }
    
    // Forzar reflow
    document.body.getBoundingClientRect();
    
    // Marcar el scroll como desbloqueado
    scrollUnlocked = true;
    
    // Habilitar la navegación
    isScrollEnabled = true;
    
    console.log("Scroll completamente desbloqueado");
  }

  // Manejar el scroll
  function handleScroll(delta) {
    if (isAnimating || !isScrollEnabled) return;

    // Verificamos si estamos en la sección 3 expandida y el usuario intenta ir hacia atrás
    if (currentSection === 3 && hasExpanded && delta < 0) {
      // Solo permitimos navegar hacia atrás si estamos en la parte superior
      if (window.scrollY > 10) {
        return;
      }
    }

    // Acumulamos más rápido en dispositivos móviles
    scrollAccumulator += isMobileDevice ? Math.abs(delta) * 2 : Math.abs(delta);

    // Umbral más bajo para dispositivos móviles
    const effectiveThreshold = isMobileDevice ? SCROLL_THRESHOLD / 2 : SCROLL_THRESHOLD;

    if (scrollAccumulator >= effectiveThreshold) {
      if (delta > 0) {
        if (currentSection === 3 && !hasExpanded) {
          const cards = section3.querySelectorAll(".card");
          cards.forEach((card) => {
            card.style.transform = "scale(1)";
          });

          setTimeout(() => {
            section3.classList.add("expanded");
            hasExpanded = true;

            // Desbloquear el scroll completamente
            setTimeout(unlockScrollCompletely, 300);
            
            isScrollEnabled = false;
          }, 300);
        } else if (currentSection < 3) {
          isNavigatingBack = false;
          animateToSection(currentSection + 1);
        }
      } else if (delta < 0) {
        if (currentSection > 1) {
          if (currentSection === 3 && hasExpanded) {
            // Verificamos nuevamente si estamos en la parte superior
            if (window.scrollY <= 10) {
              const cards = section3.querySelectorAll(".card");
              cards.forEach((card) => {
                card.style.transform = "scale(1)";
              });

              section3.classList.remove("expanded");
              hasExpanded = false;
              scrollUnlocked = false;

              // Bloquear scroll
              activeScroll(false);

              setTimeout(() => {
                isNavigatingBack = true;
                isScrollEnabled = true;
                animateToSection(currentSection - 1);
              }, 250);
            }
          } else {
            isNavigatingBack = true;
            animateToSection(currentSection - 1);
          }
        }
      }
      scrollAccumulator = 0;
    }
  }

  // Manejar eventos de rueda
  function handleWheel(event) {
    // Si el scroll está desbloqueado y estamos en la sección 3 expandida, permitir scroll normal
    if (scrollUnlocked && currentSection === 3 && hasExpanded) {
      // Solo interceptamos si estamos en la parte superior e intentamos ir hacia arriba
      if (event.deltaY < 0 && window.scrollY <= 10) {
        event.preventDefault();
        handleScroll(event.deltaY);
      }
      return;
    }
    
    // En cualquier otro caso, manejamos el scroll nosotros
    if (isScrollEnabled) {
      event.preventDefault();
      handleScroll(event.deltaY);
    }
  }

  // Manejar inicio de toque
  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
    scrollAccumulator = 0;
  }

  // Manejar movimiento de toque
  function handleTouchMove(event) {
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    const touchEndY = event.touches[0].clientY;
    const touchEndX = event.touches[0].clientX;

    const deltaY = touchStartY - touchEndY;
    const deltaX = Math.abs(touchStartX - touchEndX);

    // Solo procesamos gestos verticales (ignoramos horizontales)
    if (Math.abs(deltaY) > deltaX) {
      // Si el scroll está desbloqueado y estamos en la sección 3 expandida
      if (scrollUnlocked && currentSection === 3 && hasExpanded) {
        // Solo interceptamos si estamos en la parte superior e intentamos ir hacia arriba
        if (deltaY < 0 && window.scrollY <= 10) {
          event.preventDefault();
          handleScroll(deltaY);
        }
        return;
      }
      
      // En cualquier otro caso, manejamos el scroll nosotros
      if (isScrollEnabled) {
        event.preventDefault();
        
        // Acumulamos más rápido para que se necesiten menos deslizamientos
        scrollAccumulator += Math.abs(deltaY) * 1.5;

        if (scrollAccumulator >= TOUCH_THRESHOLD) {
          handleScroll(deltaY);
          scrollAccumulator = 0;
          touchStartY = touchEndY;
        }
      }
    }
  }

  // Manejar fin de toque
  function handleTouchEnd(event) {
    // Si acumulamos algo pero no llegamos al umbral, lo reseteamos
    scrollAccumulator = 0;
  }

  // Registrar eventos de manera segura
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  
  // Detectar cuando el usuario hace scroll manualmente (para iOS)
  window.addEventListener("scroll", function() {
    // Si estamos en la sección 3 expandida, asegurarnos de que el scroll esté desbloqueado
    if (currentSection === 3 && hasExpanded && !scrollUnlocked) {
      unlockScrollCompletely();
    }
  });

  // Configurar el botón de contacto
  document.getElementById("botoncontacto").addEventListener("click", function() {
    console.log("Botón contacto presionado");
    
    // Forzar la animación hasta la sección 3
    if (currentSection !== 3) {
      animateToSection(3);
    }
    
    // Después de que termine la animación, expandir y desbloquear
    setTimeout(() => {
      const section3 = document.getElementById("section3");
      if (section3) {
        section3.classList.add("expanded");
      }
      
      // Asegurar que estamos en el estado correcto
      hasExpanded = true;
      isScrollEnabled = true;
      scrollUnlocked = true;
      
      // Desbloquear el scroll completamente
      unlockScrollCompletely();
      
      // Hacer scroll hasta el contenedor de contacto
      setTimeout(() => {
        const contactoContainer = document.getElementById('contacto');
        if (contactoContainer) {
          contactoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 10);
    }, 100); // Esperar a que termine la animación
  });

  // Inicialización
  initializeScroll();
  createStars();

  console.log("Inicialización completada");
  console.log("¿Es dispositivo móvil?", isMobileDevice);
  console.log("¿Es iOS?", isIOS);
});
