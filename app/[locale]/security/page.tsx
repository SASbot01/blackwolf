import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/lib/routing';
import DivisionHero from '@/components/sections/DivisionHero';
import ServicesSection from '@/components/sections/ServicesSection';
import AISection from '@/components/sections/AISection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import Contact from '@/components/sections/Contact';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('security.title'),
    description: t('security.description'),
  };
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'security' });

  const serviceKeys = ['pentesting', 'securityAudits', 'vulnerabilityAssessment', 'infrastructureProtection', 'securityCertification', 'incidentResponse'];
  const services = serviceKeys.map(key => ({
    title: t(`services.items.${key}.title`),
    description: t(`services.items.${key}.description`),
  }));

  const aiKeys = ['threatDetection', 'predictiveDefense', 'automatedResponse'];
  const aiItems = aiKeys.map(key => t(`ai.examples.${key}.description`));

  const capabilities: string[] = t.raw('capabilities.items');

  return (
    <>
      <DivisionHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        statement={t('hero.statement')}
        backgroundImage="/images/saas/soc-overview.png"
      />
      <ServicesSection heading={t('services.sectionLabel')} items={services} />
      <AISection
        heading={t('ai.heading')}
        items={aiItems}
        backgroundImage="/images/saas/soc-threats.png"
        note={t('ai.note')}
      />
      <CapabilitiesSection capabilities={capabilities} />
      <Contact />
    </>
  );
}
