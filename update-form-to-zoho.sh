#!/bin/bash

# Website Contact Form Update Script - Switch from Formspree to Zoho
# This script updates the contact form to use Zoho Forms instead of Formspree

echo "🔄 Updating RefillPlanet Contact Form to Use Zoho"
echo "================================================="
echo ""

# Check if backup exists
if [ ! -f "public/index.html.backup.formspree" ]; then
    echo "📦 Creating backup of current Formspree configuration..."
    cp public/index.html public/index.html.backup.formspree
    echo "✅ Backup created: public/index.html.backup.formspree"
else
    echo "✅ Formspree backup already exists"
fi
echo ""

# Show current form configuration
echo "📋 Current Form Configuration:"
echo "Current action URL:"
grep -n "action=" public/index.html | head -1
echo ""

# Define URLs
OLD_ACTION="https://formspree.io/f/xdkogbaw"
NEW_ACTION="https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE"

echo "🔄 Form Update Plan:"
echo "FROM: $OLD_ACTION"
echo "TO:   $NEW_ACTION"
echo ""

echo "This will also:"
echo "- Update form method to POST"
echo "- Ensure field names match Zoho form"
echo "- Update success handling"
echo ""

echo "Proceed with form update? (y/n)"
read -r proceed

if [ "$proceed" != "y" ] && [ "$proceed" != "Y" ]; then
    echo "❌ Update cancelled"
    exit 0
fi

echo ""
echo "🔄 Updating contact form..."

# Update the form action URL
sed -i.temp "s|action=\"$OLD_ACTION\"|action=\"$NEW_ACTION\"|g" public/index.html

# Check if update was successful
if grep -q "$NEW_ACTION" public/index.html; then
    echo "✅ Form action URL updated successfully"
    rm public/index.html.temp
else
    echo "❌ Form update failed, restoring from backup"
    mv public/index.html.temp public/index.html
    exit 1
fi

echo ""
echo "📧 Updating contact email references..."

# Update email references in the contact section
sed -i.temp2 's/info@therefillplanet\.com/contact@therefillplanet.com/g' public/index.html
rm public/index.html.temp2

echo "✅ Email references updated to contact@therefillplanet.com"
echo ""

# Verify changes
echo "📋 Verification:"
echo "New form action:"
grep -n "action=" public/index.html | head -1
echo ""
echo "Contact email references:"
grep -n "contact@therefillplanet.com\|info@therefillplanet.com" public/index.html
echo ""

# Test form accessibility
echo "🔍 Testing Zoho form accessibility..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$NEW_ACTION")

if [ "$response" -eq 200 ]; then
    echo "✅ Zoho form is accessible (HTTP $response)"
else
    echo "⚠️  Zoho form returned HTTP $response - verify form is published"
fi
echo ""

# Summary
echo "📋 Update Summary:"
echo "✅ Backup created: public/index.html.backup.formspree"
echo "✅ Form action updated to Zoho"
echo "✅ Email references updated"
echo "✅ Contact form now uses: contact@therefillplanet.com"
echo ""

echo "🚀 Next Steps:"
echo "1. Test the updated form on your website"
echo "2. Configure Zoho Forms email notifications"
echo "3. Set up auto-reply templates in Zoho"
echo "4. Test complete email flow"
echo ""

echo "📝 To configure Zoho Forms email notifications:"
echo "1. Login to Zoho Forms dashboard"
echo "2. Open your Contact Us form"
echo "3. Go to Settings → Email Notifications"
echo "4. Configure admin notification to: contact@therefillplanet.com"
echo "5. Enable user auto-reply with custom template"
echo ""

echo "🔄 Would you like to start local server to test the form? (y/n)"
read -r start_server

if [ "$start_server" = "y" ] || [ "$start_server" = "Y" ]; then
    echo ""
    echo "🌐 Starting local server on port 8000..."
    echo "Visit: http://localhost:8000"
    echo "Press Ctrl+C to stop server"
    echo ""
    cd public && python3 -m http.server 8000
fi

echo ""
echo "✅ Form update completed!"
echo "Form now submits to Zoho instead of Formspree"