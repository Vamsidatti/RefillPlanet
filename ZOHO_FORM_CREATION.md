# Zoho Forms Creation Guide for RefillPlanet

## 🎯 **Quick Setup - Create Your Contact Form**

### **Step 1: Create New Form**
1. In Zoho Forms dashboard, click **"Create Form"**
2. Choose **"Start from Scratch"** or **"Contact Form"** template
3. Name your form: **"RefillPlanet Contact Form"**

### **Step 2: Add Required Fields**
**Add these exact fields to match your website:**

1. **Name Field:**
   - Field Type: **Single Line Text**
   - Field Label: **"Full Name"**
   - Field Name: **"Name"**
   - Mark as **Required**

2. **Email Field:**
   - Field Type: **Email**
   - Field Label: **"Email Address"**
   - Field Name: **"Email"**
   - Mark as **Required**

3. **Subject Field:**
   - Field Type: **Single Line Text**
   - Field Label: **"Subject"**
   - Field Name: **"Subject"**
   - Mark as **Required**

4. **Message Field:**
   - Field Type: **Multi Line Text**
   - Field Label: **"Message"**
   - Field Name: **"Message"**
   - Mark as **Required**
   - Set rows to **5**

### **Step 3: Configure Form Settings**

#### **3.1 Email Notifications:**
1. Go to **Settings** → **Notifications**
2. Click **"Add Notification"**
3. Set **Trigger**: "On form submission"
4. Set **To Email**: Your email address
5. Customize **Subject**: "New Contact from RefillPlanet - {{Subject}}"
6. Customize **Message**: Include form fields like {{Name}}, {{Email}}, {{Subject}}, {{Message}}
7. **Save** the notification

#### **3.2 Access Settings:**
1. Go to **Settings** → **Access**
2. Set **Form Access**: "Public"
3. Enable **"Allow external websites to submit"**
4. Add **Allowed Domains**: `therefillplanet.com`
5. **Save** settings

#### **3.3 Thank You Page:**
1. Go to **Settings** → **Thank You Page**
2. Choose **"Show custom message"**
3. Set message: "Thank you! Your message has been sent successfully. We'll get back to you soon."

### **Step 4: Test Your Form**

#### **4.1 Test Direct Form Submission:**
1. Go to **Share** → **Preview**
2. Fill out the form with test data:
   - Name: "Test User"
   - Email: Your email
   - Subject: "Test Message"
   - Message: "This is a test from Zoho Forms"
3. Submit the form
4. Check if you receive email notification

#### **4.2 Get Form Integration URL:**
1. Go to **Share** → **Embed**
2. Copy the **Form URL** (looks like: `https://forms.zoho.com/username/form/FormName/formperma/xxxxx`)
3. **Save this URL** - we'll need it for website integration

## ✅ **Verification Checklist**

After completing the setup above:

- [ ] Form created with name "RefillPlanet Contact Form"
- [ ] All 4 fields added (Name, Email, Subject, Message)
- [ ] All fields marked as required
- [ ] Email notification configured to your email
- [ ] Form access set to public with domain allowed
- [ ] Test submission completed successfully
- [ ] You received test email notification
- [ ] Form URL copied for integration

## 🚀 **Once Complete**

When you finish this setup and have the form URL, let me know and I'll:

1. Update your website to use the Zoho form
2. Test the integration end-to-end
3. Verify email delivery works from your website

## 📋 **Current Status Check**

**Tell me:**
1. Did you find any existing forms in your Zoho dashboard?
2. If creating new - which step are you on?
3. Do you need help with any specific step?
4. Have you completed the test and received the email?

**Once you have the form URL, we'll integrate it with your website!**