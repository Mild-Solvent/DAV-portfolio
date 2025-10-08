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
  background: 
    radial-gradient(ellipse at center, #0a0f1e 0%, #04081a 30%, #020617 60%, #000000 100%),
    linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(4,8,26,0.95) 100%);
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

// Realistic space background layers
const StarsLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    /* Large bright stars */
    radial-gradient(3px 3px at 20px 30px, rgba(255,255,255,1), transparent 2px),
    radial-gradient(2px 2px at 180px 120px, rgba(255,255,255,0.9), transparent 1px),
    radial-gradient(3px 3px at 340px 80px, rgba(255,255,255,0.95), transparent 2px),
    radial-gradient(2px 2px at 520px 200px, rgba(255,255,255,0.85), transparent 1px),
    
    /* Medium stars with slight color variations */
    radial-gradient(2px 2px at 90px 40px, rgba(255,248,220,0.8), transparent 1px),
    radial-gradient(1.5px 1.5px at 250px 160px, rgba(220,220,255,0.7), transparent 1px),
    radial-gradient(2px 2px at 420px 60px, rgba(255,255,255,0.9), transparent 1px),
    radial-gradient(1.5px 1.5px at 580px 180px, rgba(255,240,200,0.75), transparent 1px),
    
    /* Small distant stars */
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent 0.5px),
    radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.5), transparent 0.5px),
    radial-gradient(0.5px 0.5px at 320px 140px, rgba(255,255,255,0.4), transparent 0.5px),
    radial-gradient(1px 1px at 480px 100px, rgba(255,255,255,0.55), transparent 0.5px),
    radial-gradient(0.5px 0.5px at 150px 220px, rgba(255,255,255,0.45), transparent 0.5px),
    
    /* Very small background stars */
    radial-gradient(0.5px 0.5px at 60px 120px, rgba(255,255,255,0.3), transparent 0.5px),
    radial-gradient(0.5px 0.5px at 280px 40px, rgba(255,255,255,0.35), transparent 0.5px),
    radial-gradient(0.5px 0.5px at 380px 220px, rgba(255,255,255,0.25), transparent 0.5px),
    radial-gradient(0.5px 0.5px at 540px 120px, rgba(255,255,255,0.4), transparent 0.5px);
  background-repeat: repeat;
  background-size: 600px 300px;
  z-index: 2;
  opacity: 0.8;
  animation: twinkle 4s ease-in-out infinite alternate;
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.6;
    }
  }
`;

const NebulaLayer = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: 
    /* Main nebula clouds */
    radial-gradient(ellipse 1200px 900px at 25% 15%, rgba(138, 43, 226, 0.25), transparent 70%),
    radial-gradient(ellipse 1600px 700px at 85% 85%, rgba(255, 20, 147, 0.18), transparent 65%),
    radial-gradient(ellipse 900px 1200px at 5% 65%, rgba(0, 191, 255, 0.15), transparent 70%),
    
    /* Secondary nebula wisps */
    radial-gradient(ellipse 800px 400px at 60% 30%, rgba(147, 51, 234, 0.12), transparent 50%),
    radial-gradient(ellipse 600px 800px at 40% 70%, rgba(79, 70, 229, 0.1), transparent 55%),
    radial-gradient(ellipse 1000px 500px at 90% 40%, rgba(236, 72, 153, 0.08), transparent 60%),
    
    /* Cosmic dust layers */
    radial-gradient(ellipse 2000px 300px at 50% 20%, rgba(255, 255, 255, 0.02), transparent 70%),
    radial-gradient(ellipse 1500px 400px at 20% 80%, rgba(255, 255, 255, 0.03), transparent 60%);
  z-index: 1;
  animation: nebula-drift 20s linear infinite;
  
  @keyframes nebula-drift {
    0% {
      transform: translateX(0) translateY(0) rotate(0deg);
    }
    25% {
      transform: translateX(-5px) translateY(5px) rotate(0.5deg);
    }
    50% {
      transform: translateX(5px) translateY(-3px) rotate(-0.3deg);
    }
    75% {
      transform: translateX(-3px) translateY(-5px) rotate(0.2deg);
    }
    100% {
      transform: translateX(0) translateY(0) rotate(0deg);
    }
  }
`;

