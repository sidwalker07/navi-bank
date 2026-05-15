import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { customerLoans, loanStatusLabel } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/customer/loans")({
  component: LoansList,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function tone(s: string) {
  if (s === "ACTIVE" || s === "SETTLED") return "success" as const;
  if (s === "CONTRACT_SENT") return "warning" as const;
  if (s === "REJECTED" || s === "CREDIT_CHECK_FAILED" || s === "CANCELLED") return "danger" as const;
  return "info" as const;
}

function LoansList() {
  return (
    <AppShell role="customer">
      <PageHeader
        title="My loans"
        subtitle="Track every application from submission to repayment."
        action={
          <Link
            to="/customer/loans/apply"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Apply for loan
          </Link>
        }
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Loan</th>
              <th className="text-left px-5 py-3">Purpose</th>
              <th className="text-left px-5 py-3">Property</th>
              <th className="text-right px-5 py-3">Amount</th>
              <th className="text-left px-5 py-3 pl-6">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customerLoans.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{l.id}</td>
                <td className="px-5 py-4">{l.purpose}</td>
                <td className="px-5 py-4 text-muted-foreground">{l.property}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(l.amount)}</td>
                <td className="px-5 py-4 pl-6"><StatusBadge tone={tone(l.status)}>{loanStatusLabel[l.status]}</StatusBadge></td>
                <td className="px-5 py-4 text-right">
                  <Link to="/customer/loans/$id" params={{ id: l.id }} className="text-accent text-sm font-medium hover:underline">
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
