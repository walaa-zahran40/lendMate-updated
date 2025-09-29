export interface AgreementFile {
  id: number;
  agreementId: number;
  fileId: number;
  fileName?: string;
  documentTypeId: number;
  expiryDate: Date;
  filePath?: string;
}
