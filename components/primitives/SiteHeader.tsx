'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchDialog } from './SearchDialog';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || '').toLowerCase();
      const isCmdK = (e.metaKey || e.ctrlKey) && k === 'k';
      const isSlash = k === '/' && !e.metaKey && !e.ctrlKey;
      if (!isCmdK && !isSlash) return;
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
      setSearchOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-700 dark:hover:text-blue-400 transition shrink-0"
          >
            한국 교육 인터랙티브
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="단원 검색"
              className="flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <span aria-hidden="true">🔍</span>
              <span className="hidden sm:inline">단원 검색</span>
              <kbd className="hidden md:inline font-mono text-[10px] px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                Ctrl K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
