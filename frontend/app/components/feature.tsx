'use client';

import { useEffect, useRef } from 'react';
import { Brain, BarChart3, Zap, Target, TrendingUp, Lock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Features() {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardsRef.current) return;

        const cards = cardsRef.current.querySelectorAll('.feature-card');

        // Set initial state
        gsap.set(cards, { opacity: 1, y: 0 });

        const ctx = gsap.context(() => {
            gsap.fromTo(cards,
                {
                    y: 60,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, cardsRef);

        return () => ctx.revert();
    }, []);
    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Intelligence',
            description: 'Machine learning algorithms analyze your workflow patterns and optimize task prioritization automatically.',
            accentColor: 'rgba(139, 92, 246, 0.3)',
            iconBg: 'from-violet-500/20 to-purple-500/20',
            iconColor: 'text-violet-600',
        },
        {
            icon: BarChart3,
            title: 'D3.js Visualizations',
            description: 'Dynamic, interactive data visualizations that bring your productivity metrics to life with stunning clarity.',
            accentColor: 'rgba(59, 130, 246, 0.3)',
            iconBg: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-600',
        },
        {
            icon: Zap,
            title: 'Intelligent Automation',
            description: 'Smart automation learns from your behavior to reduce manual work and accelerate your workflow.',
            accentColor: 'rgba(234, 179, 8, 0.3)',
            iconBg: 'from-yellow-500/20 to-orange-500/20',
            iconColor: 'text-yellow-600',
        },
        {
            icon: Target,
            title: 'Predictive Analytics',
            description: 'AI-driven insights predict bottlenecks and suggest optimal task sequences for maximum efficiency.',
            accentColor: 'rgba(16, 185, 129, 0.3)',
            iconBg: 'from-emerald-500/20 to-green-500/20',
            iconColor: 'text-emerald-600',
        },
        {
            icon: TrendingUp,
            title: 'Performance Tracking',
            description: 'Real-time analytics track your progress with advanced metrics and actionable insights.',
            accentColor: 'rgba(236, 72, 153, 0.3)',
            iconBg: 'from-pink-500/20 to-rose-500/20',
            iconColor: 'text-pink-600',
        },
        {
            icon: Lock,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and privacy controls keep your data secure and compliant.',
            accentColor: 'rgba(100, 116, 139, 0.3)',
            iconBg: 'from-slate-500/20 to-gray-500/20',
            iconColor: 'text-slate-600',
        },
    ];

    return (
        <section className="py-32 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black/5 rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                        }}>
                        <div className="inset-0 w-2 h-2 bg-sky-300 rounded-full animate-pulse" />
                        <span className="text-xs tracking-widest text-black/60">POWERFUL FEATURES</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl text-black mb-6">
                        Built for the future
                    </h2>
                    <p className="text-xl text-black/40 max-w-2xl mx-auto">
                        Combining cutting-edge AI with intuitive design to revolutionize how you manage tasks
                    </p>
                </div>

                {/* Features grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="feature-card group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                style={{
                                    opacity: 1,
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    boxShadow: `
                                        0 8px 32px 0 rgba(31, 38, 135, 0.1),
                                        0 4px 16px 0 rgba(255, 255, 255, 0.1),
                                        inset 0 2px 4px 0 rgba(255,255,255,0.8),
                                        inset 0 -2px 4px 0 rgba(0,0,0,0.02)
                                    `,
                                }}
                            >
                                {/* Liquid glass background layers */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                                {/* Colored accent blob */}
                                <div
                                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: feature.accentColor }}
                                />

                                {/* Glass shine effect on hover */}
                                <div
                                    className="absolute inset-y-0 -left-full w-1/2 group-hover:left-full transition-all duration-1000 ease-out pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                        transform: 'skewX(-20deg)',
                                    }}
                                />

                                {/* Top highlight reflection */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-2xl"
                                    style={{
                                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                                    }}
                                />

                                {/* Noise texture */}
                                <div
                                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none rounded-2xl"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                                    }}
                                />

                                {/* Icon */}
                                <div className="relative z-10 mb-6">
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                        style={{
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="relative z-10 text-lg font-semibold text-black mb-3">
                                    {feature.title}
                                </h3>
                                <p className="relative z-10 text-black/60 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Corner accents */}
                                <div
                                    className="absolute top-0 left-0 w-16 h-16 rounded-tl-2xl pointer-events-none"
                                    style={{
                                        borderLeft: '1px solid rgba(255,255,255,0.4)',
                                        borderTop: '1px solid rgba(255,255,255,0.4)',
                                    }}
                                />
                                <div
                                    className="absolute bottom-0 right-0 w-16 h-16 rounded-br-2xl pointer-events-none"
                                    style={{
                                        borderRight: '1px solid rgba(255,255,255,0.3)',
                                        borderBottom: '1px solid rgba(255,255,255,0.3)',
                                    }}
                                />

                                {/* Decorative line element */}
                                <div className="absolute bottom-4 right-4 w-8 h-px bg-gradient-to-r from-transparent to-black/20 group-hover:w-12 transition-all duration-300" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
