"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";
import { VscHome, VscAccount, VscBriefcase, VscMail, VscFile, VscGear } from "react-icons/vsc";

import "./Dock.css";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.6, stiffness: 100, damping: 15 }, // Smoother spring config
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust sizes for mobile
  const actualBaseItemSize = isMobile ? Math.max(30, baseItemSize - 10) : baseItemSize;
  const actualMagnification = isMobile ? Math.max(40, magnification - 15) : magnification;
  const actualDistance = isMobile ? Math.max(100, distance - 70) : distance - 30; // Reduced distance for smoother effect

  const maxHeight = useMemo(
    () => Math.max(dockHeight, actualMagnification + actualMagnification / 2 + 4),
    [actualMagnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="dock-outer"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        onTouchStart={() => {
          isHovered.set(1);
          setTimeout(() => isHovered.set(0), 300);
        }}
        className={`dock-panel ${className} ${isDarkMode ? 'dark' : 'light'}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.length > 0 ? items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={`${item.className} ${isDarkMode ? 'dark' : 'light'}`}
            mouseX={mouseX}
            spring={spring}
            distance={actualDistance}
            magnification={actualMagnification}
            baseItemSize={actualBaseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel isDarkMode={isDarkMode}>{item.label}</DockLabel>
          </DockItem>
        )) : getDefaultItems(actualDistance, actualMagnification, actualBaseItemSize, mouseX, spring, isDarkMode)}
      </motion.div>
    </motion.div>
  );
}

// Helper function to generate default items
function getDefaultItems(distance: number, magnification: number, baseItemSize: number, mouseX: MotionValue, spring: SpringOptions, isDarkMode: boolean) {
  const defaultItems = [
    { icon: <VscHome size={24} />, label: 'Home', path: '/' },
    { icon: <VscAccount size={24} />, label: 'About', path: '/about' },
    { icon: <VscBriefcase size={24} />, label: 'Projects', path: '/projects' },
    { icon: <VscFile size={24} />, label: 'Blog', path: '/blog' },
    { icon: <VscMail size={24} />, label: 'Contact', path: '/contact' },
  ];
  
  return defaultItems.map((item, index) => (
    <DockItem
      key={index}
      onClick={() => window.location.href = item.path}
      className={isDarkMode ? 'dark' : 'light'}
      mouseX={mouseX}
      spring={spring}
      distance={distance}
      magnification={magnification}
      baseItemSize={baseItemSize}
    >
      <DockIcon>{item.icon}</DockIcon>
      <DockLabel isDarkMode={isDarkMode}>{item.label}</DockLabel>
    </DockItem>
  ));
}

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  baseItemSize,
  magnification, // Add this missing parameter
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  // Smoother interpolation with more points
  const targetSize = useTransform(
    mouseDistance,
    [-distance, -distance/2, 0, distance/2, distance],
    [baseItemSize, baseItemSize * 1.1, magnification, baseItemSize * 1.1, baseItemSize]
  );
  
  // Use a smoother spring configuration
  const smoothSpring: SpringOptions = {
    mass: 0.2,
    stiffness: 150,
    damping: 20,
    velocity: 0,
  };
  
  const size = useSpring(targetSize, smoothSpring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { isHovered })
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isDarkMode?: boolean;
};

function DockLabel({ children, className = "", isDarkMode, ...rest }: DockLabelProps) {
  const { isHovered } = rest as { isHovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`dock-label ${className} ${isDarkMode ? 'dark' : 'light'}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`dock-icon ${className}`}>
      {children}
    </div>
  );
}
