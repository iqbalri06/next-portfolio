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
    <section id={id} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30 z-0" />
      
      {/* Background decorative elements */}
      <div className="absolute -left-[10%] top-[20%] w-64 h-64 bg-gradient-to-r from-purple-300/10 to-blue-300/10 dark:from-purple-900/10 dark:to-blue-900/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -right-[10%] bottom-[20%] w-80 h-80 bg-gradient-to-r from-green-300/10 to-teal-300/10 dark:from-green-900/10 dark:to-teal-900/10 rounded-full blur-3xl z-0"></div>
      
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
          className="max-w-4xl mx-auto mt-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Modern staggered layout */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3 flex"
              >
                <motion.div
                  whileHover={{ scale: 1.03, rotateY: 5, rotateX: -5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 15 
                  }}
                  className="group relative h-full w-full"
                >
                  {/* Card with backdrop blur and gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10`}></div>
                  
                  <a 
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl p-8 h-full shadow-lg shadow-gray-200/50 dark:shadow-gray-900/30 transition duration-300 group-hover:shadow-xl flex flex-col items-center">
                      <div className="flex flex-col items-center">
                        <motion.div 
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`w-18 h-18 flex items-center justify-center rounded-2xl p-4 ${card.iconBg} ${card.iconColor} mb-6`}
                        >
                          {card.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{card.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{card.description}</p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>

         
        </motion.div>
      </div>
    </section>
  );
}
