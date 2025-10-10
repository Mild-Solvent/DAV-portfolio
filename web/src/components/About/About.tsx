import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading, GlowStrip } from '../shared';

const AboutSection = styled(motion.section)<{ $borderOpacity: number }>`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 136, 1) 20%,
      rgba(64, 224, 255, 1) 50%,
      rgba(0, 255, 136, 1) 80%,
      transparent 100%
    );
    box-shadow: 
      0 0 30px rgba(0, 255, 136, 0.8),
      0 0 60px rgba(64, 224, 255, 0.6),
      0 0 90px rgba(0, 200, 255, 0.4),
      0 0 120px rgba(88, 166, 255, 0.2);
    opacity: ${props => props.$borderOpacity};
    transform: scaleX(1);
    transform-origin: center;
    transition: opacity 0.05s ease-out;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(
      180deg,
      rgba(0, 255, 136, 0.12) 0%,
      rgba(64, 224, 255, 0.08) 25%,
      rgba(0, 200, 255, 0.06) 50%,
      rgba(88, 166, 255, 0.03) 75%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
    opacity: ${props => props.$borderOpacity * 0.7};
    transition: opacity 0.05s ease-out;
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

// Floating particles for About section
const AboutParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
  opacity: 0.6;
`;

const AboutParticle = styled(motion.div)<{ $delay: number; $duration: number; $x: number; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: radial-gradient(
    circle,
    rgba(64, 224, 255, 0.4) 0%,
    rgba(0, 255, 136, 0.3) 40%,
    rgba(0, 200, 255, 0.2) 70%,
    transparent 100%
  );
  border-radius: 50%;
  top: 100%;
  left: ${props => props.$x}%;
  filter: blur(0.5px);
  box-shadow: 
    0 0 8px rgba(64, 224, 255, 0.3),
    0 0 16px rgba(0, 255, 136, 0.2);
`;

// Floating particle component for About section
const AboutFloatingParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const [particleProps, setParticleProps] = useState({
    x: 50,
    size: 3,
    duration: 20,
    driftX1: 0,
    driftX2: 0
  });
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setParticleProps({
      x: Math.random() * 100,
      size: Math.random() * 3 + 2, // 2-5px
      duration: Math.random() * 10 + 15, // 15-25 seconds
      driftX1: Math.random() * 60 - 30,
      driftX2: Math.random() * 80 - 40
    });
  }, []);
  
  if (!isClient) {
    return null;
  }
  
  return (
    <AboutParticle
      $delay={delay}
      $duration={particleProps.duration}
      $x={particleProps.x}
      $size={particleProps.size}
      initial={{ 
        y: 0, 
        opacity: 0,
        scale: 0
      }}
      animate={{
        y: [0, -200, -300],
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.7],
        x: [0, particleProps.driftX1, particleProps.driftX2]
      }}
      transition={{
        duration: particleProps.duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
};

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const [borderOpacity, setBorderOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      
      const rect = aboutRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate how much of the section is visible
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // When section starts entering viewport, border is bright
      // As section moves toward center, border fades
      // When section center reaches screen center, border is invisible
      
      if (sectionTop > windowHeight || sectionBottom < 0) {
        // Section not visible
        setBorderOpacity(0);
      } else {
        // Calculate section center position relative to screen center
        const sectionCenter = sectionTop + (sectionHeight / 2);
        const screenCenter = windowHeight / 2;
        
        // Calculate how far the section has moved from bottom toward center
        // When sectionCenter > screenCenter, section is below center (approaching from bottom)
        // When sectionCenter < screenCenter, section is above center (moving past center)
        
        if (sectionCenter > screenCenter) {
          // Section is approaching from bottom
          const totalJourney = windowHeight / 2 + sectionHeight / 2; // Distance from bottom edge to center
          const currentDistance = sectionCenter - screenCenter; // How far below center
          const progressFromBottom = 1 - (currentDistance / totalJourney); // 0 at bottom, 1 at center
          
          // Start fading at 60% of journey, invisible at 90%
          if (progressFromBottom < 0.6) {
            setBorderOpacity(1); // Full brightness until 60% of journey
          } else if (progressFromBottom > 0.9) {
            setBorderOpacity(0); // Invisible at 90% of journey
          } else {
            // Gradual fade between 60% and 90%
            const fadeProgress = (progressFromBottom - 0.6) / (0.9 - 0.6);
            setBorderOpacity(1 - fadeProgress);
          }
        } else {
          // Section has passed center, keep invisible
          setBorderOpacity(0);
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <AboutSection 
      id="about" 
      ref={aboutRef}
      $borderOpacity={borderOpacity}
    >
      {/* Animated particles */}
      <AboutParticlesContainer>
        {Array.from({ length: 8 }, (_, i) => (
          <AboutFloatingParticle key={i} delay={i * 0.8} />
        ))}
      </AboutParticlesContainer>
      
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