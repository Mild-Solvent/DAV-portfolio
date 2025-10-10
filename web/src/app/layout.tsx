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
  display: flex;
  flex-direction: column;
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
        <title>DAV Development - Modern Web Development & Digital Solutions</title>
        
        {/* SEO Meta Tags */}
        <meta name="description" content="DAV Development - Creating digital experiences of the future. Our team specializes in modern web applications, mobile apps, UI/UX design, and cloud solutions. Experts in React, TypeScript, Next.js, Node.js, and performance optimization." />
        <meta name="keywords" content="web development, mobile applications, UI/UX design, React, TypeScript, Next.js, Node.js, performance optimization, cloud DevOps, AI integration, responsive design, modern web applications, David developer" />
        <meta name="author" content="DAV Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://dav-development.com" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="DAV Development - Modern Web Development & Digital Solutions" />
        <meta property="og:description" content="Creating digital experiences of the future. Our team specializes in web development, mobile applications, UI/UX design, performance optimization, cloud solutions, and AI integration. Expert developers with focus on modern technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dav-development.com" />
        <meta property="og:site_name" content="DAV Development" />
        <meta property="og:locale" content="en_US" />
        {/* <meta property="og:image" content="https://dav-development.com/og-image.jpg" /> */}
        {/* <meta property="og:image:alt" content="DAV Development - Web Developer Portfolio" /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DAV Development - Modern Web Development & Digital Solutions" />
        <meta name="twitter:description" content="Creating digital experiences of the future. Web development, mobile apps, UI/UX design, performance optimization. Team of experts in React, TypeScript, Next.js, Node.js, cloud solutions & AI integration." />
        <meta name="twitter:creator" content="@dav_development" />
        <meta name="twitter:site" content="@dav_development" />
        {/* <meta name="twitter:image" content="https://dav-development.com/twitter-image.jpg" /> */}
        {/* <meta name="twitter:image:alt" content="DAV Development - Professional Web Developer" /> */}
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#0d1117" />
        <meta name="application-name" content="DAV Development" />
        <meta name="msapplication-TileColor" content="#0d1117" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DAV Development",
              "description": "Professional web development team specializing in modern web applications, mobile development, and digital solutions",
              "url": "https://dav-development.com",
              "knowsAbout": [
                "Web Development",
                "Mobile Applications",
                "React",
                "TypeScript",
                "Next.js",
                "Node.js",
                "UI/UX Design",
                "Performance Optimization",
                "Cloud DevOps",
                "AI Integration"
              ],
              "offers": {
                "@type": "Offer",
                "description": "Professional web development services including modern web applications, mobile apps, UI/UX design, performance audits, cloud solutions, and AI integration"
              },
              "founder": {
                "@type": "Person",
                "name": "David"
              }
            })
          }}
        />
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
