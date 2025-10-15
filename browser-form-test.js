/**
 * Browser-based Form Test
 * Paste this script into the browser console on https://therefillplanet.com
 * to test the form functionality automatically
 */

async function testContactForm() {
    console.log('🧪 Starting RefillPlanet Contact Form Test...');
    console.log('═'.repeat(60));
    
    const results = [];
    
    function addResult(test, status, message) {
        results.push({ test, status, message });
        const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
        console.log(`${icon} ${test}: ${message}`);
    }
    
    // Test 1: Check if elements exist
    console.log('📋 Test 1: Checking form elements...');
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const statusDiv = document.getElementById('form-status');
    
    if (!form) {
        addResult('Form Element', 'FAIL', 'Contact form not found');
        return;
    }
    if (!submitBtn) {
        addResult('Submit Button', 'FAIL', 'Submit button not found');
        return;
    }
    if (!nameField || !emailField || !messageField) {
        addResult('Form Fields', 'FAIL', 'Required form fields not found');
        return;
    }
    if (!statusDiv) {
        addResult('Status Display', 'FAIL', 'Form status div not found');
        return;
    }
    
    addResult('Form Elements', 'PASS', 'All form elements found');
    
    // Test 2: Check if JavaScript functions are available
    console.log('⚙️ Test 2: Checking JavaScript functions...');
    const hasInitFunction = typeof window.initContactForm === 'function';
    const hasSubmitFunction = typeof window.handleFormSubmit === 'function';
    const hasButtonFunction = typeof window.handleButtonClick === 'function';
    
    if (!hasInitFunction || !hasSubmitFunction || !hasButtonFunction) {
        addResult('JavaScript Functions', 'FAIL', 'Required functions not available in global scope');
    } else {
        addResult('JavaScript Functions', 'PASS', 'All required functions available');
    }
    
    // Test 3: Check if form has been initialized
    console.log('🔧 Test 3: Checking form initialization...');
    
    // Try to check if event listeners are attached (indirect check)
    const hasEventListeners = submitBtn._clickListenerAttached || 
                               form._submitListenerAttached ||
                               submitBtn.onclick !== null;
    
    if (!hasEventListeners) {
        addResult('Form Initialization', 'WARNING', 'Cannot verify if event listeners are attached');
    } else {
        addResult('Form Initialization', 'PASS', 'Form appears to be initialized');
    }
    
    // Test 4: Test form validation
    console.log('✅ Test 4: Testing form validation...');
    
    // Clear any existing values
    nameField.value = '';
    emailField.value = '';
    messageField.value = '';
    
    // Try to submit empty form (should fail validation)
    let validationPassed = false;
    if (typeof window.validateForm === 'function') {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        validationPassed = window.validateForm(data);
        
        if (!validationPassed) {
            addResult('Form Validation', 'PASS', 'Empty form correctly fails validation');
        } else {
            addResult('Form Validation', 'FAIL', 'Empty form incorrectly passes validation');
        }
    } else {
        addResult('Form Validation', 'WARNING', 'validateForm function not available');
    }
    
    // Test 5: Fill form with test data and attempt submission
    console.log('📝 Test 5: Testing form submission...');
    
    // Fill form with test data
    nameField.value = 'Test User';
    emailField.value = 'test@example.com';
    messageField.value = 'This is an automated test message. Please ignore.';
    
    // Create a promise to track the submission
    let submissionStarted = false;
    let submissionCompleted = false;
    let errorOccurred = false;
    
    // Monitor for status changes
    const originalShowFormStatus = window.showFormStatus;
    if (originalShowFormStatus) {
        window.showFormStatus = function(type, message) {
            console.log(`📊 Form Status: ${type} - ${message}`);
            if (type === 'loading') submissionStarted = true;
            if (type === 'success') submissionCompleted = true;
            if (type === 'error') errorOccurred = true;
            return originalShowFormStatus.call(this, type, message);
        };
    }
    
    // Simulate button click
    console.log('👆 Simulating button click...');
    
    try {
        // Try multiple ways to trigger the form
        if (typeof window.handleButtonClick === 'function') {
            window.handleButtonClick();
        } else {
            // Fallback: trigger click event
            submitBtn.click();
        }
        
        // Wait a moment for async operations
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        if (submissionStarted) {
            addResult('Form Submission', 'PASS', 'Form submission process started successfully');
            
            if (submissionCompleted) {
                addResult('Submission Success', 'PASS', 'Form submitted successfully with success message');
            } else if (errorOccurred) {
                addResult('Submission Success', 'FAIL', 'Form submission resulted in error');
            } else {
                addResult('Submission Success', 'WARNING', 'Form submission in progress or status unclear');
            }
        } else {
            addResult('Form Submission', 'FAIL', 'Form submission did not start');
        }
        
    } catch (error) {
        addResult('Form Submission', 'FAIL', `Form submission threw error: ${error.message}`);
    }
    
    // Restore original function
    if (originalShowFormStatus) {
        window.showFormStatus = originalShowFormStatus;
    }
    
    // Summary
    console.log('═'.repeat(60));
    console.log('📊 Test Summary:');
    
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const warnings = results.filter(r => r.status === 'WARNING').length;
    
    console.log(`Results: ${passed} passed, ${failed} failed, ${warnings} warnings`);
    
    if (failed === 0) {
        console.log('🎉 Form appears to be working correctly!');
        return true;
    } else {
        console.log('❌ Form has issues that need to be addressed.');
        return false;
    }
}

// Instructions for manual use
console.log(`
🧪 AUTOMATED FORM TEST READY
============================

To run the test, execute:
testContactForm()

This will:
1. Check all form elements exist
2. Verify JavaScript functions are loaded
3. Test form validation
4. Attempt a real form submission with test data
5. Monitor for success/error messages

The test is safe and uses clearly marked test data.
`);

// Auto-run if in browser environment
if (typeof window !== 'undefined' && window.location && window.location.hostname === 'therefillplanet.com') {
    console.log('🚀 Auto-running form test...');
    setTimeout(() => {
        testContactForm();
    }, 2000); // Wait 2 seconds for page to fully load
}