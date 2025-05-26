export interface NotificationGroupOfficer {
  id: number;
  notificationGroupId : number;
  notificationGroup? : any;
  officerId : number;
  officer? : any;
  startDate : number;
  endDate? : number;
  isCurrent?: boolean;
}