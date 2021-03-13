import { GlobalStyle } from '../styles';
import '../styles/defaults.css';
import '@fontsource/roboto-mono';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
