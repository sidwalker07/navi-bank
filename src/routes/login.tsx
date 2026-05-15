import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Meridian Bank" }] }),
  component: LoginPage,
});

const employeeRoles = [
  { id: "broker", label: "Broker", to: "/broker/dashboard" },
  { id: "clerk", label: "Clerk", to: "/clerk/dashboard" },
  { id: "supervisor", label: "Supervisor", to: "/supervisor/dashboard" },
  { id: "manager", label: "Manager", to: "/manager/dashboard" },
  { id: "admin", label: "Administrator", to: "/admin/dashboard" },
] as const;

function LoginPage() {
  const [tab, setTab] = useState<"customer" | "employee">("customer");
  const [empRole, setEmpRole] = useState<string>("clerk");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "customer") {
      navigate({ to: "/customer/dashboard" });
    } else {
      const target = employeeRoles.find((r) => r.id === empRole)?.to ?? "/clerk/dashboard";
      navigate({ to: target });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Meridian Bank</span>
        </Link>

        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <div className="grid grid-cols-2 rounded-md bg-muted p-1 mb-6 text-sm">
            {(["customer", "employee"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`py-2 rounded-sm font-medium capitalize transition-colors ${
                  tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {tab === "customer" ? (
              <>
                <Field label="Email" type="email" placeholder="you@example.com" />
                <Field label="Password" type="password" placeholder="••••••••" />
              </>
            ) : (
              <>
                <Field label="Employee ID" placeholder="E-1042" />
                <Field label="Password" type="password" placeholder="••••••••" />
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Role (demo)</label>
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                  >
                    {employeeRoles.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90"
            >
              Sign in
            </button>
          </form>

          {tab === "customer" && (
            <p className="mt-5 text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link to="/register" className="text-accent font-medium hover:underline">
                Open one
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        {...rest}
        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
