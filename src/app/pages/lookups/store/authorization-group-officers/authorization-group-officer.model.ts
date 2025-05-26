export interface AuthorizationGroupOfficer {
  id: number;
  authorizationGroupId : number;
  authorizationGroup? : any;
  officerId : number;
  officer? : any;
  startDate : Date;
  endDate? : Date;
  isCurrent?: boolean;
}