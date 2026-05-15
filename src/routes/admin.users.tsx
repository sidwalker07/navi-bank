import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { adminUsers } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  return (
    <AppShell role="admin">
      <PageHeader
        title="Users"
        subtitle={`${adminUsers.length} accounts across all roles.`}
        action={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Plus className="h-4 w-4" /> Create employee
          </button>
        }
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <input placeholder="Search by name or email..." className="flex-1 max-w-sm rounded-md border border-input bg-card px-3 py-2 text-sm" />
          <select className="rounded-md border border-input bg-card px-3 py-2 text-sm">
            <option>All roles</option>
            <option>Customer</option><option>Broker</option><option>Clerk</option><option>Supervisor</option><option>Manager</option><option>Admin</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">ID</th>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Role</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-5 py-4 font-mono text-xs">{u.id}</td>
                <td className="px-5 py-4 font-medium">{u.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-4"><StatusBadge tone="info">{u.role}</StatusBadge></td>
                <td className="px-5 py-4"><StatusBadge tone="success">{u.status}</StatusBadge></td>
                <td className="px-5 py-4 text-right space-x-2">
                  <button className="text-xs text-accent hover:underline">Edit</button>
                  <button className="text-xs text-destructive hover:underline">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
