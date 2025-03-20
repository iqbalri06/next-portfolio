'use client';

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animated Star component
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
        boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(255, 255, 255, 0.7)`
      }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.2, 1]
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

// Animated Planet component
const Planet = ({
  size,
  color,
  position,
  duration = 20
}: {
  size: number,
  color: string,
  position: { x: string, y: string },
  duration?: number
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{
        width: size,
        height: size,
        top: position.y,
        left: position.x,
      }}
      animate={{
        x: [0, 10, -10, 0],
        y: [0, -5, 5, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Generate random stars
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    size: Math.random() * 2 + 1,
    position: {
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`
    },
    delay: Math.random() * 2
  }));
  
  return (
    <footer className="relative overflow-hidden py-12 border-t border-indigo-900/30">
      {/* Space-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950 to-black -z-10" />
      
      {/* Animated stars */}
      {stars.map((star, index) => (
        <Star key={index} size={star.size} position={star.position} delay={star.delay} />
      ))}
      
      {/* Animated planets */}
      <Planet 
        size={40} 
        color="bg-purple-900/50" 
        position={{ x: "15%", y: "20%" }} 
        duration={25} 
      />
      <Planet 
        size={24} 
        color="bg-indigo-800/50" 
        position={{ x: "80%", y: "30%" }} 
        duration={18} 
      />
      <Planet 
        size={32} 
        color="bg-blue-900/50" 
        position={{ x: "65%", y: "60%" }} 
        duration={30} 
      />
      
      {/* Northern lights effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-5">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 right-0 h-40 bg-gradient-to-t from-blue-500 via-cyan-500 to-transparent blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and copyright section */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-4"
            >
            </motion.div>
            <p className="text-indigo-200">
              © {currentYear} All rights reserved
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <p className="text-indigo-300 font-medium">Connect with me</p>
            <div className="flex space-x-6">
              <motion.a 
                href="https://github.com/iqbalri06" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="text-indigo-300 hover:text-white transition-all"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/iqbalri" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-indigo-300 hover:text-blue-400 transition-all"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/iqbalri._" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-indigo-300 hover:text-pink-400 transition-all"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cosmic orbit decorative element */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-indigo-500/20 rounded-full opacity-30 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-purple-500/20 rounded-full opacity-30 hidden md:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Shooting star animation */}
      <motion.div 
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{ width: "100px" }}
        initial={{ top: "-10%", left: "-10%", rotate: 45, opacity: 0 }}
        animate={{ 
          top: "110%", 
          left: "110%", 
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 8
        }}
      />
    </footer>
  );
}
