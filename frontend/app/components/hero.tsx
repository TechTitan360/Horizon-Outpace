'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Logo } from './logo';

export function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const orbsRef = useRef<HTMLDivElement>(null);
    const glassShineRef = useRef<HTMLDivElement>(null);
    const liquidBlobRef = useRef<HTMLDivElement>(null);
    const secondaryShineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const banner = document.getElementById('hero-banner');
            if (banner) {
                const rect = banner.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        const banner = document.getElementById('hero-banner');
        if (banner) {
            banner.addEventListener('mousemove', handleMouseMove);
            return () => banner.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    useEffect(() => {
        // Initial animations
        const tl = gsap.timeline();

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        })
            .from(taglineRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.5')
            .from(dividerRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
            }, '-=0.4');

        // Animate SVG circles
        if (svgRef.current) {
            const circles = svgRef.current.querySelectorAll('circle');
            gsap.from(circles, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'elastic.out(1, 0.5)',
                transformOrigin: 'center center',
            });

            gsap.to(circles, {
                y: '+=10',
                duration: 2,
                stagger: 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        // Animate orbs
        if (orbsRef.current) {
            const orbs = orbsRef.current.querySelectorAll('.orb');
            gsap.to(orbs, {
                scale: 1.2,
                opacity: 0.8,
                duration: 3,
                stagger: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        // Primary liquid glass shine animation
        if (glassShineRef.current) {
            gsap.to(glassShineRef.current, {
                x: '300%',
                duration: 4,
                repeat: -1,
                repeatDelay: 3,
                ease: 'power2.inOut',
            });
        }

        // Secondary shine animation (opposite direction)
        if (secondaryShineRef.current) {
            gsap.to(secondaryShineRef.current, {
                x: '-300%',
                duration: 5,
                repeat: -1,
                repeatDelay: 4,
                ease: 'power1.inOut',
                delay: 2,
            });
        }

        // Liquid blob morphing animation
        if (liquidBlobRef.current) {
            gsap.to(liquidBlobRef.current, {
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }
    }, []);

    return (
        <section className="h-screen flex items-center justify-center px-6 py-4 overflow-hidden">
            {/* Import Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

            <div className="w-full max-w-7xl h-full flex flex-col justify-center">
                {/* <div className="absolute top-8 left-8 z-20">
                    <Logo size="md" animated={true} />
                </div> */}
                <div
                    id="hero-banner"
                    className="relative overflow-hidden rounded-3xl cursor-default group"
                    style={{
                        height: 'calc(100vh - 140px)',
                        maxHeight: '600px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        boxShadow: `
                            0 8px 32px 0 rgba(31, 38, 135, 0.2),
                            0 4px 16px 0 rgba(255, 255, 255, 0.1),
                            inset 0 2px 4px 0 rgba(255,255,255,0.8),
                            inset 0 -2px 4px 0 rgba(0,0,0,0.05),
                            0 0 0 1px rgba(255,255,255,0.2)
                        `,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Multi-layered liquid glass background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-blue-50/30 to-violet-50/40" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/20 via-transparent to-pink-50/20" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/20 to-transparent" />

                    {/* Animated liquid blob effect */}
                    <div
                        ref={liquidBlobRef}
                        className="absolute w-[600px] h-[600px] -top-40 -left-40 pointer-events-none opacity-30"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.4) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)',
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            filter: 'blur(40px)',
                        }}
                    />

                    {/* Secondary liquid blob */}
                    <div
                        className="absolute w-[500px] h-[500px] -bottom-32 -right-32 pointer-events-none opacity-25"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.3) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)',
                            borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
                            filter: 'blur(50px)',
                            animation: 'morphBlob 6s ease-in-out infinite alternate',
                        }}
                    />

                    {/* Primary animated liquid glass shine effect */}
                    <div
                        ref={glassShineRef}
                        className="absolute inset-y-0 -left-full w-1/3 pointer-events-none"
                        style={{
                            background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.8) 52%, rgba(255,255,255,0.5) 54%, transparent 80%)',
                            transform: 'skewX(-25deg)',
                        }}
                    />

                    {/* Secondary shine effect */}
                    <div
                        ref={secondaryShineRef}
                        className="absolute inset-y-0 right-0 w-1/4 pointer-events-none opacity-60"
                        style={{
                            background: 'linear-gradient(80deg, transparent, rgba(255,255,255,0.3), transparent)',
                            transform: 'skewX(15deg)',
                        }}
                    />

                    {/* Inner glass reflection (top highlight) */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                            borderRadius: '24px 24px 100% 100%',
                        }}
                    />

                    {/* Chromatic aberration edge effect */}
                    <div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            boxShadow: `
                                inset 2px 0 8px rgba(255, 100, 100, 0.1),
                                inset -2px 0 8px rgba(100, 100, 255, 0.1),
                                inset 0 2px 8px rgba(100, 255, 100, 0.05)
                            `,
                        }}
                    />

                    {/* Enhanced noise texture overlay for glass effect */}
                    <div
                        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Secondary finer noise layer */}
                    <div
                        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' /%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Animated gradient orb following mouse */}
                    <div
                        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
                        style={{
                            background: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)`,
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.3s ease-out',
                        }}
                    />

                    {/* Secondary mouse-following orb */}
                    <div
                        className="absolute w-[300px] h-[300px] rounded-full blur-2xl pointer-events-none"
                        style={{
                            background: `radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)`,
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: 'translate(-30%, -30%)',
                            opacity: isHovered ? 0.8 : 0,
                            transition: 'opacity 0.3s ease-out',
                        }}
                    />

                    {/* Animated background SVG pattern */}
                    <svg
                        ref={svgRef}
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                        viewBox="0 0 1000 600"
                    >
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: 'rgba(0,0,0,0.1)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 1 }} />
                            </linearGradient>
                            <radialGradient id="glowGrad">
                                <stop offset="0%" style={{ stopColor: 'rgba(56, 189, 248, 0.3)' }} />
                                <stop offset="100%" style={{ stopColor: 'rgba(56, 189, 248, 0)' }} />
                            </radialGradient>
                        </defs>

                        {/* Decorative circles with glow */}
                        <circle cx="150" cy="100" r="4" fill="rgba(56, 189, 248, 0.3)" />
                        <circle cx="150" cy="100" r="12" fill="url(#glowGrad)" />
                        <circle cx="850" cy="150" r="3" fill="rgba(168, 85, 247, 0.25)" />
                        <circle cx="850" cy="150" r="10" fill="url(#glowGrad)" />
                        <circle cx="200" cy="500" r="3.5" fill="rgba(99, 102, 241, 0.25)" />
                        <circle cx="800" cy="450" r="2.5" fill="rgba(56, 189, 248, 0.2)" />
                        <circle cx="500" cy="80" r="2" fill="rgba(168, 85, 247, 0.2)" />
                        <circle cx="600" cy="520" r="3" fill="rgba(99, 102, 241, 0.2)" />

                        {/* Decorative lines */}
                        <line x1="0" y1="300" x2="200" y2="300" stroke="url(#lineGrad)" strokeWidth="1" />
                        <line x1="800" y1="300" x2="1000" y2="300" stroke="url(#lineGrad)" strokeWidth="1" />
                    </svg>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full text-center px-4">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                            }}
                        >
                            <div className="relative">
                                <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                                <div className="absolute inset-0 w-2 h-2 bg-sky-300 rounded-full animate-pulse" />
                            </div>
                            <span
                                className="text-xs tracking-widest text-black/60 font-medium"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                THE FUTURE OF TASK MANAGEMENT
                            </span>
                        </div>

                        <div className="transition-all duration-500">
                            <h1
                                ref={titleRef}
                                className="text-5xl md:text-7xl text-black leading-none font-medium"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    letterSpacing: isHovered ? '0.02em' : '-0.02em',
                                    transition: 'letter-spacing 0.5s ease',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                }}
                            >
                                Horizon Outpace
                            </h1>
                        </div>

                        {/* Decorative divider */}
                        <div ref={dividerRef} className="flex items-center gap-4">
                            <div
                                className="h-px transition-all duration-700"
                                style={{
                                    width: isHovered ? '80px' : '0px',
                                    background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), rgba(168, 85, 247, 0.4))',
                                }}
                            />
                            <div className="relative">
                                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                                <div className="absolute inset-0 w-2 h-2 bg-sky-300 rounded-full animate-pulse opacity-50" />
                            </div>
                            <div
                                className="h-px transition-all duration-700"
                                style={{
                                    width: isHovered ? '80px' : '0px',
                                    background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.4), rgba(56, 189, 248, 0.6), transparent)',
                                }}
                            />
                        </div>

                        <p
                            ref={taglineRef}
                            className="text-lg md:text-2xl text-black/40 tracking-tight transition-all duration-300 font-light"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                opacity: isHovered ? 0.6 : 0.4
                            }}
                        >
                            Transform Tasks into Momentum
                        </p>
                    </div>

                    {/* Bottom gradient line */}
                    <div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-px transition-all duration-500"
                        style={{
                            width: isHovered ? '200px' : '128px',
                            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), rgba(168, 85, 247, 0.2), transparent)',
                        }}
                    />

                    {/* Corner accents with gradient */}
                    <div
                        className="absolute top-0 left-0 w-28 h-28 rounded-tl-3xl pointer-events-none"
                        style={{
                            borderLeft: '1px solid rgba(255,255,255,0.4)',
                            borderTop: '1px solid rgba(255,255,255,0.4)',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-28 h-28 rounded-br-3xl pointer-events-none"
                        style={{
                            borderRight: '1px solid rgba(255,255,255,0.3)',
                            borderBottom: '1px solid rgba(255,255,255,0.3)',
                            background: 'linear-gradient(315deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        }}
                    />

                    {/* Edge refraction effect */}
                    <div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            border: '1px solid transparent',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5), transparent, rgba(255,255,255,0.2)) border-box',
                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}
                    />
                </div>

                {/* Scroll indicator */}
                <div className="flex justify-center mt-4 shrink-0">
                    <div className="flex flex-col items-center gap-1 animate-bounce">
                        <span
                            className="text-xs text-black/40 tracking-widest"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            SCROLL TO EXPLORE
                        </span>
                        <ArrowRight className="w-4 h-4 text-black/40 rotate-90" />
                    </div>
                </div>
            </div>            {/* Add keyframes for blob morphing */}
            <style>{`
                @keyframes morphBlob {
                    0% { border-radius: 70% 30% 50% 50% / 40% 60% 40% 60%; }
                    50% { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; }
                    100% { border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%; }
                }
            `}</style>
        </section>
    );
}
