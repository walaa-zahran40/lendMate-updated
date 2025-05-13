import { TeamLeadOfficer } from './team-lead-officer.model';

export interface TeamLeadOfficersState {
  items: TeamLeadOfficer[];
  history: TeamLeadOfficer[];
  current?: TeamLeadOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialTeamLeadOfficersState: TeamLeadOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
