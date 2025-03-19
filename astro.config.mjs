import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server', // Changed from 'static' to 'server' for on-demand rendering
  adapter: vercel({
    analytics: true,
  }),
});