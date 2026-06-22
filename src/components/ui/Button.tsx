import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white shadow-card hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-300',
  secondary:
    'bg-surface-muted text-ink-900 hover:bg-ink-300/40 focus-visible:ring-ink-300',
  outline:
    'border-[1.5px] border-[#2563FF] bg-white text-[#2563FF] hover:bg-[#2563FF]/[0.04] focus-visible:ring-[#2563FF]/30',
  ghost: 'bg-transparent text-ink-700 hover:bg-surface-subtle focus-visible:ring-ink-300',
  danger: 'bg-status-stopped text-white hover:bg-red-700 focus-visible:ring-red-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-[16px] pl-[12px] gap-1 rounded-[8px] text-[14px]',
  md: 'h-10 px-4 gap-2 rounded-[8px] text-[14px]',
  lg: 'h-12 px-6 gap-2 rounded-[8px] text-[16px]',
};

/**
 * Base button used across the admin console.
 * Supports loading state, left/right icons, and 5 visual variants.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
