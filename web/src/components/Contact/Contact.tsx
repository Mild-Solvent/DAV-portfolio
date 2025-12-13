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
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing['2xl']};
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
`;

const ContactDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(22, 27, 34, 0.6) 0%, rgba(13, 17, 23, 0.8) 100%);
  border: 1px solid rgba(88, 166, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(88, 166, 255, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(88, 166, 255, 0.15);
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ContactLabel = styled.h4`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
`;

const ContactValue = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  font-size: ${props => props.theme.fontSizes.base};
  word-break: break-word;
`;

const BookingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 25%, #00b894 50%, #00cec9 75%, #0984e3 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 700;
  box-shadow: 0 8px 30px rgba(0, 210, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-decoration: none;
  margin-top: ${props => props.theme.spacing.xl};
  
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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #00b8d4 0%, #2962ff 25%, #00a085 50%, #00acc1 75%, #1565c0 100%);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 
      0 12px 40px rgba(0, 210, 255, 0.6),
      0 0 30px rgba(0, 184, 148, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 210, 255, 0.6);
  }
  
  animation: pulse-glow 3s infinite;
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 8px 30px rgba(0, 210, 255, 0.4);
    }
    50% {
      box-shadow: 
        0 8px 30px rgba(0, 210, 255, 0.6),
        0 0 30px rgba(0, 184, 148, 0.3);
    }
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  transition: transform 0.3s ease;
  
  ${BookingButton}:hover & {
    transform: scale(1.2) rotate(10deg);
  }
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
            <ContactCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ContactIcon>📧</ContactIcon>
              <ContactLabel>{t('contact.email')}</ContactLabel>
              <ContactValue>dav.development.official@gmail.com</ContactValue>
            </ContactCard>

            <ContactCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ContactIcon>📱</ContactIcon>
              <ContactLabel>{t('contact.phone')}</ContactLabel>
              <ContactValue>+421 914 229 122</ContactValue>
            </ContactCard>

            <ContactCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ContactIcon>📍</ContactIcon>
              <ContactLabel>{t('contact.location')}</ContactLabel>
              <ContactValue>{t('contact.locationValue')}</ContactValue>
            </ContactCard>
          </ContactDetails>

          <BookingButton
            href={`/${language}/calendar`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ButtonIcon>📅</ButtonIcon>
            Book a Meeting
          </BookingButton>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
