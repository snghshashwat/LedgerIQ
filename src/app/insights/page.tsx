import { InsightCard } from "@/components/insights/insight-card";
import { PageTitle } from "@/components/shared/page-title";
import { companies } from "@/data/mock-financials";

export default function InsightsPage() {
  return (
    <div className="space-y-6 page-enter">
      <PageTitle
        title="AI Insights"
        subtitle="Generated summary cards across companies with expandable analysis"
      />

      <div className="space-y-6">
        {companies.map((company) => (
          <section key={company.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-tertiary)]">
                {company.sector}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {company.insightCards.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  summary={insight.summary}
                  details={insight.details}
                  confidence={insight.confidence}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
