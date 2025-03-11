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
      y: -8, 
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    } : undefined}
    className={`bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-800/50 
      shadow-xl shadow-gray-900/10 dark:shadow-black/20 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

// Enhanced section title with animated underline effect
const SectionTitle = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
    viewport={{ once: true }}
    className="mb-14 md:mb-20 relative"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white inline-block">
      {title}
      <div className="relative h-1.5 mt-4">
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          viewport={{ once: true }}
          className="absolute -right-1 -top-1 w-4 h-4 bg-purple-500 rounded-full blur-[2px]"
        />
      </div>
    </h2>
  </motion.div>
);

// Enhanced skill tag component with hover effect
const SkillTag = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors = {
    blue: "bg-blue-900/30 text-blue-300 border-blue-800/50 hover:bg-blue-800/40",
    purple: "bg-purple-900/30 text-purple-300 border-purple-800/50 hover:bg-purple-800/40",
    indigo: "bg-indigo-900/30 text-indigo-300 border-indigo-800/50 hover:bg-indigo-800/40",
    pink: "bg-pink-900/30 text-pink-300 border-pink-800/50 hover:bg-pink-800/40",
    green: "bg-green-900/30 text-green-300 border-green-800/50 hover:bg-green-800/40",
  };

  return (
    <motion.span 
      whileHover={{ y: -2, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-300 ${colors[color as keyof typeof colors]}`}
    >
      {children}
    </motion.span>
  );
};

