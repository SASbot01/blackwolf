'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  contactLabel: string;
  locale: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  contactLabel,
  locale,
}: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-black"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-4">
            <button
              onClick={onClose}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-white transition-colors hover:text-gray-400"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : navLinks.length * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                href={`/${locale}/contact`}
                onClick={onClose}
                className="mt-4 inline-block rounded-[2px] border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
              >
                {contactLabel}
              </Link>
            </motion.div>
          </nav>

          {/* Language switcher at bottom */}
          <div className="flex justify-center pb-12">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
