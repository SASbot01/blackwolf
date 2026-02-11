import type { MetadataRoute } from 'next';

const locales = ['en', 'es', 'bg'];
const baseUrl = 'https://blackwolfsec.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/development', '/security', '/growth', '/contact', '/thank-you'];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
