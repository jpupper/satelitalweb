function createStars() {
  const stars = document.getElementById("stars")
  const numberOfStars = 200

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div")
    const size = Math.random() * 2

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
        `

    const keyframes = `
        @keyframes twinkle {
            0%, 100% { opacity: ${Math.random()}; }
            50% { opacity: ${Math.random() * 0.3}; }
        }`

    const styleSheet = document.createElement("style")
    styleSheet.textContent = keyframes
    document.head.appendChild(styleSheet)

    stars.appendChild(star)
  }
}

const section1 = document.getElementById("section1")
const section2 = document.getElementById("section2")
const section3 = document.getElementById("section3")
let currentSection = 1
let isAnimating = false
let hasExpanded = false
let touchStartY = 0
let touchStartX = 0
let scrollAccumulator = 0
const SCROLL_THRESHOLD = 100
// Detectar si es un dispositivo móvil
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// Umbral MUCHO más bajo para dispositivos móviles (5 en lugar de 15)
const TOUCH_THRESHOLD = isMobileDevice ? 5 : 30
let isScrollEnabled = true
let isNavigatingBack = false

// Inicialmente bloqueamos el scroll de manera más efectiva
document.body.style.overflow = "hidden"
document.documentElement.style.overflow = "hidden"
document.body.style.position = "fixed"
document.body.style.width = "100%"
document.body.style.height = "100%"

function animateToSection(sectionNumber) {
  if (isAnimating || !isScrollEnabled) return
  isAnimating = true
  isScrollEnabled = false

  // Bloquear scroll de manera más efectiva para móviles
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"
  document.body.style.position = "fixed"
  document.body.style.width = "100%"
  document.body.style.height = "100%"

  const currentElement = document.getElementById(`section${currentSection}`)
  const nextElement = document.getElementById(`section${sectionNumber}`)

  currentElement.classList.remove("visible")
  currentElement.style.opacity = "0"

  setTimeout(() => {
    currentElement.style.visibility = "hidden"
    nextElement.style.visibility = "visible"
    nextElement.style.opacity = "1"
    nextElement.classList.add("visible")

    if (sectionNumber === 3 && !isNavigatingBack) {
      const cards = nextElement.querySelectorAll(".card")
      cards.forEach((card, index) => {
        card.style.transform = "scale(0)"
        setTimeout(() => {
          card.style.transform = "scale(1)"
        }, index * 200)
      })
    }

    setTimeout(() => {
      isAnimating = false
      isNavigatingBack = false

      // Desbloquear scroll solo si estamos en sección 3 expandida
      if (sectionNumber === 3 && hasExpanded) {
        document.body.style.overflow = "auto"
        document.documentElement.style.overflow = "auto"
        document.body.style.position = ""
        document.body.style.width = ""
        document.body.style.height = ""
      }

      // Habilitar navegación después de 1 segundo
      setTimeout(() => {
        isScrollEnabled = true
      }, 1000)
    }, 1200)

    currentSection = sectionNumber
  }, 800)
}

function handleScroll(delta) {
  if (isAnimating || !isScrollEnabled) return

  // Verificamos si estamos en la sección 3 expandida y el usuario intenta ir hacia atrás
  if (currentSection === 3 && hasExpanded && delta < 0) {
    // Solo permitimos navegar hacia atrás si estamos en la parte superior
    if (window.scrollY > 10) {
      return
    }
  }

  // Acumulamos más rápido en dispositivos móviles
  scrollAccumulator += isMobileDevice ? Math.abs(delta) * 2 : Math.abs(delta)

  // Umbral más bajo para dispositivos móviles
  const effectiveThreshold = isMobileDevice ? SCROLL_THRESHOLD / 2 : SCROLL_THRESHOLD

  if (scrollAccumulator >= effectiveThreshold) {
    if (delta > 0) {
      if (currentSection === 3 && !hasExpanded) {
        const cards = section3.querySelectorAll(".card")
        cards.forEach((card) => {
          card.style.transform = "scale(1)"
        })

        setTimeout(() => {
          section3.classList.add("expanded")
          hasExpanded = true

          // Agregamos un segundo de delay antes de habilitar el scroll
          setTimeout(() => {
            document.body.style.overflow = "auto"
            document.documentElement.style.overflow = "auto"
            document.body.style.position = ""
            document.body.style.width = ""
            document.body.style.height = ""
            isScrollEnabled = true
          }, 1000)
        }, 1000)
        isScrollEnabled = false
      } else if (currentSection < 3) {
        isNavigatingBack = false
        animateToSection(currentSection + 1)
      }
    } else if (delta < 0) {
      if (currentSection > 1) {
        if (currentSection === 3 && hasExpanded) {
          // Verificamos nuevamente si estamos en la parte superior
          if (window.scrollY <= 10) {
            const cards = section3.querySelectorAll(".card")
            cards.forEach((card) => {
              card.style.transform = "scale(1)"
            })

            section3.classList.remove("expanded")
            hasExpanded = false

            // Bloquear scroll de manera más efectiva
            document.body.style.overflow = "hidden"
            document.documentElement.style.overflow = "hidden"
            document.body.style.position = "fixed"
            document.body.style.width = "100%"
            document.body.style.height = "100%"

            setTimeout(() => {
              isNavigatingBack = true
              isScrollEnabled = true
              animateToSection(currentSection - 1)
            }, 500)
          }
        } else {
          isNavigatingBack = true
          animateToSection(currentSection - 1)
        }
      }
    }
    scrollAccumulator = 0
  }
}

function handleWheel(event) {
  if (!isScrollEnabled) {
    event.preventDefault()
    return
  }

  // Si estamos en la sección 3 expandida
  if (currentSection === 3 && hasExpanded) {
    // Si intentamos ir hacia arriba y no estamos en la parte superior, permitimos el scroll normal
    if (event.deltaY < 0 && window.scrollY > 10) {
      return
    }
    // Si vamos hacia abajo o estamos en la parte superior, manejamos normalmente
    if (event.deltaY > 0) {
      return
    }
  }

  event.preventDefault()
  handleScroll(event.deltaY)
}

function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY
  touchStartX = event.touches[0].clientX
  scrollAccumulator = 0
}

function handleTouchMove(event) {
  if (isAnimating) {
    event.preventDefault()
    return
  }

  const touchEndY = event.touches[0].clientY
  const touchEndX = event.touches[0].clientX

  const deltaY = touchStartY - touchEndY
  const deltaX = Math.abs(touchStartX - touchEndX)

  // Solo procesamos gestos verticales (ignoramos horizontales)
  if (Math.abs(deltaY) > deltaX) {
    // Siempre prevenimos el comportamiento predeterminado excepto cuando estamos
    // en la sección 3 expandida y deslizamos hacia abajo
    if (!(currentSection === 3 && hasExpanded && deltaY > 0 && window.scrollY > 0)) {
      event.preventDefault()
    }

    // Si no estamos en animación y el scroll está habilitado
    if (isScrollEnabled) {
      // Acumulamos más rápido para que se necesiten menos deslizamientos
      scrollAccumulator += Math.abs(deltaY) * 1.5

      if (scrollAccumulator >= TOUCH_THRESHOLD) {
        // Si estamos en sección 3 expandida y deslizamos hacia arriba
        if (currentSection === 3 && hasExpanded && deltaY < 0) {
          // Solo permitimos navegar hacia atrás si estamos en la parte superior
          if (window.scrollY <= 10) {
            handleScroll(deltaY)
          }
        } else {
          handleScroll(deltaY)
        }

        scrollAccumulator = 0
        touchStartY = touchEndY
      }
    }
  }
}

function handleTouchEnd() {
  // Si acumulamos algo pero no llegamos al umbral, lo reseteamos
  scrollAccumulator = 0
}

// Event Listeners
window.addEventListener("wheel", handleWheel, { passive: false })
window.addEventListener("touchstart", handleTouchStart, { passive: false })
window.addEventListener("touchmove", handleTouchMove, { passive: false })
window.addEventListener("touchend", handleTouchEnd, { passive: true })

// Inicializar las estrellas
createStars()

// Agregar un log para verificar si detecta correctamente el dispositivo móvil
console.log("¿Es dispositivo móvil?", isMobileDevice)





