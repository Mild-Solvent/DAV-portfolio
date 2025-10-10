'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow-x: hidden;
`;

// Background glow effects
const BackgroundGlow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(31, 111, 235, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 30%;
    right: 20%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(88, 166, 255, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(10px) rotate(240deg); }
  }
`;

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 700px;
    padding: 0 ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(22, 27, 34, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['4xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${props => props.theme.gradients.blue};
    opacity: 0.6;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing['3xl']};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['2xl']};
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(88, 166, 255, 0.2);
`;

const LastUpdated = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  opacity: 0.8;
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.7;
  font-size: ${props => props.theme.fontSizes.base};
  
  h2 {
    color: ${props => props.theme.colors.textEmphasis};
    font-family: ${props => props.theme.fonts.display};
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 600;
    margin: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.xl} 0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: ${props => props.theme.gradients.blue};
      border-radius: ${props => props.theme.borderRadius.full};
    }
    
    &:first-of-type {
      margin-top: ${props => props.theme.spacing['2xl']};
    }
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.xl};
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.7;
  }
  
  strong {
    color: ${props => props.theme.colors.textEmphasis};
    font-weight: 600;
  }
  
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.accentDark};
      border-bottom-color: ${props => props.theme.colors.accent};
    }
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: rgba(88, 166, 255, 0.1);
  color: ${props => props.theme.colors.accent};
  border: 1px solid rgba(88, 166, 255, 0.3);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(8px);
  
  &:hover {
    background: rgba(88, 166, 255, 0.15);
    border-color: rgba(88, 166, 255, 0.5);
    transform: translateX(-4px);
    box-shadow: 0 8px 25px rgba(88, 166, 255, 0.15);
  }
  
  &::before {
    content: '←';
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${props => props.theme.spacing['2xl']};
`;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export default function PrivacyPolicy() {
  return (
    <PageContainer>
      <BackgroundGlow />
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContentCard
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Privacy Policy
            </Title>
            <LastUpdated
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </LastUpdated>
          </Header>
          
          <Content>
            <h2>Data Collection</h2>
            <p>
              <strong>We do not collect any personal data.</strong> This portfolio website is designed with privacy in mind and operates without tracking, analytics, or data collection of any kind.
            </p>

            <h2>Hosting</h2>
            <p>
              This website is hosted on <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> using GitHub Pages. GitHub may collect certain technical information as part of their hosting service. Please refer to <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub&apos;s Privacy Policy</a> for information about their data practices.
            </p>

            <h2>Cookies</h2>
            <p>
              This website does not use cookies for tracking or analytics. Any cookies that may be present are solely for essential website functionality.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We do not integrate with third-party tracking services, analytics platforms, or advertising networks. The website operates as a static site without external data sharing.
            </p>

            <h2>Contact</h2>
            <p>
              If you have any questions about this privacy policy, please contact us through the contact form on our website.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated &quot;last modified&quot; date.
            </p>
          </Content>
        </ContentCard>
        
        <BackButtonContainer>
          <Link href="/" passHref legacyBehavior>
            <BackButton
              as="a"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </BackButton>
          </Link>
        </BackButtonContainer>
      </Container>
    </PageContainer>
  );
}
