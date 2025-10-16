export interface MandateActionAuthorizationGroup {
  id: number;
  mandateStatusActionId: number;
  mandateStatusAction: any;
  authorizationGroupId: number;
  startDate: Date;
  isActive?: boolean;
}
