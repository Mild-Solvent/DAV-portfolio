import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
  variant?: 'gradient' | 'solid' | 'outlined';
  className?: string;
  showUnderline?: boolean;
  animationDelay?: number;
}

const HeadingContainer = styled(motion.div)<{ $align: string }>`
  text-align: ${props => props.$align};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  position: relative;
  z-index: 10;
`;

const MainTitle = styled(motion.h2)<{ 
  size: string; 
  variant: string; 
  showUnderline: boolean; 
}>`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: ${props => props.showUnderline ? props.theme.spacing.lg : props.theme.spacing.md};
  position: relative;
  
  /* Size variants */
  font-size: ${props => {
    switch (props.size) {
      case 'small': return 'clamp(1.5rem, 3vw, 2rem)';
      case 'large': return 'clamp(3rem, 6vw, 4.5rem)';
      default: return 'clamp(2rem, 4.5vw, 3.5rem)';
    }
  }};
  
  /* Style variants */
  ${props => {
    switch (props.variant) {
      case 'gradient':
        return `
          background: linear-gradient(
            135deg, 
            #ffffff 0%, 
            #60a5fa 20%, 
            #a855f7 40%, 
            #ec4899 60%, 
            #f59e0b 80%, 
            #10b981 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
        `;
      case 'outlined':
        return `
          color: transparent;
          -webkit-text-stroke: 2px ${props.theme.colors.text};
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
          
          &:hover {
            -webkit-text-stroke: 2px #60a5fa;
            filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.5));
          }
        `;
      default:
        return `
          color: ${props.theme.colors.text};
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        `;
    }
  }}
`;

const Subtitle = styled(motion.p)<{ $align: string }>`
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  max-width: ${props => props.$align === 'center' ? '600px' : '100%'};
  ${props => props.$align === 'center' && 'margin-left: auto; margin-right: auto;'}
  font-weight: 400;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

const Underline = styled(motion.div)<{ $align: string }>`
  height: 4px;
  width: 80px;
  background: linear-gradient(
    90deg,
    #60a5fa 0%,
    #a855f7 50%,
    #ec4899 100%
  );
  border-radius: 2px;
  margin: ${props => props.theme.spacing.lg} ${props => {
    switch (props.$align) {
      case 'left': return '0 auto 0 0';
      case 'right': return '0 0 auto auto';
      default: return '0 auto';
    }
  }};
  box-shadow: 0 2px 10px rgba(96, 165, 250, 0.3);
`;

const DecorativeElements = styled.div<{ $align: string }>`
  position: absolute;
  ${props => {
    switch (props.$align) {
      case 'left': return 'left: -60px; top: 50%;';
      case 'right': return 'right: -60px; top: 50%;';
      default: return 'left: 50%; top: -40px;';
    }
  }}
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, #60a5fa, #a855f7);
    border-radius: 50%;
  }
  
  &::before {
    top: 0;
    left: 0;
  }
  
  &::after {
    bottom: 0;
    right: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  size = 'medium',
  align = 'center',
  variant = 'gradient',
  className,
  showUnderline = true,
  animationDelay = 0
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: animationDelay,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: animationDelay + 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: animationDelay + 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 80,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: animationDelay + 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  return (
    <HeadingContainer
      className={className}
      $align={align}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <DecorativeElements $align={align} />
      
      <MainTitle
        size={size}
        variant={variant}
        showUnderline={showUnderline}
        variants={titleVariants}
      >
        {title}
      </MainTitle>
      
      {showUnderline && (
        <Underline
          $align={align}
          variants={underlineVariants}
        />
      )}
      
      {subtitle && (
        <Subtitle
          $align={align}
          variants={subtitleVariants}
        >
          {subtitle}
        </Subtitle>
      )}
    </HeadingContainer>
  );
};

export default SectionHeading;