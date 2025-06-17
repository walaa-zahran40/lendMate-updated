import { Sector } from '../../pages/lookups/store/sectors/sector.model';

export interface SubSectors {
  id?: number;
  sectorId?: number;
  isActive?: boolean;
  tenantId?: number;
  sector?: Sector;
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
