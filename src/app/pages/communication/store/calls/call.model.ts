export interface Call {
  id: number;
  clientId: number;
  communicationId? : number;
  communication? : any;

  callTypeId? : number;
  callType? : any;

  communicationFlowId: string;
  communicationTypeId: number; // changed from hardcoded 1 to proper number type

  date: string; // ISO string, e.g., "2025-05-29T08:45:52.847Z"
  topic: string;
  details: string;
  comments: string;

  communicationOfficers: {
    officerId: number;
    isAttend: boolean;
    isResponsible: boolean;
  }[];

  communicationContactPersons: {
    contactPersonId: number;
    isAttend: boolean;
  }[];
}


//  public int Id { get; set; }
//  public int CommunicationId { get; set; }

//  public int CallActionTypeId { get; set; }
//  public int CallTypeId { get; set; }
//  public int CommunicationFlowId { get; set; }
//  public int CommunicationTypeId { get; set; }

//  public int ClientId { get; set; }
//  public DateTime Date { get; set; }
//  public string Topic { get; set; }
//  public string Details { get; set; }

