export interface FeeType {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  description: string;
  descriptionAR: string;
  defaultAmount: number;
  defaultPercentage: number;
  feeCalculationTypeId: number;
  feeCalculationType?: any;
  isActive?: boolean;
}
