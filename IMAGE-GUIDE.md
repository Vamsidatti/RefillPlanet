# 🌊 RefillPlanet Image Recommendations

## **HERO IMAGE - Top Priority** 
**File**: `hero-modern.jpg` (replace the placeholder)

### **Perfect Image Ideas**:
1. **Person filling reusable bottle** at a natural spring/waterfall
2. **Crystal clear water stream** with someone using a refill station  
3. **Hands cupping clean water** with green forest background
4. **Modern water refill station** in a beautiful outdoor setting
5. **Child drinking from reusable bottle** near clean water source

### **Search Terms for Unsplash/Pexels**:
- "person refilling water bottle nature"
- "clean drinking water sustainability" 
- "eco friendly hydration outdoors"
- "crystal clear water environmental"
- "sustainable water solutions"

---

## **Recommended Images from Unsplash** (Free)

### **Hero Options** (Copy URL and download):
1. **Natural Water Refill**: https://unsplash.com/s/photos/person-water-bottle-nature
2. **Clean Water Stream**: https://unsplash.com/s/photos/crystal-clear-water
3. **Eco Water Station**: https://unsplash.com/s/photos/water-sustainability
4. **Hands & Water**: https://unsplash.com/s/photos/hands-clean-water

### **About Section Images**:
1. **Sustainability**: https://unsplash.com/s/photos/reusable-water-bottle
2. **Community**: https://unsplash.com/s/photos/people-drinking-water-outdoors

### **Service Images**:
1. **Smart Station**: https://unsplash.com/s/photos/modern-water-dispenser
2. **Eco Products**: https://unsplash.com/s/photos/eco-friendly-bottles
3. **Consulting**: https://unsplash.com/s/photos/business-sustainability-meeting

---

## **Quick Download & Setup Instructions**

### **Step 1: Download Images**
1. Go to **unsplash.com** 
2. Search for suggested terms above
3. Download in **Large size** (1920px+ width for hero)
4. Save as JPG format

### **Step 2: Rename & Place Images**
```
Downloads/
├── your-chosen-hero-image.jpg → rename to: hero-modern.jpg
├── about-image-1.jpg → rename to: about-1.jpg  
├── about-image-2.jpg → rename to: about-2.jpg
├── service-image-1.jpg → rename to: service1.jpg
├── service-image-2.jpg → rename to: service2.jpg
└── service-image-3.jpg → rename to: service3.jpg
```

### **Step 3: Add to Project**
```bash
# Copy images to your project
cp ~/Downloads/hero-modern.jpg "refill-planet-web-ui/public/images/"
cp ~/Downloads/about-1.jpg "refill-planet-web-ui/public/images/"  
cp ~/Downloads/about-2.jpg "refill-planet-web-ui/public/images/"
cp ~/Downloads/service1.jpg "refill-planet-web-ui/public/images/"
cp ~/Downloads/service2.jpg "refill-planet-web-ui/public/images/"
cp ~/Downloads/service3.jpg "refill-planet-web-ui/public/images/"
```

### **Step 4: Update Website**
```bash
# Remove placeholder and use real image
# Edit public/index.html and change:
# FROM: <img src="images/hero-modern-placeholder.svg" 
# TO:   <img src="images/hero-modern.jpg"
```

### **Step 5: Deploy**
```bash
git add .
git commit -m "Add professional environmental images for RefillPlanet"  
git push
```

---

## **Image Specifications**

| Image | Size | Usage |
|-------|------|-------|
| hero-modern.jpg | 1920x1080px | Main hero section |
| about-1.jpg | 600x400px | Sustainability practices |  
| about-2.jpg | 600x400px | Community impact |
| service1.jpg | 500x350px | Smart refill stations |
| service2.jpg | 500x350px | Eco-friendly products |
| service3.jpg | 500x350px | Sustainability consulting |

---

## **Pro Tips**

### **Color Matching**:
- Look for images with **blues and greens** (matches your gradient theme)
- **Bright, airy lighting** works best
- **High contrast** images show better on web

### **Optimization**:
- Use **TinyPNG.com** to compress before uploading
- Keep hero image under **1MB** for fast loading
- Smaller images under **500KB** each

### **Alt Text** (for accessibility):
```html
<img src="images/hero-modern.jpg" alt="Person refilling sustainable water bottle in natural environment" />
```

---

**Need help finding specific images?** Let me know what style you prefer and I can provide more targeted suggestions!