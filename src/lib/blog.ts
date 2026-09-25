import { getCollection, type CollectionEntry } from 'astro:content';
import { SHOW_PENDING } from './pending';

export type Post = CollectionEntry<'blog'>;

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => SHOW_PENDING || !p.data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function recentPosts(n: number) {
  return (await allPosts()).slice(0, n);
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
