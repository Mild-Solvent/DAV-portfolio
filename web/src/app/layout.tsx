"use client";
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import StyledComponentsRegistry from '../lib/styled-components-registry';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.backgroundSolid};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Portfolio - David</title>
        <meta name="description" content="David's professional portfolio showcasing web development skills" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppContainer>
              {children}
            </AppContainer>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
