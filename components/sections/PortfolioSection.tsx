'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';
import SectionLabel from '@/components/ui/SectionLabel';

export default function PortfolioSection() {
  const t = useTranslations('portfolio');

  const stats = ['cashCollected', 'clients', 'apps', 'protected'] as const;

  return (
    <section className="bg-charcoal py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-headline mt-6 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-sm uppercase tracking-[0.1em] text-gray-500">
            {t('disclaimer')}
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.15}
          delay={0.3}
        >
          {stats.map((statKey) => (
            <StaggerItem key={statKey}>
              <div className="flex aspect-square flex-col items-center justify-center rounded-sm border border-gray-800 bg-black/30 p-8 text-center transition-all duration-300 hover:border-gray-600 hover:bg-black/50">
                <p className="font-headline text-4xl font-bold text-white md:text-5xl">
                  {t(`stats.${statKey}.value`)}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  {t(`stats.${statKey}.label`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
