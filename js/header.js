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
                    <button class="language-switch top-link" data-lang="es">
                        <span data-i18n="nav_spanish">ESP</span>
                    </button>
                    <p>|</p>
                    <button class="language-switch top-link" data-lang="en">
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
                <a href="geoespacial.html" class="nav-link">
                    <span data-i18n="nav_geoespacial">Geoespacial</span>
                </a>
                <a href="soporte.html" class="nav-link">
                    <span data-i18n="nav_soporte">Soporte Técnico</span>
                </a>
            </div>
            <button class="mobile-menu-button">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>



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
                <a href="#" data-page="geoespacial"><span data-i18n="geo_titulo">Geoespacial</span></a>
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

    // Inicializar el menú móvil y los botones de idioma después de crear el header
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const languageButtons = document.querySelectorAll('.language-switch');
    const mainNav = document.getElementById('main-nav');
    const topNavbar = document.querySelector('.top-navbar');
    let lastScrollTop = 0;

    // Configurar los botones de idioma
    languageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (typeof switchLanguage === 'function') {
                switchLanguage(lang);
                // Actualizar el estado visual de los botones
                languageButtons.forEach(btn => {
                    btn.classList.toggle('active-language', btn.getAttribute('data-lang') === lang);
                });
            }
        });
    });

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

    // Handle scroll behavior for navigation
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            topNavbar.classList.add('hidden');
            mainNav.classList.add('at-top');

            // Update mobile menu position when scrolled down
            if (scrollTop > 40) {
                mobileMenuOverlay.classList.add('at-top');
            }
        } else {
            // Scrolling up
            if (scrollTop <= 40) {
                topNavbar.classList.remove('hidden');
                mainNav.classList.remove('at-top');
                mobileMenuOverlay.classList.remove('at-top');
            }
        }
        lastScrollTop = scrollTop;
    });

    // Mobile menu functionality
    if (mobileMenuButton && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            mobileMenuButton.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Re-apply translations when opening menu
            const currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
            if (typeof applyLanguage === 'function') {
                applyLanguage(currentLanguage);
            }

            // Check current scroll position when opening menu and apply appropriate class
            if (window.scrollY > 40) {
                mobileMenuOverlay.classList.add('at-top');
            } else {
                mobileMenuOverlay.classList.remove('at-top');
            }

            // Add delay to menu items for animation
            const menuLinks = document.querySelectorAll('.mobile-menu-links a');
            menuLinks.forEach((link, index) => {
                link.style.transitionDelay = `${0.1 + index * 0.1}s`;
            });

            // Add delay to social icons
            const socialIcons = document.querySelectorAll('.mobile-social-links .social-icon');
            socialIcons.forEach((icon, index) => {
                icon.style.transitionDelay = `${0.3 + index * 0.1}s`;
            });
        });
    }

    if (mobileMenuClose && mobileMenuOverlay) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            document.body.style.overflow = '';

            // Reset delays for next opening
            const menuLinks = document.querySelectorAll('.mobile-menu-links a');
            menuLinks.forEach(link => {
                link.style.transitionDelay = '';
            });

            const socialIcons = document.querySelectorAll('.mobile-social-links .social-icon');
            socialIcons.forEach(icon => {
                icon.style.transitionDelay = '';
            });
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Check initial scroll position
    if (window.scrollY > 40) {
        mobileMenuOverlay.classList.add('at-top');
        mainNav.classList.add('at-top');
        topNavbar.classList.add('hidden');
    }
}

// Inicializar el header cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createHeader);
} else {
    createHeader();
}
