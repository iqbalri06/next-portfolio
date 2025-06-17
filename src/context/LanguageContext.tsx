'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'id';

// Define the structure of translations
interface TranslationKeys {
  'nav.home': string;
  'nav.about': string;
  'nav.projects': string;
  'nav.skills': string;
  'nav.contact': string;
  'hero.greeting': string;
  'hero.role': string;
  'hero.description': string;
  'hero.cta': string;
  // ... all other translation keys
  'footer.rights': string;
  [key: string]: string; // Add index signature
}

interface Translations {
  en: TranslationKeys;
  id: TranslationKeys;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Initialize context with default values instead of undefined
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionary for both languages
const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.greeting': 'Hi, I\'m',
    'hero.role': 'Full Stack Developer',
    'hero.description': 'Crafting innovative digital solutions through elegant code and cutting-edge technologies',
    'hero.cta': 'View My Work',
    
    // About section
    'about.title': 'About Me',
    'about.description': 'I am a passionate developer with experience in building web applications and automating processes. I enjoy solving complex problems and creating intuitive user experiences.',
    'about.experience': 'Years of Experience',
    'about.projects': 'Projects Completed',
    'about.clients': 'Happy Clients',
    'about.greeting': 'Hello, I\'m Iqbal Roudatul Irfan',
    'about.role.fullstack': 'Fullstack Developer',
    'about.role.fullstack.description': 'Building modern web & mobile apps',
    'about.role.problemsolver': 'Problem Solver',
    'about.role.problemsolver.description': 'Turning challenges into solutions',
    'about.role.uiux': 'UI/UX Enthusiast',
    'about.role.uiux.description': 'Creating intuitive experiences',
    'about.bio.part1': 'I\'m a passionate fullstack developer with expertise in building modern web and mobile applications. My journey in tech began with a curiosity about how digital products work, which evolved into a deep passion for creating elegant solutions to complex problems.',
    'about.bio.part2': 'With a strong foundation in JavaScript and TypeScript, I specialize in building responsive and intuitive user interfaces using React and Next.js, while also being comfortable working on the backend with Node.js. I thrive in collaborative environments and enjoy the process of turning ideas into reality through clean, efficient code.',
    'about.experience.title': 'Experience',
    
    // Skills section
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': "Here's my technical toolkit that I use to bring ideas to life",
    'skills.hover': 'Hover over skills to explore',
    
    // Projects section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Check out these projects that showcase my technical skills and problem-solving approach',
    'projects.features': 'Key Features',
    'projects.viewCode': 'View Code',
    'projects.liveDemo': 'Live Demo',
    
    // Project 1
    'project1.title': 'WhatsApp Bot',
    'project1.description': 'A feature-rich WhatsApp automation bot built to handle messages, perform tasks, and integrate with external services.',
    'project1.highlight1': 'Automated response system',
    'project1.highlight2': 'Message scheduling capabilities',
    'project1.highlight3': 'Integration with external APIs',
    'project1.highlight4': 'Custom command handling',
    
    // Project 2
    'project2.title': 'Kejar.id Journal Bot',
    'project2.description': 'Automated journal entry system for Kejar.id platform using Selenium for web automation to save time on repetitive tasks.',
    'project2.highlight1': 'Automated form filling',
    'project2.highlight2': 'Scheduled journal submissions',
    'project2.highlight3': 'Headless browser support',
    'project2.highlight4': 'Configurable entry templates',
    
    // Project 3
    'project3.title': 'Cashier App',
    'project3.description': 'A comprehensive point-of-sale system built with Django that handles inventory, sales, and reporting.',
    'project3.highlight1': 'Inventory management',
    'project3.highlight2': 'Sales analytics dashboard',
    'project3.highlight3': 'Receipt generation',
    'project3.highlight4': 'User role management',
    
