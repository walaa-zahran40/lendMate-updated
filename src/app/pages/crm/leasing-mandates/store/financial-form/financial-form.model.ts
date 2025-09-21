// src/app/features/financial-forms/financial-form.model.ts

export interface FinancialForm {
  id?: number; // server-generated when reading/updating
  leasingMandateId?: number; // must be nonzero
  assetCost?: number; // > 0
  downPayment?: number; // >= 0 (business rule?: must be < assetCost)
  percentOfFinance?: number; // > 10
  nfa?: number; // net financed amount (calculated or passed)
  interestRate?: number; // > 0
  insuranceRate?: number; // e.g. 0.0 – 100.0 (%)
  tenor?: number; // months/years ( > 0)
  paymentPeriodId?: number; // lookup key
  paymentMonthDayID?: number; // lookup key
  paymentMethodID?: number; // lookup key
  rvAmount?: number; // residual value absolute
  rvPercent?: number; // residual value percentage
  provisionAmount?: number; // provision absolute
  provisionPercent?: number; // provision percentage
  reservePaymentAmount?: number; // reserve payment absolute
  reservePaymentCount?: number; // reserve payment installments
  currencyId?: number; // lookup key
  currencyExchangeRateId?: number; // lookup key
  currencyExchangeRate?: any;
  paymentTimingTermDTO?: any;
  rentStructureTypeDTO?: any;
  paymentMonthDayDTO?: any;
  interestRateBenchmarkDTO?: any;
  paymentMethodDTO?: any;
  isManualExchangeRate?: boolean; // true/false
  manualSetExchangeRate?: number; // if manual
  gracePeriodCount?: number; // numeric
  gracePeriodUnitId?: number; // lookup key
  indicativeRentals?: number; // derived or entered
  rentStructureTypeId?: number; // lookup key
  paymentTimingTermId?: number; // lookup key
  interestRateBenchmarkId?: number; // lookup key
  fixedInterestRate?: number; // if fixed
  startDate?: string; // ISO string?: e.g. "2025-06-06T11?:55?:07.120Z"
  years?: number; // number of years (if relevant)
  rent?: number; // calculated rental amount
  paymentPeriodMonthCount?: any;
  payments?: any;
  paymentPeriodDTO?: any;
  gracePeriodUnitDTO?: any;
  currencyDTO?: any;
  isManuaExchangeRate?: any;
  currencyExchangeRateDto?: any;
  referenceRent?: any;
}
export interface FeeCalculationType {
  id: number;
  name: string;
  nameAR: string;
  code: string;
  isActive: boolean;
  // …other fields if you need them
}

export interface FeeCalculationConfiguration {
  id: number;
  feeTypeId: number;
  calculationFormula: string;
  parameterMappingsJson: string;
  parameterMappings: { [key: string]: string }; // ← add this
}

export interface CalculationConfigurationByFeeType {
  id: number;
  code: string;
  name: string;
  nameAR: string;
  defaultAmount: number;
  defaultPercentage: number;
  feeCalculationConfiguration: FeeCalculationConfiguration;
  feeCalculationType: FeeCalculationType;
  isActive: boolean;
}
// models/payments-request.model.ts
