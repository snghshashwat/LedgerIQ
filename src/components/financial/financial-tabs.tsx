"use client";

import { useMemo, useState } from "react";
import type { Company, StatementType } from "@/data/mock-financials";
import { StatementTable } from "@/components/financial/statement-table";

const tabConfig: Array<{ id: StatementType; label: string }> = [
  { id: "income", label: "Income Statement" },
  { id: "balance", label: "Balance Sheet" },
  { id: "cashflow", label: "Cash Flow" },
];

export function FinancialTabs({ company }: { company: Company }) {
  const [activeTab, setActiveTab] = useState<StatementType>("income");

  const rows = useMemo(
    () => company.statements[activeTab],
    [activeTab, company.statements],
  );

  return (
    <section className="space-y-4">
      <div className="inline-flex rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-1">
        {tabConfig.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-[color:var(--metric-highlight)] text-[color:var(--metric-highlight-text)]"
                  : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-hover)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <StatementTable rows={rows} />
    </section>
  );
}
