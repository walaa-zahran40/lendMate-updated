import { Sectors } from './sectors.interface';

export interface SubSectors {
  id?: number;
  sectorId?: number;
  isActive?: boolean;
  tenantId?: number;
  sector?: Sectors;
  code?: string;
  name?: string;
  nameAR?: string;
  deleterUserId?: number | null;
  deletionTime?: Date | null;
  isDeleted?: boolean;
  creationTime?: Date;
  creatorUserId?: number | null;
  lastModifierUserId?: number | null;
  lastModificationTime?: Date | null;
  domainEvents?: null | any[];
  clientSubSector?: null | any;
  subSectors?: SubSectors[];
}
