import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { managerHighRisk, managerSignQueue } from "@/lib/mock-data";
import { Check, X, PenLine } from "lucide-react";

export const Route = createFileRoute("/manager/dashboard")({
  component: ManagerDashboard,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function ManagerDashboard() {
  return (
    <AppShell role="manager">
      <PageHeader title="Decisions & contracts" subtitle="Stage 5 high-risk approvals and Stage 7 contract signatures." />

      <section className="rounded-xl border border-border bg-card overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">High-risk decisions</h2>
            <p className="text-xs text-muted-foreground">Stage 5 — escalated by clerks/supervisors</p>
          </div>
          <StatusBadge tone="warning">{managerHighRisk.length} pending</StatusBadge>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Loan</th>
              <th className="text-left px-5 py-3">Customer</th>
              <th className="text-left px-5 py-3">Purpose</th>
              <th className="text-right px-5 py-3">Amount</th>
              <th className="text-right px-5 py-3">Monthly</th>
              <th className="text-left px-5 py-3 pl-6">Risk</th>
              <th className="px-5 py-3 text-right">Decision</th>
            </tr>
          </thead>
          <tbody>
            {managerHighRisk.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{l.id}</td>
                <td className="px-5 py-4">{l.customer}</td>
                <td className="px-5 py-4">{l.purpose}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
                <td className="px-5 py-4 text-right">{fmt(l.monthlyPayment)}</td>
                <td className="px-5 py-4 pl-6"><StatusBadge tone="danger">{l.risk}</StatusBadge></td>
                <td className="px-5 py-4 text-right space-x-2">
                  <button className="inline-flex items-center gap-1 rounded-md bg-success/15 text-success px-3 py-1.5 text-xs font-medium">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-md bg-destructive/15 text-destructive px-3 py-1.5 text-xs font-medium">
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Contracts awaiting signature</h2>
            <p className="text-xs text-muted-foreground">Stage 7 — customer has signed, manager countersignature needed</p>
          </div>
          <StatusBadge tone="info">{managerSignQueue.length} ready</StatusBadge>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Loan</th>
              <th className="text-left px-5 py-3">Customer</th>
              <th className="text-right px-5 py-3">Amount</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {managerSignQueue.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{l.id}</td>
                <td className="px-5 py-4">{l.customer}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
                <td className="px-5 py-4 text-right">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium">
                    <PenLine className="h-3.5 w-3.5" /> Sign & settle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
