import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const GlowStrip = styled.div`
  width: 200px;
  height: 4px;
  margin: ${props => props.theme.spacing.xl} auto ${props => props.theme.spacing['2xl']} auto;
  background: linear-gradient(90deg, 
    #d2a8ff 0%, 
    #a371f7 20%, 
    #196c2e 40%, 
    #2ea043 60%, 
    #56d364 80%, 
    #b4f1b4 100%
  );
  border-radius: ${props => props.theme.borderRadius.full};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: inherit;
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 80px;
    background: linear-gradient(180deg,
      rgba(210, 168, 255, 0.15) 0%,
      rgba(163, 113, 247, 0.12) 20%,
      rgba(25, 108, 46, 0.1) 40%,
      rgba(46, 160, 67, 0.08) 60%,
      rgba(86, 211, 100, 0.05) 80%,
      transparent 100%
    );
    clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
    pointer-events: none;
    z-index: -2;
  }
`;

const Content = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
`;

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <Container>
      <GlowStrip />
        <SectionHeading
          title="About Me"
          subtitle="Web Developer with passion for modern technologies"
        />
        <Content
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>I create modern and responsive websites with focus on user experience and performance. I specialize in frontend development using the latest technologies and have extensive experience in designing and implementing complex web applications - from simple landing pages to complex enterprise systems. I constantly educate myself and follow the latest trends in web development to offer the best solutions for my clients.</p>
        </Content>
      </Container>
    </AboutSection>
  );
};

export default About;