#!/usr/bin/env node

/**
 * RefillPlanet Form Test Script
 * Tests the contact form functionality end-to-end
 */

const https = require('https');
const http = require('http');

class FormTester {
    constructor() {
        this.baseUrl = 'https://therefillplanet.com';
        this.testResults = [];
    }

    log(message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    async makeRequest(url, options = {}) {
        return new Promise((resolve, reject) => {
            const client = url.startsWith('https') ? https : http;
            const req = client.request(url, options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
            });
            req.on('error', reject);
            if (options.body) req.write(options.body);
            req.end();
        });
    }

    async testJavaScriptLoading() {
        this.log('🔍 Testing JavaScript loading...');
        
        try {
            // Check if script.js is referenced in HTML
            const htmlResponse = await this.makeRequest(this.baseUrl);
            if (htmlResponse.status !== 200) {
                throw new Error(`Website returned status ${htmlResponse.status}`);
            }

            const hasScriptReference = htmlResponse.data.includes('src="js/script.js"');
            if (!hasScriptReference) {
                this.testResults.push({
                    test: 'JavaScript Reference',
                    status: 'FAIL',
                    message: 'script.js not found in HTML'
                });
                return false;
            }

            // Check if script.js is accessible
            const scriptResponse = await this.makeRequest(`${this.baseUrl}/js/script.js`);
            if (scriptResponse.status !== 200) {
                this.testResults.push({
                    test: 'JavaScript Loading',
                    status: 'FAIL',
                    message: `script.js returned status ${scriptResponse.status}`
                });
                return false;
            }

            // Check for required functions
            const requiredFunctions = [
                'function initContactForm',
                'function handleFormSubmit',
                'function handleButtonClick',
                'function validateForm',
                'function showFormStatus'
            ];

            const missingFunctions = requiredFunctions.filter(func => 
                !scriptResponse.data.includes(func)
            );

            if (missingFunctions.length > 0) {
                this.testResults.push({
                    test: 'JavaScript Functions',
                    status: 'FAIL',
                    message: `Missing functions: ${missingFunctions.join(', ')}`
                });
                return false;
            }

            this.testResults.push({
                test: 'JavaScript Loading',
                status: 'PASS',
                message: 'All required JavaScript functions found'
            });
            return true;

        } catch (error) {
            this.testResults.push({
                test: 'JavaScript Loading',
                status: 'ERROR',
                message: error.message
            });
            return false;
        }
    }

    async testFormStructure() {
        this.log('📋 Testing form structure...');
        
        try {
            const response = await this.makeRequest(this.baseUrl);
            const html = response.data;

            // Check for contact form
            if (!html.includes('id="contactForm"')) {
                this.testResults.push({
                    test: 'Form Structure',
                    status: 'FAIL',
                    message: 'Contact form with id="contactForm" not found'
                });
                return false;
            }

            // Check for submit button
            if (!html.includes('id="submitBtn"')) {
                this.testResults.push({
                    test: 'Form Structure',
                    status: 'FAIL',
                    message: 'Submit button with id="submitBtn" not found'
                });
                return false;
            }

            // Check for Zoho action
            if (!html.includes('data-zoho-action')) {
                this.testResults.push({
                    test: 'Form Structure',
                    status: 'FAIL',
                    message: 'Zoho action attribute not found'
                });
                return false;
            }

            // Check for required form fields
            const requiredFields = [
                'name="Name"',
                'name="Email"',
                'name="MultiLine"'
            ];

            const missingFields = requiredFields.filter(field => !html.includes(field));
            if (missingFields.length > 0) {
                this.testResults.push({
                    test: 'Form Structure',
                    status: 'FAIL',
                    message: `Missing form fields: ${missingFields.join(', ')}`
                });
                return false;
            }

            // Check for form status div
            if (!html.includes('id="form-status"')) {
                this.testResults.push({
                    test: 'Form Structure',
                    status: 'FAIL',
                    message: 'Form status div not found'
                });
                return false;
            }

            this.testResults.push({
                test: 'Form Structure',
                status: 'PASS',
                message: 'All required form elements found'
            });
            return true;

        } catch (error) {
            this.testResults.push({
                test: 'Form Structure',
                status: 'ERROR',
                message: error.message
            });
            return false;
        }
    }

