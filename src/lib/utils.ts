import { clsx, type ClassValue } from 'clsx';

/**
 * Merge conditional class names into a single string.
 * Thin wrapper around `clsx` so the rest of the app has one
 * canonical place to import className helpers from.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format a number with thousands separators (e.g. 123456 -> 123,456). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/** Truncate text to a max length, appending an ellipsis if truncated. */
export function truncate(text: string, max = 40): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
