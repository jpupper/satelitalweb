// Array con las rutas de las imágenes
const geoImages = [
  "assets/geoespacial/1.jpg",
  "assets/geoespacial/2.jpg",
  "assets/geoespacial/3.jpg",
  "assets/geoespacial/4.jpg",
]

let geoCurrentImageIndex = 0

// Función para cambiar la imagen
function changeBackgroundImage() {
  const heroSection = document.querySelector(".hero-geoespacial")
  if (!heroSection) return

  // Precargar la siguiente imagen
  const nextImage = new Image()
  geoCurrentImageIndex = (geoCurrentImageIndex + 1) % geoImages.length
  nextImage.src = geoImages[geoCurrentImageIndex]

  nextImage.onload = () => {
    heroSection.style.backgroundImage = `url('${geoImages[geoCurrentImageIndex]}')`
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-geoespacial")
  if (!heroSection) return

  // Cargar primera imagen
  heroSection.style.backgroundImage = `url('${geoImages[0]}')`

  // Iniciar el cambio de imágenes
  setInterval(changeBackgroundImage, 4000)
})
