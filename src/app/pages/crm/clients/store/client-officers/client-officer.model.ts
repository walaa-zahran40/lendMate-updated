export interface ClientOfficer {
  id: number;
  detailes?:string;
  detailesAR?:string;
  clientId: number;
  client: any;
  officerId: number;
  clientOfficerTypeId: number;
  isActive?: boolean;
  isMain?:boolean;
}