    // Project 4
    'project4.title': 'Internal Apps Portal',
    'project4.description': 'A centralized Next.js application that serves as a hub for various internal tools and utilities for company operations.',
    'project4.highlight1': 'Single sign-on authentication',
    'project4.highlight2': 'Role-based access control',
    'project4.highlight3': 'Dashboard analytics',
    'project4.highlight4': 'Integrated tool ecosystem',
    
    // Contact section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a project in mind? Let\'s talk about it.',
    'contact.nameLabel': 'Your Name',
    'contact.emailLabel': 'Your Email',
    'contact.messageLabel': 'Your Message',
    'contact.sendButton': 'Send Message',
    'contact.locationTitle': 'Location',
    'contact.emailTitle': 'Email',
    'contact.phoneTitle': 'Phone',
    'contact.connect': 'Connect With Me',
    'contact.discuss': 'Let\'s discuss your next project',
    'contact.whatsapp': 'Quick chat for immediate response',
    'contact.instagram': '@iqbalri._',
    'contact.email': 'iqbalroudatul@gmail.com',
    'contact.lookingForward': 'Looking forward to collaborating on your next project',
    'contact.whatsappMessage': 'Hi there! I\'m interested in discussing a project.',
    
    // Footer
    'footer.rights': 'All rights reserved',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.projects': 'Proyek',
    'nav.skills': 'Keahlian',
    'nav.contact': 'Kontak',
    
    // Hero section
    'hero.greeting': 'Hai, Saya',
    'hero.role': 'Full Stack Developer',
    'hero.description': 'Menciptakan solusi digital inovatif melalui kode yang elegan dan teknologi terkini',
    'hero.cta': 'Lihat Karya Saya',
    
    // About section
    'about.title': 'Tentang Saya',
    'about.description': 'Saya adalah developer yang bersemangat dengan pengalaman dalam membangun aplikasi web dan mengotomatisasi proses. Saya menikmati memecahkan masalah kompleks dan menciptakan pengalaman pengguna yang intuitif.',
    'about.experience': 'Tahun Pengalaman',
    'about.projects': 'Proyek Selesai',
    'about.clients': 'Klien Puas',
    'about.greeting': 'Halo, Saya Iqbal Roudatul Irfan',
    'about.role.fullstack': 'Fullstack Developer',
    'about.role.fullstack.description': 'Membangun aplikasi web & mobile modern',
    'about.role.problemsolver': 'Pemecah Masalah',
    'about.role.problemsolver.description': 'Mengubah tantangan menjadi solusi',
    'about.role.uiux': 'Penggemar UI/UX',
    'about.role.uiux.description': 'Menciptakan pengalaman yang intuitif',
    'about.bio.part1': 'Saya adalah fullstack developer yang bersemangat dengan keahlian dalam membangun aplikasi web dan mobile modern. Perjalanan saya di dunia teknologi dimulai dengan rasa ingin tahu tentang cara kerja produk digital, yang berkembang menjadi passion mendalam untuk menciptakan solusi elegan untuk masalah yang kompleks.',
    'about.bio.part2': 'Dengan dasar yang kuat dalam JavaScript dan TypeScript, saya mengkhususkan diri dalam membangun antarmuka pengguna yang responsif dan intuitif menggunakan React dan Next.js, sambil juga nyaman bekerja di backend dengan Node.js. Saya berkembang dalam lingkungan kolaboratif dan menikmati proses mengubah ide menjadi kenyataan melalui kode yang bersih dan efisien.',
    'about.experience.title': 'Pengalaman',
    
    // Skills section
    'skills.title': 'Keahlian & Kemampuan',
    'skills.subtitle': 'Berikut adalah perangkat teknis yang saya gunakan untuk mewujudkan ide',
    'skills.hover': 'Arahkan kursor ke keahlian untuk melihat detail',
    
