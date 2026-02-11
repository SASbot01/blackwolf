'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';

const PARTICLE_COUNT = 12;

function Particle({ angle, delay }: { angle: number; delay: number }) {
  const distance = 80 + Math.random() * 60;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const size = 3 + Math.random() * 5;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full bg-white"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    />
  );
}

function ExplodingBubble({
  label,
  href,
  floatDelay,
  floatDuration,
}: {
  label: string;
  href: string;
  floatDelay: number;
  floatDuration: number;
}) {
  const [exploding, setExploding] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    angle: (i / PARTICLE_COUNT) * Math.PI * 2,
    delay: Math.random() * 0.1,
  }));

  const handleClick = useCallback(() => {
    if (exploding) return;
    setExploding(true);
    setTimeout(() => {
      router.push(href);
    }, 500);
  }, [exploding, href, router]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Floating bubble */}
      <AnimatePresence>
        {!exploding && (
          <motion.button
            onClick={handleClick}
            className="group relative flex h-36 w-36 items-center justify-center rounded-full md:h-44 md:w-44 lg:h-48 lg:w-48"
            style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: shouldReduceMotion ? 0 : [0, -14, 0, -10, 0],
              rotateX: shouldReduceMotion ? 0 : [0, 3, -2, 1, 0],
              rotateY: shouldReduceMotion ? 0 : [0, -4, 3, -2, 0],
            }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{
              opacity: { duration: 0.5, delay: floatDelay },
              scale: { duration: 0.5, delay: floatDelay },
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
              rotateX: {
                duration: floatDuration * 1.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
              rotateY: {
                duration: floatDuration * 1.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay + 0.3,
              },
            }}
            whileHover={{ scale: 1.15, rotateY: 12, rotateX: -8 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Soap bubble base — iridescent transparent */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-105"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0.03) 80%, rgba(255,255,255,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: 'inset 0 0 40px rgba(255,255,255,0.03), inset 0 -20px 40px rgba(0,0,0,0.15), 0 0 30px rgba(255,255,255,0.04)',
              }}
            />
            {/* Iridescent rainbow sheen — like soap */}
            <div
              className="absolute inset-[2px] rounded-full opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background: 'conic-gradient(from 120deg at 50% 50%, rgba(180,200,255,0.15) 0deg, rgba(200,180,255,0.12) 60deg, rgba(255,180,200,0.10) 120deg, rgba(200,255,200,0.12) 180deg, rgba(180,220,255,0.15) 240deg, rgba(220,180,255,0.10) 300deg, rgba(180,200,255,0.15) 360deg)',
              }}
            />
            {/* Top crescent highlight — 3D depth */}
            <div
              className="absolute inset-[4px] rounded-full"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 25%, transparent 50%)',
              }}
            />
            {/* Primary specular — bright oval spot */}
            <div className="absolute left-[15%] top-[10%] h-[35%] w-[35%] rounded-full bg-white/12 blur-lg" />
            <div className="absolute left-[20%] top-[14%] h-[15%] w-[22%] rounded-[50%] bg-white/30 blur-[6px]" />
            {/* Small secondary specular — bottom-right */}
            <div className="absolute bottom-[18%] right-[15%] h-[10%] w-[14%] rounded-full bg-white/15 blur-[4px]" />
            {/* Inner shadow depth — bottom hemisphere darker */}
            <div
              className="absolute inset-[2px] rounded-full"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.20) 0%, transparent 45%)',
              }}
            />
            {/* Rim light — edge refraction */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.08) 80%, rgba(255,255,255,0.15) 95%, transparent 100%)',
              }}
            />
            {/* Hover glow aura */}
            <div className="absolute -inset-4 rounded-full bg-white/[0.03] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            {/* Label */}
            <span className="relative z-10 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-white/50 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:text-white/80 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)] md:text-sm">
              {label}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Explosion particles */}
      {exploding && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Flash */}
          <motion.div
            className="absolute h-36 w-36 rounded-full bg-white/20 md:h-44 md:w-44 lg:h-48 lg:w-48"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          {/* Ring */}
          <motion.div
            className="absolute h-36 w-36 rounded-full border-2 border-white/30 md:h-44 md:w-44 lg:h-48 lg:w-48"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Particles */}
          <div className="relative">
            {particles.map((p, i) => (
              <Particle key={i} angle={p.angle} delay={p.delay} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrandStatement() {
  const t = useTranslations('brand');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const values = [
    { key: 'excellence' as const },
    { key: 'closeness' as const },
    { key: 'speed' as const },
  ];

  const bubbles = [
    { label: tNav('development'), href: `/${locale}/development`, floatDelay: 0.2, floatDuration: 4.5 },
    { label: tNav('security'), href: `/${locale}/security`, floatDelay: 0.5, floatDuration: 5.2 },
    { label: tNav('growth'), href: `/${locale}/growth`, floatDelay: 0.8, floatDuration: 4.8 },
  ];

  return (
    <section className="bg-metallic-dark py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — Text */}
          <div>
            {/* Headline */}
            <ScrollReveal>
              <h2 className="font-headline max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {t('headline')}
              </h2>
            </ScrollReveal>

            {/* Accent line */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 h-[2.5px] w-[60px] bg-white" />
            </ScrollReveal>

            {/* Body copy */}
            <ScrollReveal delay={0.5}>
              <div className="mt-10 space-y-6">
                <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                  {t('paragraph1')}
                </p>
                <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                  {t('paragraph2')}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Floating Bubbles */}
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {bubbles.map((bubble) => (
                <ExplodingBubble
                  key={bubble.href}
                  label={bubble.label}
                  href={bubble.href}
                  floatDelay={bubble.floatDelay}
                  floatDuration={bubble.floatDuration}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Core values strip — full width below */}
        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3 md:gap-12" staggerDelay={0.15} delay={0.6}>
          {values.map((value) => (
            <StaggerItem key={value.key}>
              <div className="border-l-2 border-gray-600 pl-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white">
                  {t(`values.${value.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {t(`values.${value.key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
