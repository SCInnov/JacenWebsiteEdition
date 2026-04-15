# Debugging CSS in Cursor - Complete Guide

## Method 1: Using Browser DevTools (Recommended)

### Step 1: Open Your Website
1. In Cursor, right-click on `index.html`
2. Select "Open with Live Server" or "Open in Browser"
   - If you don't have Live Server, install the extension
   - Or manually open the file in your browser

### Step 2: Open Browser DevTools
- **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- **Firefox**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- **Safari**: Enable Developer menu first, then `Cmd+Option+I`

### Step 3: Inspect Elements
1. **Right-click on Stage 1** (the canvas/graph area)
2. Select **"Inspect"** or **"Inspect Element"**
3. The DevTools will open with the element selected

### Step 4: Check CSS Styles
In the DevTools panel, you'll see:

#### **Elements/Inspector Tab** (Left Panel):
- Shows the HTML structure
- Click on elements to select them

#### **Styles Tab** (Right Panel):
- Shows all CSS rules affecting the selected element
- **Computed Tab**: Shows final computed values
- **Styles Tab**: Shows all CSS rules in order of specificity

### Step 5: Debug Sticky Positioning

1. **Select `.scroll-container` element**:
   - In Elements tab, find `<div class="scroll-container">`
   - Click on it

2. **Check Computed Styles**:
   - Switch to "Computed" tab
   - Look for:
     - `height` → Should be `600vh` (or `500vh` on mobile)
     - `margin-bottom` → Should be `200px` (or `120px` on mobile)
     - `position` → Should be `relative`

3. **Select `.sticky-wrapper` element**:
   - Find `<div class="sticky-wrapper">` inside scroll-container
   - Check Computed tab for:
     - `position` → Should be `sticky`
     - `top` → Should be `0px`
     - `height` → Should be `100vh`

4. **Check for Overrides**:
   - In Styles tab, look for strikethrough text
   - Strikethrough = style is being overridden
   - Hover over strikethrough to see what's overriding it

### Step 6: Test Changes in Real-Time

1. **In Styles Tab**, find the CSS rule you want to change
2. **Click on the value** (e.g., `600vh`)
3. **Type new value** (e.g., `800vh`)
4. **Press Enter** - changes apply immediately!
5. This helps you test without editing files

### Step 7: Check CSS File Loading

1. **Go to Network Tab** in DevTools
2. **Refresh the page** (F5)
3. **Look for `product.css`**:
   - Status should be `200` (success)
   - If `404`, file path is wrong
   - If `304`, browser is using cache

4. **Click on `product.css`**:
   - See the actual CSS content
   - Check if your changes are in the file

### Step 8: Clear Cache

If styles aren't updating:

1. **Hard Refresh**:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **Or in DevTools**:
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Or disable cache**:
   - Open DevTools
   - Go to Network tab
   - Check "Disable cache" checkbox
   - Keep DevTools open while testing

## Method 2: Using Cursor's Built-in Features

### Step 1: Find CSS Rules in Cursor

1. **Open `css/product.css`** in Cursor
2. **Use Find** (`Cmd+F` / `Ctrl+F`):
   - Search for `.scroll-container`
   - See all occurrences

3. **Go to Definition**:
   - Right-click on `.scroll-container` in HTML
   - Select "Go to Definition" (if available)

### Step 2: Check for CSS Conflicts

1. **Search across files**:
   - `Cmd+Shift+F` (Mac) / `Ctrl+Shift+F` (Windows)
   - Search for `.scroll-container`
   - See all files that reference it

2. **Check responsive.css**:
   - Open `css/responsive.css`
   - Look for `@media` queries that might override

### Step 3: Use Cursor's CSS IntelliSense

1. **Hover over CSS properties**:
   - See documentation
   - See valid values

2. **Auto-complete**:
   - Type `position: ` and see suggestions
   - Type `height: ` and see units

### Step 4: Check File Structure

1. **In Cursor's file explorer**:
   - Verify `css/product.css` exists
   - Check file size (should be > 0 bytes)

2. **Check HTML links**:
   - Open `index.html`
   - Verify: `<link rel="stylesheet" href="css/product.css">`
   - Check path is correct

## Method 3: Quick Debug Checklist

### ✅ Verify CSS is Loading:
```bash
# In terminal (if you have a server running):
curl http://localhost:5500/css/product.css
# Should return CSS content, not 404
```

### ✅ Check Browser Console:
1. Open DevTools Console tab
2. Look for red errors
3. CSS errors usually show as warnings

### ✅ Test with Inline Styles:
Temporarily add to HTML to test:
```html
<div class="scroll-container" style="background: red !important; height: 600vh !important;">
```
If red appears, CSS can be applied. If not, there's a structural issue.

### ✅ Verify Selectors Match HTML:
1. In DevTools Elements tab
2. Find `<div class="scroll-container">`
3. Check class name matches CSS selector exactly
4. No typos, no extra spaces

## Method 4: Live Editing in DevTools

### Edit CSS Directly in Browser:

1. **In Styles tab**, find the rule
2. **Click the file name** (e.g., `product.css:53`)
3. **Edit the CSS directly** in DevTools
4. **Changes apply immediately**
5. **Copy changes back to Cursor** when done

### Use Console to Test:

Open Console tab and run:
```javascript
// Check if element exists
document.querySelector('.scroll-container')

// Check computed styles
getComputedStyle(document.querySelector('.scroll-container')).height
getComputedStyle(document.querySelector('.sticky-wrapper')).position

// Force a style (temporary test)
document.querySelector('.scroll-container').style.height = '600vh'
document.querySelector('.scroll-container').style.marginBottom = '200px'
```

## Common Issues & Solutions

### Issue: Styles show but don't apply
- **Solution**: Check for `!important` in other rules
- **Solution**: Check media query breakpoints

### Issue: CSS file not loading
- **Solution**: Check file path in HTML
- **Solution**: Check file exists in correct location
- **Solution**: Check server is running (if using one)

### Issue: Changes not visible
- **Solution**: Hard refresh (Cmd+Shift+R)
- **Solution**: Clear browser cache
- **Solution**: Check if you're editing the right file

### Issue: Sticky not working
- **Solution**: Check parent has no `overflow: hidden`
- **Solution**: Check no `transform` on parent
- **Solution**: Verify `position: sticky` is applied
- **Solution**: Check element is within scroll container

## Quick Debug Commands

### In Browser Console:
```javascript
// Get all styles for an element
const el = document.querySelector('.scroll-container');
console.log(getComputedStyle(el));

// Check if sticky is applied
const sticky = document.querySelector('.sticky-wrapper');
console.log(getComputedStyle(sticky).position); // Should be "sticky"

// Check container height
console.log(getComputedStyle(el).height); // Should be "600vh" or similar
```

## Pro Tips

1. **Use DevTools Device Toolbar**:
   - Toggle device mode (Cmd+Shift+M / Ctrl+Shift+M)
   - Test responsive breakpoints
   - See how styles change at different widths

2. **Use Coverage Tab**:
   - Shows which CSS is actually used
   - Helps find unused styles

3. **Use Performance Tab**:
   - Record while scrolling
   - See if sticky causes performance issues

4. **Bookmark DevTools Settings**:
   - Settings → Preferences
   - Enable "Show user agent styles"
   - See all default browser styles
