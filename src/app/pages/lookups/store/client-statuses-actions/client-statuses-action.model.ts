export interface ClientStatusAction {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  statusInId: number;
  statusOutId: number;
  workflowActionTypeId: number;
  isActive: boolean;
}
