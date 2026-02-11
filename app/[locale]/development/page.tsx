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
    title: t('development.title'),
    description: t('development.description'),
  };
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'development' });

  const serviceKeys = ['customAppDev', 'saasArchitecture', 'agencySolutions', 'digitalProductDesign', 'apiDevelopment', 'mobileApps'];
  const services = serviceKeys.map(key => ({
    title: t(`services.items.${key}.title`),
    description: t(`services.items.${key}.description`),
  }));

  const aiKeys = ['codeGeneration', 'automatedTesting', 'predictiveArchitecture'];
  const aiItems = aiKeys.map(key => t(`ai.examples.${key}.description`));

  const capabilities: string[] = t.raw('capabilities.items');

  return (
    <>
      <DivisionHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        statement={t('hero.statement')}
      />
      <ServicesSection heading={t('services.sectionLabel')} items={services} />
      <AISection heading={t('ai.heading')} items={aiItems} />
      <CapabilitiesSection capabilities={capabilities} />
      <Contact />
    </>
  );
}
