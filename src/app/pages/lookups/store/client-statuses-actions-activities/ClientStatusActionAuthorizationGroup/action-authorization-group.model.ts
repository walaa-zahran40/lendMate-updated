export interface ActionAuthorizationGroup {
  id: number;
  clientStatusActionId: number;
  clientStatusAction: any;
  authorizationGroupId: number;
  startDate: Date;
  isActive?: boolean;
}
