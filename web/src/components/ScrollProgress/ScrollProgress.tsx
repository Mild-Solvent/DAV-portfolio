import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div<{ $progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$progress}%;
  height: 3px;
  background: ${props => props.theme.gradients.primary};
  z-index: 9999;
  transition: width 0.1s ease;
`;

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / documentHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <ProgressBar $progress={progress} />;
};

export default ScrollProgress;