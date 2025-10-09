import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import SectionHeading from '../shared/SectionHeading';

const SkillsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
  
  /* GitHub-style gradient glow - purple/blue theme */
  &::before {
    content: '';
    position: absolute;
    width: 900px;
    height: 900px;
    top: 50%;
    left: -200px;
    transform: translateY(-50%);
    background: radial-gradient(
      circle,
      rgba(165, 113, 247, 0.15) 0%,
      rgba(139, 92, 246, 0.1) 30%,
      transparent 70%
    );
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 700px;
    height: 700px;
    bottom: 10%;
    right: -150px;
    background: radial-gradient(
      circle,
      rgba(219, 168, 255, 0.12) 0%,
      rgba(165, 113, 247, 0.08) 40%,
      transparent 70%
    );
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['4xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing['2xl']};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Gradient border glow effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(165, 113, 247, 0.4),
      rgba(88, 166, 255, 0.3)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.surfaceLight};
    
    &::before {
      opacity: 1;
    }
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.gradients.primary};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const TechTag = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
  }
`;

const ProgressSection = styled.div`
  margin-top: ${props => props.theme.spacing['3xl']};
`;

const ProgressItem = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProgressLabel = styled.span`
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

const ProgressValue = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)<{ $value: number }>`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 4px;
  position: relative;
`;

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      // Progress bar animation
      const skills = {
        'React & TypeScript': 95,
        'Node.js & Express': 88,
        'CSS/SCSS & Design': 92,
        'Database Design': 85,
        'DevOps & Cloud': 75,
        'Mobile Development': 70
      };
      
      Object.entries(skills).forEach(([skill, value], index) => {
        setTimeout(() => {
          setProgressValues(prev => ({ ...prev, [skill]: value }));
        }, index * 200);
      });
    }
  }, [controls, inView]);
  
  const skillCategories = [
    {
      icon: '⚛️',
      title: t('skills.frontend'),
      techs: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Styled Components', 'Framer Motion']
    },
    {
      icon: '🚀',
      title: t('skills.backend'),
      techs: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs']
    },
    {
      icon: '☁️',
      title: t('skills.devops'),
      techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Vercel', 'Heroku']
    },
    {
      icon: '🎨',
      title: t('skills.design'),
      techs: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX Design', 'Responsive Design', 'Accessibility']
    }
  ];
  
  const progressSkills = [
    { name: 'React & TypeScript', value: 95 },
    { name: 'Node.js & Express', value: 88 },
    { name: 'CSS/SCSS & Design', value: 92 },
    { name: 'Database Design', value: 85 },
    { name: 'DevOps & Cloud', value: 75 },
    { name: 'Mobile Development', value: 70 }
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
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };
  
  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeading
          title={t('skills.title')}
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SkillsGrid>
            {skillCategories.map((category, index) => (
              <SkillCard key={index} variants={cardVariants}>
                <CardIcon>{category.icon}</CardIcon>
                <CardTitle>{category.title}</CardTitle>
                <TechList>
                  {category.techs.map((tech, techIndex) => (
                    <TechTag key={techIndex}>
                      {tech}
                    </TechTag>
                  ))}
                </TechList>
              </SkillCard>
            ))}
          </SkillsGrid>
        </motion.div>
        
        <ProgressSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } }
            }}
          >
            {progressSkills.map((skill, index) => (
              <ProgressItem
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: 0.6, delay: 0.7 + index * 0.1 } 
                  }
                }}
              >
                <ProgressHeader>
                  <ProgressLabel>{skill.name}</ProgressLabel>
                  <ProgressValue>{progressValues[skill.name] || 0}%</ProgressValue>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill
                    $value={skill.value}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${progressValues[skill.name] || 0}%`,
                      transition: { duration: 1.5, ease: "easeOut" }
                    }}
                  />
                </ProgressBar>
              </ProgressItem>
            ))}
          </motion.div>
        </ProgressSection>
      </Container>
    </SkillsSection>
  );
};

export default Skills;