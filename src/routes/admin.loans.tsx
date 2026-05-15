import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { customerLoans, brokerQueue, clerkQueue, supervisorQueue, managerHighRisk, loanStatusLabel } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/loans")({
  component: AdminLoans,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function AdminLoans() {
  const all = [
    ...customerLoans.map((l) => ({ id: l.id, customer: "Sarah Lin", amount: l.amount, status: loanStatusLabel[l.status] })),
    ...brokerQueue.map((l) => ({ id: l.id, customer: l.customer, amount: l.amount, status: "Under consideration" })),
    ...clerkQueue.map((l) => ({ id: l.id, customer: l.customer, amount: l.amount, status: "Assigned to clerk" })),
    ...supervisorQueue.map((l) => ({ id: l.id, customer: l.customer, amount: l.amount, status: "Assigned to supervisor" })),
    ...managerHighRisk.map((l) => ({ id: l.id, customer: l.customer, amount: l.amount, status: "Pending manager" })),
  ];

  return (
    <AppShell role="admin">
      <PageHeader title="Loan oversight" subtitle={`${all.length} loans in the system across all stages.`} />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <input placeholder="Search loan ID or customer..." className="flex-1 max-w-sm rounded-md border border-input bg-card px-3 py-2 text-sm" />
          <select className="rounded-md border border-input bg-card px-3 py-2 text-sm">
            <option>All statuses</option>
            <option>Initialized</option><option>Under consideration</option><option>Pending manager</option><option>Active</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Loan</th>
              <th className="text-left px-5 py-3">Customer</th>
              <th className="text-right px-5 py-3">Amount</th>
              <th className="text-left px-5 py-3 pl-6">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {all.map((l, i) => (
              <tr key={l.id + i} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{l.id}</td>
                <td className="px-5 py-4">{l.customer}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
                <td className="px-5 py-4 pl-6"><StatusBadge tone="info">{l.status}</StatusBadge></td>
                <td className="px-5 py-4 text-right space-x-2">
                  <button className="text-xs text-accent hover:underline">View</button>
                  <button className="text-xs text-warning-foreground hover:underline">Override status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
