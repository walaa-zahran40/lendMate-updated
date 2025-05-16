export interface ClientPhoneNumber {
  id: number;
  clientId: number;
  client?: any;
   phoneTypeId: number;
  phoneType?: any;
  phoneNumber : number;
  isActive : boolean;
}
