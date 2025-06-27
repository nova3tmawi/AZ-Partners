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

    // --- Article Modal Logic ---
    const articleLinks = document.querySelectorAll('.article-list a');
    const modal = document.getElementById('article-modal');
    
    // Check if we are on a page with the modal
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeButton = document.querySelector('.close-button');

        // Dummy content for articles - replace with real content
        const articles = {
            "What We Learned Managing Emergency Shelters in Gaza": {
                title: "Lessons in Crisis: Managing Emergency Shelters in Gaza",
                content: `<p>Coordinating emergency shelter for over 10,000 displaced individuals, including a significant number of orphans, taught us invaluable lessons in logistics, humanity, and resilience.</p><p><b>Key Takeaway 1:</b> Rapid needs assessments are critical. Our initial data collection allowed us to prioritize resources for the most vulnerable groups effectively.</p><p><b>Key Takeaway 2:</b> Local partnerships are non-negotiable. Collaborating with community leaders ensured that aid distribution was efficient and culturally sensitive.</p>`
            },
            "Lessons from Home-Based Income Projects for Women": {
                title: "Empowerment from Home: Scaling Income-Generating Projects",
                content: `<p>Our work with women-led, home-based businesses has shown that with the right support, small-scale initiatives can create significant economic and social impact.</p><p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "How to Build a Winning Donor Proposal: A Quick Framework": {
                title: "How to Build a Winning Donor Proposal: A Quick Framework",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "Organizing Your MEAL System: 3 Common Pitfalls to Avoid": {
                title: "Organizing Your MEAL System: 3 Common Pitfalls to Avoid",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "5 Tools to Help NGOs Automate Their Internal Processes": {
                title: "5 Tools to Help NGOs Automate Their Internal Processes",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "Why Digital Visibility Matters for Small NGOs": {
                title: "Why Digital Visibility Matters for Small NGOs",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "Article Example 1": {
                title: "Article Example 1",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            },
            "Article Example 2": {
                title: "Article Example 2",
                content: `<p>This is placeholder content. You would replace this with the full text of the article.</p>`
            }
        };

        articleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent navigating to "#"
                const articleKey = this.textContent;
                
                if (articles[articleKey]) {
                    modalTitle.textContent = articles[articleKey].title;
                    modalBody.innerHTML = articles[articleKey].content;
                    modal.style.display = "block";
                } else {
                    // Fallback for articles not yet in the system
                    modalTitle.textContent = "Content Coming Soon";
                    modalBody.innerHTML = "<p>This article is currently being written. Please check back later!</p>";
                    modal.style.display = "block";
                }
            });
        });

        // Close modal actions
        closeButton.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    
    // --- Automatic Copyright Year ---
    const copyrightYearSpan = document.querySelector('.copyright-year');
    if(copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});