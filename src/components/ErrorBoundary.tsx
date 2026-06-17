'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  resetKeys?: readonly unknown[];
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep this local for now; swap for remote logging when monitoring is added.
    console.error('Unhandled application error:', error, errorInfo);
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (!this.state.error) {
      return;
    }

    if (haveResetKeysChanged(previousProps.resetKeys, this.props.resetKeys)) {
      this.reset();
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    const showDetails = process.env.NODE_ENV === 'development';

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-page px-4 py-10">
        <section className="w-full max-w-md rounded-xl border border-surface-muted bg-white p-6 text-center shadow-card sm:p-8">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-status-stopped">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-ink-900">Something went wrong</h1>
          <p className="mt-2 text-sm leading-6 text-ink-500">
            The admin workspace hit an unexpected error. Try again, or refresh the page if it keeps
            happening.
          </p>
          {showDetails && (
            <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-surface-subtle p-3 text-left text-xs text-ink-700">
              {this.state.error.message}
            </pre>
          )}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={this.reset} leftIcon={<RotateCcw className="h-4 w-4" />}>
              Try again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

function haveResetKeysChanged(previousKeys?: readonly unknown[], nextKeys?: readonly unknown[]) {
  if (previousKeys === nextKeys) {
    return false;
  }

  if (!previousKeys || !nextKeys || previousKeys.length !== nextKeys.length) {
    return true;
  }

  return previousKeys.some((key, index) => !Object.is(key, nextKeys[index]));
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return <ErrorBoundary resetKeys={[pathname]}>{children}</ErrorBoundary>;
}
