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
      domains: ['images.unsplash.com'], // Add the domain where your images are hosted
      formats: ['webp', 'avif'],
      sizes: [400, 800, 1200],
    },
    assets: true
  }),
});