import { quarters } from "@/data/mock-financials";
import { formatCurrencyBillions } from "@/lib/format";

type StatementTableProps = {
  rows: Array<{ lineItem: string; values: number[] }>;
};

export function StatementTable({ rows }: StatementTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)]">
      <table className="min-w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-[color:var(--surface-muted)]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-[color:var(--text-secondary)]">
              Line Item
            </th>
            {quarters.map((quarter) => (
              <th
                key={quarter}
                className="px-4 py-3 text-right font-medium text-[color:var(--text-secondary)]"
              >
                {quarter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.lineItem}
              className="border-t border-[color:var(--border-subtle)]"
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium">
                {row.lineItem}
              </td>
              {row.values.map((value, index) => (
                <td
                  key={`${row.lineItem}-${index}`}
                  className="px-4 py-3 text-right text-[color:var(--text-secondary)]"
                >
                  {formatCurrencyBillions(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
