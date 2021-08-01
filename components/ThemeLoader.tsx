import Head from 'next/head';
import themes from 'utils/themes.json';

type ThemeLoaderProps = {
  theme?: string;
};

export default function ThemeLoader({ theme }: ThemeLoaderProps) {
  return (
    <Head>
      {themes.includes(theme) && (
        <link rel="stylesheet" type="text/css" href={`/themes/${theme}.css`} />
      )}
    </Head>
  );
}
