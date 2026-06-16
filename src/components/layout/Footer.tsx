/** Minimal site footer shown on the login screen and dashboard shell. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-muted bg-white py-4 text-center text-xs text-ink-500">
      © {year} FortisPlay. All rights reserved.
    </footer>
  );
}
