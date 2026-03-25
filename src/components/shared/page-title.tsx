import type { ReactNode } from "react";

export function PageTitle({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-enter mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)] md:text-base">
          {subtitle}
        </p>
      </div>
      {actions ? <div className="w-full md:w-auto">{actions}</div> : null}
    </div>
  );
}
