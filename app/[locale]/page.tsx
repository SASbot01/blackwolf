import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/routing';
import Hero from '@/components/sections/Hero';
import LogoCarousel from '@/components/sections/LogoCarousel';
import BrandStatement from '@/components/sections/BrandStatement';
import PortfolioSection from '@/components/sections/PortfolioSection';
import DivisionsOverview from '@/components/sections/DivisionsOverview';
import AIHighlight from '@/components/sections/AIHighlight';
import CTASection from '@/components/sections/CTASection';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <LogoCarousel />
      <BrandStatement />
      <PortfolioSection />
      {/* <DivisionsOverview /> */}
      <AIHighlight />
      <CTASection />
    </>
  );
}
