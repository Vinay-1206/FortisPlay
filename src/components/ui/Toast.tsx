'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToastMessage, ToastVariant } from '@/types';

interface ToastContextValue {
  toasts: ToastMessage[];
  show: (toast: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const iconColors: Record<ToastVariant, string> = {
  success: 'text-status-live',
  error: 'text-status-stopped',
  info: 'text-primary-500',
  warning: 'text-status-warning',
};

/** Wrap the app in this provider once (done in the root layout). */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

/** Hook for triggering toast notifications anywhere in the app. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

function Toaster() {
  const ctx = useContext(ToastContext);
  if (!ctx || typeof document === 'undefined') return null;
  const { toasts, dismiss } = ctx;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => {
        const Icon = icons[toast.variant];
        return (
          <div
            key={toast.id}
            role="status"
            className="flex items-start gap-3 rounded-xl border border-surface-muted bg-white p-4 shadow-elevated animate-fade-in"
          >
            <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', iconColors[toast.variant])} aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">{toast.title}</p>
              {toast.description && <p className="mt-0.5 text-sm text-ink-500">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-ink-400 transition-colors hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
