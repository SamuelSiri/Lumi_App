import { type ReactNode } from 'react';
import clsx from 'clsx';
import { Inbox } from 'lucide-react';
import Button from './Button';

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title = 'No hay datos disponibles',
  description = 'A\u00fan no se ha registrado informaci\u00f3n en esta secci\u00f3n.',
  ctaLabel,
  onCtaClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
      role="status"
    >
      <div className="w-20 h-20 rounded-full bg-rosa-50 flex items-center justify-center mb-5">
        {icon ?? <Inbox size={36} className="text-rosa" />}
      </div>

      <h3 className="text-lg font-semibold text-gris-700 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gris-400 max-w-sm mb-6">
        {description}
      </p>

      {ctaLabel && onCtaClick && (
        <Button variant="primary" size="md" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
