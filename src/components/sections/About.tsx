"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BiCode, BiBrain, BiDevices } from 'react-icons/bi';
import { FaLaptopCode, FaUserTie } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import Waves from '@/components/ui/Waves';
import Lanyard from '@/blocks/Components/Lanyard/Lanyard';

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
      year: "Jun 2025 - Now",
      title: "Junior Programmer",
      company: "PT. EMCO DIGITAL INDONESIA",
     description: "Developing logistics web applications using PHP CodeIgniter, managing inventory systems, shipment tracking, and warehouse management. Responsible for backend development, database integration, and implementing features to optimize logistics operations.",
      skills: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap", "jQuery", "REST APIs"]
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
      year: "Jun 2025 - Sekarang",
      title: "Junior Programmer",
      company: "PT. EMCO DIGITAL INDONESIA",
      description: "Mengembangkan aplikasi web logistik dengan PHP CodeIgniter, mengelola sistem inventaris, tracking pengiriman, dan manajemen gudang. Bertanggung jawab dalam pengembangan backend, integrasi database, dan implementasi fitur untuk mengoptimalkan operasi logistik.",
      skills: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap", "jQuery", "REST APIs"]
    },
  ]
})[lang];

interface AboutProps {
  id?: string;
}


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

// GitHub Repository Components
const GitHubSection = () => {
  const { language, t } = useLanguage();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/iqbalri06/repos?sort=updated&per_page=4');

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub repositories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (error) {
    return (
      <GlassCard className="p-4 w-full">
        <div className="text-center py-4">
          <div className="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-base font-medium">{t('github.error') || 'Error Loading Repositories'}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{error}</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5 w-full" delay={0.4}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <h4 className="text-base font-semibold text-gray-900 dark:text-white"> GitHub
          </h4>
        </div>
        <a
          href="https://github.com/iqbalri06"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View Profile
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 animate-pulse">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="bg-gray-800/40 rounded-lg p-3 h-24"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {repos.slice(0, 4).map((repo, index) => (
            <GitHubRepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}
    </GlassCard>
  );
};

const GitHubRepoCard = ({ repo, index }: { repo: any, index: number }) => {
  // Language color mapping based on GitHub colors
  const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Swift: "#ffac45",
    Go: "#00ADD8",
    Rust: "#dea584",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    default: "#8b949e"
  };

  const getLanguageColor = (lang: string | null) => {
    if (!lang) return languageColors.default;
    return languageColors[lang] || languageColors.default;
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else {
      return `${Math.floor(diffDays / 365)} years ago`;
    }
  };

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -3,
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        transition: { duration: 0.2 }
      }}
      className="block bg-[#0d1117] border border-[#30363d] rounded-lg p-3 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
          <h5 className="text-xs font-medium text-[#58a6ff] truncate max-w-[150px]">
            {repo.name}
          </h5>
        </div>
        <span className="text-xxs py-0.5 px-1.5 rounded-full bg-[#21262d] text-[#8b949e] border border-[#30363d] text-[10px]">
          {repo.visibility}
        </span>
      </div>

      <p className="text-[11px] text-[#8b949e] mb-2 line-clamp-2 h-[30px]">
        {repo.description || "No description provided"}
      </p>

      <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language}</span>
            </div>
          )}

          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .25a.75.75 0 01.673.418l3.058 6.197 6.839.994a.75.75 0 01.415 1.279l-4.948 4.823 1.168 6.811a.75.75 0 01-1.088.791L12 18.347l-6.117 3.216a.75.75 0 01-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 01.416-1.28l6.838-.993L11.328.668A.75.75 0 0112 .25z" />
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>
          )}
        </div>

        <div className="text-[10px]">
          <span>Updated {formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </motion.a>
  );
};

