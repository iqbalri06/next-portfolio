"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BiCode, BiBrain, BiDevices } from 'react-icons/bi';
import { FaLaptopCode, FaUserTie } from 'react-icons/fa';
import proImage from '/src/images/profile.png';
import { useLanguage } from '@/context/LanguageContext';
import Waves from '@/components/ui/Waves';

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  skills?: string[];
}

const getExperiences = (lang: 'en' | 'id'): ExperienceItem[] => ({
  en: [
    {
      year: "Jul 2024 - Dec 2024",
      title: "Frontend Developer",
      company: "Nawatech",
      description: "Completed a 6-month internship developing web applications and learning industry best practices.",
      skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Bootstrap", "Material UI", "REST APIs"]
    },
    {
      year: "2025 - Present",
      title: "Frontend Developer (Mobile)",
      company: "Perumda Tirta Pakuan Kota Bogor",
      description: "Working as a freelance frontend developer focusing on mobile applications development.",
      skills: ["React Native", "Flutter", "UI/UX Design", "Figma", "Android Development", "Redux/MobX", "Native APIs", "Firebase", "REST APIs", "Mobile Navigation", "Mobile UI Components"]
    }
  ],
  id: [
    {
      year: "Jul 2024 - Des 2024",
      title: "Frontend Developer",
      company: "Nawatech",
      description: "Menyelesaikan magang 6 bulan mengembangkan aplikasi web dan mempelajari praktik terbaik industri.",
      skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Bootstrap", "Material UI", "REST APIs"]
    },
    {
      year: "2025 - Sekarang",
      title: "Frontend Developer (Mobile)",
      company: "Perumda Tirta Pakuan Kota Bogor",
      description: "Bekerja sebagai frontend developer freelance yang fokus pada pengembangan aplikasi mobile.",
      skills: ["React Native", "Flutter", "Desain UI/UX", "Figma", "Pengembangan Android", "Redux/MobX", "Native APIs", "Firebase", "REST APIs", "Navigasi Mobile", "Komponen UI Mobile"]
    }
  ]
})[lang];

interface AboutProps {
  id?: string;
}

// Enhanced glass-card effect component with better hover animations
const GlassCard = ({ 
  children, 
  className = "",
  delay = 0,
  hover = true
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  hover?: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={hover ? { 
      y: -4, // Reduced hover lift for more subtle effect
      boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    } : undefined}
    className={`bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-lg border border-white/10 dark:border-gray-800/30 
      shadow-md shadow-gray-900/5 dark:shadow-black/10 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

// Simplified section title with animated underline effect
const SectionTitle = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
    viewport={{ once: true }}
    className="mb-10 md:mb-16 relative text-center md:text-left" // Added text-center for mobile
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white inline-block">
      {title}
      <div className="relative h-1 mt-3">
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute h-full bg-indigo-500 rounded-full"
        />
      </div>
    </h2>
  </motion.div>
);

// More minimalist skill tag component
const SkillTag = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors = {
    blue: "bg-blue-900/20 text-blue-300 border-blue-800/30",
    purple: "bg-purple-900/20 text-purple-300 border-purple-800/30",
    indigo: "bg-indigo-900/20 text-indigo-300 border-indigo-800/30",
    pink: "bg-pink-900/20 text-pink-300 border-pink-800/30",
    green: "bg-green-900/20 text-green-300 border-green-800/30",
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${colors[color as keyof typeof colors]}`}>
      {children}
    </span>
  );
};

