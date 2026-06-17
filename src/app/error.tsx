'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { Footer } from '@/components/layout/Footer';

export default function RootError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-auth-gradient">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Logo className="mb-10 scale-125" />

        <section className="w-full max-w-[400px] rounded-3xl border border-white/50 bg-white p-6 text-center shadow-elevated sm:p-10">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-status-stopped">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-ink-900">Something went wrong</h1>
          <p className="mt-2 text-sm leading-6 text-ink-500">
            We could not load the admin console. Try again in a moment.
          </p>
          <Button className="mt-6 w-full" onClick={reset} leftIcon={<RotateCcw className="h-4 w-4" />}>
            Try again
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
