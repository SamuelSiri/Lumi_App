import { type HTMLAttributes } from 'react';
import clsx from 'clsx';

export type SkeletonVariant = 'text' | 'card' | 'avatar' | 'chart';

export interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  lines?: number;
}

function SkeletonText({ lines = 3 }: { lines: number }) {
  return (
    <div className="flex flex-col gap-2.5" role="status" aria-label="Cargando contenido...">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'skeleton h-4 rounded-md',
            i === lines - 1 && 'w-3/5'
          )}
        />
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border border-gris-100 p-6 space-y-4"
      role="status"
      aria-label="Cargando tarjeta..."
    >
      <div className="skeleton h-5 w-2/5 rounded-md" />
      <div className="skeleton h-4 w-full rounded-md" />
      <div className="skeleton h-4 w-4/5 rounded-md" />
      <div className="skeleton h-32 w-full rounded-xl mt-2" />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

function SkeletonAvatar() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="Cargando perfil...">
      <div className="skeleton w-10 h-10 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="skeleton h-4 w-28 rounded-md" />
        <div className="skeleton h-3 w-20 rounded-md" />
      </div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div
      className="rounded-2xl border border-gris-100 p-6 space-y-4"
      role="status"
      aria-label="Cargando gr\u00e1fico..."
    >
      <div className="skeleton h-5 w-1/3 rounded-md" />
      <div className="flex items-end gap-2 h-40">
        {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
          <div
            key={i}
            className="skeleton flex-1 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export function SkeletonLoader({
  variant = 'text',
  lines = 3,
  className,
  ...props
}: SkeletonLoaderProps) {
  return (
    <div className={clsx('animate-pulse-soft', className)} {...props}>
      {variant === 'text' && <SkeletonText lines={lines} />}
      {variant === 'card' && <SkeletonCard />}
      {variant === 'avatar' && <SkeletonAvatar />}
      {variant === 'chart' && <SkeletonChart />}
    </div>
  );
}

export default SkeletonLoader;
