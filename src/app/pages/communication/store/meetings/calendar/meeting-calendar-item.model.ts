export interface MeetingCalendarItem {
  id: number;
  clientId: number;
  startDate: string; // "2025-07-10T21:00:00"
  endDate: string;
  topic: string;
  details?: string;
  communicationOfficers: Array<{
    officerId: number;
    isAttend: boolean;
    isResponsible: boolean;
  }>;
}
