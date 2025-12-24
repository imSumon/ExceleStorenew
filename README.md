# ExceleStore - Samsung E-Commerce Store

A modern, responsive e-commerce Progressive Web App built with Vue 3, TypeScript, and Vite.

## Features

- Responsive design optimized for mobile and desktop
- Progressive Web App (PWA) capabilities
- Shopping cart functionality
- Product catalog with categories
- Checkout process
- Supabase backend integration

## Deployment

### Environment Variables

Before deploying, set these environment variables in your hosting platform:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build settings are already configured in `netlify.toml`
4. Add environment variables in Netlify dashboard
5. Deploy

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Build settings are already configured in `vercel.json`
4. Add environment variables in Vercel dashboard
5. Deploy

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.
