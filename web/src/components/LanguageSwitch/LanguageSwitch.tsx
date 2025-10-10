"use client";
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, SUPPORTED_LANGUAGES, Language } from '../../contexts/TranslationContext';

interface LanguageSwitchContainerProps {
  $isOpen: boolean;
}

const LanguageSwitchContainer = styled.div<LanguageSwitchContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
`;

const LanguageButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${props => props.theme.colors.textEmphasis};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  min-width: 100px;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(88, 166, 255, 0.3);
    transform: translateY(-1px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.15),
      0 2px 8px rgba(88, 166, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    min-width: 80px;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  }
`;

const FlagIcon = styled.span`
  font-size: 1.2em;
  line-height: 1;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;

const LanguageName = styled.span`
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const ChevronIcon = styled(motion.span)`
  font-size: 0.8em;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + ${props => props.theme.spacing.sm});
  right: 0;
  background: rgba(22, 27, 34, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.sm};
  min-width: 160px;
  z-index: ${props => props.theme.zIndex.dropdown};
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    left: 0;
    right: auto;
  }
`;

const DropdownItem = styled(motion.button)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: ${props => props.$isActive 
    ? 'rgba(88, 166, 255, 0.15)' 
    : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${props => props.$isActive 
    ? props.theme.colors.textEmphasis 
    : props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: ${props => props.$isActive 
      ? 'rgba(88, 166, 255, 0.2)' 
      : 'rgba(255, 255, 255, 0.08)'};
    color: ${props => props.theme.colors.textEmphasis};
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(0);
    background: ${props => props.$isActive 
      ? 'rgba(88, 166, 255, 0.25)' 
      : 'rgba(255, 255, 255, 0.12)'};
  }
`;

const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    'us': '🇺🇸',
    'sk': '🇸🇰',
  };
  return flags[countryCode] || '🏳️';
};

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.05,
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const
      }
    })
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <LanguageSwitchContainer ref={containerRef} $isOpen={isOpen}>
      <LanguageButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('language.select')}
      >
        <FlagIcon>{getCountryFlag(currentLanguage?.flag || 'us')}</FlagIcon>
        <LanguageName>{currentLanguage?.name}</LanguageName>
        <ChevronIcon
          variants={chevronVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
        >
          ▼
        </ChevronIcon>
      </LanguageButton>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {SUPPORTED_LANGUAGES.map((lang, index) => (
              <DropdownItem
                key={lang.code}
                $isActive={lang.code === language}
                onClick={() => handleLanguageChange(lang.code)}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlagIcon>{getCountryFlag(lang.flag)}</FlagIcon>
                {lang.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </LanguageSwitchContainer>
  );
};

export default LanguageSwitch;