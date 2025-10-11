// Digitalverse Main Application
const DigitalverseApp = {
    init: function() {
        console.log('🌐 Initializing Digitalverse Application...');
        
        this.initApp();
        this.bindEvents();
        this.initLearningPaths();
        this.initInteractiveElements();
        
        console.log('✅ Digitalverse Application ready');
    },

    initApp: function() {
        // Set current year in footer
        this.setCurrentYear();
        
        // Initialize system checks
        this.systemChecks();
        
        // Add loading animation
        this.showLoadingAnimation();
    },

    setCurrentYear: function() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    },

    systemChecks: function() {
        // Check for required features
        if (!this.supportsBackdropFilter()) {
            console.warn('Backdrop filter not supported, using fallback');
            document.documentElement.classList.add('no-backdrop-filter');
        }

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }
    },

    supportsBackdropFilter: function() {
        return CSS.supports('backdrop-filter', 'blur(10px)') || 
               CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
    },

    showLoadingAnimation: function() {
        // Remove loading state after everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        });
    },

    bindEvents: function() {
        // Global keyboard shortcuts
        this.initKeyboardShortcuts();
        
        // Resize handling
        this.initResizeHandler();
        
        // Custom event listeners
        this.initEventListeners();
    },

    initKeyboardShortcuts: function() {
        document.addEventListener('keydown', (e) => {
            // Toggle theme with Ctrl/Cmd + T
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                if (window.ThemeManager) {
                    ThemeManager.cycleTheme();
                }
            }
            
            // Toggle mobile menu with Escape
            if (e.key === 'Escape') {
                if (window.Navigation && Navigation.isMobileMenuOpen) {
                    Navigation.closeMobileMenu();
                }
            }
        });
    },

    initResizeHandler: function() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    },

    handleResize: function() {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 768 && Navigation.isMobileMenuOpen) {
            Navigation.closeMobileMenu();
        }
        
        // Dispatch resize event
        this.dispatchAppEvent('appResize');
    },

    initEventListeners: function() {
        // Theme change handling
        document.addEventListener('themeChange', (e) => {
            this.onThemeChange(e.detail);
        });

        // Mobile menu events
        document.addEventListener('mobileMenuOpen', () => {
            this.onMobileMenuToggle(true);
        });

        document.addEventListener('mobileMenuClose', () => {
            this.onMobileMenuToggle(false);
        });
    },

    onThemeChange: function(themeDetail) {
        console.log(`Theme changed to: ${themeDetail.theme}`);
        
        // Update any theme-specific UI elements
        this.updateThemeSpecificUI(themeDetail.theme);
    },

    onMobileMenuToggle: function(isOpen) {
        if (isOpen) {
            // Disable background scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
    },

    updateThemeSpecificUI: function(theme) {
        // Update any UI elements that are theme-specific
        const heroIcon = document.querySelector('.hero-brand-icon');
        if (heroIcon) {
            const themeIcons = {
                'worldcreate': '🌐',
                'cosmic': '🌌', 
                'starry': '✨'
            };
            heroIcon.textContent = themeIcons[theme] || '🌐';
        }
    },

    initLearningPaths: function() {
        const pathButtons = document.querySelectorAll('.protocol-card .btn');
        
        pathButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.protocol-card');
                const protocol = card.classList[1].replace('-card', '');
                
                this.startLearningPath(protocol, e.target);
            });
        });
    },

    startLearningPath: function(protocol, button) {
        console.log(`Starting ${protocol} learning path`);
        
        // Show loading state
        this.setLoading(button, true);
        
        // Simulate path start
        setTimeout(() => {
            this.setLoading(button, false);
            
            // Show success message
            this.showPathStartedMessage(protocol);
        }, 1000);
    },

    setLoading: function(element, isLoading) {
        if (isLoading) {
            element.setAttribute('data-loading', 'true');
            element.disabled = true;
        } else {
            element.removeAttribute('data-loading');
            element.disabled = false;
        }
    },

    showPathStartedMessage: function(protocol) {
        const protocolNames = {
            'bitcoin': 'Bitcoin Protocol',
            'ethereum': 'Ethereum & Smart Contracts', 
            'xrpl': 'XRPL & Payment Systems'
        };
        
        const message = `🚀 Starting ${protocolNames[protocol]} learning path!`;
        this.showNotification(message);
    },

    showNotification: function(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'digitalverse-notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--ike-nav);
            color: var(--ike-text);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--ike-border);
            backdrop-filter: blur(20px);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 8px 32px var(--ike-shadow);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },

    initInteractiveElements: function() {
        // Add hover effects to cards
        this.initCardInteractions();
        
        // Initialize tooltips
        this.initTooltips();
        
        // Initialize animations
        this.initAnimations();
    },

    initCardInteractions: function() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover');
            });
        });
    },

    initTooltips: function() {
        // Simple tooltip implementation
        const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
        
        elementsWithTooltip.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = element.getAttribute('data-tooltip');
                this.showTooltip(e, tooltipText);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    },

    showTooltip: function(event, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'digitalverse-tooltip';
        tooltip.textContent = text;
        
        // Position tooltip
        const x = event.clientX + 10;
        const y = event.clientY + 10;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        
        document.body.appendChild(tooltip);
        
        // Store reference
        this.currentTooltip = tooltip;
    },

    hideTooltip: function() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    },

    initAnimations: function() {
        // Initialize intersection observer for scroll animations
        const animatedElements = document.querySelectorAll('.card, .stat-item, .milestone');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    },

    dispatchAppEvent: function(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: {
                ...detail,
                timestamp: Date.now(),
                version: '1.0.0'
            }
        });
        document.dispatchEvent(event);
    },

    // Public methods
    getAppInfo: function() {
        return {
            version: '1.0.0',
            name: 'Digitalverse',
            theme: ThemeManager ? ThemeManager.currentTheme : 'unknown'
        };
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    DigitalverseApp.init();
});

// Make app available globally
window.DigitalverseApp = DigitalverseApp;

// Add some basic CSS for dynamic elements
const dynamicStyles = `
    .digitalverse-tooltip {
        position: fixed;
        background: var(--ike-nav);
        color: var(--ike-text);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        z-index: 10000;
        border: 1px solid var(--ike-border);
        backdrop-filter: blur(20px);
        pointer-events: none;
        transform: translateY(-100%);
        white-space: nowrap;
        box-shadow: 0 4px 20px var(--ike-shadow);
    }
    
    .digitalverse-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--ike-nav);
        color: var(--ike-text);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 1px solid var(--ike-border);
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 8px 32px var(--ike-shadow);
    }
    
    .card-hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    [data-loading="true"] {
        opacity: 0.7;
        pointer-events: none;
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
