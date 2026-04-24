import { useId } from 'react';
import clsx from 'clsx';

export interface ToggleProps {
  label?: string;
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Toggle({
  label,
  checked = false,
  disabled = false,
  onToggle,
  className,
  id: externalId,
}: ToggleProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex items-center gap-3 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <span className="relative inline-flex">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onToggle?.(e.target.checked)}
          aria-checked={checked}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className={clsx(
            'block w-11 h-6 rounded-full transition-colors duration-200',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-rosa peer-focus-visible:ring-offset-2',
            checked ? 'bg-rosa' : 'bg-gris-300'
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md',
            'transition-transform duration-200 ease-out',
            checked && 'translate-x-5'
          )}
        />
      </span>

      {label && (
        <span className="text-sm font-medium text-gris-700">{label}</span>
      )}
    </label>
  );
}

export default Toggle;
