// Digitalverse Navigation System
const Navigation = {
    isMobileMenuOpen: false,

    init: function() {
        console.log('🌺 Initializing Digitalverse Navigation...');
        
        this.initMobileMenu();
        this.initScrollEffects();
        this.initNavLinks();
        this.initThemeToggle();
        
        console.log('✅ Navigation initialized successfully');
    },

    initMobileMenu: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        if (!menuToggle || !navLinks) {
            console.warn('Mobile menu elements not found');
            return;
        }

        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },

    toggleMobileMenu: function() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    openMobileMenu: function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        const body = document.body;

        navLinks.classList.add('active');
        menuToggle.textContent = '✕';
        body.classList.add('mobile-menu-open');
        this.isMobileMenuOpen = true;

        // Dispatch custom event
        this.dispatchNavEvent('mobileMenuOpen');
    },

    closeMobileMenu: function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        const body = document.body;

        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
        body.classList.remove('mobile-menu-open');
        this.isMobileMenuOpen = false;

        // Dispatch custom event
        this.dispatchNavEvent('mobileMenuClose');
    },

    initScrollEffects: function() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        const scrollThreshold = 100;

        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.scrollY;

            // Add/remove scrolled class based on scroll position
            if (currentScrollY > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show nav on scroll direction (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    },

    initNavLinks: function() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Handle internal links with smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        Utils.smoothScroll(href, 80);
                        
                        // Update active state
                        this.setActiveNavLink(link);
                    }
                }
                
                // External links and other href types will behave normally
            });
        });

        // Set initial active link based on URL hash
        this.updateActiveNavFromHash();
        
        // Update active link on scroll
        this.initScrollSpy();
    },

    initScrollSpy: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                    
                    if (correspondingLink) {
                        this.setActiveNavLink(correspondingLink);
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    },

    setActiveNavLink: function(activeLink) {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
        });
        
        activeLink.classList.add('nav-active');
    },

    updateActiveNavFromHash: function() {
        const hash = window.location.hash;
        if (hash) {
            const activeLink = document.querySelector(`.nav-links a[href="${hash}"]`);
            if (activeLink) {
                this.setActiveNavLink(activeLink);
            }
        }
    },

    initThemeToggle: function() {
        // This is handled by ThemeManager, but we ensure the button exists
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
            });
        }
    },

    dispatchNavEvent: function(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                timestamp: Date.now(),
                mobile: Utils.isMobile()
            }
        });
        document.dispatchEvent(event);
    },

    // Public method to navigate to section
    navigateTo: function(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            Utils.smoothScroll(`#${sectionId}`, 80);
            this.setActiveNavLink(document.querySelector(`a[href="#${sectionId}"]`));
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Navigation.init();
});

// Make Navigation available globally
window.Navigation = Navigation;