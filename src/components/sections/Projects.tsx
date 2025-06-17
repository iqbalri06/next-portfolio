"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useDragControls } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaPython, FaReact, FaWhatsapp } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useLanguage } from '@/context/LanguageContext';


const internalImage = '/assets/images/internal-apps.png';
const waImage = '/assets/images/bot-whatsapp.png';
const kejarImage = '/assets/images/kejar-id.png';
const kasirImage = '/assets/images/kasir.png';

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
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.9,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
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

        {/* Unified project card design for all screens */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              variants={cardVariants}
              className="w-full rounded-2xl overflow-hidden backdrop-blur-md bg-slate-900/40 border border-white/10 shadow-2xl"
              onHoverStart={handleUserInteraction}
            >
              {/* Progress bar */}
              <div className="relative w-full h-1">
                <div 
                  className={`h-full bg-gradient-to-r ${projects[activeProject].color} transition-all duration-200 ease-linear`}
                  style={{ width: `${autoPlayProgress}%` }}
                ></div>
              </div>
              
              {/* For Mobile: Stacked Layout (Image on top, content below) */}
              <div className="block md:hidden">
                {/* Image Section */}
                <div className="relative h-64 w-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} opacity-20 mix-blend-overlay z-10`}></div>
                  <Image
                    src={projects[activeProject].image}
                    alt={t(projects[activeProject].titleKey)}
                    fill
                    className="object-cover transform hover:scale-105 transition-all duration-1000 z-0"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                  
                  {/* Floating Project Icon */}
                  <div className="absolute bottom-0 right-0 m-4 z-30">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${projects[activeProject].color} bg-opacity-90 shadow-lg shadow-${projects[activeProject].color.split('-')[1]}/40`}>
                      {projects[activeProject].icon}
                    </div>
                  </div>
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent z-20"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(projects[activeProject].titleKey)}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[activeProject].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-medium bg-slate-800/70 text-blue-100 rounded-full backdrop-blur-md border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-blue-100/80 text-sm mb-4 leading-relaxed">
                    {t(projects[activeProject].descriptionKey)}
                  </p>
                  
                  {/* Key features */}
                  <div className="mb-5">
                    <div className="inline-flex items-center mb-2 space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      <h4 className="text-base font-semibold text-blue-200">Key Features</h4>
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {projects[activeProject].highlightKeys.map((highlightKey, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="flex items-start text-xs text-blue-100/80"
                        >
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-2 mt-1.5 flex-shrink-0"></div>
                          <span>{t(highlightKey)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Project links */}
                  <div className="flex gap-3">
                    <a 
                      href={projects[activeProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm rounded-lg transition-all border border-slate-700/50"
                    >
                      <FaGithub className="text-sm" /> View Code
                    </a>
                    {projects[activeProject].demo && (
                      <a 
                        href={projects[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${projects[activeProject].color} text-white text-sm rounded-lg transition-all`}
                      >
                        <FaExternalLinkAlt className="text-sm" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* For Tablet & Desktop: Side by Side Layout with Full-Width Image */}
              <div className="hidden md:block">
                <div className="relative overflow-hidden">
                  <div className="h-80 lg:h-[28rem] relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} opacity-20 mix-blend-overlay z-10`}></div>
                    <Image
                      src={projects[activeProject].image}
                      alt={t(projects[activeProject].titleKey)}
                      fill
                      className="object-cover transform scale-105 hover:scale-110 transition-all duration-1000 z-0"
                      sizes="100vw"
                      priority
                      unoptimized
                    />
                    
                    {/* Minimal gradient overlay, just on the right side */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-900/70 to-transparent z-20"></div>
                    
                    {/* Content positioned on the right side of image */}
                    <div className="absolute inset-0 flex items-center justify-end z-30">
                      <div className="w-full max-w-sm md:max-w-xs lg:max-w-md p-4 lg:p-5 mr-4 lg:mr-10">
                        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 lg:p-5 border border-white/10 shadow-xl">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${projects[activeProject].color} shadow-lg shadow-${projects[activeProject].color.split('-')[1]}/40`}>
                              {projects[activeProject].icon}
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white">
                              {t(projects[activeProject].titleKey)}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {projects[activeProject].tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-2.5 py-0.5 text-xs font-medium bg-slate-800/70 text-blue-100 rounded-full backdrop-blur-md border border-slate-700/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-blue-100/90 mb-3 leading-relaxed text-xs lg:text-sm">
                            {t(projects[activeProject].descriptionKey)}
                          </p>
                          
                          {/* Key features - more compact */}
                          <div className="mb-4">
                            <div className="inline-flex items-center mb-1.5 space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                              <h4 className="text-sm lg:text-base font-semibold text-blue-200">Key Features</h4>
                            </div>
                            <ul className="grid grid-cols-2 gap-1.5 text-xs">
                              {projects[activeProject].highlightKeys.map((highlightKey, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + idx * 0.1 }}
                                  className="flex items-start text-blue-100/80"
                                >
                                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-1.5 mt-1.5 flex-shrink-0"></div>
                                  <span>{t(highlightKey)}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Project links - more compact */}
                          <div className="flex gap-2">
                            <a 
                              href={projects[activeProject].github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-slate-800/80 hover:bg-slate-700/80 text-white text-xs lg:text-sm rounded-lg transition-all hover:scale-105 border border-slate-700/50"
                            >
                              <FaGithub size={14} /> View Code
                            </a>
                            {projects[activeProject].demo && (
                              <a 
                                href={projects[activeProject].demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-gradient-to-r ${projects[activeProject].color} text-white text-xs lg:text-sm rounded-lg transition-all hover:scale-105 shadow-lg`}
                              >
                                <FaExternalLinkAlt size={14} /> Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Project navigation */}
          <div className="mt-8 flex justify-between items-center">
            {/* Previous project button positioned center-left */}
            <div className="flex-1 flex justify-center">
              <button 
                onClick={prevProject}
                className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group hover:shadow-blue-500/20 hover:border-blue-400/30 active:scale-95"
                aria-label="Previous project"
              >
                <HiChevronLeft className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
              </button>
            </div>
            
            <div className="flex space-x-3 bg-slate-800/30 px-6 py-3 rounded-full backdrop-blur-sm border border-slate-700/30">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveProject(index);
                    handleUserInteraction();
                  }}
                  className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeProject === index 
                      ? `bg-gradient-to-r ${projects[index].color} w-6 shadow-lg shadow-${projects[index].color.split('-')[1]}/40`
                      : 'bg-gray-400/30 dark:bg-gray-600/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                >
                  {activeProject === index && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-75"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Next project button positioned center-right */}
            <div className="flex-1 flex justify-center">
              <button 
                onClick={nextProject}
                className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/60 shadow-lg border border-white/10 backdrop-blur-sm transition-all group hover:shadow-blue-500/20 hover:border-blue-400/30 active:scale-95"
                aria-label="Next project"
              >
                <HiChevronRight className="text-2xl text-white group-hover:text-blue-300 transition-colors" />
              </button>
            </div>
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
