export interface ContactPersonEmail {
  id: number;
  email: string;
  contactPersonId: number;
  isActive: boolean;
  tenantId: number;
  creationTime: string;
}

export interface ContactPersonAddress {
  id: number;
  details: string;
  detailsAR: string;
  contactPersonId: number;
  addressTypeId: number;
  areaId: number;
  isMain: boolean;
}

export interface ContactPersonPhoneNumber {
  id: number;
  phoneNumber: string;
  phoneTypeId: number;
  contactPersonId: number;
  isActive: boolean;
}

export interface ContactPersonIdentity {
  id: number;
  identificationNumber: string;
  identificationTypeId: number;
  contactPersonId: number;
  isActive: boolean;
}

export interface ContactPerson {
  id: number;
  name: string;
  nameAR: string;
  title: string;
  titleAR: string;
  genderId: number;
  clientId: number;
  isActive: boolean;
  contactPersonEmails: ContactPersonEmail[];
  contactPersonAddresses: ContactPersonAddress[];
  contactPersonPhoneNumbers: ContactPersonPhoneNumber[];
  contactPersonIdentities: ContactPersonIdentity[];
}

export interface ContactPersonsResponse {
  items: ContactPerson[];
  totalCount: number;
}
