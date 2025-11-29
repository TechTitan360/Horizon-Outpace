'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Layers, Settings } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Visualization() {
  const [activeTab, setActiveTab] = useState<'network' | 'timeline' | 'metrics'>('network');
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate left content
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.animate-item'), {
          x: -60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate visualization panel
      if (visualizationRef.current) {
        gsap.from(visualizationRef.current, {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: 'network' as const, label: 'Task Network', icon: Layers },
    { id: 'timeline' as const, label: 'Timeline View', icon: Zap },
    { id: 'metrics' as const, label: 'Analytics', icon: Settings },
  ];

  const features = [
    {
      title: 'Real-time Updates',
      description: 'Visualizations update instantly as your tasks evolve',
      color: 'bg-sky-400',
    },
    {
      title: 'Interactive Exploration',
      description: 'Zoom, filter, and drill down into your data',
      color: 'bg-violet-400',
    },
    {
      title: 'Custom Views',
      description: 'Create personalized dashboards for your workflow',
      color: 'bg-emerald-400',
    },
  ];

  return (
    <section ref={sectionRef} className="pt-16 pb-32 px-8 bg-gradient-to-b from-white to-slate-50/50">
      {/* Import Google Fonts (matching hero & features) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div ref={contentRef}>
            <div
              className="animate-item inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
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
                VISUALIZATION ENGINE
              </span>
            </div>

            <h2
              className="animate-item text-4xl md:text-5xl lg:text-6xl text-black mb-4 font-medium"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              See your work differently
            </h2>

            {/* Decorative divider */}
            <div className="animate-item flex items-center gap-4 mb-6">
              <div
                className="h-px w-12"
                style={{
                  background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.6), rgba(168, 85, 247, 0.4), transparent)',
                }}
              />
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                <div className="absolute inset-0 w-1.5 h-1.5 bg-violet-300 rounded-full animate-pulse opacity-50" />
              </div>
            </div>

            <p
              className="animate-item text-lg text-black/40 mb-10 leading-relaxed font-light"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Powered by D3.js, our advanced visualization engine transforms complex data into intuitive,
              interactive graphs that reveal patterns and insights at a glance.
            </p>

            {/* Tab selector with glassmorphism */}
            <div className="animate-item flex flex-wrap gap-2 mb-10">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                      ? 'text-white scale-105'
                      : 'text-black/60 hover:text-black/80 hover:scale-102'
                      }`}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.875rem',
                      background: activeTab === tab.id
                        ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: activeTab === tab.id
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.4)',
                      boxShadow: activeTab === tab.id
                        ? '0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 4px 12px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Features list with icons */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <div key={index} className="animate-item flex items-start gap-4 group">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }}
                  >
                    <div className={`w-2.5 h-2.5 ${feature.color} rounded-full`} />
                  </div>
                  <div>
                    <h4
                      className="text-black mb-1 font-medium"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-black/50 font-light text-sm"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visualization mockup with glassmorphism */}
          <div ref={visualizationRef} className="relative">
            <div
              className="aspect-square rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: `
                  0 8px 32px 0 rgba(31, 38, 135, 0.15),
                  0 4px 16px 0 rgba(255, 255, 255, 0.1),
                  inset 0 2px 4px 0 rgba(255,255,255,0.8),
                  inset 0 -2px 4px 0 rgba(0,0,0,0.03)
                `,
              }}
            >
              {/* Multi-layered glass background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-violet-50/30" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/10 via-transparent to-pink-50/10" />

              {/* Animated background grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Animated liquid blob */}
              <div
                className="absolute w-64 h-64 -top-20 -right-20 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.5) 0%, rgba(196, 181, 253, 0.3) 50%, transparent 70%)',
                  borderRadius: '40% 60% 55% 45% / 55% 45% 60% 40%',
                  filter: 'blur(30px)',
                  animation: 'morphBlob 6s ease-in-out infinite alternate',
                }}
              />

              {/* Shine effect */}
              <div
                className="absolute inset-y-0 -left-full w-1/3 pointer-events-none animate-shine"
                style={{
                  background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.8) 52%, rgba(255,255,255,0.5) 54%, transparent 80%)',
                  transform: 'skewX(-25deg)',
                }}
              />

              {/* Top highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  borderRadius: '24px 24px 100% 100%',
                }}
              />

              {/* Noise texture */}
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
              />

              {/* Data visualization content */}
              <div className="relative h-full flex items-center justify-center z-10">
                {/* Abstract visualization circles */}
                <div className="relative w-full h-full">
                  {/* Central orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/20 blur-xl animate-pulse" />
                    <div className="absolute inset-0 w-24 h-24 rounded-full border border-violet-300/30" />
                  </div>

                  {/* Orbiting elements */}
                  <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-400/10 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-400/10 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/20 to-green-400/10 blur-lg animate-pulse" style={{ animationDelay: '1.5s' }} />

                  {/* Connecting lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="lineGradViz" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(56, 189, 248, 0.5)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(168, 85, 247, 0.5)' }} />
                      </linearGradient>
                    </defs>
                    <line x1="25" y1="25" x2="50" y2="50" stroke="url(#lineGradViz)" strokeWidth="0.5" />
                    <line x1="75" y1="75" x2="50" y2="50" stroke="url(#lineGradViz)" strokeWidth="0.5" />
                    <line x1="66" y1="33" x2="50" y2="50" stroke="url(#lineGradViz)" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>

              {/* Floating data cards */}
              <div
                className="absolute top-6 left-6 px-4 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div
                  className="text-xs text-black/50 mb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Active Tasks
                </div>
                <div
                  className="text-xl text-black font-medium"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  247
                </div>
              </div>

              <div
                className="absolute top-6 right-6 px-4 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div
                  className="text-xs text-black/50 mb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Efficiency
                </div>
                <div
                  className="text-xl text-black font-medium flex items-center gap-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  94%
                  <span className="text-xs text-emerald-500">↑</span>
                </div>
              </div>

              <div
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div
                  className="text-xs text-black/50 mb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Completed
                </div>
                <div
                  className="text-xl text-black font-medium"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  1,432
                </div>
              </div>

              <div
                className="absolute bottom-6 right-6 px-4 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div
                  className="text-xs text-black/50 mb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  This Week
                </div>
                <div
                  className="text-xl text-black font-medium flex items-center gap-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  +89
                  <span className="text-xs text-sky-500">tasks</span>
                </div>
              </div>

              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-20 h-20 rounded-tl-3xl pointer-events-none"
                style={{
                  borderLeft: '1px solid rgba(255,255,255,0.4)',
                  borderTop: '1px solid rgba(255,255,255,0.4)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-20 h-20 rounded-br-3xl pointer-events-none"
                style={{
                  borderRight: '1px solid rgba(255,255,255,0.3)',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes */}
      <style>{`
        @keyframes morphBlob {
          0% { border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%; }
          50% { border-radius: 55% 45% 40% 60% / 45% 60% 45% 55%; }
          100% { border-radius: 45% 55% 60% 40% / 60% 40% 55% 45%; }
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-shine {
          animation: shine 5s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
