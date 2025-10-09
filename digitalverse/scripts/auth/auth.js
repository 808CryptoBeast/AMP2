// scripts/main.js (updated)
import { AuthSystem } from './auth/auth.js';
import { ProgressTracker } from './profile/progress-tracker.js';
import { setupNavigation } from './navigation.js';

// Initialize app based on current page
if (window.location.pathname.includes('profile.html')) {
    import('./profile/profile.js').then(module => {
        module.initializeProfilePage();
    });
}