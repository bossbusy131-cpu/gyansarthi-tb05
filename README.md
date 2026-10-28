# GyanSarthi - Tik Reels Study Portal

An interactive study portal designed for state board students featuring 11,000+ lectures, chapter notes, PDFs, revision reels, TargetBoard authentication integration, and 24-hour device verification.

## 🚀 Deploy to Vercel

Deploy this website to Vercel with one click or via Git:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

For the step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Vercel CLI Deploy:
```bash
npm install -g vercel
vercel --prod
```

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

## 🌟 Key Features

- **11,000+ Lectures**: Complete course library with chapters, subtopics, and video lessons.
- **Tik-Reels Mode**: Short revision clips for quick recall.
- **TargetBoard Integration**: Reverse-proxied OTP login and token exchange.
- **TPStreams Player**: Seamless video streaming with player error handling and inline login prompts.
- **24-Hour Device Verification**: Arolinks + Google Translate integration with fallback daily/master verification codes.
- **PWA Ready**: Offline caching, service worker, manifest, and install prompts.
- **Full Vercel Compatibility**: Native serverless API routes (`/api/*`), SPA rewrites, and caching headers configured via `vercel.json`.
