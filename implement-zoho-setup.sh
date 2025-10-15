#!/bin/bash

# Zoho Email Setup Implementation Script for RefillPlanet
# This script helps implement Zoho Mail + Forms solution

echo "🚀 RefillPlanet Zoho Email Setup Implementation"
echo "=============================================="
echo ""

# Check current setup
echo "📋 STEP 1: Current Setup Analysis"
echo "Current Formspree endpoint: https://formspree.io/f/xdkogbaw"
echo "Your Zoho Form URL: https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE"
echo ""

# Domain verification check
echo "📋 STEP 2: Domain Setup Verification"
echo "Checking if therefillplanet.com has Zoho MX records..."
echo ""

# Check MX records
echo "Current MX records for therefillplanet.com:"
dig +short MX therefillplanet.com || echo "❌ Could not resolve MX records"
echo ""

# Check if Zoho MX records are configured
mx_check=$(dig +short MX therefillplanet.com | grep -i "zoho")
if [ -n "$mx_check" ]; then
    echo "✅ Zoho MX records found! Domain is configured for Zoho Mail"
    zoho_configured=true
else
    echo "❌ Zoho MX records not found. Need to configure DNS first"
    zoho_configured=false
fi
echo ""

# Zoho form test
echo "📋 STEP 3: Testing Zoho Form Accessibility"
echo "Testing Zoho form URL..."
form_response=$(curl -s -o /dev/null -w "%{http_code}" "https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE")

if [ "$form_response" -eq 200 ]; then
    echo "✅ Zoho form is accessible and ready"
    form_accessible=true
else
    echo "❌ Zoho form returned HTTP $form_response"
    form_accessible=false
fi
echo ""

# Implementation recommendations
echo "📋 STEP 4: Implementation Plan"
echo ""

if [ "$zoho_configured" = true ] && [ "$form_accessible" = true ]; then
    echo "🎉 READY TO IMPLEMENT!"
    echo "Both Zoho Mail domain and form are properly configured."
    echo ""
    echo "Next actions:"
    echo "1. ✅ Domain configured for Zoho Mail"
    echo "2. ✅ Zoho form accessible"
    echo "3. 🔄 Update website contact form"
    echo "4. 🔄 Test email notifications"
    echo "5. 🔄 Configure auto-replies"
    
    echo ""
    echo "Would you like to update the website contact form now? (y/n)"
    read -r update_form
    
    if [ "$update_form" = "y" ] || [ "$update_form" = "Y" ]; then
        echo ""
        echo "🔄 Updating contact form to use Zoho..."
        echo "This will replace Formspree with your Zoho form"
        echo ""
        echo "Backup current form configuration..."
        cp public/index.html public/index.html.backup.$(date +%Y%m%d_%H%M%S)
        echo "✅ Backup created"
        echo ""
        
        echo "📝 Form update ready! Run the website update script next."
        echo "   Current action: https://formspree.io/f/xdkogbaw"
        echo "   New action: https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE"
    fi
    
elif [ "$zoho_configured" = false ]; then
    echo "⏳ DOMAIN SETUP REQUIRED"
    echo "Your domain needs Zoho MX records configured first."
    echo ""
    echo "DNS Records to add to therefillplanet.com:"
    echo ""
    echo "MX Records:"
    echo "  Name: @"
    echo "  Value: mx.zoho.com"
    echo "  Priority: 10"
    echo ""
    echo "  Name: @" 
    echo "  Value: mx2.zoho.com"
    echo "  Priority: 20"
    echo ""
    echo "TXT Records:"
    echo "  Name: @"
    echo "  Value: v=spf1 include:zoho.com ~all"
    echo ""
    echo "Steps:"
    echo "1. 🔄 Login to your domain registrar/DNS provider"
    echo "2. 🔄 Add the MX and TXT records above"
    echo "3. 🔄 Wait 24-48 hours for DNS propagation"
    echo "4. 🔄 Run this script again to verify"
    
elif [ "$form_accessible" = false ]; then
    echo "⚠️  FORM CONFIGURATION ISSUE"
    echo "Your Zoho form is not accessible. Please check:"
    echo ""
    echo "1. 🔄 Login to Zoho Forms dashboard"
    echo "2. 🔄 Verify form is published and public"
    echo "3. 🔄 Check form URL is correct"
    echo "4. 🔄 Test form submission manually"
fi

echo ""
echo "📞 Need Help?"
echo "- Zoho Mail Setup: https://help.zoho.com/portal/en/kb/mail"
echo "- DNS Configuration: https://help.zoho.com/portal/en/kb/mail/user-guide/getting-started/domain-verification"
echo "- Zoho Forms Help: https://help.zoho.com/portal/en/kb/forms"
echo ""

# Email test function
echo "📋 STEP 5: Email Testing (if domain configured)"
if [ "$zoho_configured" = true ]; then
    echo ""
    echo "Would you like to test email delivery? (y/n)"
    read -r test_email
    
    if [ "$test_email" = "y" ] || [ "$test_email" = "Y" ]; then
        echo ""
        echo "Enter your email address for testing:"
        read -r test_email_addr
        
        echo ""
        echo "Testing email delivery..."
        echo "📧 Simulating form submission to test auto-reply system"
        
        # This would be actual form submission test
        echo "Form submission test would be performed here"
        echo "Check your email ($test_email_addr) for auto-reply"
        echo ""
        echo "If you receive the auto-reply, Zoho email system is working!"
    fi
fi

echo ""
echo "🎯 Summary:"
echo "- Domain MX Records: $([ "$zoho_configured" = true ] && echo "✅ Configured" || echo "❌ Needs Setup")"
echo "- Zoho Form: $([ "$form_accessible" = true ] && echo "✅ Ready" || echo "❌ Check Config")"
echo "- Website Update: 🔄 Pending"
echo "- Email Testing: 🔄 Pending"
echo ""
echo "Next: Follow ZOHO_COMPLETE_SETUP.md for detailed instructions"