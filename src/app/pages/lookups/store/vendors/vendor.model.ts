import { SubSector } from '../sub-sectors/sub-sector.model';

export interface Vendor {
  id: number;
  name: string;
  nameAR: string;
  taxNumber: string;
  subSectorIdList: number[]; // ✅ be explicit
  subSectorList?: any[];
  isActive: boolean;
}
