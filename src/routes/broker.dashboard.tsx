import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { brokerQueue } from "@/lib/mock-data";
import { Mail, Check } from "lucide-react";

export const Route = createFileRoute("/broker/dashboard")({
  component: BrokerDashboard,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function BrokerDashboard() {
  return (
    <AppShell role="broker">
      <PageHeader title="Pending applications" subtitle={`${brokerQueue.length} applications awaiting your review (Stage 2).`} />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Loan</th>
              <th className="text-left px-5 py-3">Customer</th>
              <th className="text-left px-5 py-3">Purpose</th>
              <th className="text-left px-5 py-3">Property</th>
              <th className="text-right px-5 py-3">Amount</th>
              <th className="text-left px-5 py-3 pl-6">Consent</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {brokerQueue.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{l.id}</td>
                <td className="px-5 py-4">{l.customer}</td>
                <td className="px-5 py-4">{l.purpose}</td>
                <td className="px-5 py-4 text-muted-foreground">{l.property}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
                <td className="px-5 py-4 pl-6">
                  {l.consent ? <StatusBadge tone="success">Granted</StatusBadge> : <StatusBadge tone="warning">Missing</StatusBadge>}
                </td>
                <td className="px-5 py-4 text-right">
                  {l.consent ? (
                    <button className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium">
                      <Check className="h-3.5 w-3.5" /> Accept
                    </button>
                  ) : (
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium">
                      <Mail className="h-3.5 w-3.5" /> Send reminder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
