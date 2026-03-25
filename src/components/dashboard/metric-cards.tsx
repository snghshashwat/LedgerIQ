import { formatCurrencyBillions, formatPercent } from "@/lib/format";

type MetricCardsProps = {
  revenue: number;
  profit: number;
  ebitda: number;
};

export function MetricCards({ revenue, profit, ebitda }: MetricCardsProps) {
  const margin = (ebitda / revenue) * 100;

  const cards = [
    {
      label: "Revenue",
      value: formatCurrencyBillions(revenue),
      accent: "var(--metric-accent-1)",
    },
    {
      label: "Profit",
      value: formatCurrencyBillions(profit),
      accent: "var(--metric-accent-2)",
    },
    {
      label: "EBITDA",
      value: formatCurrencyBillions(ebitda),
      accent: "var(--metric-accent-3)",
    },
    {
      label: "EBITDA Margin",
      value: formatPercent(margin),
      accent: "var(--metric-accent-4)",
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-[color:var(--text-secondary)]">
              {card.label}
            </p>
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: card.accent }}
            />
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}
