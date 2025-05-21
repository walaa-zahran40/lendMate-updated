export interface ContactPersonPhoneNumber {
  phoneNumber: string;
  phoneTypeId: number;
}
 
export interface ContactPersonIdentity {
  identificationNumber: string;
  identificationTypeId: number;
}
 
export interface ClientContactPerson {
  id: number;
  name: string;
  nameAR: string;
  title: string;
  titleAR: string;
  email?: string;
  genderId: number;
  clientId: number;
  isAuthorizedSign: boolean;
  isKeyManager: boolean;
  isFinance: boolean;
  addressTypeId?: number;
  areaId?: number;
  countryId?: number;
  governorateId?: number;
  addressDetails?: string;
  addressDetailsAr: string;

  contactPersonPhoneNumbers?: ContactPersonPhoneNumber[];
  contactPersonIdentities?: ContactPersonIdentity[];
}