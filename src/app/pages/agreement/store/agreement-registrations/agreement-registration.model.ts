export interface AgreementRegistration {
  id: number;
  leasingAgreementId: number;
  date: string; // ISO e.g. "2025-10-09T00:00:00"
  number: string;
  ecraAuthentication: string;
  isActive: boolean;
}

export interface LeasingAgreementRegistrationHistory
  extends AgreementRegistration {}
