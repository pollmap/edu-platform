'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('[app/error]', error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          페이지를 표시하다 문제가 생겼어요
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {error.message ?? '알 수 없는 오류'}
        </p>
        {error.digest ? (
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            digest: {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
