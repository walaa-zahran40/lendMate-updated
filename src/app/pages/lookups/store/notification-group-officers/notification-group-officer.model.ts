export interface NotificationGroupOfficer {
  id: number;
  notificationGroupId : number;
  notificationGroup? : any;
  officerId : number;
  officer? : any;
  startDate : Date;
  endDate? : Date;
  isCurrent?: boolean;
}