import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Noto Color Emoji,Apple Color Emoji,Segoe UI Emoji;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .emoji {
    font-family: apple color emoji,segoe ui emoji,noto color emoji,android emoji,
    emojisymbols,emojione mozilla,twemoji mozilla,segoe ui symbol;
    height: 1.2em;
    transform: translate(0, 0.2em);
  }

  code {
    font-family: Roboto Mono, monospace;
  }

  html {
    overflow: hidden;
  }
`;

export const EditLayout = styled.div`
  display: flex;
  height: 100vh;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  bottom: 50%;
  left: 50%;
  fill: #222;
`;
