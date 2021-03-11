import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", "Noto Color Emoji",
      "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .emoji {
    height: 1.2em;
    transform: translate(0, 0.2em);
  }

  html {
    overflow: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", monospace;
  }
`;
