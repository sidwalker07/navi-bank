import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Queue } from "./clerk.dashboard";
import { supervisorQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/supervisor/dashboard")({
  component: SupervisorDashboard,
});

function SupervisorDashboard() {
  return (
    <AppShell role="supervisor">
      <PageHeader title="Assigned loans" subtitle="Stage 3–4 · Loans ≥ $1M assigned to supervisors for credit analysis." />
      <Queue rows={supervisorQueue} processHref="/supervisor/dashboard" />
    </AppShell>
  );
}
