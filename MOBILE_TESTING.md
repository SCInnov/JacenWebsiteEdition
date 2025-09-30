# 📱 Mobile Testing Guide

## Quick Setup for Mobile Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Find Your Computer's IP Address
Your local IP is: **192.168.10.5**

### 3. Test on Mobile Devices

#### Option A: Same WiFi Network
- Connect your phone to the same WiFi as your computer
- Open browser on phone
- Go to: `http://192.168.10.5:3000`

#### Option B: QR Code (Recommended)
1. Generate QR code for: `http://192.168.10.5:3000`
2. Scan with your phone's camera
3. Open the link

#### Option C: Tunnel Service (External Access)
```bash
# Install ngrok
npm install -g ngrok

# Create tunnel
ngrok http 3000

# Use the provided URL (e.g., https://abc123.ngrok.io)
```

## 📱 Mobile Optimizations Applied

### ✅ Responsive Images
- **2D Model**: Scales from 300px (mobile) to 1000px (desktop)
- **Carousel**: 300px (mobile) → 400px (tablet) → 576px (desktop)

### ✅ Responsive Text
- **Headlines**: `text-5xl md:text-7xl` (responsive sizing)
- **Subtitles**: `text-xl md:text-2xl` (responsive sizing)

### ✅ Responsive Layout
- **Buttons**: Stack vertically on mobile
- **Sections**: Full viewport height maintained
- **Spacing**: Adjusted for mobile screens

## 🔧 Testing Checklist

- [ ] Homepage loads properly
- [ ] Carousel scrolls smoothly
- [ ] 2D model displays correctly
- [ ] Interactive buttons work
- [ ] Contact forms are usable
- [ ] Text is readable
- [ ] Navigation works
- [ ] Animations are smooth

## 📱 Device Testing
- **iPhone**: Safari, Chrome
- **Android**: Chrome, Firefox
- **Tablet**: iPad, Android tablets
- **Different orientations**: Portrait/Landscape

## 🚀 Performance Tips
- Test on slower connections
- Check loading times
- Verify image optimization
- Test touch interactions
