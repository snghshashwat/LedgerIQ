"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Company } from "@/data/mock-financials";

type PerformanceLineChartProps = {
  company: Company;
};

export function PerformanceLineChart({ company }: PerformanceLineChartProps) {
  return (
    <section className="min-w-0 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Revenue vs Profit</h3>
        <p className="text-xs text-[color:var(--text-tertiary)]">
          USD billions
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer>
          <LineChart data={company.trend}>
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--metric-accent-1)"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="var(--metric-accent-2)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
