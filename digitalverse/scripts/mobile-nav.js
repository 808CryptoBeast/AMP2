// Mobile Navigation System
class MobileNavigation {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.body = document.body;
        this.init();
    }

    init() {
        if (this.menuToggle && this.navLinks) {
            this.setupEventListeners();
            console.log('📱 Mobile navigation initialized');
        }
    }

    setupEventListeners() {
        // Toggle mobile menu
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinks.classList.contains('active') && 
                !this.navLinks.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        this.body.classList.toggle('mobile-menu-open');
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.menuToggle.classList.remove('active');
        this.body.classList.remove('mobile-menu-open');
    }

    openMenu() {
        this.navLinks.classList.add('active');
        this.menuToggle.classList.add('active');
        this.body.classList.add('mobile-menu-open');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new MobileNavigation();
});

// Re-initialize after a delay to ensure it works with other scripts
setTimeout(() => {
    new MobileNavigation();
}, 100);
