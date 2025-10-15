# Zoho Mail Setup Guide for RefillPlanet

## 🎯 **Complete Email Solution for RefillPlanet**

### **Your Requirements:**
✅ Domain mailbox: contact@therefillplanet.com  
✅ Receive contact form submissions  
✅ Send confirmation emails to users  
✅ Professional email for partner communications  

---

## 📋 **Step 1: Setup Zoho Mail**

### **1.1 Create Zoho Mail Account**
```
URL: https://mail.zoho.com/
Choose Plan:
- Free: 1 user, 5GB storage
- Paid: $1/month per user, 30GB storage (RECOMMENDED)
```

### **1.2 Add Your Domain**
1. Login to Zoho Mail Admin Console
2. Go to **Control Panel > Domains**
3. Click **Add Domain**
4. Enter: `therefillplanet.com`
5. Choose verification method: **DNS TXT Record**

### **1.3 Domain Verification**
Add this TXT record to your domain DNS:
```
Name: @
Type: TXT
Value: zoho-verification=zb########## (provided by Zoho)
TTL: 3600
```

**Check verification:**
```bash
# Run this command to verify DNS propagation
nslookup -type=TXT therefillplanet.com
```

---

## 📧 **Step 2: Configure Email Accounts**

### **2.1 Create Professional Email Addresses**
```
Primary: contact@therefillplanet.com
Secondary: info@therefillplanet.com
Optional: partnerships@therefillplanet.com
```

### **2.2 Setup Email Forwarding**
- Forward all emails to your main account
- Configure auto-reply for immediate responses

### **2.3 Update DNS MX Records**
Add these MX records to your domain:
```
Priority: 10, Mail Server: mx.zoho.com
Priority: 20, Mail Server: mx2.zoho.com
Priority: 50, Mail Server: mx3.zoho.com
```

**Verify MX records:**
```bash
# Check MX record configuration
nslookup -type=MX therefillplanet.com
```

---

## 🔧 **Step 3: Configure SPF, DKIM, DMARC**

### **3.1 SPF Record (Anti-Spam)**
```
Name: @
Type: TXT
Value: v=spf1 include:zoho.com ~all
TTL: 3600
```

### **3.2 DKIM Record (Email Authentication)**
1. Go to Zoho Mail > Email Authentication
2. Generate DKIM key
3. Add provided TXT record to DNS

### **3.3 DMARC Record (Email Security)**
```
Name: _dmarc
Type: TXT
Value: v=DMARC1; p=quarantine; rua=mailto:contact@therefillplanet.com
TTL: 3600
```

---

## 📝 **Step 4: Setup Auto-Reply Templates**

### **4.1 Contact Form Auto-Reply Template**
```
Subject: Thank you for contacting RefillPlanet!

Dear [Customer Name],

Thank you for reaching out to RefillPlanet! We've received your message and will respond within 24 hours.

Your Message Details:
- Subject: [Subject]
- Received: [Date/Time]

In the meantime, feel free to explore our sustainability solutions at therefillplanet.com.

Best regards,
The RefillPlanet Team
contact@therefillplanet.com
```

### **4.2 Partnership Inquiry Template**
```
Subject: Partnership Inquiry Received - RefillPlanet

Dear [Partner Name],

Thank you for your interest in partnering with RefillPlanet!

We're excited about potential collaboration opportunities. Our partnerships team will review your inquiry and respond within 2 business days.

What's Next:
1. Initial review of your inquiry
2. Partnership assessment call
3. Customized collaboration proposal

Best regards,
RefillPlanet Partnerships Team
partnerships@therefillplanet.com
```

---

## 🌐 **Step 5: Zoho Forms Configuration**

### **5.1 Access Your Existing Form**
```
URL: https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE
Status: ✅ Already Created
```

### **5.2 Configure Form Settings**
1. **Email Notifications:**
   - Admin Email: contact@therefillplanet.com
   - User Confirmation: Enable
   - Auto-Reply: Enable

2. **Form Fields:**
   - Name (Required)
   - Email (Required)
   - Subject (Required)
   - Message (Required)

3. **Success Page:**
   - Redirect to: thank-you confirmation
   - Message: "Thank you! We'll respond within 24 hours."

---

## 🔗 **Step 6: Website Integration**

### **6.1 Update Contact Form Action**
Replace in `public/index.html`:
```html
<!-- OLD: Formspree -->
<form action="https://formspree.io/f/xdkogbaw" method="POST">

<!-- NEW: Zoho Forms -->
<form action="https://forms.zohopublic.com/shopperlucom1/form/ContactUs/formperma/1S_8m5wlWWmt5BAco4OCEyWy_NgZkwUn64NY-qBpsvE" method="POST">
```

### **6.2 Update Contact Information**
```html
<!-- Update email display -->
<p>contact@therefillplanet.com</p>
```

---

## 🧪 **Step 7: Testing Checklist**

### **7.1 Email Delivery Test**
- [ ] Send test email to contact@therefillplanet.com
- [ ] Verify receipt in Zoho Mail inbox
- [ ] Check spam folder if not received

### **7.2 Form Submission Test**
- [ ] Submit test form on website
- [ ] Verify admin notification received
- [ ] Verify user auto-reply sent
- [ ] Check email formatting and content

### **7.3 Professional Email Test**
- [ ] Send email from contact@therefillplanet.com
- [ ] Verify professional sender display
- [ ] Test reply functionality

---

## 📊 **DNS Configuration Summary**

### **Required DNS Records:**
```
# Domain Verification
@ TXT zoho-verification=zb##########

# Email Routing
@ MX 10 mx.zoho.com
@ MX 20 mx2.zoho.com  
@ MX 50 mx3.zoho.com

# Email Security
@ TXT v=spf1 include:zoho.com ~all
_dmarc TXT v=DMARC1; p=quarantine; rua=mailto:contact@therefillplanet.com
[selector]._domainkey TXT [DKIM-key-from-zoho]
```

---

## 💰 **Cost Breakdown**

### **Zoho Mail Pricing:**
```
Free Plan: $0/month
- 1 user account
- 5GB storage
- Basic features

Standard Plan: $1/month per user
- 30GB storage
- Email aliases
- POP/IMAP access
- Advanced features (RECOMMENDED)
```

### **Total Monthly Cost: $1-3**
- Much cheaper than Google Workspace ($6/month)
- Professional email + forms included

---

## 🚀 **Implementation Timeline**

### **Day 1: Setup & Configuration**
- [ ] Create Zoho Mail account
- [ ] Add domain and verify
- [ ] Configure DNS records

### **Day 2: Email Setup**
- [ ] Create email accounts
- [ ] Setup auto-reply templates  
- [ ] Configure form notifications

### **Day 3: Website Integration**
- [ ] Update contact form
- [ ] Test end-to-end workflow
- [ ] Deploy changes

---

## 📞 **Support Resources**

### **Zoho Documentation:**
- Mail Setup: https://help.zoho.com/portal/en/kb/mail
- Forms Guide: https://help.zoho.com/portal/en/kb/forms
- DNS Configuration: https://help.zoho.com/portal/en/kb/mail/dns-configuration

### **Quick Help:**
- Zoho Support: 24/7 chat available
- Community Forums: help.zoho.com/portal/community
- Video Tutorials: YouTube Zoho Official

---

## ⚠️ **Important Notes**

1. **DNS Propagation:** Changes take 24-48 hours to fully propagate
2. **Backup Plan:** Keep Formspree active during transition
3. **Testing Required:** Always test before going live
4. **Email Limits:** Free plan has sending limits, upgrade if needed

**Ready to implement? Let's start with Step 1!**