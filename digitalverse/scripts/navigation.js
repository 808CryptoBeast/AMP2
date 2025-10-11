// Digitalverse Navigation System - Fixed Mobile Sidebar
const Navigation = {
    // ========== CONFIGURATION ==========
    config: {
        scrollThreshold: 100,
        smoothScrollOffset: 80,
        throttleDelay: 100,
        sidebarTransition: 300
    },

    // ========== STATE ==========
    state: {
        isMobileMenuOpen: false,
        isInitialized: false,
        scrollObserver: null,
        eventListeners: []
    },

    // ========== SELECTORS ==========
    selectors: {
        mainNav: '.main-nav',
        menuToggle: '.menu-toggle',
        mobileSidebar: '.mobile-sidebar',
        mobileOverlay: '.mobile-sidebar-overlay',
        sidebarClose: '.mobile-sidebar-close',
        navLinks: '.nav-links a, .mobile-sidebar-nav a',
        themeToggles: '.theme-toggle',
        sections: 'section[id]'
    },

    // ========== INITIALIZATION ==========
    init: function() {
        if (this.state.isInitialized) {
            console.warn('⚠️ Navigation already initialized');
            return;
        }

        console.log('🌐 Initializing Digitalverse Navigation...');
        
        try {
            this.createMobileSidebar();
            this.initMobileSidebar();
            this.initScrollEffects();
            this.initNavLinks();
            this.initThemeToggle();
            this.initResizeHandler();
            
            this.state.isInitialized = true;
            console.log('✅ Navigation initialized successfully');
        } catch (error) {
            console.error('❌ Navigation initialization failed:', error);
        }
    },

    // ========== MOBILE SIDEBAR CREATION ==========
    createMobileSidebar: function() {
        if (document.querySelector(this.selectors.mobileSidebar)) {
            console.log('📱 Mobile sidebar already exists');
            return;
        }

        const sidebarHTML = `
            <div class="mobile-sidebar-overlay" aria-hidden="true"></div>
            <div class="mobile-sidebar" role="dialog" aria-modal="true" aria-label="Main navigation">
                <div class="mobile-sidebar-header">
                    <div class="mobile-sidebar-brand">
                        <div class="tiki-placeholder" style="width: 32px; height: 32px; border-radius: 50%; background: var(--ike-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">A</div>
                        <span>Digitalverse</span>
                    </div>
                    <button class="mobile-sidebar-close" aria-label="Close menu">
                        <iconify-icon icon="fluent:dismiss-24-filled"></iconify-icon>
                    </button>
                </div>
                
                <nav class="mobile-sidebar-nav" aria-label="Mobile navigation">
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
        console.log('📱 Mobile sidebar created successfully');
    },

    // ========== MOBILE SIDEBAR FUNCTIONALITY ==========
    initMobileSidebar: function() {
        const menuToggle = document.querySelector(this.selectors.menuToggle);
        const mobileSidebar = document.querySelector(this.selectors.mobileSidebar);
        const overlay = document.querySelector(this.selectors.mobileOverlay);

        if (!menuToggle || !mobileSidebar || !overlay) {
            console.warn('⚠️ Mobile sidebar elements not found');
            return;
        }

        console.log('🔧 Initializing mobile sidebar functionality');

        // Menu toggle handler
        this.addEventListener(menuToggle, 'click', (e) => this.handleMenuToggle(e));

        // Close button handler
        const sidebarClose = document.querySelector(this.selectors.sidebarClose);
        if (sidebarClose) {
            this.addEventListener(sidebarClose, 'click', (e) => this.handleCloseButton(e));
        }

        // Overlay handler
        this.addEventListener(overlay, 'click', (e) => this.handleOverlayClick(e));

        // Escape key handler
        this.addEventListener(document, 'keydown', (e) => this.handleEscapeKey(e));

        // Navigation link handlers
        this.initMobileNavLinks();
    },

    handleMenuToggle: function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Menu toggle clicked');
        
        const menuToggle = document.querySelector(this.selectors.menuToggle);
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 
                !this.state.isMobileMenuOpen
            );
        }
        
        this.toggleMobileMenu();
    },

    handleCloseButton: function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Close button clicked');
        this.closeMobileMenu();
    },

    handleOverlayClick: function(e) {
        e.preventDefault();
        console.log('🎯 Overlay clicked');
        this.closeMobileMenu();
    },

    handleEscapeKey: function(e) {
        if (e.key === 'Escape' && this.state.isMobileMenuOpen) {
            console.log('🎯 Escape key pressed');
            this.closeMobileMenu();
        }
    },

    initMobileNavLinks: function() {
        const mobileNavLinks = document.querySelectorAll('.mobile-sidebar-nav a');
        mobileNavLinks.forEach(link => {
            this.addEventListener(link, 'click', (e) => {
                console.log('🎯 Mobile nav link clicked');
                this.closeMobileMenu();
            });
        });
    },

    // ========== MOBILE MENU STATE MANAGEMENT ==========
    toggleMobileMenu: function() {
        console.log('🔄 Toggling mobile menu, current state:', this.state.isMobileMenuOpen);
        this.state.isMobileMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
    },

    openMobileMenu: function() {
        const mobileSidebar = document.querySelector(this.selectors.mobileSidebar);
        const overlay = document.querySelector(this.selectors.mobileOverlay);

        if (!mobileSidebar || !overlay) {
            console.warn('⚠️ Mobile sidebar elements not found for opening');
            return;
        }

        console.log('📱 Opening mobile sidebar');
        
        mobileSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden';
        this.state.isMobileMenuOpen = true;

        // Focus management for accessibility
        this.focusFirstNavItem();
    },

    closeMobileMenu: function() {
        const mobileSidebar = document.querySelector(this.selectors.mobileSidebar);
        const overlay = document.querySelector(this.selectors.mobileOverlay);

        if (!mobileSidebar || !overlay) {
            console.warn('⚠️ Mobile sidebar elements not found for closing');
            return;
        }

        console.log('📱 Closing mobile sidebar');
        
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
        this.state.isMobileMenuOpen = false;

        // Return focus to menu toggle
        this.returnFocusToToggle();
    },

    focusFirstNavItem: function() {
        const firstNavItem = document.querySelector('.mobile-sidebar-nav a');
        if (firstNavItem) {
            setTimeout(() => firstNavItem.focus(), this.config.sidebarTransition);
        }
    },

    returnFocusToToggle: function() {
        const menuToggle = document.querySelector(this.selectors.menuToggle);
        if (menuToggle) {
            setTimeout(() => menuToggle.focus(), this.config.sidebarTransition);
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    },

    // ========== SCROLL EFFECTS ==========
    initScrollEffects: function() {
        const nav = document.querySelector(this.selectors.mainNav);
        if (!nav) {
            console.log('⚠️ Main nav not found for scroll effects');
            return;
        }

        const handleScroll = () => {
            const scrollThreshold = this.config.scrollThreshold;
            const currentScrollY = window.scrollY;

            nav.classList.toggle('scrolled', currentScrollY > scrollThreshold);
        };

        const throttledScroll = this.throttle(handleScroll, this.config.throttleDelay);
        this.addEventListener(window, 'scroll', throttledScroll, { passive: true });
    },

    // ========== NAVIGATION LINKS ==========
    initNavLinks: function() {
        const navLinks = document.querySelectorAll(this.selectors.navLinks);
        
        navLinks.forEach(link => {
            this.addEventListener(link, 'click', (e) => {
                this.handleNavLinkClick(e, link);
            });
        });

        this.updateActiveNavFromHash();
        this.initScrollSpy();
    },

    handleNavLinkClick: function(e, link) {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.smoothScrollToElement(targetElement);
                this.setActiveNavLink(link);
            }
        }
    },

    // ========== SCROLL SPY ==========
    initScrollSpy: function() {
        const sections = document.querySelectorAll(this.selectors.sections);
        if (sections.length === 0) {
            console.log('⚠️ No sections found for scroll spy');
            return;
        }

        this.state.scrollObserver = new IntersectionObserver((entries) => {
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

        sections.forEach(section => this.state.scrollObserver.observe(section));
    },

    // ========== ACTIVE NAVIGATION MANAGEMENT ==========
    setActiveNavLink: function(activeLink) {
        if (!activeLink) return;

        // Get the navigation container context
        const container = activeLink.closest('.nav-links, .mobile-sidebar-nav');
        const allNavLinks = document.querySelectorAll(this.selectors.navLinks);
        
        // Remove active class from all links
        allNavLinks.forEach(link => link.classList.remove('nav-active'));
        
        // Add active class to clicked link
        activeLink.classList.add('nav-active');
    },

    updateActiveNavFromHash: function() {
        const hash = window.location.hash;
        if (hash) {
            const activeLink = document.querySelector(`a[href="${hash}"]`);
            if (activeLink) this.setActiveNavLink(activeLink);
        }
    },

    // ========== THEME TOGGLE ==========
    initThemeToggle: function() {
        const themeToggles = document.querySelectorAll(this.selectors.themeToggles);
        themeToggles.forEach(toggle => {
            this.addEventListener(toggle, 'click', (e) => {
                this.handleThemeToggle(e);
            });
        });
    },

    handleThemeToggle: function(e) {
        e.stopPropagation();
        console.log('🎨 Theme toggle clicked');
        
        if (window.ThemeManager && typeof window.ThemeManager.cycleTheme === 'function') {
            window.ThemeManager.cycleTheme();
        } else {
            console.warn('ThemeManager not available or cycleTheme method missing');
            // Fallback theme toggle logic could go here
        }
    },

    // ========== RESIZE HANDLER ==========
    initResizeHandler: function() {
        const handleResize = this.throttle(() => {
            if (window.innerWidth > 768 && this.state.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250);

        this.addEventListener(window, 'resize', handleResize);
    },

    // ========== UTILITY FUNCTIONS ==========
    smoothScrollToElement: function(element, offset = this.config.smoothScrollOffset) {
        if (!element) return;

        const navHeight = this.getNavHeight();
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (offset + navHeight);

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    getNavHeight: function() {
        const nav = document.querySelector(this.selectors.mainNav);
        return nav ? nav.offsetHeight : 0;
    },

    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    addEventListener: function(element, event, handler, options) {
        element.addEventListener(event, handler, options);
        this.state.eventListeners.push({ element, event, handler });
    },

    // ========== PUBLIC METHODS ==========
    navigateTo: function(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            this.smoothScrollToElement(targetElement);
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (correspondingLink) {
                this.setActiveNavLink(correspondingLink);
            }
        }
    },

    // ========== CLEANUP ==========
    destroy: function() {
        console.log('🧹 Cleaning up navigation...');
        
        // Remove event listeners
        this.state.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.state.eventListeners = [];

        // Disconnect observers
        if (this.state.scrollObserver) {
            this.state.scrollObserver.disconnect();
        }

        // Remove dynamically created elements
        const mobileSidebar = document.querySelector(this.selectors.mobileSidebar);
        const overlay = document.querySelector(this.selectors.mobileOverlay);
        
        if (mobileSidebar) mobileSidebar.remove();
        if (overlay) overlay.remove();

        // Reset state
        this.state.isMobileMenuOpen = false;
        this.state.isInitialized = false;
        this.state.scrollObserver = null;

        console.log('✅ Navigation cleanup completed');
    }
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing navigation...');
    Navigation.init();
});

// Handle page transitions or turbolinks
document.addEventListener('turbolinks:before-visit', function() {
    if (window.Navigation) {
        Navigation.destroy();
    }
});

// Make available globally
window.Navigation = Navigation;
