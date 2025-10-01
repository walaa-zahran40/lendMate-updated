export interface AgreementRegistration {
  id: number;
  leasingAgreementId?: number;
  date?: Date;
  number: string;
  ecraAuthentication: string;
  clientId?: number;
}
