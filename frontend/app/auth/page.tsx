'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial animation with explicit start/end states
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
        }

        // Cleanup on unmount
        return () => {
            gsap.killTweensOf(cardRef.current);
        };
    }, []);

    useEffect(() => {
        // Animate form switch with explicit states
        if (formRef.current) {
            const items = formRef.current.querySelectorAll('.form-item');
            gsap.fromTo(items,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, [isLogin]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = isLogin ? 'login' : 'register';
        const payload = isLogin
            ? { email, password }
            : { name, email, password };

        try {
            const response = await fetch(`http://localhost:8000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                // Store token
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                // Redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Failed to connect to server. Make sure backend is running on port 8000.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Import Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute w-[600px] h-[600px] -top-40 -right-40 opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(147, 197, 253, 0.4) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="absolute w-[500px] h-[500px] -bottom-32 -left-32 opacity-25"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.3) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)',
                        borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
                        filter: 'blur(50px)',
                    }}
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-8 text-black/50 hover:text-black/80 transition-colors duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span
                        className="text-sm font-medium"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Back to home
                    </span>
                </Link>

                {/* Auth Card */}
                <div
                    ref={cardRef}
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 100%)',
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
                    {/* Glass layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-violet-50/30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/10 via-transparent to-pink-50/10 pointer-events-none" />

                    {/* Top highlight */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1/4 pointer-events-none"
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

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1
                                className="text-3xl md:text-4xl text-black font-medium mb-2"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {isLogin ? 'Welcome back' : 'Get started'}
                            </h1>
                            <p
                                className="text-black/50 font-light"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                {isLogin
                                    ? 'Sign in to continue to Horizon Outpace'
                                    : 'Create your account to get started'}
                            </p>
                        </div>

                        {/* Toggle */}
                        <div
                            className="flex p-1 rounded-full mb-8"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                                border: '1px solid rgba(255,255,255,0.3)',
                            }}
                        >
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isLogin
                                    ? 'bg-white text-black shadow-md'
                                    : 'text-black/50 hover:text-black/70'
                                    }`}
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${!isLogin
                                    ? 'bg-white text-black shadow-md'
                                    : 'text-black/50 hover:text-black/70'
                                    }`}
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} ref={formRef}>
                            <div className="space-y-4">
                                {/* Name field (signup only) */}
                                {!isLogin && (
                                    <div className="form-item">
                                        <label
                                            className="block text-sm text-black/60 mb-2 font-medium"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        >
                                            Full Name
                                        </label>
                                        <div
                                            className="relative rounded-xl overflow-hidden"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                                border: '1px solid rgba(255,255,255,0.4)',
                                            }}
                                        >
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full bg-transparent px-11 py-3.5 text-black placeholder-black/30 focus:outline-none"
                                                style={{ fontFamily: "'Outfit', sans-serif" }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email field */}
                                <div className="form-item">
                                    <label
                                        className="block text-sm text-black/60 mb-2 font-medium"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        Email Address
                                    </label>
                                    <div
                                        className="relative rounded-xl overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                            border: '1px solid rgba(255,255,255,0.4)',
                                        }}
                                    >
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full bg-transparent px-11 py-3.5 text-black placeholder-black/30 focus:outline-none"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        />
                                    </div>
                                </div>

                                {/* Password field */}
                                <div className="form-item">
                                    <label
                                        className="block text-sm text-black/60 mb-2 font-medium"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        Password
                                    </label>
                                    <div
                                        className="relative rounded-xl overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                            border: '1px solid rgba(255,255,255,0.4)',
                                        }}
                                    >
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-transparent px-11 py-3.5 text-black placeholder-black/30 focus:outline-none"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot password (login only) */}
                                {isLogin && (
                                    <div className="form-item text-right">
                                        <button
                                            type="button"
                                            className="text-sm text-black/50 hover:text-black/70 transition-colors"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="form-item w-full py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg mt-6"
                                    style={{
                                        fontFamily: "'Geist Mono', monospace",
                                        background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-8">
                            <div
                                className="flex-1 h-px"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                                }}
                            />
                            <span
                                className="text-xs text-black/40"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                or continue with
                            </span>
                            <div
                                className="flex-1 h-px"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                                }}
                            />
                        </div>

                        {/* Social buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                }}
                            >
                                <Github className="w-4 h-4 text-black/70" />
                                <span
                                    className="text-sm text-black/70 font-medium"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    GitHub
                                </span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                }}
                            >
                                <Chrome className="w-4 h-4 text-black/70" />
                                <span
                                    className="text-sm text-black/70 font-medium"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Google
                                </span>
                            </button>
                        </div>

                        {/* Terms */}
                        <p
                            className="text-center text-xs text-black/40 mt-8"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            By continuing, you agree to our{' '}
                            <button className="text-black/60 hover:text-black/80 underline">
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button className="text-black/60 hover:text-black/80 underline">
                                Privacy Policy
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
