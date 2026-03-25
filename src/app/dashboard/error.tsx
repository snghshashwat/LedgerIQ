"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, etc.)
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-red-900 dark:text-red-100">
              Dashboard Error
            </h1>
            <p className="text-red-700 dark:text-red-300 mt-2">
              Something went wrong while loading the dashboard.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-100 dark:bg-red-900/50 rounded p-3">
              <p className="text-sm text-red-800 dark:text-red-200 font-mono break-words">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="flex-1 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded font-medium transition-colors text-center"
            >
              Go Home
            </Link>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Error {error.digest && `(${error.digest})`}. Please try refreshing
            the page or contact support if the problem persists.
          </p>
        </div>
      </div>
    </div>
  );
}
