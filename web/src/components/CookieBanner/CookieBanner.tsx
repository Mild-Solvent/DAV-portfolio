import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 380px;
  background: rgba(13, 17, 23, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg || '12px'};
  padding: ${props => props.theme.spacing.lg};
  z-index: 1001;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'}) scale(${props => props.isVisible ? '1' : '0.95'});
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 210, 255, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
    padding: ${props => props.theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    bottom: 12px;
    right: 12px;
    left: 12px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary || 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.text || '#ffffff'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ModalTitle = styled.h3`
  color: ${props => props.theme.colors.text || '#ffffff'};
  font-size: ${props => props.theme.fontSizes.md || '16px'};
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const ModalText = styled.p`
  color: ${props => props.theme.colors.textSecondary || 'rgba(255, 255, 255, 0.8)'};
  font-size: ${props => props.theme.fontSizes.sm || '14px'};
  margin: 0;
  line-height: 1.5;
  
  a {
    color: ${props => props.theme.colors.primary || '#00d2ff'};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const AcceptButton = styled.button`
  background: ${props => props.theme.colors.primary || '#00d2ff'};
  color: ${props => props.theme.colors.white || '#ffffff'};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md || '6px'};
  font-size: ${props => props.theme.fontSizes.sm || '14px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  
  &:hover {
    background: ${props => props.theme.colors.primaryLight || '#33daff'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 210, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DeclineButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.textSecondary || 'rgba(255, 255, 255, 0.6)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md || '6px'};
  font-size: ${props => props.theme.fontSizes.sm || '14px'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: ${props => props.theme.colors.text || '#ffffff'};
  }
`;

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined
    const hasAccepted = localStorage.getItem('cookieConsent');
    const hasDeclined = localStorage.getItem('cookieDeclined');
    
    if (!hasAccepted && !hasDeclined) {
      // Show modal after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
    localStorage.setItem('cookieDeclined', 'true');
  };

  if (!isVisible) return null;

  return (
    <ModalContainer isVisible={isVisible}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cookie Notice</ModalTitle>
          <CloseButton onClick={handleDecline}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </CloseButton>
        </ModalHeader>
        <ModalText>
          This site is hosted on{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          and does not collect personal data or use tracking cookies. Essential functionality only.
        </ModalText>
        <ButtonGroup>
          <AcceptButton onClick={handleAccept}>
            Accept
          </AcceptButton>
          <DeclineButton onClick={handleDecline}>
            Decline
          </DeclineButton>
        </ButtonGroup>
      </ModalContent>
    </ModalContainer>
  );
};

export default CookieBanner;