'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Visualization() {
  const [activeTab, setActiveTab] = useState<'network' | 'timeline' | 'metrics'>('network');
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && visualizationRef.current) {
      gsap.from(sectionRef.current.querySelector('h2'), {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(visualizationRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  const tabs = [
    { id: 'network' as const, label: 'Task Network' },
    { id: 'timeline' as const, label: 'Timeline View' },
    { id: 'metrics' as const, label: 'Analytics' },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black/5 rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                        }}>
                        <div className="inset-0 w-2 h-2 bg-sky-300 rounded-full animate-pulse" />
                        <span className="text-xs tracking-widest text-black/60">VISUALIZATION ENGINE</span>
                    </div>

            <h2 className="text-5xl md:text-6xl text-black mb-6">
              See your work differently
            </h2>

            <p className="text-xl text-black/50 mb-12 leading-relaxed">
              Powered by D3.js, our advanced visualization engine transforms complex data into intuitive, 
              interactive graphs that reveal patterns and insights at a glance.
            </p>

            {/* Tab selector */}
            <div className="flex gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-black/60 rounded-full" />
                </div>
                <div>
                  <h4 className="text-black mb-1">Real-time Updates</h4>
                  <p className="text-black/50">Visualizations update instantly as your tasks evolve</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-black/60 rounded-full" />
                </div>
                <div>
                  <h4 className="text-black mb-1">Interactive Exploration</h4>
                  <p className="text-black/50">Zoom, filter, and drill down into your data</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-black/60 rounded-full" />
                </div>
                <div>
                  <h4 className="text-black mb-1">Custom Views</h4>
                  <p className="text-black/50">Create personalized dashboards for your workflow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right visualization mockup */}
          <div ref={visualizationRef} className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-black/10 p-8 relative overflow-hidden">
              {/* Animated background grid */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Abstract data visualization */}
              {/* Abstract data visualization */}
              <div className="relative h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1762279388957-c6ed514d3353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2NDMxODAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Data Visualization"
                  className="w-full h-full object-cover rounded-xl opacity-60"
                />
                {/* Overlay elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-2xl animate-pulse" />
                </div>
              </div>

              {/* Floating data points */}
              <div className="absolute top-8 left-8 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-black/10 shadow-lg">
                <div className="text-xs text-black/60">Active Tasks</div>
                <div className="text-black">247</div>
              </div>
              <div className="absolute top-8 right-8 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-black/10 shadow-lg">
                <div className="text-xs text-black/60">Efficiency</div>
                <div className="text-black">94%</div>
              </div>
              <div className="absolute bottom-8 left-8 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-black/10 shadow-lg">
                <div className="text-xs text-black/60">Completed</div>
                <div className="text-black">1,432</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
