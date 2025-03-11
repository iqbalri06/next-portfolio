"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext'; // Add this import
import SectionTitle from '@/components/SectionTitle';
import {
  SiJavascript as JavascriptIcon,
  SiTypescript as TypescriptIcon,
  SiReact as ReactIcon,
  SiNextdotjs as NextjsIcon,
  SiTailwindcss as TailwindIcon,
  SiNodedotjs as NodejsIcon,
  SiPython as PythonIcon,
  SiGit as GitIcon,
  SiPostgresql as PostgresqlIcon,
  SiPhp as PhpIcon,
  SiLaravel as LaravelIcon,
  SiBootstrap as BootstrapIcon,
} from 'react-icons/si';
import { IconType } from 'react-icons';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', icon: JavascriptIcon, color: 'text-yellow-500' },
  { name: 'TypeScript', icon: TypescriptIcon, color: 'text-blue-600' },
  { name: 'React', icon: ReactIcon, color: 'text-blue-400' },
  { name: 'Next.js', icon: NextjsIcon, color: 'text-gray-900 dark:text-white' },
  { name: 'TailwindCSS', icon: TailwindIcon, color: 'text-teal-500' },
  { name: 'Bootstrap', icon: BootstrapIcon, color: 'text-purple-600' },
  { name: 'Node.js', icon: NodejsIcon, color: 'text-green-600' },
  { name: 'PHP', icon: PhpIcon, color: 'text-indigo-600' },
  { name: 'Laravel', icon: LaravelIcon, color: 'text-red-600' },
  { name: 'Python', icon: PythonIcon, color: 'text-blue-800' },
  { name: 'Git', icon: GitIcon, color: 'text-orange-600' },
  { name: 'PostgreSQL', icon: PostgresqlIcon, color: 'text-blue-600' },
];

export default function Skills() {
  const { t } = useLanguage(); // Add language hook
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);
  
  // Number of skills to show at once based on screen size
  const skillsPerPage = 6;
  
  useEffect(() => {
    // Initialize with first set of skills
    setVisibleSkills(skills.slice(0, skillsPerPage));
    
    // Auto rotation logic
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveSkillIndex(prev => {
          const nextIndex = (prev + 1) % Math.ceil(skills.length / skillsPerPage);
          const startIdx = nextIndex * skillsPerPage;
          setVisibleSkills(skills.slice(startIdx, startIdx + skillsPerPage));
          return nextIndex;
        });
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  
  // Manually change page
  const changePage = (index: number) => {
    setIsAutoPlaying(false);
    setActiveSkillIndex(index);
    const startIdx = index * skillsPerPage;
    setVisibleSkills(skills.slice(startIdx, startIdx + skillsPerPage));
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  const totalPages = Math.ceil(skills.length / skillsPerPage);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title={t('skills.title')} 
          subtitle={t('skills.subtitle')} 
        />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5">
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20"
                    style={{
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: Math.random() * 10 + 10,
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkillIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
                    {visibleSkills.map((skill, index) => (
                      <motion.div
                        key={`${activeSkillIndex}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <motion.div 
                          className="relative flex flex-col items-center p-6 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ 
                            y: -5, 
                            scale: 1.02,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div className="relative">
                            <motion.div
                              className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <skill.icon className={`text-4xl ${skill.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                          </div>
                          <span className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 text-center relative z-10">
                            {skill.name}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Page indicators */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => changePage(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSkillIndex === idx 
                          ? 'bg-blue-600 w-6' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Go to skill page ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>{t('skills.hover')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