// Add distant galaxy layer
const GalaxyLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    /* Distant spiral galaxy suggestions */
    radial-gradient(ellipse 40px 20px at 15% 25%, rgba(255, 255, 255, 0.1), transparent 80%),
    radial-gradient(ellipse 60px 30px at 85% 70%, rgba(255, 255, 255, 0.08), transparent 75%),
    radial-gradient(ellipse 25px 15px at 70% 20%, rgba(255, 255, 255, 0.06), transparent 70%),
    
    /* Cosmic dust lanes */
    linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.015) 50%, transparent 60%),
    linear-gradient(-30deg, transparent 60%, rgba(255, 255, 255, 0.02) 70%, transparent 80%);
  z-index: 1;
  opacity: 0.7;
`;

// Add moving stars layer for parallax effect
const MovingStarsLayer = styled.div`
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background-image:
    radial-gradient(1px 1px at 80px 90px, rgba(255,255,255,0.4), transparent 1px),
    radial-gradient(1px 1px at 220px 180px, rgba(255,255,255,0.3), transparent 1px),
    radial-gradient(0.5px 0.5px at 360px 60px, rgba(255,255,255,0.35), transparent 0.5px),
    radial-gradient(1px 1px at 500px 200px, rgba(255,255,255,0.25), transparent 1px),
    radial-gradient(0.5px 0.5px at 140px 240px, rgba(255,255,255,0.3), transparent 0.5px),
    radial-gradient(1px 1px at 320px 120px, rgba(255,255,255,0.4), transparent 1px);
  background-repeat: repeat;
  background-size: 700px 350px;
  z-index: 1;
  animation: drift-stars 30s linear infinite;
  
  @keyframes drift-stars {
    0% {
      transform: translateX(0) translateY(0);
    }
    100% {
      transform: translateX(-50px) translateY(-25px);
    }
  }
`;

// Add shooting stars layer
const ShootingStarsLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-shadow: 
      0 0 6px rgba(255, 255, 255, 0.8),
      0 0 12px rgba(255, 255, 255, 0.4);
    top: 20%;
    right: -10px;
    animation: shooting-star-1 8s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    box-shadow: 
      0 0 4px rgba(255, 255, 255, 0.6),
      0 0 8px rgba(255, 255, 255, 0.3);
    top: 70%;
    right: -10px;
    animation: shooting-star-2 12s linear infinite;
    animation-delay: -4s;
  }
  
  @keyframes shooting-star-1 {
    0% {
      transform: translateX(0) translateY(0) rotate(45deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
      box-shadow: 
        0 0 6px rgba(255, 255, 255, 0.8),
        0 0 12px rgba(255, 255, 255, 0.4),
        -100px 100px 20px rgba(255, 255, 255, 0.1);
    }
    70% {
      opacity: 1;
      box-shadow: 
        0 0 6px rgba(255, 255, 255, 0.8),
        0 0 12px rgba(255, 255, 255, 0.4),
        -100px 100px 20px rgba(255, 255, 255, 0.1);
    }
    100% {
      transform: translateX(-1200px) translateY(600px) rotate(45deg);
      opacity: 0;
    }
  }
  
  @keyframes shooting-star-2 {
    0% {
      transform: translateX(0) translateY(0) rotate(30deg);
      opacity: 0;
    }
    15% {
      opacity: 1;
      box-shadow: 
        0 0 4px rgba(255, 255, 255, 0.6),
        0 0 8px rgba(255, 255, 255, 0.3),
        -80px 60px 15px rgba(255, 255, 255, 0.08);
    }
    85% {
      opacity: 1;
      box-shadow: 
        0 0 4px rgba(255, 255, 255, 0.6),
        0 0 8px rgba(255, 255, 255, 0.3),
        -80px 60px 15px rgba(255, 255, 255, 0.08);
    }
    100% {
      transform: translateX(-1000px) translateY(500px) rotate(30deg);
      opacity: 0;
    }
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
      <MovingStarsLayer />
      <GalaxyLayer />
      <NebulaLayer />
      <StarsLayer />
      <ShootingStarsLayer />
      
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