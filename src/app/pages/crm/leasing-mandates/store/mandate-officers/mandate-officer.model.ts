export interface MandateOfficer {
  id: number;
  mandateId: number;
  officerId: number;
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

export interface CreateMandateOfficerDto {
  mandateId: number;
  officerId: number;
}

export interface UpdateMandateOfficerDto {
  id: number;
  mandateId: number;
  officerId: number;
}
