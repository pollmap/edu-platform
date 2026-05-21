'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchDialog } from './SearchDialog';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS: { label: string; href: string; subItems?: { label: string; href: string }[] }[] = [
  {
    label: '초등',
    href: '/grade-3',
    subItems: [
      { label: '3학년', href: '/grade-3' },
      { label: '4학년', href: '/grade-4' },
      { label: '5학년', href: '/grade-5' },
      { label: '6학년', href: '/grade-6' },
    ],
  },
  {
    label: '중등',
    href: '/grade-7',
    subItems: [
      { label: '7학년', href: '/grade-7' },
      { label: '8학년', href: '/grade-8' },
      { label: '9학년', href: '/grade-9' },
    ],
  },
  {
    label: '고등',
    href: '/highschool',
  },
  {
    label: '공통',
    href: '/common/korean',
    subItems: [
      { label: '국어', href: '/common/korean' },
      { label: '영어', href: '/common/english' },
    ],
  },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 dark:bg-black/85 border-b border-zinc-200 dark:border-white/10">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-extrabold tracking-tight text-zinc-900 dark:text-white shrink-0 text-lg"
          >
            개념지도
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
                >
                  {item.label}
                </Link>
                {item.subItems && openMenu === item.label && (
                  <ul className="absolute top-full left-0 min-w-[140px] py-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="단원 검색"
              className="flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-300 dark:border-white/15 bg-white dark:bg-zinc-950 text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition"
            >
              <span aria-hidden="true">🔍</span>
              <span className="hidden sm:inline">검색</span>
              <kbd className="hidden md:inline font-mono text-[10px] px-1 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400">
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