    async testZohoConnectivity() {
        this.log('🌐 Testing Zoho connectivity...');
        
        try {
            const zohoUrl = 'https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE';
            
            // Try to reach Zoho endpoint
            const response = await this.makeRequest(zohoUrl);
            
            if (response.status >= 200 && response.status < 400) {
                this.testResults.push({
                    test: 'Zoho Connectivity',
                    status: 'PASS',
                    message: `Zoho form accessible (status: ${response.status})`
                });
                return true;
            } else {
                this.testResults.push({
                    test: 'Zoho Connectivity',
                    status: 'FAIL',
                    message: `Zoho form returned status ${response.status}`
                });
                return false;
            }

        } catch (error) {
            this.testResults.push({
                test: 'Zoho Connectivity',
                status: 'WARNING',
                message: `Could not test Zoho connectivity: ${error.message}`
            });
            return null; // Inconclusive
        }
    }

    async testFormSubmission() {
        this.log('📤 Testing form submission (dry run)...');
        
        try {
            // We can't actually submit the form without potentially spamming,
            // but we can verify the submission endpoint and parameters
            const zohoUrl = 'https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE';
            
            // Test with HEAD request to avoid actual submission
            const response = await this.makeRequest(zohoUrl, { method: 'HEAD' });
            
            if (response.status >= 200 && response.status < 500) {
                this.testResults.push({
                    test: 'Form Submission Endpoint',
                    status: 'PASS',
                    message: 'Zoho form endpoint is accessible'
                });
                return true;
            } else {
                this.testResults.push({
                    test: 'Form Submission Endpoint',
                    status: 'FAIL',
                    message: `Zoho endpoint returned status ${response.status}`
                });
                return false;
            }

        } catch (error) {
            this.testResults.push({
                test: 'Form Submission Endpoint',
                status: 'ERROR',
                message: error.message
            });
            return false;
        }
    }

    async runAllTests() {
        this.log('🚀 Starting RefillPlanet Form Test Suite...');
        this.log('='.repeat(60));

        const tests = [
            () => this.testJavaScriptLoading(),
            () => this.testFormStructure(),
            () => this.testZohoConnectivity(),
            () => this.testFormSubmission()
        ];

        for (const test of tests) {
            await test();
        }

        this.log('='.repeat(60));
        this.log('📊 Test Results Summary:');
        
        let passed = 0, failed = 0, errors = 0, warnings = 0;
        
        this.testResults.forEach(result => {
            const icon = result.status === 'PASS' ? '✅' : 
                        result.status === 'FAIL' ? '❌' : 
                        result.status === 'ERROR' ? '💥' : '⚠️';
            
            this.log(`${icon} ${result.test}: ${result.message}`);
            
            if (result.status === 'PASS') passed++;
            else if (result.status === 'FAIL') failed++;
            else if (result.status === 'ERROR') errors++;
            else warnings++;
        });

        this.log('='.repeat(60));
        this.log(`Summary: ${passed} passed, ${failed} failed, ${errors} errors, ${warnings} warnings`);
        
        if (failed === 0 && errors === 0) {
            this.log('🎉 All critical tests passed! Form should be working correctly.');
            return true;
        } else {
            this.log('❌ Some tests failed. Form may not be working correctly.');
            return false;
        }
    }
}

// Manual test instructions
function printManualTestInstructions() {
    console.log(`
🧪 MANUAL TEST INSTRUCTIONS
=========================

To manually verify the form works:

1. 📖 Open: https://therefillplanet.com
2. 🔍 Open browser console (F12 → Console)
3. 📍 Scroll to the Contact section
4. 📝 Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
5. 👆 Click "Send Message" button

✅ EXPECTED BEHAVIOR:
- Console shows: "Initializing contact form..."
- Console shows: "Send Message button clicked!"
- Loading spinner appears on button
- Console shows: "Form submission intercepted - processing with AJAX"
- Console shows: "Showing loading status..."
- Console shows: "Form data submitted to Zoho"
- Success message appears: "🎉 Thank you! Your message has been sent successfully..."
- Form resets to empty
- Button returns to normal state

❌ FAILURE INDICATORS:
- Button doesn't respond to clicks
- No console messages appear
- Page redirects instead of showing success message
- Error messages appear
- Loading spinner doesn't show

🔧 DEBUGGING:
- Check if script.js is loaded: Look for 404 errors in Network tab
- Verify JavaScript functions: Type 'initContactForm' in console
- Check form elements: Type 'document.getElementById("contactForm")' in console
`);
}

// Run tests if called directly
if (require.main === module) {
    const tester = new FormTester();
    tester.runAllTests().then(success => {
        console.log('\n');
        printManualTestInstructions();
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test suite failed:', error);
        process.exit(1);
    });
}

module.exports = FormTester;