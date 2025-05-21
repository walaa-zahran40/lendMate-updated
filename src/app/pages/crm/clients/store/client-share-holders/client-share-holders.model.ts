export interface ClientShareHolder {
  id: number;
  clientId: number;
  client: any;
  shareHolderId: number;
  percentage: number;
  isActive?: boolean;
}
