import { CardTableSkeleton } from '@/components/ui/Skeleton';

export default function AppLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="h-5 w-48 animate-pulse rounded-md bg-surface-muted" />
        <div className="h-9 w-32 animate-pulse rounded-xl bg-surface-muted" />
      </div>
      <CardTableSkeleton rows={3} cols={8} />
      <CardTableSkeleton rows={3} cols={8} />
    </div>
  );
}
