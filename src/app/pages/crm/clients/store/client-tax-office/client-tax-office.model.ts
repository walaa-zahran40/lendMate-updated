export interface ClientTaxOffice {
  id: number;
  taxCardNumber?: string;
  expiryDate:Date;
  clientId: number;
  client: any;
  taxOfficeId: number;
  isActive?: boolean;
}
