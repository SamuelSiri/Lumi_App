import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    'gradient-rosa text-white shadow-md hover:shadow-glow-rosa active:scale-[0.97]',
  secondary:
    'gradient-azul text-white shadow-md hover:shadow-glow-azul active:scale-[0.97]',
  outline:
    'bg-transparent border-2 border-rosa text-rosa hover:bg-rosa-50 active:bg-rosa-100',
  ghost:
    'bg-transparent text-gris-600 hover:bg-gris-100 hover:text-gris-800 active:bg-gris-200',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center font-semibold rounded-xl',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosa focus-visible:ring-offset-2',
          'cursor-pointer select-none',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin shrink-0"
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            aria-hidden="true"
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="shrink-0" aria-hidden="true">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
