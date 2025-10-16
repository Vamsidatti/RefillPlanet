# How to Get Zoho App Password for Email Server

## Step 1: Generate Zoho App Password

1. **Go to Zoho Account Settings**
   - Visit: https://accounts.zoho.com/
   - Sign in with your Zoho account

2. **Navigate to Security**
   - Click on "Security" in the left menu
   - Or go directly to: https://accounts.zoho.com/home#security

3. **Generate App Password**
   - Look for "App Passwords" section
   - Click "Generate New Password"
   - Give it a name like "RefillPlanet Website"
   - **Copy the generated password** - you'll need this!

## Step 2: Zoho SMTP Configuration

Your Zoho SMTP settings:
```
SMTP Server: smtp.zoho.com
Port: 587 (TLS) or 465 (SSL)
Security: TLS/STARTTLS
```

## Step 3: Configure Your .env File

Edit your `.env` file with these settings:

```bash
# Email Configuration
EMAIL_SERVICE=zoho
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=contact@therefillplanet.com
EMAIL_PASS=your-app-password-here
EMAIL_TO=contact@therefillplanet.com
PORT=3000
```

## Example .env File:
```bash
EMAIL_SERVICE=zoho
EMAIL_HOST=smtp.zoho.com  
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=contact@therefillplanet.com
EMAIL_PASS=abcd1234efgh5678
EMAIL_TO=contact@therefillplanet.com
PORT=3000
```

## Important Notes:
- ✅ Use the **app password**, not your regular Zoho password
- ✅ Your `.env` file is already ignored by git (secure)
- ✅ Use port 587 with TLS for best compatibility
- ✅ Set EMAIL_TO to where you want to receive form submissions