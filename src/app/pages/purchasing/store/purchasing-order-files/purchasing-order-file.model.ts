export interface PurchaseOrderFile {
  id: number;
  purchaseOrderId: number;
  fileId: number;
  fileName?: string;
  documentTypeId: number;
  expiryDate: Date;
  filePath?: string;
}
