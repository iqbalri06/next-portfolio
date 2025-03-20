'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Space animations component that will only be rendered on the client side
const SpaceAnimationsComponent = () => {
  return (
    <>
      {/* Rocket animation - Positioned more centrally */}
      <motion.div 
        className="absolute z-10"
        initial={{ x: "20%", y: 50 }}
        animate={{ 
          x: [null, "30%", "40%", "50%", "60%"], 
          y: [null, 30, 10, 0, -10] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
      >
        <div className="relative w-8 h-10">
          {/* Rocket body */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gray-200 dark:bg-gray-300 rounded-t-full"></div>
          {/* Rocket tip */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-l-transparent border-r-transparent border-b-gray-300"></div>
          {/* Rocket windows */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          {/* Rocket fins */}
          <div className="absolute bottom-1 left-0 w-2 h-3 bg-red-500 rounded-bl-full"></div>
          <div className="absolute bottom-1 right-0 w-2 h-3 bg-red-500 rounded-br-full"></div>
          {/* Rocket exhaust flame */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-orange-500 rounded-b-full"
            animate={{ height: [3, 5, 3], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-2 bg-yellow-400 rounded-b-full"
            animate={{ height: [2, 4, 2], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>

      {/* UFO animation - Positioned more centrally */}
      <motion.div 
        className="absolute z-10"
        initial={{ x: "40%", y: 20 }}
        animate={{ 
          x: [null, "35%", "30%", "25%", "20%", "25%", "30%"], 
          y: [null, 30, 40, 30, 20, 30, 40] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
      >
        <div className="relative w-14 h-6">
          {/* UFO dome */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-200 dark:bg-gray-300 rounded-t-full"></div>
          {/* UFO body */}
          <div className="absolute bottom-0 left-0 w-14 h-2 bg-gray-400 dark:bg-gray-500 rounded-full">
            {/* UFO lights */}
            <motion.div 
              className="absolute bottom-0 left-2 w-1 h-1 bg-green-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-0 left-5 w-1 h-1 bg-blue-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-0 left-8 w-1 h-1 bg-yellow-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-0 left-11 w-1 h-1 bg-purple-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
            ></motion.div>
          </div>
          {/* Tractor beam */}
          <motion.div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-gradient-to-b from-cyan-400 to-transparent opacity-50"
            animate={{ opacity: [0.3, 0.7, 0.3], height: [3, 5, 3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
          ></motion.div>
        </div>
      </motion.div>
    </>
  );
};

// Import SpaceAnimations component with SSR disabled
const SpaceAnimations = dynamic(() => Promise.resolve(SpaceAnimationsComponent), {
  ssr: false
});

// Create a client-only wrapper for components to avoid hydration issues
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : null;
};

// Create a client-only version of our language dropdown
const ClientLanguageSwitcher = dynamic(() => Promise.resolve(LanguageSwitcher), {
  ssr: false,
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "#about", label: t('about.title') },
    { href: "#skills", label: t('skills.title') || 'Skills' },
    { href: "#projects", label: t('projects.title') },
    { href: "#contact", label: t('contact.title') },
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'py-2' : 'py-5'
        }`}
      >
        <motion.div 
          className={`mx-auto max-w-6xl backdrop-blur-xl rounded-2xl py-3 px-6 sm:px-8 transition-all duration-300 relative overflow-visible
            ${isScrolled 
              ? 'bg-white/80 dark:bg-gray-900/80 border-2 border-gray-200/20 dark:border-gray-700/20' 
              : 'bg-white/50 dark:bg-gray-900/50 border border-gray-200/10 dark:border-gray-700/10'
            }
            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]`
          }
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Client-only space animations */}
          <ClientOnly>
            <SpaceAnimations />
          </ClientOnly>

          <div className="flex justify-between items-center h-14 relative z-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <Link 
                href="/" 
                className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-violet-500 hover:to-indigo-600 transition-all duration-300"
              >
                Portfolio
              </Link>
            </motion.div>

            {/* Updated Desktop Navigation Links */}
            <motion.nav 
              className="hidden md:flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveItem(item.href)} 
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative 
                    ${activeItem === item.href 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>

            {/* Right side items - Fixed dropdown positioning */}
            <div className="flex items-center space-x-4 relative z-30">
              {/* Language switcher with fixed dropdown positioning */}
              <div className="static">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm"
                  style={{ position: 'relative', zIndex: 100 }}
                >
                  {/* Use client-only language switcher to avoid hydration mismatch */}
                  <ClientOnly>
                    <ClientLanguageSwitcher />
                  </ClientOnly>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <motion.button 
                className="md:hidden p-2.5 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  className="w-5 h-5 text-indigo-600 dark:text-indigo-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile navigation menu with client-only rendering */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Menu card */}
            <motion.div 
              className="absolute right-4 top-4 left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* No animations in mobile menu to avoid hydration issues */}
              
              <div className="relative p-6 z-20">
                {/* Close button */}
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Logo */}
                <div className="mt-2 mb-8">
                  <Link 
                    href="/" 
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500"
                    onClick={closeMobileMenu}
                  >
                    Portfolio
                  </Link>
                </div>
                
                {/* Navigation items */}
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="group flex items-center py-2 px-4 rounded-xl bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 dark:hover:from-indigo-900/30 dark:hover:to-violet-900/30 transition-all duration-300"
                      >
                        <span className="h-8 w-8 mr-3 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </span>
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom actions */}
                <motion.div 
                  className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <button 
                    onClick={closeMobileMenu}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium shadow-lg shadow-indigo-500/30 transition-all duration-300"
                  >
                    {t('close')}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
