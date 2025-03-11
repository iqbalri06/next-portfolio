"use client";

import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Dock from './Dock';

export default function DockNavigation() {
  const [mounted, setMounted] = useState(false);
  
  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  const dockItems = [
    { 
      icon: <VscHome size={20} />, // reduced from 18
      label: 'Home', 
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      icon: <VscArchive size={18} />, 
      label: 'Projects', 
      onClick: () => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: <VscAccount size={18} />, 
      label: 'About', 
      onClick: () => {
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: <VscSettingsGear size={18} />, 
      label: 'Contact', 
      onClick: () => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center items-center">
      <Dock 
        items={dockItems}
        panelHeight={56}
        baseItemSize={40}
        magnification={48}
        className="bg-black/20 backdrop-blur-sm shadow-lg max-w-md mx-auto rounded-2xl border border-white/5"
      />
    </div>
  );
}
