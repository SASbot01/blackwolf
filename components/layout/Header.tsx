'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const serviceLinks = [
    { href: `/${locale}/development`, label: t('development') },
    { href: `/${locale}/security`, label: t('security') },
    { href: `/${locale}/growth`, label: t('growth') },
  ];

  const isServicePage = serviceLinks.some((link) => pathname.startsWith(link.href));

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  // Nav links for mobile menu
  const mobileNavLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/development`, label: t('development') },
    { href: `/${locale}/security`, label: t('security') },
    { href: `/${locale}/growth`, label: t('growth') },
    { href: `/${locale}/team`, label: t('team') },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="Blackwolf Home">
            <Image
              src="/images/wolf-icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-display text-sm font-bold tracking-[0.1em] text-white">
              BLACKWOLF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                isActive(`/${locale}`) && !isServicePage ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('home')}
              {isActive(`/${locale}`) && !isServicePage && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={`relative flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                  isServicePage ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                {t('services')}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {isServicePage && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
                )}
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                  servicesOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <div className="min-w-[200px] rounded-sm border border-gray-800 bg-black/95 py-2 backdrop-blur-xl">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-150 ${
                        isActive(link.href)
                          ? 'bg-white/5 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Team */}
            <Link
              href={`/${locale}/team`}
              className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                isActive(`/${locale}/team`) ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('team')}
              {isActive(`/${locale}/team`) && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
              )}
            </Link>
          </nav>

          {/* Right section */}
          <div className="hidden items-center gap-6 lg:flex">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/contact`}
              className="rounded-[2px] bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-black transition-colors duration-200 hover:bg-gray-200"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-4 bg-white" />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={mobileNavLinks}
        contactLabel={t('contact')}
        locale={locale}
      />
    </>
  );
}
