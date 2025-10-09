import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

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
  background: 
    linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f1119 70%, #0a0a0a 100%);
  width: 100%;
  box-sizing: border-box;
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
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
  line-height: 1.2;
  letter-spacing: -0.025em;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  
  span {
    background: ${props => props.theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  text-align: center;
  
  /* Professional separator styling */
  span.separator {
    color: rgba(59, 130, 246, 0.8);
    margin: 0 0.8rem;
    font-weight: 300;
  }
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
  background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.02em;
  min-width: 200px;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #10B981 0%, #22C55E 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.02em;
  min-width: 200px;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(16, 185, 129, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

// Simple gradient decorative elements
const GradientCircle = styled.div<{ size: string; position: string; color: string; blur?: string }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  ${props => props.position};
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(${props => props.blur || '60px'});
  z-index: 1;
  opacity: 0.6;
`;

const GradientEllipse = styled.div<{ width: string; height: string; position: string; color: string; blur?: string; rotation?: string }>`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => props.position};
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(${props => props.blur || '80px'});
  transform: ${props => props.rotation || 'rotate(0deg)'};
  z-index: 1;
  opacity: 0.4;
`;

// Simple cursor gradient follower
const CursorGradient = styled.div.withConfig({
  shouldForwardProp: (prop) => !['visible'].includes(prop),
})<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  width: 200px;
  height: 200px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 3;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for the hero offset - sections start after 100vh
      const elementTop = element.offsetTop + window.innerHeight;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  };

  // Handle mouse move - update cursor position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isHovering || !heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [isHovering]);

  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Setup event listeners
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    heroElement.addEventListener('mouseenter', handleMouseEnter);
    heroElement.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroElement.removeEventListener('mouseenter', handleMouseEnter);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  return (
    <HeroSection id="hero" ref={heroRef}>
      {/* Simple cursor gradient follower */}
      <CursorGradient
        x={cursorPos.x}
        y={cursorPos.y}
        visible={isHovering}
      />
      
      {/* Rainbow gradient circles */}
      <GradientCircle 
        size="400px" 
        position="top: -100px; left: -100px" 
        color="linear-gradient(135deg, #ff006e 0%, #fb5607 100%)" 
        blur="100px"
      />
      <GradientCircle 
        size="300px" 
        position="top: 20%; right: -80px" 
        color="linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)" 
        blur="80px"
      />
      <GradientCircle 
        size="250px" 
        position="bottom: 10%; left: 5%" 
        color="linear-gradient(135deg, #06ffa5 0%, #ffbe0b 100%)" 
        blur="70px"
      />
      
      {/* Rainbow gradient ellipses */}
      <GradientEllipse 
        width="600px" 
        height="200px" 
        position="top: 30%; right: -200px" 
        color="linear-gradient(90deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)" 
        blur="120px"
        rotation="rotate(45deg)"
      />
      <GradientEllipse 
        width="500px" 
        height="150px" 
        position="bottom: -50px; left: -150px" 
        color="linear-gradient(90deg, #06ffa5 0%, #ffbe0b 50%, #fb5607 100%)" 
        blur="90px"
        rotation="rotate(-30deg)"
      />
      <GradientEllipse 
        width="400px" 
        height="180px" 
        position="top: 60%; left: 70%" 
        color="linear-gradient(90deg, #3a86ff 0%, #06ffa5 50%, #ff006e 100%)" 
        blur="100px"
        rotation="rotate(60deg)"
      />
      
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
          {t('hero.title').replace(t('hero.title.highlight'), '').trim()}{' '}
          <span>{t('hero.title.highlight')}</span>{' '}
          {t('hero.title').includes('budúcnosti') ? 'budúcnosti' : 'of the future'}
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {t('hero.subtitle').split(' · ').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="separator">·</span>}
            </React.Fragment>
          ))}
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
  );
};

export default Hero;