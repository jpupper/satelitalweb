document.addEventListener("DOMContentLoaded", () => {
    const mainNav = document.getElementById("main-nav")
    const topNavbar = document.querySelector(".top-navbar")
    const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
    let lastScrollTop = 0
  
    // Handle scroll behavior for navigation
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        topNavbar.classList.add("hidden")
        mainNav.classList.add("at-top")
  
        // Update mobile menu position when scrolled down
        if (scrollTop > 40) {
          mobileMenuOverlay.classList.add("at-top")
        }
      } else {
        // Scrolling up
        if (scrollTop <= 40) {
          topNavbar.classList.remove("hidden")
          mainNav.classList.remove("at-top")
          mobileMenuOverlay.classList.remove("at-top")
        }
      }
      lastScrollTop = scrollTop
    })
  
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector(".mobile-menu-button")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
    const body = document.body
  
    mobileMenuButton.addEventListener("click", () => {
      mobileMenuOverlay.classList.add("active")
      mobileMenuButton.classList.add("active")
      body.style.overflow = "hidden" // Prevent scrolling when menu is open
  
      // Check current scroll position when opening menu and apply appropriate class
      if (window.scrollY > 40) {
        mobileMenuOverlay.classList.add("at-top")
      } else {
        mobileMenuOverlay.classList.remove("at-top")
      }
  
      // Añadir delay a los elementos del menú para la animación
      const menuLinks = document.querySelectorAll(".mobile-menu-links a")
      menuLinks.forEach((link, index) => {
        link.style.transitionDelay = `${0.1 + index * 0.1}s`
      })
  
      // Añadir delay a los iconos sociales
      const socialIcons = document.querySelectorAll(".mobile-social-links .social-icon")
      socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = `${0.3 + index * 0.1}s`
      })
    })
  
    mobileMenuClose.addEventListener("click", () => {
      mobileMenuOverlay.classList.remove("active")
      mobileMenuButton.classList.remove("active")
      body.style.overflow = "" // Re-enable scrolling
  
      // Resetear los delays para la próxima apertura
      const menuLinks = document.querySelectorAll(".mobile-menu-links a")
      menuLinks.forEach((link) => {
        link.style.transitionDelay = ""
      })
  
      const socialIcons = document.querySelectorAll(".mobile-social-links .social-icon")
      socialIcons.forEach((icon) => {
        icon.style.transitionDelay = ""
      })
    })
  
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuOverlay.classList.remove("active")
        mobileMenuButton.classList.remove("active")
        body.style.overflow = ""
      })
    })
  
    // Verificar la posición inicial del scroll
    if (window.scrollY > 40) {
      mobileMenuOverlay.classList.add("at-top")
      mainNav.classList.add("at-top")
      topNavbar.classList.add("hidden")
    }
  })
  
  
  
  