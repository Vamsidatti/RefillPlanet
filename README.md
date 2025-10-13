# RefillPlanet Website

# RefillPlanet Website

A modern, responsive website for RefillPlanet with multiple templates and contact form functionality.

## 🚀 Live Website
[RefillPlanet Website](https://vamsidatti.github.io/RefillPlanet/) (Will be available after deployment)

## 🌟 Features

- **Modern Responsive Design**: Mobile-first design that works on all devices
- **Contact Form with Email**: Fully functional contact form that sends emails
- **Template Ready**: Easy to customize with different templates and themes
- **Fast Performance**: Optimized for speed and SEO
- **Secure**: Built with security best practices
- **Easy Deployment**: Ready for deployment on various platforms

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Email account for SMTP (Gmail, Outlook, etc.)

### Installation

1. **Clone or download the project**
   ```bash
   cd refill-planet-web-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your email credentials:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@refillplanet.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📧 Email Setup

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > 2-Step Verification > App passwords
3. Generate an App Password for "Mail"
4. Use this App Password in your `.env` file (not your regular Gmail password)

### Other Email Services

The system supports various email services. Update your `.env` file accordingly:

- **Outlook**: `EMAIL_SERVICE=outlook`
- **Yahoo**: `EMAIL_SERVICE=yahoo`
- **Zoho**: `EMAIL_SERVICE=zoho`

## 🏗️ Project Structure

```
refill-planet-web-ui/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   └── components.css # Component styles
│   ├── js/
│   │   └── script.js      # Main JavaScript
│   └── images/            # Image assets
├── server/
│   └── server.js          # Express server
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🎨 Customization

### Using Different Templates

1. **Replace CSS**: Update `public/css/style.css` with your template's CSS
2. **Update HTML**: Modify `public/index.html` structure as needed
3. **Add Assets**: Place images, fonts, etc. in appropriate folders
4. **Customize Colors**: Update CSS variables in `style.css`:

```css
:root {
    --primary-color: #2ecc71;    /* Change to your brand color */
    --secondary-color: #27ae60;   /* Complementary color */
    --accent-color: #3498db;      /* Accent color */
}
```

### Adding New Sections

1. Add HTML structure to `index.html`
2. Add corresponding CSS styles
3. Update navigation links if needed
4. Add JavaScript functionality if required

## 🚀 Deployment

### GitHub Pages (Current Setup)

Your website is automatically deployed to GitHub Pages:
- **URL**: `https://vamsidatti.github.io/RefillPlanet/`
- **Auto-deploy**: Pushes to `main` branch trigger deployment
- **Contact Forms**: Use Netlify Forms (already configured)
- **Cost**: Completely free

### Custom Domain Setup (Optional)

When you buy `therefillplanet.com`:
1. **Add DNS records**:
   ```
   Type: A, Name: @, Value: 185.199.108.153
   Type: A, Name: @, Value: 185.199.109.153
   Type: CNAME, Name: www, Value: vamsidatti.github.io
   ```
2. **Update GitHub Pages** settings with custom domain

### Netlify Deployment (Alternative)

If you only want to deploy the frontend:

1. Build the static files
2. Upload the `public` folder to Netlify
3. Set up a separate backend service for the contact form

### VPS/Server Deployment

1. **Upload files to your server**
2. **Install Node.js and npm**
3. **Install dependencies**: `npm install --production`
4. **Set environment variables**
5. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name refillplanet
   pm2 startup
   pm2 save
   ```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build for production
- `npm run serve` - Build and serve

## 🛡️ Security Features

- Rate limiting on API endpoints
- CORS protection
- Input validation and sanitization
- Helmet.js security headers
- XSS protection
- CSRF protection ready

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you need help with setup or customization:

- Check the documentation in this README
- Review the code comments
- Test the contact form functionality
- Verify email configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔄 Updates and Maintenance

### Regular Updates
- Keep dependencies updated: `npm update`
- Monitor security vulnerabilities: `npm audit`
- Test contact form functionality regularly
- Check email deliverability

### Performance Optimization
- Optimize images before adding them
- Minify CSS and JavaScript for production
- Use CDN for static assets if needed
- Monitor server performance

---

**Built with ❤️ for RefillPlanet - Creating sustainable solutions for a better tomorrow.**