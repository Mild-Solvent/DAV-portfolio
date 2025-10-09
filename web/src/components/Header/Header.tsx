import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderContainerProps {
  isScrolled: boolean;
}

const HeaderContainer = styled(motion.header)<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.navbar};
  background: ${props => props.isScrolled ? 'rgba(13, 17, 23, 0.95)' : 'rgba(13, 17, 23, 0.8)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all 0.2s ease;
  padding: ${props => props.theme.spacing.md} 0;
`;

const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textEmphasis};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
  
  svg {
    fill: currentColor;
  }
`;

interface NavListProps {
  $isOpen: boolean;
}

const NavList = styled.ul<NavListProps>`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.backgroundLight};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    gap: ${props => props.theme.spacing.xs};
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: ${props => props.theme.colors.textEmphasis};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.sm};
  position: relative;
  transition: color 0.2s ease;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    color: ${props => props.theme.colors.textEmphasis};
    background: rgba(255, 255, 255, 0.05);
    text-decoration: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${props => props.theme.colors.textEmphasis};
  font-size: ${props => props.theme.fontSizes.xl};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const GitHubLogo = () => (
  <svg height="32" width="32" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      // Scroll to top for hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        // For other sections, account for the hero offset
        const elementTop = element.offsetTop + window.innerHeight;
        window.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer
      isScrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Nav>
        <Logo onClick={() => scrollToSection('hero')}>
          <GitHubLogo />
          Portfolio
        </Logo>
        
        <NavList $isOpen={isMobileMenuOpen}>
          <NavItem>
            <NavLink onClick={() => scrollToSection('hero')}>{t('nav.home')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('about')}>{t('nav.about')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('projects')}>{t('nav.projects')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('services')}>{t('nav.services')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('skills')}>{t('nav.skills')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('contact')}>{t('nav.contact')}</NavLink>
          </NavItem>
        </NavList>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;