import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { auditLog } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/audit")({
  component: AuditPage,
});

function AuditPage() {
  return (
    <AppShell role="admin">
      <PageHeader title="Audit log" subtitle="Every status change, decision, and configuration update." />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3 flex-wrap">
          <input placeholder="Search by actor or target..." className="flex-1 min-w-[200px] max-w-sm rounded-md border border-input bg-card px-3 py-2 text-sm" />
          <input type="date" className="rounded-md border border-input bg-card px-3 py-2 text-sm" />
          <select className="rounded-md border border-input bg-card px-3 py-2 text-sm">
            <option>All actions</option>
            <option>LOAN_APPROVED</option><option>CREDIT_CHECK_RUN</option><option>CONTRACT_SIGNED</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Timestamp</th>
              <th className="text-left px-5 py-3">Actor</th>
              <th className="text-left px-5 py-3">Action</th>
              <th className="text-left px-5 py-3">Target</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((e, i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{e.ts}</td>
                <td className="px-5 py-4">{e.actor}</td>
                <td className="px-5 py-4"><StatusBadge tone="info">{e.action}</StatusBadge></td>
                <td className="px-5 py-4 font-mono text-xs">{e.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
