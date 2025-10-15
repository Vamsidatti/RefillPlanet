# Zoho Email Templates for RefillPlanet

## 📧 **Auto-Reply Template for Contact Form Submissions**

### **Template Name:** Contact Form Auto-Reply
### **Subject:** Thank you for contacting RefillPlanet!

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank you for contacting RefillPlanet</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background: linear-gradient(135deg, #2E8B57, #48D1CC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting RefillPlanet!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Building a Sustainable Future Together</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear <strong>{name}</strong>,</p>
        
        <p>Thank you for reaching out to RefillPlanet! We've received your message and truly appreciate your interest in our sustainable solutions.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2E8B57; margin: 20px 0;">
            <h3 style="color: #2E8B57; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> {subject}</p>
            <p><strong>Message:</strong> {message}</p>
            <p><strong>Received:</strong> {submission_date}</p>
        </div>
        
        <h3 style="color: #2E8B57;">What Happens Next?</h3>
        <ul style="padding-left: 20px;">
            <li>Our team will review your inquiry within <strong>24 hours</strong></li>
            <li>You'll receive a personalized response addressing your specific needs</li>
            <li>We'll provide detailed information about our sustainability solutions</li>
        </ul>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2E8B57; margin-top: 0;">🌍 While You Wait...</h3>
            <p>Explore how RefillPlanet is revolutionizing sustainability:</p>
            <ul>
                <li><strong>Refill Stations:</strong> Smart water refill solutions for venues</li>
                <li><strong>Patent-Pending Technology:</strong> Optimized for maximum environmental impact</li>
                <li><strong>Partnership Opportunities:</strong> Join our growing network of sustainable venues</li>
            </ul>
            <p><a href="https://therefillplanet.com" style="color: #2E8B57; text-decoration: none; font-weight: bold;">Learn More →</a></p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="margin-bottom: 10px; color: #666;">Follow our sustainability journey:</p>
            <a href="#" style="color: #2E8B57; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
            <a href="#" style="color: #2E8B57; text-decoration: none; margin: 0 10px;">Twitter</a> |
            <a href="#" style="color: #2E8B57; text-decoration: none; margin: 0 10px;">Instagram</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">Best regards,</p>
        <p style="font-weight: bold; color: #2E8B57; margin: 0;">The RefillPlanet Team</p>
        <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
            📧 contact@therefillplanet.com<br>
            🌐 <a href="https://therefillplanet.com" style="color: #2E8B57;">therefillplanet.com</a>
        </p>
    </div>
    
</body>
</html>
```

---

## 📧 **Admin Notification Template for New Submissions**

### **Template Name:** New Contact Form Submission
### **Subject:** New Contact Form Submission - RefillPlanet

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background: #2E8B57; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🚨 New Contact Form Submission</h1>
        <p style="color: white; margin: 10px 0 0 0;">RefillPlanet Website</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
        
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
            <h3 style="color: #2E8B57; margin-top: 0;">Contact Information:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                    <td style="padding: 8px 0;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:{email}" style="color: #2E8B57;">{email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                    <td style="padding: 8px 0;">{subject}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Submitted:</td>
                    <td style="padding: 8px 0;">{submission_date}</td>
                </tr>
            </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <h3 style="color: #2E8B57; margin-top: 0;">Message:</h3>
            <div style="background: #f8f8f8; padding: 15px; border-radius: 6px; border-left: 4px solid #2E8B57;">
                {message}
            </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0; padding: 20px; background: #e8f5e8; border-radius: 8px;">
            <h3 style="color: #2E8B57; margin-top: 0;">Quick Actions:</h3>
            <a href="mailto:{email}?subject=Re: {subject}" style="background: #2E8B57; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">📧 Reply Now</a>
            <a href="https://mail.zoho.com/" style="background: #48D1CC; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">📬 Open Zoho Mail</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 14px; text-align: center;">
            This notification was sent from your RefillPlanet contact form<br>
            <a href="https://therefillplanet.com" style="color: #2E8B57;">therefillplanet.com</a>
        </p>
    </div>
    
</body>
</html>
```

---

## 📧 **Partnership Inquiry Auto-Reply Template**

### **Template Name:** Partnership Inquiry Response
### **Subject:** Partnership Inquiry Received - RefillPlanet

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Partnership Inquiry - RefillPlanet</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background: linear-gradient(135deg, #2E8B57, #48D1CC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🤝 Partnership Inquiry Received</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Let's Build Sustainability Together</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear <strong>{name}</strong>,</p>
        
        <p>Thank you for your interest in partnering with RefillPlanet! We're excited about the potential for collaboration and the positive environmental impact we can create together.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2E8B57; margin: 20px 0;">
            <h3 style="color: #2E8B57; margin-top: 0;">Next Steps in Our Partnership Process:</h3>
            <ol style="padding-left: 20px;">
                <li><strong>Initial Review</strong> - Our partnerships team will review your inquiry (24-48 hours)</li>
                <li><strong>Partnership Assessment</strong> - We'll schedule a call to discuss your needs and goals</li>
                <li><strong>Custom Proposal</strong> - We'll create a tailored collaboration plan for your organization</li>
                <li><strong>Implementation</strong> - Once approved, we'll begin the implementation process</li>
            </ol>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2E8B57; margin-top: 0;">🌟 Partnership Benefits:</h3>
            <ul style="padding-left: 20px;">
                <li><strong>Environmental Impact:</strong> Measurable reduction in single-use plastic</li>
                <li><strong>Customer Engagement:</strong> Enhanced sustainability credentials for your venue</li>
                <li><strong>Revenue Opportunities:</strong> Potential for additional revenue streams</li>
                <li><strong>Brand Enhancement:</strong> Association with cutting-edge sustainability technology</li>
                <li><strong>Data Insights:</strong> Real-time impact tracking and reporting</li>
            </ul>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
            <h3 style="color: #2E8B57; margin-top: 0;">📊 Your Partnership Inquiry:</h3>
            <p><strong>Organization:</strong> {organization}</p>
            <p><strong>Partnership Type:</strong> {partnership_type}</p>
            <p><strong>Inquiry Details:</strong> {message}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f0f8f0; border-radius: 8px;">
            <h3 style="color: #2E8B57; margin-top: 0;">🤝 Schedule a Partnership Call</h3>
            <p>Ready to discuss your partnership opportunity?</p>
            <a href="mailto:partnerships@therefillplanet.com?subject=Partnership Discussion - {name}" style="background: #2E8B57; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">📅 Schedule Partnership Call</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">Best regards,</p>
        <p style="font-weight: bold; color: #2E8B57; margin: 0;">RefillPlanet Partnerships Team</p>
        <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
            📧 partnerships@therefillplanet.com<br>
            🌐 <a href="https://therefillplanet.com" style="color: #2E8B57;">therefillplanet.com</a>
        </p>
    </div>
    
</body>
</html>
```

---

## 🔧 **Template Setup Instructions for Zoho**

### **Step 1: Access Zoho Forms**
1. Login to Zoho Forms: https://forms.zoho.com/
2. Navigate to your "Contact Us" form
3. Go to **Settings** > **Notifications**

### **Step 2: Configure Admin Notifications**
1. **Enable Email Notifications**
2. **Admin Email:** contact@therefillplanet.com
3. **Subject:** New Contact Form Submission - RefillPlanet
4. **Email Template:** Use the "Admin Notification Template" above

### **Step 3: Configure Auto-Reply**
1. **Enable Auto-Reply**
2. **Reply-To Field:** email (the email field from your form)
3. **Subject:** Thank you for contacting RefillPlanet!
4. **Email Template:** Use the "Auto-Reply Template" above

### **Step 4: Template Variables**
Use these variables in your templates:
```
{name} - Submitter's name
{email} - Submitter's email
{subject} - Message subject
{message} - Message content
{submission_date} - Date/time of submission
{organization} - Organization name (if field exists)
{partnership_type} - Partnership type (if field exists)
```

### **Step 5: Test Templates**
1. Submit a test form
2. Verify admin notification received
3. Check auto-reply formatting
4. Test all links and formatting

---

## 📱 **Mobile-Responsive Notes**
All templates are designed to be mobile-responsive with:
- Max-width: 600px for optimal mobile viewing
- Inline CSS for maximum email client compatibility
- Professional color scheme matching RefillPlanet branding
- Clear call-to-action buttons
- Structured layout for easy reading

**Ready to implement these templates in your Zoho Forms!** 🚀