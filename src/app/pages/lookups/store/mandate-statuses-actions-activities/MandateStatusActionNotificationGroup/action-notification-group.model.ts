export interface MandateActionNotificationGroup {
  id: number;
  mandateStatusActionId: number;
  mandateStatusAction: any;
  notificationGroupId: number;
  startDate: Date;
  isActive?: boolean;
}
