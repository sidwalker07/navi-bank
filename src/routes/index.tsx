import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ShieldCheck, Wallet, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Bank — Trusted personal & business banking" },
      { name: "description", content: "Accounts, transfers, and lending for individuals and businesses. A century of trust." },
      { property: "og:title", content: "Meridian Bank" },
      { property: "og:description", content: "Trusted personal & business banking." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight">Meridian Bank</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Est. 1924</div>
          </div>
        </div>
        <Link
          to="/login"
          className="text-sm font-medium text-foreground hover:text-accent inline-flex items-center gap-1"
        >
          Sign in <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="flex-1 max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">A century of trust</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.05] text-foreground">
            Banking built on certainty, not promises.
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-md">
            Open an account in minutes, move money the same day, and access lending built around your real financial life.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Customer login
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Employee login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-accent hover:underline"
            >
              Open an account →
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <Feature icon={<Wallet className="h-5 w-5" />} title="Everyday banking" desc="Checking, savings, and money-market accounts with same-day transfers." />
          <Feature icon={<ArrowUpRight className="h-5 w-5" />} title="ACH & Wire" desc="Send domestic ACH and international wires with transparent fees." />
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Lending" desc="Mortgages and personal loans reviewed by humans, not just algorithms." />
        </div>
      </section>

      <footer className="border-t border-border py-6 px-6 md:px-10 text-xs text-muted-foreground flex justify-between">
        <span>© 2026 Meridian Bank, N.A. Member FDIC.</span>
        <span>Equal Housing Lender</span>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </div>
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
