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
  background: ${props => props.isScrolled ? 'rgba(10, 15, 30, 0.98)' : 'rgba(10, 15, 30, 0.1)'};
  backdrop-filter: blur(${props => props.isScrolled ? '25px' : '15px'});
  border-bottom: ${props => props.isScrolled ? '1px solid rgba(59, 130, 246, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)'};
  box-shadow: ${props => props.isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.12)' : 'none'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: ${props => props.isScrolled ? '0.8rem 0' : '1.2rem 0'};
`;

const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.02em;
  position: relative;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  span {
    background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3B82F6, #06B6D4);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

interface NavListProps {
  $isOpen: boolean;
}

const NavList = styled.ul<NavListProps>`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing['2xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 15, 30, 0.98);
    backdrop-filter: blur(25px);
    flex-direction: column;
    padding: ${props => props.theme.spacing.xl};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
    gap: ${props => props.theme.spacing.lg};
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  letter-spacing: 0.01em;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-transform: capitalize;

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1));
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3B82F6, #06B6D4);
    transition: width 0.3s ease;
    border-radius: 1px;
  }

  &:hover::after {
    width: 80%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(59, 130, 246, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-size: 1.2rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
    transform: translateY(-1px);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
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
          DAV<span>DEV</span>
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