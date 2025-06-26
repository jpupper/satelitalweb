// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Array con las rutas de las imágenes - Asegúrate que estas rutas sean correctas
    const images = [
      "assets/nosotros/principal.png", // Sin ../ si estás en la raíz
      "assets/nosotros/principal2.png", // Ajusta esta ruta a tu segunda imagen
    ]
  
    let currentImageIndex = 0
    const heroSection = document.querySelector(".hero-nosotros")
  
    // Asegúrate que la primera imagen esté cargada desde el inicio
    heroSection.style.backgroundImage = `url('${images[0]}')`
  
    // Función para cambiar la imagen
    function changeBackgroundImage() {
      // Precargar la siguiente imagen
      const nextImage = new Image()
      currentImageIndex = (currentImageIndex + 1) % images.length
      nextImage.src = images[currentImageIndex]
  
      nextImage.onload = () => {
        heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`
      }
    }
  
    // Iniciar el cambio de imágenes después de que todo esté cargado
    setInterval(changeBackgroundImage, 4000)
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todas las cards
    const cards = document.querySelectorAll(".motivation-card")
  
    // Por cada card, agregamos el event listener al botón
    cards.forEach((currentCard) => {
      // Encontramos el botón dentro de esta card específica
      const button = currentCard.querySelector(".expand-button")
  
      // Agregamos el event listener al botón
      button.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
  
        // Primero, cerramos todas las cards con una transición suave
        cards.forEach((card) => {
          if (card !== currentCard) {
            card.classList.remove("expanded")
            card.querySelector(".expand-button").textContent = "+"
            // Aseguramos que la descripción se oculte suavemente
            const description = card.querySelector(".card-description")
            description.style.opacity = "0"
            description.style.maxHeight = "0"
          }
        })
  
        // Luego, hacemos toggle de la card actual
        const isCurrentlyExpanded = currentCard.classList.contains("expanded")
        const description = currentCard.querySelector(".card-description")
  
        if (isCurrentlyExpanded) {
          currentCard.classList.remove("expanded")
          button.textContent = "+"
          description.style.opacity = "0"
          description.style.maxHeight = "0"
        } else {
          currentCard.classList.add("expanded")
          button.textContent = "-"
          description.style.opacity = "1"
          description.style.maxHeight = "500px"
        }
      })
    })
  })
  
  