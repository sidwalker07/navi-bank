import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { adminUsers, customerLoans, auditLog } from "@/lib/mock-data";
import { Users, FileText, ScrollText, Settings } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AppShell role="admin">
      <PageHeader title="System overview" subtitle="Health, queues, and recent activity across the bank." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Users" value={adminUsers.length} />
        <Stat label="Active loans" value={customerLoans.filter((l) => l.status === "ACTIVE").length} />
        <Stat label="Pending reviews" value={5} />
        <Stat label="Today's transactions" value={128} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-border bg-card">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Quick actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5">
            <ActionCard to="/admin/users" icon={<Users className="h-4 w-4" />} label="Manage users" />
            <ActionCard to="/admin/loans" icon={<FileText className="h-4 w-4" />} label="Loan oversight" />
            <ActionCard to="/admin/audit" icon={<ScrollText className="h-4 w-4" />} label="Audit log" />
            <ActionCard to="/admin/config" icon={<Settings className="h-4 w-4" />} label="Configuration" />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Recent audit events</h2>
            <Link to="/admin/audit" className="text-sm text-accent hover:underline">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {auditLog.slice(0, 5).map((e, i) => (
              <li key={i} className="px-5 py-3 text-sm flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{e.action}</div>
                  <div className="text-xs text-muted-foreground">{e.actor} · {e.target}</div>
                </div>
                <StatusBadge>{e.ts.split(" ")[1]}</StatusBadge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ActionCard({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="rounded-lg border border-border hover:border-accent p-4 flex items-center gap-3 transition-colors">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}
