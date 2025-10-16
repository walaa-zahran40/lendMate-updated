export interface FollowupPoint {
  id: number;
  followUpId: number;
  followUp?: any;
  officerId: number;
  officer?: any;
  contactPersonId: number;
  contactPerson?: any;
  topic: string;
  details: string;
  comments: string;
  dueDate?: Date;
  actualDate?: Date;
  isDone : Boolean; 
  isClientResponsibility : Boolean; 
}