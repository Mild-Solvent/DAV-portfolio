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
  background: ${props => props.isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.isScrolled ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  span {
    background: ${props => props.theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

interface NavListProps {
  $isOpen: boolean;
}

const NavList = styled.ul<NavListProps>`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.backgroundLight};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.xl};
  padding: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

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
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo onClick={() => scrollToSection('hero')}>
          Port<span>folio</span>
        </Logo>
        
        <NavList $isOpen={isMobileMenuOpen}>
          <NavItem>
            <NavLink onClick={() => scrollToSection('hero')}>{t('nav.home')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('about')}>{t('nav.about')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('skills')}>{t('nav.skills')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('services')}>{t('nav.services')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('projects')}>{t('nav.projects')}</NavLink>
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