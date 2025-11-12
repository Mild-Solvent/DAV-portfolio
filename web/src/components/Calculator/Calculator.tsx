'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext';

const CalculatorSection = styled.section`
  min-height: 100vh;
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 60%;
  background: radial-gradient(ellipse at center, 
    ${props => props.theme.colors.accent}08 0%, 
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  color: ${props => props.theme.colors.textEmphasis};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const CalculatorCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['3xl']};
  box-shadow: ${props => props.theme.shadows.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['2xl']};
  }
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing['3xl']};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textEmphasis};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProjectTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const ProjectTypeCard = styled.button<{ $selected: boolean }>`
  background: ${props => props.$selected 
    ? `${props.theme.colors.accent}20` 
    : props.theme.colors.primary};
  border: 2px solid ${props => props.$selected 
    ? props.theme.colors.accent 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 4px 12px ${props => props.theme.colors.accent}30;
  }
`;

const ProjectTypeIcon = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProjectTypeName = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const FeatureCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.accent}10;
  }
  
  input {
    width: 20px;
    height: 20px;
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
  min-height: 100px;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    border-color: ${props => props.theme.colors.accent};
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PriceSection = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['2xl']};
  background: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const PriceLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Price = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.display};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const ContactButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: #000;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing['2xl']};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${props => props.theme.spacing.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.colors.accent}40;
  }
`;

const Note = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.lg};
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
    { id: 'wordpress', icon: '📝', name: t('calculator.wordpress') },
    { id: 'nextjs', icon: '⚡', name: t('calculator.nextjs') },
    { id: 'vue', icon: '💚', name: t('calculator.vue') },
    { id: 'saas', icon: '☁️', name: t('calculator.saas') },
    { id: 'mobile', icon: '📱', name: t('calculator.mobile') },
    { id: 'custom', icon: '🛠️', name: t('calculator.custom') },
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
      <BackgroundGlow />
      <Container>
        <Header>
          <Title>{t('calculator.title')}</Title>
          <Subtitle>{t('calculator.subtitle')}</Subtitle>
          <Description>{t('calculator.description')}</Description>
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
                  <ProjectTypeIcon>{type.icon}</ProjectTypeIcon>
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

              <PriceSection>
                <PriceLabel>{t('calculator.priceRange')}</PriceLabel>
                <Price>€25,000 - €50,000</Price>
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
