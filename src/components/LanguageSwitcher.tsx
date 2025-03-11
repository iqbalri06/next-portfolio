'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const FLAGS = {
  en: {
    src: "/images/flags/gb.svg",
    alt: "UK Flag"
  },
  id: {
    src: "/images/flags/id.svg",
    alt: "Indonesia Flag"
  }
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (!mounted) {
    return <div className="w-[120px] h-[38px] bg-gray-800/80 rounded-md"></div>;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between rounded-md bg-gray-800/80 px-3 py-1.5 text-sm font-medium shadow-sm border border-gray-700 text-gray-100"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-4 relative mr-2">
          <Image
            src={FLAGS[language].src}
            alt={FLAGS[language].alt}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <span className="mr-1">{language.toUpperCase()}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 rounded-md bg-gray-800/95 backdrop-blur-sm shadow-lg ring-1 ring-white/5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => toggleLanguage('en')}
              className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 ${
                language === 'en'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700/70'
              }`}
              role="menuitem"
            >
              <div className="w-6 h-4 relative">
                <Image
                  src={FLAGS.en.src}
                  alt={FLAGS.en.alt}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span>English</span>
            </button>
            <button
              onClick={() => toggleLanguage('id')}
              className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 ${
                language === 'id'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700/70'
              }`}
              role="menuitem"
            >
              <div className="w-6 h-4 relative">
                <Image
                  src={FLAGS.id.src}
                  alt={FLAGS.id.alt}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span>Indonesia</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
