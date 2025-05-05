export interface TaxOffice {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  governorateId?:number;
  address?:string;
  isActive: boolean;
}
