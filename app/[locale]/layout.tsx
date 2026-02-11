import type { Metadata } from 'next';
import { Inter, Syne, Josefin_Sans } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/ui/AIChat';
import ScrollProgress from '@/components/animations/ScrollProgress';
import '../globals.css';

// Fonts
const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-josefin',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Blackwolf',
  description: 'Blackwolf - Corporate Website',
  icons: {
    icon: '/images/wolf-icon.png',
    apple: '/images/wolf-icon.png',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${syne.variable} ${geistMono.variable} ${josefinSans.variable} antialiased bg-black text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <AIChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
