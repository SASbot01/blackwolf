'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';
import SectionLabel from '@/components/ui/SectionLabel';

export default function ThePackSection() {
  const t = useTranslations('pack');

  const members = [
    {
      key: 'alex',
      instagram: 'https://instagram.com/alexgutierrez',
      initials: 'AG',
      gradient: 'from-gray-700 via-gray-600 to-gray-800',
    },
    {
      key: 'alejandro',
      instagram: 'https://instagram.com/alejandrosilvestre',
      initials: 'AS',
      gradient: 'from-gray-600 via-gray-500 to-gray-700',
    },
  ];

  return (
    <section className="bg-metallic-dark py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-headline text-white mt-6 max-w-2xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="mt-16 grid gap-8 md:grid-cols-2"
          staggerDelay={0.2}
          delay={0.3}
        >
          {members.map((member) => (
            <StaggerItem key={member.key}>
              <div className="group relative overflow-hidden rounded-sm border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-black p-8 transition-all duration-300 hover:border-gray-700/50">
                {/* Photo placeholder with initials */}
                <div className="flex items-start gap-6">
                  <div className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-sm bg-gradient-to-br ${member.gradient}`}>
                    <span className="font-headline text-white text-2xl font-bold">
                      {member.initials}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-headline text-white text-xl font-bold md:text-2xl">
                      {t(`members.${member.key}.name`)}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                      {t(`members.${member.key}.role`)}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                      {t(`members.${member.key}.bio`)}
                    </p>

                    {/* Instagram link */}
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-500 transition-colors hover:text-white"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
