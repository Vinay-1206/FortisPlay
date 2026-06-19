import type { Metadata } from 'next';
import { Logo } from '@/components/layout/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Admin Login',
};

/**
 * Public admin login screen. Light cyan gradient background with a
 * centered, max-width-400px credentials card — matches the source design.
 */
export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/loginBg.jpg')",
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Logo className="mb-10 scale-125" />

        <div className="w-full max-w-[400px] rounded-3xl border border-white/50 bg-white p-6 shadow-elevated sm:p-10">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
