import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const DotsContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    right: 20px;
    gap: 12px;
  }
`;

const DotButton = styled(motion.button)<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.4)'};
  background: ${props => props.$isActive ? '#3B82F6' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: #60A5FA;
    background: ${props => props.$isActive ? '#60A5FA' : 'rgba(96, 165, 250, 0.2)'};
    transform: scale(1.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.1);
    opacity: ${props => props.$isActive ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const Tooltip = styled(motion.div)<{ $show: boolean }>`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.95);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-left-color: rgba(15, 23, 42, 0.95);
  }
`;

const DotWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface Section {
  id: string;
  labelKey: string;
}

const SectionDots: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections: Section[] = [
    { id: 'hero', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'skills', labelKey: 'nav.skills' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'contact', labelKey: 'nav.contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // If we're in the first viewport (hero section)
      if (scrollY < viewportHeight * 0.5) {
        setActiveSection('hero');
        return;
      }
      
      // For other sections, adjust for the hero offset
      const sections = ['about', 'skills', 'services', 'projects', 'contact'];
      const scrollPosition = scrollY - viewportHeight + (viewportHeight / 3);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          // Get the section's position relative to the main container
          const sectionTop = section.offsetTop;
          if (sectionTop <= scrollPosition) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      // Scroll to top for hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        // For other sections, scroll to their position accounting for the hero offset
        const elementTop = element.offsetTop + window.innerHeight;
        window.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <DotsContainer>
      {sections.map((section) => (
        <DotWrapper
          key={section.id}
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Tooltip $show={hoveredSection === section.id}>
            {t(section.labelKey)}
          </Tooltip>
          <DotButton
            $isActive={activeSection === section.id}
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </DotWrapper>
      ))}
    </DotsContainer>
  );
};

export default SectionDots;