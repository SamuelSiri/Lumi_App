import { type HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percentage = Math.round((clamped / max) * 100);

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full', className)} {...props}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gris-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-rosa" aria-live="polite">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? `Progreso: ${percentage}%`}
        className="w-full h-2.5 bg-gris-100 rounded-full overflow-hidden"
      >
        <div
          className="h-full rounded-full gradient-rosa transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
