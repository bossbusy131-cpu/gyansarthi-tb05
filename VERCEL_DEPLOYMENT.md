# GyanSarthi - Vercel Deployment Guide

This project is completely pre-configured and tested for deployment on **Vercel**.

---

## 🚀 Quick Deployment Methods

### Method 1: Deploy with Git & Vercel Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment with vercel.json and serverless functions"
   git push origin main
   ```

2. **Open Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Sign in with your GitHub account.
   - Click **Import** next to your GyanSarthi repository.

3. **Verify Project Settings (Automatically Detected)**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables (Optional)**:
   - `AROLINKS_API_KEY`: (Optional) Your Arolinks API key for shortened links. If not specified, the system uses the default configured key.

5. **Deploy**:
   - Click **Deploy**.
   - Your site will be built and deployed in ~40 seconds with a free `.vercel.app` URL and custom domain support!

---

### Method 2: Deploy from Terminal using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```
   Follow the interactive prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your personal or team account
   - Link to existing project? **No** (if first time)
   - What's your project's name? **gyansarthi** (or press Enter)
   - In which directory is your code located? `./`
   - Want to modify settings? **No** (Vercel will detect settings from `vercel.json`)

---

## ⚙️ Architecture & Features Configured for Vercel

### 1. `vercel.json`
- **SPA Rewrites**: Deep links like bookmarks, reel player, and batch browsing automatically route to `/index.html`.
- **API Routing**: Routes `/api/*` to the respective Vercel Serverless Functions in the `/api` directory.
- **Cache Headers**: Static files like `/study-data.js` (11,000+ lectures) and `/assets/*` are configured with high-performance CDN caching headers.

### 2. Vercel Serverless Functions (`/api/`)
- `/api/key/generate.ts`: Generates dynamic device keys (`gyan-XXXX`) and creates Google Translate links via Arolinks API.
- `/api/key/verify.ts`: Validates 24-hour verification codes and unlocks the site for students.
- `/api/tpstreams-player.ts`: Reverse-proxies the TPStreams video player, removing `X-Frame-Options` and `Content-Security-Policy` restrictions so lectures play inside the app without browser blocks.
- `/api/tb/[...path].ts`: Proxies TargetBoard authentication and streaming token requests with required headers (`Origin: https://targetboard.co.in`).
- `/api/comments.ts`: Manages lecture discussion and comment submissions.

### 3. PWA (Progressive Web App)
- Includes Web App Manifest (`manifest.json`), service worker, and install icons (`/pwa-192x192.png`, `/pwa-512x512.png`).
- Fully installable on Android, iOS, Windows, and Mac as a standalone app when hosted on Vercel's HTTPS domain.

---

## 🛠️ Local Testing Before Deployment

To preview the build locally exactly as Vercel runs it:

```bash
# 1. Build the production bundle
npm run build

# 2. Preview the output dist
npm run preview
```
