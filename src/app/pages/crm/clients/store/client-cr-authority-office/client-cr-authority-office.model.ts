export interface ClientCRAuthorityOffice {
  id: number;
  crNumber?: string;
  expiryDate:Date;
  clientId: number;
  client: any;
  crAuthorityOfficeId: number;
  isActive?: boolean;
}
