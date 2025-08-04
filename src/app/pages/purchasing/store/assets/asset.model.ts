export interface Asset {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
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
