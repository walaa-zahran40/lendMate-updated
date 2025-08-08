export interface Vehicle {
  id: number;
  description: string;
  descriptionAr: string;
  dateAcquired: Date;
  leasingAgreementId: number;
  vehiclesManufactureId: number;
  vehiclesModelId: number;
  assetTypeId: number;
  modelCategory: string;
  manufactureYear: number;
  currentValue: number;
  capacity: string;
  horsepower: string;
  color: string;
  chasisNumber: string;
  motorNumber: string;
  keyId: string;
  geerChoice: string;
  isRequiredMaintenance: boolean;
  isRequiredKMReading: boolean;
}
