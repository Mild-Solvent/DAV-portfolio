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
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: ${props => props.showUnderline ? props.theme.spacing.md : props.theme.spacing.sm};
  position: relative;
  color: ${props => props.theme.colors.textEmphasis};
  
  /* Size variants */
  font-size: ${props => {
    switch (props.size) {
      case 'small': return 'clamp(1.5rem, 3vw, 2rem)';
      case 'large': return 'clamp(2.5rem, 5vw, 3.5rem)';
      default: return 'clamp(2rem, 4vw, 3rem)';
    }
  }};
`;

const Subtitle = styled(motion.p)<{ $align: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  max-width: ${props => props.$align === 'center' ? '700px' : '100%'};
  ${props => props.$align === 'center' && 'margin-left: auto; margin-right: auto;'}
  font-weight: 400;
`;

const Underline = styled(motion.div)<{ $align: string }>`
  height: 2px;
  width: 60px;
  background: ${props => props.theme.colors.accent};
  border-radius: 2px;
  margin: ${props => props.theme.spacing.md} ${props => {
    switch (props.$align) {
      case 'left': return '0 auto 0 0';
      case 'right': return '0 0 auto auto';
      default: return '0 auto';
    }
  }};
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