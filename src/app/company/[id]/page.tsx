import Link from "next/link";
import { notFound } from "next/navigation";
import { FinancialTabs } from "@/components/financial/financial-tabs";
import { PageTitle } from "@/components/shared/page-title";
import { getCompanyById } from "@/data/mock-financials";

type CompanyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const { id } = await params;
  const company = getCompanyById(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6 page-enter">
      <PageTitle
        title={`${company.name} Detail`}
        subtitle={`${company.sector} | Financial statements and report tabs`}
        actions={
          <Link
            href="/dashboard"
            className="inline-flex rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--surface-hover)]"
          >
            Back to Dashboard
          </Link>
        }
      />

      <FinancialTabs company={company} />
    </div>
  );
}
