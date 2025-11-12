'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext';
import { SectionHeading } from '../shared';

const CalculatorSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
  min-height: auto;
`;

// Side glows similar to Projects section
const LeftGlow = styled.div`
  position: absolute;
  top: 20%;
  left: -15%;
  width: 35%;
  height: 60%;
  background: radial-gradient(ellipse at center, 
    ${props => props.theme.colors.accent}10 0%, 
    rgba(0, 255, 136, 0.05) 30%, 
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
`;

const RightGlow = styled.div`
  position: absolute;
  bottom: 10%;
  right: -15%;
  width: 35%;
  height: 60%;
  background: radial-gradient(ellipse at center, 
    rgba(64, 224, 255, 0.08) 0%, 
    ${props => props.theme.colors.accent}05 30%, 
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const CalculatorCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing['2xl']};
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.xl};
  }
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textEmphasis};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.fonts.display};
`;

const ProjectTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectTypeCard = styled.button<{ $selected: boolean }>`
  background: ${props => props.$selected 
    ? `${props.theme.colors.accent}15` 
    : 'transparent'};
  border: 1px solid ${props => props.$selected 
    ? props.theme.colors.accent 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, ${props => props.theme.colors.accent}15, transparent 70%);
    opacity: ${props => props.$selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 4px 12px ${props => props.theme.colors.accent}20;
    
    &::before {
      opacity: 0.5;
    }
  }
`;


const ProjectTypeName = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 1;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.accent}08;
    transform: translateY(-1px);
  }
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${props => props.theme.colors.accent};
  }
  
  span {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const CustomFeaturesWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${props => props.theme.spacing.lg};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    outline: none;
    box-shadow: 0 0 0 1px ${props => props.theme.colors.accent}30;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PriceSection = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing['2xl']};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, ${props => props.theme.colors.accent}10, transparent 70%);
    opacity: 0.5;
  }
`;

const PriceLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const Price = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.display};
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 1;
  text-shadow: 0 0 20px ${props => props.theme.colors.accent}30;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const ContactButton = styled.button`
  background: ${props => props.theme.colors.textEmphasis};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    background: ${props => props.theme.colors.text};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Note = styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.md};
  font-style: italic;
`;

type ProjectType = 'wordpress' | 'nextjs' | 'vue' | 'saas' | 'mobile' | 'custom' | null;

interface ProjectFeatures {
  [key: string]: string[];
}

const Calculator: React.FC = () => {
  const { t, isLoading } = useTranslation();
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeatures, setCustomFeatures] = useState('');

  const projectTypes = [
    { id: 'wordpress', name: t('calculator.wordpress') },
    { id: 'nextjs', name: t('calculator.nextjs') },
    { id: 'vue', name: t('calculator.vue') },
    { id: 'saas', name: t('calculator.saas') },
    { id: 'mobile', name: t('calculator.mobile') },
    { id: 'custom', name: t('calculator.custom') },
  ];

  const projectFeatures: ProjectFeatures = {
    wordpress: ['cms', 'responsive', 'seo', 'ecommerce'],
    nextjs: ['api', 'database', 'auth', 'seo'],
    vue: ['api', 'database', 'auth', 'responsive'],
    saas: ['auth', 'payment', 'api', 'database'],
    mobile: ['auth', 'api', 'analytics', 'payment'],
    custom: ['api', 'database', 'auth', 'hosting'],
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const getAvailableFeatures = () => {
    if (!projectType) return [];
    return projectFeatures[projectType] || [];
  };

  const getPriceRange = () => {
    switch (projectType) {
      case 'wordpress': return '€500 - €1,500';
      case 'nextjs': return '€1,500 - €3,000';
      case 'vue': return '€1,500 - €3,000';
      case 'saas': return '€25,000 - €50,000';
      case 'mobile': return '€25,000 - €50,000';
      case 'custom': return null;
      default: return null;
    }
  };

  const handleContactClick = () => {
    const currentLang = window.location.pathname.split('/')[1] || 'en';
    window.location.href = `/${currentLang}#contact`;
  };

  if (isLoading) {
    return (
      <CalculatorSection>
        <BackgroundGlow />
        <Container>
          <Header>
            <Title>Loading...</Title>
          </Header>
        </Container>
      </CalculatorSection>
    );
  }

  return (
    <CalculatorSection>
      <LeftGlow />
      <RightGlow />
      <Container>
        <Header>
          <SectionHeading
            title={t('calculator.title')}
            subtitle={t('calculator.subtitle')}
          />
        </Header>

        <CalculatorCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Section>
            <SectionTitle>{t('calculator.projectType')}</SectionTitle>
            <ProjectTypeGrid>
              {projectTypes.map(type => (
                <ProjectTypeCard
                  key={type.id}
                  $selected={projectType === type.id}
                  onClick={() => setProjectType(type.id as ProjectType)}
                >
                  <ProjectTypeName>{type.name}</ProjectTypeName>
                </ProjectTypeCard>
              ))}
            </ProjectTypeGrid>
          </Section>

          {projectType && (
            <>
              <Section>
                <SectionTitle>{t('calculator.features')}</SectionTitle>
                <FeaturesGrid>
                  {getAvailableFeatures().map(feature => (
                    <FeatureCheckbox key={feature}>
                      <input
                        type="checkbox"
                        checked={features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                      />
                      <span>{t(`calculator.${feature}`)}</span>
                    </FeatureCheckbox>
                  ))}
                </FeaturesGrid>
                <CustomFeaturesWrapper>
                  <Label>{t('calculator.additionalFeatures')}</Label>
                  <TextArea
                    value={customFeatures}
                    onChange={(e) => setCustomFeatures(e.target.value)}
                    placeholder={t('calculator.additionalFeaturesPlaceholder')}
                  />
                </CustomFeaturesWrapper>
              </Section>

              <PriceSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {getPriceRange() ? (
                  <>
                    <PriceLabel>{t('calculator.priceRange')}</PriceLabel>
                    <Price>{getPriceRange()}</Price>
                  </>
                ) : (
                  <PriceLabel>{t('calculator.customPricing')}</PriceLabel>
                )}
                <ContactButton onClick={handleContactClick}>
                  {t('calculator.contactUs')}
                </ContactButton>
              </PriceSection>
            </>
          )}
        </CalculatorCard>
      </Container>
    </CalculatorSection>
  );
};

export default Calculator;
