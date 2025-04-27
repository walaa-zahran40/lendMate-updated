export interface ClientCRAuthorityOffice {
  id: number;
  // TODO: add all other fields from your API (e.g. name, address, clientId, isActive…)
}

export interface ClientCRAuthorityOfficesResponse {
  items: ClientCRAuthorityOffice[];
  totalCount: number;
}
