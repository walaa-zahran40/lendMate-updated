export interface ClientLegal {
  id: number;
  clientId: number;
  client: any;
  legalFormLawId: number;
  legalFormId: number;
  isActive?: boolean;
  isStampDuty?:boolean;
}
