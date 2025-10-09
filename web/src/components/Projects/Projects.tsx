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

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}40, ${props => props.theme.colors.accent}40);
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

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
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

const SecondaryLink = styled.a`
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  backdrop-filter: blur(10px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    border-radius: 10px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Projects: React.FC = () => {
  const { t } = useLanguage();
  
  // Hardcoded projects data
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce platform with advanced features like order management, payments and inventory management.",
      tech: ["React", "Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "https://your-ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      icon: "🛒"
    },
    {
      title: "Dashboard Analytics",
      description: "Interactive dashboard for data analysis with real-time charts and reports for business intelligence.",
      tech: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "https://your-dashboard-demo.com",
      githubUrl: "https://github.com/yourusername/dashboard-analytics",
      icon: "📊"
    },
    {
      title: "Social Media App",
      description: "Social network with content sharing, comments and real-time chat between users.",
      tech: ["React Native", "Firebase", "Redux", "GraphQL"],
      liveUrl: "https://your-social-app-demo.com",
      githubUrl: "https://github.com/yourusername/social-media-app",
      icon: "📱"
    },
    {
      title: "Portfolio Website",
      description: "Beautiful portfolio websites for creative professionals with animations and modern design.",
      tech: ["React", "Styled Components", "Framer Motion", "Gatsby"],
      liveUrl: "https://your-portfolio-demo.com",
      githubUrl: "https://github.com/yourusername/portfolio-website",
      icon: "🎨"
    },
    {
      title: "Task Management Tool",
      description: "Comprehensive tool for project and task management with real-time collaboration capabilities.",
      tech: ["Vue.js", "Express", "MySQL", "WebSocket"],
      liveUrl: "https://your-task-manager-demo.com",
      githubUrl: "https://github.com/yourusername/task-management-tool",
      icon: "✅"
    },
    {
      title: "Weather App",
      description: "Elegant weather application with weather forecast, maps and personalized notifications.",
      tech: ["React", "OpenWeather API", "PWA", "Chart.js"],
      liveUrl: "https://your-weather-app-demo.com",
      githubUrl: "https://github.com/yourusername/weather-app",
      icon: "🌤️"
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
              <ProjectImage>
                {project.icon}
              </ProjectImage>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechStack>
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
                
                <ProjectLinks>
                  <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Demo
                  </ProjectLink>
                  <SecondaryLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </SecondaryLink>
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