import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { accounts } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/accounts")({
  component: AccountsList,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function AccountsList() {
  return (
    <AppShell role="customer">
      <PageHeader title="Accounts" subtitle="All your Meridian accounts in one place." />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Account</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-right px-5 py-3">Balance</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-5 py-4 font-medium">{a.id}</td>
                <td className="px-5 py-4">{a.type.replace("_", " ")}</td>
                <td className="px-5 py-4"><StatusBadge tone="success">{a.status}</StatusBadge></td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(a.balance)}</td>
                <td className="px-5 py-4 text-right">
                  <Link to="/customer/accounts/$id" params={{ id: a.id }} className="text-accent text-sm font-medium hover:underline">
                    View →
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
