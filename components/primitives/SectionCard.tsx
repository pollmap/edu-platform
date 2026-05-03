import type { ReactNode } from 'react';

interface SectionCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  as?: 'section' | 'article';
}

export function SectionCard({ title, children, className = '', as = 'section' }: SectionCardProps) {
  const Tag = as;
  return (
    <Tag className={`mb-6 ${className}`}>
      {title ? (
        <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{title}</h2>
      ) : null}
      <div className="space-y-3 text-zinc-800 dark:text-zinc-200 leading-relaxed">{children}</div>
    </Tag>
  );
}
