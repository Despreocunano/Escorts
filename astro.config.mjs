import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static',
  adapter: vercel({
    analytics: true,
    imageService: true,
    imagesConfig: {
      domains: [],
      formats: ['image/webp', 'image/jpeg'],
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    assets: true
  }),
});