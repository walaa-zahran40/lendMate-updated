// Generic paged result
export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
}

// Main DTO
export interface ClientCentralBank {
  id: number;
  clientId: number;
  bankName: string;
  accountNumber: string;
  isActive: boolean;
  createdAt: string;
  // …add any other fields your API returns
}

// History DTO (for GetHistory/{ClientId})
export interface ClientCentralBankHistory {
  id: number;
  clientCentralBankId: number;
  changedBy: string;
  changedAt: string;
  changeDetails: string;
  // …other history fields
}
