import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/customer/profile")({
  component: Profile,
});

function Profile() {
  return (
    <AppShell role="customer">
      <PageHeader title="Profile" subtitle="Update your personal details and security preferences." />
      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Personal info</h2>
          <Field label="Full name" defaultValue="Sarah Lin" />
          <Field label="Email" defaultValue="sarah@example.com" />
          <Field label="Phone" defaultValue="(212) 555-0148" />
          <Field label="Address" defaultValue="221B Baker St, NY 10001" />
          <Field label="Annual income" defaultValue="142000" />
          <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Save changes</button>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Security</h2>
          <Field label="Current password" type="password" />
          <Field label="New password" type="password" />
          <Field label="Confirm new password" type="password" />
          <button className="rounded-md border border-border px-4 py-2 text-sm font-medium">Change password</button>
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
