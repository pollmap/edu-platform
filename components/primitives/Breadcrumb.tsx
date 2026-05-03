import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="이동 경로" className="text-sm text-zinc-500 dark:text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-zinc-900 dark:text-zinc-100 font-medium' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-zinc-400 dark:text-zinc-600">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
