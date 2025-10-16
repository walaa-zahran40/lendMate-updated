export interface ClientIdentity {
  id: number;
  clientId: number;
  client?: any;
  identificationTypeId: number;
  identificationType?: any;
  identificationNumber : number;
  isMain : boolean;
  isActive : boolean;
}
