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
        if (!Utils.supportsBackdropFilter()) {
            console.warn('Backdrop filter not supported, using fallback');
            document.documentElement.classList.add('no-backdrop-filter');
        }

        // Check for reduced motion preference
        if (Utils.prefersReducedMotion()) {
            document.documentElement.classList.add('reduced-motion');
        }
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

        // Progress events
        document.addEventListener('progressUpdate', (e) => {
            this.onProgressUpdate(e.detail);
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

    onProgressUpdate: function(progressDetail) {
        // Handle progress updates from other components
        console.log('Progress updated:', progressDetail);
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
                
                this.startLearningPath(protocol);
            });
        });
    },

    startLearningPath: function(protocol) {
        console.log(`Starting ${protocol} learning path`);
        
        // Show loading state
        Utils.setLoading(event.target, true);
        
        // Simulate path start (in real app, this would navigate to learning module)
        setTimeout(() => {
            Utils.setLoading(event.target, false);
            
            // Track progress
            if (window.ProgressTracker) {
                ProgressTracker.completeProtocol(protocol);
            }
            
            // Show success message
            this.showPathStartedMessage(protocol);
        }, 1000);
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

    // Notification system
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `digitalverse-notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
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
            theme: window.ThemeManager ? ThemeManager.currentTheme : 'unknown',
            progress: window.ProgressTracker ? ProgressTracker.getProgressStats() : null
        };
    },

    // Utility methods for other components
    refreshUI: function() {
        this.dispatchAppEvent('appRefresh');
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    DigitalverseApp.init();
});

// Make app available globally
window.DigitalverseApp = DigitalverseApp;
