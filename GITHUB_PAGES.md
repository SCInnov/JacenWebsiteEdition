# Deploy to GitHub Pages

## One-time setup

1. **Push this repo to GitHub** (if you haven’t already).

2. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment**:
     - **Source:** GitHub Actions

3. **Trigger a deploy**
   - Push a commit to the `main` (or `master`) branch, or
   - **Actions** → **Deploy to GitHub Pages** → **Run workflow**

After the workflow runs, the site will be at:

- **https://&lt;username&gt;.github.io/&lt;repo-name&gt;/**  
  or  
- **https://&lt;org&gt;.github.io/&lt;repo-name&gt;/** (for org repos)

## What’s included

- **`.nojekyll`** – Tells GitHub not to run Jekyll so all static files are served as-is.
- **`.github/workflows/deploy-pages.yml`** – Workflow that:
  - Runs on push to `main`/`master` (and can be run manually).
  - Copies `index.html`, `team.html`, `contact.html`, `css/`, `js/`, and `public/` into a build folder.
  - Deploys that folder to GitHub Pages.

## Alternative: Deploy from a branch (no Actions)

If you prefer not to use Actions:

1. **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` (or `master`), **Folder:** `/ (root)`
4. Save. The repo root is then served; `.nojekyll` in the root disables Jekyll so your files are served correctly.
