'use client';

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Simplified Star component for minimal background effect
const Star = ({ 
  size, 
  position, 
  delay = 0
}: { 
  size: number, 
  position: { x: string, y: string }, 
  delay?: number 
}) => {
  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        width: size,
        height: size,
        top: position.y,
        left: position.x,
        boxShadow: `0 0 ${size}px ${size/4}px rgba(255, 255, 255, 0.5)`
      }}
      animate={{
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Reduced number of stars for minimalism
  const stars = Array.from({ length: 15 }).map((_, i) => ({
    size: Math.random() * 1.5 + 0.5,
    position: {
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`
    },
    delay: Math.random() * 2
  }));
  
  return (
    <footer className="relative overflow-hidden py-10 border-t-2 border-gray-700/60 shadow-[0_-1px_5px_rgba(75,85,99,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10" />
      
      {/* Minimal stars */}
      {stars.map((star, index) => (
        <Star key={index} size={star.size} position={star.position} delay={star.delay} />
      ))}
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 -z-5">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-500 to-transparent blur-xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          {/* Copyright section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <span className="font-medium text-gray-300">Iqbal Roudatul</span>. All rights reserved
            </p>
          </motion.div>
          
          {/* Social links - adjusted spacing and centering */}
          <div className="flex justify-center space-x-8 mt-2 md:mt-0 px-4">
            <motion.a 
              href="https://github.com/iqbalri06" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="text-gray-400 hover:text-white transition-all"
              whileHover={{ y: -2, color: "#FFFFFF" }}
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/iqbalri" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="text-gray-400 hover:text-white transition-all"
              whileHover={{ y: -2, color: "#FFFFFF" }}
            >
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/iqbalri._" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="text-gray-400 hover:text-white transition-all"
              whileHover={{ y: -2, color: "#FFFFFF" }}
            >
              <FaInstagram size={22} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
