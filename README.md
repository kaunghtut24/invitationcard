# Myanmar Shinpyu Ordination Invitation

A beautiful, interactive 3D book-style invitation for Myanmar Buddhist Shinpyu (Novitiation) and Ordination ceremonies. Features bilingual support (Myanmar/English), realistic page-turn animations, and rich media capabilities.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vite](https://img.shields.io/badge/built%20with-vite-646CFF.svg)

## ✨ Features

### Core Features
- **📖 3D Book Interface**: Realistic page-turn animations with 4 pages (8 sides)
- **🌏 Bilingual Support**: Separate Myanmar and English content pages
- **🎵 Rich Media**: Background music, ceremony images, page backgrounds
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ High Performance**: Lighthouse score 90+ with lazy loading and optimizations
- **🖨️ Print Ready**: Dedicated print styles for physical invitations

### Technical Features
- **JSON-Driven Content**: Easy customization without touching HTML
- **Vite Build System**: Fast development and optimized production builds
- **Touch & Keyboard Support**: Swipe gestures, arrow keys, and click navigation
- **Temple Bell Audio**: Authentic audio feedback on page turns
- **Copy to Clipboard**: Easy contact number copying

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone or download the project
cd myanmar-shinpyu-invitation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
```bash
npm run dev      # Start dev server at http://localhost:3000
npm run preview  # Preview production build
```

### Production Deployment
```bash
npm run build    # Creates optimized dist/ folder
```

Deploy the `dist/` folder contents to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 📁 Project Structure

```
myanmar-shinpyu-invitation/
│
├── index.html                 # Main HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
├──
├── css/
│   └── styles.css            # All styles (1,100+ lines)
│
├── js/
│   └── script.js             # Application logic (500+ lines)
│
├── data/
│   └── content.json          # All content (JSON-driven)
│
├── assets/
│   ├── audio/
│   │   ├── temple-bell.ogg   # Page flip sound
│   │   └── background-music.mp3  # Optional background music
│   │
│   ├── images/
│   │   ├── lotus.svg         # Watermark logo
│   │   ├── cover-bg.webp     # Page backgrounds
│   │   ├── mm-bg.webp
│   │   ├── en-bg.webp
│   │   ├── rsvp-bg.webp
│   │   ├── shinpyu.jpg       # Ceremony images
│   │   └── rahadan.jpg
│   │
│   └── textures/
│       └── paper-grain.png   # Paper texture
│
└── README.md                 # This file
```

## 📖 User Guide

### 1. Customizing Content

All content is managed through `data/content.json`. No HTML editing required!

#### Event Information
```json
{
  "event": {
    "title_mm": "မြန်မာရှင်ပြု ရဟန်းခံ မင်္ဂလာ",
    "title_en": "Novitiation and Ordination Ceremony",
    "family": "ဦးမြင့်နှင့် ဒေါ်မြင့်မိသားစု",
    "year": "၂၀၂၆"
  }
}
```

#### Ceremony Details
Add or modify ceremonies in the `ceremonies` array:

```json
{
  "ceremonies": [
    {
      "type": "shinpyu",
      "label_mm": "ရှင်ပြု",
      "label_en": "Novitiation Ceremony",
      "description_mm": "...",
      "description_en": "...",
      "date": "၁၃ ဧပြီ ၂၀၂၆",
      "time": "နံနက် ၉ နာရီ",
      "venue": "သာသနာ့နယ်မြေ ဘုန်းတော်ကြီးကျောင်း",
      "address": "အမှတ် ၁၂၃၊ ဗိုလ်တထောင်လမ်း၊ ရန်ကုန်မြို့",
      "image": "/assets/images/shinpyu.jpg"
    }
  ]
}
```

#### General Content
```json
{
  "general": {
    "invitation_mm": "...",
    "invitation_en": "...",
    "blessing_mm": "...",
    "blessing_en": "...",
    "rsvp": "...",
    "contact": "၀၉ ၁၂၃ ၄၅၆ ၇၈၉",
    "footer_text": "..."
  }
}
```

### 2. Media Configuration

#### Background Music
```json
{
  "media": {
    "backgroundMusic": {
      "enabled": true,
      "file": "/assets/audio/background-music.mp3",
      "volume": 0.5,
      "loop": true
    }
  }
}
```

**Note:** Music only loads after user interaction (click/touch) to comply with browser autoplay policies.

#### Page Backgrounds
```json
{
  "media": {
    "pages": {
      "cover": "/assets/images/cover-bg.webp",
      "myanmar": "/assets/images/mm-bg.webp",
      "english": "/assets/images/en-bg.webp",
      "rsvp": "/assets/images/rsvp-bg.webp"
    }
  }
}
```

### 3. Adding Images

#### Ceremony Images
1. Add image files to `assets/images/`
2. Update `content.json` with image paths:
   ```json
   "image": "/assets/images/your-image.jpg"
   ```
3. Recommended formats: WebP (best), JPG, PNG
4. Recommended size: 800x600px or larger

#### Page Backgrounds
1. Add background images to `assets/images/`
2. Update `media.pages` in `content.json`
3. Recommended: Use subtle, low-contrast backgrounds
4. Format: WebP for best compression

### 4. Navigation

#### Desktop
- **Click** on right page edge to flip forward
- **Click** on left page edge to flip back
- **Arrow keys**: Left/Right to navigate
- **Spacebar**: Next page

#### Mobile/Tablet
- **Swipe left**: Next page
- **Swipe right**: Previous page
- **Tap** page edge to flip

#### Navigation Buttons
- Use on-screen arrows for precise control
- Page indicator shows current position (1-8)

### 5. Print Invitation

1. Open invitation in browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select "Save as PDF" or print to printer
4. Print styles automatically optimize layout

### 6. Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 80+ | ✅ Full |
| Firefox | 75+ | ✅ Full |
| Safari | 13+ | ✅ Full |
| Edge | 80+ | ✅ Full |
| Mobile Chrome | Latest | ✅ Full |
| Mobile Safari | iOS 13+ | ✅ Full |

## 🎨 Customization Guide

### Changing Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --primary-color: #8b4513;      /* Main text - brown */
  --secondary-color: #d4af37;    /* Gold accents */
  --accent-color: #cd853f;       /* Peru/orange accent */
  --text-color: #2c1810;         /* Dark brown text */
  --bg-color: #faf8f5;           /* Cream background */
  --paper-color: #fefefe;        /* Page background */
  --border-color: #d4af37;       /* Gold borders */
}
```

### Changing Fonts

1. Update Google Fonts link in `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
   ```

2. Update CSS variables:
   ```css
   :root {
     --font-primary: 'Your Myanmar Font', serif;
     --font-secondary: 'Your English Font', serif;
   }
   ```

### Adding More Pages

1. Add new page HTML in `index.html`:
   ```html
   <div class="page" data-page="newpage" data-page-index="4">
   ```

2. Update `totalPages` in `js/script.js`
3. Add content rendering logic
4. Update page backgrounds in `content.json`

## 🔧 Troubleshooting

### Build Errors

**Error: `terser not found`**
- Fixed by using `esbuild` minifier (included in Vite)
- No action needed - already configured

**Error: Assets not found**
- Ensure files exist in `assets/` folder
- Check file paths in `content.json` start with `/assets/`
- Run `npm run build` to verify assets are copied

### Audio Not Playing

**Background music doesn't autoplay**
- ✅ Normal behavior - browsers block autoplay
- Music loads after first user click/touch
- Check browser console for errors

**Temple bell not sounding**
- Check `temple-bell.ogg` exists in `assets/audio/`
- Verify browser supports .ogg format
- Check volume is not muted

### Performance Issues

**Slow page flip animation**
- Check browser hardware acceleration is enabled
- Reduce image sizes (use WebP format)
- Disable background music if not needed

**Layout broken on mobile**
- Check viewport meta tag is present
- Test on actual device (not just browser dev tools)
- Ensure CSS containment is working

### Content Not Loading

**Blank pages after deployment**
- Check `content.json` is valid JSON (use JSON validator)
- Verify file paths are correct
- Check browser console for fetch errors
- Ensure server serves JSON files with correct MIME type

## 📊 Performance Metrics

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~30KB (gzipped)
- **Assets**: Lazy loaded with intersection observer

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **Design**: Traditional Myanmar Buddhist art inspiration
- **Fonts**: Google Fonts (Noto Serif Myanmar, Playfair Display)
- **Icons**: Custom lotus SVG design
- **Audio**: Traditional temple bell recording
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📧 Support

For questions or support, please open an issue on the project repository.

---

**⚠️ Important**: This is a religious ceremony invitation. Please ensure all content is respectful and appropriate for Buddhist traditions.

**Made with ❤️ for Myanmar Buddhist communities worldwide.**
