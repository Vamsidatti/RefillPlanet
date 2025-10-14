/**
 * Hero Background Auto-Loader
 * Automatically detects and loads hero background images
 */

class HeroBackgroundLoader {
    constructor() {
        this.heroElement = document.querySelector('.hero-modern');
        this.imagePath = 'images/hero-backgrounds/current-hero-image';
        this.supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];
        this.fallbackImage = 'images/hero-background.svg';
        
        this.init();
    }

    async init() {
        console.log('🖼️ Hero Background Loader: Initializing...');
        
        const imageUrl = await this.detectHeroImage();
        if (imageUrl) {
            this.setHeroBackground(imageUrl);
            console.log(`✅ Hero Background Loader: Using ${imageUrl}`);
        } else {
            this.setHeroBackground(this.fallbackImage);
            console.log(`⚠️ Hero Background Loader: Using fallback ${this.fallbackImage}`);
        }
    }

    async detectHeroImage() {
        // Try each supported format
        for (const format of this.supportedFormats) {
            const imageUrl = `${this.imagePath}.${format}`;
            
            try {
                const exists = await this.checkImageExists(imageUrl);
                if (exists) {
                    return imageUrl;
                }
            } catch (error) {
                // Continue to next format
                continue;
            }
        }
        
        return null;
    }

    checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
                resolve(true);
            };
            
            img.onerror = () => {
                resolve(false);
            };
            
            // Add timestamp to prevent caching issues
            img.src = url + '?t=' + Date.now();
        });
    }

    setHeroBackground(imageUrl) {
        if (this.heroElement) {
            this.heroElement.style.backgroundImage = `url('${imageUrl}')`;
            this.heroElement.style.backgroundSize = 'cover';
            this.heroElement.style.backgroundPosition = 'center';
            this.heroElement.style.backgroundRepeat = 'no-repeat';
            
            // Add loaded class for any CSS transitions
            this.heroElement.classList.add('hero-background-loaded');
        }
    }

    // Public method to manually refresh the background
    async refresh() {
        console.log('🔄 Hero Background Loader: Refreshing...');
        await this.init();
    }

    // Public method to set a specific image
    setCustomImage(imageUrl) {
        console.log(`🖼️ Hero Background Loader: Setting custom image ${imageUrl}`);
        this.setHeroBackground(imageUrl);
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.heroBackgroundLoader = new HeroBackgroundLoader();
});

// Make it available globally for debugging
window.HeroBackgroundLoader = HeroBackgroundLoader;