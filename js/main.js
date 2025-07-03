document.addEventListener('DOMContentLoaded', function() {
    
    // --- Dynamic Active Navbar Link ---
    const currentLocation = window.location.pathname.split('/').pop();
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        if (currentLocation === 'index.html' || currentLocation === '') {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        } else {
            if (link.getAttribute('href') === currentLocation) {
                link.classList.add('active');
            }
        }
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (document.body.contains(document.getElementById('hero'))) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        navbar.classList.add('scrolled');
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksList = document.getElementById('nav-links-list'); 

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.classList.toggle('active');
        navLinksList.classList.toggle('active');
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
            menuToggle.setAttribute('aria-label', 'Close navigation menu');
        } else {
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });

    // --- Animate on Scroll ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        sectionObserver.observe(el);
    });
    
    // --- Automatic Copyright Year ---
    const copyrightYearSpan = document.querySelector('.copyright-year');
    if(copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});