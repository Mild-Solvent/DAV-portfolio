import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SectionHeading } from '../shared';
import { useTranslation } from '../../contexts/TranslationContext';
import Link from 'next/link';

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, 
      rgba(0, 210, 255, 0.3) 0%, 
      rgba(58, 123, 213, 0.25) 20%, 
      rgba(0, 184, 148, 0.2) 40%, 
      rgba(0, 206, 201, 0.15) 60%, 
      rgba(9, 132, 227, 0.1) 80%, 
      transparent 100%
    );
    filter: blur(8px);
    opacity: 0.7;
    animation: pulse-glow-gradient 4s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes pulse-glow-gradient {
    0%, 100% {
      opacity: 0.7;
      filter: blur(8px);
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      filter: blur(12px);
      transform: scaleY(1.2);
    }
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
  width: 100%;
`;

const ContactContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin: 0;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  max-width: 500px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ContactLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 500;
  text-align: right;
`;

const ButtonWrapper = styled(motion.div)`
  margin-top: ${props => props.theme.spacing.lg};
`;

const BookingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 25%, #00b894 50%, #00cec9 75%, #0984e3 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 210, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #00b8d4 0%, #2962ff 25%, #00a085 50%, #00acc1 75%, #1565c0 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 210, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
  display: inline-block;
`;

const Contact: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <ContactSection id="contact">
      <Container>
        <SectionHeading
          title={t('contact.title')}
        />

        <ContactContent
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Description>
            {t('contact.description')}
          </Description>

          <ContactDetails>
            <ContactItem>
              <ContactLabel>{t('contact.email')}</ContactLabel>
              <ContactValue>dav.development.official@gmail.com</ContactValue>
            </ContactItem>

            <ContactItem>
              <ContactLabel>{t('contact.phone')}</ContactLabel>
              <ContactValue>+421 914 229 122</ContactValue>
            </ContactItem>

            <ContactItem>
              <ContactLabel>{t('contact.location')}</ContactLabel>
              <ContactValue>{t('contact.locationValue')}</ContactValue>
            </ContactItem>
          </ContactDetails>

          <ButtonWrapper
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <BookingButton href={`/${language}/calendar`}>
              <ButtonIcon>📅</ButtonIcon>
              Book a Meeting
            </BookingButton>
          </ButtonWrapper>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
