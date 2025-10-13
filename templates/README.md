# Templates and Customization Guide

This directory contains information about customizing the RefillPlanet website with different templates and themes.

## 🎨 Available Template Styles

The website is built with a modular CSS structure that makes it easy to apply different templates and themes.

## 🔧 How to Customize

### 1. Color Scheme Customization

Edit the CSS variables in `public/css/style.css`:

```css
:root {
    --primary-color: #2ecc71;      /* Main brand color */
    --secondary-color: #27ae60;     /* Secondary brand color */
    --accent-color: #3498db;        /* Accent color */
    --text-primary: #2c3e50;       /* Main text color */
    --text-secondary: #7f8c8d;     /* Secondary text color */
    --background-light: #ffffff;    /* Light background */
    --background-gray: #f8f9fa;    /* Gray background */
}
```

### 2. Typography Changes

Replace the Google Fonts import in `index.html`:

```html
<!-- Current font -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Example alternatives -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update the font-family in CSS:
```css
body {
    font-family: 'Roboto', sans-serif; /* or your chosen font */
}
```

### 3. Layout Modifications

The website uses CSS Grid and Flexbox for layouts. Key layout classes:

- `.hero-container` - Hero section layout
- `.about-grid` - About section grid
- `.services-grid` - Services section grid
- `.contact-content` - Contact section layout

## 🌈 Pre-made Color Themes

### Corporate Blue Theme
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2980b9;
    --accent-color: #e74c3c;
}
```

### Nature Green Theme (Current)
```css
:root {
    --primary-color: #2ecc71;
    --secondary-color: #27ae60;
    --accent-color: #3498db;
}
```

### Professional Purple Theme
```css
:root {
    --primary-color: #9b59b6;
    --secondary-color: #8e44ad;
    --accent-color: #f39c12;
}
```

### Warm Orange Theme
```css
:root {
    --primary-color: #e67e22;
    --secondary-color: #d35400;
    --accent-color: #27ae60;
}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## 🎯 Template Integration Steps

### Using Bootstrap Templates
1. Download your Bootstrap template
2. Copy the HTML structure you want
3. Replace the content in `index.html`
4. Copy the CSS to `style.css` or create new CSS files
5. Update the JavaScript if needed
6. Test the contact form functionality

### Using Free HTML Templates
1. Download the template files
2. Copy the HTML structure to `index.html`
3. Copy CSS files to the `css/` directory
4. Copy JavaScript files to the `js/` directory
5. Update file paths in HTML
6. Integrate the existing contact form code
7. Test all functionality

### Template Sources
- **BootstrapMade**: Free Bootstrap templates
- **ColorLib**: Free HTML templates
- **TemplateMonster**: Premium and free templates
- **ThemeForest**: Premium templates
- **HTML5 UP**: Free responsive templates

## 🔄 Content Updates

### Updating Company Information
1. Edit `index.html` for content changes
2. Update contact information in multiple places:
   - Contact section
   - Footer
   - `server.js` email templates

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add styles to `style.css`
3. Add JavaScript functionality if needed
4. Update navigation menu

### Customizing Email Templates
Edit the email templates in `server/server.js`:
- `adminEmailTemplate` - Email sent to admin
- `userEmailTemplate` - Auto-reply to user

## 🛠️ Advanced Customizations

### Adding Animations
The website includes several animation utilities in `components.css`:
- `.fade-in`
- `.slide-up`
- `.bounce`

### Adding Components
Pre-built components available in `components.css`:
- Cards
- Badges
- Progress bars
- Modals
- Accordions
- Tabs
- Tooltips

### CSS Framework Integration
The current setup can be easily integrated with:
- **Bootstrap**: Add Bootstrap CSS and update classes
- **Tailwind CSS**: Replace custom CSS with Tailwind classes
- **Bulma**: Use Bulma CSS framework
- **Foundation**: Integrate Foundation framework

## 📋 Checklist for Template Changes

- [ ] Update colors and branding
- [ ] Replace placeholder images
- [ ] Update company information
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Verify email templates
- [ ] Test cross-browser compatibility
- [ ] Update meta tags and SEO
- [ ] Test form validation
- [ ] Check loading animations

## 🚀 Performance Tips

1. **Optimize Images**: Compress all images before use
2. **Minify CSS**: Use tools to minify CSS for production
3. **Lazy Loading**: Implement lazy loading for images
4. **CDN**: Use CDN for external assets
5. **Caching**: Implement proper caching headers

## 📞 Getting Help

If you need assistance with template customization:
1. Check the existing code comments
2. Review the component documentation in `components.css`
3. Test changes incrementally
4. Use browser developer tools for debugging

Remember to backup your files before making major changes!