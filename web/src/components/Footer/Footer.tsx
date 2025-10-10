import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing.xl} 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  text-align: center;
`;

const Copyright = styled.div`
  color: ${props => props.theme.colors.textSecondary || 'rgba(255, 255, 255, 0.6)'};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.xs};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.md};
  }
`;

const FooterButton = styled(Link)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.text || '#ffffff'};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md || '8px'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(0, 210, 255, 0.1);
    border-color: ${props => props.theme.colors.primary || '#00d2ff'};
    color: ${props => props.theme.colors.primary || '#00d2ff'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 210, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Container>
        <FooterLinks>
          <FooterButton href="/privacy-policy">
            Privacy Policy
          </FooterButton>
          <FooterButton href="/terms-and-conditions">
            Terms & Conditions
          </FooterButton>
        </FooterLinks>
        
        <Copyright>
          © {currentYear} DAV Development. All rights reserved.
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;