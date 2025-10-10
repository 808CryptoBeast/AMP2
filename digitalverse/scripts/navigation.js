// Digitalverse Navigation System - Unified Navigation
const Navigation = {
    isMobileMenuOpen: false,

    init: function() {
        console.log('🌐 Initializing Digitalverse Navigation...');
        
        this.createMobileSidebar();
        this.initMobileSidebar();
        this.initScrollEffects();
        this.initNavLinks();
        this.initThemeToggle();
        
        console.log('✅ Navigation initialized successfully');
    },

    createMobileSidebar: function() {
        // Create mobile sidebar HTML if it doesn't exist
        if (!document.querySelector('.mobile-sidebar')) {
            const sidebarHTML = `
                <div class="mobile-sidebar">
                    <div class="mobile-sidebar-header">
                        <div class="mobile-sidebar-brand">
                            <img src="../assets/AMP Tiki.jpg" alt="AMP Logo" class="tiki-toggle" style="width: 32px; height: 32px; border-radius: 50%;">
                            <span>Digitalverse</span>
                        </div>
                        <button class="mobile-sidebar-close" aria-label="Close menu">
                            <iconify-icon icon="fluent:dismiss-24-filled"></iconify-icon>
                        </button>
                    </div>
                    
                    <nav class="mobile-sidebar-nav">
                        <a href="../index.html" class="nav-link">
                            <iconify-icon icon="fluent:home-24-filled"></iconify-icon>
                            <span>AMP Home</span>
                        </a>
                        <a href="../ikeverse.html" class="nav-link">
                            <iconify-icon icon="fluent:book-open-24-filled"></iconify-icon>
                            <span>Ikeverse</span>
                        </a>
                        <a href="#home" class="nav-active">
                            <iconify-icon icon="fluent:globe-24-filled"></iconify-icon>
                            <span>Home</span>
                        </a>
                        <a href="#learn">
                            <iconify-icon icon="fluent:book-24-filled"></iconify-icon>
                            <span>Learn</span>
                        </a>
                        <a href="#about">
                            <iconify-icon icon="fluent:info-24-filled"></iconify-icon>
                            <span>About</span>
                        </a>
                    </nav>
                    
                    <div class="mobile-sidebar-actions">
                        <button class="theme-toggle" aria-label="Change theme">
                            <iconify-icon icon="fluent:color-24-filled"></iconify-icon>
                            Change Theme
                        </button>
                        <a href="../profile.html" class="btn btn-profile">
                            <iconify-icon icon="fluent:person-24-filled"></iconify-icon>
                            Profile
                        </a>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        }
    },

    initMobileSidebar: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebarClose = document.querySelector('.mobile-sidebar-close');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.mobile-sidebar-overlay');

        if (!menuToggle || !mobileSidebar) return;

        // Menu toggle click handler
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Sidebar close button
        sidebarClose.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Overlay click handler
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle mobile sidebar navigation clicks
        const mobileNavLinks = document.querySelectorAll('.mobile-sidebar-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
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
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.mobile-sidebar-overlay');
        const body = document.body;

        mobileSidebar.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('mobile-menu-open');
        this.isMobileMenuOpen = true;
    },

    closeMobileMenu: function() {
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.mobile-sidebar-overlay');
        const body = document.body;

        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        this.isMobileMenuOpen = false;
    },

    initScrollEffects: function() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;

        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 100;

            if (currentScrollY > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    },

    initNavLinks: function() {
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-sidebar-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        Utils.smoothScroll(href, 80);
                        this.setActiveNavLink(link);
                    }
                }
            });
        });

        this.updateActiveNavFromHash();
        this.initScrollSpy();
    },

    initScrollSpy: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-sidebar-nav a[href^="#"]');
        
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const correspondingLink = document.querySelector(`a[href="#${id}"]`);
                    
                    if (correspondingLink) {
                        this.setActiveNavLink(correspondingLink);
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
    },

    setActiveNavLink: function(activeLink) {
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-sidebar-nav a');
        navLinks.forEach(link => link.classList.remove('nav-active'));
        activeLink.classList.add('nav-active');
    },

    updateActiveNavFromHash: function() {
        const hash = window.location.hash;
        if (hash) {
            const activeLink = document.querySelector(`a[href="${hash}"]`);
            if (activeLink) this.setActiveNavLink(activeLink);
        }
    },

    initThemeToggle: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Navigation.init();
});

window.Navigation = Navigation;
