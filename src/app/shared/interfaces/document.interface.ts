export interface Document {
  id: number;
  clientId: number;
  fileId: number;
  filePath: string;
  expiryDate: string;
  fileName: string;
  fileType?: any;
  fileTypeId?: any;
  documentTypeName?: any;
}
