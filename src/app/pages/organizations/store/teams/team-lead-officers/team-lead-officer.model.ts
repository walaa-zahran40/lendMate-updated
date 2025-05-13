export interface TeamLeadOfficer {
  id: number;
  teamId: number;
  team?: any;
  managerId: number;
  officer?: any;
  startDate: Date;
  isCurrent: boolean;
}
