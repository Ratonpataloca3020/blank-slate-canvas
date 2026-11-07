// Enhanced Navigation Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Create Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
    
    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-panel a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation, { passive: true });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Alt + Up Arrow: Scroll to top
        if (e.altKey && e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Alt + Down Arrow: Scroll to bottom
        if (e.altKey && e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
    
    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add loading indicator for external links
            console.log('Opening external link:', this.href);
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.scrollBehavior = 'auto';
        document.querySelectorAll('.reveal').forEach(el => {
            el.style.transition = 'none';
            el.classList.add('is-visible');
        });
    }
    
    // Add visual feedback for button clicks
    document.querySelectorAll('.button, button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Detect scroll direction and hide/show header accordingly
    let lastScrollTop = 0;
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease, background 0.25s ease';
});
