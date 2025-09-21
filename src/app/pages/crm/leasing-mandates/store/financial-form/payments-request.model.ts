// payments-request.model.ts (reference)
export interface PaymentsRequest {
  assetCost: number;
  downPayment: number;
  percentOfFinance: number;
  nfa: number;
  interestRate: number;
  insuranceRate: number;
  tenor: number;
  paymentPeriodId: number;
  rvAmount: number;
  rvPercent: number;
  provisionAmount: number;
  provisionPercent: number;
  reservePaymentAmount: number;
  gracePeriodInDays: number;
  paymentTimingTermId: number;
  startDate: string; // ISO
  rent: number;
}
export interface PaymentRow {
  paymentNumber: number;
  dueDate: string; // ISO date string from API
  balanceBefore: number;
  balanceAfter: number;
  rent: number;
  interest: number;
  principal: number;
  installment: number;
  insuranceIncome: number;
  referenceRent: number;
  referencePercent: number;
}
