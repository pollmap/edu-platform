const LOCAL_SITE_URL = 'http://localhost:3000';

interface SiteUrlEnv {
  [key: string]: string | undefined;
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
}

function withProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(value)) return `http://${value}`;
  return `https://${value}`;
}

function normalizeSiteUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  try {
    const url = new URL(withProtocol(trimmed));
    return url.origin;
  } catch {
    return undefined;
  }
}

export function getSiteUrl(
  env: SiteUrlEnv = process.env,
): string {
  return (
    normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(env.VERCEL_URL) ??
    LOCAL_SITE_URL
  );
}
