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
                <div class="nav-item">
                    <a href="nosotros.html">Nosotros</a>
                    <div class="dropdown-menu">
                        <a href="index.html" class="motiva-link">Misión</a>
                        <a href="index.html" class="motiva-link">Visión</a>
                        <a href="index.html" class="motiva-link">Valores</a>
                        <a href="nosotros.html#news-section">Actualidad</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="servicios.html">Servicios</a>
                    <div class="dropdown-menu">
                        <a href="servicios.html#conectividad-section">Conectividad</a>
                        <a href="servicios.html#monitoreo-section">Monitoreo</a>
                        <a href="servicios.html#gestion-it-section">Gestión IT</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="geoespacial.html">Geoespacial</a>
                    <div class="dropdown-menu">
                        <a href="geoespacial.html#fotogrametria-section">Fotogrametría</a>
                        <a href="geoespacial.html#termografia-section">Termografía</a>
                        <a href="geoespacial.html#magnetometria-section">Magnetometría</a>
                        <a href="geoespacial.html#batimetria-section">Batimetría</a>
                        <a href="geoespacial.html#lidar-section">LiDAR</a>
                        <a href="geoespacial.html#control-activos-section">Control de Activos</a>
                        <a href="geoespacial.html#procesamiento-datos-section">Procesamiento de Datos</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="soporte.html">Soporte Técnico</a>
                    <div class="dropdown-menu">
                        <a href="soporte.html#support-card">Soporte 24/7</a>
                        <a href="soporte.html#connectivity-card">Conectividad Estable</a>
                        <a href="soporte.html#solutions-card">Soluciones Efectivas</a>
                        <a href="soporte.html#coverage-card">Cobertura Remota</a>
                        <a href="soporte.html#mountain-card">Expertos en Alta Montaña</a>
                    </div>
                </div>
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
