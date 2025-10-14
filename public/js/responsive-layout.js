/**
 * Dynamic Responsive Layout Manager
 * Detects actual screen size and adjusts layout accordingly
 */

class ResponsiveLayoutManager {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.adjustLayout();
    }

    setupEventListeners() {
        // Listen for window resize events
        window.addEventListener('resize', () => {
            this.debounce(() => this.adjustLayout(), 100)();
        });

        // Listen for orientation changes on mobile devices
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.adjustLayout(), 300);
        });
    }

    adjustLayout() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const aspectRatio = screenWidth / screenHeight;
        
        console.log(`Screen: ${screenWidth}x${screenHeight}, Aspect Ratio: ${aspectRatio.toFixed(2)}`);
        
        // Dynamic breakpoint calculation based on actual screen characteristics
        let shouldStack = false;
        let isMobile = false;

        if (screenWidth <= 768) {
            // Always stack on mobile
            shouldStack = true;
            isMobile = true;
        } else if (screenWidth <= 1024) {
            // Stack on small tablets and laptops with narrow screens
            shouldStack = true;
        } else if (screenWidth <= 1366 && aspectRatio < 1.5) {
            // Stack on smaller laptops (like 1366x768) with low aspect ratio
            shouldStack = true;
        } else if (screenWidth <= 1440 && screenHeight <= 900) {
            // Stack on medium laptops with limited height
            shouldStack = true;
        }

        // Adjust About Section Layout
        this.adjustAboutSection(shouldStack, screenWidth);
        
        // Adjust Floating Cards in Hero Section
        this.adjustFloatingCards(screenWidth, isMobile);
        
        // Add visual indicator for debugging (remove in production)
        this.addDebugInfo(screenWidth, screenHeight, shouldStack);
    }

    adjustAboutSection(shouldStack, screenWidth) {
        const aboutContent = document.querySelector('.about-content-modern');
        const aboutSection = document.querySelector('.about-modern');
        const aboutCta = document.querySelector('.about-cta');
        
        if (!aboutContent) return;

        // TEMPORARILY DISABLE DYNAMIC LAYOUT CHANGES FOR DEBUGGING
        // Remove any existing dynamic classes
        // aboutContent.classList.remove('dynamic-single-column', 'dynamic-two-column');

        // Apply the appropriate layout
        // if (shouldStack) {
        //     aboutContent.classList.add('dynamic-single-column');
        // } else {
        //     aboutContent.classList.add('dynamic-two-column');
        // }
        
        // Fix spacing issues by applying proper margins
        if (aboutSection) {
            if (screenWidth <= 768) {
                aboutSection.style.padding = '50px 0 25px 0';
            } else if (screenWidth <= 1024) {
                aboutSection.style.padding = '70px 0 30px 0';
            } else {
                aboutSection.style.padding = '120px 0 40px 0';
            }
        }
        
        // Fix CTA button spacing
        if (aboutCta) {
            if (screenWidth <= 768) {
                aboutCta.style.marginTop = '2rem';
                aboutCta.style.marginBottom = '1rem';
            } else {
                aboutCta.style.marginTop = '2.5rem';
                aboutCta.style.marginBottom = '1.5rem';
            }
        }
        
        this.adjustImageSize(screenWidth);
    }

    adjustFloatingCards(screenWidth, isMobile) {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        if (!floatingCards.length) return;

        floatingCards.forEach((card, index) => {
            // Reset any inline styles that might interfere
            card.style.top = '';
            card.style.right = '';
            card.style.left = '';
            card.style.transform = '';
            
            // Remove existing responsive classes
            card.classList.remove('mobile-hidden', 'tablet-repositioned', 'desktop-positioned');
            
            if (isMobile || screenWidth <= 768) {
                // Hide floating cards on mobile for cleaner layout
                card.classList.add('mobile-hidden');
            } else if (screenWidth <= 1200) {
                // Scale down cards for smaller screens but keep original positioning
                card.classList.add('tablet-repositioned');
            } else {
                // Full desktop display
                card.classList.add('desktop-positioned');
            }
        });
    }

    adjustImageSize(screenWidth) {
        const missionImage = document.querySelector('.mission-image');
        if (!missionImage) return;

        if (screenWidth <= 768) {
            missionImage.style.height = '350px';
        } else if (screenWidth <= 1024) {
            missionImage.style.height = '450px';
        } else {
            missionImage.style.height = '550px';
        }
    }

    addDebugInfo(width, height, isStacked) {
        // Remove existing debug info
        const existingDebug = document.querySelector('.responsive-debug');
        if (existingDebug) {
            existingDebug.remove();
        }

        // Create debug info (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const debugDiv = document.createElement('div');
            debugDiv.className = 'responsive-debug';
            debugDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 10000;
                    font-family: monospace;
                ">
                    ${width}x${height} | ${isStacked ? 'Stacked' : 'Two-Column'}
                </div>
            `;
            document.body.appendChild(debugDiv);
        }
    }

    // Debounce function to limit how often resize events fire
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// TEMPORARILY DISABLED FOR DEBUGGING
// Initialize when DOM is ready
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ResponsiveLayoutManager();
    });
} else {
    new ResponsiveLayoutManager();
}

// Export for potential use elsewhere
window.ResponsiveLayoutManager = ResponsiveLayoutManager;
*/