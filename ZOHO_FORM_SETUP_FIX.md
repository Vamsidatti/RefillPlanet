# Zoho Form Setup Fix

## Issue Identified
The current Zoho form URL returns "Page not found" when accessed directly. This is normal behavior - Zoho forms are designed to receive POST submissions, not direct browser visits.

## Current Form URL
```
https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE
```

## Solution: Create New Zoho Form

### Step 1: Access Zoho Forms
1. Go to https://forms.zoho.com/
2. Sign in with your Zoho account

### Step 2: Create New Contact Form
1. Click "Create Form" or "New Form"
2. Choose "Contact Form" template or start blank
3. Name it: "RefillPlanet Contact Form"

### Step 3: Configure Form Fields
Add these essential fields:
- **Name** (Text, Required)
- **Email** (Email, Required) 
- **Subject** (Text, Required)
- **Message** (Paragraph Text, Required)
- **Company** (Text, Optional)

### Step 4: Configure Form Settings
1. **Form Settings** → **General**:
   - Enable "Allow public access"
   - Set form title: "Contact RefillPlanet"

2. **Form Settings** → **Notifications**:
   - **Email to Admin**: Enable and set to your email
   - **Auto-Reply to User**: Enable with professional message

3. **Form Settings** → **Integration**:
   - **Redirect After Submit**: Set custom thank you message
   - **Embed Options**: Get the public form URL

### Step 5: Get New Form URL
1. Go to **Share** → **Public Link**
2. Copy the new form URL
3. It should look like: `https://forms.zohopublic.com/[account]/form/[formname]/formperma/[id]`

### Step 6: Update Website
Replace the current form action URL in the website with the new one.

## Auto-Reply Email Template
```html
Subject: Thank you for contacting RefillPlanet

Dear ${Name},

Thank you for reaching out to RefillPlanet! We've received your message and will respond within 24 hours.

Your message details:
- Subject: ${Subject}
- Message: ${Message}

We're committed to making sustainable water solutions accessible to everyone.

Best regards,
The RefillPlanet Team
contact@therefillplanet.com
https://therefillplanet.com
```

## Testing the New Form
1. Submit a test message through your website
2. Check if you receive the admin notification
3. Verify the auto-reply is sent to the user
4. Confirm the form doesn't show "Page not found" errors

## Quick Fix Script
Run this after getting the new form URL:

```bash
# Replace [NEW_FORM_URL] with your actual new form URL
cd "/Users/vdatti/Documents/Vamsi Personal/RefillPlanet/refill-planet-web-ui"
sed -i '' 's|https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE|[NEW_FORM_URL]|g' public/index.html
git add . && git commit -m "Update to new working Zoho form URL" && git push
```