import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      value,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      disabled = false,
      onChange,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className={clsx('flex flex-col gap-2 w-full', className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium text-gris-700 select-none"
              >
                {label}
              </label>
            )}
            {showValue && (
              <span
                className="text-sm font-semibold text-rosa"
                aria-live="polite"
              >
                {value}
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          <input
            ref={ref}
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            className={clsx(
              'w-full h-2 rounded-full appearance-none cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosa focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
              '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rosa',
              '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
              '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rosa',
              '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md',
              '[&::-moz-range-thumb]:cursor-pointer'
            )}
            style={{
              background: `linear-gradient(to right, var(--color-rosa) 0%, var(--color-rosa-light) ${percentage}%, var(--color-gris-200) ${percentage}%)`,
            }}
            {...props}
          />
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-gris-400">{min}</span>
          <span className="text-xs text-gris-400">{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
