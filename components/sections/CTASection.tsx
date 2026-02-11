'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <SectionLabel>{t('sectionLabel')}</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-headline mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('headline')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
              {t('description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Link
              href={`/${locale}/contact`}
              className="mt-10 inline-block bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-gray-200"
            >
              {t('button')}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
