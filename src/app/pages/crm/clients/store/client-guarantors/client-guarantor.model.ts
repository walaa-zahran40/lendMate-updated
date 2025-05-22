export interface ClientGuarantor {
  id: number;
  clientId: number;
  client: any;
  guarantorId: number;
  percentage: number;
  isActive?: boolean;
}
