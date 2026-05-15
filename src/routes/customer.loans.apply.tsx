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
          navigate({ to: "/customer/loans/$id", params: { id: "LN-2055" } });
        }}
        className="rounded-xl border border-border bg-card p-6 max-w-3xl space-y-8"
      >
        <Section title="Identity" subtitle="Verify who is applying for the loan.">
          <Grid>
            <Field label="Full legal name" placeholder="Sarah J. Lin" required />
            <Field label="Date of birth" type="date" required />
            <Field label="Government ID type" as="select">
              <option>Passport</option><option>Driver's license</option><option>National ID</option><option>SSN card</option>
            </Field>
            <Field label="Government ID number" placeholder="X1234567" required />
            <Field label="Nationality" placeholder="United States" />
            <Field label="Tax ID / SSN" placeholder="***-**-1234" required />
          </Grid>
        </Section>

        <Section title="Contact" subtitle="How we reach you about this application.">
          <Grid>
            <Field label="Email" type="email" placeholder="sarah@example.com" required />
            <Field label="Phone" type="tel" placeholder="(212) 555-0148" required />
            <Field label="Residential address" placeholder="221B Baker St" className="md:col-span-2" />
            <Field label="City" placeholder="New York" />
            <Field label="State / Region" placeholder="NY" />
            <Field label="Postal code" placeholder="10001" />
            <Field label="Country" placeholder="United States" />
          </Grid>
        </Section>

        <Section title="Employment & income" subtitle="Used to assess affordability.">
          <Grid>
            <Field label="Employment status" as="select">
              <option>Employed</option><option>Self-employed</option><option>Contractor</option><option>Retired</option><option>Unemployed</option>
            </Field>
            <Field label="Employer" placeholder="Acme Corp" />
            <Field label="Job title" placeholder="Senior Engineer" />
            <Field label="Years at employer" type="number" placeholder="3" />
            <Field label="Annual gross income (USD)" type="number" placeholder="120,000" required />
            <Field label="Other monthly income (USD)" type="number" placeholder="0" />
            <Field label="Existing monthly debts (USD)" type="number" placeholder="850" />
          </Grid>
        </Section>

        <Section title="Loan request" subtitle="Tell us what you need.">
          <Grid>
            <Field label="Requested amount (USD)" type="number" placeholder="100,000" required />
            <Field label="Term (months)" type="number" placeholder="60" required />
            <Field label="Purpose" placeholder="Home renovation" required />
            <Field label="Property type" as="select">
              <option>HOUSE</option><option>FLAT</option><option>PARKING</option><option>OTHER</option>
            </Field>
            <Field label="Estimated property value (USD)" type="number" placeholder="450,000" />
            <Field label="Down payment (USD)" type="number" placeholder="50,000" />
            <Field label="Notes (optional)" as="textarea" className="md:col-span-2" />
          </Grid>
        </Section>

        <div className="space-y-3">
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="mt-0.5 rounded border-input" defaultChecked />
            <span>I consent to a credit data check by Meridian Bank and confirm the above identity details are accurate.</span>
          </label>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="mt-0.5 rounded border-input" defaultChecked />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>
        </div>

        <button className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90">
          Submit application
        </button>
      </form>
    </AppShell>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Field({
  label,
  as,
  children,
  className,
  ...rest
}: { label: string; as?: "select" | "textarea"; children?: React.ReactNode; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
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