    // Projects section
    'projects.title': 'Proyek Unggulan',
    'projects.subtitle': 'Lihat proyek-proyek ini yang menunjukkan keterampilan teknis dan pendekatan pemecahan masalah saya',
    'projects.features': 'Fitur Utama',
    'projects.viewCode': 'Lihat Kode',
    'projects.liveDemo': 'Demo Langsung',
    
    // Project 1
    'project1.title': 'Bot WhatsApp',
    'project1.description': 'Bot otomatisasi WhatsApp yang kaya fitur dibangun untuk menangani pesan, melakukan tugas, dan berintegrasi dengan layanan eksternal.',
    'project1.highlight1': 'Sistem respons otomatis',
    'project1.highlight2': 'Kemampuan penjadwalan pesan',
    'project1.highlight3': 'Integrasi dengan API eksternal',
    'project1.highlight4': 'Penanganan perintah kustom',
    
    // Project 2
    'project2.title': 'Bot Jurnal Kejar.id',
    'project2.description': 'Sistem entri jurnal otomatis untuk platform Kejar.id menggunakan Selenium untuk otomatisasi web guna menghemat waktu pada tugas berulang.',
    'project2.highlight1': 'Pengisian formulir otomatis',
    'project2.highlight2': 'Pengiriman jurnal terjadwal',
    'project2.highlight3': 'Dukungan browser headless',
    'project2.highlight4': 'Template entri yang dapat dikonfigurasi',
    
    // Project 3
    'project3.title': 'Aplikasi Kasir',
    'project3.description': 'Sistem point-of-sale komprehensif yang dibangun dengan Django yang menangani inventaris, penjualan, dan pelaporan.',
    'project3.highlight1': 'Manajemen inventaris',
    'project3.highlight2': 'Dashboard analitik penjualan',
    'project3.highlight3': 'Pembuatan tanda terima',
    'project3.highlight4': 'Manajemen peran pengguna',
    
    // Project 4
    'project4.title': 'Portal Aplikasi Internal',
    'project4.description': 'Aplikasi Next.js terpusat yang berfungsi sebagai pusat untuk berbagai alat dan utilitas internal untuk operasi perusahaan.',
    'project4.highlight1': 'Otentikasi single sign-on',
    'project4.highlight2': 'Kontrol akses berbasis peran',
    'project4.highlight3': 'Analitik dashboard',
    'project4.highlight4': 'Ekosistem alat terintegrasi',
      // Contact section
    'contact.title': 'Hubungi Saya',
    'contact.subtitle': 'Punya proyek dalam pikiran? Mari bicarakan.',
    'contact.nameLabel': 'Nama Anda',
    'contact.emailLabel': 'Email Anda',
    'contact.messageLabel': 'Pesan Anda',
    'contact.sendButton': 'Kirim Pesan',
    'contact.locationTitle': 'Lokasi',    'contact.emailTitle': 'Email',
    'contact.phoneTitle': 'Telepon',
    'contact.whatsapp': 'Chat cepat untuk respon langsung',
    'contact.instagram': '@iqbalri._',
    'contact.email': 'iqbalroudatul@gmail.com',
    'contact.lookingForward': 'Menantikan kolaborasi untuk proyek anda berikutnya',
    'contact.whatsappMessage': 'Halo! Saya tertarik untuk mendiskusikan sebuah proyek.',
    
    // Footer
    'footer.rights': 'Semua hak dilindungi',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with a default language
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage after component mounts
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Provide default content during SSR
  if (!mounted) {
    return (
      <LanguageContext.Provider 
        value={{
          language: 'en',
          setLanguage: handleSetLanguage,
          t: (key) => translations['en'][key] || key
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  // Fix the return statement here - remove duplicate provider closing tags
  return (
    <LanguageContext.Provider 
      value={{
        language,
        setLanguage: handleSetLanguage,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Simplify the hook implementation
export function useLanguage() {
  const context = useContext(LanguageContext);
  // No need to check for undefined since we provided default values
  return context;
}
