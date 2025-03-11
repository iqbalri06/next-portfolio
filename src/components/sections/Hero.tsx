"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext'; // Add this import
import profileImage from '/src/images/profile.png';

// Custom animated button component with Framer Motion
const ModernButton = ({ 
  href, 
  variant, 
  children 
}: { 
  href: string; 
  variant: 'primary' | 'secondary'; 
  children: React.ReactNode 
}) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full group
        ${variant === 'primary' 
          ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'}`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative flex items-center gap-2">
        {children}
        {variant === 'primary' && (
          <motion.span
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            →
          </motion.span>
        )}
      </span>
      
      {variant === 'primary' && (
        <motion.span 
          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0.15,
            transition: { duration: 0.4 }
          }}
        />
      )}
      
      {variant === 'secondary' && (
        <motion.span 
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full" 
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0.15,
            transition: { duration: 0.4 }
          }}
        />
      )}
    </motion.a>
  );
};

export default function Hero() {
  const { t } = useLanguage(); // Add language hook
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = t('hero.role'); // Use translation for role
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 2000;

  // Add parallax effect on scroll - only enable on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isMobile) return;
      const scrollY = window.scrollY;
      containerRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Update typing effect to use translated text
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      const updateText = () => {
        if (isDeleting) {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
        } else {
          setDisplayText(prev => fullText.substring(0, prev.length + 1));
        }
      };
      
      timeout = setTimeout(
        updateText, 
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, fullText]);

  return (
    <section id="home" className="relative min-h-[90vh] w-full flex flex-col justify-center py-10 md:py-16 px-4">
      <div className="container mx-auto max-w-7xl z-10">
        {/* Mobile layout - stacked vertically with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left space-y-4 md:space-y-6 order-2 md:order-1"
          >
            <div className="h-24 sm:h-28 md:h-32 flex items-center justify-center md:justify-start">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                key="title"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400 inline-flex">
                  {displayText}
                  <AnimatePresence>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.7, repeatType: "reverse" }}
                      className="ml-1 inline-block"
                    >
                      |
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.greeting')} <span className="font-semibold">Iqbal Roudatul Irfan</span>
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="pt-3 flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <ModernButton href="#contact" variant="primary">
                {t('contact.title')}
              </ModernButton>
              <ModernButton href="#projects" variant="secondary">
                {t('hero.cta')}
              </ModernButton>
            </motion.div>
            
            <motion.div 
              className="flex gap-6 justify-center md:justify-start pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.a 
                href="https://github.com/iqbalri06" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={26} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/iqbalri" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={26} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/iqbalri._" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={26} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Profile image and badges container */}
          <motion.div 
            className="flex justify-center md:justify-end order-1 md:order-2 mb-4 md:mb-0 md:mt-[-50px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            ref={containerRef}
          >
            <div className="relative max-w-[250px] sm:max-w-[280px] md:max-w-none">
              {/* Enhanced decorative elements */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-70 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500 rounded-full blur-2xl opacity-30"></div>
              
              {/* Profile image - reduced size on mobile */}
              <motion.div 
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] bg-gradient-to-br from-blue-500 to-violet-500 rounded-full p-1 shadow-2xl"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800">
                  <Image 
                    src={profileImage} // Use imported image
                    alt="Iqbal Roudatul Irfan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Skill badges with better mobile spacing */}
              <motion.div 
                className="absolute -left-2 sm:-left-4 md:-left-16 top-[2%] sm:top-[10%] md:top-[20%] bg-white dark:bg-gray-800 shadow-lg rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                💻 Frontend Developer
              </motion.div>
              
              {/* Backend Developer badge - moved much further right */}
              <motion.div 
                className="absolute -right-8 sm:-right-12 md:-right-16 top-[15%] sm:top-[20%] md:top-[40%] bg-white dark:bg-gray-800 shadow-lg rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                🛠️ Backend Developer
              </motion.div>
              
              <motion.div 
                className="absolute -left-2 sm:-left-4 md:-left-16 bottom-[30%] sm:bottom-[10%] md:bottom-[15%] bg-white dark:bg-gray-800 shadow-lg rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                📱 Mobile Developer
              </motion.div>
              
              <motion.div 
                className="absolute -right-2 sm:-right-4 md:-right-16 bottom-[2%] sm:bottom-[10%] md:bottom-[15%] bg-white dark:bg-gray-800 shadow-lg rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                🚀 Full Stack Developer
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
