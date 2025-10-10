import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';

const ProjectsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
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
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.surfaceLight};
  }
`;

const ProjectImage = styled.div<{ $backgroundImage?: string }>`
  height: 200px;
  background: ${props => props.$backgroundImage 
    ? `url(${props.$backgroundImage}) center/cover no-repeat`
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
  
  // Real projects data
  const projects = [
    {
      title: "Softwareshop",
      description: "Profesionálny softvér a kurzy pre dizajnérov a architektov",
      liveUrl: "https://www.softwareshop.sk/",
      image: "/projects/softwareshop.png"
    },
    {
      title: "CEA Europe.sk",
      description: "Reklamná a eventová agentúra - kompletná realizácia služieb a produktov vo všetkých oblastiach reklamy",
      liveUrl: "https://www.ceaeurope.sk/",
      image: "/projects/ceaeurope.png"
    },
    {
      title: "3D Software",
      description: "Profesionálne 3D softvérové riešenia a služby",
      liveUrl: "https://www.3dsoftware.sk/",
      image: "/projects/3dsoftware.png"
    },
    {
      title: "ALLA.SK",
      description: "Navrhneme a zrealizujeme váš vysnívaný projekt",
      liveUrl: "https://www.alla.sk/",
      image: "/projects/alla-sk.png"
    },
    {
      title: "ACTIVITY DW Club",
      description: "Objavte úžasné trasy - aktivity a výlety pre všetkých",
      liveUrl: "https://aktivity.ceaeurope.sk/",
      image: "/projects/aktivity-ceaeurope.png"
    },
    {
      title: "Software Point CZ",
      description: "Profesionální software a kurzy 3D modelování",
      liveUrl: "https://www.softwarepoint.cz/",
      image: "/projects/softwarepoint.png"
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
    <ProjectsSection id="projects">
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
          title="My Projects"
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
                    Visit website
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