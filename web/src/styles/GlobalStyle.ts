import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.25;
    font-weight: 600;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textEmphasis};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    font-weight: 700;
    letter-spacing: -0.03em;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: 600;
    letter-spacing: -0.02em;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 600;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.accentDark};
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* GitHub-style scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.surface};
    border-radius: ${props => props.theme.borderRadius.sm};
    border: 2px solid ${props => props.theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }

  /* GitHub-style selection */
  ::selection {
    background: rgba(88, 166, 255, 0.3);
    color: ${props => props.theme.colors.textEmphasis};
  }

  /* GitHub-style focus outline */
  :focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
    border-radius: ${props => props.theme.borderRadius.sm};
  }
  
  /* GitHub-style code blocks */
  code {
    font-family: ${props => props.theme.fonts.mono};
    background: ${props => props.theme.colors.backgroundLight};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 85%;
  }
`;
