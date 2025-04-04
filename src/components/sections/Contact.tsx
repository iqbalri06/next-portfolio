"use client";

import { motion } from 'framer-motion';
import { BiEnvelope } from 'react-icons/bi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import SectionTitle from '@/components/SectionTitle';

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const { t } = useLanguage();

  const generateWhatsAppLink = () => {
    const phoneNumber = "6281291544061";
    const message = t('contact.whatsappMessage');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const instagramUrl = "https://instagram.com/iqbalri._";
  const emailAddress = "iqbalroudatul@gmail.com";

  const contactCards = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={28} />,
      url: generateWhatsAppLink(),
      description: t('contact.whatsapp'),
      color: "from-green-400 to-emerald-500",
      iconBg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500 dark:text-green-400"
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={28} />,
      url: instagramUrl,
      description: t('contact.instagram'),
      color: "from-purple-400 via-pink-500 to-orange-500",
      iconBg: "bg-pink-50 dark:bg-pink-900/20",
      iconColor: "text-pink-500 dark:text-pink-400"
    },
    {
      name: "Email",
      icon: <BiEnvelope size={28} />,
      url: `mailto:${emailAddress}`,
      description: t('contact.email'),
      color: "from-blue-400 to-indigo-500",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500 dark:text-blue-400"
    }
  ];

  return (
    <section id={id} className="py-16 sm:py-20 relative overflow-hidden">
      {/* Simplified background - just a subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/20 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionTitle 
            title={t('contact.connect')}
            subtitle={t('contact.discuss')}
          />
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mt-10 sm:mt-12 px-2 sm:px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Clean minimalist layout */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 sm:gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3 flex"
              >
                <a 
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-6 h-full 
                    border border-gray-100 dark:border-gray-700/50
                    shadow-sm hover:shadow-md dark:shadow-none
                    transition-all duration-300 ease-out">
                    
                    <div className="flex flex-row sm:flex-col items-center sm:items-start sm:text-left gap-4 sm:gap-0">
                      <div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                          rounded-md bg-opacity-10 dark:bg-opacity-20
                          ${card.iconColor.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-').replace('-400', '-100').replace('-500', '-100')}
                          sm:mb-5`}
                      >
                        {card.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1">{card.name}</h3>
                        
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{card.description}</p>
                        
                        {/* Subtle hover indicator */}
                        <div className="mt-3 sm:mt-4 h-[1px] w-0 group-hover:w-16 bg-current opacity-40 transition-all duration-300 ease-in-out"></div>
                      </div>
                      
                      {/* Clean, minimal icon indicator */}
                      <div className="hidden sm:block ml-auto text-gray-300 dark:text-gray-600 group-hover:translate-x-1 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
