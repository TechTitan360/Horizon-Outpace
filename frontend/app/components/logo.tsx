'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 'md', animated = true, className = '' }: LogoProps) {
  const lineRef = useRef<SVGLineElement>(null);
  const chevronRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const sizes = {
    sm: { width: 32, height: 32, fontSize: 'text-sm' },
    md: { width: 40, height: 40, fontSize: 'text-base' },
    lg: { width: 56, height: 56, fontSize: 'text-xl' },
  };

  const { width, height, fontSize } = sizes[size];

  useEffect(() => {
    if (!animated) return;

    // Animate speed line
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        x: 30,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.in',
      });
    }

    // Animate chevron
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        x: 3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Pulse circle
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
        transformOrigin: 'center center',
      });
    }
  }, [animated]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle - horizon */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Pulsing circle effect */}
        <circle
          ref={circleRef}
          cx="20"
          cy="20"
          r="18"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0"
        />

        {/* Horizon line */}
        <line
          x1="8"
          y1="20"
          x2="32"
          y2="20"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Speed lines (racing effect) */}
        <line
          ref={lineRef}
          x1="2"
          y1="15"
          x2="12"
          y2="15"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Chevron/Arrow - outpace symbol */}
        <path
          ref={chevronRef}
          d="M 22 13 L 28 20 L 22 27"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Velocity dot */}
        <circle
          cx="12"
          cy="20"
          r="2"
          fill="url(#logoGradient)"
        >
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col">
        <span className={`${fontSize} leading-none tracking-tight`} style={{ fontWeight: 600 }}>
          Horizon Outpace
        </span>
      </div>
    </div>
  );
}

// Minimal logo version (just icon)
export function LogoMark({ size = 'md', animated = true }: Omit<LogoProps, 'className'>) {
  const lineRef = useRef<SVGLineElement>(null);
  const chevronRef = useRef<SVGPathElement>(null);

  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 56, height: 56 },
  };

  const { width, height } = sizes[size];

  useEffect(() => {
    if (!animated) return;

    if (lineRef.current) {
      gsap.to(lineRef.current, {
        x: 30,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.in',
      });
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        x: 3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, [animated]);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        fill="none"
      />

      <line
        x1="8"
        y1="20"
        x2="32"
        y2="20"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <line
        ref={lineRef}
        x1="2"
        y1="15"
        x2="12"
        y2="15"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      <path
        ref={chevronRef}
        d="M 22 13 L 28 20 L 22 27"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <circle
        cx="12"
        cy="20"
        r="2"
        fill="url(#logoGradient)"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
