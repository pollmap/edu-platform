import type { WikiSummary } from '@/lib/data/wikipedia';

interface WikipediaInfoboxProps {
  data: WikiSummary;
  variant?: 'card' | 'inline';
}

export function WikipediaInfobox({ data, variant = 'card' }: WikipediaInfoboxProps) {
  if (variant === 'inline') {
    return (
      <div className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
        {data.extract && <p className="leading-relaxed">{data.extract}</p>}
        <a
          href={data.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          위키백과 →
        </a>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
      {data.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-32 object-cover bg-zinc-100 dark:bg-zinc-800"
          loading="lazy"
        />
      )}
      <div className="p-3 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{data.title}</h4>
          {data.description && (
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              {data.description}
            </span>
          )}
        </div>
        {data.extract && (
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-5">
            {data.extract}
          </p>
        )}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            {data.license}
          </span>
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              위키백과 →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
