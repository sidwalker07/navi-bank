import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Open an account — Meridian Bank" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Meridian Bank</span>
        </Link>

        <div className="rounded-xl border border-border bg-card shadow-sm p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Open an account</h1>
          <p className="text-sm text-muted-foreground mt-1">A complimentary CHECKING account will be created.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/login" });
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            <Field label="First name" />
            <Field label="Last name" />
            <Field label="Email" type="email" className="md:col-span-2" />
            <Field label="Password" type="password" />
            <Field label="Phone" type="tel" />
            <Field label="Address" className="md:col-span-2" />
            <Field label="Date of birth" type="date" />
            <Field label="SSN (last 4)" maxLength={4} />
            <Field label="Annual income" type="number" placeholder="$" className="md:col-span-2" />

            <div className="md:col-span-2 flex items-center justify-between mt-2">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Already have an account?
              </Link>
              <button
                type="submit"
                className="rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        {...rest}
        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
