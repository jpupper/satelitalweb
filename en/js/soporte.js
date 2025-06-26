document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todas las tarjetas
  const cards = document.querySelectorAll(".service-card")

  // Remover cualquier clase o estilo que pueda interferir
  cards.forEach((card) => {
    const content = card.querySelector(".card-content")
    // Mantener solo la clase visible
    content.className = "card-content visible"
  })

  // Seleccionar todos los botones plus
  const plusButtons = document.querySelectorAll(".plus-btn")

  // Añadir evento click a cada botón
  plusButtons.forEach((button) => {
    // Asegurarnos de que el botón comience con el símbolo +
    button.textContent = "+"

    button.addEventListener("click", () => {
      // Encontrar la descripción y el icono dentro de la misma card
      const card = button.closest(".service-card")
      const description = card.querySelector(".card-description")
      const cardIcono = card.querySelector(".card-icono")

      // Toggle de la clase visible
      description.classList.toggle("visible")

      // Cambiar el contenido del botón
      if (description.classList.contains("visible")) {
        const minusSpan = document.createElement("span")
        minusSpan.className = "minus-symbol"
        button.textContent = "" // Limpiar el contenido actual
        button.appendChild(minusSpan)
      } else {
        button.textContent = "+"
      }
    })
  })
})

