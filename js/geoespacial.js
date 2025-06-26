
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Array con las rutas de las imágenes - Asegúrate que estas rutas sean correctas
    const images = [
      "assets/geoespacial/1.jpg",
      "assets/geoespacial/2.jpg",
      "assets/geoespacial/3.jpg",
      "assets/geoespacial/4.jpg",
        ]
  
    let currentImageIndex = 0
    const heroSection = document.querySelector(".hero-geoespacial")
  
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
  
