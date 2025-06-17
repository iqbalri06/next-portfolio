"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from 'react-icons/fa';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';
import ProfileCard from '@/blocks/Components/ProfileCard/ProfileCard';


const profileImage = '/assets/images/profile.png';
const iconUrl = '/assets/images/code.png';



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
      className={`relative inline-flex items-center justify-center px-7 py-3.5 overflow-hidden rounded-full group
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm'}`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative flex items-center gap-2 font-medium">
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
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full" 
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

// Modern skill badge component with enhanced responsive positioning
const SkillBadge = ({ 
  children, 
  position,
  mobilePosition,
  delay = 1.2
}: { 
  children: React.ReactNode;
  position: string;
  mobilePosition: string;
  delay?: number;
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <motion.div 
      className={`absolute ${isMobile ? mobilePosition : position} bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 z-10`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.3)",
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};



export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 375px)');
  const isTouchDevice = useMediaQuery('(pointer: coarse)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = t('hero.role');
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 2000;

  // Parallax effect on scroll (only for non-touch devices)
  useEffect(() => {
    if (isTouchDevice) return;
    
    const handleScroll = () => {
      if (!containerRef.current || isMobile) return;
      const scrollY = window.scrollY;
      containerRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isTouchDevice]);

  // Text typing effect
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

  const handleContactClick = () => {
    // Smooth scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 sm:pt-0">
      {/* Simple gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      </div>
      
      {/* Hero content container with proper z-index */}
      <div className="container mx-auto max-w-7xl z-10 px-4 sm:px-6 md:px-8 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
          
          {/* Text content - spans 7 columns on md+ screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left md:col-span-7 space-y-6 lg:space-y-8 order-2 md:order-1"
          >
            {/* Greeting with dynamic typing */}
            <div>
              <motion.p 
                className="text-lg md:text-xl font-medium text-indigo-400 dark:text-indigo-300 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {t('hero.greeting')}
              </motion.p>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 inline-flex flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-white dark:text-white mr-3">Iqbal Roudatul Irfan</span>
              </motion.h1>
              
              <div className="h-16 sm:h-20">
                <motion.h2 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 dark:from-indigo-300 dark:to-violet-300 inline-flex">
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
                </motion.h2>
              </div>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 dark:text-gray-200 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="pt-4 flex flex-wrap gap-4 sm:gap-5 justify-center md:justify-start"
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
            
            {/* Social links - Brighter colors */}
            <motion.div 
              className="flex gap-6 sm:gap-8 justify-center md:justify-start pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.a 
                href="https://github.com/iqbalri06" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white transition-all"
                whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={28} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/iqbalri" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-gray-300 hover:text-cyan-400 dark:text-gray-300 dark:hover:text-cyan-300 transition-all"
                whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={28} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/iqbalri._" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-300 hover:text-pink-400 dark:text-gray-300 dark:hover:text-pink-300 transition-all"
                whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={28} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Profile card container - spans 5 columns on md+ screens */}
          <motion.div 
            className="flex justify-center md:justify-end md:col-span-5 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            ref={containerRef}
          >            <ProfileCard
              name="Iqbal Roudatul Irfan"
              title={t('hero.role')}
              handle="iqbalri06"
              status="Online"
              contactText={t('contact.title')}
              avatarUrl={profileImage}
              iconUrl={iconUrl}
              showUserInfo={true}
              enableTilt={!isReducedMotion}
              onContactClick={handleContactClick}
              className="max-w-[350px] sm:max-w-[380px] md:max-w-[420px]"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Improved scroll indicator with touch device detection */}
      {!isTouchDevice && (
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll down</span>
          <motion.div 
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// Add these styles to your global CSS file or create a new CSS component
const styles = `
.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.donut {
  border-radius: 50%;
  box-shadow: inset 0 0 0 10px currentColor;
  background: transparent !important;
}

.bg-grid-pattern {
  mask-image: linear-gradient(to bottom, transparent, black, transparent);
}
`;
