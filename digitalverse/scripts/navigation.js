// Digitalverse Navigation System - Sidebar Mobile Navigation
const Navigation = {
    isMobileMenuOpen: false,

    init: function() {
        console.log('🌐 Initializing Digitalverse Navigation...');
        
        this.initMobileSidebar();
        this.initScrollEffects();
        this.initNavLinks();
        this.initThemeToggle();
        this.initMenuToggleAnimation();
        
        console.log('✅ Navigation initialized successfully');
    },

    initMobileSidebar: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        if (!menuToggle || !navLinks) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Menu toggle click handler
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
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

        // Close on window resize (if resizing to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },

    initMenuToggleAnimation: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menuToggle) return;

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
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
        const overlay = this.createOverlay();

        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('mobile-menu-open');
        body.appendChild(overlay);
        
        this.isMobileMenuOpen = true;

        // Animate in
        setTimeout(() => {
            navLinks.style.transform = 'translateX(0)';
            overlay.classList.add('active');
        }, 10);

        this.dispatchNavEvent('mobileMenuOpen');
    },

    closeMobileMenu: function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        const body = document.body;
        const overlay = document.querySelector('.nav-overlay');

        navLinks.style.transform = 'translateX(-100%)';
        menuToggle.classList.remove('active');
        
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }

        setTimeout(() => {
            navLinks.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            this.isMobileMenuOpen = false;
        }, 300);

        this.dispatchNavEvent('mobileMenuClose');
    },

    createOverlay: function() {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.addEventListener('click', () => this.closeMobileMenu());
        return overlay;
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

            // Hide/show nav on scroll direction
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
                        this.setActiveNavLink(link);
                    }
                }
                
                // Close mobile menu for any link click on mobile
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });

        // Set initial active link based on URL hash
        this.updateActiveNavFromHash();
        
        // Update active link on scroll
        this.initScrollSpy();
    },

    initScrollSpy: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

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
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
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
