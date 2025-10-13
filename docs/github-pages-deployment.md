# GitHub Pages Deployment Guide

This is the GitHub Pages version of RefillPlanet website with FREE hosting and contact form.

## 🆓 FREE Hosting Setup

### Step 1: GitHub Pages Setup
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source: "Deploy from a branch"
4. Choose branch: `main` and folder: `/public`
5. Your site will be at: `https://yourusername.github.io/RefillPlanet`

### Step 2: Netlify Forms (FREE Contact Form)
The contact form uses Netlify Forms which gives you:
- ✅ 100 form submissions per month (FREE)
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Form data dashboard

## 📁 Files for GitHub Pages

Use these files for GitHub Pages deployment:
- `index-github.html` → Rename to `index.html`
- `js/script-static.js` → Static version without backend calls
- All CSS and assets remain the same

## 🚀 Deployment Steps

1. **Prepare files:**
   ```bash
   cd public
   mv index-github.html index.html
   ```

2. **Commit to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main, Folder: /public

4. **Set up Netlify (optional for better forms):**
   - Connect your GitHub repo to Netlify
   - Build settings: Publish directory = `public`
   - Netlify will automatically detect the form

## 🌐 Custom Domain (Optional)

1. Buy a domain from Namecheap, GoDaddy, etc.
2. Add CNAME file in public directory:
   ```
   yourdomain.com
   ```
3. Update DNS settings to point to GitHub Pages

## 📊 Form Submissions

- **GitHub Pages**: Form submits to Netlify
- **View submissions**: Netlify dashboard
- **Email notifications**: Configure in Netlify settings

## 💡 Why This Setup?

- **GitHub Pages**: FREE hosting for frontend
- **Netlify Forms**: FREE contact form handling
- **No server needed**: Pure static site
- **Custom domain**: Support included
- **SSL**: Automatic HTTPS

This is much better than Heroku for simple websites!