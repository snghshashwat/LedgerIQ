"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Company } from "@/data/mock-financials";

type EbitdaBarChartProps = {
  company: Company;
};

export function EbitdaBarChart({ company }: EbitdaBarChartProps) {
  return (
    <section className="min-w-0 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">EBITDA Trend</h3>
        <p className="text-xs text-[color:var(--text-tertiary)]">Quarterly</p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer>
          <BarChart data={company.trend}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis
              dataKey="quarter"
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--border-subtle)",
                background: "var(--surface)",
                color: "var(--text-primary)",
              }}
            />
            <Bar
              dataKey="ebitda"
              fill="var(--metric-accent-3)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
