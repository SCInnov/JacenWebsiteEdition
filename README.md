# Second Chance Website

A single-page website for Second Chance, showcasing EMG-based rehabilitation technology for stroke survivors.

## Project Structure

```
JacenWebsiteEditionJan2026/
├── index.html              # Main HTML file
├── css/                    # Stylesheets organized by section
│   ├── base.css           # Reset, body, canvas styles
│   ├── navbar.css         # Navigation bar styles
│   ├── hero.css           # Hero section styles
│   ├── problem.css        # Problem/stats section styles
│   ├── vision.css         # Vision section and carousel styles
│   ├── product.css        # Product section and timeline styles
│   └── responsive.css     # Media queries for mobile/tablet
├── js/                     # JavaScript organized by functionality
│   ├── canvas.js          # Background canvas animation
│   ├── navbar.js          # Navigation bar functionality
│   ├── hero.js            # Hero section (tap effects)
│   ├── problem.js         # Problem section (stats, typing)
│   ├── vision.js          # Vision section (carousel, typing)
│   └── product.js         # Product section (stage1 canvas, timeline)
├── public/                 # Static assets
│   ├── SCIModel1.png
│   ├── SCIModel2.png
│   ├── SCIModel3.png
│   ├── Second Chance Full Logo.svg
│   ├── Second Chance Icon.svg
│   ├── Second Chance Logo Wide.svg
│   └── ...
└── Building a Website Step by Step.html  # Original single-file version (backup)
```

## Features

- **Animated Background Canvas**: Scroll-responsive gradient transition from beige to teal
- **Interactive EMG Signals**: Real-time EMG signal visualization that responds to scrolling and tapping
- **Sticky Stage 1**: Interactive product demonstration with sticky positioning
- **Scroll-based Animations**: Timeline steps fade in as you scroll
- **Responsive Design**: Mobile-friendly layouts and interactions

## Getting Started

1. Open `index.html` in a web browser
2. Or serve locally using a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## Sections

1. **Hero**: Logo and tagline
2. **Vision**: "Reimagining Stroke Care" with device carousel
3. **Product**: Interactive EMG demonstration and timeline
4. **Problem**: Statistics about stroke impact

## Browser Support

Modern browsers with support for:
- CSS Grid and Flexbox
- CSS Sticky positioning
- Canvas API
- IntersectionObserver API
