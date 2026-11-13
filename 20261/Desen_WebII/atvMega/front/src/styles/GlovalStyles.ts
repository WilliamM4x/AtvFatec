import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f0f0; // Cor de fundo clara do print [cite: 131]
    font-family: 'Arial', sans-serif;
  }
`;