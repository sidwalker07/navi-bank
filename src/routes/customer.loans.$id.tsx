import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/AppShell";
import { customerLoans, loanStatusLabel, stageTimeline } from "@/lib/mock-data";
import { CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/customer/loans/$id")({
  component: LoanDetail,
});

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const stageOrder = ["INITIALIZED", "UNDER_CONSIDERATION", "ASSIGNED_TO_CLERK", "PENDING_MANAGER", "CONTRACT_SENT", "ACCEPTED", "ACTIVE"];

function LoanDetail() {
  const { id } = Route.useParams();
  const loan = customerLoans.find((l) => l.id === id);

  if (!loan) {
    return (
      <AppShell role="customer">
        <PageHeader title="Loan not found" />
        <Link to="/customer/loans" className="text-accent">← Back</Link>
      </AppShell>
    );
  }

  const currentIdx = Math.max(stageOrder.indexOf(loan.status), 0);

  return (
    <AppShell role="customer">
      <Link to="/customer/loans" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">← My loans</Link>
      <PageHeader title={`${loan.purpose} · ${loan.id}`} subtitle={`${fmt(loan.amount)} over ${loan.termMonths} months · ${loan.property}`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge tone={loan.status === "ACTIVE" ? "success" : loan.status === "CONTRACT_SENT" ? "warning" : "info"}>
              {loanStatusLabel[loan.status]}
            </StatusBadge>
            <span className="text-sm text-muted-foreground">Applied {loan.appliedAt}</span>
          </div>

          <ol className="space-y-4">
            {stageTimeline.map((s, i) => {
              const done = i <= currentIdx;
              return (
                <li key={s.stage} className="flex gap-3">
                  {done ? <CheckCircle2 className="h-5 w-5 text-success mt-0.5" /> : <Circle className="h-5 w-5 text-muted-foreground/40 mt-0.5" />}
                  <div>
                    <div className={`text-sm font-medium ${done ? "" : "text-muted-foreground"}`}>Stage {s.stage} — {s.label}</div>
                  </div>
                </li>
              );
            })}
          </ol>

          {loan.status === "CONTRACT_SENT" && (
            <div className="mt-8 rounded-md border border-warning/40 bg-warning/10 p-4">
              <div className="font-medium">Contract ready for signature</div>
              <p className="text-sm text-muted-foreground mt-1">Review the terms and either sign or cancel below.</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">Sign contract</button>
                <button className="rounded-md border border-border px-4 py-2 text-sm">Cancel application</button>
              </div>
            </div>
          )}
        </section>

        <aside className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Loan details</h3>
          <dl className="text-sm space-y-3">
            <Row label="Amount" value={fmt(loan.amount)} />
            <Row label="Term" value={`${loan.termMonths} months`} />
            <Row label="Property" value={loan.property} />
            <Row label="Purpose" value={loan.purpose} />
            <Row label="Interest rate" value="6.45% APR" />
            <Row label="Est. monthly" value={fmt(loan.amount / loan.termMonths * 1.3)} />
          </dl>
        </aside>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}
