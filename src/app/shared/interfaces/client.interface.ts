export interface Client {
  id?: number;
  name?: string;
  nameEn?: string;
  nameAR?: string;
  employeesNo?: number;
  businessActivity?: string;
  code?: string;
  isIscore?: boolean;
  clientTypeName?: string;
  clientTypeCode?: string;
  clientTypeId?: number;
  shortName?: string;
  taxId?: number;
  isActive?: boolean;
  subSectorList: {
    id?: number;
    name?: string;
    nameAR?: string;
    sectorId?: number;
  }[];
}
