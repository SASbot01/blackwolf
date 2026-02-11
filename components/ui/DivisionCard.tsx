'use client';

import { useRef, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface DivisionCardProps {
  name: string;
  subtitle: string;
  description: string;
  exploreCta: string;
  href: string;
  index: number;
  image?: string;
}

export default function DivisionCard({
  name,
  subtitle,
  description,
  exploreCta,
  href,
  index,
  image,
}: DivisionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.left = `${x}px`;
    spotlightRef.current.style.top = `${y}px`;
    spotlightRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden py-12 md:py-16"
    >
      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Text content */}
        <div className="flex-1">
          <h3 className="font-display text-2xl font-bold tracking-[0.05em] text-white md:text-3xl lg:text-4xl">
            {name}
          </h3>
          <p className="mt-2 text-sm tracking-wide text-gray-400 md:text-base">
            {subtitle}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            {description}
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors group-hover:text-gray-300">
              {exploreCta}
              <span className="ml-2 inline-block transition-transform duration-250 group-hover:translate-x-2">
                &rarr;
              </span>
            </span>
          </div>
        </div>

        {/* Division image */}
        {image && (
          <div className="relative h-[180px] w-full flex-shrink-0 overflow-hidden rounded-sm md:h-[200px] md:w-[280px] lg:w-[320px]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
          </div>
        )}
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800" />
    </div>
  );

  if (shouldReduceMotion) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link href={href}>{content}</Link>
    </motion.div>
  );
}
