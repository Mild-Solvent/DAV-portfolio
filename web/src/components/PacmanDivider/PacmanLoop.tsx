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
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  image-rendering: -webkit-optimize-contrast;
  filter: drop-shadow(0 0 14px rgba(86, 211, 100, 0.55));
`;

const cloudFloat = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(4px, -6px); }
`;

const CloudLayer = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 140px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.5s ease-out;
  z-index: -1;
`;

const Cloud = styled.div<{ $top: string; $left: string; $size: number; $delay: number; $opacity: number }>`
  position: absolute;
  top: ${p => p.$top};
  left: ${p => p.$left};
  width: ${p => p.$size}px;
  opacity: ${p => p.$opacity};
  animation: ${cloudFloat} 4.5s ${p => p.$delay}s infinite ease-in-out;
  filter: drop-shadow(0 6px 12px rgba(255, 255, 255, 0.18));

  svg { display: block; width: 100%; height: auto; }
`;

const CloudSVG: React.FC = () => (
  <svg viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="35" cy="50" rx="28" ry="20" fill="#f5f7fa" />
    <ellipse cx="65" cy="36" rx="34" ry="24" fill="#ffffff" />
    <ellipse cx="100" cy="46" rx="30" ry="22" fill="#f5f7fa" />
    <ellipse cx="70" cy="62" rx="46" ry="16" fill="#ffffff" />
  </svg>
);

type Direction = 'down' | 'up';

const PacmanLoop: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<Direction>('down');
  const [progress, setProgress] = useState(0);
  const [flight, setFlight] = useState<RocketFlight>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>('down');
  const [landed, setLanded] = useState(false);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [nearLanding, setNearLanding] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh * 0.5);
      setProgress(Math.min(1, Math.max(0, p)));

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) > 1) {
        const next: Direction = delta > 0 ? 'down' : 'up';
        if (next !== lastDirection.current) {
          lastDirection.current = next;
          setDirection(next);
        }
      }
      lastScrollY.current = currentY;

      const skills = document.getElementById('skills');
      if (!skills) return;

      const skillsRect = skills.getBoundingClientRect();
      const scrollY = currentY;
      const dividerTop = rect.top + scrollY;
      const skillsTop = skillsRect.top + scrollY;
      const skillsBottom = skillsTop + skillsRect.height;
      const launchScroll = dividerTop - vh * 0.52;
      const startX = rect.left + rect.width * 0.04;
      const startY = dividerTop + rect.height / 2;
      const isMobile = window.innerWidth <= 768;
      const startViewportY = startY - launchScroll;

      let docX: number;
      let docY: number;
      let currentPhase: 1 | 2 | 3 = 1;
      let isLanded = false;
      let isNearLanding = false;

      // L-shaped 3-phase trajectory (both mobile and desktop):
      //   Phase 1: vertical descent on the left
      //   Phase 2: 90° turn → fly horizontally to the centre
      //   Phase 3: vertical descent from the centre to the landing point
      let turnY: number;
      let centerX: number;
      let targetX: number;
      let targetY: number;

      if (isMobile) {
        const pad = document.getElementById('rocket-landing-pad');
        const padRect = pad?.getBoundingClientRect();
        const padTop = padRect ? padRect.top + scrollY : skillsBottom - vh * 0.2;
        const padHeight = padRect?.height ?? 180;
        const padCenterX = padRect
          ? padRect.left + padRect.width / 2
          : skillsRect.left + skillsRect.width / 2;
        targetX = padCenterX;
        targetY = padTop + padHeight / 2;
        // Turn just above the landing pad so the rocket descends on the left
        // through Backend/Cloud sections before swinging right.
        turnY = padTop + vh * 0.02;
        centerX = padCenterX;
      } else {
        turnY = skillsTop + skillsRect.height * 0.62;
        centerX = skillsRect.left + skillsRect.width / 2;
        targetX = centerX;
        targetY = skillsBottom - vh * 0.5;
      }

      const phase1Len = Math.max(1, turnY - startY);
      const phase2Len = Math.min(vh * 0.28, Math.max(120, (targetY - turnY) * 0.45));
      const phase3Len = Math.max(1, (targetY - turnY) - phase2Len);

      const phase1End = launchScroll + phase1Len;
      const phase2End = phase1End + phase2Len;
      const landingScroll = phase2End + phase3Len;

      if (scrollY <= launchScroll) {
        docX = startX;
        docY = startY;
        currentPhase = 1;
      } else if (scrollY <= phase1End) {
        currentPhase = 1;
        const t = (scrollY - launchScroll) / phase1Len;
        docX = startX;
        docY = startY + (turnY - startY) * t;
      } else if (scrollY <= phase2End) {
        currentPhase = 2;
        const t = (scrollY - phase1End) / phase2Len;
        docX = startX + (centerX - startX) * t;
        docY = turnY;
      } else if (scrollY <= landingScroll) {
        currentPhase = 3;
        const t = (scrollY - phase2End) / phase3Len;
        docX = centerX;
        docY = turnY + (targetY - turnY) * t;
        isNearLanding = t >= 0.7;
      } else {
        currentPhase = 3;
        docX = targetX;
        docY = targetY;
        isLanded = true;
        isNearLanding = true;
      }

      setFlight({
        x: docX - startX,
        y: docY - startY,
      });

      setPhase(currentPhase);
      setLanded(isLanded);
      setNearLanding(isNearLanding);
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
  const pacX = (1 - progress) * 100;
  const reachedRocket = pacX <= 4;
  const rocketSrc = reachedRocket ? '/pacman/rocket-pacman.png' : '/pacman/rocket.png';

  // rocket.png points up by default → 0deg = up, 180deg = down, 90deg = right, -90deg = left
  const rotation = (() => {
    if (landed) return 0;
    if (phase === 2) return direction === 'down' ? 90 : -90;
    return direction === 'down' ? 180 : 0;
  })();

  return (
    <Wrap ref={ref}>
      <Track>
        <Floor />
        <RocketPosition
          style={{
            transform: `translate(calc(-50% + ${reachedRocket ? flight.x : 0}px), calc(-50% + ${reachedRocket ? flight.y : 0}px))`,
          }}
        >
          <CloudLayer $visible={reachedRocket && nearLanding}>
            <Cloud $top="5%" $left="-15%" $size={62} $delay={0} $opacity={0.85}>
              <CloudSVG />
            </Cloud>
            <Cloud $top="18%" $left="70%" $size={55} $delay={0.5} $opacity={0.75}>
              <CloudSVG />
            </Cloud>
            <Cloud $top="58%" $left="-10%" $size={68} $delay={1} $opacity={0.8}>
              <CloudSVG />
            </Cloud>
            <Cloud $top="62%" $left="68%" $size={58} $delay={1.5} $opacity={0.7}>
              <CloudSVG />
            </Cloud>
          </CloudLayer>
          <Rocket
            src={rocketSrc}
            alt="DAV rocket"
            style={{
              transform: `rotate(${reachedRocket ? rotation : 0}deg)`,
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
