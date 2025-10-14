# Deployment Guide

## Quick Start

### 1. Vercel Deployment (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vue.js
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the variables from `env.example`
   - Redeploy the project

### 2. Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   - Upload contents of `dist/` to your hosting provider
   - Configure your server to serve `index.html` for all routes

## Environment Variables

Set these in your deployment platform:

| Variable                          | Description                 | Example                               |
| --------------------------------- | --------------------------- | ------------------------------------- |
| `VITE_SPOTIFY_CLIENT_ID`          | Spotify API client ID       | `abc123...`                           |
| `VITE_EMAIL_SERVICE_URL`          | Email service endpoint      | `https://api.emailservice.com`        |
| `VITE_EMAIL_SERVICE_API_KEY`      | Email service API key       | `key123...`                           |
| `VITE_NEWSLETTER_SERVICE_URL`     | Newsletter service endpoint | `https://api.newsletter.com`          |
| `VITE_NEWSLETTER_SERVICE_API_KEY` | Newsletter service API key  | `key456...`                           |
| `VITE_SITE_URL`                   | Production site URL         | `https://solar-transients.vercel.app` |

## Custom Domain (Vercel)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `VITE_SITE_URL` environment variable

## Assets

Replace placeholder assets with actual content:

- `/public/images/*.jpg` - Album cover art (1000x1000px)
- `/public/og-image.jpg` - Social media preview (1200x630px)
- `/public/audio/*.mp3` - Preview audio files (30 seconds)

## Testing

Before deploying:

1. **Local testing**

   ```bash
   npm run dev
   ```

2. **Production build test**

   ```bash
   npm run build
   npm run preview
   ```

3. **Type checking**
   ```bash
   npm run type-check
   ```

## Troubleshooting

### Build Errors

- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure all required dependencies are installed

### Runtime Errors

- Check browser console for errors
- Verify environment variables are set
- Check network requests in DevTools

### Performance

- Optimize images (use WebP format)
- Enable gzip compression
- Use CDN for static assets

## Support

For deployment issues:

- Check Vercel documentation
- Review build logs in Vercel dashboard
- Contact: hello@solar-transients.com
