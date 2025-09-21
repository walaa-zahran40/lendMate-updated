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
