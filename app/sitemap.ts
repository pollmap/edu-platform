import type { MetadataRoute } from 'next';
import { CURRICULUM, HIGHSCHOOL_UNITS, unitPath } from '@/lib/curriculum';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const grades = [3, 4, 5, 6, 7, 8, 9] as const;
  const subjects = ['math', 'science', 'korean', 'english', 'social'] as const;

  const root: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
  ];

  const indexes: MetadataRoute.Sitemap = grades.flatMap((g) =>
    subjects.map((s) => ({
      url: `${BASE}/grade-${g}/${s}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  const units: MetadataRoute.Sitemap = [...CURRICULUM, ...HIGHSCHOOL_UNITS].map((u) => ({
    url: `${BASE}${unitPath(u)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority:
      u.priority === 'P0' ? 0.9 : u.priority === 'P1' ? 0.7 : 0.5,
  }));

  return [...root, ...indexes, ...units];
}
