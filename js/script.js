const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

class GalleryFilter {
    constructor() {
        this.tabs = document.querySelectorAll('.gallery__tab');
        this.items = document.querySelectorAll('.gallery__item');
        this.init();
    }
    
    init() {
        if (this.tabs.length === 0) return;
        
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.filterItems(tab.dataset.tab));
        });
    }
    
    filterItems(category) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${category}"]`).classList.add('active');
        
        this.items.forEach(item => {
            const itemCategory = item.dataset.category;
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
        this.form.reset();
    }
    
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message--${type}`;
        messageDiv.textContent = message;
        
        this.form.insertBefore(messageDiv, this.form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

function scrollActive() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}

function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        this.reveal();
        window.addEventListener('scroll', () => this.reveal());
    }
    
    reveal() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
}

function setupCertificationAnimations() {
    const certLogos = document.querySelectorAll('.cert__logo');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    certLogos.forEach(logo => observer.observe(logo));
}

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.stat__item, .service__card, .course__card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function setupLandingPageAnimations() {
    const heroElements = document.querySelectorAll('.home__content > *');
    const statsItems = document.querySelectorAll('.stat__item');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
    
    statsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150 + 800);
    });
}

function setupHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
        
        lastScrollTop = scrollTop;
    });
}

function setupPerformanceOptimizations() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    const criticalImages = [
        'Images/carousel-1.jpg',
        'Images/carousel-2.jpg',
        'Images/about.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

function setupImageErrorHandling() {
    const profileImages = document.querySelectorAll('.story__img, .team__img');
    
    profileImages.forEach(img => {
        img.addEventListener('error', function() {
            createDefaultAvatar(this);
        });
        
        if (img.complete && img.naturalHeight === 0) {
            createDefaultAvatar(img);
        }
    });
    
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.classList.contains('story__img') && !this.classList.contains('team__img')) {
                this.style.display = 'none';
            }
        });
    });
}

function createDefaultAvatar(imgElement) {
    const altText = imgElement.alt || 'User';
    const initials = getInitials(altText);
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = imgElement.className + ' default-avatar';
    avatarDiv.textContent = initials;
    avatarDiv.style.cssText = `
        width: ${imgElement.offsetWidth || 60}px;
        height: ${imgElement.offsetHeight || 60}px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: var(--white-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        border: 3px solid var(--primary-color);
        flex-shrink: 0;
    `;
    
    imgElement.parentNode.replaceChild(avatarDiv, imgElement);
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}

function setupAccessibility() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
            }
        }
    });
}

function setupScrollEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new GalleryFilter();
    new ContactForm();
    new ScrollReveal();
    
    setupSmoothScrolling();
    setupCertificationAnimations();
    setupScrollAnimations();
    setupLandingPageAnimations();
    setupHeaderScroll();
    setupPerformanceOptimizations();
    setupImageErrorHandling();
    setupAccessibility();
    
    const throttledScrollActive = throttle(scrollActive, 100);
    
    window.addEventListener('scroll', throttledScrollActive);
    
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    
    if (submitButton && contactForm) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'form__button-group';
        
        const resetButton = document.createElement('button');
        resetButton.type = 'reset';
        resetButton.className = 'btn btn--secondary';
        resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset';
        
        submitButton.parentNode.insertBefore(buttonContainer, submitButton);
        buttonContainer.appendChild(resetButton);
        buttonContainer.appendChild(submitButton);
        
        resetButton.addEventListener('click', function() {
            contactForm.reset();
            const formMessages = contactForm.querySelectorAll('.form-message');
            formMessages.forEach(msg => msg.remove());
        });
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GalleryFilter,
        ContactForm,
        setupSmoothScrolling,
        setupScrollAnimations
    };
}