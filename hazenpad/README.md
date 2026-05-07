# Oak Heritage Home - Property Showcase Website

A beautiful, rustic website designed to showcase a handcrafted oak home in Northern Belgium's countryside. Built in 1975 from oak trees harvested from the surrounding forest, this property website captures the essence of countryside living with a professional, nature-inspired design.

## 🌳 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Rustic Aesthetic**: Forest green color palette with wood tones and countryside theme
- **Interactive Gallery**: Lightbox image gallery with keyboard navigation and touch support
- **Smooth Animations**: Scroll-triggered animations and smooth transitions throughout
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Form**: Professional contact form for inquiries (demo functionality)
- **SEO Optimized**: Semantic HTML structure with proper meta tags
- **Performance**: Lazy loading images and optimized assets

## 📁 File Structure

```
hazenpad/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
└── [10 property images]
```

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Server (Recommended)
For the best experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## 🎨 Customization Guide

### Updating Content

#### 1. Hero Section
Edit the hero title and subtitle in `index.html`:
```html
<h1 class="hero-title">Your Title Here</h1>
<p class="hero-subtitle">Your subtitle here</p>
```

#### 2. Story Section
Replace the placeholder text in the story section with your final content:
```html
<div class="story-text">
    <p class="lead-text">Your lead paragraph...</p>
    <p>Additional paragraphs...</p>
</div>
```

#### 3. Contact Information
Update email and phone in the contact section:
```html
<p>your-email@example.com</p>
<p>+32 XXX XX XX XX</p>
```

### Replacing Images

1. **Add new images** to the project folder
2. **Update image references** in `index.html`:
   - Hero background (line 48)
   - Gallery items (lines 130-179)
3. **Recommended image specifications**:
   - Format: JPEG or WebP
   - Gallery images: 1200x900px (4:3 aspect ratio)
   - Hero image: 1920x1080px minimum
   - Optimize images before uploading (use tools like TinyPNG)

### Color Scheme

The website uses a forest/countryside color palette. To modify colors, edit the CSS variables in `styles.css`:

```css
:root {
    --forest-green: #2d5016;    /* Dark forest green */
    --moss-green: #4a7c3c;      /* Medium green */
    --sage-green: #8b9d77;      /* Light sage */
    --light-sage: #c8d5b9;      /* Very light sage */
    --cream: #f5f1e8;           /* Cream background */
    --oak-brown: #6b4423;       /* Oak wood brown */
    --dark-oak: #4a2f1a;        /* Dark oak */
}
```

### Typography

The website uses Google Fonts:
- **Headings**: Playfair Display (serif)
- **Body**: Merriweather (serif)

To change fonts, update the Google Fonts link in `index.html` and the CSS variables in `styles.css`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Use WebP Format**: Convert images to WebP for better compression
3. **Enable Caching**: Configure server caching headers
4. **Minify Files**: Minify CSS and JavaScript for production

## 🔧 Advanced Customization

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation menu if needed
4. Add scroll animations in `script.js` if desired

### Contact Form Integration

The contact form currently shows a demo alert. To make it functional:

1. **Option A - Email Service (EmailJS, Formspree)**
   ```javascript
   // Replace the alert in script.js with API call
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       body: JSON.stringify(formData),
       headers: { 'Content-Type': 'application/json' }
   });
   ```

2. **Option B - Backend Server**
   Create a backend endpoint and update the form submission handler

3. **Option C - Third-party Form Service**
   Use services like Google Forms, Typeform, or JotForm

## 📝 Content Checklist

Before going live, make sure to:

- [ ] Replace all placeholder text with final content
- [ ] Update contact information (email, phone)
- [ ] Replace demo images with high-quality photos
- [ ] Add actual location details (if desired)
- [ ] Test contact form functionality
- [ ] Verify all links work correctly
- [ ] Test on multiple devices and browsers
- [ ] Optimize all images
- [ ] Add Google Analytics (optional)
- [ ] Set up proper domain and hosting

## 🌐 Deployment

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in repository settings
4. Your site will be live at `username.github.io/repository-name`

### Netlify (Free)
1. Create account at netlify.com
2. Drag and drop your folder
3. Get instant deployment with custom domain support

### Traditional Hosting
1. Choose a hosting provider (Hostinger, Bluehost, etc.)
2. Upload files via FTP
3. Configure domain settings

## 📄 License

This website template is provided as-is for the property showcase. Feel free to modify and customize as needed.

## 🤝 Support

For questions or issues with the website:
- Review this README
- Check browser console for errors
- Ensure all files are in the correct location
- Verify image paths are correct

## 🎯 Future Enhancements

Consider adding:
- Virtual tour integration
- Video walkthrough
- Property specifications table
- Neighborhood information
- Testimonials section
- Multi-language support
- Blog/news section
- Social media integration

---

**Built with care for Oak Heritage Home** 🏡🌳