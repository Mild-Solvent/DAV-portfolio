"use client";
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import StyledComponentsRegistry from '../lib/styled-components-registry';
import { TranslationProvider } from '../contexts/TranslationContext';
import type { Locale } from '../lib/i18n';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.backgroundSolid};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
`;

interface ClientLayoutProps {
  children: React.ReactNode;
  lang: Locale;
}

export default function ClientLayout({ children, lang }: ClientLayoutProps) {
  return (
    <StyledComponentsRegistry>
      <TranslationProvider initialLang={lang}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            {children}
          </AppContainer>
        </ThemeProvider>
      </TranslationProvider>
    </StyledComponentsRegistry>
  );
}
