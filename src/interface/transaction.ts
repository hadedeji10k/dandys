export interface ICreateTransaction {
  reference: string;
  paymentProvider?: string;
  amount: number;
  status?: "PENDING" | "FAILED" | "SUCCESSFUL";
  type: "PURCHASE" | "SUBSCRIPTION"| "TOPUP";
}