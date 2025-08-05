export interface Asset {
  id: number;
  code?: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
  allowedActionsList: any[];
  currentStatusName?: string | null;
}
export interface AssetWorkFlowAction {
  id: number;
  assetStatusActionId?: number;
  assetId?: number;
  comment?: string;
  isCurrent?: boolean;
}
