import { TeamOfficer } from './team-officer.model';

export interface TeamOfficersState {
  items: TeamOfficer[];
  history: TeamOfficer[];
  current?: TeamOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialTeamOfficersState: TeamOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
