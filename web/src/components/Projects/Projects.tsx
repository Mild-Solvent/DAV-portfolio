import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { useTranslation } from '../../contexts/TranslationContext';
import ProjectTabs from './ProjectTabsComponent';

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
const FurballGradient = styled(motion.div) <{ $size: number; $top: string; $left: string; $delay: number }>`
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

  @media (max-width: 768px) {
    padding: 0 18px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${props => props.theme.spacing.xl};
    width: calc(100% - 12px);
    margin: 0 auto;
  }
`;

const ProjectCard = styled(motion.div)`
  width: 100%;
  min-width: 0;
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

const GameCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: ${props => props.theme.spacing['2xl']};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.surfaceLight};
  }
`;

const GameImage = styled.div<{ $backgroundImage?: string }>`
  height: 400px;
  background: ${props => props.$backgroundImage
    ? `url(${props.$backgroundImage}) center/cover no-repeat`
    : `linear-gradient(135deg, ${props.theme.colors.primary}40, ${props.theme.colors.accent}40)`
  };
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const GameContent = styled.div`
  padding: ${props => props.theme.spacing['2xl']};
  text-align: center;
`;

const GameTitle = styled.h3`
  color: ${props => props.theme.colors.textEmphasis};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-family: ${props => props.theme.fonts.display};
  font-weight: 600;
`;

const GameDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.base};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const GameLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;


const Projects: React.FC = () => {
  const { t } = useTranslation();

  // Web development projects data
  const webProjects = [
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

  // Mobile development projects data
  const mobileProjects = [
    {
      title: "M&K Cleaning",
      description: "Cleaning company website with complete booking system and stripe payments",
      liveUrl: "https://mkbratislava.sk",
      image: "/projects/mk-cleaning.png",
      category: "Mobile & Web Platform",
      tags: ["booking system", "payments", "mobile-friendly"]
    },
    {
      title: "TEDxRoatán",
      description: "Independent TEDx Event organized on Island Roatán",
      liveUrl: "https://tedxroatan.com",
      image: "/projects/tedx.png",
      category: "Event Platform",
      tags: ["event management", "responsive design"]
    }
  ];

  // Game development projects data
  const gameProjects = [
    {
      title: t('projects.games.experimentEcho.title'),
      description: t('projects.games.experimentEcho.description'),
      downloadUrl: "https://github.com/Ezra525/Bakalarka_Denny_Ezri_Sofi/releases/tag/v0.0.4-alpha",
      image: "/projects/game-experiment-echo.png",
      category: "Game Development",
      tags: ["Unreal Engine 5", "Adventure", "AI"]
    },
    {
      title: t('projects.games.loadingScreen.title'),
      description: t('projects.games.loadingScreen.description'),
      downloadUrl: null,
      image: "/projects/game-loading-screen.png",
      category: "Game Development",
      tags: ["Godot", "Point & Click", "Adventure"]
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
          title={t('projects.title')}
        />

        <ProjectTabs
          tabs={[
            {
              id: 'web',
              label: t('projects.tabs.web'),
              content: (
                <ProjectsGrid>
                  {webProjects.map((project, index) => (
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
              )
            },
            {
              id: 'mobile',
              label: t('projects.tabs.mobile'),
              content: (
                <ProjectsGrid>
                  {mobileProjects.map((project, index) => (
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
              )
            },
            {
              id: 'games',
              label: t('projects.tabs.games'),
              content: (
                <div>
                  {gameProjects.map((game, index) => (
                    <GameCard
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <GameImage $backgroundImage={game.image} />

                      <GameContent>
                        <GameTitle>{game.title}</GameTitle>
                        <GameDescription>{game.description}</GameDescription>

                        <GameLinks>
                          {game.downloadUrl ? (
                            <ProjectLink href={game.downloadUrl} target="_blank" rel="noopener noreferrer">
                              {t('projects.games.experimentEcho.download')}
                            </ProjectLink>
                          ) : (
                            <ProjectLink as="span" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                              {t('projects.games.loadingScreen.comingSoon')}
                            </ProjectLink>
                          )}
                        </GameLinks>
                      </GameContent>
                    </GameCard>
                  ))}
                </div>
              )
            }
          ]}
          defaultTab="web"
        />
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
