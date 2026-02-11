'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const locales = ['en', 'es', 'bg'] as const;

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the current locale in the path
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as typeof locales[number])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1 text-xs uppercase tracking-[0.1em]" role="navigation" aria-label="Language switcher">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => switchLocale(loc)}
            className={`px-1 py-0.5 transition-colors duration-200 ${
              currentLocale === loc
                ? 'text-white font-semibold'
                : 'text-gray-500 hover:text-white'
            }`}
            aria-label={`Switch to ${loc.toUpperCase()}`}
            aria-current={currentLocale === loc ? 'true' : undefined}
          >
            {loc.toUpperCase()}
          </button>
          {i < locales.length - 1 && (
            <span className="text-gray-600 mx-0.5">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
