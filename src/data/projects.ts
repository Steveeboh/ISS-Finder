import { Buffer } from 'buffer';
import matter from 'gray-matter';

// gray-matter relies on Node's Buffer. Ensure a polyfill exists in the browser
// environment so parsing works during client-side rendering.
if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  content: string;
  link?: string;
  thumbnail?: string;
}

const projectFiles = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export const projects: Project[] = Object.entries(projectFiles).map(([path, content]) => {
  const { data, content: body } = matter(content as string);
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    link: data.link as string | undefined,
    thumbnail: data.thumbnail as string | undefined,
    content: body,
  };
}).sort((a, b) => (a.date < b.date ? 1 : -1));
