import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import SectionHeading from '../shared/SectionHeading';

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ServiceCard = styled(motion.div)<{ $isFlipped?: boolean }>`
  position: relative;
  height: 420px;
  cursor: pointer;
  background: ${props => props.theme.colors.backgroundLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: all 0.2s ease;
  
  /* Subtle gradient glow on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.3),
      rgba(165, 113, 247, 0.3)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.surfaceLight};
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 380px;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
`;

const ServiceTitle = styled.h3`
  font-family: ${props => props.theme.fonts.display};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 1.3;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  text-align: center;
  margin: ${props => props.theme.spacing.md} 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  flex: 1;
  display: flex;
  align-items: center;
`;

const ServiceFeatures = styled.ul<{ $show: boolean }>`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.lg} 0;
  flex: 1;
  width: 100%;
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  opacity: ${props => props.$show ? 1 : 0};
  transform: translateY(${props => props.$show ? '0' : '20px'});
  transition: all 0.3s ease;
  
  li {
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: ${props => props.theme.spacing.sm};
    position: relative;
    padding-left: ${props => props.theme.spacing.lg};
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    
    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      color: #60a5fa;
      text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ServicePrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #60a5fa;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.4));
  margin-top: ${props => props.theme.spacing.md};
  flex-shrink: 0;
`;

const CardContent = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Services: React.FC = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const services = [
    {
      icon: '💻',
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: [
        'React & TypeScript',
        'Progressive Web Apps',
        'Server-Side Rendering',
        'API Integration',
        'Performance Optimization'
      ],
      price: 'Od 500€'
    },
    {
      icon: '📱',
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      features: [
        'React Native Development',
        'Native Performance',
        'Push Notifications',
        'Offline Functionality',
        'App Store Deployment'
      ],
      price: 'Od 875€'
    },
    {
      icon: '🎨',
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Design Systems',
        'Accessibility',
        'Usability Testing'
      ],
      price: 'Od 375€'
    },
    {
      icon: '⚡',
      title: t('services.audit.title'),
      description: t('services.audit.description'),
      features: [
        'Speed Optimization',
        'SEO Analysis',
        'Code Review',
        'Security Audit',
        'Analytics Setup'
      ],
      price: 'Od 200€'
    },
    {
      icon: '☁️',
      title: t('services.cloud.title'),
      description: t('services.cloud.description'),
      features: [
        'AWS/Azure Setup',
        'CI/CD Pipelines',
        'Docker Containers',
        'Monitoring & Logging',
        'Backup Solutions'
      ],
      price: 'Od 300€'
    },
    {
      icon: '🤖',
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      features: [
        'ChatGPT Integration',
        'Machine Learning Models',
        'Data Analysis',
        'Automation Scripts',
        'Custom AI Solutions'
      ],
      price: 'Od 625€'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeading
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <ServicesGrid>
            {services.map((service, index) => {
              const isFlipped = flippedCards.includes(index);
              return (
                <ServiceCard
                  key={index}
                  variants={cardVariants}
                  onClick={() => handleCardFlip(index)}
                  $isFlipped={isFlipped}
                >
                  {/* Front Face - Default View */}
                  <CardContent $show={!isFlipped}>
                    <ServiceIcon>{service.icon}</ServiceIcon>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <ServicePrice>{service.price}</ServicePrice>
                  </CardContent>
                  
                  {/* Back Face - Features View */}
                  <CardContent $show={isFlipped}>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceFeatures $show={isFlipped}>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ServiceFeatures>
                    <ServicePrice>{service.price}</ServicePrice>
                  </CardContent>
                </ServiceCard>
              );
            })}
          </ServicesGrid>
        </motion.div>
      </Container>
    </ServicesSection>
  );
};

export default Services;