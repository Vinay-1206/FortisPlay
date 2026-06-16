'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CreditCard, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

/** Admin login form: card ID + password, with a show/hide password toggle. */
export function LoginForm() {
  const router = useRouter();
  const { show } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an authentication request.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);
    show({ title: 'Signed in', description: 'Redirecting to the dashboard…', variant: 'success' });
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-ink-900">Admin</h1>
        <p className="mt-1 text-sm text-ink-500">Enter your credentials to continue</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="User ID"
          name="cardId"
          placeholder="Card ID"
          leftIcon={<CreditCard className="h-4 w-4" />}
          autoComplete="username"
          required
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          autoComplete="current-password"
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-ink-400 transition-colors hover:text-ink-900"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
      </div>

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
}
