"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  className?: string;
}

export default function AnimatedBackground({
  particleCount = 20,
  className = "",
}: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);

    // Generate particles with different properties
    const generatedParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20, // between 20-60
      color: getRandomColor(isDark),
      rotation: Math.random() * 360,
    }));
    
    setParticles(generatedParticles);
  }, [particleCount, isDark]);

  const getRandomColor = (isDark: boolean) => {
    const colors = isDark 
      ? ['rgba(59, 130, 246, 0.15)', 'rgba(139, 92, 246, 0.15)', 'rgba(16, 185, 129, 0.15)', 'rgba(236, 72, 153, 0.15)']
      : ['rgba(59, 130, 246, 0.07)', 'rgba(139, 92, 246, 0.07)', 'rgba(16, 185, 129, 0.07)', 'rgba(236, 72, 153, 0.07)'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full backdrop-blur-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            rotate: `${particle.rotation}deg`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            rotate: [particle.rotation, particle.rotation + (Math.random() > 0.5 ? 20 : -20), particle.rotation]
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 15, // between 15-25 seconds
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Add some responsive floating gradient blobs */}
      <motion.div
        className="absolute rounded-full filter blur-[80px] md:blur-[100px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50"
        style={{
          width: '40%',
          height: '40%',
          top: '10%',
          right: '5%',
        }}
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute rounded-full filter blur-[70px] md:blur-[90px] bg-gradient-to-r from-emerald-500/20 to-sky-500/20 opacity-40"
        style={{
          width: '35%',
          height: '35%',
          bottom: '15%',
          left: '10%',
        }}
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
