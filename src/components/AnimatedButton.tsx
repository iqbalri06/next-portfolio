"use client";

import Link from 'next/link';
import { useState } from 'react';

type AnimatedButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
};

export default function AnimatedButton({ 
  href, 
  children, 
  className = '',
  variant = 'primary',
  external = false
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "relative px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
  };
  
  const ButtonContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
      />
    </>
  );
  
  if (external) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ButtonContent />
      </a>
    );
  }
  
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ButtonContent />
    </Link>
  );
}
