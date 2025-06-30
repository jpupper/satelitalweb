document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor principal del footer
    const footerHTML = `
        <section id="clients-section" class="clientes-section">
            <h1><span data-i18n="clientes_titulo">Nuestros Clientes</span></h1>
            
            <!-- Contenedor para vista desktop -->
            <div class="logos-container desktop-logos">
                <!-- Columna 1 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/energy.png" alt="Glencore Pachón" class="client-logo" >
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/teck.png" alt="Teck" class="client-logo" id="teck">
                    </div>
                </div>

                <!-- Columna 2 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/solfrut.png" alt="SolFrut" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/ypf.png" alt="YPF Luz" class="client-logo">
                    </div>
                </div>

                <!-- Columna 3 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/fortescue.png" alt="Fortescue" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/mcewen.png" alt="McEwen Copper" class="client-logo">
                    </div>
                </div>

                <!-- Columna 4 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/minasargentinas.png" alt="minas" class="client-logo" id="minas">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/banco.png" alt="Banco San Juan" class="client-logo" id="banco">
                    </div>
                </div>

                <!-- Columna 5 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/barrick.png" alt="Barrick" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/glenore.png" alt="360 glencore" class="client-logo" id="glencore">
                    </div>
                </div>

                <!-- Columna 6 -->
                <div class="logo-column">
                    <!-- Espacio para un segundo logo si se necesita -->
                </div>
            </div>
            
            <!-- Contenedor para vista móvil -->
            <div class="logos-container mobile-logos">
                <!-- Columna 1 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/energy.png" alt="Glencore Pachón" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/teck.png" alt="Teck" class="client-logo" id="teck">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/minasargentinas.png" alt="minas" class="client-logo" id="minas">
                    </div>
                </div>

                <!-- Columna 2 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/solfrut.png" alt="SolFrut" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/ypf.png" alt="YPF Luz" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/barrick.png" alt="Barrick" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/glenore.png" alt="360 glencore" class="client-logo" id="glencore">
                    </div>
                </div>

                <!-- Columna 3 -->
                <div class="logo-column">
                    <div class="logo-item">
                        <img src="assets/logos/fortescue.png" alt="Fortescue" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/mcewen.png" alt="McEwen Copper" class="client-logo">
                    </div>
                    <div class="logo-item">
                        <img src="assets/logos/banco.png" alt="Banco San Juan" class="client-logo" id="banco">
                    </div>
                </div>
            </div>
        </section>

        <div id="contacto" class="contact-container">
            <h2 class="contact-title"><span data-i18n="nav_contacto">Contacto</span></h2>
            <div id="contact-section" class="contact-grid">
                <div class="contact-column">
                    <h3><span data-i18n="contacto_argentina">Argentina</span></h3>
                    <p><span data-i18n="contacto_bsas">Av. Libertador 2349 5º "A",<br>CABA, Buenos Aires</span></p>
                </div>
                <div class="contact-column">
                    <h3><span data-i18n="contacto_sanjuan">San Juan</span></h3>
                    <p><span data-i18n="contacto_sanjuan_capital">Esteban Echeverría 772 (sur),<br>Capital</span></p>
                    <p><span data-i18n="contacto_sanjuan_barreal">Huarpes 1226 (oeste),<br>Barreal, Calingasta</span></p>
                    <p><span data-i18n="contacto_sanjuan_iglesia">Calle Central y Calle 2,<br>Estancia Guañizuil, Iglesia</span></p>
                </div>
                <div class="contact-column">
                    <h3><span data-i18n="contacto_chile">Chile</span></h3>
                    <p><span data-i18n="contacto_chile_serena">Av. Pacífico 5103, Torre 1 / Dpto. 63<br>La Serena, Coquimbo</span></p>
                </div>
                <div class="contact-column">
                    <h3><span data-i18n="contacto_info">Información</span></h3>
                    <p><a href="mailto:contacto@ghmsatelital.ar">contacto@ghmsatelital.ar</a><br>
                    <a href="tel:+5492644558684">+54 9 2644558684</a></p>
                    <p><span data-i18n="contacto_trabajo">Trabaja con Nosotros</span>:<br>
                    <a href="mailto:info@ghmsatelital.ar">info@ghmsatelital.ar</a></p>
                </div>
            </div>
        </div>

        <div class="footer-container">
            <div class="footer-logo">
                <img src="assets/nav/logoghm.png" alt="GHM Satelital">
            </div>
            
            <div class="footer-content">
                <!-- Columna 1 -->
                <div class="footer-column">
                    <a href="#" class="footer-link"><span data-i18n="nav_conectividad">Conectividad</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_monitoreo">Monitoreo</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_gestion">Gestión IT</span></a>
                </div>

                <!-- Columna 2 -->
                <div class="footer-column">
                    <a href="#" class="footer-link"><span data-i18n="nav_mision">Misión</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_vision">Visión</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_valores">Valores</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_rse">RSE</span></a>
                </div>

                <!-- Columna 3 -->
                <div class="footer-column">
                    <a href="#" class="footer-link"><span data-i18n="nav_fotogrametria">Fotogrametría</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_termografia">Termografía</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_magnetometria">Magnetometría</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_batimetria">Batimetría</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_lidar">LiDAR</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_control">Control de Activos</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_procesamiento">Procesamiento de Datos</span></a>
                </div>

                <!-- Columna 4 -->
                <div class="footer-column">
                    <a href="#" class="footer-link"><span data-i18n="nav_soporte_24_7">Soporte 24/7</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_conectividad_estable">Conectividad Estable</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_soluciones">Soluciones Efectivas</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_cobertura">Cobertura Remota</span></a>
                    <a href="#" class="footer-link"><span data-i18n="nav_montana">Expertos en Alta Montaña</span></a>
                </div>

                <div class="footer-column">
                    <a href="#contact-section" class="footer-link"><span data-i18n="contacto_trabajo">Trabajá con nosotros</span></a>
                    <a href="#clients-section" class="footer-link"><span data-i18n="clientes_titulo">Clientes</span></a>
                </div>
            </div>
            
            <!-- Social links moved outside footer-content to be visible on mobile -->
            <div class="social-links">
                <a href="https://www.youtube.com/@GHMSATELITAL/shorts" class="social-link">
                    <img src="assets/redes/youtube.png" alt="YouTube">
                </a>
                <a href="https://ar.linkedin.com/company/ghm-satelital?trk=public_post_feed-actor-name" class="social-link">
                    <img src="assets/redes/linkedin.png" alt="LinkedIn">
                </a>
                <a href="https://www.instagram.com/ghmsatelital/" class="social-link">
                    <img src="assets/redes/instagram.png" alt="Instagram">
                </a>
            </div>
        </div>
        
        <div class="copyright-bar">
            <span data-i18n="copyright">ghm satelital © 2025 / Todos los derechos reservados</span>
        </div>
    `;

    // Insertar el footer antes del cierre del body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Agregar event listeners para los enlaces de la sección motiva
    setTimeout(() => {
        document.querySelectorAll('.motiva-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Si estamos en index.html
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    if (typeof window.navigateToMotiva === 'function') {
                        window.navigateToMotiva();
                    }
                } else {
                    // Si estamos en otra página, redirigir a index.html#motiva-section
                    window.location.href = 'index.html#motiva-section';
                }
            });
        });
    }, 100); // Esperar a que el DOM esté listo
});
