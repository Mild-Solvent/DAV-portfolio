import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext';

const HeroSection = styled.section`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
  background: #0d1117;
  width: 100%;
  box-sizing: border-box;
  cursor: none; /* Hide default cursor in hero section */
  
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 10;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    padding: 0 1.5rem;
    max-width: 90%;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    max-width: 95%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.display};
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textEmphasis};
  line-height: 1.1;
  letter-spacing: -0.04em;
  position: relative;
  text-align: center;
  -webkit-text-stroke: 0.5px;
  -webkit-text-stroke-color: #e0ffe8;
  
  /* Subtle glow effect following letter shapes - shifted down and left */
  text-shadow: 
    /* Very subtle inner glow */
    -1px 2px 3px rgba(0, 255, 136, 0.3),
    -2px 3px 6px rgba(0, 255, 136, 0.2),
    -2px 4px 10px rgba(0, 200, 255, 0.15),
    -3px 5px 15px rgba(64, 224, 255, 0.1);
  
  /* Very light drop shadow filter - shifted down and left */
  filter: 
    drop-shadow(-1px 2px 4px rgba(0, 255, 136, 0.2))
    drop-shadow(-2px 3px 8px rgba(0, 200, 255, 0.1));
  
  
  span {
    color: ${props => props.theme.colors.textEmphasis};
    display: inline-block;
    -webkit-text-stroke: 0.5px;
    -webkit-text-stroke-color: #e8f6ff;
    
    /* Subtle glow for the span text - shifted down and left */
    text-shadow: 
      -1px 2px 3px rgba(64, 224, 255, 0.4),
      -2px 3px 6px rgba(64, 224, 255, 0.2),
      -2px 4px 10px rgba(0, 200, 255, 0.15),
      -3px 5px 15px rgba(0, 255, 136, 0.1);
      
    filter: 
      drop-shadow(-1px 2px 4px rgba(64, 224, 255, 0.2))
      drop-shadow(-2px 3px 8px rgba(0, 200, 255, 0.1));
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 400;
  text-align: center;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${props => props.theme.colors.textEmphasis};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 180px;
  
  &:hover {
    background: ${props => props.theme.colors.text};
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.colors.textEmphasis};
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 180px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    border-color: ${props => props.theme.colors.surfaceLight};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Bottom glow effect
const BottomGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(
    0deg,
    rgba(0, 255, 136, 0.15) 0%,
    rgba(64, 224, 255, 0.12) 25%,
    rgba(0, 200, 255, 0.08) 50%,
    rgba(88, 166, 255, 0.04) 75%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 136, 0.6) 20%,
      rgba(64, 224, 255, 0.8) 50%,
      rgba(0, 255, 136, 0.6) 80%,
      transparent 100%
    );
    box-shadow: 
      0 0 20px rgba(0, 255, 136, 0.4),
      0 0 40px rgba(64, 224, 255, 0.3),
      0 0 60px rgba(0, 200, 255, 0.2);
  }
`;

// Particle container
const ParticlesContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  overflow: hidden;
  pointer-events: none;
  z-index: 6;
`;

// Cursor glow effect
const CursorGlow = styled.div<{ $x: number; $y: number; $isVisible: boolean }>`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 30%,
    rgba(255, 255, 255, 0.2) 60%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 9999;
  transform: translate(${props => props.$x - 20}px, ${props => props.$y - 20}px);
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.2s ease;
  mix-blend-mode: screen;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.3),
    0 0 40px rgba(255, 255, 255, 0.2),
    0 0 60px rgba(255, 255, 255, 0.1);
`;

// Individual particle
const Particle = styled(motion.div)<{ $delay: number; $duration: number; $x: number; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: radial-gradient(
    circle,
    rgba(64, 224, 255, 0.8) 0%,
    rgba(0, 255, 136, 0.6) 40%,
    rgba(0, 200, 255, 0.3) 70%,
    transparent 100%
  );
  border-radius: 50%;
  bottom: -10px;
  left: ${props => props.$x}%;
  filter: blur(0.5px);
  box-shadow: 
    0 0 10px rgba(64, 224, 255, 0.4),
    0 0 20px rgba(0, 255, 136, 0.2);
`;

// Floating particle component
const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const [particleProps, setParticleProps] = useState({
    x: 50,
    size: 4,
    duration: 15,
    driftX1: 0,
    driftX2: 0
  });
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setParticleProps({
      x: Math.random() * 100,
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 8 + 12, // 12-20 seconds
      driftX1: Math.random() * 100 - 50,
      driftX2: Math.random() * 150 - 75
    });
  }, []);
  
  if (!isClient) {
    return null; // Don't render on server
  }
  
  return (
    <Particle
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
        y: [-10, -300, -400],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.8],
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


const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
      // Add mousemove listener only when over hero
      document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      // Remove mousemove listener when leaving hero
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
        // Ensure cleanup if component unmounts
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for the hero offset - sections start after 100vh
      const elementTop = element.offsetTop + window.innerHeight;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Custom cursor glow - rendered outside hero to avoid z-index issues */}
      <CursorGlow 
        $x={cursorPosition.x} 
        $y={cursorPosition.y} 
        $isVisible={isCursorVisible}
      />
      
      <HeroSection id="hero" ref={heroRef}>
        {/* Bottom glow effect */}
        <BottomGlow />
      
      {/* Floating particles */}
      <ParticlesContainer>
        {Array.from({ length: 15 }, (_, i) => (
          <FloatingParticle key={i} delay={i * 1.2} />
        ))}
      </ParticlesContainer>
      
      <HeroContainer>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
          }}
        >
          {t('hero.title.before')}<span>{t('hero.title.highlight')}</span>{t('hero.title.after')}
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {t('hero.subtitle')}
        </HeroSubtitle>
        
        <HeroButtons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <PrimaryButton
            onClick={() => scrollToSection('projects')}
          >
            {t('hero.cta.projects')}
          </PrimaryButton>
          
          <SecondaryButton
            onClick={() => scrollToSection('contact')}
          >
            {t('hero.cta.contact')}
          </SecondaryButton>
        </HeroButtons>
      </HeroContainer>
    </HeroSection>
    </>
  );
};

export default Hero;