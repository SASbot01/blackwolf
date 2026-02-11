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
    title: t('growth.title'),
    description: t('growth.description'),
  };
}

export default async function GrowthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'growth' });

  const serviceKeys = ['businessIntelligence', 'salesSystems', 'marketingStrategy', 'teamTraining', 'softwareSolutions', 'communityBuilding'];
  const services = serviceKeys.map(key => ({
    title: t(`services.items.${key}.title`),
    description: t(`services.items.${key}.description`),
  }));

  const aiKeys = ['predictiveAnalytics', 'customerIntelligence', 'marketOptimization'];
  const aiItems = aiKeys.map(key => t(`ai.examples.${key}.description`));

  const capabilities: string[] = t.raw('capabilities.items');

  return (
    <>
      <DivisionHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        statement={t('hero.statement')}
        backgroundImage="/images/saas/minimal-calendar.png"
      />
      <ServicesSection heading={t('services.sectionLabel')} items={services} />
      <AISection
        heading={t('ai.heading')}
        items={aiItems}
        backgroundImage="/images/saas/minimal-settings.png"
        note={t('ai.note')}
      />
      <CapabilitiesSection capabilities={capabilities} />
      <Contact />
    </>
  );
}
