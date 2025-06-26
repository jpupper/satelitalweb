// Función para obtener la miniatura de YouTube
function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Array de videos con sus IDs y miniaturas (12 videos en total, 6 por página)
const videos = [
  // Página 1
  {
    id: "qOiu2MHi9Pc",
    thumbnail: getYouTubeThumbnail("qOiu2MHi9Pc"),
  },
  {
    id: "wrkid3vfYWo",
    thumbnail: getYouTubeThumbnail("wrkid3vfYWo"),
  },
  {
    id: "5pN4t5QvplE",
    thumbnail: getYouTubeThumbnail("5pN4t5QvplE"),
  },
  {
    id: "oNSRmAuiTlI",
    thumbnail: getYouTubeThumbnail("oNSRmAuiTlI"),
  },
  {
    id: "KaHhyZLT4Ks",
    thumbnail: getYouTubeThumbnail("KaHhyZLT4Ks"),
  },
  {
    id: "lf54S88Hk0w",
    thumbnail: getYouTubeThumbnail("lf54S88Hk0w"),
  },
  // Página 2
  {
    id: "FQCTVCUgwf4",
    thumbnail: getYouTubeThumbnail("FQCTVCUgwf4"),
  },
  {
    id: "uEIpCBBxT74",
    thumbnail: getYouTubeThumbnail("uEIpCBBxT74"),
  },
  {
    id: "wD2XxvJAz4U",
    thumbnail: getYouTubeThumbnail("wD2XxvJAz4U"),
  },
  {
    id: "p4rFI5ey_6A",
    thumbnail: getYouTubeThumbnail("p4rFI5ey_6A"),
  },
  {
    id: "_K2-nSRB6qo",
    thumbnail: getYouTubeThumbnail("_K2-nSRB6qo"),
  },
  {
    id: "_zOvdvrT2mQ",
    thumbnail: getYouTubeThumbnail("_zOvdvrT2mQ"),
  },
]

// SVG para el botón de reproducción (blanco por defecto, verde en hover)
const playSvgWhite = `
<svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.13 66.32">
  <path fill="#fff" d="M90.79,14.67C88.12.17,75.95,1.1,64.02.53,55.91.14,47.82-.11,39.67.05c-7.62.15-16.01.28-23.54,1.23C.89,3.2.7,13.6.23,26.45c-.3,8.23-.61,19.04,1.31,27.03,2.85,11.83,14.04,11.76,24.07,12.35,12.77.75,25.64.59,38.41,0,13.02-.61,24.59.44,26.97-15.37,1.5-9.92,1.6-25.93-.21-35.78Z"/>
  <polygon fill="#1d1d1b" points="36.83 47.7 61.78 33.26 36.83 18.65 36.83 47.7"/>
</svg>
`

const playSvgGreen = `
<svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.13 66.32">
  <path fill="#adcd00" d="M90.79,14.67C88.12.17,75.95,1.1,64.02.53,55.91.14,47.82-.11,39.67.05c-7.62.15-16.01.28-23.54,1.23C.89,3.2.7,13.6.23,26.45c-.3,8.23-.61,19.04,1.31,27.03,2.85,11.83,14.04,11.76,24.07,12.35,12.77.75,25.64.59,38.41,0,13.02-.61,24.59.44,26.97-15.37,1.5-9.92,1.6-25.93-.21-35.78Z"/>
  <polygon fill="#1d1d1b" points="36.83 47.7 61.78 33.26 36.83 18.65 36.83 47.7"/>
</svg>
`

// Variables para la paginación
let currentPage = 0
const videosPerPage = 6
const totalPages = Math.ceil(videos.length / videosPerPage)

// Elementos DOM
const videoGrid = document.querySelector(".video-grid")
const prevButton = document.querySelector(".video-prev-button")
const nextButton = document.querySelector(".video-next-button")
const fullscreenVideo = document.querySelector(".fullscreen-video")
const iframe = fullscreenVideo.querySelector("iframe")
const closeButton = document.querySelector(".close-button")

