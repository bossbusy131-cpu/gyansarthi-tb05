# GyanSarthi - Vercel Deployment Guide

This guide walks you through deploying **GyanSarthi** to [Vercel](https://vercel.com) in under 2 minutes with full support for video playback, TargetBoard API proxying, PWA caching, and device verification.

---

## ⚡ Quick Start: 2 Ways to Deploy

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "feat: prepare project for Vercel deployment"
   git push origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)** and log in.
3. Under **Import Git Repository**, select your repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with free SSL!

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI globally**:
   ```bash
   npm i -g vercel
   ```
2. **Log in to your Vercel account**:
   ```bash
   vercel login
   ```
3. **Deploy directly to production**:
   ```bash
   vercel --prod
   ```
4. Follow the interactive prompts (accept defaults). Once complete, Vercel will output your live URL.

---

## 🛠️ Architecture & Vercel Configuration

This repository includes a pre-configured `vercel.json` and native Vercel Serverless Functions in the `api/` directory:

| Path | Purpose | Handled By |
|------|---------|------------|
| `/` & `/*` | Single Page App (SPA) routes & deep links | Rewritten to `/index.html` in `vercel.json` |
| `/api/tb/*` | Reverse-proxy for TargetBoard API (`send-otp`, `verify-otp`, `token`) | Serverless Function `api/tb/[...path].ts` |
| `/api/tpstreams-player` | TPStreams video iframe proxy (strips `X-Frame-Options` for smooth playback) | Serverless Function `api/tpstreams-player.ts` |
| `/api/key/generate` | Generates dynamic 24-hr unlock codes & Arolinks shortlinks | Serverless Function `api/key/generate.ts` |
| `/api/key/verify` | Validates device keys (`gyan-XXXX`, daily code, master key) | Serverless Function `api/key/verify.ts` |
| `/api/comments/*` | Live lecture comments endpoint | Serverless Function `api/comments/[lectureId].ts` |
| `/sw.js` | Progressive Web App (PWA) Service Worker | Served with `Cache-Control: no-cache` |
| `/assets/*` | Vite bundled hashed assets | Served with `Cache-Control: immutable, 1 year` |

---

## 🔑 Environment Variables (Optional)

In your Vercel Project Settings > **Environment Variables**, you can optionally set:

| Variable Name | Default Value | Description |
|---------------|---------------|-------------|
| `AROLINKS_API_KEY` | `a7616376b1ef8920d0ad9a7f6ffbb0313d8bbce7` | API key used for generating shortened verification keys |

*Note: All core features work out-of-the-box even without configuring extra environment variables.*

---

## ✅ Post-Deployment Checklist

After your deployment completes on Vercel:

1. **Open your Vercel URL**: Test that the homepage loads with all courses and categories.
2. **Test Direct URL Refresh**: Navigate to any course, chapter, or reel and refresh the browser (`F5`). It will load seamlessly without a 404 error thanks to the SPA rewrite rules in `vercel.json`.
3. **Test Video Player**: Open any video lecture or reel to ensure streaming starts cleanly.
4. **Test Device Unlock**: Click the **Key** icon in the header, click **Get Verification Key**, and verify with the generated key or master code (`gyan-2310`).
5. **Test PWA Install**: Click the **Install App** button or browser install prompt to test offline/standalone mode.

---

## 🌐 Adding a Custom Domain

1. In Vercel, go to your Project Settings > **Domains**.
2. Enter your custom domain (e.g. `study.yourdomain.com` or `yourdomain.com`).
3. Add the suggested CNAME or A records to your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.).
4. Vercel automatically generates and renews a free Let's Encrypt SSL certificate.
