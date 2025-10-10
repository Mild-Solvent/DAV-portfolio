"use client";
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import StyledComponentsRegistry from '../lib/styled-components-registry';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

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
      </head>
      <body className={inter.className}>
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
