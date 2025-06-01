export interface Call {
  id: number;
  clientId: number;
  client?: any;
  communicationId? : number;
  communication? : any;

  callTypeId : number;
  callType? : any;

  callActionTypeId : number;
  callActionType? : any;

  communicationFlowId: string;
  communicationFlow?: any; 

  date: Date ; 
  topic: string;
  details: string;
  comments: string;

   communicationOfficers: CommunicationOfficers[];
   communicationContactPersons: CommunicationContactPersons[];
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