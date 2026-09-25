import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Academia da Magia'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Rascunhos só aparecem no modo revisão (PUBLIC_SHOW_PENDING=true). */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
