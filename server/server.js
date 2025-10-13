const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com', 'https://www.yourdomain.com'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 contact form submissions per hour
    message: {
        error: 'Too many contact form submissions from this IP, please try again later.'
    }
});

app.use(limiter);
app.use('/api/contact', contactLimiter);

// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Email transporter configuration
let transporter;

function createEmailTransporter() {
    const emailConfig = {
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    };

    // For development, you can use Ethereal Email (fake SMTP service)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email credentials not found. Using Ethereal Email for testing.');
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ethereal.user@ethereal.email',
                pass: 'ethereal.pass'
            }
        });
    }

    return nodemailer.createTransport(emailConfig);
}

transporter = createEmailTransporter();

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Please fill in all required fields (name, email, subject, message).'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email',
                message: 'Please provide a valid email address.'
            });
        }

        // Sanitize inputs
        const sanitizedData = {
            name: name.trim().substring(0, 100),
            email: email.trim().toLowerCase().substring(0, 100),
            phone: phone ? phone.trim().substring(0, 20) : '',
            subject: subject.trim().substring(0, 200),
            message: message.trim().substring(0, 2000)
        };

        // Email template for admin
        const adminEmailTemplate = `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                <div style="background-color: #2ecc71; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h2 style="margin: 0;">New Contact Form Submission</h2>
                    <p style="margin: 10px 0 0 0;">RefillPlanet Website</p>
                </div>
                
                <div style="padding: 30px 20px;">
                    <h3 style="color: #2c3e50; border-bottom: 2px solid #2ecc71; padding-bottom: 10px;">Contact Details</h3>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #e9ecef; width: 120px;">Name:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e9ecef;">${sanitizedData.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #e9ecef;">Email:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e9ecef;"><a href="mailto:${sanitizedData.email}" style="color: #2ecc71;">${sanitizedData.email}</a></td>
                        </tr>
                        ${sanitizedData.phone ? `
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #e9ecef;">Phone:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e9ecef;"><a href="tel:${sanitizedData.phone}" style="color: #2ecc71;">${sanitizedData.phone}</a></td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #e9ecef;">Subject:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e9ecef;">${sanitizedData.subject}</td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #2c3e50; border-bottom: 2px solid #2ecc71; padding-bottom: 10px;">Message</h3>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2ecc71; margin: 20px 0;">
                        <p style="margin: 0; line-height: 1.6; color: #2c3e50;">${sanitizedData.message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
                        <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
                            Submitted on: ${new Date().toLocaleString()}<br>
                            IP Address: ${req.ip || req.connection.remoteAddress}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Auto-reply email template for user
        const userEmailTemplate = `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                <div style="background-color: #2ecc71; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h2 style="margin: 0;">Thank You for Contacting RefillPlanet!</h2>
                </div>
                
                <div style="padding: 30px 20px;">
                    <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">Dear ${sanitizedData.name},</p>
                    
                    <p style="color: #2c3e50; line-height: 1.6;">
                        Thank you for reaching out to RefillPlanet! We have received your message and appreciate your interest in our sustainable solutions.
                    </p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2ecc71; margin: 20px 0;">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Your Message Summary:</h3>
                        <p style="margin: 0; color: #7f8c8d;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
                        <p style="margin: 10px 0 0 0; color: #7f8c8d;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <p style="color: #2c3e50; line-height: 1.6;">
                        Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>. 
                        In the meantime, feel free to explore our website to learn more about our eco-friendly initiatives.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://yourwebsite.com" style="background-color: #2ecc71; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Visit Our Website</a>
                    </div>
                    
                    <p style="color: #2c3e50; line-height: 1.6;">
                        Best regards,<br>
                        <strong>The RefillPlanet Team</strong>
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
                        <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
                            RefillPlanet - Sustainable Solutions for a Better Tomorrow<br>
                            Email: info@refillplanet.com | Phone: +1 (555) 123-4567
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Send email to admin
        const adminMailOptions = {
            from: `"RefillPlanet Contact Form" <${process.env.EMAIL_USER || 'noreply@refillplanet.com'}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@refillplanet.com',
            subject: `New Contact Form: ${sanitizedData.subject}`,
            html: adminEmailTemplate,
            replyTo: sanitizedData.email
        };

        // Send auto-reply to user
        const userMailOptions = {
            from: `"RefillPlanet" <${process.env.EMAIL_USER || 'noreply@refillplanet.com'}>`,
            to: sanitizedData.email,
            subject: 'Thank you for contacting RefillPlanet - We\'ve received your message',
            html: userEmailTemplate
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        console.log(`✅ Contact form submitted successfully by ${sanitizedData.email}`);

        res.json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        
        res.status(500).json({
            error: 'Server error',
            message: 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong on our end. Please try again later.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RefillPlanet server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    
    if (process.env.NODE_ENV !== 'production') {
        console.log('\n📧 Email Configuration:');
        console.log(`   Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
        console.log(`   User: ${process.env.EMAIL_USER || 'Not configured'}`);
        console.log(`   Admin Email: ${process.env.ADMIN_EMAIL || 'Not configured'}`);
        console.log('\n⚠️  Make sure to set up your environment variables for email functionality!');
    }
});

module.exports = app;