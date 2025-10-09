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
  
  /* GitHub-style gradient glow - green theme */
  &::before {
    content: '';
    position: absolute;
    width: 700px;
    height: 700px;
    top: -150px;
    right: -100px;
    background: radial-gradient(
      circle,
      rgba(63, 185, 80, 0.15) 0%,
      rgba(46, 160, 67, 0.1) 35%,
      transparent 70%
    );
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    bottom: -100px;
    left: -150px;
    background: radial-gradient(
      circle,
      rgba(86, 211, 100, 0.12) 0%,
      rgba(63, 185, 80, 0.08) 40%,
      transparent 70%
    );
    filter: blur(70px);
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