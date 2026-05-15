import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { clerkQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/clerk/dashboard")({
  component: ClerkDashboard,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function ClerkDashboard() {
  return (
    <AppShell role="clerk">
      <PageHeader title="Assigned loans" subtitle="Stage 3–4 · Loans under $1M assigned to clerks for credit analysis." />
      <Queue rows={clerkQueue} processHref="/clerk/dashboard" />
    </AppShell>
  );
}

export function Queue({ rows }: { rows: typeof clerkQueue; processHref: string }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-5 py-3">Loan</th>
            <th className="text-left px-5 py-3">Customer</th>
            <th className="text-left px-5 py-3">Purpose</th>
            <th className="text-left px-5 py-3">Property</th>
            <th className="text-right px-5 py-3">Amount</th>
            <th className="text-right px-5 py-3">Income</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} className="border-t border-border">
              <td className="px-5 py-4 font-medium">{l.id}</td>
              <td className="px-5 py-4">{l.customer}</td>
              <td className="px-5 py-4">{l.purpose}</td>
              <td className="px-5 py-4 text-muted-foreground">{l.property}</td>
              <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
              <td className="px-5 py-4 text-right">{fmt(l.income)}</td>
              <td className="px-5 py-4 text-right">
                <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium">
                  Process credit check
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
