import { GlobalStyle } from "../styles";
import "../styles/defaults.css";
import "@fontsource/source-code-pro";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
