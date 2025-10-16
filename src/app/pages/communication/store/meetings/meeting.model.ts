export interface Meeting {
  id: number;
  clientId: number;
  client?: any;
  communicationId?: number;
  communication?: any;

  meetingTypeId: number;
  meetingType?: any;

  communicationFlowId: string;
  communicationFlow?: any;

  startDate: any;
  endDate: any;
  onlineURL?: string;
  addressLocation: string;
  topic: string;
  details: string;
  comments: string;

  reserveCar?: string;
  driverName?: string;
  adminComments?: string;

  communicationOfficers: CommunicationOfficers[];
  communicationContactPersons: CommunicationContactPersons[];
  communicationAssetTypes?: CommunicationAssetTypes[];
}

export interface CommunicationContactPersons {
  contactPersonId?: number;
  isAttend: boolean;
}

export interface CommunicationOfficers {
  officerId?: number;
  isAttend: boolean;
  isResponsible: boolean;
}

export interface CommunicationAssetTypes {
  assetTypeId?: number;
}
