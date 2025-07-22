// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFAQ();
    initContactForm();
    initCountdown();
    initSmoothScroll();
    initNavbar();
    initCarousel();
    applyPhoneMask();
});

// FAQ Accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const pacote = document.getElementById('pacote').value;
        const observacoes = document.getElementById('observacoes').value.trim();
        
        // Validation
        if (!nome || !whatsapp || !email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        if (!validatePhone(whatsapp)) {
            alert('Por favor, insira um WhatsApp válido.');
            return;
        }
        
        // Create WhatsApp message with correct packages
        const pacoteText = {
            'slim': 'Pacote Slim - R$ 570',
            'admirase': 'Pacote Admira-se - R$ 770',
            'gestante': 'Ensaio Sensual Gestante - R$ 470',
            'aniversario': 'Ensaio de Aniversário - R$ 570',
            'empresarial': 'Ensaio Empresarial - R$ 450'
        };

        let message = `Olá! Gostaria de agendar uma sessão de planejamento 💖\n\n`;
        message += `*Nome:* ${nome}\n`;
        message += `*WhatsApp:* ${whatsapp}\n`;
        message += `*E-mail:* ${email}\n`;
        if (pacote && pacoteText[pacote]) {
            message += `*Pacote de interesse:* ${pacoteText[pacote]}\n`;
        } else {
            message += `*Pacote de interesse:* Não selecionado\n`;
        }
        if (observacoes) {
            message += `*Observações:* ${observacoes}\n`;
        }
        message += `\nEspero retorno para agendarmos! ✨`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp URL with correct number
        const whatsappURL = `https://wa.me/5511969529607?text=${encodedMessage}`;
        
        // Show success message
        showSuccessMessage();
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            form.reset();
        }, 1500);
    });
}

// Package-specific WhatsApp functions
function agendarSlim() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Pacote Slim* (R$ 570). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarAdmirase() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Pacote Admira-se* (R$ 770). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarGestante() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio Sensual Gestante* (R$ 470). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarAniversario() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio de Aniversário* (R$ 570). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarEmpresarial() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio Empresarial* (R$ 450). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Brazilian format)
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <strong>✓ Mensagem enviada com sucesso!</strong><br>
        Você será redirecionada para o WhatsApp em instantes...
    `;
    
    form.appendChild(successDiv);
    
    // Remove success message after redirect
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Countdown functionality
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Reset to next week if countdown expires
            targetDate.setDate(targetDate.getDate() + 7);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Carousel functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => moveToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = Array.from(indicatorsContainer.children);
    
    // Move to slide function
    function moveToSlide(targetIndex) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === targetIndex);
        });
        
        currentSlide = targetIndex;
    }
    
    // Next button
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    });
    
    // Previous button
    prevButton.addEventListener('click', () => {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        moveToSlide(prevIndex);
    });
    
    // Auto-play (optional)
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 5000);
    
    // Touch support for mobile
    let startX = null;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        if (startX === null) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextButton.click();
            } else {
                prevButton.click();
            }
        }
        
        startX = null;
    });
    
    // Lightbox functionality
    slides.forEach(slide => {
        const img = slide.querySelector('.carousel-img');
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Form input mask for phone
function applyPhoneMask() {
    const phoneInput = document.getElementById('whatsapp');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, function(_, p1, p2, p3) {
                    return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
                });
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, function(_, p1, p2, p3) {
                    return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
                });
            }
        }
        
        e.target.value = value;
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        this.classList.toggle('active');
    });
}

// Intersection Observer for animations
const observeElements = () => {
    const elements = document.querySelectorAll('.benefit-item, .package-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', observeElements);

// Analytics tracking (optional)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track form submissions and package clicks
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', 'contact', 'lead_generation');
        });
    }
    
    // Track package button clicks
    const packageButtons = document.querySelectorAll('[onclick*="agendar"]');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.textContent.trim();
            trackEvent('package_click', 'conversion', packageName);
        });
    });
});
