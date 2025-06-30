// Función para crear y añadir el header
function createHeader() {
    const headerHTML = `
        <div class="top-navbar">
            <div class="container">
                <div class="right-links">
                    <a href="#contacto" id="botoncontacto" class="top-link">
                        <span data-i18n="nav_contacto">Contacto</span>
                        <img src="assets/nav/contacto.svg" alt="Email" class="top-icon">
                    </a>
                    <a href="#" class="top-link">
                        <span data-i18n="nav_clientes">Clientes | Login</span>
                        <img src="assets/nav/usuario.svg" alt="User" class="top-icon">
                    </a>
                    <button class="language-switch top-link" data-lang="es" onclick="switchLanguage('es')">
                        <span data-i18n="nav_spanish">ESP</span>
                    </button>
                    <p>|</p>
                    <button class="language-switch top-link" data-lang="en" onclick="switchLanguage('en')">
                        <span data-i18n="nav_english">ENG</span>
                    </button>
                </div>
            </div>
        </div>

        <nav id="main-nav">
            <div class="nav-links">
                <a href="nosotros.html" class="nav-link">
                    <span data-i18n="nav_nosotros">Nosotros</span>
                </a>
                <a href="servicios.html" class="nav-link">
                    <span data-i18n="nav_servicios">Servicios</span>
                </a>
                <a href="geosatelital.html" class="nav-link">
                    <span data-i18n="nav_geoespacial">Geoespacial</span>
                </a>
                <a href="soporte.html" class="nav-link">
                    <span data-i18n="nav_soporte">Soporte Técnico</span>
                </a>
            </div>
        </nav>

        <div class="hamburger-menu">
            <div class="hamburger-icon">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <div class="mobile-menu">
                <a href="#" class="mobile-link" data-page="inicio">
                    <span data-i18n="main_titulo">Conectividad + Monitoreo integral + Servicios tecnológicos innovadores</span>
                </a>
                <a href="#" class="mobile-link" data-page="nosotros">
                    <span data-i18n="nav_nosotros">Nosotros</span>
                </a>
                <a href="#" class="mobile-link" data-page="servicios">
                    <span data-i18n="servicios_titulo">Servicios</span>
                </a>
                <div class="mobile-submenu">
                    <a href="#conectividad" class="mobile-sublink">
                        <span data-i18n="servicios_conectividad">Conectividad</span>
                    </a>
                    <a href="#monitoreo" class="mobile-sublink">
                        <span data-i18n="servicios_monitoreo">Monitoreo</span>
                    </a>
                    <a href="#soporte" class="mobile-sublink">
                        <span data-i18n="nav_soporte">Soporte Técnico</span>
                    </a>
                </div>
                <a href="#" class="mobile-link" data-page="geosatelital">
                    <span data-i18n="geo_titulo">Geoespacial</span>
                </a>
                <a href="#" class="mobile-link" data-page="actualidad">
                    <span data-i18n="actualidad_titulo">Actualidad</span>
                </a>
            </div>
        </div>

        <div class="mobile-menu-overlay">
            <div class="mobile-menu-header">
                <img src="assets/nav/logoghm.png" alt="Logo" class="mobile-logo">
                <button class="mobile-menu-close" aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="mobile-menu-links">
                <a href="#" data-page="nosotros"><span data-i18n="nav_nosotros">Nosotros</span></a>
                <a href="#" data-page="servicios"><span data-i18n="servicios_titulo">Servicios</span></a>
                <a href="#" data-page="geosatelital"><span data-i18n="geo_titulo">Geoespacial</span></a>
                <a href="#" data-page="soporte"><span data-i18n="nav_soporte">Soporte Técnico</span></a>
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

    // Inicializar el menú hamburguesa después de crear el header
    const hamburger = document.querySelector('.hamburger-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    // Manejar la navegación
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            const currentLang = localStorage.getItem('selectedLanguage') || 'es';
            window.location.href = `${page}.html`;
        });
    });

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('active');
            }
        });
    }

    if (mobileMenuClose && mobileMenuOverlay) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    }
}

// Inicializar el header cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createHeader);
} else {
    createHeader();
}
