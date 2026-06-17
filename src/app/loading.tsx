import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Footer } from '@/components/layout/Footer';

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-auth-gradient">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Logo className="mb-10 scale-125" />

        <section className="w-full max-w-[400px] rounded-3xl border border-white/50 bg-white p-6 text-center shadow-elevated sm:p-10">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-500" aria-hidden="true" />
          <p className="mt-4 text-sm font-semibold text-ink-700">Loading FortisPlay Admin</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
