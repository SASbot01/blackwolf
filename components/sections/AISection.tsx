'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';

interface AISectionProps {
  heading: string;
  items: string[];
  backgroundImage?: string;
  note?: string;
}

export default function AISection({ heading, items, backgroundImage, note }: AISectionProps) {
  return (
    <section className="relative bg-metallic-dark py-24 md:py-32 lg:py-40 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
            {heading}
          </h2>
          {note && (
            <p className="mt-3 text-sm tracking-wide text-gray-400">
              {note}
            </p>
          )}
        </ScrollReveal>

        <StaggerContainer className="mt-12 space-y-8" staggerDelay={0.15} delay={0.2}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-4 border-l border-gray-700 pl-6">
                <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                  {item}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
