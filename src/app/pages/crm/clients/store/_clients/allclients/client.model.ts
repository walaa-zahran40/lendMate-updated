import { SubSector } from '../../../../../lookups/store/sub-sectors/sub-sector.model';

export interface Client {
  id: number;
  name?: string;
  nameAR?: string;
  shortName?: string;
  businessActivity?: string;
  isIscore?: boolean;
  code?: string;
  taxId?: string | null;
  clientTypeId?: number;
  subSectorIdList?: SubSector[];
  currentStatusName?: string | null;
  allowedActionsList: any[];
  isStampDuty?: boolean;
  legalFormLawId?: number;
  legalFormId?: number;
  mainShare?: number;
  marketShare?: number;
  establishedYear?: number;
  website?: string | null;
  employeesNo?: number;
  subSectorList?: any;
  marketSize?: number;
  guarantorNameAR?: string;
  guarantorName?: string;
}

export interface ClientWorkFlowAction {
  id: number;
  clientStatusActionId?: number;
  clientId?: number;
  comment?: string;
  isCurrent?: boolean;
}
