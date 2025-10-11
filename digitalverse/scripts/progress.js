// Digitalverse Progress Tracking System
const ProgressTracker = {
    progress: {
        completedProtocols: [],
        completedModules: [],
        currentMilestone: 3,
        totalPoints: 0
    },
    
    init: function() {
        console.log('📊 Initializing Progress Tracker...');
        
        // Load saved progress
        this.loadProgress();
        
        // Initialize progress UI
        this.initProgressUI();
        
        console.log('✅ Progress Tracker initialized');
    },
    
    loadProgress: function() {
        const savedProgress = Utils.storage.get('digitalverse-progress');
        if (savedProgress) {
            this.progress = { ...this.progress, ...savedProgress };
        }
    },
    
    saveProgress: function() {
        Utils.storage.set('digitalverse-progress', this.progress);
    },
    
    initProgressUI: function() {
        // Update progress bars and milestones
        this.updateProgressDisplay();
        
        // Add click handlers for milestones
        this.initMilestoneInteractions();
    },
    
    updateProgressDisplay: function() {
        // Update path progress
        const progressFill = document.querySelector('.path-fill');
        if (progressFill) {
            const progressPercent = (this.progress.currentMilestone / 4) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
        
        // Update milestone states
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach((milestone, index) => {
            const milestoneNum = parseInt(milestone.getAttribute('data-milestone'));
            
            milestone.classList.remove('active', 'current');
            
            if (milestoneNum < this.progress.currentMilestone) {
                milestone.classList.add('active');
            } else if (milestoneNum === this.progress.currentMilestone) {
                milestone.classList.add('active', 'current');
            }
        });
        
        // Update encouragement stats
        this.updateEncouragementStats();
    },
    
    updateEncouragementStats: function() {
        const conceptsElement = document.querySelector('.encouragement-stat .stat-value:first-child');
        const protocolsElement = document.querySelector('.encouragement-stat .stat-value:last-child');
        
        if (conceptsElement) {
            conceptsElement.textContent = this.progress.completedModules.length;
        }
        
        if (protocolsElement) {
            protocolsElement.textContent = this.progress.completedProtocols.length;
        }
    },
    
    initMilestoneInteractions: function() {
        const milestones = document.querySelectorAll('.milestone');
        
        milestones.forEach(milestone => {
            milestone.addEventListener('click', () => {
                const milestoneNum = parseInt(milestone.getAttribute('data-milestone'));
                this.setCurrentMilestone(milestoneNum);
            });
        });
    },
    
    completeProtocol: function(protocol) {
        if (!this.progress.completedProtocols.includes(protocol)) {
            this.progress.completedProtocols.push(protocol);
            this.progress.totalPoints += 100;
            this.saveProgress();
            this.updateProgressDisplay();
            
            this.dispatchProgressEvent('protocolCompleted', {
                protocol: protocol,
                points: 100
            });
            
            return true;
        }
        return false;
    },
    
    completeModule: function(moduleId) {
        if (!this.progress.completedModules.includes(moduleId)) {
            this.progress.completedModules.push(moduleId);
            this.progress.totalPoints += 50;
            this.saveProgress();
            this.updateProgressDisplay();
            
            this.dispatchProgressEvent('moduleCompleted', {
                module: moduleId,
                points: 50
            });
            
            return true;
        }
        return false;
    },
    
    setCurrentMilestone: function(milestone) {
        if (milestone >= 1 && milestone <= 4) {
            this.progress.currentMilestone = milestone;
            this.saveProgress();
            this.updateProgressDisplay();
            
            this.dispatchProgressEvent('milestoneUpdated', {
                milestone: milestone
            });
        }
    },
    
    getProgressStats: function() {
        return {
            ...this.progress,
            completionPercentage: Math.round((this.progress.completedModules.length / 12) * 100),
            nextMilestone: this.progress.currentMilestone < 4 ? this.progress.currentMilestone + 1 : null
        };
    },
    
    showNotification: function(message) {
        if (window.DigitalverseApp) {
            DigitalverseApp.showNotification(message, 'success');
        }
    },
    
    dispatchProgressEvent: function(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: {
                ...detail,
                timestamp: Date.now(),
                progress: this.getProgressStats()
            }
        });
        document.dispatchEvent(event);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ProgressTracker.init();
});

// Make ProgressTracker available globally
window.ProgressTracker = ProgressTracker;
