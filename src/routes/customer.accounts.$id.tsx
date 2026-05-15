import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { accounts, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/accounts/$id")({
  component: AccountDetail,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function AccountDetail() {
  const { id } = Route.useParams();
  const account = accounts.find((a) => a.id === id);
  const txns = transactions.filter((t) => t.account === id);

  if (!account) {
    return (
      <AppShell role="customer">
        <PageHeader title="Account not found" />
        <Link to="/customer/accounts" className="text-accent">← Back to accounts</Link>
      </AppShell>
    );
  }

  return (
    <AppShell role="customer">
      <Link to="/customer/accounts" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">← Accounts</Link>
      <PageHeader title={`${account.type.replace("_", " ")} · ${account.id}`} subtitle={`Current balance ${fmt(account.balance)}`} />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Transaction history</h2>
          <button className="text-sm text-accent hover:underline">Download statement</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Date</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Description</th>
              <th className="text-right px-5 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {txns.length === 0 && (
              <tr><td colSpan={4} className="text-center py-10 text-muted-foreground">No transactions on this account.</td></tr>
            )}
            {txns.map((t) => (
              <tr key={t.id} className="border-t border-border">
                <td className="px-5 py-4 text-muted-foreground">{t.date}</td>
                <td className="px-5 py-4"><StatusBadge tone="info">{t.type}</StatusBadge></td>
                <td className="px-5 py-4">{t.desc}</td>
                <td className={`px-5 py-4 text-right font-medium ${t.amount < 0 ? "" : "text-success"}`}>
                  {t.amount < 0 ? "" : "+"}{fmt(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
