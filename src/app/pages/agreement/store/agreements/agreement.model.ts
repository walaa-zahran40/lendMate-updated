export interface AgreementAsset {
  assetTypeId: number;
  assetDescription: string;
  assetDescriptionAR: string;
  dateRequired: string; // ISO
}
export interface AgreementFee {
  feeTypeId: number;
  actualAmount: number;
  actualPercentage: number;
}

export interface CreateLeasingAgreementRequest {
  description: string;
  date: string; // ISO
  clientId: number;
  notes: string;
  leasingTypeId: number;
  insuredById: number;
  endDate: string; // ISO
  branchId: number;
  portfolioId: number;
  businessSourceId: number;
  interestRateBenchmarkId: number;
  deliveryNumber: string;
  deliveryTime: string; // ISO
  rentStructureTypeId: number;
  paymentTimingTermId: number;
  assetCost: number;
  downPayment: number;
  percentOfFinance: number;
  nfa: number;
  interestRate: number;
  insuranceRate: number;
  tenor: number;
  paymentPeriodId: number;
  paymentMonthDayId: number;
  paymentMethodId: number;
  rvAmount: number;
  rvPercent: number;
  provisionAmount: number;
  provisionPercent: number;
  reservePaymentAmount: number;
  reservePaymentCount: number;
  currencyId: number;
  gracePeriodInDays: number;
  currencyExchangeRateId: number;
  isManualExchangeRate: boolean;
  manualSetExchangeRate: number;
  startDate: string; // ISO
  years: number;
  rent: number;
  isRentInArrear: boolean;
  isFixedContractEnd: boolean;
  isFixedRent: boolean;
  firstBookingDate: string; // ISO
  totalRents: number;
  totalInterest: number;
  totalInstallments: number;
  agreementAssets: AgreementAsset[];
  agreementFees: AgreementFee[];
}

export interface LeasingAgreement extends CreateLeasingAgreementRequest {
  id?: number; // server id
  status?: string; // workflow status
  createdAt?: string;
  updatedAt?: string;
  isManuaExchangeRate: any;
  clientView: any;

  indicativeRentals: any;
  agreementId: any;
  allowedAgreementWorkFlowActions: any;
}

export interface WorkflowActionRequest {
  agreementId: number;
  action: string; // e.g., "Submit", "Approve", "Reject"
  comment?: string;
}

export interface PagedHistory<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  items: T[];
}