// Simplified floating decorative icons component
const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      {[1, 2, 3].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0.1 + Math.random() * 0.2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: 0.5 + Math.random() * 0.3,
          }}
          animate={{ 
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          className="absolute text-indigo-500/10 dark:text-indigo-400/5 z-0"
        >
          {i % 3 === 0 ? (
            <BiCode size={30 + Math.random() * 20} />
          ) : i % 3 === 1 ? (
            <FaLaptopCode size={30 + Math.random() * 20} />
          ) : (
            <BiDevices size={30 + Math.random() * 20} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function About({ id }: AboutProps) {
  const { language, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const experiences = getExperiences(language);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Auto-highlight experience items
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev === null) return 0;
        return (prev + 1) % experiences.length;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [experiences.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const roleColors = ["blue", "purple", "green", "indigo", "pink"];
  
  if (!mounted) {
    return <section id={id} className="py-16 relative overflow-hidden w-full" />;
  }

  return (
    <section 
      id={id} 
      className="py-16 md:py-24 relative overflow-hidden w-full"
      ref={containerRef}
    >
      {/* Simplified background */}
      <div className="absolute inset-0 opacity-20">
        <Waves
          lineColor="rgba(99, 102, 241, 0.1)"
          backgroundColor="transparent"
          waveSpeedX={0.01}
          waveSpeedY={0.01}
          waveAmpX={30}
          waveAmpY={15}
          friction={0.9}
          tension={0.01}
          maxCursorMove={100}
          xGap={20}
          yGap={50}
          className="z-0 opacity-70"
        />
      </div>
      
      <FloatingIcons />
      
      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-5 relative z-10 max-w-5xl" // Streamlined container
      >
        <SectionTitle title={t('about.title')} />
        
        <div className="flex flex-col items-center md:flex-row md:items-start gap-10 md:gap-12">
          {/* Profile section - Centered on mobile */}
          <div className="w-full md:w-2/5 flex flex-col items-center md:items-start space-y-6">
            <GlassCard className="p-2 overflow-hidden w-full max-w-[320px]">
              <div className="relative h-[400px] w-full overflow-hidden rounded-md">
                {/* Simplified photo frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 rounded-md z-0" />
                
                <Image
                  src={proImage}
                  alt="Iqbal Roudatul Irfan"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                  className="object-cover z-0"
                  style={{ objectPosition: "center 10%" }}
                />
                
                {/* Minimalist info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-30">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-block px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm mb-2">
                      <span className="text-xs font-medium text-white/90">FullStack Developer</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1 text-white">Iqbal Roudatul Irfan</h3>
                    
                    <p className="text-xs text-white/80 max-w-[90%]">
                      Passionate web & mobile developer focused on creating beautiful user experiences
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* Role cards - Centered on mobile */}
            <div className="space-y-3 w-full max-w-[320px]">
              {[{ 
                  icon: <BiCode className="text-2xl text-blue-400" />, 
                  title: t('about.role.fullstack'),
                  desc: t('about.role.fullstack.description'),
                  color: 'from-blue-500/10 to-blue-600/5',
                  iconBg: 'bg-blue-900/20'
                },
                { 
                  icon: <BiBrain className="text-2xl text-purple-400" />, 
                  title: t('about.role.problemsolver'),
                  desc: t('about.role.problemsolver.description'),
                  color: 'from-purple-500/10 to-purple-600/5',
                  iconBg: 'bg-purple-900/20'
                },
                { 
                  icon: <BiDevices className="text-2xl text-green-400" />, 
                  title: t('about.role.uiux'),
                  desc: t('about.role.uiux.description'),
                  color: 'from-green-500/10 to-green-600/5',
                  iconBg: 'bg-green-900/20'
                }
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r 
                    ${role.color}
                    backdrop-blur-sm border border-white/10 dark:border-gray-800/30`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.iconBg}`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-base text-gray-900 dark:text-white">{role.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{role.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bio and Experience section - Centered on mobile */}
          <div className="w-full md:w-3/5 space-y-8">
            <GlassCard 
              className="p-6 md:p-7 space-y-5 w-full max-w-[600px] mx-auto md:mx-0"
              delay={0.2}
            >
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold text-indigo-500 dark:text-indigo-400"
              >
                {t('about.greeting')}
              </motion.h3>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  {t('about.bio.part1')}
                </p>
                <div className="my-3 relative">
                  <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  {t('about.bio.part2')}
                </p>
              </div>
            </GlassCard>
            
            {/* Enhanced experience timeline with minimalist design */}
            <GlassCard className="p-6 md:p-7 w-full max-w-[600px] mx-auto md:mx-0" delay={0.3}>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-3 h-3 rounded-full bg-indigo-500 flex-shrink-0"></span>
                {t('about.experience.title')}
              </h4>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="relative pl-6"
                  >
                    {/* Simplified timeline dot and line */}
                    <div className="absolute left-0 top-1 bottom-0 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-indigo-500' : 'bg-indigo-400/70'} z-10`}></div>
                      {index !== experiences.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
                      )}
                    </div>
                    
                    {/* Content with clean, minimalist design */}
                    <div className="pl-4">
                      <div className="text-xs font-medium text-indigo-500 dark:text-indigo-400 mb-1">{exp.year}</div>
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-1.5">
                        <h5 className="text-base font-semibold text-gray-900 dark:text-white">{exp.title}</h5>
                        <div className="bg-indigo-900/20 text-indigo-300 px-2 py-0.5 rounded-md text-xs font-medium">
                          {exp.company}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{exp.description}</p>
                      
                      {exp.skills && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, i) => {
                            const colorIndex = i % roleColors.length;
                            return (
                              <SkillTag key={i} color={roleColors[colorIndex]}>
                                {skill}
                              </SkillTag>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
