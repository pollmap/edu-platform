'use client';

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  unit?: string;
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  unit = '',
}: SliderRowProps) {
  const display = format ? format(value) : value.toFixed(2);
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-bold text-blue-700 dark:text-blue-400">{label}</span>
        <span className="font-mono text-red-500 dark:text-red-400 font-semibold">
          {display}
          {unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-3 cursor-pointer accent-blue-600"
        aria-label={label}
      />
    </div>
  );
}
