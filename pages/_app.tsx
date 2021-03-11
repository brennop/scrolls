import { GlobalStyle } from "../styles";
import "../styles/defaults.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
