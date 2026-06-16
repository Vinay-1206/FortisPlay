import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

/**
 * Standard text input with optional label, hint, error state and
 * left icon / right element slots (used for the password reveal toggle, etc.)
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightElement, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-900">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex items-center text-ink-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'h-11 w-full rounded-xl border border-surface-muted bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-400',
              'transition-colors duration-150 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
              leftIcon && 'pl-10',
              rightElement && 'pr-10',
              error && 'border-status-stopped focus:border-status-stopped focus:ring-red-100',
              className,
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 flex items-center text-ink-400">
              {rightElement}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-status-stopped">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-ink-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