// Función para mostrar los videos de la página actual
function showVideosForPage(page) {
  const isMobile = window.innerWidth <= 768

  // En móvil, solo creamos los elementos una vez
  if (isMobile && videoGrid.children.length > 0) {
    return // No recrear elementos en móvil
  }

  // Primero, remover la clase visible de todos los contenedores actuales
  const currentContainers = videoGrid.querySelectorAll(".video-container")
  currentContainers.forEach((container) => {
    container.classList.remove("visible")
  })

  // Esperar a que termine la transición de fade out
  setTimeout(() => {
    // Limpiar la cuadrícula
    videoGrid.innerHTML = ""

    // Calcular el índice de inicio y fin para los videos
    const startIndex = isMobile ? 0 : page * videosPerPage
    const endIndex = isMobile ? videos.length : Math.min(startIndex + videosPerPage, videos.length)

    // Agregar los videos
    for (let i = startIndex; i < endIndex; i++) {
      const video = videos[i]

      const videoContainer = document.createElement("div")
      videoContainer.className = "video-container"
      videoContainer.dataset.videoId = video.id

      const thumbnail = document.createElement("img")
      thumbnail.className = "video-thumbnail"
      thumbnail.src = video.thumbnail
      thumbnail.alt = "Video thumbnail"

      const playButton = document.createElement("div")
      playButton.className = "play-button"
      playButton.innerHTML = playSvgWhite

      videoContainer.appendChild(thumbnail)
      videoContainer.appendChild(playButton)

      // Cambiar al botón verde en hover
      videoContainer.addEventListener("mouseenter", () => {
        playButton.innerHTML = playSvgGreen
      })

      // Volver al botón blanco cuando sale el mouse
      videoContainer.addEventListener("mouseleave", () => {
        playButton.innerHTML = playSvgWhite
      })

      // Manejar clic para reproducir video
      videoContainer.addEventListener("click", function (e) {
        e.preventDefault()
        const videoId = this.dataset.videoId
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
        fullscreenVideo.style.display = "flex"
        document.body.style.overflow = "hidden"
      })

      // Agregar evento touch específico para dispositivos móviles con confirmación
      videoContainer.addEventListener("touchend", function (e) {
        // Prevenir la acción predeterminada
        e.preventDefault()

        // Verificar si es un dispositivo móvil
        if (window.innerWidth <= 768) {
          // Obtener el videoId
          const videoId = this.dataset.videoId

          // Crear o actualizar el elemento de confirmación
          let confirmElement = this.querySelector(".video-confirm-overlay")

          if (!confirmElement) {
            // Si no existe, crear el elemento de confirmación
            confirmElement = document.createElement("div")
            confirmElement.className = "video-confirm-overlay"
            confirmElement.innerHTML = `
              <div class="video-confirm-message">
                <div class="confirm-icon">${playSvgGreen}</div>
                <div class="confirm-text">Toca de nuevo para reproducir</div>
              </div>
            `
            this.appendChild(confirmElement)

            // Configurar un temporizador para eliminar la confirmación después de 3 segundos
            setTimeout(() => {
              if (confirmElement && confirmElement.parentNode) {
                confirmElement.parentNode.removeChild(confirmElement)
              }
            }, 3000)

            // Detener la propagación para evitar que se active inmediatamente
            e.stopPropagation()
          } else {
            // Si ya existe el elemento de confirmación, reproducir el video
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
            fullscreenVideo.style.display = "flex"
            document.body.style.overflow = "hidden"

            // Eliminar el elemento de confirmación
            confirmElement.parentNode.removeChild(confirmElement)
          }
        } else {
          // En dispositivos no móviles, comportamiento normal
          const videoId = this.dataset.videoId
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
          fullscreenVideo.style.display = "flex"
          document.body.style.overflow = "hidden"
        }
      })

      videoGrid.appendChild(videoContainer)
    }

    // Forzar un reflow para asegurar que las transiciones se apliquen
    videoGrid.offsetHeight

    // Agregar la clase visible a los nuevos contenedores
    requestAnimationFrame(() => {
      const newContainers = videoGrid.querySelectorAll(".video-container")
      newContainers.forEach((container) => {
        container.classList.add("visible")
      })
    })

    // Actualizar la navegación después de que se hayan cargado los videos
    if (isMobile) {
      updateMobileNavigation()
    } else {
      updateNavigationButtons()
    }
  }, 300)
}

