document.addEventListener("DOMContentLoaded", () => {
  // Datos de las noticias
  const newsItems = [
    {
      image: "./assets/galeria/mineria.png",
      category: "CSR",
      titleBlack: "Mining",
      titleGreen: "",
      description:
        "Mining activity continues to expand with new exploration and production projects. Ghm, together with the provincial government, seeks to promote investments and local employment, prioritizing sustainable development. Nearby communities closely monitor the environmental and economic impact of the industry.",
      date: "25/02/2025",
      modalImage: "./assets/galeria/mineriapop.png",
      modalTextLeft:
        "Mining activity continues to expand with new exploration and production projects. Ghm, together with the provincial government, seeks to promote investments and local employment, prioritizing sustainable development.",
      modalTextRight: "Nearby communities closely monitor the environmental and economic impact of the industry.",
    },
    {
      image: "./assets/galeria/alfalfa.png",
      category: "SUSTAINABILITY",
      titleBlack: "Alfalfa",
      titleGreen: "Field",
      description:
        "In our company, we maintain a firm commitment to sustainability and environmental care. We have three hectares mainly dedicated to alfalfa cultivation, in addition to growing species such as oregano and thyme. We take advantage of the natural diversity of our lands to optimize agricultural production, promoting a sustainable balance that respects and preserves local ecosystems.",
      date: "18/02/2025",
      modalImage: "./assets/galeria/alfalfa.png",
      modalTextLeft:
        "In our company, we maintain a firm commitment to sustainability and environmental care. We have three hectares mainly dedicated to alfalfa cultivation, in addition to growing species such as oregano and thyme.",
      modalTextRight:
        "We take advantage of the natural diversity of our lands to optimize agricultural production, promoting a sustainable balance that respects and preserves local ecosystems.",
    },
    {
      image: "./assets/galeria/3.png",
      category: "PRODUCTS",
      titleBlack: "Ylla",
      titleGreen: "Cheese",
      description:
        "Ghm Satelital makes periodic donations of its alfalfa production to feed goat livestock, contributing to the development of the goat industry in the region. This initiative not only supports local producers but also drives the growth of companies like Quesos Ylla, thus strengthening the department's economy.",
      date: "05/02/2025",
      modalImage: "./assets/galeria/quesos.png",
      modalTextLeft:
        "Ghm Satelital makes periodic donations of its alfalfa production to feed goat livestock, contributing to the development of the goat industry in the region.",
      modalTextRight:
        "This initiative not only supports local producers but also drives the growth of companies like Quesos Ylla, thus strengthening the department's economy.",
    },
    {
      image: "./assets/galeria/agua.png",
      category: "SERVICES",
      titleBlack: "Laguna",
      titleGreen: "Blanca",
      description:
        "With the support of the provincial government, Ghm Satelital has designed an innovative rest stop at Laguna Blanca, located at the base of Mercedario, in collaboration with the Ciudad Andina Association. This facility, which includes a state-of-the-art dome, harmoniously blends technology with nature, offering a unique experience for visitors.",
      date: "10/02/2025",
      modalImage: "./assets/galeria/laguna.png",
      modalTextLeft:
        "With the support of the provincial government, Ghm Satelital has designed an innovative rest stop at Laguna Blanca, located at the base of Mercedario, in collaboration with the Ciudad Andina Association. This facility, which includes a state-of-the-art dome, harmoniously blends technology with",
      modalTextRight:
        "state-of-the-art dome, harmoniously blends technology with nature, offering a unique experience for visitors. Additionally, it will function as an educational center dedicated to the study of the environment and meteorology, promoting environmental awareness in the region.",
    },
  ]

  // Generar dinámicamente las tarjetas de noticias
  function generateNewsCards() {
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
          <h3 class="news-card-title">${item.titleBlack}<span class="news-card-title-highlight">${item.titleGreen ? " " + item.titleGreen : ""}</span></h3>
          <p class="news-card-description">${item.description}</p>
          <div class="news-card-date">Publicado: ${item.date}</div>
          <a href="#" class="news-button">See new &gt;</a>
        </div>
      `

      carouselTrack.appendChild(newsCard)
    })

    // Agregar eventos a los botones después de generar las tarjetas
    setupNewsButtons()
  }

  // Configurar los botones de "Ver noticia"
  function setupNewsButtons() {
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
        document.querySelector(".news-modal-image").src = newsItem.modalImage
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
  function initCarouselElements() {
    carousel = document.querySelector(".news-carousel-track")
    items = document.querySelectorAll(".news-card")
    prevBtn = document.querySelector(".news-carousel-button-prev")
    nextBtn = document.querySelector(".news-carousel-button-next")

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

  // Función para ajustar la altura de las imágenes
  function adjustImageHeights() {
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
  function updateVisibleItems() {
    let visibleCount = 3
    if (window.innerWidth <= 768) visibleCount = 2
    if (window.innerWidth <= 480) visibleCount = 1
    return visibleCount
  }

  // Función para actualizar la posición del carrusel
  function updateCarousel() {
    const visibleCount = updateVisibleItems()
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

  // Generar las tarjetas de noticias
  generateNewsCards()

  // Inicializar elementos del carrusel
  if (!initCarouselElements()) return

  // Eventos de navegación
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  })

  nextBtn.addEventListener("click", () => {
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

  // Inicialización
  // Esperar a que todas las imágenes se carguen antes de ajustar
  Promise.all(
    Array.from(document.querySelectorAll(".news-card-image"))
      .filter((img) => img != null) // Filtrar elementos nulos
      .map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })
      }),
  ).then(() => {
    updateCarousel()
  })

  // Observar cambios en el contenido
  const observer = new ResizeObserver(() => {
    adjustImageHeights()
  })

  // Observar cada tarjeta de noticias después de que se generen
  document.querySelectorAll(".news-card").forEach((card) => {
    observer.observe(card)
  })
})































