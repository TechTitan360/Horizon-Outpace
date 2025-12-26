'use client';

import React, { useEffect } from 'react';
import { Hero } from './components/hero';
import { Features } from './components/feature';
import { Visualization } from './components/visualization';
// import { AISection } from './components/AISection';
// import { CTA } from './components/CTA';
// import { Footer } from './components/Footer';
// import { CustomCursor } from './components/CustomCursor';

export default function App() {
  // Enable smooth scroll only for landing page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-white">
      {/* <CustomCursor /> */}
      <Hero />
      <Features />
      <Visualization />
      {/* <AISection /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </div>
  );
}
