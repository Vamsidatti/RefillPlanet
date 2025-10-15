# Zoho Forms Email Configuration Templates

## 🎯 **Configuration Overview**
Set up email notifications in your Zoho Contact Us form to handle:
1. **Admin notifications** → You receive form submissions
2. **User auto-replies** → Users get confirmation emails

---

## 📧 **ADMIN NOTIFICATION CONFIGURATION**

### **Settings Location:**
Zoho Forms Dashboard → Contact Us Form → Settings → Email Notifications → Admin Notification

### **Configuration:**
```
✅ Enable Admin Notification: ON

Recipient Email: contact@therefillplanet.com
Subject: New Contact Form Submission - ${Name}
```

### **Email Template:**
```html
Subject: New Contact Form Submission - ${Name}

You have received a new contact form submission on RefillPlanet.

CONTACT DETAILS:
================
Name: ${Name}
Email: ${Email}
Subject: ${Subject}

MESSAGE:
========
${Message}

SUBMISSION INFO:
===============
Date: ${Date}
Time: ${Time}
Form: Contact Us
Website: https://therefillplanet.com

---
Please respond to this inquiry within 24 hours.
RefillPlanet Contact Management System
```

---

## 📧 **USER AUTO-REPLY CONFIGURATION**

### **Settings Location:**
Zoho Forms Dashboard → Contact Us Form → Settings → Email Notifications → User Notification

### **Configuration:**
```
✅ Enable User Notification: ON

Send To: ${Email} (automatically uses user's submitted email)
From Name: RefillPlanet
From Email: contact@therefillplanet.com
Subject: Thank you for contacting RefillPlanet - We'll be in touch soon!
```

### **Auto-Reply Template:**
```html
Subject: Thank you for contacting RefillPlanet - We'll be in touch soon!

Dear ${Name},

Thank you for reaching out to RefillPlanet! We're excited to hear from you and appreciate your interest in our sustainable refill solutions.

YOUR MESSAGE DETAILS:
====================
Subject: ${Subject}
Message: ${Message}
Submitted: ${Date} at ${Time}

WHAT HAPPENS NEXT:
==================
• Our team will review your message within 24 hours
• You'll receive a personalized response from contact@therefillplanet.com
• For urgent matters, feel free to email us directly

LEARN MORE WHILE YOU WAIT:
=========================
🌍 Visit our website: https://therefillplanet.com
📧 Email us: contact@therefillplanet.com
🔗 Learn about our mission: https://therefillplanet.com#about

We're building a refill culture for a sustainable future, and we'd love to have you join us on this journey!

Best regards,
The RefillPlanet Team

---
RefillPlanet™
Building a Refill Culture for a Sustainable Future
Website: https://therefillplanet.com
Email: contact@therefillplanet.com

This is an automated confirmation email. Please do not reply directly to this message.
For direct communication, please email contact@therefillplanet.com
```

---

## 🔧 **ADVANCED CONFIGURATIONS**

### **1. Email Formatting**
```
Content Type: HTML
Character Encoding: UTF-8
Email Priority: Normal
```

### **2. Additional Settings**
```
✅ Send copy to submitter: ON
✅ Include form data in email: ON
✅ Send email immediately: ON
✅ Include IP address: OFF (privacy)
✅ Include browser info: OFF (privacy)
```

### **3. Conditional Logic (Optional)**
Set up different auto-replies based on subject:
- Subject contains "Partnership" → Forward to partners@therefillplanet.com
- Subject contains "Support" → Tag as high priority
- Subject contains "Press" → Forward to media contact

---

## 📋 **STEP-BY-STEP SETUP PROCESS**

### **Step 1: Access Form Settings**
1. Login to Zoho Forms: https://forms.zoho.com/
2. Find your "Contact Us" form
3. Click "Settings" → "Email Notifications"

### **Step 2: Configure Admin Notification**
1. Click "Admin Notification" tab
2. Toggle ON "Send notification to admin"
3. Enter recipient: `contact@therefillplanet.com`
4. Copy/paste admin template above
5. Click "Save"

### **Step 3: Configure User Auto-Reply**
1. Click "User Notification" tab  
2. Toggle ON "Send confirmation email to user"
3. Set From Email: `contact@therefillplanet.com`
4. Copy/paste user template above
5. Click "Save"

### **Step 4: Test Configuration**
1. Submit test form on website
2. Check admin email received at contact@therefillplanet.com
3. Verify user receives auto-reply
4. Confirm email formatting looks good

---

## 🎨 **EMAIL TEMPLATE CUSTOMIZATION**

### **Available Variables:**
- `${Name}` - User's name
- `${Email}` - User's email
- `${Subject}` - Form subject
- `${Message}` - User's message
- `${Date}` - Submission date
- `${Time}` - Submission time

### **HTML Formatting Options:**
```html
<h3>Header Text</h3>
<p><strong>Bold text</strong></p>
<p><em>Italic text</em></p>
<ul>
  <li>Bullet point</li>
</ul>
<a href="https://therefillplanet.com">Website Link</a>
```

---

## ⚡ **QUICK SETUP CHECKLIST**

### **Pre-Setup Requirements:**
- [ ] Zoho account active
- [ ] Contact Us form created
- [ ] Domain email configured (contact@therefillplanet.com)

### **Configuration Steps:**
- [ ] Admin notification enabled
- [ ] Admin email set to contact@therefillplanet.com  
- [ ] Admin template configured
- [ ] User auto-reply enabled
- [ ] User template configured
- [ ] From email set to contact@therefillplanet.com

### **Testing Steps:**
- [ ] Submit test form
- [ ] Verify admin notification received
- [ ] Verify user auto-reply received
- [ ] Check email formatting
- [ ] Test from different email addresses

---

## 🚨 **TROUBLESHOOTING**

### **Admin Not Receiving Emails:**
1. Check spam/junk folder
2. Verify contact@therefillplanet.com is active
3. Check Zoho Forms delivery settings
4. Verify form is published

### **Users Not Receiving Auto-Reply:**
1. Check auto-reply is enabled
2. Verify From email is correct
3. Test with different email providers
4. Check user's spam folder

### **Email Formatting Issues:**
1. Use HTML mode for rich formatting
2. Test templates before publishing
3. Keep templates under 100KB
4. Use web-safe fonts

---

## 📞 **Support Resources**

**Zoho Forms Help:**
- Email Notifications: https://help.zoho.com/portal/en/kb/forms/email-notifications
- Form Settings: https://help.zoho.com/portal/en/kb/forms/form-settings

**Need Help?**
Follow the setup guide and test thoroughly. The email system should work automatically once configured correctly!

**Ready to configure? Start with Step 1 above! 🚀**