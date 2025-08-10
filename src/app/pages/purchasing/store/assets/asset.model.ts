export interface Asset {
  id: number;
  assetTypeId: number;
  description: string;
  descriptionAr: string;
  dateAcquired: string; // ISO date string
  leasingAgreementId: number;
  isActive: boolean;
  code?: string;
}
export interface AssetType {
  id: number;
  name: string; // or 'description' if your API uses that
  nameAr?: string;
}

// view model (what you bind to the table)
export interface AssetViewModel extends Asset {
  assetTypeName: string;
  assetTypeNameAr?: string;
  dateAcquiredObj?: Date; // convenient if you need a Date object
}
