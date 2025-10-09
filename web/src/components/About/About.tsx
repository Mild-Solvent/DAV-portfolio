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