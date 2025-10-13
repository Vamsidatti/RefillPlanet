# Template Integration Guide

## How to Use External Templates in RefillPlanet

### Method 1: Replace Existing Template

1. **Download the template** files (HTML, CSS, JS)
2. **Backup current template**:
   ```bash
   # Create backup of current template
   cp public/index.html templates/template-backup-$(date +%Y%m%d).html
   cp public/css/template-modern.css public/css/template-backup-$(date +%Y%m%d).css
   ```

3. **Replace template files**:
   ```bash
   # Replace main HTML file
   cp /path/to/new-template/index.html public/index.html
   
   # Replace or add CSS files
   cp /path/to/new-template/style.css public/css/template-new.css
   ```

4. **Integrate RefillPlanet content**:
   - Update navigation logo and branding
   - Add RefillPlanet sections (About, Services, Contact)
   - Integrate contact form with Netlify Forms
   - Update meta tags and title

### Method 2: Create New Template Option

1. **Add as new template**:
   ```bash
   # Copy template to templates folder
   cp /path/to/new-template/index.html templates/template-custom.html
   cp /path/to/new-template/style.css public/css/template-custom.css
   ```

2. **Update template switcher**:
   ```bash
   # Edit switch-template.sh to include new option
   vim switch-template.sh
   ```

### Method 3: Modify Existing Template

1. **Extract design elements** from the new template
2. **Copy specific sections** you like
3. **Integrate into current modern/corporate templates**

## Integration Checklist

### 1. HTML Structure Requirements
- [ ] Navigation with RefillPlanet branding
- [ ] Hero section with sustainability messaging
- [ ] About section
- [ ] Services section
- [ ] Contact form with proper attributes
- [ ] Footer with company info

### 2. Contact Form Integration
```html
<!-- Ensure contact form has these attributes for Netlify -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <!-- Your form fields -->
</form>
```

### 3. CSS Integration
- [ ] Responsive design (mobile-first)
- [ ] RefillPlanet color scheme integration
- [ ] Font consistency (Inter font family)
- [ ] Icon integration (Font Awesome)

### 4. JavaScript Compatibility
- [ ] No conflicts with existing functionality
- [ ] Smooth scrolling navigation
- [ ] Form validation
- [ ] Mobile menu functionality

## Popular Template Sources

### Free Templates
1. **HTML5 UP** (html5up.net)
2. **BootstrapMade** (bootstrapmade.com/free-templates/)
3. **Colorlib** (colorlib.com/wp/templates/)
4. **Start Bootstrap** (startbootstrap.com/themes/)

### Premium Templates
1. **ThemeForest** (themeforest.net)
2. **TemplateMonster** (templatemonster.com)
3. **Creative Tim** (creative-tim.com)

## Example Integration Process

### Step-by-Step for HTML5 UP Template

1. **Download template**:
   ```bash
   wget https://html5up.net/template-name/download
   unzip template-name.zip
   ```

2. **Analyze structure**:
   ```bash
   tree template-folder/
   # Look at index.html, assets/css/, assets/js/
   ```

3. **Create new template**:
   ```bash
   # Copy to our structure
   cp template-folder/index.html templates/template-html5up.html
   cp -r template-folder/assets/css/* public/css/
   cp -r template-folder/assets/js/* public/js/
   cp -r template-folder/images/* public/images/
   ```

4. **Customize content**:
   - Replace placeholder text with RefillPlanet content
   - Update colors to match brand
   - Add contact form integration
   - Test responsiveness

## Automation Script

Want me to create a script to automate template integration?