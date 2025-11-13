'use client';

import Header from '@/components/Header/Header';
import ContactCalendar from '@/components/ContactCalendar/ContactCalendar';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.primary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60vh;
    background: radial-gradient(ellipse at top, rgba(163, 113, 247, 0.15) 0%, transparent 70%),
                radial-gradient(ellipse at bottom right, rgba(31, 111, 235, 0.1) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px ${theme.spacing.xl} 80px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 100px ${theme.spacing.md} 60px;
  }
  
  @media (max-width: 480px) {
    padding: 80px ${theme.spacing.sm} 40px;
  }
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (max-width: 768px) {
    margin-bottom: ${theme.spacing['3xl']};
  }
  
  @media (max-width: 480px) {
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const Gradient = styled.span`
  background: ${theme.gradients.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  
  @keyframes gradientShift {
    0%, 100% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(20deg); }
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.7;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.lg};
    line-height: 1.6;
  }
`;

const DecorLine = styled.div`
  width: 100px;
  height: 4px;
  background: ${theme.gradients.blue};
  margin: 0 auto ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.4);
`;

export default function CalendarPage() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <HeaderSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>
              Schedule a <Gradient>Meeting</Gradient>
            </Title>
            <DecorLine />
            <Subtitle>
              Select a date to contact us and schedule your appointment
            </Subtitle>
          </HeaderSection>
          
          <ContactCalendar />
        </Container>
      </PageWrapper>
    </>
  );
}
