import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import SectionHeading from '../shared/SectionHeading';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.backgroundSolid};
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  /* GitHub Actions section gradient - green/teal sweep from left */
  &::before {
    content: '';
    position: absolute;
    width: 1200px;
    height: 1200px;
    top: 50%;
    left: -400px;
    transform: translateY(-50%);
    background: radial-gradient(
      ellipse 60% 60% at 30% 50%,
      rgba(16, 185, 129, 0.25),
      rgba(52, 211, 153, 0.15) 35%,
      rgba(20, 184, 166, 0.1) 50%,
      transparent 70%
    );
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const Content = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
`;

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <AboutSection id="about">
      <Container>
        <SectionHeading
          title={t('about.title')}
          subtitle={t('about.heading')}
        />
        <Content
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>{t('about.description')}</p>
        </Content>
      </Container>
    </AboutSection>
  );
};

export default About;