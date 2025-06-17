export interface FeeRange {
  id: number;
  lowerBound: number;
  upperBound: number;
  feeTypeId: number;
  feeType?: any;
  defaultAmount: number;
  defaultPercentage: any;
  criteriaField: string;
  isActive: boolean;
}