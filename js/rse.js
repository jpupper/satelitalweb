document.addEventListener("DOMContentLoaded", () => {
  // Obtener el idioma actual del sitio
  const currentLang = document.documentElement.lang || 'es';

  // Cargar proyectos RSE desde la API con el idioma actual
  fetch(`/satelital/php/rse/rse-api.php?lang=${currentLang}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los proyectos RSE")
      }
      return response.json()
    })
    .then((rseItems) => {
      // Si no hay proyectos, mostrar un mensaje
      if (rseItems.length === 0) {
        const carouselTrack = document.querySelector(".rse-carousel-track")
        carouselTrack.innerHTML = "<div class='rse-card'><p>No hay proyectos disponibles.</p></div>"
        return
      }

      // Generar las tarjetas con los datos recibidos
      generateRSECards(rseItems)

      // Inicializar el carrusel después de generar las tarjetas
      if (initCarouselElements()) {
        updateCarousel()
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      const carouselTrack = document.querySelector(".rse-carousel-track")
      carouselTrack.innerHTML = "<div class='rse-card'><p>Error al cargar los proyectos.</p></div>"
    })

  // Generar dinámicamente las tarjetas de proyectos RSE
  function generateRSECards(rseItems) {
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
        <button class="rse-button">Ampliar</button>
      `

      carouselTrack.appendChild(rseCard)
    })

    // Agregar eventos a los botones después de generar las tarjetas
    setupRSEButtons(rseItems)
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
        document.querySelector(".rse-modal-image").src = rseItem.popupImage
        document.querySelector(".rse-modal-image").alt = rseItem.title

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

  // Elementos del carrusel
  let carousel, items, prevBtn, nextBtn

  // Inicializar elementos del carrusel después de generar las tarjetas
  function initCarouselElements() {
    carousel = document.querySelector(".rse-carousel-track")
    items = document.querySelectorAll(".rse-card")
    prevBtn = document.querySelector(".rse-carousel-button-prev")
    nextBtn = document.querySelector(".rse-carousel-button-next")

    // Verificar que todos los elementos necesarios existen
    if (!carousel || !items.length || !prevBtn || !nextBtn) {
      console.warn("Algunos elementos del carrusel no se encontraron")
      return false
    }
    return true
  }

  // Variables de control
  let currentIndex = 0

  // Función para obtener el ancho del item incluyendo márgenes
  function getItemWidth() {
    const item = items[0]
    const style = window.getComputedStyle(item)
    const marginLeft = Number.parseFloat(style.marginLeft)
    const marginRight = Number.parseFloat(style.marginRight)
    return item.offsetWidth + marginLeft + marginRight
  }

  // Función para actualizar el número de elementos visibles según el ancho de la pantalla
  function updateVisibleItems() {
    let visibleCount = 3
    if (window.innerWidth <= 768) visibleCount = 2
    if (window.innerWidth <= 480) visibleCount = 1
    return visibleCount
  }

  // Función para actualizar la posición del carrusel
  function updateCarousel() {
    const visibleCount = updateVisibleItems()
    const maxIdx = Math.max(0, items.length - visibleCount)

    // Asegurarse de que el índice no exceda el máximo
    if (currentIndex > maxIdx) currentIndex = maxIdx

    const offset = -currentIndex * getItemWidth()
    carousel.style.transform = `translateX(${offset}px)`

    // Mostrar/ocultar botones de navegación según sea necesario
    prevBtn.style.display = currentIndex <= 0 ? "none" : "flex"
    nextBtn.style.display = currentIndex >= maxIdx ? "none" : "flex"
  }

  // Eventos de navegación
  document.querySelector(".rse-carousel-button-prev").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  })

  document.querySelector(".rse-carousel-button-next").addEventListener("click", () => {
    const visibleCount = updateVisibleItems()
    const maxIdx = items.length - visibleCount

    if (currentIndex < maxIdx) {
      currentIndex++
      updateCarousel()
    }
  })

  // Evento de redimensionamiento de ventana
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (initCarouselElements()) {
        updateCarousel()
      }
    }, 250)
  })
})




