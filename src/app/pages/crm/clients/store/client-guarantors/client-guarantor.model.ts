export interface ClientGuarantor {
  id: number;
  clientId: number;
  client: any;
  guarantorId: number;
  guarantorName?: string;
  guarantorNameAR?: string;
  percentage: number;
  isActive?: boolean;
}
