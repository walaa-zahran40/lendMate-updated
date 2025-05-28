export interface ActionNotificationGroup {
  id: number;
  clientStatusActionId: number;
  clientStatusAction: any;
  notificationGroupId: number;
  startDate: Date;
  isActive?: boolean;
}
