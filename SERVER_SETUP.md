# Switch Server to Serve index.html

## Quick Solution

### Option 1: Just Navigate to index.html (Easiest)
1. **Stop your current server** (Ctrl+C in terminal)
2. **Start server again** (however you were doing it)
3. **Navigate to**: `http://localhost:8080/index.html`
   - This directly opens index.html instead of the default file

### Option 2: Use the New Server Script (Recommended)

I've created a server script that serves `index.html` by default.

**To use it:**

1. **Stop your current server**:
   - Go to terminal where server is running
   - Press `Ctrl+C` to stop it

2. **Start the new server**:
   ```bash
   cd /Users/jacenwong/Desktop/JacenWebsiteEditionJan2026
   python3 server.py
   ```

   Or use the shell script:
   ```bash
   ./start-server.sh
   ```

3. **Open browser**: `http://localhost:8080`
   - Now it will serve `index.html` by default!

### Option 3: If Using Python http.server

If you were using:
```bash
python3 -m http.server 8080
```

**Stop it** (Ctrl+C) and use the new `server.py` script instead.

### Option 4: If Using Node.js http-server

If you were using:
```bash
npx http-server -p 8080
```

**Stop it** (Ctrl+C) and either:
- Use the Python server script above, OR
- Navigate directly to: `http://localhost:8080/index.html`

### Option 5: If Using VS Code Live Server

1. **Right-click on `index.html`** in VS Code
2. Select **"Open with Live Server"**
3. This will serve index.html directly

## Verify It's Working

After starting the server:
1. Open: `http://localhost:8080`
2. Should show your website (not "Building a Website Step by Step")
3. Check DevTools → Elements tab
4. Should see external CSS links: `<link rel="stylesheet" href="css/product.css">`
5. Should NOT see a big `<style>` tag with embedded CSS

## What Changed

The new `server.py` script:
- ✅ Serves `index.html` when you visit `http://localhost:8080/`
- ✅ Uses external CSS files (product.css, etc.)
- ✅ Disables caching (so CSS changes show immediately)
- ✅ Works the same way, just serves the right file

## Troubleshooting

**Port 8080 already in use?**
```bash
# Find what's using port 8080
lsof -ti:8080

# Kill it (replace PID with the number from above)
kill -9 <PID>

# Or use a different port in server.py (change PORT = 8080 to PORT = 3000)
```

**Python not found?**
- Install Python 3: `brew install python3` (Mac)
- Or use Node.js: `npx http-server -p 8080` and navigate to `/index.html`
