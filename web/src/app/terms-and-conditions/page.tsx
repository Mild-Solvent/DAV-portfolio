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
    right: 25%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(163, 113, 247, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 7s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 25%;
    left: 15%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(63, 185, 80, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 9s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-25px) rotate(120deg); }
    66% { transform: translateY(15px) rotate(240deg); }
  }
`;

const Container = styled(motion.div)`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 750px;
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
    background: ${props => props.theme.gradients.purple};
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
  background: ${props => props.theme.gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(163, 113, 247, 0.2);
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
      background: ${props => props.theme.gradients.purple};
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
  
  ul {
    margin-bottom: ${props => props.theme.spacing.xl};
    padding-left: ${props => props.theme.spacing.xl};
    list-style: none;
    position: relative;
    
    li {
      margin-bottom: ${props => props.theme.spacing.md};
      color: ${props => props.theme.colors.textSecondary};
      position: relative;
      padding-left: ${props => props.theme.spacing.lg};
      
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.done};
        font-weight: 600;
      }
    }
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: rgba(163, 113, 247, 0.1);
  color: ${props => props.theme.colors.done};
  border: 1px solid rgba(163, 113, 247, 0.3);
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
    background: rgba(163, 113, 247, 0.15);
    border-color: rgba(163, 113, 247, 0.5);
    transform: translateX(-4px);
    box-shadow: 0 8px 25px rgba(163, 113, 247, 0.15);
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

export default function TermsAndConditions() {
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
              Terms & Conditions
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
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>Use of the Website</h2>
            <p>
              This website is a personal portfolio showcasing professional work and skills. You may:
            </p>
            <ul>
              <li>Browse and view the content for personal or professional purposes</li>
              <li>Share links to the website</li>
              <li>Contact us through the provided contact methods</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              The content displayed on this website, including but not limited to text, graphics, photographs, images, and code examples, is the property of the website owner unless otherwise stated. Unauthorized use is prohibited.
            </p>

            <h2>Hosting and Availability</h2>
            <p>
              This website is hosted on <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Pages</a>. We make no guarantees about the availability, reliability, or uptime of the website. GitHub&apos;s terms of service also apply to the hosting of this site.
            </p>

            <h2>No Data Collection</h2>
            <p>
              <strong>This website does not collect personal data.</strong> We do not use tracking cookies, analytics, or any form of data collection. Your privacy is respected and protected.
            </p>

            <h2>External Links</h2>
            <p>
              This website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of third-party websites.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              This website is provided &quot;as is&quot; without any representations or warranties. We shall not be liable for any damages arising from the use of this website.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these terms and conditions, please contact us through the contact form on our website.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
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

