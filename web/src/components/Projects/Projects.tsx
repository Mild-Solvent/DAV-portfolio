import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import SectionHeading from '../shared/SectionHeading';

const ProjectsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05), transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.05), transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(59, 130, 246, 0.3);
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
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-family: ${props => props.theme.fonts.display};
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;


const ProjectLinks = styled.div`
  display: flex;
  justify-content: center;
`;

const ProjectLink = styled.a`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;


const Projects: React.FC = () => {
  const { t } = useLanguage();
  
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

  return (
    <ProjectsSection id="projects">
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