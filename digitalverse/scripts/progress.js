// Digitalverse Progress Tracking
const ProgressTracker = {
    userProgress: {
        conceptsMastered: 12,
        protocolsExplored: 3,
        currentMilestone: 3,
        completedPaths: [],
        learningTime: 0
    },

    init: function() {
        console.log('📊 Initializing Progress Tracker...');
        
        this.loadProgress();
        this.updateProgressUI();
        this.initProgressAnimations();
        this.initMilestoneTracking();
        
        console.log('✅ Progress Tracker initialized');
    },

    loadProgress: function() {
        const savedProgress = Utils.storage.get('digitalverse-progress');
        if (savedProgress) {
            this.userProgress = { ...this.userProgress, ...savedProgress };
        }
    },

    saveProgress: function() {
        Utils.storage.set('digitalverse-progress', this.userProgress);
    },

    updateProgressUI: function() {
        // Update progress stats
        this.updateProgressStats();
        
        // Update milestone indicators
        this.updateMilestoneUI();
        
        // Update path progress
        this.updatePathProgress();
    },

    updateProgressStats: function() {
        const stats = document.querySelectorAll('.encouragement-stat .stat-value');
        if (stats.length >= 2) {
            stats[0].textContent = this.userProgress.conceptsMastered;
            stats[1].textContent = this.userProgress.protocolsExplored;
        }

        // Update progress fill
        const progressFill = document.querySelector('.path-fill');
        if (progressFill) {
            const progressPercent = ((this.userProgress.currentMilestone - 1) / 3) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
    },

    updateMilestoneUI: function() {
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach((milestone, index) => {
            const milestoneNum = parseInt(milestone.getAttribute('data-milestone'));
            
            milestone.classList.remove('active', 'current', 'completed');
            
            if (milestoneNum < this.userProgress.currentMilestone) {
                milestone.classList.add('completed', 'active');
            } else if (milestoneNum === this.userProgress.currentMilestone) {
                milestone.classList.add('current', 'active');
            }
        });
    },

    updatePathProgress: function() {
        // Update learning path cards with progress
        const pathCards = document.querySelectorAll('.protocol-card');
        pathCards.forEach(card => {
            const protocol = card.classList[1].replace('-card', '');
            if (this.userProgress.completedPaths.includes(protocol)) {
                card.classList.add('completed');
            }
        });
    },

    initProgressAnimations: function() {
        // Animate progress bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.5 });

        const progressElements = document.querySelectorAll('.path-fill, .milestone-marker');
        progressElements.forEach(el => observer.observe(el));
    },

    initMilestoneTracking: function() {
        // Track when user views important sections
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.recordSectionView(entry.target.id);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    },

    recordSectionView: function(sectionId) {
        // Map sections to concepts/protocols
        const sectionMap = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum', 
            'xrpl': 'xrpl',
            'critical-thinking': 'mindset',
            'pattern-recognition': 'verification'
        };

        if (sectionMap[sectionId] && !this.userProgress.completedPaths.includes(sectionMap[sectionId])) {
            this.userProgress.completedPaths.push(sectionMap[sectionId]);
            this.userProgress.conceptsMastered += 2;
            this.saveProgress();
            this.updateProgressUI();
            
            this.showAchievement(sectionMap[sectionId]);
        }
    },

    showAchievement: function(achievement) {
        const achievementMessages = {
            'bitcoin': '🎉 Bitcoin Fundamentals Mastered!',
            'ethereum': '🚀 Ethereum & Smart Contracts Explored!',
            'xrpl': '💫 XRPL Payment Systems Understood!',
            'mindset': '🛡️ Critical Thinking Shield Activated!',
            'verification': '🔍 Verification Skills Developed!'
        };

        this.showNotification(achievementMessages[achievement] || '🎯 Progress Updated!');
    },

    showNotification: function(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'progress-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✨</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--ike-accent), #9400d3);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 8px 32px rgba(0, 247, 255, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 600;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },

    // Public methods for updating progress
    completeConcept: function(conceptName) {
        this.userProgress.conceptsMastered++;
        this.saveProgress();
        this.updateProgressUI();
    },

    completeProtocol: function(protocolName) {
        if (!this.userProgress.completedPaths.includes(protocolName)) {
            this.userProgress.completedPaths.push(protocolName);
            this.userProgress.protocolsExplored++;
            this.saveProgress();
            this.updateProgressUI();
        }
    },

    advanceMilestone: function() {
        if (this.userProgress.currentMilestone < 4) {
            this.userProgress.currentMilestone++;
            this.saveProgress();
            this.updateProgressUI();
            this.showNotification('🌟 Milestone Reached! Continue your journey.');
        }
    },

    // Get progress statistics
    getProgressStats: function() {
        return { ...this.userProgress };
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ProgressTracker.init();
});

// Make ProgressTracker available globally
window.ProgressTracker = ProgressTracker;