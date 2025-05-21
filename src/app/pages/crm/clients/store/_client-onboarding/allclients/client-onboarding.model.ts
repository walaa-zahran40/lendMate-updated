import { SubSector } from '../../../../../lookups/store/sub-sectors/sub-sector.model';

export interface ClientOnboarding {
  id: number;
  name?: string;
  nameAR?: string;
  shortName?: string;
  businessActivity?: string;
  isIscore?: boolean;
  code?: string;
  taxId?: string | null;
  clientOnboardingTypeId?: number;
  subSectorIdList?: SubSector[];
  currentStatusName?: string | null;
  allowedActionsList?: any[];
  isStampDuty?: boolean;
  legalFormLawId?: number;
  legalFormId?: number;
  mainShare?: number;
  marketShare?: number;
  clientTypeId?: number;
  establishedYear?: number;
  website?: string | null;
  employeesNo?: number;
  subSectorList?: any;
  marketSize?: number;
}
