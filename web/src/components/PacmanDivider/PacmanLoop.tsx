"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const PELLET = '#FFB897';
const FRAME_SEQ = [0, 1, 2, 1];
const FRAME_MS = 110;
const GHOST_POSITIONS = [40, 60, 80];
const PAC_SIZE = 64;
const GHOST_SIZE = 44;

type RocketFlight = {
  rotation: number;
  x: number;
  y: number;
};

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
  height: 96px;
  pointer-events: none;
  z-index: 20;
  margin: 0;
  background: #1f242b;
  border-top: 4px solid #11151a;
  border-bottom: 4px solid #11151a;
  box-shadow:
    inset 0 1px 0 #2d343d,
    inset 0 -1px 0 #2d343d;
`;

const Track = styled.div`
  position: absolute;
  inset: 0;
`;

const Floor = styled.div`
  position: absolute;
  left: 4%;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 136, 0.7) 6%,
    rgba(64, 224, 255, 0.9) 50%,
    rgba(0, 255, 136, 0.7) 94%,
    transparent 100%
  );
  box-shadow:
    0 0 14px rgba(0, 255, 136, 0.45),
    0 0 28px rgba(64, 224, 255, 0.3);
`;

const Pellets = styled.div`
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

const Pac = styled.img`
  position: absolute;
  top: 50%;
  width: ${PAC_SIZE}px;
  height: ${PAC_SIZE}px;
  transform: translate(-50%, -50%) scaleX(-1);
  image-rendering: -webkit-optimize-contrast;
`;

const RocketPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 4%;
`;

const Rocket = styled.img`
  display: block;
  height: 92px;
  width: auto;
  transform-origin: center;
  transition: transform 0.4s ease-in-out;
  image-rendering: -webkit-optimize-contrast;
  filter: drop-shadow(0 0 14px rgba(86, 211, 100, 0.55));
`;

const PacmanLoop: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [flight, setFlight] = useState<RocketFlight>({ rotation: 0, x: 0, y: 0 });
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh * 0.5);
      setProgress(Math.min(1, Math.max(0, p)));

      const skills = document.getElementById('skills');
      if (!skills) return;

      const skillsRect = skills.getBoundingClientRect();
      const scrollY = window.scrollY;
      const dividerTop = rect.top + scrollY;
      const skillsTop = skillsRect.top + scrollY;
      const launchScroll = dividerTop - vh * 0.52;
      const rotationEndScroll = launchScroll + vh * 1.15;
      const landingScroll = skillsTop - vh * 0.05;
      const landingRotationStart = landingScroll - vh * 0.65;
      const rotationProgress = Math.min(
        1,
        Math.max(0, (scrollY - launchScroll) / Math.max(1, rotationEndScroll - launchScroll))
      );
      const landingRotationProgress = Math.min(
        1,
        Math.max(
          0,
          (scrollY - landingRotationStart) / Math.max(1, landingScroll - landingRotationStart)
        )
      );
      const cruiseProgress = Math.min(
        1,
        Math.max(0, (scrollY - rotationEndScroll) / Math.max(1, landingScroll - rotationEndScroll))
      );

      const startX = rect.left + rect.width * 0.04;
      const startY = dividerTop + rect.height / 2;
      const landingInset = window.innerWidth <= 768 ? 54 : 84;
      const targetX = skillsRect.left + landingInset;
      const targetY = skillsTop + vh * 0.28;

      const startViewportY = startY - launchScroll;
      const targetViewportY = targetY - landingScroll;
      const trackedViewportY = startViewportY
        + (targetViewportY - startViewportY) * cruiseProgress;
      const trackedDocumentY = scrollY
        + trackedViewportY;
      const currentY = scrollY <= launchScroll
        ? startY
        : scrollY >= landingScroll
          ? targetY
          : trackedDocumentY;

      // Phase 1: rotate while holding the same viewport position.
      // Phase 2: travel with the user's scroll position.
      // Phase 3: lock to the Technical Skills landing point.
      const baseRotation = (rotationProgress + landingRotationProgress) * 180;

      setFlight({
        rotation: baseRotation,
        x: (targetX - startX) * cruiseProgress,
        y: currentY - startY,
      });
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
  const pacX = (1 - progress) * 100; // right → left
  const reachedRocket = pacX <= 4;
  const rocketSrc = reachedRocket ? '/pacman/rocket-pacman.png' : '/pacman/rocket.png';

  return (
    <Wrap ref={ref}>
      <Track>
        <Floor />
        <RocketPosition
          style={{
            transform: `translate(calc(-50% + ${reachedRocket ? flight.x : 0}px), calc(-50% + ${reachedRocket ? flight.y : 0}px))`,
          }}
        >
          <Rocket
            src={rocketSrc}
            alt="DAV rocket"
            style={{
              transform: `rotate(${reachedRocket ? flight.rotation : 0}deg)`,
            }}
          />
        </RocketPosition>
        <Pellets style={{ clipPath: `inset(0 ${progress * 100}% 0 0)` }}>
          {pellets.map(i => <Pellet key={i} $power={i % 7 === 3} />)}
        </Pellets>

        {GHOST_POSITIONS.map(pos => (
          <Ghost
            key={pos}
            src="/pacman/ghost1.png"
            alt=""
            $left={pos}
            $eaten={pacX <= pos}
          />
        ))}

        {!reachedRocket && (
          <Pac
            src={`/pacman/phase${phaseIdx}.png`}
            alt="Pac-Man"
            style={{ left: `${pacX}%` }}
          />
        )}
      </Track>
    </Wrap>
  );
};

export default PacmanLoop;
