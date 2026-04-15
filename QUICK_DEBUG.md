# Quick Debug Reference - 5 Minute Guide

## 🚀 Fastest Way to Debug

### 1. Open Your Site
```bash
# Option A: If you have Python installed
cd /Users/jacenwong/Desktop/JacenWebsiteEditionJan2026
python3 -m http.server 8000
# Then open: http://localhost:8000

# Option B: If you have Node.js
npx http-server -p 8000
# Then open: http://localhost:8000

# Option C: Just open index.html directly in browser
# (Right-click → Open with → Browser)
```

### 2. Open DevTools
- Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

### 3. Inspect Stage 1
1. **Right-click on Stage 1** (the graph/canvas area)
2. Click **"Inspect"**
3. In Elements tab, find: `<div class="scroll-container">`

### 4. Check These Values

**For `.scroll-container`:**
- Computed → `height` = `600vh` ✅
- Computed → `margin-bottom` = `200px` ✅

**For `.sticky-wrapper`:**
- Computed → `position` = `sticky` ✅
- Computed → `top` = `0px` ✅
- Computed → `height` = `100vh` ✅

### 5. If Values Are Wrong

**In Styles Tab:**
1. Find the rule (e.g., `.scroll-container`)
2. If it's **crossed out** (strikethrough), something is overriding it
3. Hover over the crossed-out rule to see what's overriding
4. Check if `responsive.css` is overriding (it loads after `product.css`)

### 6. Test Changes Live

**In Styles Tab:**
1. Find `.scroll-container` rule
2. Click on `600vh`
3. Change to `800vh`
4. Press Enter
5. **Scroll the page** - see if sticky works longer

### 7. Check CSS File is Loading

**Network Tab:**
1. Refresh page (F5)
2. Look for `product.css`
3. Status should be `200` (green)
4. Click it to see the CSS content

### 8. Hard Refresh (If Changes Don't Show)

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`
- **Or**: Right-click refresh button → "Empty Cache and Hard Reload"

## 🔍 Quick Console Commands

Open Console tab (in DevTools) and paste:

```javascript
// Check scroll-container height
console.log(getComputedStyle(document.querySelector('.scroll-container')).height);

// Check sticky-wrapper position
console.log(getComputedStyle(document.querySelector('.sticky-wrapper')).position);

// Force test (temporary - refreshes will remove)
document.querySelector('.scroll-container').style.border = '5px solid red';
```

## ⚡ Common Fixes

### Sticky Not Working?
```javascript
// Check parent overflow
console.log(getComputedStyle(document.querySelector('.product-section')).overflow);
// Should NOT be "hidden"

// Check for transforms
console.log(getComputedStyle(document.querySelector('.scroll-container')).transform);
// Should be "none"
```

### CSS Not Loading?
1. Check Network tab → `product.css` → Status code
2. Check file exists: `css/product.css`
3. Check HTML link: `<link rel="stylesheet" href="css/product.css">`

### Changes Not Showing?
1. Hard refresh: `Cmd+Shift+R`
2. Check you're editing the right file
3. Check file is saved (Cursor shows dot if unsaved)
4. Check responsive.css isn't overriding

## 📋 Debug Checklist

- [ ] CSS file loads (Network tab shows 200)
- [ ] Element exists (querySelector finds it)
- [ ] Styles are applied (not crossed out)
- [ ] No JavaScript errors (Console tab)
- [ ] Hard refresh done (Cmd+Shift+R)
- [ ] Browser cache cleared
- [ ] Correct file edited (product.css, not responsive.css)
