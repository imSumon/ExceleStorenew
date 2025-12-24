# Mobile Deployment Troubleshooting

## If the site shows a blank page on mobile:

### 1. Check Environment Variables
The app requires these environment variables to be set in your hosting platform:

```
VITE_SUPABASE_URL=https://nrjitkbigopyjqtpbsiy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaml0a2JpZ29weWpxdHBic2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODU3MDMsImV4cCI6MjA4MDc2MTcwM30.DjPTLKQTX7sLCYIUrWwBimTuakf-4Unr6eXFtt0uGaQ
```

**IMPORTANT:** Vite bundles environment variables at BUILD TIME. If you add environment variables, you MUST trigger a new build/deployment.

### 2. For Bolt.host Deployment
On Bolt.host, environment variables might not be automatically passed. To fix:

1. Check the deployment settings
2. Ensure environment variables are set
3. Trigger a manual redeploy after adding variables
4. Clear browser cache on mobile device

### 3. Check Browser Console
On mobile:
- Chrome: Menu → More Tools → Developer Tools
- Safari: Settings → Safari → Advanced → Web Inspector

Look for any JavaScript errors that prevent the app from loading.

### 4. Clear Service Worker Cache
The PWA service worker might cache old versions:

1. Open browser settings on mobile
2. Go to Site Settings
3. Find your domain
4. Clear storage and cache
5. Reload the page

### 5. Verify Build Output
The built app should have:
- `dist/index.html` - Entry point
- `dist/assets/` - JavaScript and CSS files
- `dist/_redirects` - Netlify routing (if using Netlify)
- All image files copied to `dist/images/`

### 6. Test Locally First
```bash
npm run build
npm run preview
```

Open the preview URL on your mobile device to test before deploying.

## Common Issues:

### Issue: White screen, no errors
**Cause:** Environment variables missing during build
**Fix:** Add environment variables to hosting platform, trigger new build

### Issue: 404 on page refresh
**Cause:** Server not configured for SPA routing
**Fix:** Ensure redirects are configured (see netlify.toml or vercel.json)

### Issue: Images not loading
**Cause:** Incorrect base path
**Fix:** Check `vite.config.ts` has `base: '/'`

### Issue: Service Worker errors
**Cause:** Cached old version
**Fix:** Unregister service worker, clear cache, reload
