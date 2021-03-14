import { useMemo } from 'react';
import matter from 'gray-matter';

interface Doc {
  content: string;
  data: {
    theme?: string;
  };
}

export const useFrontmatter = (markdown: string): Doc => {
  return useMemo(() => {
    try {
      return matter(markdown);
    } catch {
      return { content: markdown, data: null };
    }
  }, [markdown]);
};
