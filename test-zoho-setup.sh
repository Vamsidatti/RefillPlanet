#!/bin/bash

# Zoho Forms Test Script for RefillPlanet
# This script helps verify your Zoho form is working correctly

echo "🔍 Zoho Forms Verification Script for RefillPlanet"
echo "=================================================="
echo ""

# Check if user has form URL
echo "📋 Step 1: Do you have your Zoho form URL?"
echo "   It should look like: https://forms.zoho.com/username/form/FormName/formperma/xxxxx"
echo ""
read -p "   Enter your Zoho form URL (or press Enter to skip): " FORM_URL

if [ ! -z "$FORM_URL" ]; then
    echo ""
    echo "🧪 Step 2: Testing form submission..."
    echo "   Sending test data to your form..."
    
    # Test form submission
    RESPONSE=$(curl -s -X POST "$FORM_URL" \
        -d "Name=Test User" \
        -d "Email=test@refillplanet.com" \
        -d "Subject=Test from Script" \
        -d "Message=This is a test message from the verification script" \
        -w "%{http_code}")
    
    HTTP_CODE="${RESPONSE: -3}"
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "   ✅ Form submission successful!"
        echo "   📧 Check your email for notification"
    else
        echo "   ❌ Form submission failed (HTTP $HTTP_CODE)"
        echo "   🔧 Check your form settings"
    fi
else
    echo "   ⏭️  Skipping test - no URL provided"
fi

echo ""
echo "📝 Verification Checklist:"
echo "=========================="
echo ""
echo "Zoho Forms Setup:"
echo "[ ] Logged into https://forms.zoho.com"
echo "[ ] Created 'RefillPlanet Contact Form'"
echo "[ ] Added Name, Email, Subject, Message fields"
echo "[ ] All fields marked as required"
echo "[ ] Email notifications configured"
echo "[ ] Form access set to public"
echo "[ ] Domain 'therefillplanet.com' allowed"
echo "[ ] Test submission completed"
echo "[ ] Received test email notification"
echo ""

echo "Current Website Status:"
echo "[ ] Contact form currently uses Formspree"
echo "[ ] Ready to switch to Zoho when form URL is available"
echo ""

echo "Next Steps:"
echo "==========="
echo "1. Complete Zoho form setup if not done"
echo "2. Test form directly in Zoho"
echo "3. Get form submission URL"
echo "4. Provide URL for website integration"
echo ""

# Check current website form
echo "🌐 Current Website Form Status:"
echo "   Checking live website..."
CURRENT_ACTION=$(curl -s https://therefillplanet.com | grep -o 'action="[^"]*"' | head -1)
echo "   Current form action: $CURRENT_ACTION"

if [[ $CURRENT_ACTION == *"formspree"* ]]; then
    echo "   Status: Using Formspree (ready to switch to Zoho)"
elif [[ $CURRENT_ACTION == *"zoho"* ]]; then
    echo "   Status: Already using Zoho!"
else
    echo "   Status: Custom form action detected"
fi

echo ""
echo "🎯 Ready for Integration!"
echo "   Once you have your Zoho form URL, we can integrate it with your website."
echo ""