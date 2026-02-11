import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/routing';
import ThankYouContent from '@/components/sections/ThankYouContent';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ThankYouContent />;
}
