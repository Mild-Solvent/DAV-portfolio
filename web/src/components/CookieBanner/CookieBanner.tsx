import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  z-index: 1001;
  transform: translateY(${props => props.isVisible ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  }
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const BannerText = styled.p`
  color: ${props => props.theme.colors.text || '#ffffff'};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: 0;
  flex: 1;
  line-height: 1.5;
  
  a {
    color: ${props => props.theme.colors.primary || '#00d2ff'};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AcceptButton = styled.button`
  background: ${props => props.theme.colors.primary || '#00d2ff'};
  color: ${props => props.theme.colors.white || '#ffffff'};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md || '8px'};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.theme.colors.primaryLight || '#33daff'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 210, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <BannerContainer isVisible={isVisible}>
      <BannerContent>
        <BannerText>
          This site is hosted on <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> and doesn't collect personal data or use tracking cookies. Essential functionality only.
        </BannerText>
        <AcceptButton onClick={handleAccept}>
          Got it
        </AcceptButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default CookieBanner;