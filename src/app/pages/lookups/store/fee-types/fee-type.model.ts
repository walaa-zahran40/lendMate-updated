export interface FeeType {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  description: string;
  descriptionAR: string;
  defaultAmount: number;
  defaultPrecentage : number;
  feeCalculationTypeId : number;
  feeCalculationType? : any;
  isActive?: boolean;
}