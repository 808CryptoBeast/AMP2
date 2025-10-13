// Universal Profile Management System
const ProfileManager = {
    // User data storage
    userData: {
        profile: {
            name: 'Digital Explorer',
            bio: 'Navigating both knowledge and lifestyle',
            avatar: 'default',
            theme: 'worldcreate',
            background: 'dynamic'
        },
        ikeverse: {
            level: 1,
            mindset: 'Developing',
            alohaScore: 72,
            dailyPractice: 3,
            lifestyleProgress: 60
        },
        digitalverse: {
            level: 1,
            currentPath: 'Foundations',
            conceptsMastered: 8,
            criticalScore: 85,
            blockchainProgress: 45
        },
        bridge: {
            score: 75,
            knowledgeApplied: 12,
            wisdomMoments: 8
        },
        activity: []
    },

    init: function() {
        console.log('🌉 Initializing Universal Profile...');
        
        this.loadUserData();
        this.initCustomization();
        this.initBridgeView();
        this.updateProfileDisplay();
        this.initEventListeners();
        
        console.log('✅ Profile Manager initialized');
        
        // Fix mobile navigation
        this.fixMobileNavigation();
    },

    // Fix mobile navigation
    fixMobileNavigation: function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        if (menuToggle && navLinks) {
            // Remove any existing event listeners by cloning
            const newToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newToggle, menuToggle);

            // Add click event to toggle mobile menu
            newToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                newToggle.classList.toggle('active');
                body.classList.toggle('mobile-menu-open');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    newToggle.classList.remove('active');
                    body.classList.remove('mobile-menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (navLinks.classList.contains('active') && 
                    !navLinks.contains(e.target) && 
                    !newToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    newToggle.classList.remove('active');
                    body.classList.remove('mobile-menu-open');
                }
            });

            console.log('📱 Mobile navigation fixed');
        }
    },

    // Load user data from localStorage
    loadUserData: function() {
        const savedData = Utils.storage.get('universal-profile');
        if (savedData) {
            this.userData = { ...this.userData, ...savedData };
            console.log('📁 Profile data loaded from storage');
        }
    },

    // Save user data to localStorage
    saveUserData: function() {
        Utils.storage.set('universal-profile', this.userData);
        console.log('💾 Profile data saved');
    },

    // Update all profile displays
    updateProfileDisplay: function() {
        // Profile info
        document.getElementById('user-name').textContent = this.userData.profile.name;
        document.getElementById('user-bio').textContent = this.userData.profile.bio;
        
        // Levels and stats
        document.getElementById('ike-level').textContent = `Level ${this.userData.ikeverse.level}`;
        document.getElementById('digital-level').textContent = `Level ${this.userData.digitalverse.level}`;
        document.getElementById('bridge-score').textContent = `${this.userData.bridge.score}%`;
        
        // Ikeverse stats
        document.getElementById('ike-mindset').textContent = this.userData.ikeverse.mindset;
        document.getElementById('aloha-score').textContent = `${this.userData.ikeverse.alohaScore}%`;
        document.getElementById('daily-practice').textContent = `${this.userData.ikeverse.dailyPractice}/7 days`;
        
        // Digitalverse stats
        document.getElementById('current-path').textContent = this.userData.digitalverse.currentPath;
        document.getElementById('concepts-mastered').textContent = `${this.userData.digitalverse.conceptsMastered}/25`;
        document.getElementById('critical-score').textContent = `${this.userData.digitalverse.criticalScore}%`;
        
        // Bridge stats
        document.getElementById('knowledge-applied').textContent = this.userData.bridge.knowledgeApplied;
        document.getElementById('wisdom-moments').textContent = this.userData.bridge.wisdomMoments;
        
        // Update progress bars
        this.updateProgressBars();
        
        // Update avatar
        this.updateAvatar();
        
        // Update theme and background
        this.applyTheme(this.userData.profile.theme);
        this.applyBackground(this.userData.profile.background);
    },

    // Update progress bars
    updateProgressBars: function() {
        const lifestyleBar = document.querySelector('[data-skill="lifestyle"]');
        const blockchainBar = document.querySelector('[data-skill="blockchain"]');
        
        if (lifestyleBar) {
            lifestyleBar.style.width = `${this.userData.ikeverse.lifestyleProgress}%`;
        }
        if (blockchainBar) {
            blockchainBar.style.width = `${this.userData.digitalverse.blockchainProgress}%`;
        }
    },

    // Update avatar display - FIXED VERSION
    updateAvatar: function() {
        const avatar = document.getElementById('user-avatar');
        if (avatar) {
            // Map avatar names to actual file paths
            const avatarMap = {
                'default': '/digitalverse/assets/images/AMPTTiki.jpg',
                'tech': '/digitalverse/assets/images/catgirl.svg',
                'nature': '/digitalverse/assets/images/acs.svg'
            };
            
            const avatarUrl = avatarMap[this.userData.profile.avatar] || avatarMap.default;
            avatar.src = avatarUrl;
            
            // Add error handling for missing images
            avatar.onerror = function() {
                console.warn('Avatar image not found:', avatarUrl);
                // You could set a fallback image here if needed
            };
        }
    },

    // Initialize customization system
    initCustomization: function() {
        // Set current values in form
        document.getElementById('display-name').value = this.userData.profile.name;
        document.getElementById('user-bio-input').value = this.userData.profile.bio;
        
        // Set active avatar
        this.setActiveAvatar(this.userData.profile.avatar);
        
        // Set active theme
        this.setActiveTheme(this.userData.profile.theme);
        
        // Set active background
        this.setActiveBackground(this.userData.profile.background);
    },

    // Initialize bridge view interactions
    initBridgeView: function() {
        // Add click handlers for world cards
        document.querySelectorAll('.world-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn')) return;
                card.classList.toggle('expanded');
            });
        });
    },

    // Initialize event listeners
    initEventListeners: function() {
        // Avatar edit button
        const avatarEditBtn = document.getElementById('avatar-edit-btn');
        if (avatarEditBtn) {
            avatarEditBtn.addEventListener('click', () => {
                this.openCustomization('avatar');
            });
        }

        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                const avatar = option.getAttribute('data-avatar');
                this.setActiveAvatar(avatar);
                this.userData.profile.avatar = avatar;
                this.updateAvatar();
            });
        });

        // Theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                this.setActiveTheme(theme);
                this.userData.profile.theme = theme;
                this.applyTheme(theme);
            });
        });

        // Background selection
        document.querySelectorAll('.bg-option').forEach(option => {
            option.addEventListener('click', () => {
                const background = option.getAttribute('data-bg');
                this.setActiveBackground(background);
                this.userData.profile.background = background;
                this.applyBackground(background);
            });
        });

        // Real-time name/bio updates
        const displayName = document.getElementById('display-name');
        if (displayName) {
            displayName.addEventListener('input', (e) => {
                this.userData.profile.name = e.target.value;
                document.getElementById('user-name').textContent = e.target.value;
            });
        }

        const userBioInput = document.getElementById('user-bio-input');
        if (userBioInput) {
            userBioInput.addEventListener('input', (e) => {
                this.userData.profile.bio = e.target.value;
                document.getElementById('user-bio').textContent = e.target.value;
            });
        }

        // Save button
        const saveBtn = document.querySelector('.customization-actions .btn-primary');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCustomizations();
            });
        }

        // Reset button
        const resetBtn = document.querySelector('.customization-actions .btn-ghost');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCustomizations();
            });
        }

        // Bridge action buttons
        const trackIkeBtn = document.querySelector('.ikeverse-side .btn-primary');
        if (trackIkeBtn) {
            trackIkeBtn.addEventListener('click', () => {
                this.trackIkeProgress();
            });
        }

        const continueLearningBtn = document.querySelector('.digitalverse-side .btn-primary');
        if (continueLearningBtn) {
            continueLearningBtn.addEventListener('click', () => {
                this.continueLearning();
            });
        }
    },

    // Open customization section
    openCustomization: function(section) {
        // Scroll to customization section
        const customizeSection = document.getElementById('customize');
        if (customizeSection) {
            customizeSection.scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Optional: Highlight the specific section
            this.showNotification(`Customize your ${section}`, 'info');
            
            // Optional: Auto-focus on the relevant input
            if (section === 'avatar') {
                setTimeout(() => {
                    const avatarOptions = document.querySelector('.avatar-options');
                    if (avatarOptions) {
                        avatarOptions.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);
            }
        }
    },

    // Set active avatar
    setActiveAvatar: function(avatar) {
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`[data-avatar="${avatar}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    },

    // Set active theme
    setActiveTheme: function(theme) {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`[data-theme="${theme}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    },

    // Set active background
    setActiveBackground: function(background) {
        document.querySelectorAll('.bg-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`[data-bg="${background}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    },

    // Apply theme to profile
    applyTheme: function(theme) {
        const bgElement = document.getElementById('profile-bg');
        if (bgElement) {
            bgElement.setAttribute('data-bg-theme', theme);
            bgElement.className = `profile-background active ${theme}-theme`;
        }
    },

    // Apply background style
    applyBackground: function(background) {
        const bgElement = document.getElementById('profile-bg');
        if (bgElement) {
            // Remove all background classes
            bgElement.classList.remove('dynamic-bg', 'gradient-bg', 'particles-bg', 'solid-bg');
            
            // Add the selected background class
            bgElement.classList.add(`${background}-bg`);
        }
    },

    // Save all customizations
    saveCustomizations: function() {
        this.saveUserData();
        this.showNotification('Profile customizations saved!', 'success');
    },

    // Reset to default customizations
    resetCustomizations: function() {
        if (confirm('Are you sure you want to reset all customizations to default?')) {
            this.userData.profile = {
                name: 'Digital Explorer',
                bio: 'Navigating both knowledge and lifestyle',
                avatar: 'default',
                theme: 'worldcreate',
                background: 'dynamic'
            };
            
            this.updateProfileDisplay();
            this.initCustomization();
            this.saveUserData();
            this.showNotification('Profile reset to defaults!', 'info');
        }
    },

    // Track Ikeverse progress
    trackIkeProgress: function() {
        this.userData.ikeverse.dailyPractice = Math.min(7, this.userData.ikeverse.dailyPractice + 1);
        this.userData.ikeverse.alohaScore = Math.min(100, this.userData.ikeverse.alohaScore + 5);
        this.userData.ikeverse.lifestyleProgress = Math.min(100, this.userData.ikeverse.lifestyleProgress + 3);
        
        // Level up check
        if (this.userData.ikeverse.dailyPractice >= 7 && this.userData.ikeverse.level === 1) {
            this.userData.ikeverse.level = 2;
            this.userData.ikeverse.mindset = 'Established';
            this.showNotification('Level Up! Established daily practice routine 🌴', 'success');
        }
        
        this.updateActivity('Ikeverse', 'Daily mindfulness practice completed', '🌴');
        this.updateProfileDisplay();
        this.saveUserData();
        this.showNotification('Ikeverse progress recorded! 🌴', 'success');
    },

    // Continue Digitalverse learning
    continueLearning: function() {
        this.userData.digitalverse.conceptsMastered = Math.min(25, this.userData.digitalverse.conceptsMastered + 1);
        this.userData.digitalverse.blockchainProgress = Math.min(100, this.userData.digitalverse.blockchainProgress + 4);
        this.userData.digitalverse.criticalScore = Math.min(100, this.userData.digitalverse.criticalScore + 2);
        
        // Level up check
        if (this.userData.digitalverse.conceptsMastered >= 10 && this.userData.digitalverse.level === 1) {
            this.userData.digitalverse.level = 2;
            this.userData.digitalverse.currentPath = 'Protocols';
            this.showNotification('Level Up! Advanced to Protocols path 🚀', 'success');
        }
        
        this.updateActivity('Digitalverse', 'Continued blockchain learning path', '🌐');
        this.updateProfileDisplay();
        this.saveUserData();
        this.showNotification('Learning progress recorded! 🌐', 'success');
    },

    // Record bridge activity (applying knowledge to lifestyle)
    recordBridgeActivity: function() {
        this.userData.bridge.knowledgeApplied++;
        this.userData.bridge.wisdomMoments++;
        this.userData.bridge.score = Math.min(100, this.userData.bridge.score + 2);
        
        this.updateActivity('Bridge', 'Applied blockchain knowledge to daily decision', '⚡');
        this.updateProfileDisplay();
        this.saveUserData();
        this.showNotification('Wisdom moment recorded! ⚡', 'success');
    },

    // Update activity timeline
    updateActivity: function(type, message, icon) {
        const activity = {
            type: type,
            message: message,
            icon: icon,
            timestamp: new Date().toISOString(),
            timeAgo: 'Just now'
        };
        
        this.userData.activity.unshift(activity);
        
        // Keep only last 10 activities
        if (this.userData.activity.length > 10) {
            this.userData.activity = this.userData.activity.slice(0, 10);
        }
        
        this.updateActivityDisplay();
    },

    // Update activity display
    updateActivityDisplay: function() {
        const timeline = document.querySelector('.activity-timeline');
        if (!timeline) return;
        
        // Clear existing activities (except the template ones)
        const existingActivities = timeline.querySelectorAll('.activity-item');
        existingActivities.forEach(activity => {
            if (!activity.classList.contains('template-activity')) {
                activity.remove();
            }
        });
        
        // Add new activities
        this.userData.activity.forEach(activity => {
            const activityElement = this.createActivityElement(activity);
            timeline.appendChild(activityElement);
        });
    },

    // Create activity element
    createActivityElement: function(activity) {
        const div = document.createElement('div');
        div.className = `activity-item ${activity.type.toLowerCase()}-activity`;
        
        div.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${this.capitalizeFirst(activity.type)} Activity</h4>
                <p>${activity.message}</p>
                <span class="activity-time">${activity.timeAgo}</span>
            </div>
        `;
        
        return div;
    },

    // Helper: Capitalize first letter
    capitalizeFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // Show notification
    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `profile-notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .profile-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--ike-card);
                    border: 1px solid var(--ike-border);
                    border-left: 4px solid var(--ike-accent);
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    backdrop-filter: blur(20px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    animation: slideIn 0.3s ease;
                }
                .profile-notification.success {
                    border-left-color: var(--ike-success);
                }
                .profile-notification.info {
                    border-left-color: var(--ike-accent);
                }
                .profile-notification button {
                    background: none;
                    border: none;
                    color: var(--ike-text);
                    cursor: pointer;
                    font-size: 1.2rem;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },

    // Public method to add activity from other pages
    addActivity: function(type, message, icon) {
        this.updateActivity(type, message, icon);
        this.saveUserData();
    },

    // Public method to update progress from other pages
    updateProgress: function(universe, updates) {
        if (this.userData[universe]) {
            Object.assign(this.userData[universe], updates);
            this.updateProfileDisplay();
            this.saveUserData();
        }
    },

    // Get user data for other components
    getUserData: function() {
        return this.userData;
    }
};

// Make available globally
window.ProfileManager = ProfileManager;

// Global functions for HTML onclick handlers (for buttons that might not be caught by event listeners)
function trackIkeProgress() {
    if (window.ProfileManager) {
        ProfileManager.trackIkeProgress();
    }
}

function continueLearning() {
    if (window.ProfileManager) {
        ProfileManager.continueLearning();
    }
}

function recordBridgeActivity() {
    if (window.ProfileManager) {
        ProfileManager.recordBridgeActivity();
    }
}

function saveCustomizations() {
    if (window.ProfileManager) {
        ProfileManager.saveCustomizations();
    }
}

function resetCustomizations() {
    if (window.ProfileManager) {
        ProfileManager.resetCustomizations();
    }
}

function openCustomization(section) {
    if (window.ProfileManager) {
        ProfileManager.openCustomization(section);
    }
}