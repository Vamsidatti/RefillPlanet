#!/bin/bash

# Zoho Email Implementation Script for RefillPlanet
# This script helps implement complete Zoho Mail + Forms solution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="therefillplanet.com"
ZOHO_FORM_URL="https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE"
CONTACT_EMAIL="contact@therefillplanet.com"
WEBSITE_DIR="public"
INDEX_FILE="$WEBSITE_DIR/index.html"

echo -e "${BLUE}🚀 RefillPlanet Zoho Email Implementation${NC}"
echo -e "${BLUE}===========================================${NC}\n"

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
echo -e "${BLUE}📋 Step 1: Checking Current Setup${NC}"
echo "================================"

# Check if domain exists
if ping -c 1 $DOMAIN &> /dev/null; then
    print_status "Domain $DOMAIN is reachable"
else
    print_warning "Domain $DOMAIN might not be fully configured"
fi

# Check MX records
echo -e "\n🔍 Checking MX Records for $DOMAIN:"
MX_RECORDS=$(nslookup -type=MX $DOMAIN 2>/dev/null | grep "mail exchanger" || echo "No MX records found")
if [[ $MX_RECORDS == *"zoho"* ]]; then
    print_status "Zoho MX records detected"
    echo "$MX_RECORDS"
else
    print_warning "Zoho MX records not found or not propagated yet"
    echo "$MX_RECORDS"
fi

# Check if Zoho form is accessible
echo -e "\n🔍 Checking Zoho Form Accessibility:"
if curl -s -I "$ZOHO_FORM_URL" | grep -q "200 OK"; then
    print_status "Zoho form is accessible"
else
    print_warning "Zoho form might not be accessible"
fi

# Check current website form
echo -e "\n🔍 Checking Current Website Form:"
if [ -f "$INDEX_FILE" ]; then
    if grep -q "formspree.io" "$INDEX_FILE"; then
        print_info "Current form uses Formspree"
        CURRENT_ACTION=$(grep -o 'action="[^"]*formspree[^"]*"' "$INDEX_FILE" | head -1)
        echo "Current action: $CURRENT_ACTION"
    elif grep -q "zohopublic.com" "$INDEX_FILE"; then
        print_status "Current form already uses Zoho"
    else
        print_warning "Unknown form action detected"
    fi
else
    print_error "Website index.html not found at $INDEX_FILE"
    exit 1
fi

echo -e "\n${BLUE}📧 Step 2: Zoho Mail Setup Status${NC}"
echo "=================================="

echo -e "${YELLOW}Please complete these steps in Zoho Mail Admin Console:${NC}"
echo ""
echo "1. 📝 Create Zoho Mail Account:"
echo "   → Go to: https://mail.zoho.com/"
echo "   → Choose plan: Free ($0) or Standard ($1/month) - RECOMMENDED"
echo ""
echo "2. 🏷️  Add Domain $DOMAIN:"
echo "   → Control Panel > Domains > Add Domain"
echo "   → Enter: $DOMAIN"
echo "   → Complete verification process"
echo ""
echo "3. 📧 Create Email Accounts:"
echo "   → $CONTACT_EMAIL (Primary)"
echo "   → info@$DOMAIN (Secondary)"
echo ""
echo "4. 🔧 Configure DNS Records (if not done):"
echo "   → MX Records: mx.zoho.com, mx2.zoho.com, mx3.zoho.com"
echo "   → SPF: v=spf1 include:zoho.com ~all"
echo "   → DKIM: Get from Zoho Mail settings"
echo ""

read -p "Have you completed Zoho Mail setup? (y/n): " zoho_mail_setup

if [[ $zoho_mail_setup == "y" || $zoho_mail_setup == "Y" ]]; then
    print_status "Zoho Mail setup confirmed"
else
    print_warning "Please complete Zoho Mail setup first"
    echo "Refer to ZOHO_MAIL_SETUP.md for detailed instructions"
    exit 0
fi

echo -e "\n${BLUE}📝 Step 3: Zoho Forms Configuration${NC}"
echo "===================================="

echo "Your existing Zoho form URL:"
echo "$ZOHO_FORM_URL"
echo ""
echo -e "${YELLOW}Configure your Zoho form with these settings:${NC}"
echo ""
echo "📧 Email Notifications:"
echo "   → Admin Email: $CONTACT_EMAIL"
echo "   → Send notification on each submission: ✅ Enabled"
echo ""
echo "🔄 Auto-Reply Settings:"
echo "   → Enable auto-reply to submitter: ✅ Enabled"
echo "   → Auto-reply email field: email"
echo "   → Auto-reply template: Use professional template"
echo ""
echo "📊 Form Fields Required:"
echo "   → Name (Required)"
echo "   → Email (Required)" 
echo "   → Subject (Required)"
echo "   → Message (Required)"
echo ""

