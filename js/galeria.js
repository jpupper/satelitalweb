// Hacer las funciones accesibles globalmente
window.updateVisibleItems = function() {
  let visibleCount = 4
  if (window.innerWidth <= 768) visibleCount = 2
  if (window.innerWidth <= 480) visibleCount = 1
  return visibleCount
}

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si los elementos necesarios existen
  const carouselTrack = document.querySelector(".news-carousel-track");
  if (!carouselTrack) {
    console.warn("No se encontró el elemento news-carousel-track");
    return;
  }
  // Obtener el idioma actual usando la función global
  const currentLang = window.getCurrentLanguage();

  // Cargar noticias desde la API con el idioma actual
  //fetch(`/php/news/news-api.php?lang=${currentLang}`)
  fetch(`/satelital/php/news/news-api.php?lang=${currentLang}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar las noticias")
      }
      return response.json()
    })
    .then((newsItems) => {
      // Si no hay noticias, mostrar un mensaje
      if (newsItems.length === 0) {
        const carouselTrack = document.querySelector(".news-carousel-track")
        carouselTrack.innerHTML =
          "<div class='news-card'><div class='news-card-content'><p>No hay noticias disponibles.</p></div></div>"
        return
      }

      // Generar las tarjetas con los datos recibidos
      window.generateNewsCards(newsItems)

      // Inicializar el carrusel después de generar las tarjetas
      if (window.initCarouselElements()) {
        window.updateCarousel()
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      const carouselTrack = document.querySelector(".news-carousel-track")
      carouselTrack.innerHTML =
        "<div class='news-card'><div class='news-card-content'><p>Error al cargar las noticias.</p></div></div>"
    })

  // Generar dinámicamente las tarjetas de noticias
  window.generateNewsCards = function(newsItems) {
    const carouselTrack = document.querySelector(".news-carousel-track")

    // Limpiar el contenedor antes de agregar nuevas tarjetas
    carouselTrack.innerHTML = ""

    // Generar cada tarjeta de noticia
    newsItems.forEach((item, index) => {
      const newsCard = document.createElement("div")
      newsCard.className = "news-card"
      newsCard.dataset.newsIndex = index // Guardar el índice para referencia

      newsCard.innerHTML = `
        <div class="image-wrapper">
          <img src="${item.image}" alt="${item.titleBlack} ${item.titleGreen}" class="news-card-image">
        </div>
        <div class="news-card-content">
          <div class="news-card-category">▸ ${item.category}</div>
          <h3 class="news-card-title">${item.titleBlack}</h3>
          ${item.titleGreen ? `<h3 class="news-card-title news-card-title-highlight">${item.titleGreen}</h3>` : ''}
          <p class="news-card-description">${item.description}</p>
          <div class="news-card-date">Publicado: ${item.formattedDate}</div>
          <a href="#" class="news-button">${getCurrentLanguage() === 'es' ? 'Ver noticia' : 'View news'} &gt;</a>
        </div>
      `

      carouselTrack.appendChild(newsCard)
    })

    // Agregar eventos a los botones después de generar las tarjetas
    window.setupNewsButtons(newsItems)
  }

  // Configurar los botones de "Ver noticia"
  window.setupNewsButtons = function(newsItems) {
    const newsButtons = document.querySelectorAll(".news-button")
    const modal = document.querySelector(".news-modal")
    const modalClose = document.querySelector(".news-modal-close")

    newsButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Obtener el índice de la noticia desde el atributo data
        const card = button.closest(".news-card")
        const newsIndex = Number.parseInt(card.dataset.newsIndex)
        const newsItem = newsItems[newsIndex]

        // Actualizar el contenido del modal con los datos de la noticia
        document.querySelector(".news-modal-category").textContent = newsItem.category
        document.querySelector(".news-modal-title").innerHTML = `${newsItem.titleBlack}<br>${newsItem.titleGreen}`
        document.querySelector(".news-modal-text-left").textContent = newsItem.modalTextLeft
        document.querySelector(".news-modal-text-right").textContent = newsItem.modalTextRight
        document.querySelector(".news-modal-image").src = newsItem.image
        document.querySelector(".news-modal-image").alt = `${newsItem.titleBlack} ${newsItem.titleGreen}`

        // Mostrar modal
        modal.style.display = "flex"
        document.body.style.overflow = "hidden"
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
  window.initCarouselElements = function() {
    try {
      carousel = document.querySelector(".news-carousel-track")
      items = document.querySelectorAll(".news-card")
      prevBtn = document.querySelector(".news-carousel-button-prev")
      nextBtn = document.querySelector(".news-carousel-button-next")

      if (!carousel) throw new Error("No se encontró el elemento carousel")
      if (!items.length) throw new Error("No se encontraron tarjetas de noticias")
      if (!prevBtn) throw new Error("No se encontró el botón previo")
      if (!nextBtn) throw new Error("No se encontró el botón siguiente")

      return true;
    } catch (error) {
      console.warn("Error al inicializar el carrusel:", error.message);
      return false;
    }
  };

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

  // Función para ajustar la altura de las imágenes
  function adjustImageHeights() {
    if (!items || !items.length) {
      console.warn("No hay elementos del carrusel para ajustar");
      return;
    }
    items.forEach((card) => {
      const content = card.querySelector(".news-card-content")
      const image = card.querySelector(".news-card-image")

      // Verificar que los elementos existen
      if (!content || !image) return

      // Asegurarse de que la imagen está cargada
      if (!image.complete) {
        image.onload = () => adjustImageHeight(card, content, image)
        return
      }

      adjustImageHeight(card, content, image)
    })
  }

  // Función auxiliar para ajustar una imagen individual
  function adjustImageHeight(card, content, image) {
    const wrapper = image.parentElement
    const naturalWidth = image.naturalWidth || image.width || 1
    const naturalHeight = image.naturalHeight || image.height || 1
    const aspectRatio = naturalWidth / naturalHeight

    const containerWidth = card.offsetWidth
    const idealImageHeight = containerWidth / aspectRatio

    const contentHeight = content.scrollHeight
    const viewportMultiplier = window.innerWidth <= 480 ? 0.8 : 0.9
    const maxCardHeight = window.innerHeight * viewportMultiplier
    const availableHeight = maxCardHeight - contentHeight - 30

    if (idealImageHeight <= availableHeight) {
      wrapper.style.height = `${idealImageHeight}px`
    } else {
      const minHeight = Math.min(350, availableHeight)
      wrapper.style.height = `${minHeight}px`
    }
  }

  // Función para actualizar el número de elementos visibles según el ancho de la pantalla

  // Función para actualizar la posición del carrusel
  window.updateCarousel = function() {
    const visibleCount = window.updateVisibleItems()
    const maxIdx = items.length - visibleCount

    // Asegurarse de que el índice no exceda el máximo
    if (currentIndex > maxIdx) currentIndex = maxIdx

    const offset = -currentIndex * getItemWidth()
    carousel.style.transform = `translateX(${offset}px)`

    // Mostrar/ocultar botones de navegación según sea necesario
    prevBtn.style.display = currentIndex <= 0 ? "none" : "flex"
    nextBtn.style.display = currentIndex >= maxIdx ? "none" : "flex"

    // Ajustar alturas de imágenes
    adjustImageHeights()
  }

  // Eventos de navegación
  document.querySelector(".news-carousel-button-prev").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      window.updateCarousel()
    }
  })

  document.querySelector(".news-carousel-button-next").addEventListener("click", () => {
    const visibleCount = window.updateVisibleItems()
    const maxIdx = items.length - visibleCount

    if (currentIndex < maxIdx) {
      currentIndex++
      window.updateCarousel()
    }
  })

  // Evento de redimensionamiento de ventana
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.initCarouselElements()) {
        window.updateCarousel()
      }
    }, 250)
  })

  // Observar cambios en el contenido
  const observer = new ResizeObserver(() => {
    adjustImageHeights()
  })

  // Observar cada tarjeta de noticias después de que se generen
  setTimeout(() => {
    document.querySelectorAll(".news-card").forEach((card) => {
      observer.observe(card)
    })
  }, 500)
})


































