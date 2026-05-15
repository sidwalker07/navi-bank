import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileText,
  User,
  Inbox,
  Briefcase,
  ShieldCheck,
  Users,
  ScrollText,
  Settings,
  Bell,
  LogOut,
  Building2,
} from "lucide-react";
import type { ReactNode } from "react";

export type Role = "customer" | "broker" | "clerk" | "supervisor" | "manager" | "admin";

const menus: Record<Role, Array<{ to: string; label: string; icon: typeof LayoutDashboard }>> = {
  customer: [
    { to: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/customer/accounts", label: "Accounts", icon: Wallet },
    { to: "/customer/transfer", label: "Transfer", icon: ArrowLeftRight },
    { to: "/customer/loans", label: "My loans", icon: FileText },
    { to: "/customer/profile", label: "Profile", icon: User },
  ],
  broker: [{ to: "/broker/dashboard", label: "Pending applications", icon: Inbox }],
  clerk: [{ to: "/clerk/dashboard", label: "Assigned loans", icon: Briefcase }],
  supervisor: [{ to: "/supervisor/dashboard", label: "Assigned loans", icon: Briefcase }],
  manager: [{ to: "/manager/dashboard", label: "Decisions & contracts", icon: ShieldCheck }],
  admin: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/loans", label: "Loans", icon: FileText },
    { to: "/admin/audit", label: "Audit log", icon: ScrollText },
    { to: "/admin/config", label: "Configuration", icon: Settings },
  ],
};

const roleLabel: Record<Role, string> = {
  customer: "Customer",
  broker: "Broker",
  clerk: "Clerk",
  supervisor: "Supervisor",
  manager: "Manager",
  admin: "Administrator",
};

const roleSampleName: Record<Role, string> = {
  customer: "Sarah Lin",
  broker: "Karen Powell",
  clerk: "Alex Romero",
  supervisor: "Jin Watanabe",
  manager: "Margaret Hayes",
  admin: "Root Admin",
};

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = menus[role];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Meridian Bank</div>
            <div className="text-[11px] uppercase tracking-wider opacity-60">{roleLabel[role]}</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((it) => {
            const active = pathname === it.to || pathname.startsWith(it.to + "/");
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-3 border-t border-sidebar-border text-xs opacity-70">
          v1.0 · Sandbox env
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="text-foreground font-medium">{roleSampleName[role]}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ tone = "default", children }: { tone?: "default" | "success" | "warning" | "danger" | "info"; children: ReactNode }) {
  const styles: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    danger: "bg-destructive/15 text-destructive",
    info: "bg-accent/15 text-accent",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  );
}
