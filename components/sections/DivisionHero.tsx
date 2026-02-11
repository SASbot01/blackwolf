'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface DivisionHeroProps {
  title: string;
  subtitle: string;
  statement: string;
  backgroundImage?: string;
}

export default function DivisionHero({ title, subtitle, statement, backgroundImage }: DivisionHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
      )}
      <motion.h1
        className="relative z-10 font-headline text-3xl font-bold tracking-[0.05em] text-white md:text-5xl lg:text-6xl"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 text-base tracking-wide text-gray-400 md:text-lg"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
      >
        {subtitle}
      </motion.p>

      <motion.p
        className="relative z-10 mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.6 }}
      >
        {statement}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: 0.6 }}
      >
        <motion.div
          className="h-8 w-px bg-white/30"
          animate={
            shouldReduceMotion
              ? {}
              : { scaleY: [1, 0.5, 1], opacity: [0.3, 0.6, 0.3] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
