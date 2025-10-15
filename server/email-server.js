const http = require('http');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
require('dotenv').config();

// Email configuration from environment variables
const EMAIL_CONFIG = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || 'contact@therefillplanet.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
    to: process.env.EMAIL_TO || 'contact@therefillplanet.com'
};

// Create email transporter
const transporter = nodemailer.createTransport({
    service: EMAIL_CONFIG.service,
    auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
    }
});

// MIME types for static files
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Helper function to serve static files
function serveStaticFile(res, filePath) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.writeHead(200, { 
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(data);
    });
}

// Helper function to send email
async function sendContactEmail(formData) {
    const mailOptions = {
        from: EMAIL_CONFIG.user,
        to: EMAIL_CONFIG.to,
        subject: `New Contact Form Message: ${formData.subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Sent from RefillPlanet Contact Form</em></p>
            <p><em>Date: ${new Date().toLocaleString()}</em></p>
        `,
        text: `
New Contact Form Submission

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from RefillPlanet Contact Form
Date: ${new Date().toLocaleString()}
        `
    };
    
    return transporter.sendMail(mailOptions);
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }
    
    // Handle form submission
    if (req.method === 'POST' && pathname === '/contact') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                // Parse form data
                const formData = querystring.parse(body);
                
                // Validate required fields
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    res.writeHead(400, { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: 'All fields are required' 
                    }));
                    return;
                }
                
                // Send email
                await sendContactEmail(formData);
                
                console.log(`✅ Email sent successfully from ${formData.name} (${formData.email})`);
                
                // Send success response
                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ 
                    success: true, 
                    message: 'Email sent successfully!' 
                }));
                
            } catch (error) {
                console.error('❌ Error sending email:', error);
                
                res.writeHead(500, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ 
                    success: false, 
                    error: 'Failed to send email. Please try again.' 
                }));
            }
        });
        
        return;
    }
    
    // Serve static files
    let filePath = path.join(__dirname, '..', 'public');
    
    if (pathname === '/') {
        filePath = path.join(filePath, 'index.html');
    } else {
        filePath = path.join(filePath, pathname);
    }
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(path.join(__dirname, '..', 'public'))) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    serveStaticFile(res, filePath);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 RefillPlanet server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured for: ${EMAIL_CONFIG.to}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, '..', 'public')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔄 Server shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});