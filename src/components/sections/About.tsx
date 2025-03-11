"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineCode, HiOutlineLightBulb, HiOutlineDesktopComputer } from 'react-icons/hi';
import proImage from '/src/images/profile.png';
import { useLanguage } from '@/context/LanguageContext';

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
      title: "Frontend  Developer (Mobile)",
      company: "Perumda Tirta Pakuan Kota Bogor",
      description: "Bekerja sebagai frontend developer freelance yang fokus pada pengembangan aplikasi mobile.",
      skills: ["React Native", "Flutter", "Desain UI/UX", "Figma", "Pengembangan Android", "Redux/MobX", "Native APIs", "Firebase", "REST APIs", "Navigasi Mobile", "Komponen UI Mobile"]
    }
  ]
})[lang];

interface AboutProps {
  id?: string;
}

const SectionTitle = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mb-12 relative"
  >
    <h2 className="text-4xl font-bold inline-block text-gray-900 dark:text-white">
      {title}
      <motion.span 
        initial={{ width: 0 }}
        whileInView={{ width: "30%" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
      />
    </h2>
  </motion.div>
);

export default function About({ id }: AboutProps) {
  const { language, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const experiences = getExperiences(language);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  if (!mounted) {
    // Return a minimal loading state that matches SSR
    return <section id={id} className="py-24 relative overflow-hidden w-full" />;
  }

  return (
    <section 
      id={id} 
      className="py-24 relative overflow-hidden w-full"
      ref={containerRef}
    >
      {/* Update background elements to only use dark mode colors */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-b from-blue-900/20 to-purple-900/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 -z-10 w-72 h-72 bg-gradient-to-tr from-green-900/20 to-blue-900/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 left-1/2 -z-10 w-48 h-48 bg-gradient-to-tr from-amber-900/20 to-rose-900/20 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <SectionTitle title={t('about.title')} />
        
        {/* Update component classes to remove light mode variants */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-5 gap-12 mt-16"
        >
          {/* Update all bg-white/80 to bg-gray-800/80 and remove light mode specific classes */}
          {/* Example of updated class names: */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-1.5 bg-gradient-conic from-blue-500 via-purple-500 to-blue-500 animate-border-rotate mt-8">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <Image
                  src={proImage}  
                  alt="Iqbal Roudatul Irfan"
                  fill
                  priority
                  className="object-cover transition-all hover:scale-105 duration-700 filter saturate-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Iqbal Roudatul Irfan</h3>
                    <p className="text-sm">Fullstack Developer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-5">
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-3 p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <HiOutlineCode className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{t('about.role.fullstack')}</h3>
                  <p className="text-sm text-gray-400">{t('about.role.fullstack.description')}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-3 p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <HiOutlineLightBulb className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{t('about.role.problemsolver')}</h3>
                  <p className="text-sm text-gray-400">{t('about.role.problemsolver.description')}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-3 p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                  <HiOutlineDesktopComputer className="text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{t('about.role.uiux')}</h3>
                  <p className="text-sm text-gray-400">{t('about.role.uiux.description')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side - Bio and Experience */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 space-y-12"
          >
            {/* Bio Section */}
            <div className="space-y-6 p-7 bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-700">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {t('about.greeting')}
              </motion.h3>
              
              <div className="prose dark:prose-invert max-w-none">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-300"
                >
                  {t('about.bio.part1')}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-300"
                >
                  {t('about.bio.part2')}
                </motion.p>
              </div>
            </div>
            
            {/* Experience Timeline */}
            <div className="p-7 bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-700">
              <motion.h4 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl font-semibold mb-6 text-gray-100 inline-block relative"
              >
                {t('about.experience.title')}
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
              </motion.h4>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-8 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:bg-gradient-to-br before:from-blue-500 before:to-purple-500 before:rounded-full before:z-10 before:shadow-md"
                    whileHover={{ x: 5 }}
                  >
                    {index !== experiences.length - 1 && (
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute left-2 top-5 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-gray-700"
                      ></motion.div>
                    )}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-700 transition-all duration-300">
                      <div className="text-sm font-medium text-blue-400 mb-2">{exp.year}</div>
                      <h5 className="text-lg font-bold mb-1 text-white">{exp.title}</h5>
                      <div className="text-gray-400 mb-3">{exp.company}</div>
                      <p className="text-gray-300">{exp.description}</p>
                      
                      {exp.skills && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="mt-4 flex flex-wrap gap-1.5"
                        >
                          {exp.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="text-xs font-medium px-3 py-1.5 bg-blue-900/30 text-blue-300 rounded-full border border-blue-800/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
