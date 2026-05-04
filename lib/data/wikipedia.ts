// 위키미디어 한국어 요약 데이터.
// 출처: scripts/scrape/fetch_wikipedia.py
// 라이선스: CC BY-SA 3.0

import biology from '@/docs/data-sources/wikipedia-biology.json';
import figures from '@/docs/data-sources/wikipedia-korea-figures.json';
import history from '@/docs/data-sources/wikipedia-korea-history.json';
import planets from '@/docs/data-sources/wikipedia-planets.json';

export interface WikiSummary {
  title: string;
  label: string;
  extract: string | null;
  description: string | null;
  thumbnail: string | null;
  originalimage: string | null;
  pageid: number | null;
  wikibase_item: string | null;
  url: string | null;
  license: string;
}

export interface WikiBundle {
  source: string;
  license: string;
  fetched_at: string;
  count: number;
  items: WikiSummary[];
}

export const KOREA_HISTORY: WikiBundle = history as WikiBundle;
export const KOREA_FIGURES: WikiBundle = figures as WikiBundle;
export const PLANETS: WikiBundle = planets as WikiBundle;
export const BIOLOGY: WikiBundle = biology as WikiBundle;

export function findWiki(bundle: WikiBundle, label: string): WikiSummary | undefined {
  return bundle.items.find(
    (i) => i.label === label || i.title === label,
  );
}
