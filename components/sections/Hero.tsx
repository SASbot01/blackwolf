'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        style={
          shouldReduceMotion
            ? {}
            : { opacity: contentOpacity, y: contentY }
        }
      >
        {/* Wordmark */}
        <div className="flex items-center justify-center" aria-label="Blackwolf">
          {'BLACKWOLF'.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="font-headline text-white text-4xl font-bold tracking-[0.2em] md:text-6xl lg:text-8xl"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : 0.3 + i * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-center text-sm tracking-[0.2em] uppercase text-gray-300 md:text-base lg:text-lg"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 1,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {t('tagline')}
        </motion.p>

        {/* Second tagline */}
        <motion.p
          className="mt-3 text-center text-base tracking-wide text-gray-400 md:text-lg lg:text-xl"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 1.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {t('tagline2')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.8, duration: 0.6 }}
      >
        <motion.div
          className="h-8 w-px bg-white/30"
          animate={
            shouldReduceMotion
              ? {}
              : { scaleY: [1, 0.5, 1], opacity: [0.3, 0.6, 0.3] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
}