// Agregar una nueva función para manejar la navegación en móvil
function updateMobileNavigation() {
  // Asegurarse de que el scroll esté al inicio para el primer render
  videoGrid.scrollLeft = 0

  // Ocultar el botón anterior al inicio
  prevButton.style.display = "none"

  // Mostrar el botón siguiente solo si hay suficiente contenido para hacer scroll
  const hasHorizontalScroll = videoGrid.scrollWidth > videoGrid.clientWidth + 20
  nextButton.style.display = hasHorizontalScroll ? "flex" : "none"

  // Limpiar los event listeners anteriores para evitar duplicados
  prevButton.removeEventListener("click", handlePrevButtonClick)
  nextButton.removeEventListener("click", handleNextButtonClick)

  // Agregar los nuevos event listeners
  prevButton.addEventListener("click", handlePrevButtonClick)
  nextButton.addEventListener("click", handleNextButtonClick)

  // Actualizar la visibilidad de los botones cuando se hace scroll
  videoGrid.addEventListener("scroll", updateButtonsOnScroll)

  // Forzar una verificación inicial
  updateButtonsOnScroll()
}

// Función para manejar el clic en el botón anterior en móvil
function handlePrevButtonClick() {
  const containerWidth = videoGrid.offsetWidth
  const currentScroll = videoGrid.scrollLeft

  // Calcular la posición del video anterior
  const targetScroll = Math.max(0, currentScroll - containerWidth)

  videoGrid.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  })
}

// Función para manejar el clic en el botón siguiente en móvil
function handleNextButtonClick() {
  const containerWidth = videoGrid.offsetWidth
  const currentScroll = videoGrid.scrollLeft

  // Calcular la posición del siguiente video
  const targetScroll = Math.min(videoGrid.scrollWidth - containerWidth, currentScroll + containerWidth)

  videoGrid.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  })
}

// Función para actualizar los botones según la posición del scroll
function updateButtonsOnScroll() {
  requestAnimationFrame(() => {
    const isAtStart = videoGrid.scrollLeft <= 10
    const isAtEnd = Math.abs(videoGrid.scrollWidth - videoGrid.offsetWidth - videoGrid.scrollLeft) <= 10

    // Asegurarse de que el botón previo esté oculto al inicio
    prevButton.style.display = isAtStart ? "none" : "flex"
    nextButton.style.display = isAtEnd ? "none" : "flex"
  })
}

// Función para actualizar la visibilidad de los botones de navegación
function updateNavigationButtons() {
  // En la primera página, mostrar solo el botón siguiente (derecha)
  if (currentPage === 0) {
    prevButton.style.display = "none"
    nextButton.style.display = "flex"
  }
  // En la segunda página, mostrar solo el botón anterior (izquierda)
  else if (currentPage === totalPages - 1) {
    prevButton.style.display = "flex"
    nextButton.style.display = "none"
  }
}

// Manejar clic en el botón anterior
prevButton.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--
    showVideosForPage(currentPage)
  }
})

// Manejar clic en el botón siguiente
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++
    showVideosForPage(currentPage)
  }
})

// Cerrar video en pantalla completa
closeButton.addEventListener("click", () => {
  iframe.src = ""
  fullscreenVideo.style.display = "none"
  document.body.style.overflow = "auto"
})

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fullscreenVideo.style.display === "flex") {
    iframe.src = ""
    fullscreenVideo.style.display = "none"
    document.body.style.overflow = "auto"
  }
})

// Inicialización mejorada para dispositivos móviles
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768

  // Mostrar videos iniciales
  showVideosForPage(currentPage)

  if (isMobile) {
    // Asegurarse de que el scroll esté al inicio
    videoGrid.scrollLeft = 0

    // Configurar la navegación móvil
    prevButton.style.display = "none"
    nextButton.style.display = "flex"

    // Agregar listener para el scroll
    videoGrid.addEventListener("scroll", updateButtonsOnScroll)

    // Configurar botones de navegación
    prevButton.addEventListener("click", handlePrevButtonClick)
    nextButton.addEventListener("click", handleNextButtonClick)
  }

  // Manejar cambios de tamaño de ventana
  window.addEventListener("resize", () => {
    const newIsMobile = window.innerWidth <= 768
    if (newIsMobile !== isMobile) {
      location.reload() // Recargar la página si cambia entre móvil y desktop
    }
  })
})









