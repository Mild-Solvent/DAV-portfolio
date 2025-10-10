import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlowStripWrapper = styled(motion.div)`
  width: 200px;
  height: 4px;
  margin: ${props => props.theme.spacing.xl} auto ${props => props.theme.spacing['4xl']} auto;
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
  
  /* Main glow around the strip */
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
  
  /* Lamp-like light emission - radiates downward with blurred edges */
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 120px;
    background: radial-gradient(ellipse 150px 60px at center top,
      rgba(210, 168, 255, 0.3) 0%,
      rgba(163, 113, 247, 0.25) 15%,
      rgba(25, 108, 46, 0.2) 35%,
      rgba(46, 160, 67, 0.15) 50%,
      rgba(86, 211, 100, 0.1) 70%,
      rgba(180, 241, 180, 0.05) 85%,
      transparent 100%
    );
    filter: blur(6px);
    pointer-events: none;
    z-index: -2;
  }
`;

/* Extended glow container for additional lamp effect */
const ExtendedGlow = styled(motion.div)`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 150px;
  background: radial-gradient(ellipse 200px 75px at center top,
    rgba(210, 168, 255, 0.12) 0%,
    rgba(163, 113, 247, 0.1) 20%,
    rgba(25, 108, 46, 0.08) 40%,
    rgba(46, 160, 67, 0.06) 60%,
    rgba(86, 211, 100, 0.04) 80%,
    transparent 100%
  );
  filter: blur(12px);
  pointer-events: none;
  z-index: -3;
`;

interface GlowStripProps {
  className?: string;
}

const GlowStrip: React.FC<GlowStripProps> = ({ className }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      // Trigger animation when scrolling past hero section (assuming hero is 100vh)
      // About section typically starts around 100vh, so trigger when scrollY > 50vh
      const heroHeight = window.innerHeight;
      const triggerPoint = heroHeight * 0.5; // Trigger at 50% of hero height
      
      if (latest > triggerPoint && !hasAnimated) {
        setHasAnimated(true);
      }
    });
    
    return () => unsubscribe();
  }, [scrollY, hasAnimated]);
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Extended glow appears first with fade and scale */}
      <ExtendedGlow
        initial={{ opacity: 0, scale: 0.8 }}
        animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
      
      {/* Main glow strip appears with width animation and glow effect */}
      <GlowStripWrapper
        className={className}
        initial={{ 
          opacity: 0, 
          scaleX: 0
        }}
        animate={hasAnimated ? {
          opacity: 1, 
          scaleX: 1
        } : {
          opacity: 0, 
          scaleX: 0
        }}
        transition={{ 
          duration: 1.2, 
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 0.6 },
          scaleX: { duration: 1.2 }
        }}
      />
    </div>
  );
};

export default GlowStrip;