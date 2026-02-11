'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import DivisionCard from '@/components/ui/DivisionCard';

const divisionImages: Record<string, string> = {
  development: '/images/division-development.jpg',
  security: '/images/division-security.jpg',
  growth: '/images/division-growth.jpg',
};

export default function DivisionsOverview() {
  const t = useTranslations('divisions');
  const locale = useLocale();

  const divisions = [
    {
      key: 'development',
      href: `/${locale}/development`,
    },
    {
      key: 'security',
      href: `/${locale}/security`,
    },
    {
      key: 'growth',
      href: `/${locale}/growth`,
    },
  ] as const;

  return (
    <section className="bg-charcoal py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
        </ScrollReveal>

        <div className="mt-16 space-y-4">
          {divisions.map((division, i) => (
            <DivisionCard
              key={division.key}
              name={t(`${division.key}.name`)}
              subtitle={t(`${division.key}.subtitle`)}
              description={t(`${division.key}.description`)}
              exploreCta={t(`${division.key}.exploreCta`)}
              href={division.href}
              index={i}
              image={divisionImages[division.key]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
