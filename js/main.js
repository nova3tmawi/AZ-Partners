document.addEventListener('DOMContentLoaded', function() {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    // On pages that are not the homepage, the navbar is always scrolled
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
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
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
});