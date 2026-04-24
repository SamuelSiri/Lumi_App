import { type ReactNode, type HTMLAttributes } from 'react';
import clsx from 'clsx';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: TooltipPosition;
  children: ReactNode;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gris-800 border-x-transparent border-b-transparent border-4',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gris-800 border-x-transparent border-t-transparent border-4',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gris-800 border-y-transparent border-r-transparent border-4',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gris-800 border-y-transparent border-l-transparent border-4',
};

export function Tooltip({
  text,
  position = 'top',
  children,
  className,
  ...props
}: TooltipProps) {
  return (
    <div
      className={clsx('relative inline-flex group', className)}
      {...props}
    >
      {children}

      <div
        role="tooltip"
        className={clsx(
          'absolute z-50 pointer-events-none',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200',
          positionClasses[position]
        )}
      >
        <div
          className={clsx(
            'bg-gris-800 text-white text-xs font-medium',
            'px-2.5 py-1.5 rounded-lg whitespace-nowrap',
            'shadow-md relative'
          )}
        >
          {text}
          <span
            className={clsx('absolute w-0 h-0', arrowClasses[position])}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
