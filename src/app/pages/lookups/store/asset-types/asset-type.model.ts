export interface AssetType {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  assetTypeCategoryId: number;
  assetTypeCategory? : any;
  parent: number;
  isActive: boolean;
}
