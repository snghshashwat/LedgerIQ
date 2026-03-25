"use client";

import { useState } from "react";

type InsightCardProps = {
  title: string;
  summary: string;
  details: string;
  confidence: number;
};

export function InsightCard({
  title,
  summary,
  details,
  confidence,
}: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            {summary}
          </p>
        </div>
        <span className="rounded-full bg-[color:var(--surface-muted)] px-2 py-0.5 text-xs text-[color:var(--text-secondary)]">
          {confidence}%
        </span>
      </div>

      {expanded ? (
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">
          {details}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="mt-4 text-sm font-medium text-[color:var(--button-primary)] transition-opacity hover:opacity-75"
      >
        {expanded ? "Collapse" : "Expand Insight"}
      </button>
    </article>
  );
}
