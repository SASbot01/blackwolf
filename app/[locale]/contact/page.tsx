import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/routing';
import EngagementModels from '@/components/sections/EngagementModels';
import ContactPageContent from '@/components/sections/ContactPageContent';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <EngagementModels />
      <ContactPageContent />
    </>
  );
}
