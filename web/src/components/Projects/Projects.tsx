import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { useTranslation } from '../../contexts/TranslationContext';

const ProjectsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
`;

const CalculatorButton = styled(motion.div)<{ $progress: number; $visible: boolean }>`
  position: fixed;
  right: 4rem;
  top: ${props => `calc(50% + ${props.$progress}px - 40px)`};
  display: ${props => props.$visible ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;
  cursor: pointer;
  pointer-events: auto;
`;

const CircleButton = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 50%;
  box-shadow: 0 0 20px ${props => props.theme.colors.accent}40;
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    stroke: ${props => props.theme.colors.accent};
    stroke-width: 2.5;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px ${props => props.theme.colors.accent}60;
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const ButtonText = styled.span`
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;
  text-shadow: 0 0 10px ${props => props.theme.colors.accent}40;
`;

// Side glows
const LeftGlow = styled.div`
  position: absolute;
  top: 20%;
  left: -20%;
  width: 40%;
  height: 60%;
  background: radial-gradient(ellipse at center, 
    ${props => props.theme.colors.accent}10 0%, 
    ${props => props.theme.colors.secondary}08 30%, 
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
`;

const RightGlow = styled.div`
  position: absolute;
  top: 20%;
  right: -20%;
  width: 40%;
  height: 60%;
  background: radial-gradient(ellipse at center, 
    ${props => props.theme.colors.accent}10 0%, 
    ${props => props.theme.colors.secondary}08 30%, 
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
`;

// Furball gradients with animations
const FurballGradient = styled(motion.div)<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  top: ${props => props.$top};
  left: ${props => props.$left};
  background: radial-gradient(circle at 30% 30%, 
    ${props => props.theme.colors.accent}20 0%,
    ${props => props.theme.colors.success}15 25%,
    ${props => props.theme.colors.done}10 50%,
    transparent 80%
  );
  border-radius: 50%;
  filter: blur(15px);
  z-index: 0;
`;

const SmallFurball = styled(FurballGradient)`
  background: radial-gradient(circle at 40% 20%, 
    ${props => props.theme.colors.sponsors}25 0%,
    ${props => props.theme.colors.attention}15 35%,
    transparent 70%
  );
  filter: blur(10px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;

  /* Tighter padding on smaller screens so cards sit fully in view */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};

  /* Force a single centered column on mobile */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;

  /* Keep card width reasonable and centered on narrow screens */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 360px;
    width: 100%;
    margin: 0 auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.surfaceLight};
  }
`;

const ProjectImage = styled.div<{ $backgroundImage?: string }>`
  height: 200px;
  background: ${props => props.$backgroundImage 
    ? `url(${props.$backgroundImage}) top/cover no-repeat`
    : `linear-gradient(135deg, ${props.theme.colors.primary}40, ${props.theme.colors.accent}40)`
  };
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.text};
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing['2xl']};
`;

const ProjectTitle = styled.h3`
  color: ${props => props.theme.colors.textEmphasis};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-family: ${props => props.theme.fonts.display};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.sm};
`;


const ProjectLinks = styled.div`
  display: flex;
  justify-content: center;
`;

const ProjectLink = styled.a`
  background: transparent;
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    border-color: ${props => props.theme.colors.surfaceLight};
    text-decoration: none;
  }
`;


const Projects: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInSection, setIsInSection] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Check if section is visible in viewport
      const sectionVisible = rect.top < viewportHeight && rect.bottom > 0;
      setIsInSection(sectionVisible);
      
      // Calculate scroll progress within the section (moves down in pixels)
      // The button can move down as the user scrolls through the section
      const scrollableHeight = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const maxMovement = 200; // Maximum pixels the button can move down
      const progress = Math.max(0, Math.min(maxMovement, (scrolled / scrollableHeight) * maxMovement));
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCalculatorClick = () => {
    // Navigate to calculator page
    const currentLang = window.location.pathname.split('/')[1] || 'en';
    window.location.href = `/${currentLang}/calculator`;
  };
  
  // Real projects data with SEO-optimized categories
  const projects = [
    {
      title: "Softwareshop",
      description: "E-commerce store - Professional software and courses for designers and architects",
      liveUrl: "https://www.softwareshop.sk/",
      image: "/projects/softwareshop.png",
      category: "E-commerce",
      tags: ["online store", "e-shop", "WordPress", "digital products"]
    },
    {
      title: "CEA Europe.sk",
      description: "Corporate website - Advertising and event agency, complete services and products in all areas of advertising",
      liveUrl: "https://www.ceaeurope.sk/",
      image: "/projects/ceaeurope.png",
      category: "Corporate Website",
      tags: ["business site", "portfolio", "services platform"]
    },
    {
      title: "3D Software",
      description: "E-commerce platform - Professional 3D software solutions and services",
      liveUrl: "https://www.3dsoftware.sk/",
      image: "/projects/3dsoftware.png",
      category: "E-commerce",
      tags: ["online shop", "software store", "e-commerce"]
    },
    {
      title: "ALLA.SK",
      description: "Portfolio website - Design and realization of dream projects",
      liveUrl: "https://www.alla.sk/",
      image: "/projects/alla-sk.png",
      category: "Portfolio",
      tags: ["portfolio", "showcase", "design services"]
    },
    {
      title: "ACTIVITY DW Club",
      description: "Web platform - Discover amazing routes, activities and trips for everyone",
      liveUrl: "https://aktivity.ceaeurope.sk/",
      image: "/projects/aktivity-ceaeurope.png",
      category: "Web Platform",
      tags: ["web app", "community platform", "activities"]
    },
    {
      title: "Software Point CZ",
      description: "E-shop - Professional software and 3D modeling courses",
      liveUrl: "https://www.softwarepoint.cz/",
      image: "/projects/softwarepoint.png",
      category: "E-commerce",
      tags: ["e-commerce", "online store", "digital products"]
    },
    {
      title: "3D Tlaciaren",
      description: "E-commerce store - Professional 3D printing services and solutions",
      liveUrl: "https://www.3dtlaciaren.sk/",
      image: "/projects/3dtlaciaren.png",
      category: "E-commerce",
      tags: ["online shop", "e-shop", "3D printing"]
    },
    {
      title: "Morpheus",
      description: "SaaS application - Advanced web application with modern design and functionality",
      liveUrl: "https://mild-solvent.github.io/Morpheus/",
      image: "/projects/morpherus.png",
      category: "SaaS",
      tags: ["web app", "SaaS platform", "React application"]
    }
  ];

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -5, 0],
      rotate: [0, 5, -3, 0],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
    }
  };

  const slowFloatingAnimation = {
    animate: {
      y: [0, -15, 0],
      x: [0, -8, 12, 0],
      rotate: [0, -3, 2, 0],
    },
    transition: {
      duration: 12,
      repeat: Infinity,
    }
  };

  return (
    <ProjectsSection 
      id="projects" 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Calculator button */}
      <CalculatorButton
        $progress={scrollProgress}
        $visible={isInSection && isHovered}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: (isInSection && isHovered) ? 1 : 0,
          x: (isInSection && isHovered) ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        onClick={handleCalculatorClick}
      >
        <CircleButton>
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </CircleButton>
        <ButtonText>Calculate price</ButtonText>
      </CalculatorButton>
      
      {/* Side glows */}
      <LeftGlow />
      <RightGlow />
      
      {/* Floating furball gradients */}
      <FurballGradient 
        $size={120} 
        $top="15%" 
        $left="10%" 
        $delay={0}
        {...floatingAnimation}
      />
      
      <SmallFurball 
        $size={80} 
        $top="70%" 
        $left="85%" 
        $delay={2}
        {...slowFloatingAnimation}
      />
      
      <FurballGradient 
        $size={100} 
        $top="45%" 
        $left="5%" 
        $delay={4}
        animate={{
          y: [0, 25, -10, 0],
          x: [0, -5, 8, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
      
      <SmallFurball 
        $size={60} 
        $top="25%" 
        $left="90%" 
        $delay={6}
        animate={{
          y: [0, -18, 12, 0],
          x: [0, 6, -10, 0],
          rotate: [0, 8, -5, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
      />
      
      <Container>
        <SectionHeading
          title={t('projects.title')}
        />

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectImage $backgroundImage={project.image} />
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectLinks>
                  <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {t('projects.visitWebsite')}
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;