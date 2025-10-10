"use client";
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/portfolio-content';
import SectionHeading from '../shared/SectionHeading';

const SkillsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const SkillsContainer = styled(motion.div)`
  position: relative;
  margin-top: ${props => props.theme.spacing['2xl']};
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(135deg, #2ea043 0%, #56d364 25%, #58a6ff 50%, #7c3aed 75%, #a855f7 100%);
    border-radius: ${props => props.theme.borderRadius.xl};
    opacity: 0.9;
    filter: blur(25px);
    z-index: -2;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(225deg, #3fb950 0%, #1f6feb 30%, #6366f1 60%, #8b5cf6 100%);
    border-radius: ${props => props.theme.borderRadius.xl};
    opacity: 0.7;
    filter: blur(15px);
    z-index: -2;
    pointer-events: none;
  }
`;

const SkillsWrapper = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border: 2px solid rgba(240, 255, 240, 0.95);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.theme.shadows.xl};
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    border-color: rgba(220, 240, 255, 0.98);
    transform: translateY(-2px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.xl};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const SkillCard = styled(motion.div)`
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SkillIcon = styled.div`
  font-size: ${props => props.theme.fontSizes['2xl']};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SkillTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textEmphasis};
  margin: 0;
  font-family: ${props => props.theme.fonts.display};
`;

const SkillTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const TechnologyTag = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  border: 1px solid ${props => props.theme.colors.borderMuted};
  transition: all 0.2s ease;
  cursor: default;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.textEmphasis};
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.accent};
  }
`;


const Skills: React.FC = () => {
  const skillsArray = Object.values(portfolioContent.skills);
  
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
        duration: 0.6
      }
    }
  };
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <SkillsSection id="skills">
      <Container>
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools we work with to build modern, scalable applications"
          size="medium"
          align="center"
          animationDelay={0.1}
        />
        
        <SkillsContainer
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <SkillsWrapper>
            <SkillsGrid>
              {skillsArray.map((skillCategory, index) => (
                <SkillCard key={index} variants={cardVariants}>
                  <SkillHeader>
                    <SkillIcon>{skillCategory.icon}</SkillIcon>
                    <SkillTitle>{skillCategory.title}</SkillTitle>
                  </SkillHeader>
                  
                  <SkillTechnologies>
                    {skillCategory.technologies.map((tech, techIndex) => (
                      <TechnologyTag
                        key={techIndex}
                        variants={tagVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </TechnologyTag>
                    ))}
                  </SkillTechnologies>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsWrapper>
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills;