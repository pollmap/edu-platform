'use client';

interface Preset<T> {
  label: string;
  value: T;
}

interface PresetBarProps<T> {
  presets: Array<Preset<T>>;
  onSelect: (value: T) => void;
  resetLabel?: string;
  onReset?: () => void;
}

export function PresetBar<T>({ presets, onSelect, resetLabel = '처음으로', onReset }: PresetBarProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((p, idx) => (
          <button
            key={`${p.label}-${idx}`}
            type="button"
            onClick={() => onSelect(p.value)}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
      </div>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="self-end px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors min-h-[44px]"
        >
          {resetLabel}
        </button>
      ) : null}
    </div>
  );
}
