'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

/**
 * Slide-in panel from the left or right edge of the screen.
 * Used for the mobile navigation sidebar and side-form panels
 * (e.g. "Add Venue").
 */
export function Drawer({ isOpen, onClose, title, children, side = 'right', className }: DrawerProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex bg-ink-900/40 animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'flex h-full w-full max-w-sm flex-col bg-white shadow-modal animate-slide-in-right',
          side === 'right' ? 'ml-auto' : 'mr-auto',
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-surface-muted px-5 py-4">
            <h2 className="text-lg font-bold text-ink-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="rounded-lg p-1 text-ink-400 transition-colors hover:bg-surface-subtle hover:text-ink-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
