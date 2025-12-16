// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const backdrop = document.querySelector('.mobile-menu-backdrop');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        if (backdrop) backdrop.classList.toggle('active');
    });

    // Close menu when clicking backdrop
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            backdrop.classList.remove('active');
        });
    }

    // Close menu when clicking nav links (only non-dropdown parent links)
    navLinks.forEach(link => {
        if (!link.closest('.nav-dropdown')) {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                if (backdrop) backdrop.classList.remove('active');
            });
        }
    });

    // Close menu when clicking dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
        });
    });
}

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    }
});

// Smooth scroll for anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections for animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .service-card, .advantage-item, .vgl-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection} `) {
            link.classList.add('active');
        }
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        this.style.transform = 'scale(0.95) translateY(-3px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Console log
console.log('Abadi Gas website loaded successfully! ✅');

