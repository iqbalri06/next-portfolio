"use client";

import { motion } from 'framer-motion';
import { BiEnvelope } from 'react-icons/bi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext'; // Add this import
import SectionTitle from '@/components/SectionTitle';

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const { t, language } = useLanguage(); // Add language hook

  const generateWhatsAppLink = () => {
    const phoneNumber = "6281291544061";
    const message = t('contact.whatsappMessage');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const instagramUrl = "https://instagram.com/iqbalri._";
  const emailAddress = "iqbalroudatul@gmail.com";

  return (
    <section id={id} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle 
          title={t('contact.connect')}
          subtitle={t('contact.discuss')}
        />

        <motion.div 
          className="max-w-3xl mx-auto mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              {/* Animated border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-gradient-x"></div>
              
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer" 
                className="block h-full relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                      <FaWhatsapp size={28} />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-800 dark:text-white mb-2">WhatsApp</h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">{t('contact.whatsapp')}</p>
                </div>
              </a>
            </motion.div>

            {/* Instagram Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              {/* Animated border - Instagram gradient */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-gradient-x"></div>
              
              <a 
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 group-hover:scale-110 transition-transform duration-300">
                      <FaInstagram 
                        size={28} 
                        style={{ 
                          color: '#E1306C'  // Using a solid color instead of gradient for reliability
                        }} 
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-800 dark:text-white mb-2">Instagram</h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">{t('contact.instagram')}</p>
                </div>
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              {/* Animated border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-gradient-x"></div>
              
              <a 
                href={`mailto:${emailAddress}`}
                className="block h-full relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <BiEnvelope size={28} />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-800 dark:text-white mb-2">Email</h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">{t('contact.email')}</p>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t('contact.lookingForward')}
            </p>
            
            <div className="flex justify-center gap-6">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
              <a 
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href={`mailto:${emailAddress}`}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                aria-label="Email"
              >
                <BiEnvelope size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
