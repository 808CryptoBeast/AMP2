// Digitalverse Theme Management System
const ThemeManager = {
    currentTheme: 'worldcreate',
    themes: ['worldcreate', 'cosmic', 'starry'],
    
    init: function() {
        console.log('🎨 Initializing Theme Manager...');
        
        // Load saved theme or use default
        const savedTheme = Utils.storage.get('digitalverse-theme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Initialize theme toggle buttons
        this.initThemeToggles();
        
        console.log('✅ Theme Manager initialized');
    },
    
    initThemeToggles: function() {
        const themeToggles = document.querySelectorAll('.theme-toggle');
        
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.cycleTheme();
            });
        });
    },
    
    cycleTheme: function() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        const nextTheme = this.themes[nextIndex];
        
        this.setTheme(nextTheme);
    },
    
    setTheme: function(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Theme "${theme}" not found. Using default.`);
            theme = 'worldcreate';
        }
        
        // Remove previous theme classes
        this.themes.forEach(t => {
            document.documentElement.classList.remove(`theme-${t}`);
        });
        
        // Add new theme class
        document.documentElement.classList.add(`theme-${theme}`);
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update current theme
        this.currentTheme = theme;
        
        // Save to localStorage
        Utils.storage.set('digitalverse-theme', theme);
        
        // Dispatch theme change event
        this.dispatchThemeEvent('themeChange', {
            theme: theme,
            previousTheme: this.previousTheme
        });
        
        this.previousTheme = theme;
    },
    
    applyTheme: function(theme) {
        this.setTheme(theme);
    },
    
    getCurrentTheme: function() {
        return this.currentTheme;
    },
    
    getAvailableThemes: function() {
        return [...this.themes];
    },
    
    dispatchThemeEvent: function(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: {
                ...detail,
                timestamp: Date.now()
            }
        });
        document.dispatchEvent(event);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
});

// Make ThemeManager available globally
window.ThemeManager = ThemeManager;
