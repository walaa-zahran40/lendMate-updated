export interface ActionNotificationGroup {
  id: number;
  clientStatusActionId: number;
  clientStatusAction: any;
  notificationGroupOfficerId: number;
  startDate: Date;
  isActive?: boolean;
}
