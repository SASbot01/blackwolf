'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export default function ThankYouContent() {
  const t = useTranslations('thankYou');
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-metallic-dark flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/images/wolf-icon.png"
          alt=""
          width={80}
          height={80}
          className="mx-auto mb-8 h-20 w-20 object-contain"
        />

        <h1 className="font-headline text-white text-4xl font-bold md:text-5xl lg:text-6xl">
          {t('headline')}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
          {t('subtitle')}
        </p>

        <Link
          href={`/${locale}`}
          className="mt-10 inline-block rounded-[2px] border border-white/20 px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          {t('backHome')}
        </Link>
      </motion.div>
    </section>
  );
}
