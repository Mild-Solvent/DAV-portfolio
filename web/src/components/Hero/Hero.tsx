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
  background: linear-gradient(180deg, #0d1117 0%, #0a0e14 100%);
  width: 100%;
  box-sizing: border-box;
  
  /* GitHub hero gradient - purple to green sweep */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
      radial-gradient(ellipse 100% 80% at 80% 50%, rgba(255, 128, 255, 0.15), transparent),
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(0, 255, 135, 0.15), transparent);
    filter: blur(40px);
    pointer-events: none;
  }
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
  
  span {
    background: ${props => props.theme.gradients.hero};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
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