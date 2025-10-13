#!/bin/bash

# RefillPlanet Template Switcher
# Usage: ./switch-template.sh [modern|corporate|original]

echo "🎨 RefillPlanet Template Switcher"
echo "================================="

# Check if template argument is provided
if [ $# -eq 0 ]; then
    echo "Please specify a template: modern, corporate, or original"
    echo "Usage: ./switch-template.sh [modern|corporate|original]"
    exit 1
fi

TEMPLATE=$1

case $TEMPLATE in
    "modern")
        echo "Switching to Modern Gradient Template..."
        cp templates/template-modern.html public/index.html
        echo "✅ Modern template activated!"
        echo "📱 Features: Gradient design, animations, B2C focused"
        ;;
    "corporate")
        echo "Switching to Corporate Business Template..."
        cp templates/template-corporate.html public/index.html
        echo "✅ Corporate template activated!"
        echo "🏢 Features: Professional design, B2B focused, case studies"
        ;;
    "original")
        echo "Switching to Original Clean Template..."
        cp public/index-github.html public/index.html
        echo "✅ Original template activated!"
        echo "🌱 Features: Clean design, balanced approach, quick setup"
        ;;
    *)
        echo "❌ Invalid template: $TEMPLATE"
        echo "Available templates: modern, corporate, original"
        exit 1
        ;;
esac

echo ""
echo "🚀 Next steps:"
echo "1. Preview: Open public/index.html in browser"
echo "2. Test locally: npm start or node server/server.js"  
echo "3. Deploy: git add . && git commit -m 'Switch to $TEMPLATE template' && git push"
echo ""
echo "💡 Tip: Customize colors in public/css/template-*.css files"