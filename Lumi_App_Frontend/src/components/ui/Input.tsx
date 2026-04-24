import {
  type InputHTMLAttributes,
  forwardRef,
  useState,
  useId,
} from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      helperText,
      error,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-gris-700 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={clsx(
              'w-full rounded-xl border bg-white px-4 py-2.5 text-base text-gris-700',
              'placeholder:text-gris-400',
              'transition-all duration-200 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gris-50',
              error
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gris-200 hover:border-gris-300',
              isPassword && 'pr-11',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar contrase\u00f1a' : 'Mostrar contrase\u00f1a'}
              onClick={() => setShowPassword((v) => !v)}
              className={clsx(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'text-gris-400 hover:text-gris-600 transition-colors cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosa rounded'
              )}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500 mt-0.5">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-gris-400 mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
