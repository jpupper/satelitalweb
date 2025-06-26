document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor principal del footer
    const footerHTML = `
        <section id="clients-section" class="clientes-section">
            <h1>Nuestros Clientes</h1>
            
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
            <h2 class="contact-title">Contacto</h2>
            <div id="contact-section" class="contact-grid">
                <div class="contact-column">
                    <h3>Argentina</h3>
                    <p>Av. Libertador 2349 5º "A",<br>CABA, Buenos Aires</p>
                </div>
                <div class="contact-column">
                    <h3>San Juan</h3>
                    <p>Esteban Echeverría 772 (sur),<br>Capital</p>
                    <p>Huarpes 1226 (oeste),<br>Barreal, Calingasta</p>
                    <p>Calle Central y Calle 2,<br>Estancia Guañizuil, Iglesia</p>
                </div>
                <div class="contact-column">
                    <h3>Chile</h3>
                    <p>Av. Pacífico 5103, Torre 1 / Dpto. 63<br>La Serena, Coquimbo</p>
                </div>
                <div class="contact-column">
                    <h3>Información</h3>
                    <p><a href="mailto:contacto@ghmsatelital.ar">contacto@ghmsatelital.ar</a><br>
                    <a href="tel:+5492644558684">+54 9 2644558684</a></p>
                    <p>Trabaja con Nosotros:<br>
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
                    <a href="servicios.html#conectividad-section" class="footer-link">Conectividad</a>
                    <a href="servicios.html#monitoreo-section" class="footer-sublink">Monitoreo</a>
                    <a href="servicios.html#gestion-it-section" class="footer-sublink">Gestión IT</a>
                </div>

                <!-- Columna 2 -->
                <div class="footer-column">
                    <a href="index.html" class="footer-link motiva-link">Misión</a>
                    <a href="index.html" class="footer-link motiva-link">Visión</a>
                    <a href="index.html" class="footer-link motiva-link">Valores</a>
                    <a href="nosotros.html#news-section" class="footer-link">Actualidad</a>
                </div>

                <!-- Columna 3 -->
                <div class="footer-column">
                    <a href="geoespacial.html#fotogrametria-section" class="footer-link">Fotogrametría</a>
                    <a href="geoespacial.html#termografia-section" class="footer-link">Termografía</a>
                    <a href="geoespacial.html#magnetometria-section" class="footer-link">Magnetometría</a>
                    <a href="geoespacial.html#batimetria-section" class="footer-link">Batimetría</a>
                    <a href="geoespacial.html#lidar-section" class="footer-link">LiDAR</a>
                    <a href="geoespacial.html#control-activos-section" class="footer-link">Control de Activos</a>
                    <a href="geoespacial.html#procesamiento-datos-section" class="footer-link">Procesamiento de Datos</a>
                </div>

                <!-- Columna 4 -->
                <div class="footer-column">
                    <a href="soporte.html#support-card" class="footer-link">Soporte 24/7</a>
                    <a href="soporte.html#connectivity-card" class="footer-link">Conectividad Estable</a>
                    <a href="soporte.html#solutions-card" class="footer-link">Soluciones Efectivas</a>
                    <a href="soporte.html#coverage-card" class="footer-link">Cobertura Remota</a>
                    <a href="soporte.html#mountain-card" class="footer-link">Expertos en Alta Montaña</a>
                </div>

                <div class="footer-column">
                    <a href="#contact-section" class="footer-link">Trabajá con nosotros</a>
                    <a href="#clients-section" class="footer-link">Clientes</a>
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
            ghm satelital © 2025 / Todos los derechos reservados
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
