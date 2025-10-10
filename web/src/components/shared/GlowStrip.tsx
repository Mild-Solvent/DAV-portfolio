import React from 'react';
import styled from 'styled-components';

const GlowStripWrapper = styled.div`
  width: 200px;
  height: 4px;
  margin: ${props => props.theme.spacing.xl} auto ${props => props.theme.spacing['2xl']} auto;
  background: linear-gradient(90deg, 
    #d2a8ff 0%, 
    #a371f7 20%, 
    #196c2e 40%, 
    #2ea043 60%, 
    #56d364 80%, 
    #b4f1b4 100%
  );
  border-radius: ${props => props.theme.borderRadius.full};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: inherit;
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 80px;
    background: linear-gradient(180deg,
      rgba(210, 168, 255, 0.15) 0%,
      rgba(163, 113, 247, 0.12) 20%,
      rgba(25, 108, 46, 0.1) 40%,
      rgba(46, 160, 67, 0.08) 60%,
      rgba(86, 211, 100, 0.05) 80%,
      transparent 100%
    );
    clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
    pointer-events: none;
    z-index: -2;
  }
`;

interface GlowStripProps {
  className?: string;
}

const GlowStrip: React.FC<GlowStripProps> = ({ className }) => {
  return <GlowStripWrapper className={className} />;
};

export default GlowStrip;