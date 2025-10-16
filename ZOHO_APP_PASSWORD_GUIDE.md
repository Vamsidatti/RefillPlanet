# 🔐 How to Generate Zoho App Password

## Step-by-Step Guide to Get Your Zoho App Password

### 1. **Log into Your Zoho Account**
- Go to [https://www.zoho.com/mail/](https://www.zoho.com/mail/)
- Sign in with your Zoho email credentials

### 2. **Navigate to Security Settings**
- Click on your **profile picture/avatar** in the top-right corner
- Select **"My Account"** from the dropdown menu
- In the left sidebar, click on **"Security"**

### 3. **Access App-Specific Passwords**
- Look for **"App Passwords"** or **"Application-Specific Passwords"** section
- Click on **"Generate App Password"** or **"Create New Password"**

### 4. **Create the App Password**
- **Application Name**: Enter something like "RefillPlanet Email Server" or "Website Contact Form"
- **Application Type**: Select "Other" or "Mail Client"
- Click **"Generate"** or **"Create"**

### 5. **Copy Your App Password**
- Zoho will display a **16-character password** (like: `abcd-efgh-ijkl-mnop`)
- **⚠️ IMPORTANT**: Copy this password immediately - you won't be able to see it again!
- Save it temporarily in a secure location

### 6. **Update Your .env File**
Open your `.env` file and update it with your actual details:

```bash
# Email Configuration for Zoho
EMAIL_SERVICE=zoho
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-actual-email@yourdomain.com
EMAIL_PASS=abcd-efgh-ijkl-mnop
EMAIL_TO=contact@therefillplanet.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 📋 What You Need to Tell Me

To help you configure this correctly, please provide:

1. **Your Zoho email address** - What email do you want to send from?
   - Example: `contact@therefillplanet.com` or `yourname@zoho.com`

2. **Your domain type** - Is it:
   - A Zoho Mail account (`@zoho.com`, `@zohomail.com`)
   - A custom domain hosted on Zoho (`@yourdomain.com`)

3. **Where to send contact form emails** - What email should receive the messages?
   - This could be the same as your sending email or different

## 🔍 Alternative: Finding App Passwords

If you can't find "App Passwords" in Security settings, try:

1. **Two-Factor Authentication Section**
   - Sometimes app passwords are under 2FA settings
   - You may need to enable 2FA first

2. **Account Settings**
   - Check under "Account Settings" → "Security"
   - Look for "Application Passwords" or "Third-party app access"

3. **Mail Settings**
   - Go to Zoho Mail directly
   - Check Settings → Security → App Passwords

## ⚠️ Troubleshooting

**If you can't find App Password option:**
- You may need to enable Two-Factor Authentication first
- Some Zoho accounts require 2FA before allowing app passwords

**If the option is grayed out:**
- Contact your Zoho admin (if using business account)
- Check if your account type supports app passwords

## 🧪 Testing Your Configuration

Once you have your app password:

1. Update your `.env` file with the real values
2. Run the server: `node server/email-server.js`
3. Test the contact form on your website
4. Check if emails are being sent successfully

## 🔒 Security Notes

- ✅ App passwords are safer than your main password
- ✅ You can revoke app passwords anytime from Zoho settings
- ✅ Each app password is unique to one application
- ❌ Never share or commit app passwords to git (they're in .env which is ignored)

---

**Next Step**: Once you generate your app password, paste it in your `.env` file and let me know if you need help testing the email functionality!