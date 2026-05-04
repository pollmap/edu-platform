'use client';

import Fuse from 'fuse.js';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FUSE_OPTIONS, SEARCH_DOCS, type SearchDoc } from '@/lib/search-index';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const MAX_RESULTS = 30;

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => new Fuse(SEARCH_DOCS, FUSE_OPTIONS), []);

  const results: SearchDoc[] = useMemo(() => {
    const term = q.trim();
    if (!term) return SEARCH_DOCS.slice(0, MAX_RESULTS);
    return fuse.search(term, { limit: MAX_RESULTS }).map((r) => r.item);
  }, [q, fuse]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[active];
      if (target) {
        window.location.href = target.url;
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="단원 검색"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-2xl overflow-hidden">
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-3">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="단원 ID·제목·영역으로 검색 (예: 이차함수, M9-CR-03, 분수)"
            className="w-full bg-transparent px-2 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
            aria-label="검색어"
          />
        </div>
        <ul className="max-h-[60vh] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-zinc-500 text-sm">
              결과 없음 — 다른 키워드를 시도하세요.
            </li>
          )}
          {results.map((doc, i) => (
            <li key={doc.id}>
              <Link
                href={doc.url}
                onClick={onClose}
                className={`block px-4 py-3 transition ${
                  i === active
                    ? 'bg-blue-50 dark:bg-blue-950/40'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {doc.id}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {doc.grade} · {doc.subject}
                    {doc.category ? ` · ${doc.category}` : ''}
                  </span>
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {doc.title}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {doc.domain} · {doc.interactiveTitle}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 text-[11px] text-zinc-500 flex justify-between">
          <span>↑↓ 이동 · Enter 열기 · Esc 닫기</span>
          <span>{results.length} / {SEARCH_DOCS.length} 단원</span>
        </div>
      </div>
    </div>
  );
}