export default function About({ id }: AboutProps) {
  const { language, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const experiences = getExperiences(language);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect if user is on mobile device (iOS or Android)
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
      const isAndroid = /android/i.test(userAgent);
      setIsMobile(isIOS || isAndroid);
    };

    checkMobile();

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

      <FloatingIcons />      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-5 relative z-10 max-w-5xl" // Streamlined container
      >
        <SectionTitle title={t('about.title')} />
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="w-full md:w-2/5 flex flex-col gap-4 items-center md:items-start">
            
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
              
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

            {/* GitHub repositories section - Only display on desktop or non-iOS/Android */}
            {!isMobile && (
              <div className="w-full max-w-[320px]">
                <GitHubSection />
              </div>
            )}
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
                        <motion.div
                          className="flex flex-wrap gap-1.5 p-3 bg-[#0d1117] dark:bg-[#0d1117]/90 rounded-md border border-[#30363d] relative overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {/* GitHub-inspired background grid pattern */}
                          <div className="absolute inset-0 w-full h-full opacity-5">
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'radial-gradient(circle, #58a6ff 1px, transparent 1px)',
                              backgroundSize: '15px 15px'
                            }} />
                          </div>

                          {/* Animated highlight effect */}
                          <motion.div
                            className="absolute inset-0 opacity-10"
                            animate={{
                              background: [
                                'linear-gradient(45deg, #58a6ff00, #58a6ff22 50%, #58a6ff00 100%)',
                                'linear-gradient(225deg, #58a6ff00, #58a6ff22 50%, #58a6ff00 100%)'
                              ],
                              backgroundSize: '200% 200%',
                              backgroundPosition: ['0% 0%', '100% 100%']
                            }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />

                          {/* Starfield effect */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-px h-px bg-blue-400 rounded-full"
                              initial={{
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                                opacity: Math.random() * 0.5 + 0.3,
                                scale: Math.random() * 1.5 + 0.5
                              }}
                              animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: Math.random() * 2
                              }}
                            />
                          ))}

                          <div className="w-full flex items-center mb-3 text-xs text-[#8b949e] z-10">
                            <div className="flex items-center">
                              <FaUserTie className="mr-2 text-[#7ee787]" size={12} />
                              <span className="font-mono">skills/expertise</span>
                            </div>
                            <div className="ml-auto flex items-center">
                              <span className="bg-[#21262d] text-[#7ee787] text-xs px-2 py-0.5 rounded-full font-mono">
                                {exp.skills.length} items
                              </span>
                            </div>
                          </div>

                          {/* Repository tab indicators */}
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#1f6feb]/0 via-[#1f6feb] to-[#1f6feb]/0 z-10"></div>

                          <div className="flex flex-wrap gap-2 z-10 w-full">
                            {exp.skills.map((skill, i) => {
                              const colorIndex = i % roleColors.length;
                              const delay = i * 0.05;

                              // GitHub-inspired tag colors
                              const tagColors = {
                                blue: "bg-[#1f6feb]/20 text-[#58a6ff] border-[#1f6feb]/30",
                                purple: "bg-[#8957e5]/20 text-[#d2a8ff] border-[#8957e5]/30",
                                green: "bg-[#238636]/20 text-[#7ee787] border-[#238636]/30",
                                indigo: "bg-[#4f46e5]/20 text-[#a5b4fc] border-[#4f46e5]/30",
                                pink: "bg-[#db61a2]/20 text-[#ffadda] border-[#db61a2]/30"
                              };

                              const dotColors = {
                                blue: "#58a6ff",
                                purple: "#d2a8ff",
                                green: "#7ee787",
                                indigo: "#a5b4fc",
                                pink: "#ffadda"
                              };

                              const colorName = roleColors[colorIndex];

                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: delay,
                                    type: "spring",
                                    stiffness: 100
                                  }}
                                  viewport={{ once: true }}
                                  whileHover={{
                                    scale: 1.05,
                                    boxShadow: `0 0 8px 1px ${dotColors[colorName as keyof typeof dotColors]}40`,
                                    transition: { duration: 0.1 }
                                  }}
                                  className="relative rounded-md"
                                >
                                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border flex items-center 
                                    ${tagColors[colorName as keyof typeof tagColors]}`}
                                  >
                                    <span className="w-2 h-2 rounded-full mr-1.5"
                                      style={{ backgroundColor: dotColors[colorName as keyof typeof dotColors] }}
                                    ></span>
                                    {skill}
                                  </span>

                                  <AnimatePresence>
                                    {activeIndex === index && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="absolute -z-10 inset-0 blur-md rounded-md"
                                        style={{ backgroundColor: `${dotColors[colorName as keyof typeof dotColors]}20` }}
                                      />
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* GitHub-like contribution animation */}
                          <div className="w-full flex mt-3 pt-3 border-t border-[#30363d] z-10">
                            <div className="flex gap-1">
                              {[0, 1, 2, 3, 4].map((level) => {
                                // GitHub-like contribution colors
                                const contribColors = [
                                  "#0e4429", // lowest
                                  "#006d32",
                                  "#26a641",
                                  "#39d353",
                                  "#7ee787"  // highest
                                ];

                                return (
                                  <motion.div
                                    key={level}
                                    initial={{ opacity: 0.4 }}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{
                                      duration: 2,
                                      delay: level * 0.3,
                                      repeat: Infinity,
                                      repeatType: "reverse"
                                    }}
                                    className="w-2.5 h-2.5 rounded-sm"
                                    style={{ backgroundColor: contribColors[level] }}
                                  />
                                );
                              })}
                            </div>
                            <div className="text-xs text-[#8b949e] ml-auto font-mono flex items-center">
                              <span className="mr-2">last commit</span>
                              {exp.year.split(' - ')[0]}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* GitHub repositories section - Only display on mobile iOS/Android */}
            {isMobile && (
              <div className="w-full max-w-[600px] mx-auto md:mx-0">
                <GitHubSection />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