read -p "Have you configured Zoho Forms notifications? (y/n): " zoho_forms_setup

if [[ $zoho_forms_setup == "y" || $zoho_forms_setup == "Y" ]]; then
    print_status "Zoho Forms setup confirmed"
else
    print_warning "Please configure Zoho Forms notifications"
    echo "1. Go to your Zoho Forms dashboard"
    echo "2. Edit your Contact Us form"
    echo "3. Go to Settings > Notifications"
    echo "4. Configure admin and auto-reply emails"
    exit 0
fi

echo -e "\n${BLUE}🌐 Step 4: Update Website Contact Form${NC}"
echo "======================================"

# Create backup
BACKUP_FILE="${INDEX_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$INDEX_FILE" "$BACKUP_FILE"
print_status "Created backup: $BACKUP_FILE"

# Check current form action
CURRENT_FORMSPREE=$(grep -n "action.*formspree.io" "$INDEX_FILE" | head -1)
if [ -n "$CURRENT_FORMSPREE" ]; then
    LINE_NUM=$(echo "$CURRENT_FORMSPREE" | cut -d: -f1)
    print_info "Found Formspree form at line $LINE_NUM"
    
    read -p "Update website form to use Zoho? (y/n): " update_form
    
    if [[ $update_form == "y" || $update_form == "Y" ]]; then
        # Update form action
        sed -i.bak "s|action=\"[^\"]*formspree[^\"]*\"|action=\"$ZOHO_FORM_URL\"|g" "$INDEX_FILE"
        
        # Update email display
        sed -i.bak "s|info@therefillplanet\.com|$CONTACT_EMAIL|g" "$INDEX_FILE"
        
        print_status "Updated contact form to use Zoho"
        print_status "Updated contact email display"
        
        # Show changes
        echo -e "\n📝 Changes made:"
        echo "Old: Formspree action URL"
        echo "New: $ZOHO_FORM_URL"
        echo ""
        echo "Old: info@therefillplanet.com"  
        echo "New: $CONTACT_EMAIL"
        
    else
        print_info "Skipped form update"
    fi
else
    print_warning "No Formspree action found in current form"
fi

echo -e "\n${BLUE}🧪 Step 5: Testing Instructions${NC}"
echo "================================"

echo -e "${YELLOW}Complete Testing Checklist:${NC}"
echo ""
echo "1. 📧 Test Email Delivery:"
echo "   → Send test email to $CONTACT_EMAIL"
echo "   → Verify receipt in Zoho Mail inbox"
echo ""
echo "2. 📝 Test Contact Form:"
echo "   → Submit test form on website"
echo "   → Check admin notification at $CONTACT_EMAIL"
echo "   → Verify user receives auto-reply"
echo ""
echo "3. 🔄 Test Professional Email:"
echo "   → Send email from $CONTACT_EMAIL"
echo "   → Verify professional sender display"
echo "   → Test reply functionality"
echo ""

echo -e "\n${BLUE}🚀 Step 6: Deployment${NC}"
echo "===================="

read -p "Deploy changes to GitHub Pages? (y/n): " deploy_changes

if [[ $deploy_changes == "y" || $deploy_changes == "Y" ]]; then
    if [ -d ".git" ]; then
        print_info "Committing changes..."
        git add .
        git commit -m "Implement Zoho Mail + Forms integration

- Switch from Formspree to Zoho Forms
- Update contact form action URL
- Update contact email to contact@therefillplanet.com  
- Enable professional email with auto-reply
- Backup created: $BACKUP_FILE"
        
        print_info "Pushing to GitHub..."
        git push origin main
        
        print_status "Changes deployed to GitHub Pages"
        print_info "Changes will be live at https://therefillplanet.com in 2-5 minutes"
    else
        print_warning "Not a git repository - manual deployment required"
    fi
else
    print_info "Skipped deployment - changes saved locally"
fi

echo -e "\n${GREEN}🎉 Zoho Implementation Complete!${NC}"
echo "=================================="

echo -e "${YELLOW}Next Steps:${NC}"
echo "1. 📧 Test email delivery to $CONTACT_EMAIL"
echo "2. 📝 Submit test contact form"
echo "3. 🔄 Verify auto-reply functionality"
echo "4. 📞 Test professional email sending"
echo ""

echo -e "${YELLOW}Monitoring:${NC}"
echo "→ Zoho Mail: https://mail.zoho.com/"
echo "→ Zoho Forms: https://forms.zoho.com/"
echo "→ Website: https://therefillplanet.com/"
echo ""

echo -e "${YELLOW}Support Documentation:${NC}"
echo "→ Setup Guide: ZOHO_MAIL_SETUP.md"
echo "→ Backup File: $BACKUP_FILE"
echo ""

print_status "Professional email solution implemented successfully!"
echo -e "${BLUE}Your RefillPlanet email system is now powered by Zoho! 🚀${NC}"