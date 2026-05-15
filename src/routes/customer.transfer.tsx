import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { accounts } from "@/lib/mock-data";
import { useState } from "react";
import { Send, Building, Globe } from "lucide-react";

export const Route = createFileRoute("/customer/transfer")({
  component: TransferPage,
});

type Mode = "internal" | "ach" | "wire";

function TransferPage() {
  const [mode, setMode] = useState<Mode>("internal");
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <AppShell role="customer">
      <PageHeader title="New transfer" subtitle="Send money internally, via ACH, or by wire." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <ModeCard active={mode === "internal"} onClick={() => setMode("internal")} icon={<Send className="h-4 w-4" />} title="Internal" desc="Between Meridian accounts · free · instant" />
        <ModeCard active={mode === "ach"} onClick={() => setMode("ach")} icon={<Building className="h-4 w-4" />} title="ACH" desc="Domestic transfer · 1–3 business days" />
        <ModeCard active={mode === "wire"} onClick={() => setMode("wire")} icon={<Globe className="h-4 w-4" />} title="Wire" desc="Domestic & international · same-day · $25 fee" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted("TXN-" + Math.floor(7800 + Math.random() * 200));
        }}
        className="rounded-xl border border-border bg-card p-6 max-w-2xl"
      >
        <Field label="From account" as="select">
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.id} · {a.type} · ${a.balance.toLocaleString()}</option>)}
        </Field>

        {mode === "internal" && (
          <Field label="To account" as="select">
            <option>ACC-1002 · Savings</option>
            <option>ACC-1003 · Money market</option>
            <option>ACC-2245 · Other customer</option>
          </Field>
        )}
        {mode === "ach" && (
          <>
            <Field label="Routing number" placeholder="9 digits" />
            <Field label="Account number" placeholder="Recipient account" />
            <Field label="Recipient name" />
          </>
        )}
        {mode === "wire" && (
          <>
            <Field label="Recipient name" />
            <Field label="Bank name" />
            <Field label="SWIFT / BIC" />
            <Field label="Account / IBAN" />
          </>
        )}

        <Field label="Amount (USD)" type="number" placeholder="0.00" />
        <Field label="Memo (optional)" />

        {mode === "wire" && (
          <p className="text-xs text-muted-foreground mb-4">A $25.00 wire fee will be deducted from the source account.</p>
        )}

        <button type="submit" className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90">
          Submit transfer
        </button>

        {submitted && (
          <div className="mt-5 rounded-md bg-success/10 border border-success/30 p-4 text-sm">
            <div className="font-medium text-success">Transfer submitted</div>
            <div className="text-muted-foreground mt-1">Reference {submitted} · status PENDING</div>
          </div>
        )}
      </form>
    </AppShell>
  );
}

function ModeCard({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition-colors ${active ? "border-accent bg-accent/5" : "border-border bg-card hover:border-muted-foreground/30"}`}
    >
      <div className="flex items-center gap-2 font-medium">{icon} {title}</div>
      <div className="text-xs text-muted-foreground mt-1.5">{desc}</div>
    </button>
  );
}

function Field({
  label,
  as,
  children,
  ...rest
}: {
  label: string;
  as?: "select";
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {as === "select" ? (
        <select className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm">{children}</select>
      ) : (
        <input {...rest} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
      )}
    </div>
  );
}
