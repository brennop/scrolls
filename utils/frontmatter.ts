import { useMemo, useRef } from 'react';
import matter from 'gray-matter';
import themes from './themes.json';

export interface Config {
  theme: string;
  align: string;
  justify: string;
}

interface Doc {
  content: string;
  config: Config;
}

const defaultConfig: Config = {
  theme: 'default',
  align: 'center',
  justify: 'center',
};

const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const parseConfig = (data: { [key: string]: string }): Config => {
  const theme = themes.includes(data?.theme) ? data.theme : 'default';
  const align = alignMap[data?.align] || 'center';
  const justify = data?.justify || 'flex-start';
  return { theme, align, justify };
};

export const useFrontmatter = (markdown: string): Doc => {
  const lastConfig = useRef(defaultConfig);

  return useMemo(() => {
    try {
      const { content, data } = matter(markdown);
      const config = parseConfig(data);
      lastConfig.current = config;
      return { content, config };
    } catch {
      return { content: markdown, config: lastConfig.current };
    }
  }, [markdown]);
};
