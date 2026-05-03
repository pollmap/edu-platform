import type { ReactNode } from 'react';

interface UnitsLayoutProps {
  children: ReactNode;
}

export default function UnitsLayout({ children }: UnitsLayoutProps) {
  return (
    <div className="min-h-full bg-white dark:bg-zinc-950">
      {children}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        출처: NCIC 2022 개정 교육과정 / 한국교육과정평가원 (성취기준)
      </footer>
    </div>
  );
}
