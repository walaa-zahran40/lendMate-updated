export interface AgreementFile {
  id: number;
  items: any;
  agreementId: number;
  fileId: number;
  fileName?: string;
  documentTypeId: number;
  expiryDate: Date;
  filePath?: string;
  displayAgreementNumber: string;
}
