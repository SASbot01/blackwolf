'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactPageContent() {
  const t = useTranslations('contact');

  const formTranslations = {
    fields: {
      name: t('fields.name'),
      company: t('fields.company'),
      email: t('fields.email'),
      service: t('fields.service'),
      message: t('fields.message'),
    },
    services: {
      development: t('services.development'),
      security: t('services.security'),
      growth: t('services.growth'),
      fullEcosystem: t('services.fullEcosystem'),
      other: t('services.other'),
    },
    submitButton: t('submitButton'),
    successMessage: t('successMessage'),
    sending: t('sending'),
    errorMessage: t('errorMessage'),
  };

  return (
    <section className="bg-metallic-dark py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <ScrollReveal>
            <div>
              <h1 className="font-headline text-white text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t('headline')}
              </h1>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${t('email')}`}
                    className="mt-1 inline-block text-lg text-white transition-colors hover:text-gray-400"
                  >
                    {t('email')}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    {t('location')}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — form */}
          <ScrollReveal delay={0.2}>
            <ContactForm translations={formTranslations} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
