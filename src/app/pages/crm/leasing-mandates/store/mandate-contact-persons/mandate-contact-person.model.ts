export interface MandateContactPerson {
  id: number;
  mandateId: number;
  contactPersonId: number;
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

export interface CreateMandateContactPersonDto {
  mandateId: number;
  contactPersonId: number;
}

export interface UpdateMandateContactPersonDto {
  id: number;
  mandateId: number;
  contactPersonId: number;
}
