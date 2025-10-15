# EmailJS Implementation Steps

## Step 1: Create EmailJS Account (5 minutes)

1. Go to https://www.emailjs.com/
2. Click "Sign Up" 
3. Use your email to create account
4. Verify your email

## Step 2: Add Email Service (5 minutes)

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your email provider)
4. Connect your email account (the one you want to receive messages)
5. Note down the **Service ID** (something like `service_abc123`)

## Step 3: Create Email Template (5 minutes)

1. Go to "Email Templates"
2. Click "Create New Template" 
3. Use this template:

**Template Name:** contact_form

**Subject:** New Contact Form Message - {{subject}}

**Content:**
```
Hello,

You have received a new message from your RefillPlanet website:

Name: {{from_name}}
Email: {{from_email}}  
Subject: {{subject}}

Message:
{{message}}

---
Sent from RefillPlanet Contact Form
Website: https://therefillplanet.com
Date: {{reply_to}}
```

4. Save and note the **Template ID** (something like `template_xyz789`)

## Step 4: Get Public Key (2 minutes)

1. Go to "Account" → "General"
2. Copy your **Public Key** (something like `abc123def456`)

## Ready to Implement!

Once you have these 3 values, I'll update the code:
- Service ID: service_abc123
- Template ID: template_xyz789  
- Public Key: abc123def456