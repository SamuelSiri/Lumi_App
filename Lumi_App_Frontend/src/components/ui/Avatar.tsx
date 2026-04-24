import { type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline';
}

const sizeClasses: Record<string, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
};

const statusSizeClasses: Record<string, string> = {
  sm: 'w-2.5 h-2.5 border-[1.5px]',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      name = '',
      size = 'md',
      status,
      className,
      ...props
    },
    ref
  ) => {
    const initials = name ? getInitials(name) : '?';
    const statusLabel =
      status === 'online' ? 'En l\u00ednea' : status === 'offline' ? 'Desconectado' : undefined;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={name || alt || 'Avatar'}
        className={clsx(
          'relative inline-flex shrink-0 items-center justify-center rounded-full',
          'font-semibold select-none overflow-hidden',
          sizeClasses[size],
          !src && 'gradient-rosa text-white',
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}

        {status && (
          <span
            aria-label={statusLabel}
            className={clsx(
              'absolute bottom-0 right-0 rounded-full border-white',
              statusSizeClasses[size],
              status === 'online' && 'bg-green-500',
              status === 'offline' && 'bg-gris-400'
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
