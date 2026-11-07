// Header scroll effect and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobilePanel = document.getElementById('mobile-panel');
    
    // Scroll effect
    function onScroll() {
        if (window.scrollY > 24) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }
    
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Mobile menu toggle
    if (menuToggle && mobilePanel) {
        menuToggle.addEventListener('click', function() {
            const isOpen = mobilePanel.classList.contains('open');
            
            if (isOpen) {
                mobilePanel.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
                menuToggle.querySelector('.menu-icon').style.display = 'block';
                menuToggle.querySelector('.close-icon').style.display = 'none';
            } else {
                mobilePanel.classList.add('open');
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
                menuToggle.querySelector('.menu-icon').style.display = 'none';
                menuToggle.querySelector('.close-icon').style.display = 'block';
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobilePanel.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobilePanel.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
                menuToggle.querySelector('.menu-icon').style.display = 'block';
                menuToggle.querySelector('.close-icon').style.display = 'none';
            });
        });
    }
    
    // Create and manage "Back to Top" button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    backToTopButton.setAttribute('aria-label', 'Volver arriba');
    backToTopButton.style.display = 'none';
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    }, { passive: true });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
