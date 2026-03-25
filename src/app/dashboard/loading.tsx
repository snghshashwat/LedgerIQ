export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3"></div>
        </div>

        {/* KPI Cards skeleton */}
        <div className="grid grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
            />
          ))}
        </div>

        {/* Filter skeleton */}
        <div className="grid grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded"
            />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-2 gap-6 animate-pulse">
          <div className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        </div>

        {/* Bottom section skeleton */}
        <div className="grid grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
