export interface Followup {
  id: number;
  communicationId: number;
  communication?: any;
  topic: string;
  details: string;
  date?: Date;
}