'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';
import SectionLabel from '@/components/ui/SectionLabel';
import Card from '@/components/ui/Card';

export default function EngagementModels() {
  const t = useTranslations('engagement');

  const models = [
    { key: 'alaCarte' as const, variant: 'default' as const },
    { key: 'allInOne' as const, variant: 'highlighted' as const },
    { key: 'equity' as const, variant: 'default' as const },
  ];

  return (
    <section className="bg-metallic-dark py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-headline mt-6 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="mt-16 grid gap-6 md:grid-cols-3"
          staggerDelay={0.15}
          delay={0.3}
        >
          {models.map((model) => (
            <StaggerItem key={model.key}>
              <Card variant={model.variant} className="relative flex flex-col">
                {model.variant === 'highlighted' && (
                  <span className="mb-4 inline-block self-start rounded-[2px] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                    {t(`models.${model.key}.recommended`)}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  {t(`models.${model.key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {t(`models.${model.key}.subtitle`)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  {t(`models.${model.key}.description`)}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
