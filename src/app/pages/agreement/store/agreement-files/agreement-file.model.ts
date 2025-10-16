export interface AgreementFile {
  id: number;
  agreementId: number;
  fileId: number;
  filePath: string | null;
  expiryDate: string; // ISO string
  fileName: string | null;
  leasingAgreementId: number;
  documentTypeId?: any; // present on create response (nullable in list)
}

export interface PagedAgreementFilesResponse {
  items: AgreementFile[];
  totalCount: number;
}
export interface LeasingAgreementFileHistory extends AgreementFile {}
