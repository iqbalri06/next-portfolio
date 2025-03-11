"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundEffect() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure proper sizing and positioning on mount and resize
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      // Force a repaint on resize to ensure gradients cover everything
      const el = document.querySelector('.full-bleed-gradient');
      if (el) {
        el.classList.add('force-repaint');
        setTimeout(() => el.classList.remove('force-repaint'), 10);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Base solid background for complete coverage */}
      <div className="fixed inset-0 w-screen h-screen bg-blue-50 dark:bg-gray-950 z-[-3]" />
      
      {/* Main gradient container */}
      <div className="full-bleed-gradient">
        {/* Super wide base gradient with extra coverage to the left */}
        <div className="absolute -left-[150vw] top-0 w-[350vw] h-[100vh] bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        
        {/* Extra left-side specific coverage */}
        <div className="absolute -left-[200vw] top-0 w-[250vw] h-[100vh] bg-blue-100/50 dark:bg-blue-900/30 blur-[120px]" />
        
        {/* Complete left-to-right coverage with greater extension to the left */}
        <div className="absolute -left-[200vw] -top-[20vh] w-[400vw] h-[150vh]">
          {/* Horizontal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-transparent to-purple-200/30 dark:from-blue-800/20 dark:via-transparent dark:to-purple-800/15" />
        </div>
        
        {/* Corner massive blobs with much larger dimensions */}
        <div className="absolute -top-[50vh] -left-[100vw] w-[250vw] h-[250vh] bg-blue-400/15 dark:bg-blue-600/10 rounded-[50%] blur-[180px]" />
        <div className="absolute -bottom-[50vh] -right-[50vw] w-[200vw] h-[200vh] bg-indigo-500/15 dark:bg-indigo-600/10 rounded-[50%] blur-[150px]" />
        <div className="absolute -top-[50vh] -right-[50vw] w-[200vw] h-[200vh] bg-purple-400/10 dark:bg-purple-600/10 rounded-[50%] blur-[150px]" />
        <div className="absolute -bottom-[50vh] -left-[100vw] w-[250vw] h-[250vh] bg-blue-500/10 dark:bg-blue-500/10 rounded-[50%] blur-[170px]" />
        
        {/* Left-heavy center gradient for additional left coverage */}
        <div className="absolute top-1/2 -left-[50vw] -translate-y-1/2 w-[300vw] h-[300vh] bg-gradient-to-br from-blue-400/15 via-purple-500/10 to-indigo-500/10 dark:from-blue-600/10 dark:via-purple-600/5 dark:to-indigo-600/5 rounded-[50%] blur-[120px]" />
        
        {/* Additional left side coverage - extra elements */}
        <div className="absolute top-0 -left-[150vw] h-full w-[200vw] bg-gradient-to-r from-blue-300/40 via-blue-200/20 to-transparent dark:from-blue-800/30 dark:via-blue-700/15 dark:to-transparent blur-[130px]" />
        <div className="absolute top-1/3 -left-[100vw] h-[150vh] w-[150vw] bg-blue-400/20 dark:bg-blue-700/15 rounded-[50%] blur-[150px]" />
        <div className="absolute top-2/3 -left-[80vw] h-[120vh] w-[120vw] bg-indigo-400/20 dark:bg-indigo-700/15 rounded-[50%] blur-[120px]" />
        
        {/* Right side coverage */}
        <div className="absolute top-0 -right-[50vw] h-full w-[100vw] bg-gradient-to-l from-purple-300/30 via-purple-200/20 to-transparent dark:from-purple-800/20 dark:via-purple-700/10 dark:to-transparent blur-[100px]" />
        
        {/* Top and bottom coverage */}
        <div className="absolute -top-[20vh] -left-[50vw] w-[200%] h-[70vh] bg-gradient-to-b from-blue-300/40 via-blue-200/20 to-transparent dark:from-blue-800/25 dark:via-blue-700/15 dark:to-transparent blur-[80px]" />
        <div className="absolute -bottom-[20vh] -left-[50vw] w-[200%] h-[70vh] bg-gradient-to-t from-indigo-300/40 via-indigo-200/20 to-transparent dark:from-indigo-800/25 dark:via-indigo-700/15 dark:to-transparent blur-[80px]" />
      </div>
    </>
  );
}
