import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/customer/loans/apply")({
  component: ApplyLoan,
});

function ApplyLoan() {
  const navigate = useNavigate();
  return (
    <AppShell role="customer">
      <PageHeader title="Apply for a loan" subtitle="Stage 1 — Application. Reviewed by a broker within 24 hours." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/customer/loans" });
        }}
        className="rounded-xl border border-border bg-card p-6 max-w-2xl"
      >
        <Field label="Requested amount (USD)" type="number" placeholder="100,000" />
        <Field label="Purpose" placeholder="e.g. Home renovation" />
        <Field label="Property type" as="select">
          <option>HOUSE</option><option>FLAT</option><option>PARKING</option><option>OTHER</option>
        </Field>
        <Field label="Term (months)" type="number" placeholder="60" />
        <Field label="Annual income proof (USD)" type="number" placeholder="120,000" />
        <Field label="Notes (optional)" as="textarea" />

        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <input type="checkbox" className="rounded border-input" defaultChecked />
          I consent to a credit data check by Meridian Bank
        </label>

        <button className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90">
          Submit application
        </button>
      </form>
    </AppShell>
  );
}

function Field({
  label,
  as,
  children,
  ...rest
}: { label: string; as?: "select" | "textarea"; children?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {as === "select" ? (
        <select className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm">{children}</select>
      ) : as === "textarea" ? (
        <textarea rows={3} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
      ) : (
        <input {...rest} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
      )}
    </div>
  );
}
