export interface AgreementOfficer {
  id: number;
  details: string;
  detailsAR: string;
  areaId: number;
  governorateId: number;
  countryId: number;
  clientId: number;
  client?: any;
  addressTypeId: number;
  isMain: boolean;
  isActive: boolean;
}
