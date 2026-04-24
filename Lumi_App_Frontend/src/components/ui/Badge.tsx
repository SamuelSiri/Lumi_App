import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

export type BadgeVariant = 'critica' | 'alta' | 'media' | 'baja' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  critica: 'bg-red-100 text-red-700 border-red-200',
  alta: 'bg-orange-100 text-orange-700 border-orange-200',
  media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  baja: 'bg-green-100 text-green-700 border-green-200',
  info: 'bg-azul-50 text-azul border-azul-100',
};

const variantLabels: Record<BadgeVariant, string> = {
  critica: 'Severidad cr\u00edtica',
  alta: 'Severidad alta',
  media: 'Severidad media',
  baja: 'Severidad baja',
  info: 'Informativo',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'info', children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={variantLabels[variant]}
        className={clsx(
          'inline-flex items-center rounded-full border',
          'px-2.5 py-0.5 text-xs font-semibold leading-tight',
          'select-none whitespace-nowrap',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
