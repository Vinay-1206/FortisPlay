'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-surface-muted bg-white p-6 text-center shadow-card sm:p-8">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-status-stopped">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-ink-900">This section could not load</h1>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          Refresh this view and we will try to restore the workspace.
        </p>
        <Button className="mt-6" onClick={reset} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Try again
        </Button>
      </div>
    </section>
  );
}
