import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { PageTitle } from "@/components/shared/page-title";

export default function DashboardPage() {
  return (
    <div>
      <PageTitle
        title="Dashboard Suite"
        subtitle="Static analytics boards inspired by enterprise BI layouts with multi-sheet views"
      />
      <DashboardClient />
    </div>
  );
}
