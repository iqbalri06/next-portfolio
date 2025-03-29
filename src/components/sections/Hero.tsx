"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';
import profileImage from '/src/images/profile.png';

// Modern animated button component with enhanced design
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

// Animated floating particle
const FloatingParticle = ({ 
  size, 
  color, 
  initialPosition,
  duration = 20
}: {
  size: number,
  color: string,
  initialPosition: {x: string, y: string},
  duration?: number
}) => {
  return (
    <motion.div
      className={`absolute rounded-full opacity-70 ${color}`}
      style={{
        width: size,
        height: size,
        left: initialPosition.x,
        top: initialPosition.y,
      }}
      animate={{
        y: ["0%", "-30%", "30%", "0%"],
        x: ["0%", "20%", "-20%", "0%"],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }}
    />
  );
};

// Animated geometric shape
const GeometricShape = ({ 
  shape, 
  color, 
  size, 
  position, 
  duration = 20,
  delay = 0
}: { 
  shape: 'circle' | 'square' | 'triangle' | 'donut',
  color: string, 
  size: number,
  position: {x: string, y: string},
  duration?: number,
  delay?: number
}) => {
  const shapes = {
    circle: "rounded-full",
    square: "rounded-md rotate-45",
    triangle: "triangle",
    donut: "donut"
  };

  return (
    <motion.div
      className={`absolute ${shapes[shape]} ${color}`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1],
        rotate: shape === 'square' ? [45, 135, 45] : 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

// Modern wave component
const WaveAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute w-full overflow-hidden ${className}`} style={{ height: '100px' }}>
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 dark:from-indigo-900/20 dark:via-violet-900/20 dark:to-indigo-900/20"
        style={{
          maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' opacity='.25'/%3E%3C/svg%3E\")",
          maskSize: '100% 100%',
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' opacity='.25'/%3E%3C/svg%3E\")",
          WebkitMaskSize: '100% 100%',
        }}
        animate={{ 
          x: ['-50%', '0%'],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          repeatType: "loop",
          ease: "linear"
        }}
      />
    </div>
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
          
          {/* Profile image container - spans 5 columns on md+ screens */}
          <motion.div 
            className="flex justify-center md:justify-end md:col-span-5 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            ref={containerRef}
          >
            <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Enhanced decorative elements with animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-80"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              
              {/* Profile image with modern frame */}
              <motion.div 
                className="relative w-full h-full bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 rounded-full p-1.5 shadow-2xl"
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)",
                  transition: { duration: 0.4 } 
                }}
              >
                <div className="absolute inset-1 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-900/80 dark:to-gray-900/50 rounded-full backdrop-blur-sm"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-8 border-white/90 dark:border-gray-900/90 shadow-inner">
                  <Image 
                    src={profileImage}
                    alt="Iqbal Roudatul Irfan"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, 40vw"
                  />
                </div>
                
                {/* Animated orbit ring decoration */}
                <motion.div 
                  className="absolute -inset-4 border-2 border-dashed border-indigo-300/30 dark:border-indigo-700/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute -inset-8 border-2 border-dashed border-violet-300/20 dark:border-violet-700/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Skill badges with improved responsive positioning */}
                <SkillBadge 
                  position="-left-16 top-[10%]" 
                  mobilePosition="-left-14 -top-2"
                  delay={1.2}
                >
                  <span className="flex items-center gap-1.5">💻 Frontend Developer</span>
                </SkillBadge>
                
                <SkillBadge 
                  position="-right-14 top-[25%]" 
                  mobilePosition="-right-14 top-[15%]"
                  delay={1.4}
                >
                  <span className="flex items-center gap-1.5">🛠️ Backend Developer</span>
                </SkillBadge>
                
                <SkillBadge 
                  position="-left-16 bottom-[25%]" 
                  mobilePosition="-left-14 bottom-[15%]"
                  delay={1.6}
                >
                  <span className="flex items-center gap-1.5">📱 Mobile Developer</span>
                </SkillBadge>
                
                <SkillBadge 
                  position="-right-14 bottom-[15%]" 
                  mobilePosition="-right-14 -bottom-2"
                  delay={1.8}
                >
                  <span className="flex items-center gap-1.5">🚀 Full Stack</span>
                </SkillBadge>
              </motion.div>
            </div>
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

      {/* Mobile swipe indicator for touch devices */}
      {isTouchDevice && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Swipe up</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 dark:text-gray-500"
          >
            ↑
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
