document.addEventListener('DOMContentLoaded', function() {
    // Event details
    const eventDetails = {
        date: new Date('2025-06-14T10:00:00'),
        title: 'Encuentro de Iglesias',
        activities: [
            'Testimonios',
            'Cantos de alabanza', 
            'Lectura bíblica',
            'Sketches',
            'Ayuno y oración'
        ],
        churches: ['El Arca', 'Emanuel', 'Ministerio Palabra de Dios']
    };

    // Función debounce para optimizar eventos
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Countdown functionality
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const now = new Date().getTime();
        const eventTime = eventDetails.date.getTime();
        const distance = eventTime - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<div class="countdown-item"><span class="countdown-number">¡HOY!</span></div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Días</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Min</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seg</span>
            </div>
        `;
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Mapa con Leaflet
    const mapElement = document.getElementById('mapa');
    if (mapElement) {
        try {
            const lat = -31.5329083;
            const lng = -68.50687854937222;
            
            const map = L.map('mapa', {
                zoomControl: true,
                scrollWheelZoom: false,
                maxZoom: 18,
                minZoom: 12,
                dragging: !L.Browser.mobile
            }).setView([lat, lng], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup("<b>Encuentro de Iglesias</b><br>¡Te esperamos aquí!").openPopup();
        } catch (error) {
            console.error('Error al cargar el mapa:', error);
            mapElement.innerHTML = '<p style="padding: 50px; text-align: center; color: #667eea;">Error al cargar el mapa. <br><button onclick="openGoogleMaps()" class="location-btn" style="margin-top: 15px;">Ver en Google Maps</button></p>';
        }
    }

    // Función global para confirmar asistencia
    window.confirmAssistance = function() {
        const message = `¡Hola! Quiero confirmar mi asistencia al Encuentro de Iglesias del 14 de Junio.`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        
        if (confirm('¿Quieres confirmar tu asistencia por WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
    };

    // Función para abrir Google Maps
    window.openGoogleMaps = function() {
        const lat = -31.5329083;
        const lng = -68.50687854937222;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    };

    // Botón volver arriba
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        scrollTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }, 150));

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'forwards';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.event-card, .participation-card, .activity-card, .church-card').forEach(card => {
        observer.observe(card);
    });

    // Efectos en las tarjetas de iglesias
    const churchItems = document.querySelectorAll('.church-card');
    churchItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.05)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16));

    // Add click effects to activity cards
    document.querySelectorAll('.activity-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Efecto de ondas en el botón CTA
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Efecto de partículas en el countdown
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 3s ease-out forwards;
        `;
        
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.appendChild(particle);
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    // Crear partículas ocasionalmente
    setInterval(createParticle, 2000);

    // Efecto de hover mejorado para info-items
    document.querySelectorAll('.info-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fff 0%, #f8faff 100%)';
            this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)';
            this.style.boxShadow = 'none';
        });
    });

    console.log('🙏 Invitación web cargada exitosamente');
    console.log('📅 Evento:', eventDetails.date.toLocaleDateString('es-ES'));
    console.log('⛪ Iglesias participantes:', eventDetails.churches.join(', '));
    console.log('🗺️ Ubicación configurada: San Juan, Argentina');
});