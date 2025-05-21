export interface ClientCentralBankInfo {
  id: number;
  capital:number;
  iScoreSectore: string;
  // bankName: string;
  // accountNumber: string;
  clientId: number;
  client?:any;
  companyTypeId: number;
  balanceSheetdate :Date;
  cbeCustomerCode: string; 
  smeClientCodeId: number;
  isActive: boolean;
}
