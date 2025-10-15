# Zoho Email Integration Setup for RefillPlanet Contact Form

## Overview
This guide will help you set up Zoho Forms to handle email submissions from your RefillPlanet contact form on GitHub Pages.

## Option 1: Zoho Forms (Recommended for GitHub Pages)

### Step 1: Create Zoho Account
1. Go to [https://www.zoho.com/forms/](https://www.zoho.com/forms/)
2. Sign up for a free Zoho account
3. Access Zoho Forms from your dashboard

### Step 2: Create Contact Form
1. Click "Create Form" in Zoho Forms
2. Choose "Contact Form" template or create from scratch
3. Add these fields to match your website form:
   - **Name** (Single Line Text)
   - **Email** (Email field)
   - **Subject** (Single Line Text)
   - **Message** (Multi Line Text)

### Step 3: Configure Form Settings
1. **Form Name**: "RefillPlanet Contact Form"
2. **Form Settings** → **Notifications**:
   - Enable email notifications
   - Set your email address to receive submissions
   - Customize email template if needed
3. **Form Settings** → **Access**:
   - Enable "Allow access from external websites"
   - Add your domain: `therefillplanet.com`

### Step 4: Get Form Integration Code
1. Go to **Share** → **Embed**
2. Choose **JavaScript Embed**
3. Copy the form permalink URL
4. Note: You'll need the form's webhook URL or permalink

### Step 5: Update Website Code
Replace the placeholder URL in `public/js/script.js`:
```javascript
const zohoFormURL = 'YOUR_ACTUAL_ZOHO_FORM_URL_HERE';
```

### Step 6: Test Integration
1. Submit a test message through your contact form
2. Check your email for notifications
3. Verify submissions in Zoho Forms dashboard

## Option 2: Zoho Mail API (Advanced)

If you prefer direct API integration:

### Requirements:
- Zoho Mail account
- Server-side script (Node.js, PHP, or serverless function)
- API credentials

### Setup:
1. Create Zoho Mail account
2. Generate API credentials in Zoho Developer Console
3. Set up serverless function (Vercel, Netlify Functions, or AWS Lambda)
4. Configure SMTP or API integration

## Option 3: Zoho SalesIQ (Alternative)

For real-time chat with email capture:
1. Set up Zoho SalesIQ
2. Add chat widget to website
3. Configure lead capture forms

## Current Status

✅ **Completed:**
- Contact form HTML updated for Zoho compatibility
- JavaScript form handling updated
- Form validation adjusted for new field names
- Temporary success message implemented

⏳ **Next Steps:**
1. Create Zoho Forms account
2. Set up contact form in Zoho
3. Get form webhook/permalink URL
4. Update JavaScript with actual Zoho URL
5. Test email delivery

## Testing the Current Setup

The form is ready to test with temporary messaging. To complete the integration:

1. Fill out the Zoho Forms setup (Steps 1-4 above)
2. Replace the placeholder URL in the JavaScript
3. Test the integration
4. Verify email delivery

## Benefits of Zoho Integration

✅ **Professional email handling**
✅ **Form analytics and reporting**
✅ **Spam protection**
✅ **Custom email templates**
✅ **Integration with other Zoho services**
✅ **Free tier available**

## Files Modified

- `public/index.html` - Updated form field names for Zoho compatibility
- `public/js/script.js` - Updated form handling and validation
- Added this setup guide

## Support

For issues with Zoho setup:
- Zoho Forms Documentation: https://help.zoho.com/portal/en/kb/forms
- Zoho Support: https://help.zoho.com/portal/en/home

---

**Next Action Required:** Complete Zoho Forms setup and update the form URL in the JavaScript file.