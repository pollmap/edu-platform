import { describe, expect, it } from 'vitest';
import { getSiteUrl } from '@/lib/site-url';

describe('getSiteUrl', () => {
  it('prefers an explicit public site URL and strips trailing paths', () => {
    expect(getSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://learn.example.com/path/' })).toBe(
      'https://learn.example.com',
    );
  });

  it('uses the Vercel production URL when no explicit site URL is set', () => {
    expect(getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'edu-platform.vercel.app' })).toBe(
      'https://edu-platform.vercel.app',
    );
  });

  it('falls back to the deployment URL for preview builds', () => {
    expect(getSiteUrl({ VERCEL_URL: 'edu-platform-git-main.vercel.app' })).toBe(
      'https://edu-platform-git-main.vercel.app',
    );
  });

  it('preserves http for explicit local development hosts', () => {
    expect(getSiteUrl({ NEXT_PUBLIC_SITE_URL: 'localhost:3000/docs' })).toBe('http://localhost:3000');
  });

  it('keeps local development deterministic when deployment env is absent', () => {
    expect(getSiteUrl({})).toBe('http://localhost:3000');
  });
});
