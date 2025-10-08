import React from 'react';
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
  background: radial-gradient(ellipse at center, #0B1426 0%, #020617 50%, #000000 100%);
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
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: 0.005em;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  border-radius: 25px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.02em;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #10B981 0%, #22C55E 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.02em;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Simple background elements
const StarsLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(3px 3px at 20px 30px, #ffffff, transparent),
    radial-gradient(3px 3px at 40px 70px, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 90px 40px, #ffffff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 160px 30px, #ffffff, transparent),
    radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.8), transparent);
  background-repeat: repeat;
  background-size: 350px 250px;
  z-index: 1;
  opacity: 0.6;
`;

const NebulaLayer = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: 
    radial-gradient(ellipse 1000px 800px at 30% 20%, rgba(138, 43, 226, 0.2), transparent 60%),
    radial-gradient(ellipse 1400px 600px at 80% 80%, rgba(255, 20, 147, 0.15), transparent 60%),
    radial-gradient(ellipse 800px 1000px at 10% 60%, rgba(0, 191, 255, 0.12), transparent 60%);
  z-index: 1;
`;

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for the hero offset - sections start after 100vh
      const elementTop = element.offsetTop + window.innerHeight;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="hero">
      <StarsLayer />
      <NebulaLayer />
      
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
  );
};

export default Hero;