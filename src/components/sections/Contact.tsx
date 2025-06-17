"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiEnvelope } from 'react-icons/bi';
import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import SectionTitle from '@/components/SectionTitle';

interface ContactProps {
  id?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact({ id }: ContactProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const generateWhatsAppLink = () => {
    const phoneNumber = "6281291544061";
    const message = t('contact.whatsappMessage');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: <FaWhatsapp size={22} />,
      title: "WhatsApp",
      description: t('contact.whatsapp'),
      value: "+62 812-9154-4061",
      href: generateWhatsAppLink(),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-100 dark:border-green-800/50"
    },
    {
      icon: <BiEnvelope size={22} />,
      title: t('contact.emailTitle'),
      description: "Send me an email",
      value: "iqbalroudatul@gmail.com",
      href: "mailto:iqbalroudatul@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-100 dark:border-blue-800/50"
    },
    {
      icon: <FaInstagram size={22} />,
      title: "Instagram",
      description: "Follow me",
      value: "@iqbalri._",
      href: "https://instagram.com/iqbalri._",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/30",
      borderColor: "border-pink-100 dark:border-pink-800/50"
    }
  ];

  const socialLinks = [
    { 
      icon: <FaGithub size={20} />, 
      href: "https://github.com/iqbalri06", 
      label: "GitHub",
      color: "bg-gray-800 hover:bg-gray-900 text-white"
    },
    { 
      icon: <FaLinkedin size={20} />, 
      href: "https://www.linkedin.com/in/iqbalri", 
      label: "LinkedIn",
      color: "bg-blue-600 hover:bg-blue-700 text-white"
    }
  ];

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-pink-300/20 to-yellow-300/20 dark:from-pink-600/10 dark:to-yellow-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute w-full h-1/2 bottom-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <SectionTitle 
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('contact.lookingForward')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="inline-block w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-2"></span>
                Get in Touch
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className={`flex items-center p-5 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-sm hover:shadow-md border ${method.borderColor} transition-all duration-300 group`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${method.bgColor} flex items-center justify-center ${method.color} mr-5 group-hover:scale-110 transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {method.description}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {method.value}
                      </p>
                    </div>
                    <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l10-10M17 7H7v10"/>
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2.5 rounded-xl ${social.color} flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md transition-all duration-300`}
                    >
                      {social.icon}
                      <span>{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="inline-block w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-2"></span>
              Send Message
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`relative overflow-hidden w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : submitStatus === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Message Sent!</span>
                    </div>
                  ) : (
                    t('contact.sendButton')
                  )}
                </span>
                {!isSubmitting && submitStatus !== 'success' && (
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
