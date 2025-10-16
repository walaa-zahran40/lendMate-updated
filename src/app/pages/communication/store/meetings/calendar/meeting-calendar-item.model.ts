export interface MeetingCalendarItem {
  id: number;
  clientId: number;
  startDate: string;
  endDate: string;
  topic: string;
  details?: string;
  communicationOfficers: Array<{
    officerId: number;
    isAttend: boolean;
    isResponsible: boolean;
  }>;
}
