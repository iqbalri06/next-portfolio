"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
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

// Create duplicated arrays for continuous scrolling
const row1Skills = [...skills, ...skills, ...skills];
const row2Skills = [...skills, ...skills, ...skills]; 

export default function Skills() {
  const { t } = useLanguage();
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;
    
    if (!firstRow || !secondRow) return;
    
    // Create the animations
    const firstAnimation = firstRow.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(calc(-${100/3}%))` }
      ],
      {
        duration: 25000,
        iterations: Infinity,
        easing: 'linear'
      }
    );
    
    // Fix: Properly format string template for second animation
    const secondAnimation = secondRow.animate(
      [
        { transform: `translateX(calc(-${100/3}%))` }, // Fixed string template
        { transform: 'translateX(0)' }
      ],
      {
        duration: 25000,
        iterations: Infinity,
        easing: 'linear'
      }
    );
    
    // Clean up animations
    return () => {
      firstAnimation.cancel();
      secondAnimation.cancel();
    };
  }, []);
  
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('skills.title')} 
          subtitle={t('skills.subtitle')} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <div 
            className="bg-gradient-to-b from-blue-50/80 to-purple-50/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl shadow-lg p-8 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/5 via-purple-500/5 to-pink-500/5"/>
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-purple-600/10"
                  style={{
                    width: Math.random() * 120 + 40,
                    height: Math.random() * 120 + 40,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 20 + 15}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              
              {/* First row - moving left */}
              <div className="overflow-hidden mb-8 pb-2">
                <div 
                  ref={firstRowRef} 
                  className="flex"
                  style={{ width: "300%" }} // Triple width for smooth loop
                >
                  {row1Skills.map((skill, index) => (
                    <div
                      key={`row1-${index}`}
                      className="flex-shrink-0 w-1/12 px-3"
                    >
                      <div className="group flex flex-col items-center justify-center h-24 transition-transform duration-300 hover:-translate-y-2">
                        <div className="relative">
                          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <skill.icon className={`text-5xl ${skill.color} group-hover:scale-125 transition-all duration-300 ease-out`} />
                        </div>
                        <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-80 group-hover:opacity-100">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4 opacity-50" />
              
              {/* Second row - moving right */}
              <div className="overflow-hidden mt-8 pt-2">
                <div 
                  ref={secondRowRef} 
                  className="flex"
                  style={{ width: "300%" }} // Triple width for smooth loop
                >
                  {row2Skills.map((skill, index) => (
                    <div
                      key={`row2-${index}`}
                      className="flex-shrink-0 w-1/12 px-3"
                    >
                      <div className="group flex flex-col items-center justify-center h-24 transition-transform duration-300 hover:-translate-y-2">
                        <div className="relative">
                          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <skill.icon className={`text-5xl ${skill.color} group-hover:scale-125 transition-all duration-300 ease-out`} />
                        </div>
                        <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-80 group-hover:opacity-100">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>{t('skills.hover')}</p>
              </div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
