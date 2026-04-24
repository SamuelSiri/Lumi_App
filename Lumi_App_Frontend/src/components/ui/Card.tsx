import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
  header?: ReactNode;
  footer?: ReactNode;
  noPadding?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      header,
      footer,
      noPadding = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl shadow-card transition-shadow duration-300 ease-out',
          'hover:shadow-float',
          variant === 'default' && 'gradient-card border border-gris-100',
          variant === 'glass' && 'glass',
          className
        )}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-gris-100">
            {header}
          </div>
        )}

        <div className={clsx(!noPadding && 'p-6')}>
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-gris-100">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
