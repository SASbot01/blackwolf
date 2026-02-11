'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

const containerVariants = (staggerDelay: number, delayStart: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayStart,
    },
  },
});

const itemVariants = (duration: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
});

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.15,
  delay = 0,
  once = true,
  threshold = 0.15,
}: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants(duration)}>
      {children}
    </motion.div>
  );
}
