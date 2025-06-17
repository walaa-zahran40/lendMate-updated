export interface MandateStatusAction {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  statusInId: number;
  statusIn?:any;
  statusOutId: number;
  statusOut?:any;
  workflowActionTypeId: number;
  workflowActionType?:any;
  isActive: boolean;
}
