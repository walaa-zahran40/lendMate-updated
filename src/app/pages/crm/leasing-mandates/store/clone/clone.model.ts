import { PeriodUnit } from '../../../../lookups/store/period-units/period-unit.model';

export interface Clone {
  id?: number;
  description?: string;
  date?: Date;
  clientId?: number;
  clientView?: any;
  parentMandateId?: number;
  validityCount?: number;
  validityUnitId?: number;
  notes?: string;
  productId?: number;
  assets?: any;
  basic?: any;
  contacts?: any;
  officers?: any;
  moreInfo?: any;
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
    actualPrecentage?: number;
  }[];
  mandateGracePeriodSettingView?: PeriodUnit;
  mandateContactPersons?: { contactPersonId: number }[];
  mandateOfficers?: { officerId: number }[];
  validityUnitView?: any;
  mandateId?: any;
}
