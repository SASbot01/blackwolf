import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/development`, label: t('nav.development') },
    { href: `/${locale}/security`, label: t('nav.security') },
    { href: `/${locale}/growth`, label: t('nav.growth') },
    { href: `/${locale}/team`, label: t('nav.team') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <footer className="border-t border-gray-800 bg-metallic-dark" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Wordmark */}
          <div>
            <span className="font-display text-sm font-bold tracking-[0.1em] text-white">
              BLACKWOLF
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-400">
            {t('footer.tagline')}
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.1em] text-gray-500 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gray-800/50 pt-8 text-xs text-gray-600 md:flex-row md:items-center">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
