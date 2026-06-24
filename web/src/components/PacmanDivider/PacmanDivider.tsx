"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const PELLET = '#FFB897';
const FRAME_SEQ = [0, 1, 2, 1]; // 0,1,2,1,0,1,2,1...
const FRAME_MS = 110;
const GHOST_POSITIONS = [40, 60, 80]; // %  — two in middle, one on right
const PAC_SIZE = 36;
const GHOST_SIZE = 30;

const powerPulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.78); }
`;

const ghostBob = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 3px)); }
`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  pointer-events: none;
  z-index: 20;
  margin: 0 0 -22px 0; /* overlap About so the pellet line sits on About's top edge */
`;

const Track = styled.div`
  position: absolute;
  inset: 0;
`;

const MazeLine = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 3px;
  border-radius: 2px;
  background: #2121DE;
  box-shadow: 0 0 6px rgba(33, 33, 222, 0.55);
  clip-path: inset(0 0 0 ${p => p.$progress * 100}%);
`;

const Pellets = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  clip-path: inset(0 0 0 ${p => p.$progress * 100}%);
`;

const Pellet = styled.span<{ $power?: boolean }>`
  display: block;
  width: ${p => p.$power ? '10px' : '4px'};
  height: ${p => p.$power ? '10px' : '4px'};
  border-radius: 50%;
  background: ${PELLET};
  ${p => p.$power && css`animation: ${powerPulse} 0.45s infinite ease-in-out;`}
`;

const Ghost = styled.img<{ $left: number; $eaten: boolean }>`
  position: absolute;
  top: 50%;
  left: ${p => p.$left}%;
  width: ${GHOST_SIZE}px;
  height: ${GHOST_SIZE}px;
  transform: translate(-50%, -50%);
  animation: ${ghostBob} 1.2s infinite ease-in-out;
  opacity: ${p => p.$eaten ? 0 : 1};
  transition: opacity 0.18s ease-out;
  image-rendering: -webkit-optimize-contrast;
`;

const Pac = styled.img<{ $progress: number }>`
  position: absolute;
  top: 50%;
  left: ${p => p.$progress * 100}%;
  width: ${PAC_SIZE}px;
  height: ${PAC_SIZE}px;
  transform: translate(-50%, -50%);
  image-rendering: -webkit-optimize-contrast;
`;

const PacmanDivider: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - rect.top / vh;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % FRAME_SEQ.length), FRAME_MS);
    return () => clearInterval(id);
  }, []);

  const pellets = Array.from({ length: 28 }, (_, i) => i);
  const phaseIdx = FRAME_SEQ[frame];

  return (
    <Wrap ref={ref}>
      <Track>
        <MazeLine $progress={progress} />
        <Pellets $progress={progress}>
          {pellets.map(i => <Pellet key={i} $power={i % 7 === 3} />)}
        </Pellets>

        {GHOST_POSITIONS.map(pos => (
          <Ghost
            key={pos}
            src="/pacman/ghost1.png"
            alt=""
            $left={pos}
            $eaten={progress * 100 >= pos}
          />
        ))}

        <Pac src={`/pacman/phase${phaseIdx}.png`} alt="Pac-Man" $progress={progress} />
      </Track>
    </Wrap>
  );
};

export default PacmanDivider;
