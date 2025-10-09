import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderContainerProps {
  isScrolled: boolean;
}

const HeaderContainer = styled(motion.header)<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.navbar};
  background: ${props => props.isScrolled ? 'rgba(13, 17, 23, 0.98)' : 'rgba(13, 17, 23, 0.85)'};
  backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.theme.spacing.lg} 0;
  
  /* Modern glass-morphism effect */
  box-shadow: ${props => props.isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none'};
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing['2xl']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.xl};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(88, 166, 255, 0.2);
  }
`;

const LogoImage = styled(Image)`
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const LogoText = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 700;
  background: ${props => props.theme.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

interface NavListProps {
  $isOpen: boolean;
}

const NavList = styled.ul<NavListProps>`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  flex: 1;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    background: rgba(22, 27, 34, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: ${props => props.theme.spacing['2xl']};
    border-radius: ${props => props.theme.borderRadius.xl};
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    gap: ${props => props.theme.spacing.md};
    margin-top: ${props => props.theme.spacing.md};
    border: 1px solid rgba(48, 54, 61, 0.5);
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.base};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  letter-spacing: 0.01em;

  &:hover {
    color: ${props => props.theme.colors.textEmphasis};
    background: rgba(88, 166, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(88, 166, 255, 0.15);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${props => props.theme.gradients.blue};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
    border-radius: ${props => props.theme.borderRadius.full};
  }
  
  &:hover::after {
    width: 80%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg};
    width: 100%;
    text-align: center;
    
    &::after {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: 2px solid transparent;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['2xl']};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    background: rgba(88, 166, 255, 0.1);
    border-color: rgba(88, 166, 255, 0.3);
    color: ${props => props.theme.colors.textEmphasis};
    transform: scale(1.05);
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
          <LogoImage 
            src="/logo/logo.png" 
            alt="Portfolio Logo" 
            width={40} 
            height={40}
            priority
          />
          <LogoText>Portfolio</LogoText>
        </Logo>
        
        <NavList $isOpen={isMobileMenuOpen}>
          <NavItem>
            <NavLink onClick={() => scrollToSection('hero')}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('services')}>Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('skills')}>Skills</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
          </NavItem>
        </NavList>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '×' : '☰'}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;