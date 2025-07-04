// Variables del carrusel RSE
let rseCarousel = null;
let rseItems = [];
let rsePrevBtn = null;
let rseNextBtn = null;
let rseCurrentIndex = 0;

// Generar dinámicamente las tarjetas de proyectos RSE
window.generateRSECards = function(rseItems) {
  const carouselTrack = document.querySelector(".rse-carousel-track")

  // Limpiar el contenedor antes de agregar nuevas tarjetas
  carouselTrack.innerHTML = ""

  // Generar cada tarjeta de proyecto
  rseItems.forEach((item, index) => {
    const rseCard = document.createElement("div")
    rseCard.className = "rse-card"
    rseCard.dataset.rseIndex = index // Guardar el índice para referencia

    rseCard.innerHTML = `
      <div class="rse-image-wrapper">
        <img src="${item.image}" alt="${item.title}" class="rse-card-image">
      </div>
      <h3 class="rse-card-title">${item.title}</h3>
      <button class="rse-button" data-i18n="rse_ampliar">Ampliar</button>
    `

    carouselTrack.appendChild(rseCard)
  })

  // Agregar eventos a los botones después de generar las tarjetas
  setupRSEButtons(rseItems)
}

// Función para cargar los proyectos RSE
window.loadRSEProjects = function(language) {
  // Si no se especifica idioma, usar el actual
  const currentLang = language || window.getCurrentLanguage();

  // Cargar proyectos RSE desde la API con el idioma actual
  fetch(`php/rse/rse-api.php?lang=${currentLang}`)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error al cargar los proyectos RSE: ${response.status}`);
      }
      const data = await response.json();
      console.log('Datos recibidos:', data); // Para debug
      return data;
    })
    .then((rseItems) => {
      // Verificar que rseItems sea un array válido
      if (!Array.isArray(rseItems)) {
        console.error('Respuesta inválida:', rseItems);
        throw new Error('La respuesta no es un array válido');
      }

      // Si no hay proyectos, mostrar un mensaje
      if (rseItems.length === 0) {
        const carouselTrack = document.querySelector(".rse-carousel-track");
        if (carouselTrack) {
          carouselTrack.innerHTML = `<div class='rse-card'><p>${currentLang === 'es' ? 'No hay proyectos disponibles.' : 'No projects available.'}</p></div>`;
        }
        return;
      }

      // Generar las tarjetas con los datos recibidos
      window.generateRSECards(rseItems)

      // Intentar inicializar el carrusel varias veces
      let attempts = 0;
      const maxAttempts = 5;
      const initializeCarousel = () => {
        if (window.initRSECarousel()) {
          setupRSECarouselListeners()
          window.updateRSECarousel()
          console.log('Carrusel inicializado exitosamente');
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            console.log(`Intento ${attempts} de ${maxAttempts} para inicializar el carrusel...`);
            setTimeout(initializeCarousel, 200);
          } else {
            console.error('No se pudo inicializar el carrusel después de varios intentos');
          }
        }
      };
      
      // Comenzar los intentos de inicialización
      setTimeout(initializeCarousel, 200);
    })
    .catch((error) => {
      console.error("Error:", error)
      const carouselTrack = document.querySelector(".rse-carousel-track")
      carouselTrack.innerHTML = `<div class='rse-card'><p>${currentLang === 'es' ? 'Error al cargar los proyectos.' : 'Error loading projects.'}</p></div>`
    })
}

// Configurar los botones de "Ampliar"
function setupRSEButtons(rseItems) {
  const rseButtons = document.querySelectorAll(".rse-button")
  const modal = document.querySelector(".rse-modal")
  const modalClose = document.querySelector(".rse-modal-close")

  rseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Obtener el índice del proyecto desde el atributo data
      const card = button.closest(".rse-card")
      const rseIndex = Number.parseInt(card.dataset.rseIndex)
      const rseItem = rseItems[rseIndex]

      // Actualizar el contenido del modal con los datos del proyecto
      const modalImage = document.querySelector(".rse-modal-image")
      if (rseItem.popupImage) {
        modalImage.src = rseItem.popupImage
      } else {
        modalImage.src = rseItem.image  // Si no hay popupImage, usar la imagen principal
      }
      modalImage.alt = rseItem.title

      // Mostrar modal
      modal.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  // También permitir hacer clic en la imagen para abrir el modal
  const rseImages = document.querySelectorAll(".rse-image-wrapper")
  rseImages.forEach((imageWrapper) => {
    imageWrapper.addEventListener("click", () => {
      const card = imageWrapper.closest(".rse-card")
      card.querySelector(".rse-button").click()
    })
  })

  modalClose.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// Inicializar elementos del carrusel después de generar las tarjetas
window.initRSECarousel = function() {
  try {
    rseCarousel = document.querySelector(".rse-carousel-track")
    if (!rseCarousel) {
      console.error("No se encontró el elemento .rse-carousel-track")
      return false
    }

    rseItems = document.querySelectorAll(".rse-card")
    if (!rseItems || rseItems.length === 0) {
      console.error("No se encontraron elementos .rse-card")
      return false
    }

    rsePrevBtn = document.querySelector(".rse-carousel-button-prev")
    if (!rsePrevBtn) {
      console.error("No se encontró el botón previo del carrusel")
      return false
    }

    rseNextBtn = document.querySelector(".rse-carousel-button-next")
    if (!rseNextBtn) {
      console.error("No se encontró el botón siguiente del carrusel")
      return false
    }

    console.log('Carrusel inicializado con éxito:', {
      'Número de items': rseItems.length,
      'Carrusel encontrado': !!rseCarousel,
      'Botones encontrados': !!(rsePrevBtn && rseNextBtn)
    })

    return true
  } catch (error) {
    console.error('Error al inicializar el carrusel:', error)
    return false
  }
}

// Función para obtener el ancho del item incluyendo margen
function getRSEItemWidth() {
  const container = document.querySelector('.rse-carousel-container');
  if (!container) return 0;
  
  const containerWidth = container.offsetWidth;
  const visibleCount = updateRSEVisibleItems();
  
  // Usar porcentajes fijos como en CSS
  if (visibleCount === 3) return containerWidth * 0.345; // 31% + 3.5% margen
  if (visibleCount === 2) return containerWidth * 0.52; // 48% + 4% margen
  return containerWidth; // 100% para móvil
}

// Función para actualizar el número de elementos visibles según el ancho de la pantalla
window.updateRSEVisibleItems = function() {
  let visibleCount = 3;
  if (window.innerWidth <= 768) visibleCount = 2;
  if (window.innerWidth <= 480) visibleCount = 1;
  return visibleCount;
}

// Función para actualizar la posición del carrusel
window.updateRSECarousel = function() {
  const visibleCount = updateRSEVisibleItems();
  const maxIdx = Math.max(0, rseItems.length - visibleCount);

  // Asegurarse de que el índice no exceda el máximo
  if (rseCurrentIndex > maxIdx) rseCurrentIndex = maxIdx;
  if (rseCurrentIndex < 0) rseCurrentIndex = 0;

  // Calcular el desplazamiento
  const itemWidth = getRSEItemWidth();
  const offset = -rseCurrentIndex * itemWidth;
  
  // Aplicar la transformación
  const track = document.querySelector('.rse-carousel-track');
  if (track) {
    track.style.transform = `translateX(${offset}px)`;
  }

  // Mostrar/ocultar botones de navegación
  if (rsePrevBtn) rsePrevBtn.style.display = rseCurrentIndex <= 0 ? "none" : "flex";
  if (rseNextBtn) rseNextBtn.style.display = rseCurrentIndex >= maxIdx ? "none" : "flex";
}

// Función para configurar los event listeners del carrusel
function setupRSECarouselListeners() {
  if (!rseCarousel || !rseItems.length || !rsePrevBtn || !rseNextBtn) {
    console.warn("No se pueden configurar los listeners del carrusel: faltan elementos o no está inicializado")
    return
  }
  
  // Definir funciones de manejo de eventos
  function handlePrevClick() {
    if (rseCurrentIndex > 0) {
      rseCurrentIndex--
      window.updateRSECarousel()
    }
  }

  function handleNextClick() {
    const visibleCount = updateRSEVisibleItems()
    const maxIdx = rseItems.length - visibleCount
    if (rseCurrentIndex < maxIdx) {
      rseCurrentIndex++
      window.updateRSECarousel()
    }
  }

  // Agregar los listeners
  rsePrevBtn.addEventListener("click", handlePrevClick)
  rseNextBtn.addEventListener("click", handleNextClick)

  // Evento de redimensionamiento de ventana
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.initRSECarousel()) {
        window.updateRSECarousel()
      }
    }, 250)
  })
}

// Cargar proyectos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.loadRSEProjects()
  // setupCarouselListeners se llamará después de que se generen las tarjetas
})




