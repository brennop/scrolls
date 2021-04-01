/// <reference types="styled-components/cssprop" />
import { GlobalStyle } from '../styles';
import '@fontsource/roboto-mono';
import '../styles/defaults.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
