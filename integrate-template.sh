#!/bin/bash

# Template Integration Script for RefillPlanet
# Usage: ./integrate-template.sh [template-folder] [template-name]

set -e

TEMPLATE_FOLDER="$1"
TEMPLATE_NAME="$2"
PROJECT_ROOT="/Users/vdatti/Documents/Vamsi Personal/RefillPlanet/refill-planet-web-ui"

if [ -z "$TEMPLATE_FOLDER" ] || [ -z "$TEMPLATE_NAME" ]; then
    echo "Usage: $0 <template-folder> <template-name>"
    echo "Example: $0 ~/Downloads/html5up-template custom-design"
    exit 1
fi

if [ ! -d "$TEMPLATE_FOLDER" ]; then
    echo "❌ Template folder not found: $TEMPLATE_FOLDER"
    exit 1
fi

echo "🚀 Integrating template: $TEMPLATE_NAME"
echo "📁 Source: $TEMPLATE_FOLDER"

# Create backup of current template
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
echo "📦 Creating backup..."
cp "$PROJECT_ROOT/public/index.html" "$PROJECT_ROOT/templates/backup-index-$BACKUP_DATE.html"

# Find main HTML file in template
HTML_FILE=""
if [ -f "$TEMPLATE_FOLDER/index.html" ]; then
    HTML_FILE="$TEMPLATE_FOLDER/index.html"
elif [ -f "$TEMPLATE_FOLDER/index.htm" ]; then
    HTML_FILE="$TEMPLATE_FOLDER/index.htm"
elif [ -f "$TEMPLATE_FOLDER/home.html" ]; then
    HTML_FILE="$TEMPLATE_FOLDER/home.html"
else
    echo "❌ No HTML file found in template folder"
    exit 1
fi

echo "📄 Found HTML file: $(basename $HTML_FILE)"

# Copy template files
echo "📋 Copying template files..."

# Copy HTML
cp "$HTML_FILE" "$PROJECT_ROOT/templates/template-$TEMPLATE_NAME.html"

# Copy CSS files
if [ -d "$TEMPLATE_FOLDER/css" ]; then
    cp -r "$TEMPLATE_FOLDER/css/"* "$PROJECT_ROOT/public/css/"
    echo "✅ CSS files copied"
fi

if [ -d "$TEMPLATE_FOLDER/assets/css" ]; then
    cp -r "$TEMPLATE_FOLDER/assets/css/"* "$PROJECT_ROOT/public/css/"
    echo "✅ Assets CSS files copied"
fi

# Copy JS files
if [ -d "$TEMPLATE_FOLDER/js" ]; then
    cp -r "$TEMPLATE_FOLDER/js/"* "$PROJECT_ROOT/public/js/"
    echo "✅ JS files copied"
fi

if [ -d "$TEMPLATE_FOLDER/assets/js" ]; then
    cp -r "$TEMPLATE_FOLDER/assets/js/"* "$PROJECT_ROOT/public/js/"
    echo "✅ Assets JS files copied"
fi

# Copy images
if [ -d "$TEMPLATE_FOLDER/images" ]; then
    cp -r "$TEMPLATE_FOLDER/images/"* "$PROJECT_ROOT/public/images/"
    echo "✅ Image files copied"
fi

if [ -d "$TEMPLATE_FOLDER/assets/images" ]; then
    cp -r "$TEMPLATE_FOLDER/assets/images/"* "$PROJECT_ROOT/public/images/"
    echo "✅ Assets image files copied"
fi

# Update switch-template.sh to include new template
echo "🔄 Updating template switcher..."
if ! grep -q "$TEMPLATE_NAME" "$PROJECT_ROOT/switch-template.sh"; then
    # Add new template option to the case statement
    sed -i '' "/corporate)/i\\
    $TEMPLATE_NAME)\\
        echo \"🎨 Switching to $TEMPLATE_NAME template...\"\\
        cp templates/template-$TEMPLATE_NAME.html public/index.html\\
        echo \"✅ $TEMPLATE_NAME template activated!\"\\
        ;;\\
" "$PROJECT_ROOT/switch-template.sh"
    echo "✅ Template switcher updated"
fi

echo ""
echo "🎉 Template integration complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Review the template file: templates/template-$TEMPLATE_NAME.html"
echo "2. Customize content for RefillPlanet"
echo "3. Test the template: ./switch-template.sh $TEMPLATE_NAME"
echo "4. Update styling and branding as needed"
echo ""
echo "💡 Tips:"
echo "- Add RefillPlanet branding and content"
echo "- Ensure contact form has Netlify attributes"
echo "- Test responsive design on mobile"
echo "- Update meta tags and titles"
echo ""
echo "🔧 Manual customization may be required for:"
echo "- Navigation structure"
echo "- Contact form integration"
echo "- Brand colors and fonts"
echo "- Content sections"