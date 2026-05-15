import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/admin/config")({
  component: ConfigPage,
});

function ConfigPage() {
  return (
    <AppShell role="admin">
      <PageHeader title="System configuration" subtitle="Tunable parameters that drive lending and transactions." />

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Lending</h2>
          <Field label="Base interest rate (%)" defaultValue="6.45" />
          <Field label="Clerk / supervisor split threshold (USD)" defaultValue="1000000" />
          <Field label="Default loan term (months)" defaultValue="60" />
          <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Save lending</button>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Transactions</h2>
          <Field label="Wire transfer fee (USD)" defaultValue="25.00" />
          <Field label="ACH cut-off time" defaultValue="16:00 EST" />
          <Field label="Daily transfer limit (USD)" defaultValue="50000" />
          <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Save transactions</button>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-semibold mb-4">Default contract template</h2>
          <textarea
            rows={8}
            defaultValue="LOAN AGREEMENT\n\nThis loan agreement is made and entered into on {{date}} between Meridian Bank, N.A. ('Lender') and {{customer_name}} ('Borrower') for the principal amount of {{amount}} at an annual interest rate of {{rate}}% over a term of {{term}} months..."
            className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-mono"
          />
          <button className="mt-3 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Save template</button>
        </section>
      </div>
    </AppShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input {...rest} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
    </div>
  );
}
