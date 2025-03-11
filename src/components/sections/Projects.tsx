"use client";

import { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

export default function Projects({ id }: ProjectsProps) {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      titleKey: 'project1.title',
      descriptionKey: 'project1.description',
      image: waImage,
      icon: <FaWhatsapp className="text-green-500" size={24} />,
      tags: ['Node.js', 'WhatsApp API', 'Automation'],
      github: 'https://github.com/iqbalri06/bot_wa',
      color: 'from-green-500 to-emerald-700',
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

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const projectIndicator = (index: number) => (
    <button
      key={index}
      onClick={() => setActiveProject(index)}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        activeProject === index 
          ? `bg-gradient-to-r ${projects[index].color} w-6`
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
      aria-label={`Go to project ${index + 1}`}
    />
  );

  return (
    <div 
      id={id} 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 -z-10 w-72 h-72 bg-gradient-to-b from-purple-300/10 to-pink-300/10 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-1/4 -z-10 w-64 h-64 bg-gradient-to-tr from-blue-300/10 to-cyan-300/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl"></div>
      
      <motion.div 
        style={{ opacity, y }}
        className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Large screens - Showcase layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left side - Project Image */}
            <div className="relative h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projects[activeProject].id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={cardVariants}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${projects[activeProject].color} opacity-20 blur-md -m-2`} />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                    <Image
                      src={projects[activeProject].image}
                      alt={t(projects[activeProject].titleKey)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-8 w-full">
                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl font-bold text-white mb-2"
                        >
                          {t(projects[activeProject].titleKey)}
                        </motion.h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {projects[activeProject].tags.map((tag) => (
                            <motion.span 
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                              className="px-2.5 py-0.5 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
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
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      {projects[activeProject].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t(projects[activeProject].titleKey)}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t(projects[activeProject].descriptionKey)}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Features</h4>
                    <ul className="space-y-2">
                      {projects[activeProject].highlightKeys.map((highlightKey, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
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
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      <FaGithub /> View Code
                    </a>
                    {projects[activeProject].demo && (
                      <a 
                        href={projects[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${projects[activeProject].color} text-white rounded-lg transition-transform hover:scale-105`}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Project navigation */}
          <div className="mt-12 flex justify-between items-center">
            <button 
              onClick={prevProject}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous project"
            >
              <HiChevronLeft className="text-2xl text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="flex space-x-2">
              {projects.map((_, index) => projectIndicator(index))}
            </div>
            
            <button 
              onClick={nextProject}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next project"
            >
              <HiChevronRight className="text-2xl text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        {/* Mobile and tablet layout */}
        <div className="lg:hidden space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-64 w-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 z-10`} />
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end z-20">
                  <div className="p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-white/30 backdrop-blur-sm rounded-md">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {t(project.titleKey)}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(project.descriptionKey)}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Features</h4>
                  <ul className="space-y-1">
                    {project.highlightKeys.slice(0, 3).map((highlightKey, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        {t(highlightKey)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm transition-colors"
                  >
                    <FaGithub size={14} /> Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${project.color} text-white rounded-lg text-sm`}
                    >
                      <FaExternalLinkAlt size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