// New floating decorative icons component
const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0.1 + Math.random() * 0.3,
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: 0.5 + Math.random() * 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: [0, -15, 0, 15, 0],
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          className="absolute text-indigo-500/10 dark:text-indigo-400/5 z-0"
        >
          {i % 3 === 0 ? (
            <BiCode size={30 + Math.random() * 40} />
          ) : i % 3 === 1 ? (
            <FaLaptopCode size={30 + Math.random() * 40} />
          ) : (
            <BiDevices size={30 + Math.random() * 40} />
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
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  const roleColors = ["blue", "purple", "green", "indigo", "pink"];
  
  if (!mounted) {
    return <section id={id} className="py-24 relative overflow-hidden w-full" />;
  }

  return (
    <section 
      id={id} 
      className="py-24 md:py-36 relative overflow-hidden w-full"
      ref={containerRef}
    >
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 opacity-30">
        <Waves
          lineColor="rgba(99, 102, 241, 0.15)"
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.01}
          waveAmpX={50}
          waveAmpY={25}
          friction={0.9}
          tension={0.01}
          maxCursorMove={150}
          xGap={14}
          yGap={40}
          className="z-0 opacity-80"
        />
      </div>
      
      <FloatingIcons />
      
      {/* Enhanced background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/95 pointer-events-none z-[1]"></div>
      
      {/* Enhanced decorative elements with animations */}
      <motion.div 
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-40 left-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
        className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 sm:px-8 relative z-10 max-w-7xl"
      >
        <SectionTitle title={t('about.title')} />
        
        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mt-10 md:mt-20">
          {/* Enhanced profile card with better photo styling */}
          <div className="md:col-span-5 space-y-8">
            <GlassCard className="p-3 overflow-hidden" delay={0.2}>
              <motion.div 
                className="relative h-[460px] w-full overflow-hidden rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              >
                {/* Creative photo frame with animated border */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-blue-500/30 rounded-xl z-0">
                  <motion.div
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0 bg-gradient-conic from-indigo-500/30 via-purple-500/20 to-blue-500/30 rounded-xl"
                  />
                </div>
                
                {/* Animated spotlight effect */}
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] rounded-xl z-10"
                  style={{ backgroundSize: '150% 150%' }}
                />
                
                {/* Animated border */}
                <div className="absolute inset-[3px] rounded-lg z-20 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 border-2 border-white/20 rounded-lg z-10 pointer-events-none"
                  />
                </div>
                
                {/* Improved image with artistic overlay */}
                <Image
                  src={proImage}
                  alt="Iqbal Roudatul Irfan"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover z-0 transition-all duration-700 filter saturate-[1.1]"
                  style={{ 
                    objectPosition: "center 10%",
                    transform: "scale(1.02)",
                    mixBlendMode: "normal",
                  }}
                />
                
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-30">
                  {/* Enhanced info panel with minimal design */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-6"
                  >
                    <div className="mb-1">
                      {/* Minimalist role badge */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-2"
                      >
                        <span className="text-[10px] font-medium text-white/90">FullStack Developer</span>
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 text-white">Iqbal Roudatul Irfan</h3>
                    
                    <p className="text-[11px] text-white/80 max-w-[80%]">
                      Passionate web & mobile developer focused on creating beautiful user experiences
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </GlassCard>
            
            {/* Enhanced role cards with better animations */}
            <div className="space-y-4 mt-8">
              {[
                { 
                  icon: <BiCode className="text-3xl text-blue-400" />, 
                  title: t('about.role.fullstack'),
                  desc: t('about.role.fullstack.description'),
                  color: 'from-blue-500/10 to-blue-600/5',
                  iconBg: 'bg-blue-900/20'
                },
                { 
                  icon: <BiBrain className="text-3xl text-purple-400" />, 
                  title: t('about.role.problemsolver'),
                  desc: t('about.role.problemsolver.description'),
                  color: 'from-purple-500/10 to-purple-600/5',
                  iconBg: 'bg-purple-900/20'
                },
                { 
                  icon: <BiDevices className="text-3xl text-green-400" />, 
                  title: t('about.role.uiux'),
                  desc: t('about.role.uiux.description'),
                  color: 'from-green-500/10 to-green-600/5',
                  iconBg: 'bg-green-900/20'
                }
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 + (index * 0.15), duration: 0.6, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    y: -5
                  }}
                  className={`flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r 
                    ${role.color}
                    backdrop-blur-sm border border-white/10 dark:border-gray-800/40 
                    transition-all duration-300 cursor-pointer`}
                >
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${role.iconBg}`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{role.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{role.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bio and Experience - 7 columns on desktop with enhancements */}
          <div className="md:col-span-7 space-y-10">
            <GlassCard 
              className="p-9 space-y-6"
              delay={0.3}
            >
              <motion.h3 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
              >
                {t('about.greeting')}
              </motion.h3>
              
              <div className="prose dark:prose-invert max-w-none">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  {t('about.bio.part1')}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Animated accent line */}
                  <div className="my-4 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="h-0.5 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-transparent rounded-full"
                    />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t('about.bio.part2')}
                  </p>
                </motion.div>
              </div>
            </GlassCard>
            
            {/* Enhanced experience timeline with interactive design */}
            <GlassCard className="p-9" delay={0.5}>
              <motion.h4 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-bold mb-10 flex items-center gap-3 text-gray-900 dark:text-white"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    backgroundColor: ['rgb(99, 102, 241)', 'rgb(126, 34, 206)', 'rgb(99, 102, 241)']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0"
                ></motion.span>
                {t('about.experience.title')}
              </motion.h4>
              
              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="relative pl-10"
                  >
                    {/* Enhanced timeline dot and line */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                      <motion.div 
                        animate={activeIndex === index ? {
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 0 rgba(99, 102, 241, 0.4)",
                            "0 0 20px rgba(99, 102, 241, 0.6)",
                            "0 0 0 rgba(99, 102, 241, 0.4)"
                          ]
                        } : {}}
                        transition={{ duration: 1.5, repeat: activeIndex === index ? Infinity : 0 }}
                        className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-md shadow-purple-500/30 z-10"
                      ></motion.div>
                      {index !== experiences.length - 1 && (
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          transition={{ duration: 1, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="w-0.5 flex-1 bg-gradient-to-b from-indigo-400 via-purple-500 to-indigo-400/20 mt-1"
                        />
                      )}
                    </div>
                    
                    {/* Enhanced experience content with better hover animations */}
                    <div className="pl-8">
                      <motion.div 
                        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                        animate={activeIndex === index ? { 
                          y: -5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                          borderColor: "rgba(139, 92, 246, 0.5)"
                        } : {}}
                        transition={{ duration: 0.3 }}
                        className={`bg-white/5 dark:bg-gray-800/50 rounded-xl p-7 transition-all duration-300 
                          border ${activeIndex === index ? 
                            'border-purple-500/30 dark:border-purple-500/40' : 
                            'border-white/10 dark:border-gray-700/50'}`}
                      >
                        <div className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-2">{exp.year}</div>
                        <div className="flex justify-between items-start">
                          <h5 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{exp.title}</h5>
                          <motion.div 
                            animate={activeIndex === index ? { rotate: [0, 5, 0, -5, 0] } : {}}
                            transition={{ duration: 1.5, repeat: activeIndex === index ? Infinity : 0, repeatDelay: 1 }}
                            className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {exp.company}
                          </motion.div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 my-3">{exp.description}</p>
                        
                        {exp.skills && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-5 flex flex-wrap gap-2"
                          >
                            {exp.skills.map((skill, i) => {
                              const colorIndex = i % roleColors.length;
                              return (
                                <SkillTag key={i} color={roleColors[colorIndex]}>
                                  {skill}
                                </SkillTag>
                              );
                            })}
                          </motion.div>
                        )}
                      </motion.div>
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

// Add this CSS class somewhere in your global styles or in a style tag
// .text-shadow {
//   text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
// }
