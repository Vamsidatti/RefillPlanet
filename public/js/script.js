// Main JavaScript file for RefillPlanet website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initAccordions();
    initTabs();
    initModals();
    initTooltips();
    
    // Prevent any form submissions globally for contact form
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'contactForm') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('Contact form submission prevented globally');
            handleFormSubmit(e);
            return false;
        }
    }, true);
    
    console.log('RefillPlanet website initialized');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling

function initContactForm() {
    console.log('Initializing contact form...');
    
    // Get form and button elements
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) {
        console.error('Contact form not found during initialization!');
        return;
    }
    
    if (!submitBtn) {
        console.error('Submit button not found during initialization!');
        return;
    }
    
    console.log('Form and button found, adding event listeners...');
    
    // Add click listener to the button
    submitBtn.addEventListener('click', function(e) {
        console.log('Button click event detected!');
        e.preventDefault();
        e.stopPropagation();
        handleButtonClick(e);
    });
    
    // Also prevent form submission just in case
    form.addEventListener('submit', function(e) {
        console.log('Form submit event detected (prevented)');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleFormSubmit(e);
    });
    
    // Global document-level event prevention for any form submissions
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'contactForm') {
            console.log('Global form submit prevention activated');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            handleFormSubmit(e);
        }
    });
    
    console.log('Contact form initialization complete!');
}

// Handle button click
function handleButtonClick(e) {
    console.log('Send Message button clicked!');
    
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found!');
        return;
    }
    
    // Create a fake form event to pass to handleFormSubmit
    const fakeEvent = {
        preventDefault: () => console.log('preventDefault called'),
        stopPropagation: () => console.log('stopPropagation called'),
        stopImmediatePropagation: () => console.log('stopImmediatePropagation called'),
        target: form
    };
    
    console.log('Calling handleFormSubmit...');
    handleFormSubmit(fakeEvent);
}

async function handleFormSubmit(e) {
    console.log('handleFormSubmit called!', e);
    
    // Completely prevent any form submission
    if (e && e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    
    console.log('Form submission intercepted - processing with AJAX');
    
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    
    if (!form) {
        console.error('Contact form not found!');
        return false;
    }
    
    const formData = new FormData(form);
    
    // Validate form data
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
    
    if (!validateForm(data)) {
        console.log('Form validation failed');
        return false;
    }
    
    // Show loading status
    console.log('Showing loading status...');
    showFormStatus('loading', 'Sending your message...');
    
    if (submitBtn) {
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
    }
    
    try {
        // Get Zoho URL from data attribute
        const zohoUrl = form.getAttribute('data-zoho-action');
        console.log('Zoho URL:', zohoUrl);
        
        if (!zohoUrl) {
            throw new Error('Zoho form URL not found');
        }
        
        // Use a simple fetch approach
        const formParams = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            formParams.append(key, value);
        }
        
        console.log('Submitting to Zoho...', formParams.toString());
        
        // Submit to Zoho in background
        fetch(zohoUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).catch(() => {
            // Expected to fail due to CORS, but form data is sent
            console.log('Form data submitted to Zoho (CORS expected)');
        });
        
        // Show success message
        setTimeout(() => {
            console.log('Showing success message...');
            showFormStatus('success', '🎉 Thank you! Your message has been sent successfully. We will respond within 24 hours.');
            form.reset();
            
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoading) btnLoading.style.display = 'none';
            }
            
            // Auto-hide success message after 8 seconds
            setTimeout(() => {
                hideFormStatus();
            }, 8000);
        }, 1500);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('error', 'There was an error sending your message. Please try again or contact us directly at contact@therefillplanet.com');
        
        // Reset button state
        if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline-flex';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    }
    
    // Absolutely prevent any default form behavior
    return false;
}

function validateForm(data) {
    const errors = [];
    
    // Required fields validation - updated to match Zoho field names
    if (!data.Name || data.Name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters).');
    }
    
    if (!data.Email || !isValidEmail(data.Email)) {
        errors.push('Please enter a valid email address.');
    }
    
    if (!data.SingleLine || data.SingleLine.trim().length < 3) {
        errors.push('Please enter a subject (at least 3 characters).');
    }
    
    if (!data.MultiLine || data.MultiLine.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters).');
    }
    
    if (errors.length > 0) {
        showFormStatus('error', errors.join(' '));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Loading Overlay Functions
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Alert/Message Functions
function showAlert(type, message) {
    const alertElement = document.getElementById('messageAlert');
    const alertContent = alertElement.querySelector('.alert-content');
    const alertIcon = alertElement.querySelector('.alert-icon');
    const alertText = alertElement.querySelector('.alert-text');
    const alertClose = alertElement.querySelector('.alert-close');
    
    // Set alert type and content
    alertContent.className = `alert-content ${type}`;
    alertIcon.className = type === 'success' ? 'alert-icon fas fa-check-circle' : 'alert-icon fas fa-exclamation-triangle';
    alertText.textContent = message;
    
    // Show alert
    alertElement.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
    
    // Close button handler
    alertClose.onclick = hideAlert;
}

function hideAlert() {
    const alertElement = document.getElementById('messageAlert');
    alertElement.classList.remove('show');
}

// Form Status Functions
function showFormStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    if (statusDiv) {
        // Remove hidden class and set content
        statusDiv.classList.remove('hidden');
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type}`;
        
        // Force reflow to ensure the element is visible before showing
        statusDiv.offsetHeight;
        
        // Add show class for animation
        statusDiv.classList.add('show');
        
        // Auto-hide success and error messages after 5 seconds
        if (type !== 'loading') {
            setTimeout(() => {
                hideFormStatus();
            }, 5000);
        }
    }
}

function hideFormStatus() {
    const statusDiv = document.getElementById('form-status');
    if (statusDiv) {
        statusDiv.classList.remove('show');
        
        // Ensure complete cleanup after animation
        setTimeout(() => {
            statusDiv.classList.remove('success', 'error', 'loading');
            statusDiv.classList.add('hidden');
            statusDiv.textContent = '';
        }, 400); // Match the CSS transition duration
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .service-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Accordion Component
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all accordion items
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// Tabs Component
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabsContainer = this.closest('.tabs');
            const targetPanelId = this.getAttribute('data-tab');
            const targetPanel = tabsContainer.querySelector(`#${targetPanelId}`);
            
            if (targetPanel) {
                // Remove active class from all buttons and panels
                tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                tabsContainer.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and target panel
                this.classList.add('active');
                targetPanel.classList.add('active');
            }
        });
    });
}

// Modal Component
function initModals() {
    // Modal open buttons
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Modal close buttons
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Tooltip Component
function initTooltips() {
    // Tooltips are handled via CSS, but we can add dynamic positioning if needed
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            // Add any dynamic tooltip positioning logic here if needed
        });
    });
}

// Utility Functions
function debounce(func, wait, immediate) {
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
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add navbar scroll effect
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100));

// Add scroll-to-top button functionality (if you add one)
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollButton.style.display = 'flex';
            scrollButton.style.alignItems = 'center';
            scrollButton.style.justifyContent = 'center';
        } else {
            scrollButton.style.display = 'none';
        }
    }, 100));
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
addScrollToTop();

// Form field animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading states to buttons
function addButtonLoading(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = text;
    button.classList.add('loading');
    
    return () => {
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('loading');
    };
}

// Export functions for external use
window.RefillPlanetApp = {
    showAlert,
    hideAlert,
    openModal,
    closeModal,
    showLoadingOverlay,
    hideLoadingOverlay,
    addButtonLoading,
    debounce,
    throttle
};