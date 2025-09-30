export interface AgreementContactPerson {
  id?: number;
  agreementId?: number;
  contactPersonId?: number;
  clientView?: any;
  displayAgreementNumberId: any;
}

export interface PagedResponse<T> {
  items?: T[];
  totalCount?: number;
}

export interface CreateAgreementContactPersonDto {
  agreementId?: number;
  contactPersonId?: number;
}

export interface UpdateAgreementContactPersonDto {
  id?: number;
  agreementId?: number;
  contactPersonId?: number;
}
