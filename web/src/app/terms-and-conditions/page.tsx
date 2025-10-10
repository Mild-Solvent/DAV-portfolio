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
  
  ul {
    margin-bottom: ${props => props.theme.spacing.lg};
    padding-left: ${props => props.theme.spacing.xl};
    
    li {
      margin-bottom: ${props => props.theme.spacing.sm};
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

export default function TermsAndConditions() {
  return (
    <Container>
      <Header>
        <Title>Terms & Conditions</Title>
        <LastUpdated>Last updated: {new Date().toLocaleDateString()}</LastUpdated>
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
          This website is hosted on <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Pages</a>. We make no guarantees about the availability, reliability, or uptime of the website. GitHub's terms of service also apply to the hosting of this site.
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
          This website is provided "as is" without any representations or warranties. We shall not be liable for any damages arising from the use of this website.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions about these terms and conditions, please contact us through the contact form on our website.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
        </p>
        
        <BackLink href="/">← Back to Home</BackLink>
      </Content>
    </Container>
  );
}