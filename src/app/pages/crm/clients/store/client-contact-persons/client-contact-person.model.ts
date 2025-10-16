export interface ContactPersonPhoneNumber {
  id?: number;
  phoneNumber: string;
  phoneTypeId: number;
}

export interface ContactPersonIdentity {
  id?: number;
  identificationNumber: string;
  identificationTypeId: number;
  isMain?: boolean;
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
  isActive?: boolean;
  contactPersonPhoneNumbers?: ContactPersonPhoneNumber[];
  clientContactPhoneNumbers?: ContactPersonPhoneNumber[];
  clientContactPersonIdentities?: ContactPersonIdentity[];
  contactPersonIdentities?: ContactPersonIdentity[];
}
