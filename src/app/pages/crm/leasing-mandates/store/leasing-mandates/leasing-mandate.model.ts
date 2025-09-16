import { PeriodUnit } from '../../../../lookups/store/period-units/period-unit.model';

export interface Mandate {
  id?: number;
  description?: string;
  date?: string;
  expireDate?: string;
  clientId?: number;
  clientView?: any;
  parentMandateId?: number;
  validityCount?: number;
  validityUnitId?: number;
  notes?: string;
  productId?: number;
  assets?: any;
  downPayment?: number;
  assetCost?: number;
  percentOfFinance?: number;
  validityDay?: number;
  basic?: any;
  contacts?: any;
  officers?: any;
  moreInfo?: any;
  nfa?: number;
  interestRate: number;
  insuranceRate: number;

  indicativeRentals?: number;
  leasingTypeId?: number;
  insuredById?: number;
  mandateAssetTypes?: {
    assetTypeId: number;
    assetsTypeDescription: string;
  }[];
  mandateFees?: {
    feeTypeId: number;
    actualAmount?: number;
    actualPercentage?: number;
  }[];
  mandateGracePeriodSettingView?: PeriodUnit;
  mandateContactPersons?: { contactPersonId: number }[];
  mandateOfficers?: { officerId: number }[];
  validityUnitView?: any;
  mandateId?: any;
  mandateCurrentWorkFlowAction?: any;
  allowedMandateWorkFlowActions: any[];
}

export interface MandateWorkFlowAction {
  id: number;
  mandateStatusActionId?: number;
  mandateId?: number;
  comment?: string;
  isCurrent?: boolean;
}
export interface MandateWorkFlowHistory {
  id: number;
  mandateId: number;
  officerId: number;
  officerName: string;
  officerNameAr: string;
  mandateStatusActionId: number;
  mandateStatusActionName: string;
  mandateStatusActionNameAr: string;
  comment: string;
  date: string;
}
