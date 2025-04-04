"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useDragControls } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaPython, FaReact, FaWhatsapp } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useLanguage } from '@/context/LanguageContext';
import internalImage from '../../images/internal-apps.png';
import waImage from '../../images/bot-whatsapp.png';
import kejarImage from '../../images/kejar-id.png';
import kasirImage from '../../images/kasir.png';

interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: string | StaticImageData;
  icon: JSX.Element;
  tags: string[];
  github: string;
  demo?: string;
  color: string;
  highlightKeys: string[];
}

interface ProjectsProps {
  id?: string;
}

// Custom hook for interval with pause functionality
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  
  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Projects({ id }: ProjectsProps) {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const SLIDE_DURATION = 5000; // 5 seconds per project
  const PAUSE_AFTER_INTERACTION = 8000; // 8 seconds pause after user interaction
  
  const projects: Project[] = [
    {
      id: 1,
      titleKey: 'project1.title',
      descriptionKey: 'project1.description',
      image: waImage,
      icon: <FaWhatsapp className="text-emerald-400" size={24} />,
      tags: ['Node.js', 'WhatsApp API', 'Automation'],
      github: 'https://github.com/iqbalri06/bot_wa',
      color: 'from-emerald-400 to-teal-600',
      highlightKeys: [
        'project1.highlight1',
        'project1.highlight2',
        'project1.highlight3',
        'project1.highlight4'
      ]
    },
    {
      id: 2,
      titleKey: 'project2.title',
      descriptionKey: 'project2.description',
      image: kejarImage,
      icon: <FaRobot className="text-blue-500" size={24} />,
      tags: ['Python', 'Selenium', 'Web Automation'],
      github: 'https://github.com/iqbalri06/bot_kejar_v.2.0',
      color: 'from-blue-500 to-indigo-700',
      highlightKeys: [
        'project2.highlight1',
        'project2.highlight2',
        'project2.highlight3',
        'project2.highlight4'
      ]
    },
    {
      id: 3,
      titleKey: 'project3.title',
      descriptionKey: 'project3.description',
      image: kasirImage,
      icon: <FaPython className="text-yellow-500" size={24} />,
      tags: ['Python', 'Django', 'PostgreSQL', 'Bootstrap'],
      github: 'https://github.com/iqbalri06/kasir_apps',
      color: 'from-yellow-400 to-orange-700',
      highlightKeys: [
        'project3.highlight1',
        'project3.highlight2',
        'project3.highlight3',
        'project3.highlight4'
      ]
    },
    {
      id: 4,
      titleKey: 'project4.title',
      descriptionKey: 'project4.description',
      image: internalImage,
      icon: <FaReact className="text-cyan-500" size={24} />,
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Auth0'],
      github: '#',
      color: 'from-cyan-500 to-blue-700',
      highlightKeys: [
        'project4.highlight1',
        'project4.highlight2',
        'project4.highlight3',
        'project4.highlight4'
      ]
    },
  ];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  // Auto-advance carousel - always running
  useInterval(() => {
    if (!isPaused) {
      // Update progress bar
      setAutoPlayProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide and reset progress
          setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
          setMobileProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 50)); // Smooth progression
      });
    }
  }, 50); // Update progress every 50ms (20 times per second)

  // Reset progress when manually changing projects
  useEffect(() => {
    setAutoPlayProgress(0);
  }, [activeProject, mobileProjectIndex]);

  // Temporarily pause auto-sliding after user interaction
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    setAutoPlayProgress(0);
    
    // Resume after PAUSE_AFTER_INTERACTION milliseconds
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_INTERACTION);
    
    return () => clearTimeout(timer);
  }, []);

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    handleUserInteraction();
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    handleUserInteraction();
  };

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotateX: 5
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.9,
      rotateX: -5,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const projectIndicator = (index: number) => (
    <button
      key={index}
      onClick={() => setActiveProject(index)}
      className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
        activeProject === index 
          ? `bg-gradient-to-r ${projects[index].color} w-8 shadow-lg shadow-${projects[index].color.split('-')[1]}/40`
          : 'bg-gray-400/30 dark:bg-gray-600/50'
      }`}
      aria-label={`Go to project ${index + 1}`}
    >
      {activeProject === index && (
        <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-75"></span>
      )}
    </button>
  );

  // Create a starry background
  const renderStars = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 5}s`;
      
      return (
        <div 
          key={i}
          className="absolute rounded-full bg-white dark:bg-blue-100"
          style={{
            top,
            left,
            width: size,
            height: size,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle 4s infinite ${animationDelay}`
          }}
        />
      );
    });
  };

  // Function to handle mobile swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right
      setMobileProjectIndex(prev => 
        prev === 0 ? projects.length - 1 : prev - 1
      );
      handleUserInteraction();
    } else if (info.offset.x < -100) {
      // Swiped left
      setMobileProjectIndex(prev => 
        prev === projects.length - 1 ? 0 : prev + 1
      );
      handleUserInteraction();
    }
  };

  return (
    <div 
      id={id} 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-black"
      ref={containerRef}
    >
      {/* Space-themed background elements */}
      <div className="stars-container absolute inset-0 -z-10 opacity-70">
        {renderStars()}
      </div>
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,rgba(100,90,255,0.15),transparent_70%)]"></div>
      <div className="absolute -top-20 right-1/3 -z-10 w-96 h-96 rounded-full blur-[120px] bg-blue-600/20"></div>
      <div className="absolute top-1/3 left-1/4 -z-10 w-80 h-80 rounded-full blur-[100px] bg-purple-600/20"></div>
      <div className="absolute bottom-20 right-1/4 -z-10 w-64 h-64 rounded-full blur-[80px] bg-indigo-600/20"></div>
      
      {/* Planet decorative element */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-purple-800/30 to-indigo-600/30 blur-sm border border-purple-500/20"></div>
      
      {/* Orbital line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-2 border-purple-500/5 rounded-full -z-10 rotate-12"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] border border-blue-500/10 rounded-full -z-10 -rotate-12"></div>
      
      <motion.div 
        style={{ opacity, y }}
        className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="flex justify-center items-center mb-3">
            <div className="w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50 mr-3"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t('projects.title')}
            </h2>
            <div className="w-4 h-4 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50 ml-3"></div>
          </div>
          <div className="w-28 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg opacity-80">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Large screens - Showcase layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left side - Project Image */}
            <div className="relative h-[500px] w-full perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projects[activeProject].id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  variants={cardVariants}
                  className="absolute inset-0 w-full h-full"
                  onHoverStart={handleUserInteraction}
                >
                  {/* Enhanced glass card effect */}
                  <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${projects[activeProject].color} opacity-70 blur-md transform -rotate-2`} />
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>
                  <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur"></div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 backdrop-blur-xl transform rotate-1">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <Image
                      src={projects[activeProject].image}
                      alt={t(projects[activeProject].titleKey)}
                      fill
                      className="object-cover transform scale-105 hover:scale-110 transition-all duration-1000"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end z-20">
                      <div className="p-8 w-full">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-3 mb-3"
                        >
                          <div className={`p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm ring-1 ring-white/20 shadow-lg shadow-${projects[activeProject].color.split('-')[1]}/20`}>
                            {projects[activeProject].icon}
                          </div>
                          <h3 className="text-3xl font-bold text-white drop-shadow-md">
                            {t(projects[activeProject].titleKey)}
                          </h3>
                        </motion.div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {projects[activeProject].tags.map((tag, idx) => (
                            <motion.span 
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="px-3 py-1 text-sm font-medium bg-slate-700/50 text-blue-200 rounded-full backdrop-blur-sm border border-slate-600/50"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Auto-play progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 z-30">
                      <div 
                        className={`h-full bg-gradient-to-r ${projects[activeProject].color} rounded-full transition-all duration-200 ease-linear`}
                        style={{ width: `${autoPlayProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-30 flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right side - Project Details */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={projects[activeProject].id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={cardVariants}
                  className="backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl bg-slate-900/50 overflow-hidden relative"
                  onHoverStart={handleUserInteraction}
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>
                  <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${projects[activeProject].color} opacity-30 blur-3xl`}></div>

                  <div className="flex items-center space-x-3 mb-7">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${projects[activeProject].color} bg-opacity-10`}>
                      {projects[activeProject].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {t(projects[activeProject].titleKey)}
                    </h3>
                  </div>
                  
                  <p className="text-blue-100/80 mb-8 leading-relaxed">
                    {t(projects[activeProject].descriptionKey)}
                  </p>
                  
                  <div className="mb-8">
                    <div className="inline-flex items-center mb-4 space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                      <h4 className="text-lg font-semibold text-blue-200">Key Features</h4>
                    </div>
                    <ul className="space-y-3">
                      {projects[activeProject].highlightKeys.map((highlightKey, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start text-blue-50/90"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3 mt-2"></div>
                          {t(highlightKey)}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <a 
                      href={projects[activeProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg transition-all hover:scale-105 border border-slate-700/50"
                    >
                      <FaGithub /> View Code
                    </a>
                    {projects[activeProject].demo && (
                      <a 
                        href={projects[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${projects[activeProject].color} text-white rounded-lg transition-all hover:scale-105 shadow-lg`}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Project navigation - simplified without play/pause */}
          <div className="mt-16 flex justify-between items-center">
            <button 
              onClick={prevProject}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group hover:shadow-blue-500/20 hover:border-blue-400/30 active:scale-95"
              aria-label="Previous project"
            >
              <HiChevronLeft className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
            </button>
            
            <div className="flex space-x-3 bg-slate-800/30 px-6 py-3 rounded-full backdrop-blur-sm border border-slate-700/30">
              {projects.map((_, index) => projectIndicator(index))}
            </div>
            
            <button 
              onClick={nextProject}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group hover:shadow-blue-500/20 hover:border-blue-400/30 active:scale-95"
              aria-label="Next project"
            >
              <HiChevronRight className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
            </button>
          </div>
        </div>
        
        {/* Mobile and tablet layout - with auto-sliding */}
        <div className="lg:hidden">
          {/* Project switcher indicators - simplified */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-slate-800/30 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700/30">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMobileProjectIndex(index);
                    handleUserInteraction();
                  }}
                  className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    mobileProjectIndex === index 
                      ? `bg-gradient-to-r ${projects[index].color} w-6 shadow-lg`
                      : 'bg-gray-400/30 dark:bg-gray-600/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                >
                  {mobileProjectIndex === index && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-75"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Swipeable project cards with auto-sliding */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileProjectIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => handleUserInteraction()}
              className="backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-slate-900/40 relative touch-pan-y"
            >
              {/* Enhanced card design */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>
              <div className={`absolute -left-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${projects[mobileProjectIndex].color} opacity-20 blur-3xl`}></div>
              
              {/* Auto-play progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 z-50">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${projects[mobileProjectIndex].color} rounded-full transition-all duration-200 ease-linear`}
                  style={{ width: `${autoPlayProgress}%` }}
                ></motion.div>
              </div>
              
              <div className="relative h-72 w-full">
                {/* Glass overlay for image */}
                <div className="absolute inset-0 z-10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${projects[mobileProjectIndex].color} opacity-20 mix-blend-overlay`}></div>
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
                </div>
                
                <Image
                  src={projects[mobileProjectIndex].image}
                  alt={t(projects[mobileProjectIndex].titleKey)}
                  fill
                  className="object-cover transform scale-105 transition-transform duration-700"
                  sizes="100vw"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent flex items-start pt-8 z-20">
                  <div className="px-6 w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${projects[mobileProjectIndex].color} bg-opacity-80 shadow-lg shadow-${projects[mobileProjectIndex].color.split('-')[1]}/40`}>
                        {projects[mobileProjectIndex].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-md">
                        {t(projects[mobileProjectIndex].titleKey)}
                      </h3>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      {projects[mobileProjectIndex].tags.map((tag, idx) => (
                        <span 
                          key={tag}
                          className={`px-3 py-1.5 text-xs font-medium bg-slate-800/60 text-blue-100 rounded-full backdrop-blur-md border border-slate-700/50 shadow-inner`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Swipe indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-white/60 text-xs z-30">
                  <HiChevronLeft size={16} />
                  <span>Swipe</span>
                  <HiChevronRight size={16} />
                </div>
                
                <div className="absolute top-3 right-3 z-30 flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                </div>
              </div>
              
              <div className="p-6">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-100/80 mb-6 leading-relaxed"
                >
                  {t(projects[mobileProjectIndex].descriptionKey)}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center mb-3 space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                    <h4 className="text-lg font-semibold text-blue-200">Key Features</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {projects[mobileProjectIndex].highlightKeys.slice(0, 3).map((highlightKey, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="flex items-start text-sm text-blue-100/80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3 mt-1.5"></div>
                        {t(highlightKey)}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-3"
                >
                  <a 
                    href={projects[mobileProjectIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/70 hover:bg-slate-700/80 text-white rounded-xl text-sm transition-all active:scale-95 border border-slate-700/50 w-1/2"
                  >
                    <FaGithub size={16} /> View Code
                  </a>
                  {projects[mobileProjectIndex].demo && (
                    <a 
                      href={projects[mobileProjectIndex].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${projects[mobileProjectIndex].color} text-white rounded-xl text-sm shadow-md transition-all active:scale-95 w-1/2`}
                    >
                      <FaExternalLinkAlt size={16} /> Live Demo
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons for mobile */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={() => {
                setMobileProjectIndex(prev => prev === 0 ? projects.length - 1 : prev - 1);
                handleUserInteraction();
              }}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group active:scale-95"
              aria-label="Previous project"
            >
              <HiChevronLeft className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
            </button>
            
            <button 
              onClick={() => {
                setMobileProjectIndex(prev => prev === projects.length - 1 ? 0 : prev + 1);
                handleUserInteraction();
              }}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group active:scale-95"
              aria-label="Next project"
            >
              <HiChevronRight className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Add a global style for the twinkling stars animation */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
