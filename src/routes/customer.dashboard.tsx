import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { accounts, transactions, customerLoans, loanStatusLabel } from "@/lib/mock-data";
import { ArrowUpRight, Plus, FileText } from "lucide-react";

export const Route = createFileRoute("/customer/dashboard")({
  component: CustomerDashboard,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function CustomerDashboard() {
  const total = accounts.reduce((s, a) => s + a.balance, 0);
  return (
    <AppShell role="customer">
      <PageHeader
        title="Welcome back, Sarah"
        subtitle="Here's a snapshot of your money today."
        action={
          <Link
            to="/customer/transfer"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            <ArrowUpRight className="h-4 w-4" /> New transfer
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-1 rounded-xl border border-border bg-primary text-primary-foreground p-6">
          <p className="text-xs uppercase tracking-wider opacity-70">Total balance</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{fmt(total)}</p>
          <p className="mt-1 text-xs opacity-70">across {accounts.length} accounts</p>
        </div>
        {accounts.slice(0, 2).map((a) => (
          <Link
            key={a.id}
            to="/customer/accounts/$id"
            params={{ id: a.id }}
            className="rounded-xl border border-border bg-card p-6 hover:border-accent transition-colors"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{a.type.replace("_", " ")}</p>
            <p className="mt-2 text-2xl font-semibold">{fmt(a.balance)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{a.id}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Recent transactions</h2>
            <Link to="/customer/accounts" className="text-sm text-accent hover:underline">View all</Link>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-muted-foreground w-28">{t.date}</td>
                  <td className="px-5 py-3"><StatusBadge tone="info">{t.type}</StatusBadge></td>
                  <td className="px-5 py-3">{t.desc}</td>
                  <td className={`px-5 py-3 text-right font-medium ${t.amount < 0 ? "text-foreground" : "text-success"}`}>
                    {t.amount < 0 ? "" : "+"}{fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Loans</h2>
            <Link to="/customer/loans/apply" className="text-sm text-accent inline-flex items-center gap-1 hover:underline">
              <Plus className="h-3.5 w-3.5" /> Apply
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {customerLoans.map((l) => (
              <li key={l.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium truncate">
                    <FileText className="h-4 w-4 text-muted-foreground" /> {l.purpose}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{fmt(l.amount)} · {l.id}</div>
                </div>
                <StatusBadge tone={l.status === "ACTIVE" ? "success" : l.status === "CONTRACT_SENT" ? "warning" : "info"}>
                  {loanStatusLabel[l.status]}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
