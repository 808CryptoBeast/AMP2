// Digitalverse Navigation System - Fixed Mobile Sidebar
const Navigation = {
    isMobileMenuOpen: false,

    init: function() {
        console.log('🌐 Initializing Digitalverse Navigation...');
        
        // Create mobile sidebar immediately
        this.createMobileSidebar();
        
        // Initialize all navigation functionality
        this.initMobileSidebar();
        this.initScrollEffects();
        this.initNavLinks();
        this.initThemeToggle();
        
        console.log('✅ Navigation initialized successfully');
    },

    createMobileSidebar: function() {
        // Only create if it doesn't exist
        if (document.querySelector('.mobile-sidebar')) {
            return;
        }

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
        console.log('📱 Mobile sidebar created');
    },

    initMobileSidebar: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const sidebarClose = document.querySelector('.mobile-sidebar-close');
        const overlay = document.querySelector('.mobile-sidebar-overlay');

        if (!menuToggle) {
            console.error('❌ Menu toggle button not found');
            return;
        }

        if (!mobileSidebar) {
            console.error('❌ Mobile sidebar not found');
            return;
        }

        console.log('🔧 Initializing mobile sidebar functionality');

        // Menu toggle click handler
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Menu toggle clicked');
            this.toggleMobileMenu();
        });

        // Sidebar close button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Close button clicked');
                this.closeMobileMenu();
            });
        }

        // Overlay click handler
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Overlay clicked');
                this.closeMobileMenu();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                console.log('🎯 Escape key pressed');
                this.closeMobileMenu();
            }
        });

        // Handle mobile sidebar navigation clicks
        const mobileNavLinks = document.querySelectorAll('.mobile-sidebar-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🎯 Mobile nav link clicked');
                this.closeMobileMenu();
            });
        });
    },

    toggleMobileMenu: function() {
        console.log('🔄 Toggling mobile menu, current state:', this.isMobileMenuOpen);
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

        if (!mobileSidebar || !overlay) {
            console.error('❌ Mobile sidebar or overlay not found');
            return;
        }

        console.log('📱 Opening mobile sidebar');
        
        mobileSidebar.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('mobile-menu-open');
        this.isMobileMenuOpen = true;

        // Disable background scrolling
        document.body.style.overflow = 'hidden';
    },

    closeMobileMenu: function() {
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.mobile-sidebar-overlay');
        const body = document.body;

        if (!mobileSidebar || !overlay) {
            console.error('❌ Mobile sidebar or overlay not found');
            return;
        }

        console.log('📱 Closing mobile sidebar');
        
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        this.isMobileMenuOpen = false;

        // Re-enable background scrolling
        document.body.style.overflow = '';
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
                
                // Handle internal links with smooth scroll
                if (href && href.startsWith('#')) {
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
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                // This will be handled by your theme manager
                if (window.ThemeManager) {
                    window.ThemeManager.cycleTheme();
                }
            });
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing navigation...');
    Navigation.init();
});

// Make available globally
window.Navigation = Navigation;
