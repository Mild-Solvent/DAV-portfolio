import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage, type Language } from '../../contexts/LanguageContext';

const SwitchContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'};
  border: none;
  color: ${props => props.$isActive ? '#ffffff' : '#94a3b8'};
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  
  &:hover {
    color: #ffffff;
  }
`;

const Flag = styled.img`
  width: 20px;
  height: 15px;
  margin-right: 6px;
  border-radius: 2px;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  /* Fallback for broken images */
  &::before {
    content: attr(alt);
    position: absolute;
    font-size: 10px;
    color: #94a3b8;
  }
`;

const languages = [
  { 
    code: 'sk' as Language, 
    label: 'SK', 
    flag: 'https://flagcdn.com/w40/sk.png',
    alt: 'Slovak flag'
  },
  { 
    code: 'en' as Language, 
    label: 'EN', 
    flag: 'https://flagcdn.com/w40/us.png',
    alt: 'US flag'
  }
];

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <SwitchContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          $isActive={language === lang.code}
          onClick={() => setLanguage(lang.code)}
        >
          <Flag src={lang.flag} alt={lang.alt} />
          {lang.label}
        </LanguageButton>
      ))}
    </SwitchContainer>
  );
};