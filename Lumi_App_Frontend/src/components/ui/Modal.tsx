import { type ReactNode, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { X } from 'lucide-react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 28, stiffness: 300 },
  },
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.2 } },
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-modal="true"
          role="dialog"
          aria-label={title ?? 'Di\u00e1logo'}
        >
          {/* Fondo con desenfoque */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={clsx(
              'relative z-10 w-full sm:max-w-lg bg-white',
              'rounded-t-2xl sm:rounded-2xl shadow-float',
              'flex flex-col max-h-[90dvh]',
              className
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Encabezado */}
            {(title || true) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gris-100 shrink-0">
                {title && (
                  <h2 className="text-lg font-semibold text-gris-800">
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar di\u00e1logo"
                  className={clsx(
                    'ml-auto p-1.5 rounded-lg text-gris-400 hover:text-gris-700 hover:bg-gris-100',
                    'transition-colors cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosa'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Contenido */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {children}
            </div>

            {/* Pie */}
            {footer && (
              <div className="px-6 py-4 border-t border-gris-100 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
