export interface AgreementFile {
  id: number;
  agreementId: number;
  fileId: number;
  filePath: string;
  expiryDate: string; // keep as string if backend sends ISO date
  fileName: string;
  clientId?: number; // optional if not always present
}
