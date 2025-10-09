// Digitalverse Theme Management
const ThemeManager = {
    themes: ['worldcreate', 'cosmic', 'starry'],
    currentTheme: 'worldcreate',

    init: function() {
        console.log('🎨 Initializing Theme Manager...');
        
        // Load saved theme or default to worldcreate
        const savedTheme = Utils.storage.get('digitalverse-theme') || 'worldcreate';
        this.switchTheme(savedTheme, false);
        
        // Initialize theme toggle button
        this.initThemeToggle();
        
        // Initialize background videos
        this.initBackgroundVideos();
        
        console.log('✅ Theme Manager initialized');
    },

    initThemeToggle: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.cycleTheme();
            });
        }
    },

    initBackgroundVideos: function() {
        const videos = document.querySelectorAll('.bg-video');
        videos.forEach(video => {
            // Preload videos when they might be needed soon
            if (video.getAttribute('data-theme') === this.currentTheme) {
                video.setAttribute('preload', 'auto');
                video.classList.add('active');
            }
        });
    },

    switchTheme: function(themeName, animate = true) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Theme ${themeName} not found`);
            return;
        }

        // Update current theme
        this.currentTheme = themeName;
        
        // Update HTML attribute
        Utils.setTheme(themeName);
        
        // Save to localStorage
        Utils.storage.set('digitalverse-theme', themeName);
        
        // Update background videos
        this.updateBackgroundVideos();
        
        // Update theme toggle button
        this.updateThemeToggle();
        
        // Dispatch theme change event
        this.dispatchThemeChange(themeName, animate);
        
        console.log(`🎨 Switched to ${themeName} theme`);
    },

    cycleTheme: function() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        const nextTheme = this.themes[nextIndex];
        
        this.switchTheme(nextTheme, true);
    },

    updateBackgroundVideos: function() {
        const videos = document.querySelectorAll('.bg-video');
        videos.forEach(video => {
            if (video.getAttribute('data-theme') === this.currentTheme) {
                video.classList.add('active');
                // Ensure video is playing
                if (video.paused) {
                    video.play().catch(e => console.log('Video play prevented:', e));
                }
            } else {
                video.classList.remove('active');
            }
        });
    },

    updateThemeToggle: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        // Update emoji based on current theme
        const themeEmojis = {
            'worldcreate': '🌍',
            'cosmic': '🌌',
            'starry': '✨'
        };

        themeToggle.textContent = themeEmojis[this.currentTheme] || '🎨';
    },

    dispatchThemeChange: function(themeName, animate) {
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: themeName,
                animate: animate,
                timestamp: Date.now()
            }
        });
        document.dispatchEvent(event);
    },

    // Get available themes
    getThemes: function() {
        return [...this.themes];
    },

    // Set custom theme (for future expansion)
    setCustomTheme: function(themeConfig) {
        console.log('Setting custom theme:', themeConfig);
        // Implementation for custom themes would go here
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
});

// Make ThemeManager available globally
window.ThemeManager = ThemeManager;