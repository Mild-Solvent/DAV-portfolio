import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.xl};
  min-height: 100vh;
  background: ${props => props.theme.colors.background || '#0a0a0a'};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing['3xl']};
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text || '#ffffff'};
  font-size: ${props => props.theme.fontSizes['3xl']};
  margin-bottom: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #00b894 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LastUpdated = styled.p`
  color: ${props => props.theme.colors.textSecondary || 'rgba(255, 255, 255, 0.6)'};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text || '#ffffff'};
  line-height: 1.7;
  
  h2 {
    color: ${props => props.theme.colors.primary || '#00d2ff'};
    margin: ${props => props.theme.spacing['2xl']} 0 ${props => props.theme.spacing.lg} 0;
    font-size: ${props => props.theme.fontSizes.xl};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.base};
  }
  
  strong {
    color: ${props => props.theme.colors.primary || '#00d2ff'};
  }
  
  a {
    color: ${props => props.theme.colors.primary || '#00d2ff'};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: ${props => props.theme.spacing['2xl']};
  color: ${props => props.theme.colors.primary || '#00d2ff'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
    color: ${props => props.theme.colors.primaryLight || '#33daff'};
  }
`;

export default function PrivacyPolicy() {
  return (
    <Container>
      <Header>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last updated: {new Date().toLocaleDateString()}</LastUpdated>
      </Header>
      
      <Content>
        <h2>Data Collection</h2>
        <p>
          <strong>We do not collect any personal data.</strong> This portfolio website is designed with privacy in mind and operates without tracking, analytics, or data collection of any kind.
        </p>

        <h2>Hosting</h2>
        <p>
          This website is hosted on <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> using GitHub Pages. GitHub may collect certain technical information as part of their hosting service. Please refer to <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's Privacy Policy</a> for information about their data practices.
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
          We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated "last modified" date.
        </p>
        
        <BackLink href="/">← Back to Home</BackLink>
      </Content>
    </Container>
  );
}