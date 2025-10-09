// Digitalverse Utility Functions
const Utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    smoothScroll: function(target, offset = 0) {
        const element = document.querySelector(target);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Get current theme
    getCurrentTheme: function() {
        return document.documentElement.getAttribute('data-theme') || 'worldcreate';
    },

    // Set theme attribute
    setTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    },

    // Local storage helpers
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Local storage not available');
            }
        },

        get: function(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('Local storage not available');
            }
        }
    },

    // Mobile detection
    isMobile: function() {
        return window.innerWidth <= 768;
    },

    // Add loading state
    setLoading: function(element, isLoading) {
        if (isLoading) {
            element.setAttribute('data-loading', 'true');
            element.disabled = true;
        } else {
            element.removeAttribute('data-loading');
            element.disabled = false;
        }
    }
};

// Initialize utils when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Digitalverse Utils initialized');
});

// Make utils available globally
window.Utils = Utils;