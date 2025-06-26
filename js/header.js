document.addEventListener('DOMContentLoaded', function() {
    // Crear el header HTML
    const headerHTML = `
        <div class="top-navbar">
            <div class="container">
                <div class="right-links">
                    <a href="#contacto" id="botoncontacto" class="top-link">Contacto <img src="assets/nav/contacto.svg" alt="Email" class="top-icon"></a>
                    <a href="#" class="top-link">Clientes | Login <img src="assets/nav/usuario.svg" alt="User" class="top-icon"></a>
                    <a href="index.html" class="top-link">ESP</a><p>|</p>
                    <a href="en/index.html" class="top-link">ENG</a>
                </div>
            </div>
        </div>

        <nav id="main-nav">
            <div class="nav-links">
                <a href="nosotros.html">Nosotros</a>
                <a href="servicios.html">Servicios</a>
                <a href="geoespacial.html">Geoespacial</a>
                <a href="soporte.html">Soporte Técnico</a>
            </div>
            <a href="index.html"><img src="assets/nav/logoghm.png" alt="Logo" class="logo" /></a>
            <button class="mobile-menu-button" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>

        <div class="mobile-menu-overlay">
            <div class="mobile-menu-header">
                <img src="assets/nav/logoghm.png" alt="Logo" class="mobile-logo" />
                <button class="mobile-menu-close" aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="mobile-menu-links">
                <a href="nosotros.html">Nosotros</a>
                <a href="servicios.html">Servicios</a>
                <a href="geoespacial.html">Geoespacial</a>
                <a href="soporte.html">Soporte Técnico</a>
            </div>
            <div class="mobile-social-links">
                <a href="https://www.youtube.com/@GHMSATELITAL/shorts" class="social-icon">
                    <img src="assets/redes/youtube.png" alt="YouTube">
                </a>
                <a href="https://ar.linkedin.com/company/ghm-satelital?trk=public_post_feed-actor-name" class="social-icon">
                    <img src="assets/redes/linkedin.png" alt="LinkedIn">
                </a>
                <a href="https://www.instagram.com/ghmsatelital/" class="social-icon">
                    <img src="assets/redes/instagram.png" alt="Instagram">
                </a>
            </div>
        </div>
    `;

    // Insertar el header al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});
