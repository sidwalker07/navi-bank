export type LoanStatus =
  | "INITIALIZED"
  | "UNDER_CONSIDERATION"
  | "ASSIGNED_TO_CLERK"
  | "ASSIGNED_TO_SUPERVISOR"
  | "CREDIT_CHECK_FAILED"
  | "PENDING_MANAGER"
  | "REJECTED"
  | "CONTRACT_SENT"
  | "ACCEPTED"
  | "CANCELLED"
  | "SETTLED"
  | "ACTIVE";

export const loanStatusLabel: Record<LoanStatus, string> = {
  INITIALIZED: "Initialized",
  UNDER_CONSIDERATION: "Under consideration",
  ASSIGNED_TO_CLERK: "Assigned to clerk",
  ASSIGNED_TO_SUPERVISOR: "Assigned to supervisor",
  CREDIT_CHECK_FAILED: "Credit check failed",
  PENDING_MANAGER: "Pending manager",
  REJECTED: "Rejected",
  CONTRACT_SENT: "Contract sent",
  ACCEPTED: "Accepted by customer",
  CANCELLED: "Cancelled",
  SETTLED: "Settled",
  ACTIVE: "Active",
};

export const accounts = [
  { id: "ACC-1001", type: "CHECKING", balance: 12480.55, status: "ACTIVE" },
  { id: "ACC-1002", type: "SAVINGS", balance: 48200.0, status: "ACTIVE" },
  { id: "ACC-1003", type: "MONEY_MARKET", balance: 105000.0, status: "ACTIVE" },
];

export const transactions = [
  { id: "TXN-7782", date: "2026-05-12", type: "ACH", desc: "Payroll — Acme Corp", amount: 4250.0, account: "ACC-1001" },
  { id: "TXN-7781", date: "2026-05-11", type: "INTERNAL", desc: "Transfer to Savings", amount: -1500.0, account: "ACC-1001" },
  { id: "TXN-7780", date: "2026-05-10", type: "WIRE", desc: "Wire — Hamilton & Co.", amount: -8200.0, account: "ACC-1002" },
  { id: "TXN-7779", date: "2026-05-08", type: "ACH", desc: "Con Edison Utility", amount: -184.22, account: "ACC-1001" },
  { id: "TXN-7778", date: "2026-05-05", type: "INTERNAL", desc: "Mortgage payment", amount: -2750.0, account: "ACC-1001" },
  { id: "TXN-7777", date: "2026-05-02", type: "ACH", desc: "Refund — Delta Airlines", amount: 612.4, account: "ACC-1001" },
];

export const customerLoans: Array<{
  id: string;
  amount: number;
  purpose: string;
  property: string;
  termMonths: number;
  status: LoanStatus;
  appliedAt: string;
}> = [
  { id: "LN-2041", amount: 320000, purpose: "Home purchase", property: "HOUSE", termMonths: 360, status: "CONTRACT_SENT", appliedAt: "2026-04-22" },
  { id: "LN-2030", amount: 18000, purpose: "Vehicle", property: "OTHER", termMonths: 60, status: "ACTIVE", appliedAt: "2025-11-10" },
  { id: "LN-2055", amount: 75000, purpose: "Renovation", property: "FLAT", termMonths: 120, status: "UNDER_CONSIDERATION", appliedAt: "2026-05-09" },
];

export const brokerQueue = [
  { id: "LN-2055", customer: "Sarah Lin", amount: 75000, purpose: "Renovation", property: "FLAT", consent: true },
  { id: "LN-2061", customer: "Marcus Reed", amount: 240000, purpose: "Home purchase", property: "HOUSE", consent: false },
  { id: "LN-2063", customer: "Priya Patel", amount: 14500, purpose: "Vehicle", property: "OTHER", consent: true },
];

export const clerkQueue = [
  { id: "LN-2058", customer: "James Okafor", amount: 28000, purpose: "Debt consolidation", property: "OTHER", income: 86000 },
  { id: "LN-2060", customer: "Hana Tanaka", amount: 410000, purpose: "Flat purchase", property: "FLAT", income: 142000 },
];

export const supervisorQueue = [
  { id: "LN-2052", customer: "Edward Holloway", amount: 1_450_000, purpose: "Estate purchase", property: "HOUSE", income: 520000 },
  { id: "LN-2049", customer: "Reyna Vega", amount: 2_100_000, purpose: "Commercial property", property: "OTHER", income: 780000 },
];

export const managerHighRisk = [
  { id: "LN-2047", customer: "Daniel Cho", amount: 380000, purpose: "Flat purchase", risk: "HIGH", monthlyPayment: 2740 },
  { id: "LN-2050", customer: "Olivia Brent", amount: 920000, purpose: "Home purchase", risk: "HIGH", monthlyPayment: 6420 },
];

export const managerSignQueue = [
  { id: "LN-2041", customer: "Sarah Lin", amount: 320000, signedByCustomer: true },
  { id: "LN-2043", customer: "Tom Becker", amount: 215000, signedByCustomer: true },
];

export const adminUsers = [
  { id: "U-1001", name: "Sarah Lin", role: "CUSTOMER", email: "sarah@example.com", status: "ACTIVE" },
  { id: "U-1042", name: "Karen Powell", role: "BROKER", email: "kpowell@bank.com", status: "ACTIVE" },
  { id: "U-1043", name: "Alex Romero", role: "CLERK", email: "aromero@bank.com", status: "ACTIVE" },
  { id: "U-1044", name: "Jin Watanabe", role: "SUPERVISOR", email: "jwatanabe@bank.com", status: "ACTIVE" },
  { id: "U-1045", name: "Margaret Hayes", role: "MANAGER", email: "mhayes@bank.com", status: "ACTIVE" },
  { id: "U-1046", name: "Root Admin", role: "ADMIN", email: "admin@bank.com", status: "ACTIVE" },
];

export const auditLog = [
  { ts: "2026-05-12 14:22:08", actor: "Margaret Hayes", action: "LOAN_APPROVED", target: "LN-2047" },
  { ts: "2026-05-12 13:51:42", actor: "Alex Romero", action: "CREDIT_CHECK_RUN", target: "LN-2058" },
  { ts: "2026-05-12 11:08:19", actor: "Sarah Lin", action: "CONTRACT_SIGNED", target: "LN-2041" },
  { ts: "2026-05-12 09:32:00", actor: "Karen Powell", action: "APPLICATION_ACCEPTED", target: "LN-2055" },
  { ts: "2026-05-11 17:14:55", actor: "system", action: "WIRE_FEE_UPDATED", target: "config:wire_fee" },
];

export const stageTimeline: Array<{ stage: number; label: string; status: LoanStatus }> = [
  { stage: 1, label: "Application submitted", status: "INITIALIZED" },
  { stage: 2, label: "Broker review", status: "UNDER_CONSIDERATION" },
  { stage: 3, label: "Assigned for analysis", status: "ASSIGNED_TO_CLERK" },
  { stage: 4, label: "Credit check", status: "ASSIGNED_TO_CLERK" },
  { stage: 5, label: "Manager decision", status: "PENDING_MANAGER" },
  { stage: 6, label: "Contract sent", status: "CONTRACT_SENT" },
  { stage: 7, label: "Settled & active", status: "ACTIVE" },
];
