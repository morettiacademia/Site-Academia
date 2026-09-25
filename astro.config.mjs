// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL pública do site (usada em canonical, Open Graph e sitemap).
const SITE = process.env.SITE_URL || 'https://academiadamagia.com.br';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Prévia publicada como página única: CSS embutido em cada HTML.
    ...(process.env.INLINE_CSS ? { inlineStylesheets: 'always' } : {}),
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|obrigado)$/.test(page),
    }),
  ],
  prefetch: true,
});
