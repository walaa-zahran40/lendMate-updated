export interface ClientPhoneNumber {
  id?: number;
  clientId?: number;
  client?: any;
  phoneTypeId?: number;
  phoneType?: any;
  phoneNumbers?: number[];
  phoneNumber?: any;

  createClientPhoneNumbers?: any[];
  isActive: boolean;
}
