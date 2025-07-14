export interface MandateFee {
  id: number;
  mandateId: number;
  mandate: any;
  feeTypeId?: any;
  actualAmount?: any;
  actualPrecentage?: any;
}

export interface FeeCalculationType {
  id: number;
  name: string;
  nameAR: string;
  code: string;
  isActive: boolean;
  // …other fields if you need them
}

export interface FeeCalculationConfiguration {
  id: number;
  feeTypeId: number;
  calculationFormula: string;
  parameterMappingsJson: string;
  parameterMappings: { [key: string]: string }; // ← add this
}

export interface CalculationConfigurationByFeeType {
  id: number;
  code: string;
  name: string;
  nameAR: string;
  defaultAmount: number;
  defaultPrecentage: number;
  feeCalculationConfiguration: FeeCalculationConfiguration;
  feeCalculationType: FeeCalculationType;
  isActive: boolean;
}
