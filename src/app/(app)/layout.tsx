import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

/**
 * Shell shared by all authenticated sections (Dashboard, Masters, ...):
 * top navigation + tab bar, content area, and footer.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <Navbar />
      <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
      <Footer />
    </div>
  );
}
