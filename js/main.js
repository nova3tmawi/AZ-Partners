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

    // --- Mobile Menu Toggle (ACCESSIBILITY ENHANCED) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksList = document.getElementById('nav-links-list'); // Target the UL by its new ID

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.classList.toggle('active');
        navLinksList.classList.toggle('active');
        
        // Update aria attributes for screen readers
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

    // --- Article Modal Logic ---
    const articleLinks = document.querySelectorAll('.article-list a');
    const modal = document.getElementById('article-modal');
    
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeButton = document.querySelector('.close-button');

        const articles = {
            "What We Learned Managing Emergency Shelters in Gaza": { title: "Lessons in Crisis: Managing Emergency Shelters in Gaza", content: `<p>Coordinating emergency shelter for over 10,000 displaced individuals...[content]...</p>` },
            "Lessons from Home-Based Income Projects for Women": { title: "Empowerment from Home: Scaling Income-Generating Projects", content: `<p>...[content]...</p>` },
            // ... other articles
        };

        articleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleKey = this.textContent;
                
                if (articles[articleKey]) {
                    modalTitle.textContent = articles[articleKey].title;
                    modalBody.innerHTML = articles[articleKey].content;
                    modal.style.display = "block";
                } else {
                    modalTitle.textContent = "Content Coming Soon";
                    modalBody.innerHTML = "<p>This article is currently being written. Please check back later!</p>";
                    modal.style.display = "block";
                }
            });
        });

        closeButton.onclick = function() { modal.style.display = "none"; }
        window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }
    }
    
    // --- Automatic Copyright Year ---
    const copyrightYearSpan = document.querySelector('.copyright-year');
    if(copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});